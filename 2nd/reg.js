// 정규 표현식.
// new RegExp('o');
const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let email = "user01@email.com";
console.log(reg.test(email));

let phone = "010-2343-9870";
const telReg = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
console.log(telReg.test(phone));
