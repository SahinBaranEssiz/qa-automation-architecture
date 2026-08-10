import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    // Encapsulation (Kapsülleme): Elementler private, sadece bu sınıf görebilir.
    private signupLoginLink = 'a[href="/login"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHome() {
        await this.page.goto('https://automationexercise.com/');
        // Dinamik Bekleme: Ağdaki (Network) tüm isteklerin bitmesini bekler. Hard wait yok!
        await this.page.waitForLoadState('networkidle');
    }

    async clickSignupLoginButton() {
        await this.page.click(this.signupLoginLink);
    }
}