const buildDriver = require("../utils/driver");
const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Add to Cart Tests", function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    driver = await buildDriver();
  });

  after(async function () {
    await driver.quit();
  });

  it("should add product to cart", async function () {
    await driver.get("http://localhost:3000/products");
    await driver.findElement(By.css(".product-link")).click();
    await driver.wait(
      until.elementLocated(By.css(".add-to-cart-button")),
      10000
    );
    await driver.findElement(By.css(".add-to-cart-button")).click();
    await driver.wait(until.elementLocated(By.css(".cart-count")), 10000);
    const cartCount = await driver.findElement(By.css(".cart-count")).getText();
    assert.strictEqual(parseInt(cartCount), 1);
  });
});
