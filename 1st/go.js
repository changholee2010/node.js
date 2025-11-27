//
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.ceil(Math.random() * 10) % 2) {
      resolve("ok");
    } else {
      reject("fail");
    }
  }, 1000);
});

promise //
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
