async function runSequent<T, R>(
    array: T[],
    callback: (item: T, index: number) => Promise<R>
  ): Promise<R[]> {
    const results: R[] = [];
  
    for (let i = 0; i < array.length; i++) {
      const result = await callback(array[i], i);
      results.push(result);
    }
  
    return results;
  }

const array: string[] = ["one", "two", "three"];
const results = await runSequent(array, (item, index) =>
  Promise.resolve({
    item,
    index,
  })
);

console.log(results);

export { };

