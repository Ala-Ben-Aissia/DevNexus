import {Link} from 'react-router'

export default function Button({
	text,
	to,
	variant,
	icon,
}: {
	text: string
	to: string
	variant?: 'primary' | 'secondary' | 'tertiary'
	icon?: React.ReactNode
}) {
	const bg = {
		color:
			variant === 'primary'
				? 'var(--color-primary)'
				: variant === 'secondary'
				? 'var(--color-secondary)'
				: variant === 'tertiary'
				? 'var(--color-tertiary)'
				: 'var(--color-accent)',
		hover:
			variant === 'primary'
				? 'var(--color-secondary)'
				: variant === 'secondary'
				? 'var(--color-tertiary)'
				: variant === 'tertiary'
				? 'var(--color-quaternary)'
				: 'var(--color-accent-hover)',
	}

	return (
		<Link
			prefetch="intent"
			to={to}
			className={`group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-4 sm:py-3 lg:px-4 lg:py-4 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[${bg.color}] hover:bg-[${bg.hover}] transition-all duration-500 text-sm sm:text-base whitespace-nowrap flex-shrink-0`}
		>
			<span>{text}</span>
			{icon ?? (
				<svg
					className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			)}
		</Link>
	)
}
