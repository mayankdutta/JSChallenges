  let res = []
  for (let i = 0; i < arr.length; i += size) {
    let temp = []
    for (let j = 0; j < size && i + j < arr.length; j++) {
      temp.push(arr[i + j]); 
    }
    res.push(temp); 
  }
  return res;

/**
 * Reduce
 */

function chunk(array, size) {
  if (!Array.isArray(array) || size <= 0) return [];

  return array.reduce((result, item, index) => {
    if (index % size === 0) {
      result.push([]);
    }
    result[result.length - 1].push(item);
    return result;
  }, []);
}

// Example usage:
console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]
console.log(chunk([1, 2, 3, 4, 5, 6], 3)); // [[1, 2, 3], [4, 5, 6]]
