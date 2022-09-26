import { Request, Response } from 'express'
import { prisma } from '../database'

export const resetDbController = async (req: Request, res: Response) => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations" RESTART IDENTITY CASCADE;`
  res.sendStatus(200)
}
