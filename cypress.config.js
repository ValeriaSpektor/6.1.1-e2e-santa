const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1tgoib',
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
