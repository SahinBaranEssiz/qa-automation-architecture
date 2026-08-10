import { Page, expect } from '@playwright/test';

export class SignupPage {
    private page: Page;

    // İlk Kayıt Alanı Locatörleri
    private nameInput = 'input[data-qa="signup-name"]';
    private emailInput = 'input[data-qa="signup-email"]';
    private signupButton = 'button[data-qa="signup-button"]';

    // Detaylı Form Locatörleri
    private passwordInput = 'input[data-qa="password"]';
    private firstNameInput = 'input[data-qa="first_name"]';
    private lastNameInput = 'input[data-qa="last_name"]';
    private addressInput = 'input[data-qa="address"]';
    private stateInput = 'input[data-qa="state"]';
    private cityInput = 'input[data-qa="city"]';
    private zipcodeInput = 'input[data-qa="zipcode"]';
    private mobileInput = 'input[data-qa="mobile_number"]';
    private createAccountButton = 'button[data-qa="create-account"]';
    
    // Doğrulama Locatörü
    private accountCreatedMessage = 'h2[data-qa="account-created"]';

    constructor(page: Page) {
        this.page = page;
    }

    async startSignupProcess(name: string, email: string) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.signupButton);
    }

    async fillAccountDetails(password: string) {
        // Dinamik Bekleme: Şifre alanı DOM'da görünür (visible) olana kadar bekler
        await this.page.waitForSelector(this.passwordInput, { state: 'visible' });

        await this.page.fill(this.passwordInput, password);
        await this.page.fill(this.firstNameInput, 'Şahin');
        await this.page.fill(this.lastNameInput, 'QA');
        await this.page.fill(this.addressInput, 'Automation Street 123');
        await this.page.fill(this.stateInput, 'Texas');
        await this.page.fill(this.cityInput, 'Dallas');
        await this.page.fill(this.zipcodeInput, '75001');
        await this.page.fill(this.mobileInput, '5551234567');

        await this.page.click(this.createAccountButton);
    }

    async verifyAccountCreated() {
        const message = this.page.locator(this.accountCreatedMessage);
        // Playwright'ın "Auto-retrying" (Otomatik tekrar eden) Assertion (Doğrulama) yapısı.
        await expect(message).toBeVisible();
        await expect(message).toHaveText('Account Created!');
    }
}