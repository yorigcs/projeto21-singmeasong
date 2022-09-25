import { Recommendation } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const recommendation = (): Recommendation => ({
  id: faker.datatype.number({ min: 1, max: 10 }),
  name: faker.random.words(4),
  youtubeLink: faker.internet.url(),
  score: faker.datatype.number({ min: 1, max: 1000 })
})

export const generateId = (): number => faker.datatype.number({ min: 1, max: 10 })
