// функція-обгортка, яка кешує результат будь-якої іншої функції
function WrapCache(func) {

    const map = new Map();
  
    return function(...args) {

        const key = JSON.stringify(args);
  
        if (map.get(key)) {
            console.log('Fetching from cache');
            return map.get(key);
        }
  
        const result = func.apply(this, args);
        map.set(key, result);
        console.log('Calculating result');
        return result;
    };
}
  
// Функція приймає будь-яку кількість числових параметрів та повертає їх суму
function Add() {
    let Sum = 0;
  
    for(var i = 0; i < arguments.length; i++) {
        Sum += arguments[i];
    }
    
  return Sum;
}

const WrapCacheAdd = WrapCache(Add);
  
console.log(WrapCacheAdd(1, 3, 7, 4)); //'Calculating result' 15, Вирахувано
console.log(WrapCacheAdd(2, 5)); //'Calculating result' 7
console.log(WrapCacheAdd(1, 3, 7, 4)); //'Fetching from cache' 15, Взято з кешу