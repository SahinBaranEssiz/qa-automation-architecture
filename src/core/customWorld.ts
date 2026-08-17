import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, PlaywrightTestOptions } from "@playwright/test";

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export class CustomWorld extends World {
    context?: BrowserContext;
    page?: Page;
    browser?: Browser;
    playwrightOptions?: PlaywrightTestOptions;
    authService?: any;
    userService?: any;
    productService?: any;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);