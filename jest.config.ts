export default {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }

}
