import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: false, // true opens a visible browser
    slowMo: 200 // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });
  await page.click('nav a:nth-child(1)');

  const catURLs = await page.evaluate(() => {
    /// All of this code is run on the browser
    // 8.2 wait for specific element to appear by selector
    const sel = '.cat_item-job_title';
    const el = await page.waitForSelector(sel);

    // 8.3 scrape all text
    const text = el.evaluate(el =>el.textContent());
    });
    console.log(catURLs);
})();
