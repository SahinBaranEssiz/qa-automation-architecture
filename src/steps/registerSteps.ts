import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../core/customWorld';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';

// Random veri üretici (Mock Data) - İleride bunu utils klasörüne taşıyacağız
const generateRandomEmail = () => `qa_lead_${Math.floor(Math.random() * 10000)}@test.com`;

Given('The user is on the Automation Exercise homepage', async function (this: CustomWorld) {
    // ! 'this.page!' ifadesindeki ünlem (!), TypeScript'e "Korkma, page objesi kesinlikle var, CustomWorld'den geliyor" demektir.
    const homePage = new HomePage(this.page!);
    await homePage.navigateToHome();
});

When('The user proceeds to the signup page', async function (this: CustomWorld) {
    const homePage = new HomePage(this.page!);
    await homePage.clickSignupLoginButton();
});

When('The user registers with a randomly generated valid account', async function (this: CustomWorld) {
    const signupPage = new SignupPage(this.page!);
    
    // Testin bağımsızlığı için her seferinde benzersiz (unique) bir email üretiyoruz
    const randomEmail = generateRandomEmail();
    
    // Adım 1: İlk kayıt formunu doldur
    await signupPage.startSignupProcess('Şahin QA', randomEmail);
    
    // Adım 2: Detaylı profil formunu doldur
    await signupPage.fillAccountDetails('TestPassword123!');
});

Then('The system should verify that the account was successfully created', async function (this: CustomWorld) {
    const signupPage = new SignupPage(this.page!);
    // Doğrulama (Assertion) işlemini tamamen POM sınıfının içine sakladık!
    await signupPage.verifyAccountCreated();
});