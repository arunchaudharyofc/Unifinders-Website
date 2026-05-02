/**
 * Prisma Database Client — Singleton Pattern
 * -------------------------------------------
 * Single `PrismaClient` instance shared across the app.
 * In development, stores client on `globalThis` to survive HMR reloads.
 * Includes structured logging for connection events.
 */
import { PrismaClient } from '@prisma/client'
import { createModuleLogger } from './logger'

const log = createModuleLogger('DB')

const prismaClientSingleton = () => {
  log.info('Initializing Prisma client')
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? [
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'warn' },
        ]
      : [{ emit: 'event', level: 'error' }],
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

// Attach event listeners for logging
db.$on('error' as never, (e: unknown) => {
  log.warn('Prisma error event', e) // Using warn instead of error to prevent Next.js dev overlay from blocking UI
})
db.$on('warn' as never, (e: unknown) => {
  log.warn('Prisma warning event', e)
})

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
