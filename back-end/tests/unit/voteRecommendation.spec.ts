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
})
