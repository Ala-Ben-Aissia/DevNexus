import {withAccelerate} from '@prisma/extension-accelerate'
import chalk from 'chalk'
import {PrismaClient} from 'generated/prisma/client'

const globalForPrisma = global as unknown as {
	prisma: PrismaClient
}
const logThreshold = import.meta.env.DEV ? 0 : 100

function createPrismaClient() {
	const client = new PrismaClient({
		log: [
			{level: 'query', emit: 'event'},
			{level: 'error', emit: 'stdout'},
			{level: 'warn', emit: 'stdout'},
		],
	})

	client.$on('query', e => {
		if (e.duration < logThreshold) return

		const color =
			e.duration < logThreshold * 1.25
				? 'green'
				: e.duration < logThreshold * 2
				? 'cyan'
				: e.duration < logThreshold * 4
				? 'yellow'
				: e.duration < logThreshold * 10
				? 'red'
				: 'redBright'

		const duration = chalk[color](`${e.duration}ms`)
		console.info(`Prisma:\n  Query: ${e.query.trim()}\n  Duration: ${duration}`)
	})

	return client.$extends(withAccelerate())
}

const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}

// Optional: Connect eagerly in development
if (process.env.NODE_ENV !== 'production') {
	prisma.$connect().catch(console.error)
}

export default prisma
