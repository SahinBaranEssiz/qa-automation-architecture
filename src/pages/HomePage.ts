import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    // Encapsulation (Kapsülleme): Elementler private, sadece bu sınıf görebilir.
    private signupLoginLink = 'a[href="/login"]';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHome() {
        // YENİ: Sadece HTML (DOM) yüklendiğinde testi devam ettir ve limiti 60 saniyeye çıkar.
        await this.page.goto('https://automationexercise.com/', { 
            waitUntil: 'domcontentloaded', 
            timeout: 60000 
        });
    }

    async clickSignupLoginButton() {
        await this.page.click(this.signupLoginLink);
    }
}