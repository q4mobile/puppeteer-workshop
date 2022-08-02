import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: false,
    slowMo: 250 // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });

  await page.click('nav a:nth-child(1)');

  await browser.close();
})();
