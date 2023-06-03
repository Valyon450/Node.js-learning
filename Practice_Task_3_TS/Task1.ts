const Add = (a: number) => {
  let sum: number = a;

  function Func(b?: undefined): number;

  function Func(b?: number): Func;

  function Func(b?: number | undefined): number | Func {
      if (!b)
        return sum;

      sum += b;
      
      return Func;
  }

  return Func;
};

// Заданий тип функції
type Func = {
  (b?: number): Func;
  (b?: undefined): number;
};

console.log(Add(2)(5)(7)(1)(6)(5)(11)()); // 37
console.log(Add(9)(3)(5)(2)(5)(1)()); // 25
console.log(Add(6)(2)(7)()); // 15