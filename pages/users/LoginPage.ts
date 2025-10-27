import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Email")
    this.passwordInput = page.getByPlaceholder("Password")
    this.loginButton = page.getByText("Sign In")
  }

  async goto() {
    await this.page.goto('http://13.52.122.247/auth/login'); 
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
  await expect(this.page).toHaveURL(/.*portal.*/, { timeout: 30000 });
  //if this becomes flaky, use a dashboard ui element to assert
  }
}
