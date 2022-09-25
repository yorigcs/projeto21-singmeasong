
import app from '../../src/app'
import supertest from 'supertest'
import { prisma } from '../../src/database'
import { recommendation, generateId } from '../factories/recommendations'
import { recommendationService } from '../../src/services/recommendationsService'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`
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
    const request = await supertest(app).post('/recommendations').send(Object.assign({}, data, { youtubeLink: 'any_invalid_url' }))
    expect(request.status).toBe(422)
  })

  it('should returns 201 if created sucessfully', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    const request = await supertest(app).post('/recommendations').send(data)
    expect(request.status).toBe(201)
  })

  it('should returns 409 if already has a recommendation with same name', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData
    await recommendationService.insert(data)
    const request = await supertest(app).post('/recommendations').send(data)
    expect(request.status).toBe(409)
  })
})

describe('POST /recommendations/:id/upvote', () => {
  it('should returns 404 if id was not founded', async () => {
    const id = generateId()
    const request = await supertest(app).post(`/recommendations/${id}/upvote`)
    expect(request.status).toBe(404)
  })

  it('should returns 200 if id was founded and updated', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData

    await recommendationService.insert(data)

    const request = await supertest(app).post('/recommendations/1/upvote')
    expect(request.status).toBe(200)
  })
})

describe('POST /recommendations/:id/downvote', () => {
  it('should returns 404 if id was not founded', async () => {
    const id = generateId()
    const request = await supertest(app).post(`/recommendations/${id}/downvote`)
    expect(request.status).toBe(404)
  })

  it('should returns 200 if id was founded and updated', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData

    await recommendationService.insert(data)

    const request = await supertest(app).post('/recommendations/1/downvote')
    expect(request.status).toBe(200)
  })
})

describe('GET /recommendations', () => {
  it('should returns 200 with an empty array', async () => {
    const request = await supertest(app).get('/recommendations')
    expect(request.status).toBe(200)
    expect(request.body).toBeInstanceOf(Array)
  })

  it('should returns 200 with an array of recommendations', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData

    await recommendationService.insert(data)

    const request = await supertest(app).get('/recommendations')
    expect(request.status).toBe(200)
    expect(request.body).toBeInstanceOf(Array)
    expect(request.body).toEqual(expect.arrayContaining([{ id: 1, score: 0, ...data }]))
  })
})

describe('GET /recommendations/:id', () => {
  it('should returns 404 if recommendation id was not founded', async () => {
    const id = generateId()
    const request = await supertest(app).get(`/recommendations/${id}`)
    expect(request.status).toBe(404)
  })

  it('should returns 200 if recommendation id was founded', async () => {
    const reccomendationData = recommendation()
    const { id, score, ...data } = reccomendationData

    await recommendationService.insert(data)

    const request = await supertest(app).get('/recommendations/1')
    expect(request.status).toBe(200)
    expect(request.body).toEqual(expect.objectContaining({ id: 1, score: 0, ...data }))
  })
})

describe('GET /recommendations/random', () => {
  it('should returns 404, if there are no recommendations', async () => {
    const result = await supertest(app).get('/recommendations/random')
    const status = result.status
    expect(status).toEqual(404)
  })
})
