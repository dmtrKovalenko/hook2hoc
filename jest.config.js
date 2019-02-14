module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/__tests__/setup.js"
  ],
  testEnvironment: "node",
  collectCoverage: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
