module.exports = {
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
  };
  