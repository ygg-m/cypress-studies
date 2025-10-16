const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "https://www.cnarios.com/",

    // Não vai limpar o estado da tela após cada it
    // testIsolation: false,
  },
});
