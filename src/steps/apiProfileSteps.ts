import { Given, When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../core/customWorld';
import { AuthService, apiStorage } from '../services/AuthService';
import { UserService } from '../services/UserService';

Given('The user has successfully logged in and obtained a token', async function (this: CustomWorld) {
    // Harika bir QA Pratiği: Eğer token daha önceki bir testten kaldıysa tekrar login olmuyoruz (Zaman tasarrufu).
    // Ancak bu senaryo tek başına çalıştırılırsa ve token yoksa, arka planda gizlice login olup token'ı alıyoruz.
    if (!apiStorage.accessToken) {
        const requestContext = await request.newContext();
        const authService = new AuthService(requestContext);
        await authService.login('emilys', 'emilyspass');
        await authService.extractAndSaveToken();
    }
});

When('A GET request is sent to the DummyJSON current user endpoint', async function (this: CustomWorld) {
    const requestContext = await request.newContext();
    const userService = new UserService(requestContext);
    
    await userService.getCurrentUser();
    
    // CustomWorld'e kaydediyoruz ki 'Then' adımlarında bu servise ulaşabilelim
    this.userService = userService; 
});

// Çakışmayı önlemek için adım metnini "The profile API response..." olarak özelleştirdik
Then('The profile API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    await this.userService.verifyStatusCode(statusCode);
});

Then('The response should contain the user details including the username {string}', async function (this: CustomWorld, username: string) {
    await this.userService.verifyUsername(username);
});