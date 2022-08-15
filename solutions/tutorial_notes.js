/// 1. first import puppeteer from the module
import puppeteer from 'puppeteer';


// 2. Open browser in with headless = false
// must wrap everything in async/await
(async () => {
    const browser = await puppeteer.launch({
        headless: false, // false opens a visible browser
        slowMo: 200 // slow down in ms
    });
})()


// 3. Open a new page
(async () => {
    const browser = await puppeteer.launch({
        userDataDir: './puppeteer_cache', /// caching for speed boost
        headless: false, // true opens a visible browser
        slowMo: 200 // slow down in ms
    });
    const page = await browser.newPage();
    await browser.close();
})()


// 4. navigate to page and wait for it to finish loading
// for page.goto, there are two parameters. 
// first - URL to navigate to
// second - object that has a key waitUntil with a value of networkidle2
// networkidle2 will wait until there are 2 or less active connections before moving onto the next task. 
// helpful when you want to wait for content to appear on the page
(async () => {
    const browser = await puppeteer.launch({
        userDataDir: './puppeteer_cache', /// caching for speed boost
        headless: false, // true opens a visible browser
        slowMo: 200 // slow down in ms
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:1234/', {
        waitUntil: 'networkidle2'
    });
})();

// 5. click on nav link to open directory of cats
await page.click('nav a:nth-child(1)');

// 6. Interact with the content using page.evaluate
// everything within its page.evaluate is run on the browser
// not node. ie. console logs won't appear in node
const catURLs = await page.evaluate(() => {

});

// 7. Move to browser
// have it return the correct data from browser and then paste into the evaluate function
const listOfCats = document.getElementsByClassName('cat_list-item')

// change type to array
typeof (listOfCats)

const listOfCats = Array.from(document.getElementsByClassName('cat_list-item'));

//return all hrefs of cat
return listOfCats.map((cat) => cat.href);

//final function:
const catURLs = await page.evaluate(() => {
    const listOfCats = Array.from(document.getElementsByClassName('cat_list-item'));
    return listOfCats.map((cat) => cat.href);
});

// 8. Go to each URL and scrape text

// Multi-step:
// lets first scrape a single page
// 8.1 Go to URL

await page.goto(catURLs[1], {
    waitUntil: "networkidle2"
});

// 8.2 wait for specific element to appear by selector
const sel = '.cat_item-job_title';
const el = await page.waitForSelector(sel);

// 8.3 scrape all text
const text = el.evaluate(el =>el.textContent());

// 8.4 Make into loop to scrape all pages

const results = [];
const sel = '.cat_item-job_title';

for (let i = 0; i < catURLs.length; i += 1) {
    await page.goto(catURLs[i], {
        waitUntil: "networkidle2"
    });

    const el = await page.waitForSelector(sel);
    const catJob = await el.evaluate((el) => el.textContent);
    results.push(catJob);
}

console.log(results);