/*
Given a string, return the kth most frequent character in the string.
kth('aaabbc', 1);     //  => 'a'
kth('aaabbc', 2);     //  => 'b'
kth('aaabbc', 3);     //  => 'c'
*/

function kth(string, k) {
  // char frequency table
  const frequencyTable = {};
  // populate frequency table
  for (let char of string) {
    if (frequencyTable[char]) {
      frequencyTable[char]++;
    } else {
      frequencyTable[char] = 1;
    }
  }
  const sortedChars = Object.keys(frequencyTable).sort(
    (a, b) => frequencyTable[b] - frequencyTable[a]
  );
  return sortedChars[k - 1];
}

console.log(kth("aaabbc", 1)); //  => 'a'
console.log(kth("aaabbc", 2)); //  => 'b'
console.log(kth("aaabbc", 3)); //  => 'c'
console.log(kth("aaabbcccccccc", 3)); //  => 'b'

/*
Imagine the standard alphabet order (abc...xyz) is rearranged. Given a string and a
new alphabet order, determine whether the characters in the string appear in
lexicographically increasing order. Solve this in O(m + n) time.
*/

function newAlphabet(string, alphabets) {
  const alphabetTable = {};
  for (let i = 0; i < alphabets.length; i++) {
    const char = alphabets[i];
    alphabetTable[char] = i;
  }
  for (let i = 1; i < string.length; i++) {
    const char = string[i];
    const prevChar = string[i - 1];
    if (alphabetTable[char] < alphabetTable[prevChar]) return false;
  }
  return true;
}

console.log(newAlphabet("dino", "abcdefghijklmnopqrstuvwxyz")); // => true
console.log(newAlphabet("leetcode", "abcdefghijklmnopqrstuvwxyz")); // => false
console.log(newAlphabet("leetcod", "labefghijkmnpqrstucvowxdyz")); // => true

// if there are m letters in the alphabet and n characters in the string, the time complexity is O(m + n)

/*
Given a string, determine the length of the longest palindrome that can be built with those letters.
Solve this in O(n) time.
*/

function isEven(num) {
  return num % 2 === 0;
}

function recursivelyConstructPalindrome(palindrome, table) {
  const characters = Object.keys(table);
  // base case:
  // 1. If palindrome has even length then check if every character in the table is exhausted
  // 2. If palindrom has an odd length then check if no pair of same characters exists in the table
  if (
    !isEven(palindrome.length) &&
    characters.every((char) => table[char] <= 1)
  )
    return palindrome;
  else if (
    isEven(palindrome.length) &&
    characters.every((char) => table[char] < 1)
  )
    return palindrome;

  for (key in table) {
    // If palindrome has an even length (which also satisfies for an empty palindrome),
    // search for characters with odd frequency to use one was the middle character
    if (isEven(palindrome.length) && !isEven(table[key])) {
      const halfOfString = palindrome.slice(palindrome.length / 2);
      let constructedPalindrome = halfOfString + key + halfOfString;
      table[key]--;
      return recursivelyConstructPalindrome(constructedPalindrome, table);
    }
    // If the frequency of characters is greater than 2
    if (table[key] >= 2) {
      let constructedPalindrome = key + palindrome + key;
      table[key] -= 2;
      // if (table[key] === 0) delete table[key];
      return recursivelyConstructPalindrome(constructedPalindrome, table);
    }
  }
}

function longestPalindrome(string) {
  const freqTable = {};
  let palindrome = "";
  // populate the frequency table
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (freqTable[char]) {
      freqTable[char]++;
    } else {
      freqTable[char] = 1;
    }
  }
  const result = recursivelyConstructPalindrome(palindrome, freqTable);
  return result.length;
}

console.log(longestPalindrome("abccccdd")); // 7
console.log(longestPalindrome("a")); // 1
console.log(longestPalindrome("aba")); //3
console.log(longestPalindrome("aa")); //2
console.log(longestPalindrome("aadffsdfa")); //7
console.log(longestPalindrome("abcdefgaaf")); // 5
// console.log(longestPalindrome("abccccdd"));
// console.log(longestPalindrome("abccccdd"));

// we can actually use a simpler iterative approach since we were only asked to return the length
// and not construct the palindrome (this approach can even be extended to construct the palinderome)
// The recursive approach used previously can be inefficient in some cases

function simplerLongestPalindrome(string) {
  let freqTable = {};
  for (const char of string) {
    freqTable[char] = (freqTable[char] || 0) + 1;
  }
  let length = 0;
  let hasOddChar = false;
  for (const char in freqTable) {
    if (freqTable[char] % 2 === 0) {
      length += freqTable[char];
    } else {
      length += freqTable[char] - 1;
      hasOddChar = true;
    }
  }
  if (hasOddChar) {
    length++;
  }
  return length;
}

// the above approach is simpler and has O(n) complexity
// The above approach is also known as greedy algorithm
// The term "greedy" in algorithm design refers to making the locally
// optimal choice at each step with the hope of finding a global optimum.
// In other words, a greedy algorithm builds up a solution piece by piece,
// always choosing the next piece that offers the most immediate benefit.

console.log("\nSimplar longestPalindrome()");
console.log(simplerLongestPalindrome("abccccdd")); // 7
console.log(simplerLongestPalindrome("a")); // 1
console.log(simplerLongestPalindrome("aba")); //3
console.log(simplerLongestPalindrome("aa")); //2
console.log(simplerLongestPalindrome("aadffsdfa")); //7
console.log(simplerLongestPalindrome("abcdefgaaf")); // 5

/*
Given a string, find the length of the longest substring without repeating characters.
Solve this in O(n) time.
*/

function longestSubstr(str) {
  // let set = new Set(str);
  // let longestSubstring = '';
  // set.forEach(char => longestSubstring += char)
  // return longestSubstring;
  // the above approach is not valid as set does not gauarantee order and furthermore, set will
  // only ensure distinct elements it will not ensure a consective substring like in the case of
  // pwwkew where the longest substring is wke while a set would produce the result of pwke
  // To find the longest substring satisfying the condition, we use the sliding window algorithm
  // which allows us to use two points to move through an array by substrings
  let start = 0;
  const hashtable = {};
  let longestLength = 0;
  for (let end = 0; end < str.length; end++) {
    let char = str[end];
    if (hashtable[char] !== undefined && hashtable[char] >= start) {
      start = hashtable[char] + 1;
    }
    hashtable[char] = end;
    if (end - start + 1 > longestLength) {
      longestLength = end - start + 1;
    }
  }
  return longestLength;
}
console.log("\nLongest substring");
console.log(longestSubstr("pqr")); // => 3
console.log(longestSubstr("abcabcbb")); // => 3, where the longest substring is "abc"
console.log(longestSubstr("bbbbb")); // => 1, where the longest substring is "b"
console.log(longestSubstr("pwwkew")); // => 3, where the longest substring is "wke"
console.log(longestSubstr("")); // => 0, as the input string is empty
console.log(longestSubstr("au")); // => 2
console.log(longestSubstr("pwkwqpew")); // => 5


/*
Given an array of integers, return the length of the longest subarray where the difference
between its maximum value and its minimum value is at most 1. Solve this in O(n) time.
*/

function maxSubarr(arr) {
  let freqMap = {};
  let longest = 0;
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    freqMap[num] = (freqMap[num] || 0) + 1;
  }

  for (let key in freqMap) {
    // subarray length considering the current value and values that are one less than current
    let count1 = (freqMap[Number(key) + 1] || 0) + freqMap[key];
    // subarray length considering the current value and values that are one greater than current
    let count2 = (freqMap[Number(key) - 1] || 0) + freqMap[key];

    if (count1 > longest) {
      longest = count1;
    }
    // update longest if count2 is greater
    if (count2 > longest) {
      longest = count2;
    }
  }
  return longest;
}
console.log('\nMax subarray')
console.log(maxSubarr([1, 3, 2, 2, 5, 1, 1, 2, 3, 7])); // => 6 as longest subarray is [1, 2, 2, 1, 1, 2]
console.log(maxSubarr([1,3,2,2,5,2,3,7]));  // => 5 because the longest subarray is [3,2,2,2,3]
console.log(maxSubarr([1,1,1,1,3]));// => 4 because the longest subarray is [1,1,1,1]

/*
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
*/
const recursiveCoinChange = (coins, target, memo) => {
  // base case: if target <= 0
  if (target === 0) return 0;
  if (target in memo) return memo[target]
  if (target < 0) return -1;
  // check if target exists in memo so that redundant calculations are not performed
  // to improve performance significantly
  // initialize min coins as -1
  let minCoins = -1;
  for (let i = 0; i < coins.length; i++) {
    let remainder = target - coins[i];
    let count = 1 + recursiveCoinChange(coins, remainder, memo);

    // update minCoins only if the count returned is greater than 0.
    if (minCoins < 0) {
      if (count > 0) minCoins = count;
    } else {
      if (count > 0 && count < minCoins) minCoins = count;
    }
  }

  // memoize the minCoins value for a specific target before returning it.
  memo[target] = minCoins;
  return minCoins;
}

const coinChange = (coins, target) => {
  // create a memo for caching subproblems so that duplicate problems are evaluated from the cache
  const memo = {};
  return recursiveCoinChange(coins, target, memo);
}
console.log('\nMake better change')
const coins = [1, 5, 10, 25];
const coins2 = [5];
console.log(coinChange(coins, 11));      // => 2, 10 + 1 = 11
console.log(coinChange(coins2, 3));      // => -1
console.log(coinChange(coins2, 0));      // => 0
console.log(coinChange([25, 30, 10], 2000)); // => 67 because 30 * 65 = 1950 + 25 + 25
console.log(coinChange([10, 7, 1], 24));
console.log(coinChange([10, 2], 12));

// Explanation of coinChange algorithm
// We cannot use a greedy approach as explained previously in makeBetterChange problem in recurion
/*
1. Lets consider for the simplest case where coins = [10] and target is 10.
2. Our base case is when a target is 0 is reached so we return zero. In case the target is less
  than zero, then we return - 1.
3. We iterate through the coins, in this case the only coin is 10 so iterate over it and calculate
  difference which is 0. So if the difference is zero we return 0 and add 1 to it as the selected coin
  is suitable for change.
4. So we recursively solve for the first selected coin until we reach a target of zero or less than zero. Then
  we move from top to bottom until we reach a previous target and for which we check the other coins by iterating
  and for each other coin, wee similarly check recursively whether the target gets to zero or less than zero
  all the while updating the minCoun for that sub problem and we do this until we pop stacks till we reach the
  main problem stack by which we have successfully calculated all subproblems for the first coin against the main
  target. Then we do that for other coins against hte main target in a similar way all the while maintaining
  minCount. In this way we have checked for all combinations in makeBetterChange.
5. In makeBetterChange, we used coins.slice(i), which made it faster but here if we do that it would give
incorrect results with memoization in some cases but without memoization it gives accurate results. So in
short with memoization here, we cant use coins.slice(i).
6. For very large computations, memoization still offers a much greater benefit than coins.slice(i)
7. Reasons why coins.slice(i) works without memoization but not with memoization are as follows:
  7.1. In makeBetterChange (old problem in recursion module), each recursive call creates a unique sequence of
coins, ensuring non-decreasing order by using coins.slice(i). This approach avoids invalid combinations, such
as revisiting smaller denominations after larger ones. Since no memoization is used, every recursive path is
computed independently, which ensures correctness but is less efficient. For each coin selected in an iteration,
through recursion, we get the best possible combination so for any coin selected we don't have to consider
previously selected coins. For example with [10,7,1] and target 24, the best change is [10,7,7]. So once we
get the perfect combination against 10, we move to 7 where difference is 17 and then if still is still present
in the coins, we again against 10 and best combination comes out to be [7,10,7] which is still the same so that
was wasted calculations.
  7.2. When you introduce memoization in coinChange(), When you introduce memoization, the key insight is that
memoization relies on storing and reusing the results of previously computed subproblems. Without memoization,
every recursive call is treated independently but with memoization, results of previous calcuations also matter,
so if we were to slice the coins array the combinations for the same target would be essentially different, and
this could lead in faulty calculations.  Memoized results for the same target with different coin subsets can
overwrite each other, causing errors.
*/


/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1, 2, or 3 steps. In how many distinct ways can you climb to the top?
*/

const recursivelyClimbingSteps = (n, memo) => {
  if(n in memo) return memo[n];
  if (n === 0) return 1;
  if (n < 0) return 0;
  let steps = [1,2,3];
  let distinctWays = 0

  for (let i = 0; i < steps.length; i++) {
    let step = steps[i]
    distinctWays += recursivelyClimbingSteps(n - step, memo)
  }

  memo[n] = distinctWays;
  return distinctWays;
}

const climbingSteps = (n) => {
  const memo = {};
  return recursivelyClimbingSteps(n, memo)
}

console.log('\nClimbing steps')
// There is 1 way to climb zero steps:
//   1. 0 steps
console.log(climbingSteps(0));  // 1

// There is 1 ways to climb one step:
//   1. 1 step
console.log(climbingSteps(1));  // 1

// There are 2 ways to climb two steps:
//   1. 1 step + 1 step
//   2. 2 steps
console.log(climbingSteps(2));  // 2

// There are 4 ways to climb three steps:
//   1. 1 step + 1 step + 1 step
//   2. 1 step + 2 steps
//   3. 2 steps + 1 step
//   4. 3 steps
console.log(climbingSteps(3));  // 4

// There are 5 ways to climb four steps:
//   1. 1 step + 1 step + 1 step + 1 step
//   2. 1 step + 1 step + 2 steps
//   3. 1 step + 2 steps + 1 step
//   4. 2 steps + 1 step + 1 step
//   5. 1 step + 3 steps
//   6. 3 steps + 1 steps
//   7. 2 steps + 2 steps
console.log(climbingSteps(4));  // 7

console.log(climbingSteps(100))


// For above problem, when we start popping off stacks, we are actually solving for each sub problem
// starting from 1 steps, to 2 steps and as we move from top to bottom, we would have solved sub-problems
// till 99 steps and then we move to the callstack with 100 steps and we iterate to the next step i.e. 2
// as for that we would be able to obtain the possible distinct ways directly from the memo e.g. the result
// for 98 steps in already saved in the memo so no need to perform that calculation again.


// CONCLUSION
// Memoization turns an exponential time complexity problem into a linear time complexity problem by
// storing intermediate results and reusing them. This is why the computation time drops dramatically
// from potentially hours to milliseconds.
