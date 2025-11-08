import {getFormProps, getInputProps, getTextareaProps, useForm} from '@conform-to/react'
import {getZodConstraint, parseWithZod} from '@conform-to/zod/v4'
import {useState} from 'react'
import {data, Form, redirect, useActionData} from 'react-router'
import z from 'zod'
import ErrorList from '~/components/ErrorList'
import InputField from '~/components/InputField'
import TextAreaField from '~/components/TextariaField'
import prisma from '~/lib/db'
import {generateBlurhash} from '~/utils/blurhash.server'
import type {Route} from '../routes/+types/project'

const TITLE_MAX_LENGTH = 50
const DESCRIPTION_MAX_LENGTH = 1_000
const MAX_UPLOAD_SIZE = 3145728 // 3MB
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
	githubUrl: z.url('Please enter a valid URL').optional(),
	liveUrl: z.url('Please enter a valid URL').optional(),
})

export async function action({request}: Route.ActionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {schema})

	if (submission.status !== 'success') {
		return data({errors: submission.reply()}, {status: 400})
	}

	const {title, description, githubUrl, liveUrl, image} = submission.value
	if (image) {
		const imageBuffer = await image.arrayBuffer()
		const blob = Buffer.from(imageBuffer)
		const blurhash = await generateBlurhash(imageBuffer)
		await prisma.project.create({
			data: {
				title,
				description,
				githubUrl,
				liveUrl,
				image: {
					create: {
						blob,
						contentType: image.type,
						altText: title,
						blurhash,
					},
				},
			},
		})
	} else {
		await prisma.project.create({
			data: {
				title,
				description,
				githubUrl,
				liveUrl,
			},
		})
	}

	return redirect('/projects')
}

export default function CreateProjectForm() {
	const [previewImage, setPreviewImage] = useState<string | null>(null)
	const lastResult = useActionData<typeof action>()
	const [form, fields] = useForm({
		constraint: getZodConstraint(schema),
		lastResult: lastResult?.errors,
		onValidate({formData}) {
			return parseWithZod(formData, {schema})
		},
		shouldValidate: 'onSubmit',
	})
	const formProps = getFormProps(form)
	const props = form.getFieldset()

	return (
		<div className="min-h-screen bg-[var(--color-primary)] py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="relative bg-[var(--color-secondary)]/90 rounded-3xl border border-[var(--color-border)]/50 overflow-hidden backdrop-blur-xl shadow-xl">
					{/* Decorative overlay */}
					<div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent pointer-events-none"></div>

					<div className="relative z-10 p-8 sm:p-10 lg:p-12">
						{/* Header */}
						<div className="mb-10">
							<h2 className="text-fluid-5xl font-light text-[var(--color-text)] mb-4 tracking-tight">
								Create New <span className="font-medium">Project</span>
							</h2>
							<p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed max-w-2xl">
								Add your project to showcase your work and share it with the world.
							</p>
						</div>

						{/* Form */}
						<Form
							method="post"
							encType="multipart/form-data"
							{...formProps}
							className="space-y-6"
						>
							{/* Title */}
							<div>
								<InputField
									label="Project Title *"
									placeholder="My Awesome Project"
									{...getInputProps(props.title, {type: 'text'})}
								/>
								<ErrorList errors={fields.title.errors} />
							</div>

							{/* Description */}
							<div>
								<TextAreaField
									label="Description *"
									placeholder="Describe your project, its features, and technologies used..."
									rows={6}
									{...getTextareaProps(props.description)}
									maxLength={DESCRIPTION_MAX_LENGTH}
								/>
								<ErrorList errors={fields.description.errors} />
							</div>

							{/* Image Upload */}
							<div>
								<label
									htmlFor={props.image.id}
									className="block font-medium text-[var(--color-text-light)] mb-2 text-fluid-sm"
								>
									Project Image
								</label>
								<div className="relative">
									<div className="flex items-center gap-4">
										<label
											tabIndex={0}
											htmlFor={props.image.id}
											className="relative cursor-pointer px-6 py-3 bg-[var(--color-tertiary)]/50 hover:bg-[var(--color-tertiary)]/70 border border-[var(--color-border-light)] hover:border-[var(--color-accent)]/50 rounded-xl text-[var(--color-text-light)] transition-all duration-300 inline-flex items-center gap-2 text-fluid-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-secondary)] focus-visible:border-[var(--color-accent)]"
										>
											<svg
												className="w-5 h-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
												/>
											</svg>
											Choose Image
										</label>
										<input
											className="absolute opacity-0 w-0 h-0"
											onChange={event => {
												const file = event.target.files?.[0]
												if (file) {
													const reader = new FileReader()
													reader.onloadend = () =>
														setPreviewImage(reader.result as string)
													reader.readAsDataURL(file)
												} else {
													setPreviewImage(null)
												}
											}}
											accept="image/*"
											{...getInputProps(props.image, {type: 'file'})}
										/>
										{previewImage && (
											<span className="text-fluid-sm text-[var(--color-text-muted)]">
												Image selected
											</span>
										)}
									</div>

									{/* Preview */}
									{previewImage && (
										<div className="mt-4 relative inline-block group">
											<img
												src={previewImage}
												className="h-40 w-40 rounded-xl object-cover border-2 border-[var(--color-border-light)] shadow-lg"
												alt="Preview"
											/>
											<button
												type="button"
												onClick={() => {
													setPreviewImage(null)
													const input = document.getElementById(
														'image-upload'
													) as HTMLInputElement
													if (input) input.value = ''
												}}
												className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
											>
												<svg
													className="w-5 h-5 text-white"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									)}
								</div>
								<ErrorList errors={fields.image.errors} />
							</div>

							{/* URLs */}
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div>
									<InputField
										label="GitHub URL"
										placeholder="https://github.com/username/repo"
										{...getInputProps(props.githubUrl, {type: 'url'})}
									/>
									<ErrorList errors={fields.githubUrl.errors} />
								</div>
								<div>
									<InputField
										label="Live URL"
										placeholder="https://example.com"
										{...getInputProps(props.liveUrl, {type: 'url'})}
									/>
									<ErrorList errors={fields.liveUrl.errors} />
								</div>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								className="group relative w-full px-8 py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-2xl transition-all duration-500 text-fluid-base overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 shadow-lg hover:shadow-xl hover-lift"
							>
								<span className="relative z-10 flex items-center justify-center gap-3 cursor-pointer">
									Create Project
									<svg
										className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 7l5 5m0 0l-5 5m5-5H6"
										/>
									</svg>
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform -skew-x-12"></div>
							</button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
