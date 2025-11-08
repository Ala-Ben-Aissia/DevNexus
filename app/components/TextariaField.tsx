import {useId, useState} from 'react'

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
	label: string
}

export default function TextAreaField({label, id, ...props}: TextAreaProps) {
	const [isFocused, setIsFocused] = useState(false)
	const [charCount, setCharCount] = useState(0)
	const generatedId = useId()
	id ??= generatedId
	return (
		<div className="relative">
			<label
				htmlFor={id}
				className="block text-fluid-sm font-medium text-[var(--color-text)] mb-2 tracking-wide"
			>
				{label}
			</label>
			<div className="relative">
				<textarea
					{...props}
					onFocus={e => {
						setIsFocused(true)
						props.onFocus?.(e)
					}}
					onBlur={e => {
						setIsFocused(false)
						props.onBlur?.(e)
					}}
					onChange={e => {
						setCharCount(e.target.value.length)
						props.onChange?.(e)
					}}
					className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 outline-none resize-none
            ${
							isFocused
								? 'border-[var(--color-accent-hover)] shadow-md'
								: 'border-[var(--color-border)] hover:border-[var(--color-accent)]'
						}
            bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)]
            text-[var(--color-text)]
            placeholder-[var(--color-text-muted)]
          `}
					id={id}
				/>
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-0 hover:opacity-5 focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
			</div>

			{props.maxLength && (
				<span
					className={`text-fluid-xs ${
						charCount > props.maxLength * 0.9
							? 'text-amber-600'
							: 'text-[var(--color-text-muted)]'
					}`}
				>
					{charCount}/{props.maxLength}
				</span>
			)}
		</div>
	)
}
