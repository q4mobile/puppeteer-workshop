# Puppeteer Workshop

## To Start:

### Install node modules
```npm i```

### Generate fake data
```npm run generate_data```

### Start site to scrape
```npm run start```

### To run puppeteer script, call the js file with node. (Run in a different terminal than ```npm run start```)
```node {LOCATION OF SCRIPT}```

ex. ```node ./puppeteer.js``` or ```node ./solutions/details_page/solution_7.js``` to run a Solutions


## Tasks:

### Details Pages

1. Run puppeteer in non-headless. In non-headless mode, a chromium browser will open where you can see the actions taken. You can also specify another option of key "slowMo" with an int value specifying milliseonds of time between each action [HINT](https://flaviocopes.com/puppeteer/#:~:text=You%20can%20pass%20an%20object%20with%20options%20to)
2. Open a new page and go to "http://localhost:1234/" [HINT](https://flaviocopes.com/puppeteer/#:~:text=Next%20up%20we%20call%20the)
3. Ensure puppeteer waits for the page to finish loading [HINT](https://flaviocopes.com/puppeteer/#:~:text=networkidle2)
4. Click on the first nav item to open the list of cats [HINT](https://flaviocopes.com/puppeteer/#:~:text=Perform%20a%20mouse%20click%20event)
5. Collect a list of urls for each cat's detail page. Use `page.evaluate(()=>{})` to run javascript on the browser and have it return data [HINT](https://flaviocopes.com/puppeteer/#:~:text=Once%20we%20have%20a%20page%20loaded%20with%20a%20URL)
6. Go to the [first details page](http://localhost:1234/cats/0) and scrape the role text for the cat.
7. Scrape the cat role from all details pages

### Pagination

1. Using puppeteer, navigate to the second nav link
2. Ensure the `<table>` has loaded with `page.waitForSelector(SELECTOR)`[HINT](https://flaviocopes.com/puppeteer/#:~:text=waitForSelector)
3. Write a function that scrapes the first name from the table
4. Write a function that checks if there are additional pages. Hint - the next page button has a `disabled` class when there are no more pages
5. Write a function that presses the next page button
6. Scrape all pages using the 3 functions written in steps 3, 4, 5.

### Form

1. Import fake data to submit into the form from form_data.json.

    We'll be using "fs" to read the file. Please import it: `import fs from "fs";`

    Then using fs, read the json file and store it in a variable: `let formData = JSON.parse(fs.readFileSync('form_data.json'));`

2. Adjust puppeteer's window size after opening a page:

```js
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
```

3. Input all values from `form_data.js` into the form 

Solutions are in vanilla js. If you would like to use jQuery, you can inject it after you open a page with 

```await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.6.0.min.js'});```