const user = {
    name: "Alice"
};

function greet() {
    console.log(this.name);
}

const fn = greet.bind(user);


```
greet
  ↓
bind(user)
  ↓
new function
  ↓
fn()
  ↓
this = user
  ↓
Alice
```

const user1 = {
    name: "Bob"
};

function greet() {
    console.log(this.name);
}

const fn1 = greet.bind(user1);

console.log("Before");
fn1();
console.log("After");

// ----------------------------
const user2 = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};

const fn2 = user2.greet;
fn2();

```
fn()
 ↓
no object at call site
 ↓
this is not user
```

// on changing to this 
const fn3 = user.greet.bind(user);
fn3();

```
greet.bind(user)
       ↓
new bound function
       ↓
fn()
       ↓
this → user
       ↓
this.name → "Alice"
```

const user3 = {
    name: "Alice",

    greet() {
        console.log("Hello", this.name);
    }
};

setTimeout(user3.greet, 1000);

// The fix 
setTimeout(user.greet.bind(user), 1000);




