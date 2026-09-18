const user = {
    name: "Alice"
};

function introduce(age, city) {
    console.log(this.name, age, city);
}

introduce.apply(user, [22, "Chennai"]);

```
    ↓
this = user
age  = 22
city = "Chennai"
```