const user = {
    name: "Alice"
};

function greet() {
    console.log(this.name);
}

greet();

// we can explicitly use 
greet.call(user);

```
greet.call(user)
           ↓
     this = user
           ↓
     this.name
           ↓
       "Alice"
```

greet.call(user); // Alice
// call() invokes the function immediately and lets you choose its this

// Passing arguements 
function introduce(age, city) {
    console.log(this.name, age, city);
}

const user2 = {
    name: "Alice"
};

introduce.call(user2, 25, "Chennai");

```
greet
  ↓
call(user, "Hello")
  ↓
this = user
message = "Hello"
  ↓
console.log("Hello", "Bob")
```