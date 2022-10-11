// write a function to group odd and even lines text in a file.
// written with GitHub Copilot
function sortCsv(file) {
  var fs = require("fs");
  var odd = [];
  var even = [];
  var lines = fs.readFileSync(file).toString().split("\n");
  console.log(lines);
  for (var i = 0; i < lines.length; i++) {
    if (i % 2 == 0) {
      even.push(lines[i]);
    } else {
      odd.push(lines[i]);
    }
  }
  console.log(even.join("\n"));
  console.log(odd.join("\n"));
}

sortCsv("test.txt");

// test.txt
// Nike Air Force 1 '07 LE
// $110.00
// Nike Blazer Mid '77
// $105.00
// Nike Air Force 1 Low
// $90.00
// Nike Air Max 270
// $160.00
// Nike Blazer High
// $105.00
// New Balance 550
// $110.00
// New Balance 550
// $110.00
// Jordan Retro 6
// $140.00
// Nike Dunk Hi
// $125.00
// adidas Originals Yeezy Slide
// $70.00
// adidas Originals Superstar
// $100.00
// New Balance 2002R
// $160.00
// Jordan Retro 11 Low IE
// $185.00
// Jordan Retro 12
// $200.00
// New Balance 550
// $110.00
// Converse All Star Platform Hi
// $75.00
// Jordan AJ 1 Mid SE
// $135.00
// Jordan Retro 13
// $200.00
// New Balance 2002R
// $160.00
// PUMA MB.01
// $125.00
// Nike Air More Uptempo
// $130.00
// HOKA Clifton 8
// $140.00
// Jordan Retro 3
// $150.00
// New Balance 550
// $110.00
// Jordan 6 Rings
// $170.00
// Jordan Retro 3
// $150.00
// Timberland 6" Premium Waterproof Boots
// $210.00
// adidas Yeezy 700 MNVN Laceless Analog
// $220.00
// New Balance 550
// $110.00
// Nike Air Force 1 07 LE Low
// $110.00
// Nike Blazer Low Platform
// $100.00
// Nike Air Vapormax Plus
// $210.00
// Nike Air Max Goadome
// $180.00
// Jordan Retro 6
// $150.00
// New Balance 327
// $100.00
// Nike Court Borough
// $60.00
// Jordan 6 Rings
// $170.00
// Timberland 6" Premium Waterproof Boots
// $210.00
// Crocs Echo Clogs
// $70.00
// Timberland Courmayeur Valley 6"
// Sale, Price reduced from $170.00 to $69.99$69.99$170.00
// Jordan Retro 5
// $200.00
// Jordan AJ 1 Low
// $110.00
// Jordan Retro 1 High OG
// $70.00
// New Balance 5740
// $110.00
// UGG Classic Ultra Mini
// $140.00
// Jordan Retro 3
// $70.00
// Crocs Steven Harrington Classic All-Terrain Clog
// $150.00
// HOKA Clifton 8
// $140.00
