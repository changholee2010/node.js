// ary.js
console.clear();

// 급여가 10000 적은 사람들.
const less_than_10000 = (elem, idx) => {
  console.log(elem, idx);
  if (elem.salary < 10000) {
    return true;
  }
  return false;
};

// 여자중에서 8000 이상인 사람.
const more_than_8000 = //
  (elem) => elem.gender == "Female" && elem.salary >= 8000;

// filter() : 조건을 만족하는 요소
result = ary
  .filter(more_than_8000) //
  .map((elem, idx, array) => {
    // map() : A -> A'(매핑)
    // id/first_name/last_name/email/gender/salary
    // no/name/gender/salary
    // 객체구조분해.
    const { id, first_name, last_name, gender, email, salary } = elem;
    //
    const obj = {
      no: id,
      name: first_name + "-" + last_name,
      gender,
      salary,
    };
    return obj;
  });
// 결과 출력.
console.log(result);
