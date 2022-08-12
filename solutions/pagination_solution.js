import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    headless: false,
    slowmo: 150,
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

  const finalList = [];
  let nextPageAvailable = true;

  while (nextPageAvailable) {
    const currentPageNames = await scrapeTable();
    finalList.push(...currentPageNames);
    await nextPage();
    nextPageAvailable = await isNextPageAvailable();
  }

  console.log(finalList);

  await browser.close();
})();
