function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

Parent.prototype.list = [1, 2];

const parentEl = new Parent('John');

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);

Child.prototype.constructor = Child;

Child.prototype.sayAge = function () {
  console.log(this.age);
};

const child = new Child('Alice', 20);

child.sayName(); // 输出 "Alice"
child.sayAge(); // 输出 20
child.list.push(3);
console.log(parentEl.list); // 输出 [1, 2]
