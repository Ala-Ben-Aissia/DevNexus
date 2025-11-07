import {Link, type LinkProps} from 'react-router'

export function NavButton({children, ...props}: LinkProps) {
	return (
		<div className="max-w-7xl mx-auto py-4 sm:py-6">
			<Link
				prefetch="intent"
				{...props}
				className="group inline-flex items-center gap-2 sm:gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)]"
			>
				<div className="w-8 h-8 sm:w-10 sm:h-10 bg-(--color-secondary) border border-[var(--color-border)] group-hover:border-[var(--color-accent)] rounded-xl sm:rounded-2xl flex items-center justify-center">
					<svg
						className="w-4 h-4 sm:w-5 sm:h-5 duration-200 group-hover:-translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</div>
				<span className="font-medium text-sm sm:text-base">{children}</span>
			</Link>
		</div>
	)
}
