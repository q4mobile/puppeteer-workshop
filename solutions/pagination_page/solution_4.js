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
    const currentPageNames = await page.evaluate(() => {
      const firstNameElements = Array.from(
        document.querySelectorAll(".person_first-name")
      );
      return firstNameElements.map((el) => el.textContent);
    });
    return currentPageNames;
  };

  const nextPage = async () => {
    await page.evaluate(() => {
      const nextPageButton = document.querySelector(".next_page");
      nextPageButton.click();
    });
  };

  const isNextPageAvailable = async () => {
    // returning a true or false if a next page is available
    return page.evaluate(() => {
      /// selector for the next page button
      const nextPageButton = document.querySelector(".next_page");
      /// returns true if the next page button has the "disabled" class else returns false
      return !nextPageButton.classList.contains("disabled");
    });
  };

  await browser.close();
})();
