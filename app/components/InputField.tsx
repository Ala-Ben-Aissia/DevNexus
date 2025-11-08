import {useId, useState, type InputHTMLAttributes} from 'react'

export default function InputField({
	type = 'text',
	name,
	id,
	label,
	error,
	...props
}: InputHTMLAttributes<HTMLInputElement> & {
	label: string
	error?: string[]
}) {
	const generatedId = useId()
	const inputId = id ?? generatedId

	const [isFocused, setIsFocused] = useState(false)

	return (
		<div className="relative">
			<label
				htmlFor={inputId}
				className="block text-fluid-sm font-medium text-[var(--color-text-light)] mb-2 tracking-wide"
			>
				{label}
			</label>
			<input
				name={name}
				type={type}
				{...props}
				onFocus={e => {
					setIsFocused(true)
					props.onFocus?.(e)
				}}
				onBlur={e => {
					setIsFocused(false)
					props.onBlur?.(e)
				}}
				className={`
          w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 outline-none
          ${
						isFocused
							? 'border-[var(--color-accent-hover)] shadow-md'
							: 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
					}
          bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)]
          text-[var(--color-text)]
          placeholder-[var(--color-text-muted)]
          ${error?.length ? 'border-red-500' : ''}
					`}
				id={inputId}
			/>
			{error && <p className="mt-1 text-sm text-red-500">{error[0]}</p>}
		</div>
	)
}
