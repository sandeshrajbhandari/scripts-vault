started learning webscraping using LearnWebCode yt channel by Brad.
ref code : https://gist.github.com/LearnWebCode/31f8a20ef7e4324aca322a21dbfc3d7e

previously used BeautifulSoup and Selenium w/ python, but getting used to JS as a language, so exploring it.

scrape-loop.js is the useful one, scrape-property.js didn't work where certain values were missing. for eg. for 5 items, only 4 items had land area, couldn't deal with missing values, when selecting lists of all values. for real estate site

scrape-loop.js main logic derived from
https://flaviocopes.com/puppeteer-scraping/#:~:text=Here%E2%80%99s%20the%20full%20source%20code%3A

end goal is to output a csv or json file to use in webapps or wordpress sites for portfolio.

## commit : real estate site scrape script changed, multipage support
- changed scrape-property script and added multpage script for iterating over many pages.
- error for area assignment when land area is missing from an item.
- 
