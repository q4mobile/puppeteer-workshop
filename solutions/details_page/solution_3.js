import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false, // true opens a visible browser
    slowMo: 200, // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });
})();
