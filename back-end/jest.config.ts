
export default {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/services/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
