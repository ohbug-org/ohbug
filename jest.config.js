module.exports = {
  transform: {
    '^.+\\.ts?x?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['./test/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/index.ts',
    '!**/types.ts',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverage: true,
  verbose: true,
}
