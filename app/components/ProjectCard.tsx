// app/components/ProjectCard.tsx
import type {Project as P} from 'generated/prisma/browser'
import {useEffect, useRef, useState} from 'react'
import {Blurhash} from 'react-blurhash'
import {Link} from 'react-router'
import {getProjectImageSrc} from '~/utils/misc'

type Project = Omit<P, 'liveUrl' | 'githubUrl' | 'updatedAt'> & {
	image: {id: string; blurhash: string | null} | null
}

export default function ProjectCard({project}: {project: Project}) {
	const [isLoaded, setIsLoaded] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		// Check if image is already loaded (cached)
		if (imgRef.current?.complete) {
			setIsLoaded(true)
		}
	}, [])

	return (
		<Link to={`/projects/${project.id}`}>
			<article className="group bg-[var(--color-secondary)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover-lift transition-all duration-500 border border-[var(--color-border)] hover:border-[var(--color-accent)] h-full flex flex-col gpu-accelerated">
				<div className="aspect-[16/10] w-full overflow-hidden relative bg-[var(--color-tertiary)]">
					{/* BlurHash placeholder - fades out smoothly */}
					{project.image?.blurhash && (
						<div
							className={`absolute inset-0 transition-opacity duration-500 ease-out ${
								isLoaded ? 'opacity-0' : 'opacity-100'
							}`}
							style={{pointerEvents: 'none'}}
						>
							<Blurhash
								hash={project.image.blurhash}
								width="100%"
								height="100%"
								resolutionX={64}
								resolutionY={64}
								punch={1}
							/>
						</div>
					)}

					{/* Actual image - fades in smoothly */}
					<img
						ref={imgRef}
						src={getProjectImageSrc(project.image?.id)}
						alt={project.title}
						className={`relative w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out ${
							isLoaded ? 'opacity-100' : 'opacity-0'
						}`}
						loading="lazy"
						onLoad={() => setIsLoaded(true)}
						style={{
							transition: 'opacity 500ms ease-out, transform 700ms ease-out',
						}}
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
					<div className="absolute top-4 right-4 w-2 h-2 bg-[var(--color-accent)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
				</div>

				<div className="p-6 lg:p-8 flex-1 flex flex-col space-y-4">
					<h3 className="text-fluid-lg lg:text-fluid-xl font-normal text-[var(--color-text)] transition-colors duration-300 line-clamp-2 leading-tight">
						{project.title}
					</h3>
					<p className="text-[var(--color-text-light)] text-fluid-sm lg:text-fluid-base leading-relaxed line-clamp-3 flex-1">
						{project.description}
					</p>
					<div className="flex items-center justify-between mt-auto pt-2">
						<span className="px-3 lg:px-4 py-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] text-[var(--color-text)] text-fluid-xs lg:text-fluid-sm rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-accent)]">
							Fullstack
						</span>
						<time className="px-3 lg:px-4 py-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] text-[var(--color-text-muted)] text-fluid-xs lg:text-fluid-sm rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-accent)]">
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							}).format(new Date(project.createdAt ?? Date.now()))}
						</time>
					</div>
				</div>
			</article>
		</Link>
	)
}
