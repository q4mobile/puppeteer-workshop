import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 150,
  });

  browser.close();
})();
