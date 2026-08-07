import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { CustomWorld } from "./customWorld";

let browser: Browser;

// Tüm testlerden önce SADECE BİR KERE çalışır. Tarayıcı motorunu başlatır.
BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false, // Şimdilik false yapıyoruz ki test koşarken tarayıcıyı görelim
        slowMo: 50, // İsteğe bağlı: Aksiyonları hafif yavaşlatır, görmemizi kolaylaştırır
    });
});

// HER SENARYODAN ÖNCE çalışır. Taptaze bir sekme (page) açar.
Before(async function (this: CustomWorld) {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

// HER SENARYODAN SONRA çalışır. O senaryonun sekmesini (page) kapatır.
After(async function (this: CustomWorld, scenario) {
    // Eğer test başarısız olduysa ekran görüntüsü alıp rapora ekleme mantığını ileride buraya kuracağız!
    
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
});

// Tüm testler bittikten sonra SADECE BİR KERE çalışır. Tarayıcı motorunu tamamen kapatır.
AfterAll(async function () {
    if (browser) {
        await browser.close();
    }
});