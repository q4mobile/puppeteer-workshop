import puppeteer from "puppeteer";
import fs from "fs";

const formData = JSON.parse(fs.readFileSync("form_data.json"));

console.log(formData);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 150,
  });

  browser.close();
})();
