import {withAccelerate} from '@prisma/extension-accelerate'
import chalk from 'chalk'
import {PrismaClient} from 'generated/prisma/client'

const globalForPrisma = global as unknown as {
	prisma: PrismaClient
}

const logThreshold = 0

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: [
			{level: 'query', emit: 'event'},
			{level: 'error', emit: 'event'},
			{level: 'warn', emit: 'stdout'},
			{level: 'info', emit: 'event'},
		],
	})
		.$on('query', e => {
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
			console.info(
				`Prisma:
  Query: ${e.query.replaceAll('`', '').trim()}
  Duration: ${duration}`
			)
		})
		.$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
