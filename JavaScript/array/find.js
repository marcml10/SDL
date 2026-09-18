// You're mostly right, but there's one important correction:

// ### Output → ✅

[20, 25, 30]


// ### Callback executions → ❌ 3 times

// It actually executes 5 times — once for every element in the original array.

// 10 → 10 >= 20 → false ❌
// 15 → 15 >= 20 → false ❌
// 20 → 20 >= 20 → true  ✅
// 25 → 25 >= 20 → true  ✅
// 30 → 30 >= 20 → true  ✅


So:
// 5 elements → 5 callback executions


// The resulting array happens to contain 3 elements, but that doesn't mean the callback ran 3 times.

// ### Your other answers → ✅

15

15 >= 20 // false


// And filter() does not modify the original array:


// numbers → [10, 15, 20, 25, 30]
// result  → [20, 25, 30]



// ## 🔥 Important pattern

// This is worth locking in:

map()

// Run callback on every element → transform each → return new array.

filter()

// Run callback on **every element** → keep elements where callback returns `true` → return new array.

// So both:


// map    → callback × every element
// filter → callback × every element


// The number of elements in the result doesn't determine how many times the callback ran.

// # Next: `find()` — Medium/Deep

// Now here's where it gets interesting.


const numbers = [10, 15, 20, 25, 30];

const result = numbers.find(number => number >= 20);


// What do you think `result` will contain?

// And here's the important question:

// How many times will the callback execute?

// Don't assume it's 5 this time. 😏

// Trace:

// 10 → ?
// 15 → ?
// 20 → ?
// 25 → ?
// 30 → ?


// Stop when you think `find()` stops.

// You're very close, but find() has one crucial difference from filter().

// Given:


const numberse = [10, 15, 20, 25, 30];

const resulte = numbers.find(number => number >= 20);


// ### resulte → ❌ not `[20, 25, 30]`

// It is:

// 20


// Why?

// `find()` is looking for **the first element** that satisfies the condition.

// Trace it:

// 10 → 10 >= 20 → false ❌
// 15 → 15 >= 20 → false ❌
// 20 → 20 >= 20 → true  ✅ → STOP


// So the callback executes **3 times**.


// 10 → callback
// 15 → callback
// 20 → callback → found it → STOP


// It never reaches `25` or `30`.

// ### Compare the three we've learned

```text
map
→ process EVERY element
→ returns a new array

filter
→ test EVERY element
→ returns an array of matching elements

find
→ test elements until FIRST match
→ returns that single element
```

So:

```js
numbers.map(...)     // [ ... ]
numbers.filter(...)  // [ ... ]
numbers.find(...)    // one value
```

// And your instinct that the callback runs 3 times was correct. 🎯



// ### One more important case

// What happens if nothing matches?


const numbersu = [1, 3, 5];

const resulteu = numbers.find(number => number >= 10);

console.log(resulteu);


// What do you think `resulteu` is?

// **A)** `[]`
// **B)** `false`
// **C)** `undefined`
// **D)** `null`


undefined
```
Why not null?

The important thing is that "no result" does not automatically mean null in JavaScript.

Different APIs/methods can use different values to represent absence.

For find() specifically:

match found    → matching element
no match       → undefined
```

const users = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
    { name: "Charlie", role: "user" }
];

const user = users.find(user => user.name === "Bob");


// Output: The object is returned and stored in user

// map     → transform everything
// filter  → keep everything that matches
// find    → get the first thing that matches