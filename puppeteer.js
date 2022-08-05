import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: true
    // slowMo: 150 // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });

  await page.click('nav a:nth-child(2)');

  await page.waitForSelector('.cat_list-item', {
    visible: true
  });
})();
