import prisma from '~/lib/db'
import {invariantResponse} from '~/utils/misc'
import type {Route} from './+types/project-image'

export async function loader({params}: Route.LoaderArgs) {
	const image = await prisma.projectImage.findUnique({
		where: {id: params.imageId},
		select: {altText: true, blob: true, contentType: true},
	})
	invariantResponse(image, 'Image not found', {status: 404})
	const {altText, blob, contentType} = image
	return new Response(blob, {
		headers: {
			'Content-Type': contentType,
			'Content-Disposition': `inline; filename="${altText}"`,
			'Content-Length': blob.length.toString(),
		},
	})
}
