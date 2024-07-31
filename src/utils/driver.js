const { Builder } = require("selenium-webdriver");
require("chromedriver");

const buildDriver = async () => {
  let driver = await new Builder().forBrowser("chrome").build();
  return driver;
};

module.exports = buildDriver;
