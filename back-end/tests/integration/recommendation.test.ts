
import app from '../../src/app'
import supertest from 'supertest'
import { prisma } from '../../src/database'
import { recommendation } from '../factories/recommendations'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
})
afterAll(async () => {
  await prisma.$disconnect()
})

describe('POST /recommendations', () => {
  it('should returns 422 if name is not provided', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    const request = await supertest(app).post('/recommendations').send({ youtubeLink: data.youtubeLink })
    expect(request.status).toBe(422)
  })

  it('should returns 422 if youtubeLink is not provided', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    const request = await supertest(app).post('/recommendations').send({ name: data.name })
    expect(request.status).toBe(422)
  })

  it('should returns 422 if youtubeLink is not a valid link', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    const request = await supertest(app).post('/recommendations').send(Object.assign({}, data, { youtubeLink: 'any_invalid_url' }))
    expect(request.status).toBe(422)
  })

  it('should returns 201 if created sucessfully', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    const request = await supertest(app).post('/recommendations').send(data)
    expect(request.status).toBe(201)
  })
})
