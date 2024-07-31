const buildDriver = require("../utils/driver");
const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Login Tests", function () {
  this.timeout(40000);
  let driver;

  before(async function () {
    driver = await buildDriver();
  });

  after(async function () {
    await driver.quit();
  });

  it("should login and logout successfully", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("email")).sendKeys("zoro@mail.com");
    await driver
      .findElement(By.name("password"))
      .sendKeys("zorospassword", Key.RETURN);
    await driver.wait(until.urlIs("http://localhost:3000/"), 10000);
    const profile = await driver.wait(
      until.elementLocated(By.css(".my-profile")),
      15000
    );
    await profile.click();

    const logout = await driver.wait(
      until.elementLocated(By.css(".logout-button")),
      15000
    );
    await logout.click();
    await driver.wait(until.urlIs("http://localhost:3000/login"), 10000);
    const logoutUrl = await driver.getCurrentUrl();
    assert.strictEqual(logoutUrl, "http://localhost:3000/login");
  });
});
