import { Page } from '@playwright/test';

export class SignupPage {
    private page: Page;

    // Locators for the Signup/Login page
    private nameInput = 'input[data-qa="signup-name"]';
    private emailInput = 'input[data-qa="signup-email"]';
    private signupButton = 'button[data-qa="signup-button"]';

    // Locators for the Registration Form (Mandatory fields only for speed)
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

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Registers a completely new user using a unique email address based on the current timestamp.
     * This prevents the "Email already exists" error during repetitive test executions.
     */
    async registerDynamicUser() {
        // 1. Generate a unique email using JavaScript's Date.now()
        const dynamicEmail = `qa_test_${Date.now()}@automation.com`;
        
        // 2. Navigate to the login/signup page and start the signup process
        await this.page.goto('https://automationexercise.com/login');
        await this.page.locator(this.nameInput).fill('QA Automation Engineer');
        await this.page.locator(this.emailInput).fill(dynamicEmail);
        await this.page.locator(this.signupButton).click();

        // 3. Fill out the mandatory fields in the registration form
        await this.page.locator(this.passwordInput).fill('SecurePass123!');
        await this.page.locator(this.firstNameInput).fill('QA');
        await this.page.locator(this.lastNameInput).fill('Engineer');
        await this.page.locator(this.addressInput).fill('123 Automation Avenue');
        await this.page.locator(this.countrySelect).selectOption('United States');
        await this.page.locator(this.stateInput).fill('New York');
        await this.page.locator(this.cityInput).fill('New York');
        await this.page.locator(this.zipcodeInput).fill('10001');
        await this.page.locator(this.mobileInput).fill('1234567890');
        
        // 4. Submit the form
        await this.page.locator(this.createAccountButton).click();
        console.log(`[INFO] New account created successfully with email: ${dynamicEmail}`);

        // 5. Click continue to bypass the "Account Created" success page
        await this.page.locator(this.continueButton).click();
    }
}