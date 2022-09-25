import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import { generateId, recommendation } from '../factories/recommendations'

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
})

describe('gets Recommendation', () => {
  it('getById should throws if not found id', async () => {
    const id = generateId()
    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce(null)
    const promise = recommendationService.getById(id)

    await expect(promise).rejects.toEqual({
      type: 'not_found',
      message: ''
    })
  })

  it('getById should returns the recommendation if found', async () => {
    const recommendationData = recommendation()
    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => recommendationData)
    const promise = await recommendationService.getById(recommendationData.id)

    expect(promise).toEqual(recommendationData)
  })

  it('get should calls findAll', async () => {
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => [])
    const promise = await recommendationService.get()

    expect(promise).toBeInstanceOf(Array)
    expect(recommendationRepository.findAll).toHaveBeenCalled()
  })

  it('getTop should calls getAmountByScore', async () => {
    const amount = 999
    jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce((): any => [])
    const promise = await recommendationService.getTop(amount)

    expect(promise).toBeInstanceOf(Array)
    expect(recommendationRepository.getAmountByScore).toHaveBeenCalled()
  })

  it('getRandom should throws if getByScore length is zero', async () => {
    const arr = []
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => { return arr })
    const promise = recommendationService.getRandom()

    await expect(promise).rejects.toEqual(
      {
        type: 'not_found',
        message: ''
      }
    )
  })

  it('getRandom should returns an recommendation', async () => {
    const recommendationData = recommendation()
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => [recommendationData])
    const promise = await recommendationService.getRandom()
    expect(promise).toEqual(recommendationData)
  })

  it('getRandom should returns an recommendation with getByScore equals to "lte"', async () => {
    const recommendationData = recommendation()
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.8)
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => [recommendationData])
    const promise = await recommendationService.getRandom()
    expect(promise).toEqual(recommendationData)
  })
})
