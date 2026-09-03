import { Page, expect } from '@playwright/test';

export class SignupPage {
    private page: Page;

    // Locators for user registration and onboarding flow
    private nameInput = 'input[data-qa="signup-name"]';
    private emailInput = 'input[data-qa="signup-email"]';
    private signupButton = 'button[data-qa="signup-button"]';
    private passwordInput = 'input[data-qa="password"]';
    private firstNameInput = 'input[data-qa="first_name"]';
    private lastNameInput = 'input[data-qa="last_name"]';
    private addressInput = 'input[data-qa="address"]';
    private countrySelect = 'select[data-qa="country"]';
    private stateInput = 'input[data-qa="state"]';
    private cityInput = 'input[data-qa="city"]';
    private zipcodeInput = 'input[data-qa="zipcode"]';
    private mobileInput = 'input[data-qa="mobile_number"]';
    private createAccountButton = 'button[data-qa="create-account"]';
    private continueButton = '[data-qa="continue-button"]';
    private accountCreatedHeader = 'h2[data-qa="account-created"]';

    constructor(page: Page) {
        this.page = page;
    }

    // ------------------------------------------------------------------
    // STEP-BY-STEP REGISTRATION METHODS (For Register Feature Assertions)
    // ------------------------------------------------------------------

    /**
     * Initiates the signup process by providing a name and email.
     */
    async startSignupProcess(name: string, email: string) {
        await this.page.locator(this.nameInput).fill(name);
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.signupButton).click();
    }

    /**
     * Fills the mandatory fields in the detailed account registration form.
     */
    async fillAccountDetails(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.firstNameInput).fill('QA');
        await this.page.locator(this.lastNameInput).fill('Engineer');
        await this.page.locator(this.addressInput).fill('123 Automation Avenue');
        await this.page.locator(this.countrySelect).selectOption('United States');
        await this.page.locator(this.stateInput).fill('New York');
        await this.page.locator(this.cityInput).fill('New York');
        await this.page.locator(this.zipcodeInput).fill('10001');
        await this.page.locator(this.mobileInput).fill('1234567890');
        
        await this.page.locator(this.createAccountButton).click();
    }

    /**
     * Verifies that the account creation was successful by checking the success message.
     */
    async verifyAccountCreated() {
        const successMessage = this.page.locator(this.accountCreatedHeader);
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toHaveText('Account Created!');
        
        // Click continue to bypass the success screen
        await this.page.locator(this.continueButton).click();
    }

    // ------------------------------------------------------------------
    // END-TO-END METHOD (For Checkout Flow)
    // ------------------------------------------------------------------

    /**
     * Registers a completely new user using a unique email address based on the current timestamp.
     * This prevents the "Email already exists" error during repetitive test executions.
     */
    async registerDynamicUser() {
        const dynamicEmail = `qa_test_${Date.now()}@automation.com`;
        
        await this.page.goto('https://automationexercise.com/login');
        await this.page.locator(this.nameInput).fill('QA Automation Engineer');
        await this.page.locator(this.emailInput).fill(dynamicEmail);
        await this.page.locator(this.signupButton).click();

        await this.page.locator(this.passwordInput).fill('SecurePass123!');
        await this.page.locator(this.firstNameInput).fill('QA');
        await this.page.locator(this.lastNameInput).fill('Engineer');
        await this.page.locator(this.addressInput).fill('123 Automation Avenue');
        await this.page.locator(this.countrySelect).selectOption('United States');
        await this.page.locator(this.stateInput).fill('New York');
        await this.page.locator(this.cityInput).fill('New York');
        await this.page.locator(this.zipcodeInput).fill('10001');
        await this.page.locator(this.mobileInput).fill('1234567890');
        
        await this.page.locator(this.createAccountButton).click();
        console.log(`[INFO] New account created successfully with email: ${dynamicEmail}`);

        await this.page.locator(this.continueButton).click();
    }
}