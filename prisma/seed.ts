import {loadImage, posts, projects} from 'data/mock'
import {PrismaClient} from 'generated/prisma/client'

const prisma = new PrismaClient()

function generateSlug(title: string) {
	return title
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-')
}

async function reset() {
	await Promise.all([await prisma.project.deleteMany(), await prisma.post.deleteMany()])
}

async function generateProjects() {
	const BATCH_SIZE = 5
	for (let i = 0; i < projects.length; i += BATCH_SIZE) {
		const batch = projects.slice(i, i + BATCH_SIZE)
		await Promise.all(
			batch.map(async project => {
				await prisma.project.create({
					data: {
						...project,
						image: {
							create: {
								blob: await loadImage('./app/assets/empty.jpg'),
								contentType: 'image/jpg',
								altText: project.title,
							},
						},
					},
				})
			})
		)
	}
}

async function generatePosts() {
	const BATCH_SIZE = 2
	for (let i = 0; i < posts.length; i += BATCH_SIZE) {
		const batch = posts.slice(i, i + BATCH_SIZE)
		await Promise.all(
			batch.map(async post => {
				await prisma.post.create({data: {...post, slug: generateSlug(post.title)}})
			})
		)
	}
}

async function main() {
	console.log('🌱 Seeding database...')
	console.time('🌱 Seeding completed')
	console.time('🧹 Cleaning database')
	await reset()
	console.timeEnd('🧹 Cleaning database')
	console.time(`Generated ${projects.length} projects and ${posts.length} posts`)
	await Promise.all([generateProjects(), generatePosts()])
	console.timeEnd(`Generated ${projects.length} projects and ${posts.length} posts`)
	console.timeEnd('🌱 Seeding completed')
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
