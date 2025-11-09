export default function ErrorList({
	id,
	errors,
}: {
	id?: string
	errors?: Array<string | null | undefined>
}) {
	const errorsToRender = errors?.filter(Boolean)
	if (!errorsToRender?.length) return null

	return (
		<ul id={id} className="flex flex-col gap-1 mt-2">
			{errorsToRender.map((error, index) => (
				<li key={error || index} className="text-sm flex items-center gap-2 text-red-500">
					<svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z"
							clipRule="evenodd"
						/>
					</svg>
					{error}
				</li>
			))}
		</ul>
	)
}
