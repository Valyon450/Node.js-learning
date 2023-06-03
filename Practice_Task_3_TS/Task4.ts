// функція-обгортка, яка кешує результат іншої функції
function WrapCache(func: (a: number, b: number, c: number) => number) {

    const map = new Map();

    return function (a: number, b: number , c: number) {

        const key = JSON.stringify(arguments);

        if (map.get(key)) {
            console.log('Fetching from cache');
            return map.get(key);
        }

        const result = func.call(func, a, b, c);
        map.set(key, result);
        console.log('Calculating result');
        return result;
    };
}
  
// Функція приймає три числових параметра та повертає їх суму
function Add(a: number, b: number, c: number) {
    
  return a + b + c;
}

const WrapCacheAdd = WrapCache(Add);

console.log(WrapCacheAdd(1, 3, 7)); //'Calculating result' 11, Вирахувано
console.log(WrapCacheAdd(2, 5, 9)); //'Calculating result' 16
console.log(WrapCacheAdd(1, 3, 7)); //'Fetching from cache' 11, Взято з кешу