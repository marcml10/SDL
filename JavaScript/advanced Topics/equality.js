const a = {};
const b = a;

console.log(a == b);
console.log(a === b);

```
a ──┐
    ├──→ SAME object
b ──┘

true
true
```
"== ignores types, therefore objects should compare their contents."

// {} == {}
// false cause they are both different
//  JavaScript is asking: "Do these two variables refer to the same object?"