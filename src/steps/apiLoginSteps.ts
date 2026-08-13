import { Given, When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../core/customWorld';
import { AuthService } from '../services/AuthService';

// Test boyunca kullanılacak geçici kullanıcı verilerini tutuyoruz
const apiPayload = {
    username: '',
    password: ''
};

Given('The API user has valid credentials {string} and {string}', function (username: string, password: string) {
    apiPayload.username = username;
    apiPayload.password = password;
});

When('A POST request is sent to the DummyJSON login endpoint', async function (this: CustomWorld) {
    const requestContext = await request.newContext();
    const authService = new AuthService(requestContext);
    
    await authService.login(apiPayload.username, apiPayload.password);
    
    this.authService = authService; 
});

Then('The API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    await this.authService.verifyStatusCode(statusCode);
});

Then('The response should contain an access token to be saved for subsequent requests', async function (this: CustomWorld) {
    await this.authService.extractAndSaveToken();
});

Then('The API response error message should be {string}', async function (this: CustomWorld, errorMessage: string) {
    await this.authService.verifyErrorMessage(errorMessage);
});