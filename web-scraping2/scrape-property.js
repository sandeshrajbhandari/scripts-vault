// in a new folder be sure to run "npm init -y" and "npm install puppeteer"

const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start(pageLink, mainArr) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://gharjagganepal.com/properties-business-for-sale-exchange/house-sale/",
    {
      waitUntil: "networkidle0",
    }
  );

  const names = await page.evaluate(() => {
    let imgArr = Array.from(
      document.querySelectorAll("div.wpl_gallery_container>a>img")
    ).map((x) => x.getAttribute("data-src"));
    let locArr = Array.from(
      document.querySelectorAll('span[itemprop= "addressLocality"]')
    ).map((x) => x.textContent);
    let priceArr = Array.from(
      document.querySelectorAll('span[itemprop= "price"]')
    ).map((x) => x.textContent.replaceAll(",", "").replace("Rs", "")
    );

    let landArr = Array.from(
      document.querySelectorAll('div.built_up_area')
    ).map((x) => {
      x
      // let regexp = /([a-z]+)*([^>]*)/;
      // let landText = x.textContent // 10Dhur, 6AAna, 1kaththa
      // let result = str.match(regexp);
    }
    )
    let bedrooms
    let searchingHouse = true;

    if (searchingHouse) {
      bedrooms = Array.from(
        document.querySelectorAll("div.bedroom>span.value")
      ).map((x) => x.textContent);
      bathrooms = Array.from(
        document.querySelectorAll("div.bathroom>span.value")
      ).map((x) => x.textContent);

      return { imgArr, locArr, priceArr, landArr, bedrooms, bathrooms };
    }

    // let test = document.querySelector("span[itemprop='price']").textContent;
    return { imgArr, locArr, priceArr, landArr };
  });
  await console.log(names.bedrooms)
  //await fs.writeFile("names.txt", names.join("\r\n"));
  //   let { imgArr, locArr, pricArr } = names;

  function arrayToCsv({ imgArr, locArr, priceArr }) {
    let csvText = "imageLink,location,price\r\n";
    for (let i = 0; i < imgArr.length; i++) {
      //imgArr[i],locArr[i],priceArr[i]
      csvText += `${imgArr[i]},`;
      csvText += `"${locArr[i]}",`;
      csvText += `${priceArr[i]}\r\n`;
    }
    return csvText;
  }
  let csvText = arrayToCsv(names);
  require("fs").writeFileSync("FILE2.CSV", csvText);

  //   await page.click("#clickme");
  //   const clickedData = await page.$eval("#data", (el) => el.textContent);
  //   console.log(clickedData);

  //   const photos = await page.$$eval("img", (imgs) => {
  //     return imgs.map((x) => x.src);
  //   });

  //   await page.type("#ourfield", "blue");
  //   await Promise.all([page.click("#ourform button"), page.waitForNavigation()]);
  //   const info = await page.$eval("#message", (el) => el.textContent);

  //   console.log(info);

  //   for (const photo of photos) {
  //     const imagepage = await page.goto(photo);
  //     await fs.writeFile(photo.split("/").pop(), await imagepage.buffer());
  //   }

  await browser.close();
}

start();
