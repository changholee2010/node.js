// array3.js
// reduce() : 매개변수(1, 2, 3, 4)
// filter(elem, idx, ary)
// reduce(acc, elem, idx, ary)

let numbers = [30, 20, 50, 60, 10, 70];
let result = numbers.reduce((acc, elem, idx, ary) => {
  // console.log(idx + " => ", acc, elem);
  if (elem >= 50) {
    acc.push(elem);
  }
  return acc;
  // return acc > elem ? acc : elem;
  // return acc + elem;
}, []);
// console.log(result);

fetch("http://localhost:4000/boards")
  .then((resp) => resp.json())
  .then((result) => {
    let fresult = result.reduce((acc, elem) => {
      if (elem.AUTHOR == "user01") {
        acc.push(elem);
      }
      return acc;
    }, []);
    console.log(fresult);
  });
