import puppeteer from 'puppeteer';

// 2. Open browser in with headless = false
// must wrap everything in async/await
(async () => {
  const browser = await puppeteer.launch({
    headless: false, // false opens a visible browser
    slowMo: 200 // slow down in ms
  });
})();
