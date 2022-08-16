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
      /// select all elements that have the classname of "cat_list-item"
      document.getElementsByClassName("cat_list-item")
    );
    /// iterate through the listOfCats array and return the hrefs from each in an array
    return listOfCats.map((cat) => cat.href);
  });

  // prints out the urls of each details page in an array
  console.log(catURLs);
})();
