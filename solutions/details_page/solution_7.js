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

  await page.goto(catURLs[0], {
    waitUntil: "networkidle2",
  });

  // creating an array at an outerscope
  let results = [];

  for (let i = 0; i < catURLs.length; i += 1) {
    // go to a cat details page
    await page.goto(catURLs[i], {
      waitUntil: "networkidle2",
    });

    //get the job title from the details page
    const catJob = await page.evaluate(
      () => document.querySelector(".cat_item-job_title").textContent
    );
    // push the text onto the array of catjobs
    results.push(catJob);
  }

  console.log(results);

  browser.close();
})();
