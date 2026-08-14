import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;

    // Kapsüllenmiş Elementler (Encapsulation)
    private loginEmailInput = 'input[data-qa="login-email"]';
    private loginPasswordInput = 'input[data-qa="login-password"]';
    private loginButton = 'button[data-qa="login-button"]';
    private loggedInUserText = 'i.fa-user + b';
    private deleteAccountLink = 'a[href="/delete_account"]';
    private accountDeletedHeader = 'h2[data-qa="account-deleted"]';
    private logoutLink = 'a[href="/logout"]';
    private continueButton = '[data-qa="continue-button"]';
    // Sitenin giriş formundaki hata mesajı genelde formun içindeki kırmızı bir 'p' etiketidir.
    private loginErrorMessage = 'form[action="/login"] p';

    constructor(page: Page) {
        this.page = page;
    }

    async verifyLoginPageVisible() {
        const loginHeader = this.page.locator('h2', { hasText: 'Login to your account' });
        await expect(loginHeader).toBeVisible();
    }

    async login(email: string, password: string) {
        await this.page.fill(this.loginEmailInput, email);
        await this.page.fill(this.loginPasswordInput, password);
        await this.page.click(this.loginButton);
    }

    async verifyLoggedInUser(username: string) {
        const userLocator = this.page.locator(this.loggedInUserText);
        await expect(userLocator).toHaveText(username);
    }

    async logout() {
        await this.page.click(this.continueButton);
        await this.page.click(this.logoutLink);
    }

    async deleteAccount() {
        await this.page.click(this.deleteAccountLink);
    }

    async verifyAccountDeleted() {
        const deleteMessage = this.page.locator(this.accountDeletedHeader);
        await expect(deleteMessage).toBeVisible();
        await expect(deleteMessage).toHaveText('Account Deleted!');
        await this.page.click(this.continueButton);
    }

    async verifyLoginError() {
        const errorText = this.page.locator(this.loginErrorMessage);
        await expect(errorText).toBeVisible();
        await expect(errorText).toHaveText('Your email or password is incorrect!');
    }
    async verifyNativeValidationWarning() {
        const validationMessage = await this.page.locator(this.loginEmailInput).evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(validationMessage.length).toBeGreaterThan(0);
        //console.log(`\n[INFO] HTML5 Browser Warning Encountered: "${validationMessage}"`);
    }

}