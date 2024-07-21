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
      // Fill the username and password fields
      await HomePage.setUsername(username);
      await HomePage.setPassword(password);

      // Check if the fields contain the entered values
      const enteredUsername = await HomePage.getUsernameValue();
      const enteredPassword = await HomePage.getPasswordValue();
      assert.strictEqual(enteredUsername, username, `Username field should contain "${username}"`);
      assert.strictEqual(enteredPassword, password, `Password field should contain "${password}"`);

      // Clear the fields based on the scenario
      if (testCase === 'emptyCredentials') {
        await HomePage.clearUsername();
        await HomePage.clearPassword();
      } else if (testCase === 'usernameOnly') {
        await HomePage.clearPassword();
      }

      // Click the login button
      await HomePage.clickLogin();

      // Verify the expected outcomes
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
