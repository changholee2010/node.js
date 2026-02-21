const { ary, order_by_fn } = require("./data");

// Male(gender) 인 목록.
// {Male: [{},{},{},{}...{}]}
const male_member_only = (accm, elem) => {
  if (elem.gender == "Male") {
    accm.Male.push(elem);
  }
  return accm;
};
let result = ary.reduce(
  male_member_only, //첫번째 매개값 함수
  { Male: [] },
);
console.log(result);

const obj = { name: "Hong" };
obj.name;
obj["name"];
console.log(obj["age"]);

const group_by_gender = (accm, elem) => {
  // elem.gender = "Male"/"Female"
  // accm["Male"] == accm.Male , accm["Female"] = accm.Female
  if (accm[elem.gender] == undefined) {
    accm[elem.gender] = []; // 초기값 {Male: [], Female: []}
  }
  accm[elem.gender].push(elem.first_name);
  return accm;
};
result = ary.reduce(
  group_by_gender, //첫번째 매개값 함수
  {},
);
console.log(result);
