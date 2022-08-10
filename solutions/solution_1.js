import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: './puppeteer_cache', /// caching for speed boost
    headless: true, // false opens a visible browser
    // slowMo: 200 // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1234/', {
    waitUntil: 'networkidle2'
  });

  await page.click('nav a:nth-child(1)');

  await page.waitForSelector('.cat_list-item');

  const catURLs = await page.evaluate(() => {
    const listOfCats = Array.from(document.getElementsByClassName('cat_list-item'));
    return listOfCats.map((cat) => cat.href);
  });

  async function scrapeAllUrls(urls, sel) {
    const results = [];

    for (let i = 0; i < urls.length; i += 1) {
      await page.goto(urls[i], {
        waitUntil: "networkidle2"
      });
      const el = await page.waitForSelector(sel);
      results.push(await el.evaluate(el => el.textContent.trim()));
    }
    return results;
  }

  const textContent = await scrapeAllUrls(catURLs, '.cat_item');
  console.log(textContent);
  await browser.close();
})();
