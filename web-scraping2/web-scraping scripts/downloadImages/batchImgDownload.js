// write a function that downloads images from links in a imageLinks.txt file using axios library
const fs = require("fs");
const axios = require("axios");

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );

var lines = fs.readFileSync("imageLinks.txt").toString().split("\r\n");

for (var i = 0; i < lines.length; i++) {
  (async () => {
    await download_image(lines[i], "image" + i + ".jpg");
    //   console.log(example_image_1.status); // true
    //   console.log(example_image_1.error); // ''
  })();
  // request(lines[i]).pipe(fs.createWriteStream("image" + i + ".jpg"));
}
