import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../core/customWorld';
import { HomePage } from '../../pages/HomePage';
import { SignupPage } from '../../pages/SignupPage';

// Helper function to generate dynamic emails for isolated test executions
const generateRandomEmail = () => `qa_lead_${Math.floor(Math.random() * 10000)}@test.com`;

Given('The user is on the Automation Exercise homepage', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.navigateToHome();
});

When('The user proceeds to the signup page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.clickSignupLoginButton();
});

When('The user registers with a randomly generated valid account', async function (this: CustomWorld) {
    const signupPage = new SignupPage(this.page!);
    
    // Generate unique credentials to prevent duplication errors
    const randomEmail = generateRandomEmail();
    
    // Execute the two-step registration flow
    await signupPage.startSignupProcess('QA Automation Engineer', randomEmail);
    await signupPage.fillAccountDetails('TestPassword123!');
});

Then('The system should verify that the account was successfully created', async function (this: CustomWorld) {
    const signupPage = new SignupPage(this.page!);
    await signupPage.verifyAccountCreated();
});