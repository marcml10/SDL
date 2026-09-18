// Some

const results = ["passed", "passed", "failed"];
results.some(result => result === "failed");

```
some() asks: 
Does at least ONE element satisfy this condition?


every()
Are all elements true?
```

[1, 2, 3, 4].every(x => x > 2)
// False