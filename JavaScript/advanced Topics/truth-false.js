// FALSE VALUES:
false
0
""
null
undefined
NaN

// TRUE VALUES
"0"      // truthy
"false"  // truthy
// []       // truthy
{}       // truthy

// !False becomes true 
// && returns false value or else the final value 

console.log(true && "hello");
console.log(false && "hello");

console.log("hello" && "world");
console.log("" && "world");


// || return the true values the opposite of && 