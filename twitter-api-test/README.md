# test scripts to test twitter api to retrieve and manage bookmarks and like tweets.

- main purpose is to browse through old saved bookmarks and liked tweets in a two or three column view, similar to tweetdeck but with more control.
- tweetdeck is a very good alternative to this, but I started this for personal use with more customization

## MVP / Beginning scripts
- tried writing the script on a codepen or using client side, but twitter doesn't allow it and throws CORS error.
- so had to create this npm server-side package.
- import is not usable without the `"type":"module"` in package.JSON
- sample code includes a decent example for my usecase.
  - https://github.com/twitterdev/bookmarks-search
  - live version https://bookmarksearch.glitch.me/
  - gonna use this as a base to create the web app later.
