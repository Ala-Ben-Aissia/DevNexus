import projectFallbackImage from '~/assets/empty.jpg'

export function invariantResponse<T>(
	value: T,
	message: string = 'Invariant failed!',
	responseInit?: ResponseInit
): asserts value {
	if (!value) {
		throw new Response(message, responseInit ?? {status: 400})
	}
}

export function getProjectImageSrc(imageId?: string) {
	return imageId ? `/resources/project-image/${imageId}` : projectFallbackImage
}
