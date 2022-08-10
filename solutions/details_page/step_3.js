import puppeteer from 'puppeteer';

// 3. Open a new page
(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: false, // true opens a visible browser
    slowMo: 200 // slow down in ms
  });
  const page = await browser.newPage();
  await browser.close();
})();
