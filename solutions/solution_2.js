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

  await page.click('nav a:nth-child(2)');

  const table = await page.waitForSelector('.people_table');

  async function scrapeTable(sel) {
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      let tableData = [];
      rows.forEach((row) => {
        tableData.push(row.map(td => [{
          value: td.innerText,
          class: td.className
        }]));
      });
      return tableData;
      console.log(data);
    });
  }

  async function nextPage() {
    const el = await page.$('.next_page');
    await el.click('.next_page"]');
  }

  await scrapeTable('.people_table td');

  // await nextPage();
  // await nextPage();
  // await nextPage();
  // await nextPage();

  await browser.close();
})();