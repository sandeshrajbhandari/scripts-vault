//import fs, path
const fs = require("fs");
const path = require("path");
// write a script to sort by name and rename the files in a folder
function sortAndRenameFiles(folder) {
  // get the list of files in the folder
  const files = fs.readdirSync(folder);
  // sort the files
  files.sort();
  // loop through the files
  for (let i = 0; i < files.length; i++) {
    // rename the file
    fs.renameSync(path.join(folder, files[i]), path.join(folder, i + ".jpg"));
  }
}

sortAndRenameFiles("filtered");
