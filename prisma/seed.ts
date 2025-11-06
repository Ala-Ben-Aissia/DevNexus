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
	await prisma.$transaction(async $prisma => {
		await $prisma.project.deleteMany({})
		await $prisma.post.deleteMany({})
	})
}

async function generateProjects() {
	for (let i = 0; i < projects.length; i++) {
		await prisma.project.create({
			data: {
				...projects[i],
				image: {
					create: {
						blob: await loadImage('./app/assets/empty.jpg'),
						contentType: 'image/jpg',
						altText: projects[i].title,
					},
				},
			},
		})
	}
}

async function generatePosts() {
	for (let i = 0; i < posts.length; i++) {
		await prisma.post.create({
			data: {
				...posts[i],
				slug: generateSlug(posts[i].title),
			},
		})
	}
}

async function main() {
	console.log('🌱 Seeding database...')
	console.time('🌱 Seeding completed')
	console.time('🧹 Cleaning database')
	await reset()
	console.timeEnd('🧹 Cleaning database')
	console.time(`Generated ${projects.length} projects`)
	await generateProjects()
	console.timeEnd(`Generated ${projects.length} projects`)
	console.time(`Generated ${posts.length} posts`)
	await generatePosts()
	console.timeEnd(`Generated ${posts.length} posts`)
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
