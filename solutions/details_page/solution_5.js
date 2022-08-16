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

  await page.click("nav a:nth-child(1)");

  /// All of this code is run on the browser
  const catURLs = await page.evaluate(() => {
    const listOfCats = Array.from(
      document.getElementsByClassName("cat_list-item")
    );
    return listOfCats.map((cat) => cat.href);
  });

  console.log(catURLs);
})();
