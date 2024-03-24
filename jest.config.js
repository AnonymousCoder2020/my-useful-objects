export default {
  bail: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx'],
  moduleNameMapper: {
    '^~(.+)': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  testMatch: ['<rootDir>/**/*.test.ts'],
  transformIgnorePatterns: ['/node_modules/(?!next-ts-utility|lodash-es)/'],
  moduleDirectories: [
    'node_modules' //これは必須です
  ],
  testEnvironment: 'node'
}
