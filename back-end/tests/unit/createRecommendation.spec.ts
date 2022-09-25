import { recommendationService } from '../../src/services/recommendationsService'
import { recommendationRepository } from '../../src/repositories/recommendationRepository'
import { recommendation } from '../factories/recommendations'

beforeEach(() => {
  jest.resetAllMocks()
  jest.clearAllMocks()
})

describe('Create a Recommendation', () => {
  it('should throw an error if the recommendation already exists', async () => {
    const recommendationData = recommendation()
    jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => recommendationData)

    const { id, score, ...insertData } = recommendationData
    const promise = recommendationService.insert(insertData)

    await expect(promise).rejects.toEqual({
      type: 'conflict',
      message: 'Recommendations names must be unique'
    })
  })

  it('should create recommendation', async () => {
    const recommendationData = recommendation()
    jest.spyOn(recommendationRepository, 'findByName').mockReturnValueOnce(null)
    jest.spyOn(recommendationRepository, 'create').mockImplementationOnce((): any => recommendationData)

    const { id, score, ...insertData } = recommendationData
    await recommendationService.insert(insertData)

    expect(recommendationRepository.findByName).toBeCalled()
    expect(recommendationRepository.create).toBeCalled()
  })
})
