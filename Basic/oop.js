/**
 * 类的概念（属性、方法、构造函数）
 * 类的继承
*/

/* 类的声明 */

// es5
var Animal = function () {
  this.name = "Animal";
};

// es6
class Animal2 {
  constructor() {
    this.name = "Animal2";
  }
}

/**
 * 类的实例化
 * new是什么？new做了什么？ */
console.log(new Animal(), new Animal2());


/** 类的继承 */

// Step1: 借助构造函数实现继承
function Parent1() {
  this.name = "parent1";
}

Parent1.prototype.say = function () {
  console.log("say " + this.name);
};

function Child1() {
  // call apply 改变函数运行的上下文，改变this执行.
  Parent1.call(this);
  this.type = "child1";
}
var ch1 = new Child1();
console.log(ch1.name);
// 仅仅只是改变了Parent1在运行时的this执行，并没有改变继承Parent.prototype对象, 只能继承构造函数里的内容
// console.log(ch1.say());

// Step2: 借助原型链实现继承
function Parent2() {
  this.name = "parent2";
  this.play = [1, 2, 3];
}
function Child2() {
  this.type = "child2";
}
// 实例可以访问构造函数的原型对象
Child2.prototype = new Parent2();
console.log(new Child2());

var s1 = new Child2();
var s2 = new Child2();
console.log(s1.play, s2.play);
s1.play.push(4);
// 原型链中原型对象是公用的
console.log(s1.play, s2.play);

// Step3: 组合方式
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}
function Child3() {
  Parent3.call(this);
  this.type = "child3";
}
Child3.prototype = new Parent3();
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3, s4);

/* 组合继承的优化1 */
function Parent4() {
  this.name = "parent4";
  this.play = [1, 2, 3];
}
function Child4() {
  Parent4.call(this);
  this.type = "child4";
}
Child4.prototype = Parent4.prototype;
var s5 = new Child4();
var s6 = new Child4();
s5.play.push(4);
console.log(s5, s6);
console.log(s5 instanceof Child4, s5 instanceof Parent4);
console.log(s5.constructor); //  指向了父类

/* 组合继承的优化2 */
function Parent5() {
  this.name = "parent5";
  this.play = [1, 2, 3];
}
function Child5() {
  Parent5.call(this);
  this.type = "child5";
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

var s7 = new Child5();
console.log(s7 instanceof Child5, s7 instanceof Parent5);
console.log(s7.constructor);
