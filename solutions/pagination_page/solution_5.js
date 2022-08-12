import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false,
    slowmo: 3000,
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:1234/", {
    waitUntil: "networkidle2",
  });

  await page.click("nav a:nth-child(2)");

  await page.waitForSelector(".people_table");

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
    return page.evaluate(() => {
      const nextPageButton = document.querySelector(".next_page");
      return !nextPageButton.classList.contains("disabled");
    });
  };

  /// array where all names will be push. Initialized outside of while loop to set scope
  const finalList = [];
  /// Assuming there is more than 1 page. Setting it to true so will scrape first page
  let nextPageAvailable = true;

  /// run code block as long as there is a next page
  while (nextPageAvailable) {
    /// Scraping current table
    const currentPageNames = await scrapeTable();
    /// pushing the scraped names from the current table to finalList array
    finalList.push(...currentPageNames);
    /// Changing page
    await nextPage();
    /// Updatae nextPageAvailable and re-run loop if true
    nextPageAvailable = await isNextPageAvailable();
  }

  console.log(finalList);

  await browser.close();
})();
