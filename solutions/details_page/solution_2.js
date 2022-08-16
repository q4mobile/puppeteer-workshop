import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false,
    slowMo: 200, // slow down in ms
  });

  //opens a new page
  const page = await browser.newPage();

  // directing page to the URL: "localhost:1234"
  await page.goto("http://localhost:1234/");

  await browser.close();
})();
