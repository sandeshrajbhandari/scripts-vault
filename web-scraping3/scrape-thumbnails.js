const puppeteer = require('puppeteer');

async function scrapeTitles(channelURL) {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  console.log("GOTO")
  await page.goto(
    channelURL,
    {
      waitUntil: "networkidle0",
    }
  );
  await page.setViewport({
        width: 1200,
        height: 800
    });
  // Wait for the page to fully load
  // await page.waitForSelector('#video-title');
  ////// CONTINUE FROM HERE, pc is too slow
  // yt-image,
  // Use the evaluate function to run code within the context of the page
  console.log("evaluating")
  const imgSrcReturn = await page.evaluate(() => {
    window.scrollBy(0, 800);
    
    // Get all the video elements on the page
    // const imgTags = document.querySelectorAll('.yt-core-image'); //yt-image>img
    const imgTags = document.querySelectorAll('yt-image>img')
    // Extract the video titles from the elements
    const imgLinks = Array.from(imgTags).map((el) => el.getAttribute('src'));
    return imgLinks;
  });
  // Close the browser
  console.log("closing browser")
  await browser.close();
  console.log(imgSrcReturn)
}

const channelURL = 'https://www.youtube.com/@Wendoverproductions/videos';
let test = scrapeTitles(channelURL)
console.log("scrapeTitles done")
console.log(test)
// const titles = scrapeTitles(channelURL);
// console.log(titles);
