import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;

    // Locators for login operations and account management
    private loginEmailInput = 'input[data-qa="login-email"]';
    private loginPasswordInput = 'input[data-qa="login-password"]';
    private loginButton = 'button[data-qa="login-button"]';
    private loggedInUserText = 'i.fa-user + b';
    private deleteAccountLink = 'a[href="/delete_account"]';
    private accountDeletedHeader = 'h2[data-qa="account-deleted"]';
    private logoutLink = 'a[href="/logout"]';
    private continueButton = '[data-qa="continue-button"]';
    private loginErrorMessage = 'form[action="/login"] p';

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Verifies that the login page elements are successfully loaded.
     */
    async verifyLoginPageVisible() {
        const loginHeader = this.page.locator('h2', { hasText: 'Login to your account' });
        await expect(loginHeader).toBeVisible();
    }

    /**
     * Submits the login form using the provided credentials.
     */
    async login(email: string, password: string) {
        await this.page.fill(this.loginEmailInput, email);
        await this.page.fill(this.loginPasswordInput, password);
        await this.page.click(this.loginButton);
    }

    /**
     * Asserts that the specified username is visible in the top navigation bar.
     */
    async verifyLoggedInUser(username: string) {
        const userLocator = this.page.locator(this.loggedInUserText);
        await expect(userLocator).toHaveText(username);
    }

    /**
     * Logs the user out and terminates the current session.
     */
    async logout() {
        await this.page.click(this.logoutLink);
    }

    /**
     * Initiates the account deletion process from the dashboard.
     */
    async deleteAccount() {
        await this.page.click(this.deleteAccountLink);
    }

    /**
     * Verifies the successful deletion of the user account.
     */
    async verifyAccountDeleted() {
        const deleteMessage = this.page.locator(this.accountDeletedHeader);
        await expect(deleteMessage).toBeVisible();
        await expect(deleteMessage).toHaveText('Account Deleted!');
        await this.page.click(this.continueButton);
    }

    /**
     * Checks if the backend authentication error message is displayed.
     */
    async verifyLoginError() {
        const errorText = this.page.locator(this.loginErrorMessage);
        await expect(errorText).toBeVisible();
        await expect(errorText).toHaveText('Your email or password is incorrect!');
    }

    /**
     * Validates that the browser's native HTML5 validation triggers for invalid inputs.
     */
    async verifyNativeValidationWarning() {
        const validationMessage = await this.page.locator(this.loginEmailInput).evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(validationMessage.length).toBeGreaterThan(0);
        console.log(`\n[INFO] HTML5 Browser Warning Encountered: "${validationMessage}"`);
    }
}