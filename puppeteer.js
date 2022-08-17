import puppeteer from 'puppeteer'
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  })

  const page = await browser.newPage()
  await page.goto('http://localhost:1234/', { waitUntil: 'networkidle2' })
  await page.click('a[href="/cats"]')

  // const linkList = await page.evaluate(() => {
  //   return Array.from(document.querySelectorAll('.cat_list-item')).map(
  //     (link) => {
  //       return link.href
  //     }
  //   )
  // })
  // linkList.reverse()
  // await page.goto(linkList[0], { waitUntil: 'networkidle2' })

  // const firstCatRole = await page.evaluate(() => {
  //   return document.querySelector('.cat_item-job_title').textContent
  // })
  // /* checking our work */
  // console.log(firstCatRole)

  // const catRoles = []
  // for (let i = 0; i < linkList.length; i += 1) {
  //   await page.goto(linkList[i], { waitUntil: 'networkidle2' })

  //   const role = await page.evaluate(() => {
  //     return document.querySelector('.cat_item-job_title').textContent
  //   })
  //   catRoles.push(role)
  // }
  // console.log(catRoles)

  // pagination task
  const peopleUrl = await page.evaluate(() => {
    return document.querySelector('a[href="/people"]').href
  })
  await page.goto(peopleUrl, { waitUntil: 'networkidle2' })

  await page.waitForSelector('.people_table')

  let firstNames = []

  // const getPageNames = async () => {
  //   await page.evaluate(() => {
  //     firstNames = [
  //       ...firstNames,
  //       Array.from(document.querySelectorAll('.person_first-name')),
  //     ]
  //   })
  // }

  const getAllNames = async () => {
    await page.evaluate(async () => {
      await page.evaluate(() => {
        firstNames = [
          ...firstNames,
          Array.from(document.querySelectorAll('.person_first-name')),
        ]
      })
      const button = document.querySelector('.next_page')
      button.click()
    })
  }

  getAllNames()
  console.log(firstNames)

  // browser.close()
})()
