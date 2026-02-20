const data = `[{"id":1,"first_name":"Luella","last_name":"Rudeforth","email":"lrudeforth0@nih.gov","gender":"Female","salary":12688},
{"id":2,"first_name":"Fidelity","last_name":"Gerraty","email":"fgerraty1@eepurl.com","gender":"Female","salary":13562},
{"id":3,"first_name":"Annmarie","last_name":"Batter","email":"abatter2@pbs.org","gender":"Female","salary":6447},
{"id":4,"first_name":"Delaney","last_name":"Cino","email":"dcino3@hud.gov","gender":"Male","salary":9389},
{"id":5,"first_name":"Ogden","last_name":"McGarel","email":"omcgarel4@angelfire.com","gender":"Male","salary":13643},
{"id":6,"first_name":"Fredrick","last_name":"Hurt","email":"fhurt5@t.co","gender":"Male","salary":3882},
{"id":7,"first_name":"Janaye","last_name":"Aldins","email":"jaldins6@e-recht24.de","gender":"Female","salary":8855},
{"id":8,"first_name":"Corrina","last_name":"Pepineaux","email":"cpepineaux7@msn.com","gender":"Female","salary":8488},
{"id":9,"first_name":"Phedra","last_name":"Rewcassell","email":"prewcassell8@wikispaces.com","gender":"Female","salary":5117},
{"id":10,"first_name":"Flossi","last_name":"Fasson","email":"ffasson9@mayoclinic.com","gender":"Female","salary":9513},
{"id":11,"first_name":"Tiena","last_name":"Bravey","email":"tbraveya@pagesperso-orange.fr","gender":"Female","salary":14522},
{"id":12,"first_name":"Adelaida","last_name":"Takos","email":"atakosb@bloglines.com","gender":"Female","salary":7513},
{"id":13,"first_name":"Spence","last_name":"Dat","email":"sdatc@yandex.ru","gender":"Male","salary":8450},
{"id":14,"first_name":"Jakie","last_name":"Jeste","email":"jjested@vinaora.com","gender":"Male","salary":3588},
{"id":15,"first_name":"Netti","last_name":"Vasenin","email":"nvasenine@sciencedirect.com","gender":"Female","salary":3507},
{"id":16,"first_name":"Bobine","last_name":"Butrimovich","email":"bbutrimovichf@cargocollective.com","gender":"Female","salary":3723},
{"id":17,"first_name":"Charmain","last_name":"Ganiford","email":"cganifordg@senate.gov","gender":"Female","salary":3948},
{"id":18,"first_name":"Thelma","last_name":"Antrobus","email":"tantrobush@dyndns.org","gender":"Female","salary":14672},
{"id":19,"first_name":"Meggie","last_name":"Sillett","email":"msilletti@pagesperso-orange.fr","gender":"Female","salary":3012},
{"id":20,"first_name":"Marcus","last_name":"Manser","email":"mmanserj@squarespace.com","gender":"Male","salary":10579}]`;

// JSON문자열 -> Object
const ary = JSON.parse(data);
// console.log(ary);

// Object -> JSON문자열
const json = JSON.stringify(ary);
// console.log(json);

// sort()
// console.log(["Hello", "Hi", "Good", "World"].sort());
// console.log([10, 35, 21, 121, 11].sort((n1, n2) => n2 - n1));

// id순으로 정렬함수.
const order_by_id = (obj1, obj2) => obj2.id - obj1.id;

// salary 오름차순정렬.
const order_by_salary = (obj1, obj2) => obj1.salary - obj2.salary;

// first_name 오름차순정렬.
const order_by_fn = (obj1, obj2) =>
  obj1.first_name < obj2.first_name ? -1 : 1;
let result = ary.sort(order_by_fn); // id기준 정렬.
// console.log(result);

function getMember() {
  return ["user01", "user02", "user03"];
}

// module.exports = { ary, order_by_fn };
