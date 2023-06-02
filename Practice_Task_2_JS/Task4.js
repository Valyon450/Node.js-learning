// функція-обгортка, яка кешує результат будь-якої іншої функції
function WrapCache(func) {

    const cache = {};
  
    return function(...args) {

        const key = JSON.stringify(args);
  
        if (cache[key]) {
            console.log('Fetching from cache');
            return cache[key];
        }
  
        const result = func.apply(this, args);
        cache[key] = result;
        console.log('Calculating result');
        return result;
    };
}
  
// Функція приймає будь-яку кількість числових параматрів та повертає їх суму
function Add() {
    var Sum = 0;
  
    for(var i = 0; i < arguments.length; i++) {
        Sum += arguments[i];
    }
    
  return Sum;
}

const WrapCacheAdd = WrapCache(Add);
  
console.log(WrapCacheAdd(1, 3, 7, 4)); //'Calculating result' 15, Вирахувано
console.log(WrapCacheAdd(2, 5)); //'Calculating result' 7
console.log(WrapCacheAdd(1, 3, 7, 4)); //'Fetching from cache' 15, Взято з кешу