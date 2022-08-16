import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false, /// opens browser in headless mode
    slowMo: 200, // slow down in ms between each action
  });

  await browser.close();
})();
