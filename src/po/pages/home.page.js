class HomePage {
    get usernameInput() { return $('//input[@id="user-name"]'); }
    get passwordInput() { return $('//input[@id="password"]'); }
    get loginButton() { return $('//input[@id="login-button"]'); }
    get errorMessage() { return $('//div[@class="error-message-container"]'); }
  
    async login(username, password) {
      await this.usernameInput.setValue(username);
      await this.passwordInput.setValue(password);
    }
  
    async clearUsername() {
      await this.usernameInput.clearValue();
    }
  
    async clearPassword() {
      await this.passwordInput.clearValue();
    }
  
    async clickLogin() {
      await this.loginButton.click();
    }
  
    async getErrorMessage() {
      return (await this.errorMessage).getText();
    }
  }
  
  module.exports = new HomePage();
  