import puppeteer from "puppeteer";
/// import the file system module 
import fs from "fs";

/// reading from form_data.json and storing the contents in the variable, formData
const formData = JSON.parse(fs.readFileSync("form_data.json"));

console.log(formData);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 150,
  });

  browser.close();
})();
