import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });

  await browser.close();
})();