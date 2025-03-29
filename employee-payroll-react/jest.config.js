module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js",
    "^react-oauth/google$": "<rootDir>/src/__mocks__/reactOAuthMock.js"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)", 
  ],
};
