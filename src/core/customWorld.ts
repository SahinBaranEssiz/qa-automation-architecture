import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { BrowserContext, Page, PlaywrightTestOptions } from "@playwright/test";

export interface CucumberWorldConstructorParams {
    parameters: { [key: string]: string };
}

export class CustomWorld extends World {
    context?: BrowserContext;
    page?: Page;
    playwrightOptions?: PlaywrightTestOptions;
    authService?: any;
    userService?: any;
    productService?: any;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

// Cucumber'a varsayılan World objesi yerine bizim CustomWorld'ü kullanmasını söylüyoruz
setWorldConstructor(CustomWorld);