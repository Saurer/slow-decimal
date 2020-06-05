module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: true,
  moduleDirectories: ["node_modules", "src"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
};
