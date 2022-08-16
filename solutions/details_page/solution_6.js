import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./puppeteer_cache", /// caching for speed boost
    // headless: false, // true opens a visible browser
    // slowMo: 200, // slow down in ms
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:1234/", {
    waitUntil: "networkidle2",
  });
  await page.click("nav a:nth-child(1)");
  const catURLs = await page.evaluate(() => {
    const listOfCats = Array.from(
      document.getElementsByClassName("cat_list-item")
    );
    return listOfCats.map((cat) => cat.href);
  });

  /// go to first page
  await page.goto(catURLs[0], {
    waitUntil: "networkidle2",
  });

  //catJob = the text content of the element with classname of .cat_item-job_title
  const catJob = await page.evaluate(
    () => document.querySelector(".cat_item-job_title").textContent
  );

  console.log(catJob);

  browser.close();
})();
