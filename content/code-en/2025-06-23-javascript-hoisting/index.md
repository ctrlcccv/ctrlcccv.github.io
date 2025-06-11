---
title: >  
    JavaScript TDZ and Hoisting Tutorial

description: >  
    Complete JavaScript hoisting tutorial that solves variable puzzles confusing developers. Learn TDZ behavior and master hidden rules governing var, let, and const declarations.

slug: 2025-06-23-javascript-hoisting
date: 2025-06-23 00:00:00+0000
lastmod: 2025-06-23 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-23-javascript-hoisting-en.webp

alternates:
  - title: "자바스크립트 호이스팅과 TDZ 개념 총정리"
    href: "https://ctrlcccv.github.io/code/2025-06-20-javascript-hoisting/"
    hreflang: "ko"
  - title: "JavaScript TDZ and Hoisting Tutorial" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-23-javascript-hoisting/"
    hreflang: "en"
  - title: "자바스크립트 호이스팅과 TDZ 개념 총정리"
    href: "https://ctrlcccv.github.io/code/2025-06-20-javascript-hoisting/"
    hreflang: "x-default"

categories:
    - JavaScript
tags:
    - JavaScript Fundamentals
    - Variable Behavior
    - Performance Optimization
---

> 💡 Having some background knowledge about [JavaScript Scope](/code-en/2025-06-17-javascript-scope) will make this article much easier to follow and understand.

Have you ever run JavaScript code that worked completely differently than you expected? You know the feeling—variables appearing before they're defined, mysterious `undefined` values popping up, or sudden reference errors that crash your application out of nowhere.

Here's the thing: these aren't actually bugs. They're JavaScript's variable handling mechanisms doing exactly what they're designed to do. Once you understand these patterns, you'll be able to write more predictable code and debug issues much faster.

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

## The Mystery: Variables That Exist Before They're Born

Let me show you something that seems impossible at first glance:

```javascript
// This actually runs without any errors!
printUsername(); // Output: "Guest User"
showProfile(); // Output: undefined (but no error thrown)

function printUsername() {
    console.log("Guest User");
}

var showProfile = function() {
    console.log("Profile loaded");
};
```

Why does `printUsername()` work perfectly while `showProfile()` just returns `undefined`? The answer lies in how JavaScript prepares your code behind the scenes before it starts executing.

<br>

## Behind the Scenes: JavaScript's Two-Phase Process

JavaScript doesn't just run your code line by line like you might expect. Instead, it follows a two-step process that can seem a bit mysterious if you don't know what's happening:

**Phase 1: Memory Setup**
- JavaScript scans through your entire scope looking for declarations
- It reserves memory space for all variables and functions it finds
- Function declarations get initialized completely (that's why `printUsername()` works)
- `var` variables get initialized with `undefined` (that's why `showProfile` exists but can't be called)

**Phase 2: Code Execution**
- Now JavaScript runs through your code line by line
- It assigns actual values to variables when it encounters those lines

This two-phase approach explains our mystery from earlier:

```javascript
// After Phase 1 memory setup, JavaScript has created:
// printUsername: [complete function, ready to use]
// showProfile: undefined

// During Phase 2 execution:
printUsername(); // ✅ Function exists and works perfectly
showProfile(); // ❌ Still undefined, can't be called as a function
```

<br>

## Modern Variables: let and const Work Differently

When ES6 introduced `let` and `const`, they brought different rules to the game:

```javascript
console.log(oldWay); // undefined (no error, just undefined)
console.log(newWay); // ReferenceError: Cannot access before initialization

var oldWay = "I'm accessible";
let newWay = "I cause errors";
```

**Here's the key difference**: `let` and `const` do exist in memory during Phase 1, but they're **uninitialized** until JavaScript actually reaches their declaration line during execution.

This creates what we call a "dead zone"—a period where the variable exists but you can't access it:

```javascript
function demonstrateDeadZone() {
    // The dead zone for 'status' starts right here
    
    if (Math.random() > 0.5) {
        console.log(status); // ❌ ReferenceError - we're in the dead zone
        let status = "ready"; // Dead zone ends here
        console.log(status); // ✅ Now it works perfectly
    }
}
```

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


## The Most Common Bug: Accidental Variable Shadowing

Here's the scenario that trips up developers most often:

```javascript
let config = "global setting";

function processData() {
    console.log(config); // What do you think this prints?
    
    if (true) {
        let config = "local setting";
        console.log(config); // This prints "local setting"
    }
}

processData(); // Surprise! This throws a ReferenceError
```

**What happened here?** The inner `config` declaration creates a dead zone that affects the entire function scope, not just the `if` block. So when you try to access `config` at the beginning of the function, you're actually trying to access the uninitialized local variable.

**Here's how to fix it**—use different variable names or be very clear about your scope boundaries:

```javascript
let config = "global setting";

function processData() {
    console.log(config); // "global setting" ✅ Works as expected
    
    if (true) {
        let localConfig = "local setting";
        console.log(localConfig); // "local setting" ✅ Also works great
    }
}
```

<br>

## Quick Reference: How Each Declaration Type Behaves

| Declaration Type | Memory Setup | Before Declaration | Scope |
|-----------------|-------------|-------------------|-------|
| `var name` | Set to `undefined` | ✅ Returns `undefined` | Function |
| `let name` | Uninitialized | ❌ ReferenceError | Block |
| `const name` | Uninitialized | ❌ ReferenceError | Block |
| `function name()` | Complete function | ✅ Fully functional | Function |

<br>

## Debug Strategy: Spotting These Patterns in the Wild

### Pattern 1: The Undefined Condition
```javascript
function buggyCode() {
    if (shouldProcess) { // undefined is always falsy!
        // This block never runs, even though you think it should
    }
    var shouldProcess = true; // Too late—the if statement already ran
}

// Fix: Declare your variables where you need them
function fixedCode() {
    var shouldProcess = true; // Now the condition can actually work
    if (shouldProcess) {
        // This runs as expected
    }
}
```

### Pattern 2: The Loop Variable That Won't Cooperate
```javascript
// The problem that's confused countless developers
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3 (not what you wanted!)
}

// The solution
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2 (exactly what you wanted!)
}
```

<br>

## Modern Best Practices That Actually Work

1. **Stick with `let` and `const`**—they'll catch errors early instead of letting them hide
2. **Declare variables close to where you use them**—no need to hoist everything manually
3. **Use descriptive names**—this helps you avoid accidental shadowing
4. **Enable strict mode**—it catches these common mistakes before they become problems

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

## Quick Test: Can You Predict What Happens?

```javascript
let x = 1;

function test() {
    console.log(x); // What do you think prints here?
    let x = 2;
    console.log(x); // And what about here?
}

test();
```

**What will happen when this code runs?**

A. Prints `1`, then `2`<br>
B. Prints `undefined`, then `2`<br>
C. Throws a ReferenceError on the first console.log<br>
D. Prints `1`, then throws an error

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="Choose your answer (A, B, C, or D) and explain your reasoning."></textarea>
</div>

<details>
<summary>Check Answer</summary>

**Answer: C**

The first `console.log(x)` throws a ReferenceError because the local `x` declaration creates a dead zone. The second one would print `2`, but we never get there because of the error.

**Here's why**: When JavaScript sees `let x = 2;` inside the function, it creates a local variable `x` that shadows the global one. However, this local `x` is in the Temporal Dead Zone from the start of the function until its declaration line. Trying to access it before the declaration results in a ReferenceError, not `undefined` like with `var`.

This is a perfect example of how the TDZ helps catch potential bugs early rather than letting them silently cause problems later.
</details>

<br>

Understanding these variable behaviors will help you write more predictable code, debug issues faster, and avoid common JavaScript pitfalls. The key insight is that JavaScript's two-phase execution model explains what might seem like mysterious behavior.

<br>