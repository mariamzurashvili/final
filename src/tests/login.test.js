const assert = require('assert');
const HomePage = require('../po/pages/home.page');
const testData = require('../data/testData.json');


describe('Login Form Tests', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
  });

  Object.keys(testData).forEach((testCase) => {
    const { username, password, expectedErrorMessage, expectedTitle } = testData[testCase];

    it(`UC-${testCase}: Test Login form - ${testCase}`, async () => {
      await HomePage.login(username, password);

      if (username === '' && password === '') {
        await HomePage.clearUsername();
        await HomePage.clearPassword();
      } else if (password === '') {
        await HomePage.clearPassword();
      }

      await HomePage.clickLogin();

      if (expectedErrorMessage) {
        const errorMessage = await HomePage.getErrorMessage();
        assert(errorMessage.includes(expectedErrorMessage), `Expected error message: "${expectedErrorMessage}"`);
      } else if (expectedTitle) {
        const title = await browser.getTitle();
        assert.strictEqual(title, expectedTitle);
      }
    });
  });
});
