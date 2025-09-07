const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  transformIgnorePatterns: ["/node_modules/"],

  testEnvironment: "node",
};

export default config;