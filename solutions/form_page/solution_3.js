import puppeteer from "puppeteer";
import fs from "fs";

const formData = JSON.parse(fs.readFileSync("form_data.json"));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 150,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.goto("http://localhost:1234/", {
    waitUntil: "networkidle2",
  });

  await page.click("nav a:nth-child(3)");

  // for each item in formData
  for (let i = 0; i < formData.length; i += 1) {
    /// type in the input
    await page.type("input#name-input", formData[i].name);
    await page.type("input#email-input", formData[i].email);
    // if the person has isPresent equal to true, then check the box, else do nothing
    if (formData[i].isPresent) {
      await page.click("input#is-present-input");
    }
    // click the submit button
    await page.click('button[type="submit"');
  }
  browser.close();
})();
