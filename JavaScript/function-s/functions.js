function outer() {
    let message = "hello";

    function inner() {
        console.log(message);
    }

    return inner;
}
// You said:

// "we can return what is the output in the inner function which in turn becomes the output in outer function"

// That's the part I want you to replace with:

// We return the function inner from outer; we don't return the result of executing inner. Later, when fn() calls that returned function, inner accesses the message binding from its lexical environment.

// That distinction is huge.

function outer() {
    let message = "hello";

    function inner() {
        console.log(message);
    }

    message = "goodbye";

    return inner;
}

const fn = outer();

fn(); 

// in this case it would return the reassgined value 
// You were thinking:

// "But the function was declared when message was "hello"."

// Exactly.

// Now ask:

// Was message itself "hello" forever?

// No.

// The binding existed, and its value changed.


function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const fe = outer();


// outer() runs
//     ↓
// creates count
//     ↓
// creates inner
//     ↓
// returns inner
//     ↓
// outer finishes
//     ↓
// count would normally become unreachable
//     ↓
// BUT inner still has access to it
//     ↓
// closure keeps that environment reachable

return count;
return inner;

// The first returns the current value of count.

// The second returns a function that has access to count.

//** */ A closure allows a function to continue accessing variables from its lexical scope, even after the outer function has finished executing.


function greet() {
    console.log("Hello");
}

const a = greet;
const b = greet();

a(); 

// an incredible example both return hello 
// 1. It store what in greet, call that const as func. gets value 
// 2. The function is called already hence done

function createCounter() {
    let count = 0;

    function increment() {
        count++;
        return count;
    }

    return increment;
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());


// createCounter()
//         │
//         ▼
// creates:

// count → 0

// increment function
//         │
//         │ has access to
//         ▼
// count
//         │
//         ▼
// returns increment
//         │
//         ▼
// counter
//         │
//         ▼
// counter()
// counter()
// counter()

// count:
// 0 → 1 → 2 → 3

// In this they behave different 
function createCounter() {
    let count = 0;

    return function increment() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter1());

console.log(counter2());

console.log(counter1());
console.log(counter2());

// 2 distinct environments are created within the variables . "This is referred to as PRIVATE STATE"

function createAccount() {
    let balance = 100;

    function deposit(amount) {
        balance += amount;
        return balance;
    }

    function withdraw(amount) {
        balance -= amount;
        return balance;
    }

    function getBalance() {
        return balance;
    }

    return {
        deposit,
        withdraw,
        getBalance
    };
}

const account = createAccount();

// Outside world
//       │
//       ├── can call deposit()
//       ├── can call withdraw()
//       └── can call getBalance()

//               │
//               ▼

//        shared closure state
//               │
//          balance → 120