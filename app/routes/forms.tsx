import {useForm} from '@conform-to/react'
import {getZodConstraint, parseWithZod} from '@conform-to/zod/v4'
import {useId, useState} from 'react'
import {data, Form, redirect, useActionData} from 'react-router'
import z from 'zod'
import prisma from '~/lib/db'
import type {Route} from '../routes/+types/project'

type InputProps = {
	label: string
	error?: string
} & React.ComponentPropsWithoutRef<'input'>

export function ErrorList({
	id,
	errors,
	isFormError = false,
}: {
	id?: string
	errors?: Array<string | null | undefined>
	isFormError?: boolean
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null

	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map((error, index) => (
				<li
					key={error || index}
					className="text-foreground-destructive text-sm md:text-md lg:text-lg"
				>
					{isFormError ? '• ' : null}
					{error}
				</li>
			))}
		</ul>
	)
}

function Input({label, error, className, id, ...props}: InputProps) {
	const generatedId = useId()
	const inputId = id ?? generatedId
	return (
		<div className="flex flex-col space-y-1 mb-4 border-b border-[var(--color-border)]">
			<label htmlFor={inputId} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<input
				id={inputId}
				className={`
          px-3 py-2 border rounded-md text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className || ''}
        `}
				{...props}
			/>
			{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
		</div>
	)
}

const TITLE_MAX_LENGTH = 50 as const
const DESCRIPTION_MAX_LENGTH = 10_000 as const
const MAX_UPLOAD_SIZE = 3145728 as const // 1024 * 1024 * 3 => 3MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
	title: z
		.string('Title cannot be empty!')
		.min(5, 'Title must be at least 5 characters')
		.max(TITLE_MAX_LENGTH, `Title must not exceed ${TITLE_MAX_LENGTH} characters`),
	description: z
		.string('Description cannot be empty!')
		.min(20, 'Description must be at least 20 characters')
		.max(
			DESCRIPTION_MAX_LENGTH,
			`Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`
		),
	image: z
		.instanceof(File, {message: 'Please provide a valid image file.'})
		.refine(file => file.size > 0, 'Image is required')
		.refine(file => file.size <= MAX_UPLOAD_SIZE, 'File size must be less than 3MB')
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Unsupported file format. Only JPG, JPEG, PNG, or WEBP images are allowed.'
		)
		.optional(),
	githubUrl: z.url().optional(),
	liveUrl: z.url().optional(),
})

export async function action({request}: Route.ActionArgs) {
	const formData = await request.formData()

	const submission = parseWithZod(formData, {schema})

	if (submission.status !== 'success') {
		return data({errors: submission.reply()}, {status: 400})
	}

	const {title, description, githubUrl, liveUrl, image} = submission.value
	const blob = image && Buffer.from(await image.arrayBuffer())

	await prisma.project.create({
		data: {
			title,
			description,
			githubUrl,
			liveUrl,
			...(blob
				? {
						image: {
							create: {
								blob,
								contentType: image.type,
								altText: title,
							},
						},
				  }
				: {}),
		},
	})

	return redirect('/projects')
}

export default function CreateProjectForm() {
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const lastResult = useActionData<typeof action>()
	const [form, fields] = useForm({
		constraint: getZodConstraint(schema),
		// Sync the result of last submission
		lastResult: lastResult?.errors,

		// Reuse the validation logic on the client
		onValidate({formData}) {
			return parseWithZod(formData, {schema})
		},

		// Validate the form on blur event triggered
		shouldValidate: 'onBlur',
	})
	return (
		<Form method="post" encType="multipart/form-data" className="flex flex-col space-y-3">
			<Input label="Title" name="title" defaultValue="project title" />
			<ErrorList errors={fields.title?.errors} />
			<Input
				label="Description"
				name="description"
				defaultValue={'kqdwmklqdklqdlkqdkqmlqwdqkldqlmkdqlmdqlwmq'}
			/>
			<ErrorList errors={fields.description?.errors} />
			<Input
				type="file"
				label="Image"
				name="image"
				className="absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0"
				onChange={event => {
					const file = event.target.files?.[0]
					if (file) {
						const reader = new FileReader()
						reader.onloadend = () => {
							setPreviewImage(reader.result as string)
						}
						reader.readAsDataURL(file)
					} else {
						setPreviewImage(null)
					}
				}}
				accept="image/*"
			/>
			{previewImage && (
				<div className="relative">
					<img src={previewImage} className="h-32 w-32 rounded-lg object-cover" />
				</div>
			)}
			<ErrorList errors={fields.image?.errors} />
			<Input label="GitHub URL" name="githubUrl" defaultValue="https://github.com" />
			<ErrorList errors={fields.githubUrl?.errors} />
			<Input label="Live URL" name="liveUrl" defaultValue="https://github.com" />
			<ErrorList errors={fields.liveUrl?.errors} />
			<button type="submit">Create Project</button>
		</Form>
	)
}
