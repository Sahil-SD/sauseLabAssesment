// @ts-check
const { defineConfig, devices } = require("@playwright/test");

const environment = process.env.TestEnv || "dev";
const fs = require("fs");

const reportDir = "test-report";

global.logger = require("./src/e2e/utils/logger");

const getConfig = (env) => {
  try {
    const configFile = `./src/e2e/enviroments/${env}-config.json`;
    const configData = fs.readFileSync(configFile, "utf8");
    return JSON.parse(configData);
  } catch (err) {
    logger.error(`Error reading config file for ${env}:`, err);
    return {};
  }
};

const config = getConfig(environment);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./src/e2e",
  timeout: 15 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: "allure-playwright",
  reporter: [
    ["html", { open: "never", outputFolder: `${reportDir}/playwright-report` }],
    ["allure-playwright", { resultsDir: `${reportDir}/allure-results`, detail: true, suiteTitle: true }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "on",
    baseURL: config.baseUrl,
    // Record trace only when retrying a test for the first time.
    trace: "on",

    // Record video only when retrying a test for the first time.
    video: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ["--start-fullscreen"],
          channel: "chrome",
          headless: true,
        },
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        ...devices["Desktop Edge"],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ["--start-fullscreen"],
          channel: "msedge",
          headless: true,
        },
      },
    },
  ],
});
