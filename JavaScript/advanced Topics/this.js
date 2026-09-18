const user = {
    name: "Alex",

    greet() {
        console.log(this.name);
    }
}

user.greet(); 

// What would print in this probably "Alex"
```
user.greet()
  ↑
  this 

For a normal function called as an object method
```

const user1 = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};

const user2 = {
    name: "Bob",
    greet: user1.greet
};

user2.greet();

// Output: Bob 
``` The reason is simple: user2.greet is like this === user2 and it would only 
look up for the name within this block breaking the lexical scope rules and hence
it would return Bob ```

const useru = {
    name: "Alice",

    greet() {
        console.log(this.name);
    }
};

const fn = useru.greet;

fn();

// This return undefined as for the fn() there aint any this so it need not determine 
// this and returns undefined for useru.greet still we get Alice

user.greet();   // this → user

user2.greet();  // this → user2

fn();           // plain call → not user

const usere = {
    name: "Alice",

    greet() {
        const inner = function () {
            console.log(this.name);
        };

        inner();
    }
};

usere.greet();

// This returns undefined because see the inner() does not have a this case 
// hence here the value becomes undefined 

```
A: name
   ↓
Lexical scope
"Where is the binding named name?"

B: this.name
   ↓
this
"Which value does this refer to?"
```

const user3 = {
    name: "Alice",

    greet() {
        console.log(this.name);
    }
};

user3.greet();

const user4 = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};

const user5 = {
    name: "Bob",
    greet: user1.greet
};

user4.greet();


const user6 = {
    name: "Alice",

    greet() {
        console.log(this.name);
    }
};

const fn1 = user6.greet;

fn1();


const user7 = {
    name: "Alice",

    greet() {
        const arrow = () => {
            console.log(this.name);
        };

        arrow();
    }
};

user7.greet();


const user8 = {
    name: "Alice",

    greet() {
        const inner = function () {
            console.log(this.name);
        };

        inner();
    }
};

user8.greet();


const user9 = {
    name: "Alice",

    greet() {
        const normal = function () {
            console.log(this.name);
        };

        const arrow = () => {
            console.log(this.name);
        };

        normal();
        arrow();
    }
};

user9.greet();

