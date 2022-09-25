import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import { generateId, recommendation } from '../factories/recommendations'

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
})

describe('vote Recommendation', () => {
  it('upvote should throws if getById does not find a recommendation', async () => {
    const id = generateId()
    jest.spyOn(recommendationService, 'getById').mockImplementationOnce(null)
    const promise = recommendationService.upvote(id)

    await expect(promise).rejects.toEqual({
      type: 'not_found',
      message: ''
    })
  })

  it('upvote should calls updateScore', async () => {
    const recommendationData = recommendation()

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => recommendationData)
    jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => recommendationData)
    await recommendationService.upvote(recommendationData.id)
    expect(recommendationRepository.updateScore).toHaveBeenCalled()
  })

  it('downvote should throws if getById does not find a recommendation', async () => {
    const id = generateId()
    jest.spyOn(recommendationService, 'getById').mockImplementationOnce(null)
    const promise = recommendationService.downvote(id)

    await expect(promise).rejects.toEqual({
      type: 'not_found',
      message: ''
    })
  })

  it('downvote should calls updateScore', async () => {
    const recommendationData = recommendation()

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => recommendationData)
    jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => recommendationData)
    await recommendationService.downvote(recommendationData.id)
    expect(recommendationRepository.updateScore).toHaveBeenCalled()
  })

  it('downvote should calls remove if score is less than -5', async () => {
    const recommendationData = recommendation()

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => recommendationData)
    jest.spyOn(recommendationRepository, 'remove').mockReturnValueOnce(null)
    jest.spyOn(recommendationRepository, 'updateScore')
      .mockImplementationOnce((): any => Object.assign({}, recommendationData, { score: -6 }))
    await recommendationService.downvote(recommendationData.id)
    expect(recommendationRepository.remove).toHaveBeenCalled()
  })
})
