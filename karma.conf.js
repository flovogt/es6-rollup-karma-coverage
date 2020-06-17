// Only use Chrome/Firefox for debugging or test with one headless browser
const browser = process.env.DEBUG || process.env.BROWSER ? [process.env.BROWSER] : ["ChromeHeadless", "FirefoxHeadless"];

let customLaunchers;
// Add headless Firefox and chrome with no sandbox
if (!process.env.DEBUG) {
  customLaunchers = {
    FirefoxHeadless: {
      base: "Firefox",
      flags: ["-headless"]
    },
    ChromeHeadlessNoSandbox: {
      base: "ChromeHeadless",
      flags: ["--no-sandbox"]
    }
  };
}

// Configuration for normal testing
const karmaConfig = {
  files: [
    { pattern: "test/**/*.spec.js", type: "module" },
    { pattern: "src/*.js", type: "module"}
  ],

  // Use proxy for test folder, because Karma has always a base folder before the project
  proxies: {
    "/test/": "/base/test/"
  },

  frameworks: [
    "mocha",
    "chai",
    "sinon"
  ],

  reporters: ["mocha"],

  browsers: browser,

  customLaunchers: customLaunchers,

  singleRun: !process.env.DEBUG
};

// Prepare config to show the coverage of the ./src files
if (process.env.COVERAGE) {
  const istanbul = require("rollup-plugin-istanbul");
  const nodeResolve = require("rollup-plugin-node-resolve");

  // Only test files are necessary, because rollup bundles the other files
  karmaConfig.files = [{ pattern: "test/**/*.spec.js", type: "module" }];

  // Create preprocessor with rollup and istanbul as a plugin
  karmaConfig.customPreprocessors = {
    rollupIstanbul: {
      base: "rollup",
      options: {
        output: {
          name: "index.spec.js",
          sourcemap: true,
          format: "esm"
        },
        plugins: [
          istanbul({
            exclude: ["test/**/*", "node_modules/**/*"]
          }),
          nodeResolve()
        ]
      }
    }
  };
  karmaConfig.preprocessors = {"test/**/*.spec.js": ["rollupIstanbul"]};
  // Add istanbul reporter
  karmaConfig.reporters.push("coverage-istanbul");
  karmaConfig.coverageIstanbulReporter = {
    reports: ["lcov", "text"],
    thresholds: {
      // Thresholds per file
      each: {
			  statements: 100,
			  lines: 100,
			  branches: 100,
			  functions: 100
      }
    }
  };
}

module.exports = function(config) {
  config.set(karmaConfig);
};