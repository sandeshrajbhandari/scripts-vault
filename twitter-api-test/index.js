
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
async function runProgram () {
const queryParams="users/395739576/liked_tweets" //my profile twitter id.
console.log("test")
const response = await fetch( `https://api.twitter.com/2/users/395739576/liked_tweets`,
    {
      method : "GET",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_KEY}`
      },
      mode: 'cors',
    }
  );
  // console.log(response);
const tweets = await response.json();
console.log("test2")
console.log(tweets);
}

runProgram();
