//import fs
const fs = require("fs");
//import path
const path = require("path");
//write a script that selects every x files in a folder
// and moves them to a new folder  (x is a number you can change)\
moveEveryXFiles("everyXfiles images", "filtered", 7);
function moveEveryXFiles(source, dest, x) {
  // get the list of files in the source folder
  const files = fs.readdirSync(source);
  // loop through the list of files
  for (let i = 0; i < files.length; i++) {
    // if the index is a multiple of x
    if (i % x === 0) {
      // move the file to the destination folder using path
      fs.renameSync(path.join(source, files[i]), path.join(dest, files[i]));
    }
  }
}
