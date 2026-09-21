// First mental model: variables vs values                                 ======================================

let x = 10;
x = "hello";
x = true;

typeof x // help us understand what type of value is it

```
Primitive values
├── string
├── number
├── boolean
├── undefined
├── null
└── symbol

Objects
└── object
```

// Next: Primitive vs Object values

let user1 = { name: "Alice" };
let user2 = user1;

user2.name = "Bob";

console.log(user1.name); // Bob
console.log(user2.name); //Bob

let a = 10;
let b = a;

b = 20;

console.log(a); //10
console.log(b); //20'

// value aint changing when coming to object it becomes shared among them 

```
user1 ──┐
        ├──→ { name: "Alice" }
user2 ──┘


Primitive assignment copies the value. Object assignment copies the reference to the object.
```

const user10 = { name: "Alice" };
const user2 = user1;

user2 = { name: "Bob" };

console.log(user10.name);
console.log(user2.name);

// const cannot be reassigned 

let user11 = {
    name: "Alice"
};

let user2 = user1;

user2 = {
    name: "Bob"
};

console.log(user11.name);
console.log(user2.name);

// This is an example of reassignment
// See carefully user11 remains the same it is the user2 that is reassigned 


