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

  let catList = [];

  await page.click('nav a:nth-child(1)');

  await page.waitForSelector('.cat_list-item', {
    visible: true
  });
  const catURLs = await page.$$eval('.cat_list-item', (items) => items.map((item) => item.href));

  const result = [];

  for (let i = 0; i < catUrls; i++) {
    await page.goto(catUrls[i]);
    await page.waitFor(1000);
    const elements = await page.$$eval(`a[href*="https://mysuperdomain.com/"]`, elements => elements.map(el => el.innerText));
    result.push({
      url: urlsArray[i],
      urlsTexts: elements
    });
  }

  await browser.close();
})();