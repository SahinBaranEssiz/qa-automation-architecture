import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './customWorld';

// 1. Kriz Çözümü: Cucumber'ın 5 saniyelik limitini 60 saniyeye çıkarıyoruz
setDefaultTimeout(60 * 1000);

let browser: Browser;

BeforeAll(async function () {
    // 2. Kriz Çözümü: Tarayıcıyı GÖRÜNÜR (headless: false) olarak başlatıyoruz
    browser = await chromium.launch({ 
        headless: false, // Ekranda tarayıcıyı görmemizi sağlar
        args: ['--start-maximized'] // Tarayıcıyı tam ekran açar
    });
});

Before(async function (this: CustomWorld) {
    // Her senaryodan önce tertemiz bir gizli sekme (context) ve sayfa oluşturuyoruz
    this.context = await browser.newContext({ viewport: null });
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
    // Test bitince arkamızda çöp bırakmıyoruz (İzolasyon)
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    // Tüm testler bitince tarayıcıyı tamamen kapatıyoruz
    await browser?.close();
});