import {encode} from 'blurhash'
import sharp from 'sharp'

export async function generateBlurhash(
	imageBuffer: Buffer | ArrayBuffer
): Promise<string> {
	const buffer = Buffer.isBuffer(imageBuffer) ? imageBuffer : Buffer.from(imageBuffer)

	// Resize to small dimensions for faster encoding
	const {data, info} = await sharp(buffer)
		.raw()
		.ensureAlpha()
		.resize(64, 64, {fit: 'inside'})
		.toBuffer({resolveWithObject: true})

	// Generate blurhash (componentX and componentY control detail level)
	const blurhash = encode(
		new Uint8ClampedArray(data),
		info.width,
		info.height,
		4, // componentX
		3 // componentY
	)

	return blurhash
}
