import puppeteer from "puppeteer";
import fs from "fs";

const formData = JSON.parse(fs.readFileSync("form_data.json"));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 150,
  });

  const page = await browser.newPage();

  // resizing the window for puppeteer to see more content
  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  browser.close();
})();
