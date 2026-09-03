import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, PlaywrightTestOptions } from "@playwright/test";

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

/**
 * Custom World environment for Cucumber.
 * Acts as a shared state container holding Playwright browser instances and API services across step definitions.
 */
export class CustomWorld extends World {
    // UI (Playwright) instances
    context?: BrowserContext;
    page?: Page;
    browser?: Browser;
    playwrightOptions?: PlaywrightTestOptions;
    
    // API Service instances
    authService?: any;
    userService?: any;
    productService?: any;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);