import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false, // true opens a visible browser
    slowMo: 200, // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:1234/", {
    waitUntil: "networkidle2",
  });
  await page.click("nav a:nth-child(1)");
  const catURLs = await page.evaluate(() => {
    const listOfCats = Array.from(
      document.getElementsByClassName("cat_list-item")
    );
    return listOfCats.map((cat) => cat.href);
  });
  const results = [];
  const sel = ".cat_item-job_title";

  for (let i = 0; i < catURLs.length; i += 1) {
    await page.goto(catURLs[i], {
      waitUntil: "networkidle2",
    });

    const el = await page.waitForSelector(sel);
    const catJob = await el.evaluate((el) => el.textContent);
    results.push(catJob);
  }

  console.log(results);
})();
