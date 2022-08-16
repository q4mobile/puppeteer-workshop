/// first import puppeteer from its module
import puppeteer from "puppeteer";

// Open browser with non-headless mode
// must wrap everything in async/await
// all puppeteer actions are promises
(async () => {
  const browser = await puppeteer.launch({
    headless: true, // false opens a visible browser
    slowMo: 200, // slow down in ms
  });
  await browser.close();
})()(
  
  // 3. Open a new page
  async () => {
    const browser = await puppeteer.launch({
      userDataDir: "./puppeteer_cache", /// caching for speed boost
      headless: false, // true opens a visible browser
      slowMo: 200, // slow down in ms
    });
    const page = await browser.newPage();
  }
)()


  // 4. navigate to page and wait for it to finish loading
  // for page.goto, there are two parameters.
  // first - URL to navigate to
  // second - object that has a key waitUntil with a value of networkidle2
  // networkidle2 will wait until there are 2 or less active connections before moving onto the next task.
  // helpful when you want to wait for content to appear on the page
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
  }
)();

// click on nav link to open directory of cats
await page.click("nav a:nth-child(1)");

// Interact with the content using page.evaluate
// everything within its page.evaluate is run on the browser
// not node. ie. console logs won't appear in node
console.log("dog");
const catURLs = await page.evaluate(() => {
  console.log("cat");
});

// Move to browser
// have it return the correct data from browser and then paste into the evaluate function
const listOfCats = document.getElementsByClassName("cat_list-item");

// change type to array
typeof listOfCats;

const listOfCats = Array.from(document.getElementsByClassName("cat_list-item"));

//return all hrefs of cat
return listOfCats.map((cat) => cat.href);

//final function:
const catURLs = await page.evaluate(() => {
  const listOfCats = Array.from(
    document.getElementsByClassName("cat_list-item")
  );
  return listOfCats.map((cat) => cat.href);
});

// Go to each URL and scrape text

// Multi-step:
// lets first scrape a single page
// Go to URL

  /// go to first page
  await page.goto(catURLs[0], {
    waitUntil: "networkidle2",
  });

  // catJob = the text content of the element with classname of .cat_item-job_title
  const catJob = await page.evaluate(
    () => document.querySelector(".cat_item-job_title").textContent
  );


// now lets scrape them all
// scrape all text
const text = el.evaluate((el) => el.textContent());

// Make into loop to scrape all pages

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
