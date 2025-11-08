export default function Banner({
	status,
	title,
	description,
}: {
	status: 'success' | 'error'
	title: string
	description: string
}) {
	return status === 'success' ? (
		<div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 animate-fade-in-scale">
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
					<svg
						className="w-4 h-4 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<div>
					<p className="font-semibold text-green-900 mb-1 text-fluid-base">{title}</p>
					<p className="text-fluid-sm text-green-700">{description}</p>
				</div>
			</div>
		</div>
	) : (
		<div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 animate-fade-in-scale">
			<div className="flex items-start gap-3">
				<div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
					<svg
						className="w-4 h-4 text-white"
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
				</div>
				<div>
					<p className="font-semibold text-red-900 mb-1 text-fluid-base">{title}</p>
					<p className="text-fluid-sm text-red-700">{description}</p>
				</div>
			</div>
		</div>
	)
}
