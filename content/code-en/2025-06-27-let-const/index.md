---
title: >  
    JavaScript var vs let vs const: Why Avoid var?
    
description: >  
    Discover why developers abandon var for let and const. Learn how these modern declarations prevent coding pitfalls and improve your JavaScript workflow.

slug: 2025-06-27-let-const
date: 2025-06-27 00:00:00+0000
lastmod: 2025-06-27 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-27-let-const-en.webp

alternates:
  - title: "JS 변수 선언법: var 대신 let과 const를 써야 하는 이유"
    href: "https://ctrlcccv.github.io/code/2025-06-26-let-const/"
    hreflang: "ko"
  - title: "JavaScript var vs let vs const: Why Avoid var?" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-27-let-const/"
    hreflang: "en"

categories:
    - JavaScript
tags:
    - JavaScript Fundamentals
    - ES6
    - Variable Behavior
---

> 💡 If you're familiar with JavaScript [Scope](/code-en/2025-06-17-javascript-scope/), you'll find this article much easier to follow.

When you're starting with JavaScript, you quickly discover there are three different ways to declare variables: `var`, `let`, and `const`. Confusing, right? 

I remember my early days as a JavaScript developer, wondering why we even need three different keywords for something as simple as creating a variable. I used `var` for everything because it seemed to work just fine. But then I ran into weird bugs where variables had unexpected values, loops behaved strangely, and my code became harder to debug. Everything changed when I realized that `var` has some quirky behaviors that can trip up even experienced developers.

In this article, I'll show you exactly why modern JavaScript developers avoid `var` and when to choose `let` vs `const` instead. We'll cover everything from the fundamental differences between these declarations to practical strategies for writing cleaner, more predictable code.

<br>

## What's the difference between var, let, and const?

> **The TL;DR: JavaScript Variable Declarations**
>
> `var` creates function-scoped variables with unpredictable behavior, while `let` and `const` create block-scoped variables that are safer and more predictable. `let` allows reassignment, `const` prevents it. Modern JavaScript developers use `const` by default and `let` when reassignment is needed, avoiding `var` entirely.

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br>

## Why var Creates Unexpected Problems

### The Function Scope Problem

`var` creates function-scoped variables, not block-scoped ones. This means the variable exists throughout the entire function, not just within the block where it's declared.

Here's where this gets confusing:

```javascript
function demonstrateVarScope() {
    if (true) {
        var message = "Hello from inside the if block";
    }
    console.log(message); // This works! But it shouldn't feel right.
}
demonstrateVarScope(); // Logs: "Hello from inside the if block"
```

In most programming languages, you'd expect `message` to only exist inside the `if` block. But with `var`, it's accessible throughout the entire function. This behavior makes code harder to understand and debug.

**In a production environment**, this can lead to accidentally overwriting variables or accessing data from the wrong scope.

<br>

### The Loop Nightmare

Here's a classic example that breaks many developers' expectations:

```javascript
function createButtons() {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log("Button", i, "clicked"); // Always logs "Button 3 clicked"!
        }, 100);
    }
}
createButtons();
```

You'd expect this to log "Button 0 clicked", "Button 1 clicked", "Button 2 clicked". Instead, it logs "Button 3 clicked" three times!

**Why does this happen?** The `var i` variable is shared across all iterations because it's function-scoped. By the time the setTimeout callbacks run, the loop has finished and `i` equals 3.

<br>

### The Hoisting Confusion

Hoisting is JavaScript's behavior of moving variable declarations to the top of their scope during compilation. With `var`, this creates confusing situations:

```javascript
console.log(userName); // undefined (not an error!)
var userName = "Alice";
console.log(userName); // "Alice"
```

The JavaScript engine treats this code as if you wrote:

```javascript
var userName; // Hoisted to the top
console.log(userName); // undefined
userName = "Alice";
console.log(userName); // "Alice"
```

While this doesn't crash your program, it can mask logic errors. You might think a variable isn't declared when it actually is—it just doesn't have a value yet.

For a deeper dive into how hoisting works, check out our [detailed guide on JavaScript hoisting](/code-en/2025-06-23-javascript-hoisting).

<br>

## let: Block-Scoped and Predictable

`let` was introduced in ES6 to solve the problems with `var`. It creates block-scoped variables that behave more predictably.

<br>

### How let Fixes the Scope Problem

```javascript
function demonstrateLetScope() {
    if (true) {
        let message = "Hello from inside the if block";
        console.log(message); // This works fine
    }
    // console.log(message); // ReferenceError: message is not defined
}
```

With `let`, the variable only exists within the block where it's declared. This makes your code more predictable and prevents accidental access to variables outside their intended scope.

<br>

### Solving the Loop Problem

Remember our broken loop example? Here's how `let` fixes it:

```javascript
function createButtons() {
    for (let i = 0; i < 3; i++) { // Changed var to let
        setTimeout(() => {
            console.log("Button", i, "clicked"); // Now logs 0, 1, 2 correctly!
        }, 100);
    }
}
createButtons();
```

**Why this works**: `let` creates a new binding for each iteration of the loop. Each iteration gets its own copy of `i`, so the callbacks capture the correct value.

<br>

### Preventing Redeclaration Mistakes

```javascript
let apiKey = "abc123";
let apiKey = "xyz789"; // SyntaxError: Identifier 'apiKey' has already been declared
```

This immediate feedback during development helps catch typos and prevents accidentally creating duplicate variables.

<br>

### let and Hoisting

Unlike `var`, variables declared with `let` are hoisted but not initialized. This creates a "temporal dead zone":

```javascript
console.log(score); // ReferenceError: Cannot access 'score' before initialization
let score = 100;
```

This behavior is actually helpful—it forces you to declare variables before using them, preventing many common bugs.

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br>

## const: For Values That Don't Change

`const` creates variables that cannot be reassigned after declaration. It's perfect for values that should remain constant throughout your program.

<br>

### Basic const Usage

```javascript
const PI = 3.14159;
const companyName = "TechCorp";
const maxRetries = 3;

// PI = 3.14; // TypeError: Assignment to constant variable.
```

<br>

### The Important Rule: Immediate Assignment Required

```javascript
const userName; // SyntaxError: Missing initializer in const declaration
userName = "Alice"; // Too late!

const userName = "Alice"; // ✅ Correct approach
```

You must assign a value to `const` variables when you declare them. This requirement helps prevent bugs where variables might be used before they're properly initialized.

<br>

### const with Objects and Arrays

Here's where `const` gets interesting—it prevents reassignment of the variable, but not modification of the object's contents:

```javascript
const userProfile = {
    name: "Alice",
    age: 25,
    preferences: []
};

// ✅ These all work - we're modifying the object's contents
userProfile.age = 26;
userProfile.preferences.push("dark mode");
userProfile.email = "alice@example.com";

console.log(userProfile);
// { name: "Alice", age: 26, preferences: ["dark mode"], email: "alice@example.com" }

// ❌ This doesn't work - we're trying to reassign the variable
// userProfile = { name: "Bob" }; // TypeError: Assignment to constant variable.
```

Think of `const` as creating a permanent pointer to a container. You can change what's inside the container, but you can't point to a different container.

<br>

### const with Arrays

The same principle applies to arrays:

```javascript
const shoppingCart = [];

// ✅ These operations work fine
shoppingCart.push("apples");
shoppingCart.push("bananas");
shoppingCart[0] = "oranges"; // Replace "apples" with "oranges"

console.log(shoppingCart); // ["oranges", "bananas"]

// ❌ This doesn't work
// shoppingCart = ["completely new array"]; // TypeError
```

<br>

## When to Use Each Declaration Type

### Step-by-Step Decision Guide

Follow this decision process every time you declare a variable:

1. **Start with `const`** - Ask yourself: "Will this variable need to be reassigned?"
2. **If no reassignment needed** - Use `const` (most common case)
3. **If reassignment is needed** - Use `let`
4. **Never use `var`** - It has no advantages over `let` and `const`

<br>

### Practical Examples: const vs let

**Use `const` for:**

```javascript
// Configuration values
const API_BASE_URL = "https://api.example.com";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// DOM elements (the reference won't change)
const submitButton = document.getElementById("submit");
const userForm = document.querySelector("#user-form");

// Objects and arrays that will be modified but not reassigned
const gameState = {
    score: 0,
    level: 1,
    lives: 3
};

const todoList = [];
```

**Use `let` for:**

```javascript
// Loop counters
for (let i = 0; i < items.length; i++) {
    // Process items
}

// Variables that will be reassigned
let currentUser = null;
let isLoggedIn = false;
let attempts = 0;

// Conditional assignments
let message;
if (isSuccess) {
    message = "Operation completed successfully";
} else {
    message = "Something went wrong";
}
```

<br>

### Common Mistake: Using let When const Would Work

```javascript
// ❌ Unnecessary use of let
let items = [];
items.push("item1");
items.push("item2");

// ✅ Better - use const since we're not reassigning
const items = [];
items.push("item1");
items.push("item2");
```

Remember: You're not reassigning the `items` variable—you're modifying its contents. `const` is the right choice here.

<br>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br>

## Comparison: var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Redeclaration** | ✅ Allowed (problematic) | ❌ Not allowed | ❌ Not allowed |
| **Hoisting behavior** | Hoisted and initialized with `undefined` | Hoisted but not initialized (temporal dead zone) | Hoisted but not initialized (temporal dead zone) |
| **Initialization** | Optional at declaration | Optional at declaration | Required at declaration |
| **Best practice** | ❌ Avoid completely | ✅ Use when reassignment needed | ✅ Use by default |

<br>

## Migrating from var to Modern Declarations

### Step-by-Step Migration Process

If you're working with legacy code that uses `var`, here's how to safely migrate:

1. **Replace `var` with `const` first** - Start by changing all `var` declarations to `const`
2. **Fix assignment errors** - If you get "Assignment to constant variable" errors, change those specific cases to `let`
3. **Check for scope issues** - Test thoroughly to ensure no functionality breaks due to scope changes
4. **Update loop variables** - Pay special attention to loop counters and variables used in callbacks

<br>

### Migration Example

```javascript
// ❌ Original code with var
var userName = "Alice";
var isLoggedIn = true;
var config = { theme: "dark" };
var items = [];

// Later in the code...
userName = "Bob";           // Reassignment happens
isLoggedIn = false;         // Reassignment happens
config.language = "en";     // Object modification, no reassignment
items.push("item1");        // Array modification, no reassignment

// ✅ Step 1: Replace all var with const
const userName = "Alice";
const isLoggedIn = true;
const config = { theme: "dark" };
const items = [];

// ✅ Step 2: Change to let where reassignment occurs
let userName = "Alice";     // ← Changed to let (reassignment needed)
let isLoggedIn = true;      // ← Changed to let (reassignment needed)
const config = { theme: "dark" };    // ← Stays const (only modified, not reassigned)
const items = [];                    // ← Stays const (only modified, not reassigned)

// Now the reassignments work properly
userName = "Bob";           // ✅ Works with let
isLoggedIn = false;         // ✅ Works with let
config.language = "en";     // ✅ Works with const (modifying contents)
items.push("item1");        // ✅ Works with const (modifying contents)
```

<br>

## Frequently Asked Questions

### Should I ever use var in modern JavaScript?

No, there's no reason to use `var` in modern JavaScript. `let` and `const` provide all the functionality of `var` with better, more predictable behavior. Even when maintaining legacy code, it's worth updating `var` declarations to improve code reliability.

<br>

### When should I choose let over const?

Use `let` when you need to reassign the variable after its initial declaration. Common cases include loop counters, variables that get different values based on conditions, and accumulator variables. If you find yourself using `let` everywhere, step back and see if some of those variables could be `const` instead.

<br>

### Can I modify arrays and objects declared with const?

Yes! `const` prevents reassignment of the variable itself, not modification of its contents. You can push to arrays, change object properties, and call any methods that modify the data structure. You just can't assign a completely new array or object to the variable.

<br>

### What happens if I try to use a let or const variable before declaring it?

You'll get a `ReferenceError`. Unlike `var`, which gets hoisted and initialized with `undefined`, `let` and `const` are in a "temporal dead zone" until their declaration is reached. This actually helps catch bugs early in development.

<br>

### Is there a performance difference between var, let, and const?

The performance difference is negligible in modern JavaScript engines. Any micro-optimizations are far outweighed by the benefits of cleaner, more maintainable code. Focus on writing predictable code rather than worrying about tiny performance differences.

<br>

## Key Takeaways

Here are the most important points to remember about JavaScript variable declarations:

* **Default to `const`** - Start with `const` for every variable and only change to `let` if you need reassignment
* **Use `let` for reassignment** - When a variable's value needs to change, `let` provides block scope without `var`'s problems  
* **Avoid `var` entirely** - It has unpredictable scoping behavior and no advantages over modern alternatives
* **Think about scope** - Block-scoped variables (`let` and `const`) are easier to reason about than function-scoped ones (`var`)

<br>

## Conclusion

Making the switch from `var` to `let` and `const` isn't just about following modern JavaScript trends—it's about writing code that behaves predictably and fails fast when something goes wrong.

By defaulting to `const` and reaching for `let` when you need mutability, you'll write cleaner code that's easier to debug and maintain. Your future self will thank you when you're not hunting down mysterious bugs caused by variable scope issues.

**What's Next**: In our next article, we'll explore the differences between JavaScript's primitive and reference types, and how each type handles copying and assignment. Understanding these concepts will deepen your knowledge of how variables actually work under the hood.

Ready to modernize your variable declarations? Try building a small project using only `let` and `const`—you'll be surprised how much clearer your code becomes! What's your experience with JavaScript variable declarations? Have you encountered any tricky bugs with `var` that `let` or `const` would have prevented?

<br>
