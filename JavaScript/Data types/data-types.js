// The Data types are mentioned below 
// 1. String 
let a = "marc" 
let b = "kennedy"
console.log(typeof a)

// 2. Numbers
let num = 12;
let num1 = 13;
console.log(typeof (num+num1))

// Boolean 
let isTrue = false
console.log(typeof !isTrue)

// Undefined
let name;
console.log(typeof name)

// Big int
let numbers = 1024008892343243247833493495093n
console.log(typeof numbers)

// null 
let words = null
console.log(words)
console.log( typeof words) // it returns a object 

const EXPECTED_STATUS_CODE = 200;
let actualResponseCode = "200";
if (actualResponseCode === EXPECTED_STATUS_CODE) {
    console.log("test passed")
} else {
    console.log("testing failed")
}
