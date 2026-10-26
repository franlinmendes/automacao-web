const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Automation Exercise",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: "https://automationexercise.com",
    blockHosts: [
      "*googlesyndication.com",
      "*doubleclick.net",
      "*adtrafficquality.google",
      "*googleadservices.com",
      "*google-analytics.com",
      "*googletagmanager.com",
      "*fundingchoicesmessages.google.com",
    ],
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
