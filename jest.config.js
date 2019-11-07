module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverage: true,
  verbose: true
}
