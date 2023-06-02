const add = a => b => b ? add( a + b ) : a;

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
console.log(add(9)(3)(5)(2)(5)(1)()); // 25
console.log(add(6)(2)(7)()); // 15