// reduce() - 이전 순번의 결과를 다음 수번의 매개값으로 활용.
result = [10, 15, 20, 25, 30].reduce((accm, elem, idx) => {
  console.log(idx, "-> ", accm, elem);
  if (elem >= 20) {
    const li = document.createElement("li");
    li.innerText = elem;
    accm.appendChild(li);
  }
  return accm; //accm > elem ? accm : elem;
}, document.querySelector("#list"));
console.log(result);

console.clear();
// Male 사람의 급여합계.
const sum_of_male = (accm, elem, idx, array) => {
  const { salary, gender } = elem;
  if (gender == "Male") {
    accm += salary;
  }
  return accm;
};
result = ary.reduce(sum_of_male, 0);
console.log("Male급여합계: " + result);

// Female의 급여가 10000 이하인 사람들의 {번호/이름(fn+ln)/이메일/급여}
// 새로운 배열로 생성.
const female_under_10000 = (accm, elem) => {
  const { gender, id, first_name, last_name, salary, email } = elem;
  if (gender == "Female" && salary <= 10000) {
    const obj = { id, name: first_name + "-" + last_name, email, salary };
    accm.push(obj);
  }
  return accm;
};
// 결과출력.
result = ary.reduce(female_under_10000, []);
console.log(result);
