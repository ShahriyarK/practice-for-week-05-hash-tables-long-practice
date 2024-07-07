function anagrams(str1, str2) {
  // Your code here
  // if (str1.length !== str2.length) return false;
  // for (let i = 0; i < str1.length; i++) {
  //   if (!str2.includes(str1[i])) return false;
  // }
  // return true;
  // the above solution runs in O(n^2) since includes is an O(n) method
  // so lets use sets

  // For this approach to work with sets, its important to ensure that the strings are equal in length
  // to account for cases like 'aabb' and 'ab' where a set will be the same for both
  if (str1.length !== str2.length) return false;
  let set1 = new Set(str1);
  let set2 = new Set(str2);
  // Check if a str has duplicates
  if (set1.size !== set2.size) return false;
  for (char of set1) {
    if (!set2.has(char)) return false;
  }
  // note we should not use forEach method here because it will iterate over each element
  // of the set by invoking a callback function on each element and there is no way to break
  // the iteration other than throwing an exception
  // It's better to use for...of which works for iterable like sets whose elements are unordered
  // and cannot be accessed via an index
  return true;
}


function commonElements(arr1, arr2) {
  // Your code here
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const common = [];
  for (int of set1) {
    if (set2.has(int)) {
      common.push(int);
    }
  }
  return common;
}


function duplicate(arr) {
  // Your code here
  let collection = {};
  for (int of arr) {
    if (collection[int]) return int;
    collection[int] = int;
  }
}


function twoSum(nums, target) {
  // Your code here
  // const numSet = new Set(nums);
  // for (let num of numSet) {
  //   // Find the number which when added to num results in target
  //   // the difference should not be equal to the number itself
  //   let difference = target - num;
  //   if (difference !== num && numSet.has(difference)) return true;
  // }
  // return false;

  // the above approach works if the array is to have distinct elements. In case the array is
  // something like this: [1,2,2,4] here 2 and 2 would make a valid pair since we are not reusing
  // the same element, we are using another element. We can address this using a hashmap.
  let numMap = {}
  for (let num of nums) {
    let difference = target - num;
    // its better to numMap.hasOwnProperty here rather than numMap[difference] because if the difference
    // is 0 and the value will also be zero and will evaluate as such and will be ignored.
    // hasOwn (browsers support this one) or hasOwnProperty is a valid approach to check if a object
    // has a certain property and this is O(1) since objects are implemented by hash table data
    // structure under the hood
    if (numMap.hasOwnProperty(difference)) return true;
    numMap[num] = num;
  }
  return false
}


function wordPattern(pattern, strings) {
  // Your code here
  if (pattern.length !== strings.length) return false;
  let wordMap = {};
  let codeMap = {}
  for (let i = 0; i < strings.length; i++) {
    let word = strings[i];
    let code = pattern[i];
    // check if an existing word corresponds to the correct code in the pattern
    if (wordMap.hasOwnProperty(word)) {
      if (wordMap[word] !== code) return false;
    }
    // check if an existing code corresponds to the word
    else if (codeMap.hasOwnProperty(code)) {
      if (codeMap[code] !== word) return false
    } else {
      wordMap[word] = code;
      codeMap[code] = word;
    }
  }
  return true;

  // We needed two hashtables because there is two way mapping. A -> dog then dog -> A so
  // we have to verify both cases
  // For examples "ABBA" -> ['dog', 'cat', 'bear', 'dog']
  // Without two way mapping, we have no way to verify whether bear should be stored in the
  // wordmap with the value of B because if cat was already paired to B then B is paired to cat
  // so no other word can be paired to B so we need to check both ways
  // this two way mapping is called bijective (one-to-one and onto) mapping between the pattern
  // and the words. Each code maps to exactly one unique word and each word maps to exactly one
  // unique code.
}

module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
