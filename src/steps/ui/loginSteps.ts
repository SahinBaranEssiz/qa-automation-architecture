import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../core/customWorld';
import { HomePage } from '../../pages/HomePage';
import { SignupPage } from '../../pages/SignupPage';
import { LoginPage } from '../../pages/LoginPage';

// Dynamic test data object that persists throughout the test execution session
const testSession = {
    username: 'QA Tester',
    email: `qa_lead_${Math.floor(Math.random() * 10000)}@test.com`,
    password: 'TestPassword123!'
};

Given('A brand new user account is created and logged out', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    const signupPage = new SignupPage(this.page!);
    const loginPage = new LoginPage(this.page!);

    // Setup Pre-condition: Register a fresh user silently in the background
    await homePage.navigateToHome();
    await homePage.clickSignupLoginButton();
    await signupPage.startSignupProcess(testSession.username, testSession.email);
    await signupPage.fillAccountDetails(testSession.password);
    await signupPage.verifyAccountCreated();
    
    // Logout to leave a clean state for the upcoming login tests
    await loginPage.logout();
});

Given('The user is on the Automation Exercise login page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    const loginPage = new LoginPage(this.page!);

    // Navigate to the base URL and access the login portal
    await homePage.navigateToHome();
    await homePage.clickSignupLoginButton();

    // Assert that the page has loaded successfully before proceeding
    await loginPage.verifyLoginPageVisible();
});

When('The user logs in with the newly created credentials', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    
    // Utilize the dynamic credentials generated during the pre-condition setup
    await loginPage.login(testSession.email, testSession.password);
});

Then('The system should verify that the user is logged in', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.verifyLoggedInUser(testSession.username);
});

Then('The user deletes the account successfully', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.deleteAccount();
    await loginPage.verifyAccountDeleted();
});

When('The user tries to login with {string} and {string}', async function (this: CustomWorld, email: string, password: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.login(email, password);
});

Then('The system should show the login error message', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.verifyLoginError();
});

Then('The browser should show a native validation warning on the email field', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.verifyNativeValidationWarning();
});