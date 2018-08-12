var faker = require("faker");
console.log("++++++++++++");
console.log("welcome to my shop");
console.log("++++++++++++");
for(var i = 0; i < 10; i++){

console.log(faker.commerce.productName() + " - $" + faker.commerce.price());

}