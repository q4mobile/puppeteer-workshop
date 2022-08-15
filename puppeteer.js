import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // false opens a visible browser
    slowMo: 200, // slow down in ms
  });
})();
