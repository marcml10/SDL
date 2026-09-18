const user = {
    name: "Alice",

    normal() {
        console.log(this.name);
    },

    arrow: () => {
        console.log(this.name);
    }
};

user.normal();
user.arrow();

// Normal print Alice but not arrow

```
normal function
    ↓
gets its own this based on how it is called

arrow function
    ↓
does NOT get its own this
    ↓
inherits this from surrounding scope



You can think of arrow-function this as:
"Don't determine this from my call. Use the this from where I was created."
That's called lexical this.


user.normal()
      ↓
normal's this = user
      ↓
arrow created inside normal
      ↓
arrow inherits normal's this
      ↓
arrow's this = user
      ↓
"Alice"
```

const usere = {
    name: "Alice",

    normal() {
        const arrow = () => {
            console.log(this.name);
        };

        arrow();
    }
};

usere.normal();