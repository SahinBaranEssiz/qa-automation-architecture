import { Given, When, Then } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from '../../core/customWorld';
import { AuthService, apiStorage } from '../../services/AuthService';
import { UserService } from '../../services/UserService';

Given('The user has successfully logged in and obtained a token', async function (this: CustomWorld) {
    // Fallback: Perform a silent background login if this scenario is executed in isolation without a cached token
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
    this.userService = userService; 
});

Then('The profile API response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
    await this.userService.verifyStatusCode(statusCode);
});

Then('The response should contain the user details including the username {string}', async function (this: CustomWorld, username: string) {
    await this.userService.verifyUsername(username);
});