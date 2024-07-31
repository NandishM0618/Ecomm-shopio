const buildDriver = require("../utils/driver");
const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Search Tests", function () {
  this.timeout(40000);
  let driver;

  before(async function () {
    driver = await buildDriver();
  });

  after(async function () {
    await driver.quit();
  });

  it("should search for a product", async function () {
    await driver.get("http://localhost:3000/search");
    const searchInput = await driver.wait(
      until.elementLocated(By.id("search-input")),
      10000
    );
    await searchInput.sendKeys("macbook");
    const searchButton = await driver.wait(
      until.elementLocated(By.id("search-button")),
      10000
    );
    await searchButton.click();

    await driver.wait(
      until.elementLocated(By.css(".search-results-container")),
      10000
    );
    const searchResults = await driver.findElements(
      By.css(".search-result-item")
    );
    assert(searchResults.length > 0, "No search results found");
  });
});
