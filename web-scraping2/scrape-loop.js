// in a new folder be sure to run "npm init -y" and "npm install puppeteer"

const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let finalList = [];

  for (let i = 1; i <= 3; i++) {
    // go through different pages
    await page.goto(
      `https://gharjagganepal.com/properties-business-for-sale-exchange/land-sale/?wplpage=${i}`,
      {
        waitUntil: "domcontentloaded",
      }
    );
    const pageList = await page.evaluate(() => {
      list = [];
      const items = document.querySelectorAll(".wpl-column");

      for (const item of items) {
        list.push({
          link: item.querySelector("a.noHover").getAttribute("href"),
          imgLink: item
            .querySelector("div.wpl_gallery_container>a>img")
            .getAttribute("data-src"),
          loc: item.querySelector('span[itemprop= "addressLocality"]')
            .textContent,
          price: item
            .querySelector('span[itemprop= "price"]')
            .textContent.replaceAll(",", "")
            .replace("Rs", ""),
          area: item.querySelector(".built_up_area")
            ? item.querySelector(".built_up_area").textContent
            : "N/A",
        });
      }

      return list;
    });
    // join the list of one page to finalList
    finalList = finalList.concat(pageList);
  }
  await browser.close();
  console.log(finalList.length);
  console.log(finalList[24]);
}

start();
