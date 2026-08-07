module.exports = {
  default: {
    requireModule: [
      "ts-node/register", 
      "tsconfig-paths/register"
    ],
    paths: [
      "src/features/**/*.feature"
    ],
    require: [
      "src/steps/**/*.ts",
      "src/core/**/*.ts"
    ],
    format: [
      "summary",
      "progress-bar"
    ],
    formatOptions: {
      snippetInterface: "async-await"
    }
  }
}