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

  await page.click("nav a:nth-child(2)");

  const scrapeTable = async () => {
    /// using page.evaluate to run code in browser
    const currentPageNames = await page.evaluate(() => {
      /// Converting into array from NodeList Objects
      const firstNameElements = Array.from(
        /// Getting all elements with the class .person_first-name
        document.querySelectorAll(".person_first-name")
      );
      /// returning a new array containing only the text content from the elements array
      return firstNameElements.map((el) => el.textContent);
    });
    /// returning the value that page.evaluate returned
    return currentPageNames;
  };
  await browser.close();
})();
