const numbers = [1, 2, 3, 4];

const total = numbers.reduce((sum, number) => {
    return sum + number;
}, 0);

// output : 10

``` 
Its pretty easy the zero that you see in the end is like the intial value of sum 
and on each step it keeps adding up and sum becomes the new value 
```

const number = [2, 3, 4];

const result = numbers.reduce((total, number) => {
    return total * number;
}, 1);

// Output: 2,6,24

// Practical for a QA guy

const testResults = [
    { name: "Login", passed: true },
    { name: "Checkout", passed: false },
    { name: "Search", passed: true },
    { name: "Logout", passed: true }
];

const passedCount = testResults.reduce((count, test) => {
    return test.passed ? count + 1 : count;
}, 0);

// result : 3

const names = ["Alice", "Bob", "Charlie"];

const resulte = names.reduce((text, name) => {
    return text + name + " ";
}, "");

console.log(resulte);

// Result : result === "Alice Bob Charlie "

const numberss = [1, 2, 3, 4];

const resultu = numberss.reduce((acc, number) => {
    if (number % 2 === 0) {
        acc.push(number);
    }
    return acc;
}, []);

console.log(resultu);

// result : [2,4]


