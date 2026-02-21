// path.js
const path = require("path");
const fs = require("fs");

console.log(__dirname);
console.log(__filename);

console.log(path.basename(__filename, path.extname(__filename)));
console.log(path.extname(__filename));

console.log(path.parse(__filename)); // parse => root, dir, base, ext
console.log(path.format({ dir: "D:\\git\\node.js", base: "sample.txt" }));
console.log(path.join("D:\\git", "node.js", "module", "sample.txt"));

const filePath = path.join(__dirname, "package.json");

// file i/o 처리. callback함수.
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  fs.writeFile(__dirname + "\\todo.txt", data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("write done");
  });
});
// const data = fs.readFileSync(filePath, "utf-8");
// console.log(data);

console.log("end of prog");
