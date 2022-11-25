// in a new folder be sure to run "npm init -y" and "npm install puppeteer"

const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let initCSV = "imageLink,location,price, landArr, itemLink, itemTitle\r\n";

  function arrayToCsv(csvText, dataScraped) {
    for (let i = 0; i < dataScraped.locArr.length; i++) {
      //imgArr[i],locArr[i],priceArr[i]
      csvText += `${dataScraped.imgArr[i]},`;
      csvText += `"${dataScraped.locArr[i]}",`;
      csvText += `${dataScraped.priceArr[i]},`; //landArr, itemLink, itemTitle
      csvText += `${dataScraped.landArr[i]},`;
      csvText += `${dataScraped.itemLink[i]},`;
      csvText += `${dataScraped.itemTitle[i]}\r\n`;
    }
    return csvText;
  }

  async function scrapePage(pageLink, csvText) {
      await page.goto(
        pageLink,
        {
          waitUntil: "networkidle0",
        }
      );
      // wpl-column>
      const dataScraped = await page.evaluate(() => {
        let items = document.querySelectorAll("div.wpl-column");

        let imgArr=[], locArr=[], priceArr=[], landArr=[], itemLink=[], itemTitle=[];
        // imgArr, locArr, priceArr, landArr, itemLink, itemTitle, bedrooms, bathrooms
        for (let i=0; i<items.length; i++) {
          imgArr.push(items[i].querySelector("div.wpl_gallery_container>a>img").getAttribute("data-src"))
          locArr.push(items[i].querySelector('span[itemprop= "addressLocality"]').textContent)
          priceArr.push(items[i].querySelector('span[itemprop= "price"]').textContent.replaceAll(",", "").replace("Rs", ""))
          if (items[i].querySelector('div.built_up_area')) {landArr.push(items[i].querySelector('div.built_up_area').textContent)}
          else {landArr.push("not shown")}
          itemLink.push(items[i].querySelector('a.noHover').getAttribute("href"))
          itemTitle.push(items[i].querySelector('h3.wpl_prp_title').textContent)
        }
        // let imgArr = Array.from(
        //   document.querySelectorAll("div.wpl_gallery_container>a>img")
        // ).map((x) => x.getAttribute("data-src"));
        // let locArr = Array.from(
        //   document.querySelectorAll('span[itemprop= "addressLocality"]')
        // ).map((x) => x.textContent);
        // let priceArr = Array.from(
        //   document.querySelectorAll('span[itemprop= "price"]')
        // ).map((x) => x.textContent.replaceAll(",", "").replace("Rs", "")
        // );
        //
        // let landArr = Array.from(
        //   document.querySelectorAll('div.built_up_area')
        // ).map((x) =>
        //   x.textContent
        // )
        //
        // let itemLink = Array.from(
        //   document.querySelectorAll('a.noHover')
        // ).map((x) => x.getAttribute("href"));
        //
        //
        // let itemTitle = Array.from(
        //   document.querySelectorAll('h3.wpl_prp_title')
        // ).map((x) => x.textContent);
        //
        // let bedrooms, bathrooms
        // let searchingHouse = false;
        //
        // if (searchingHouse) {
        //   bedrooms = Array.from(
        //     document.querySelectorAll("div.bedroom>span.value")
        //   ).map((x) => x.textContent);
        //   bathrooms = Array.from(
        //     document.querySelectorAll("div.bathroom>span.value")
        //   ).map((x) => x.textContent);
        //
        //   return { imgArr, locArr, priceArr, landArr, itemLink, itemTitle, bedrooms, bathrooms };
        // }

        // let test = document.querySelector("span[itemprop='price']").textContent;
        return { imgArr, locArr, priceArr, landArr, itemLink, itemTitle };
      });

      csvText = arrayToCsv(csvText, dataScraped)
      return csvText;
  }

  for (let i=1; i<=2; i++) {
    let pageLink = `https://gharjagganepal.com/properties-business-for-sale-exchange/house-sale/?wplpage=${i}`
    initCSV = await scrapePage(pageLink, initCSV) //returns updated csvText
    console.log(`finished loading page ${i}`)
  }
  //await fs.writeFile("names.txt", names.join("\r\n"));
  //   let { imgArr, locArr, pricArr } = names;


  // let csvText = arrayToCsv(names);

  require("fs").writeFileSync("FILE3.CSV", initCSV);

  await browser.close();
}

start();
