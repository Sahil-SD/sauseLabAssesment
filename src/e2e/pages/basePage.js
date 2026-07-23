const { expect } = require("@playwright/test");
const {LOCATORS, DATA} = require("../constants/constants");

const locators = "locators";
const data = "data";

exports.BasePage = class BasePage {
  constructor(page) {
    this.page = page;
  }
  async visitUrl() {
    await this.page.goto("/");
  }

  async reloadPage() {
    await this.page.reload();
  }

  async verifyTitle(titleValue) {
    const expectedValue = await this.findValueOrLocatorFromTestData(
      titleValue,
      data
    );
    const actualValue = await this.page.title();
    expect(actualValue).toContain(expectedValue);
  }

  async findValueOrLocatorFromTestData(filename_key, dataType) {
    const [file, keyString] = filename_key.split("_");
    const fileName = require("../data/" + file + "");
    const testData =
      dataType === DATA
        ? fileName.data
        : dataType === LOCATORS
        ? fileName.locators
        : null;
    if (testData) {
      const entry = await testData.find((entry) => entry.key === keyString);
//      logger.info(`${JSON.stringify(entry)}`);
      if (entry) {
        return await entry.value;
      } else {
        logger.info("Key '" + keyString + "' not found in testData");
      }
    } else {
      throw new Error(
        "Invalid source specified. Use" + data + " or" + locators + "."
      );
    }
  }
  async enterText(inputText, element) {
    this.text = await this.findValueOrLocatorFromTestData(inputText, data);
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.type(this.text);
  }

  async clearText(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.clear();
  }
  async clickElement(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.click();
  }

  async verifyVisibility(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    await this.page.locator(this.locator).waitFor({ state: "visible", timeout: 2000 }); // explicit wait for visibility
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.isVisible();
  }

  async verifyNonVisibility(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.waitFor({ state: "hidden" });
  }

  // this is unused code, keeping this because of fluent wait. but it is already running method in USSEP project.
  async waitUntilLoaderInvisible(elementKey, timeout = 10000) {
    this.locator = await this.findValueOrLocatorFromTestData(elementKey, locators);
    this.elementHandle = await this.page.locator(this.locator);

    const interval = 500; // Check every 500ms
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const count = await this.page.locator(this.locator).count();
      if (count === 0) {
        return; // Loader element not found, exit the function
      }
      const visibility = await this.elementHandle.evaluate(el => window.getComputedStyle(el).visibility);

      if (visibility === 'hidden') {
        return; // Loader is invisible, exit the function
      }
      await this.page.waitForTimeout(interval); // Wait for the interval before checking again
    }

    throw new Error(`Loader did not become invisible within ${timeout}ms`);
  }

  async selectFromDropDown(optionValue, element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.text = await this.findValueOrLocatorFromTestData(optionValue, data);
    await this.page.selectOption(this.locator, this.text);
  }

  async clickAllElement(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    this.elementCount = await this.page.locator(this.locator).count();
    for (let i = 0; i < this.elementCount; i++) {
      await this.elementHandle.click();
    }
  }

  async checkImageIsNotBroken(element) {
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    const imgUrl = await this.elementHandle.getAttribute("src");
    const fullImgUrl = new URL(imgUrl, this.page.url()).href;
    const response = await this.page.evaluate(async (url) => {
      const fetchResponse = await fetch(url);
      return fetchResponse.status;
    }, fullImgUrl);
    expect(response).toBe(200);
  }

  async verifyText(text, element) {
    this.text = await this.findValueOrLocatorFromTestData(text, data);
    this.locator = await this.findValueOrLocatorFromTestData(element, locators);
    this.elementHandle = await this.page.locator(this.locator);
    await this.elementHandle.waitFor({ state: "visible" });
    const eleText = await this.elementHandle.innerText();
    expect(eleText).toBe(this.text);
  }
};
