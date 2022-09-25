import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import { generateId } from '../factories/recommendations'

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
})
