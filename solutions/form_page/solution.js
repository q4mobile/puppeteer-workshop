import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false,
    slowMo: 50,
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:1234/", {
    waitUntil: "networkidle2",
  });
  await page.click("nav a:nth-child(3)");

  await page.type("input#name-input", "Bhaag");
  await page.type("input#email-input", "Bhaag@bhaagmail.com");
  await page.click('button[type="submit"');
  await page.click('button[type="button"');

  await browser.close();
})();
