---
title: >  
    JavaScript Hoisting: Master TDZ and Function Behavior

description: >  
    Master JavaScript hoisting, TDZ, and function behavior with practical examples. Understand why variables work before declaration and write bug-free code.

slug: 2025-06-23-javascript-hoisting
date: 2025-06-23 00:00:00+0000
lastmod: 2025-06-23 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-23-javascript-hoisting-en.webp

alternates:
  - title: "자바스크립트 호이스팅, 변수 선언 전 사용 가능한 이유"
    href: "https://ctrlcccv.github.io/code/2025-06-20-javascript-hoisting/"
    hreflang: "ko"
  - title: "JavaScript Hoisting: Master TDZ and Function Behavior" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-23-javascript-hoisting"
    hreflang: "en"

categories:
    - JavaScript
tags:
    - JavaScript Fundamentals
    - Hoisting
    - TDZ
---

Have you ever wondered why this JavaScript code doesn't throw an error, even though we're using a variable before declaring it? When you're learning JavaScript as your first step toward React development, you'll inevitably encounter situations where variables seem to "magically" work before they're defined, leaving you scratching your head.

I remember my first week learning JavaScript – I was building a simple shopping cart calculator and kept getting unexpected `undefined` values instead of proper error messages. I thought my code editor was broken! But then I discovered hoisting, and suddenly everything clicked. Understanding this concept transformed how I write JavaScript and made me a much more confident developer when I eventually moved to React.

In this comprehensive guide, I'll walk you through everything you need to know about JavaScript hoisting – from the basic mechanics to advanced scenarios you'll encounter in real React projects. We'll cover why `var` behaves differently from `let` and `const`, what the mysterious "Temporal Dead Zone" actually means, and most importantly, how to write predictable, bug-free code.

We'll start with the fundamental concept and work our way up to complex scenarios with practical, runnable code examples. By the end of this article, you'll have the hoisting knowledge that will make your transition to React development much smoother and help you avoid the subtle bugs that often plague new JavaScript developers.

<br>

## What is JavaScript Hoisting?
> JavaScript hoisting is the engine's behavior of moving variable and function declarations to the top of their containing scope during the compilation phase. This means you can reference variables and functions before their actual declaration appears in your code, though the behavior varies significantly between `var`, `let`, and `const`.

<br>

## Why Hoisting Knowledge is Critical for React Development

Before diving into React components and hooks, you need to understand how JavaScript manages variable declarations. In React applications, you'll often work with state variables, event handlers, and lifecycle methods where hoisting behavior can create unexpected bugs.

I learned this the hard way when building my first React todo app. I was declaring state updater functions using `var` inside event handlers, which led to some very confusing behavior due to hoisting. Understanding hoisting principles helped me write cleaner, more predictable React code and avoid the "why is my state not updating?" debugging sessions.

Modern React development relies heavily on ES6+ features like `const` and `let`, which have different hoisting behaviors than the older `var` keyword. Mastering these differences now will save you hours of debugging later.

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

## Understanding var Hoisting: The Foundation

The `var` keyword exhibits the most straightforward hoisting behavior – declarations are moved to the top of their function scope and automatically initialized with `undefined`.

<br>

### How var Hoisting Actually Works

```javascript
// ❌ This looks wrong but actually works
function calculateOrderTotal() {
    console.log(subtotal); // undefined (not an error!)
    console.log(tax); // undefined (not an error!)
    
    subtotal = 99.99;
    tax = subtotal * 0.08;
    
    var subtotal;
    var tax;
    
    return subtotal + tax;
}

console.log(calculateOrderTotal()); // 107.99
```

Here's what JavaScript actually does behind the scenes:

```javascript
// ✅ How the JavaScript engine interprets the code
function calculateOrderTotal() {
    var subtotal; // Hoisted and initialized to undefined
    var tax;      // Hoisted and initialized to undefined
    
    console.log(subtotal); // undefined
    console.log(tax);      // undefined
    
    subtotal = 99.99;
    tax = subtotal * 0.08;
    
    return subtotal + tax;
}
```

### Function Scope vs Block Scope with var

```javascript
function processUserData(users) {
    console.log(userCount); // undefined (hoisted)
    
    if (users.length > 0) {
        var userCount = users.length;
        var processedUsers = users.map(user => ({
            ...user,
            processed: true
        }));
    }
    
    // ❌ These variables are accessible outside the if block
    console.log(userCount); // actual length value
    console.log(processedUsers); // processed array
    
    return processedUsers;
}
```

**Key var Characteristics:**
1. **Hoisted and initialized** – Always gets `undefined` value at the top of scope
2. **Function-scoped** – Ignores block boundaries like `if`, `for`, `while`
3. **Allows redeclaration** – You can declare the same variable multiple times

<br>

## The let and const Revolution: Introducing TDZ

ES6 introduced `let` and `const` with a completely different hoisting behavior. While they are still hoisted, they remain uninitialized until their declaration is reached, creating what's known as the Temporal Dead Zone.

<br>

### Understanding the Temporal Dead Zone

```javascript
// ❌ This will throw a ReferenceError
function createUserProfile() {
    console.log(userName); // ReferenceError: Cannot access 'userName' before initialization
    console.log(userEmail); // ReferenceError: Cannot access 'userEmail' before initialization
    
    let userName = "Sarah Johnson";
    const userEmail = "sarah@example.com";
    
    return { userName, userEmail };
}
```

The TDZ creates a "dead zone" where variables exist but cannot be accessed:

```javascript
function demonstrateTDZ() {
    // TDZ starts here for both variables
    console.log(typeof productName); // ReferenceError!
    console.log(typeof productPrice); // ReferenceError!
    
    let productName = "Wireless Headphones";  // TDZ ends for productName
    const productPrice = 149.99;              // TDZ ends for productPrice
    
    console.log(productName); // "Wireless Headphones"
    console.log(productPrice); // 149.99
}
```

### Block Scope Behavior in Practice

```javascript
function handleShoppingCart() {
    const cartTotal = 0;
    
    if (cartTotal === 0) {
        let emptyMessage = "Your cart is empty";
        const suggestionText = "Browse our featured products";
        
        console.log(emptyMessage); // "Your cart is empty"
        console.log(suggestionText); // "Browse our featured products"
    }
    
    // ❌ These would throw ReferenceError
    // console.log(emptyMessage);
    // console.log(suggestionText);
}
```

**let and const Characteristics:**
1. **Hoisted but not initialized** – They exist but can't be accessed until declaration
2. **Block-scoped** – Respect boundaries of `{}`, `if`, `for`, etc.
3. **No redeclaration** – Cannot declare the same name twice in the same scope
4. **const requires initialization** – Must be assigned a value when declared

<br>

## Function Hoisting: The Complete Picture  

Functions have the most complex hoisting behavior, with different rules for function declarations, function expressions, and arrow functions.

<br>

### Function Declarations: Fully Hoisted

```javascript
// ✅ This works perfectly - function declarations are completely hoisted
const result = calculateDiscount(100, 0.2); // 20
console.log(result);

function calculateDiscount(price, discountRate) {
    return price * discountRate;
}
```

### Function Expressions: Variable Hoisting Rules Apply

```javascript
// ❌ This throws TypeError: validateEmail is not a function
const isValid = validateEmail("test@example.com");

var validateEmail = function(email) {
    return email.includes("@") && email.includes(".");
};
```

What's actually happening:

```javascript
// ✅ How JavaScript interprets the above code
var validateEmail; // Hoisted as undefined

const isValid = validateEmail("test@example.com"); // TypeError!

validateEmail = function(email) {
    return email.includes("@") && email.includes(".");
};
```

### Arrow Functions and Modern Patterns

```javascript
// ❌ Cannot access before initialization
const processOrder = (order) => {
    const shippingCost = calculateShipping(order.weight);
    return order.total + shippingCost;
};

// ReferenceError: Cannot access 'calculateShipping' before initialization
const calculateShipping = (weight) => weight > 5 ? 15 : 8;
```

The solution for modern JavaScript development:

```javascript
// ✅ Declare functions before using them
const calculateShipping = (weight) => weight > 5 ? 15 : 8;

const processOrder = (order) => {
    const shippingCost = calculateShipping(order.weight);
    return order.total + shippingCost;
};
```

<br>

## Common Hoisting Pitfalls That Break React Apps

Based on my experience mentoring new React developers, here are the most common hoisting-related mistakes that can break your applications.

<br>

### The Classic Loop Variable Trap

```javascript
// ❌ This creates a common bug in event handlers
function attachClickHandlers() {
    const buttons = document.querySelectorAll('.product-button');
    
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            console.log('Clicked button', i); // Always logs the final value!
        });
    }
}

// ✅ Fix with let to create block scope
function attachClickHandlersCorrectly() {
    const buttons = document.querySelectorAll('.product-button');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            console.log('Clicked button', i); // Logs correct index
        });
    }
}
```

### Variable Shadowing in Nested Scopes

```javascript
const globalUserCount = 100;

function processUsers() {
    console.log(globalUserCount); // ReferenceError! (not 100 as expected)
    
    if (true) {
        let globalUserCount = 50; // This shadows the global variable
        console.log(globalUserCount); // 50
    }
}
```

### React Component Gotchas

```javascript
// ❌ Problematic pattern that new React developers often use
function UserProfile() {
    // This won't work as expected due to hoisting
    console.log(userData); // ReferenceError!
    
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const userData = fetchUserData();
        setUsers(userData);
    }, []);
    
    let userData; // Too late!
}

// ✅ Proper pattern for React components  
function UserProfile() {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchUserData();
            setUserData(data);
            setUsers(data.users);
        };
        
        fetchAndSetData();
    }, []);
    
    return userData ? <div>{userData.name}</div> : <div>Loading...</div>;
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

## Modern JavaScript Best Practices for Hoisting

Here's how to write hoisting-safe code that will serve you well in React development:

<br>

### 1. Embrace the const-first Approach

```javascript
// ✅ Start with const, move to let only when needed
const API_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

function fetchUserData(userId) {
    let retryCount = 0;
    let userData = null;
    
    // Only use let when the value will change
    while (retryCount < MAX_RETRY_ATTEMPTS && !userData) {
        userData = attemptFetch(userId);
        retryCount++;
    }
    
    return userData;
}
```

### 2. Declare Variables at Point of Use

```javascript
// ✅ Declare variables close to where they're used
function calculateShippingCosts(cart) {
    const baseShipping = 5.99;
    
    if (cart.items.length === 0) {
        return 0;
    }
    
    const totalWeight = cart.items.reduce((sum, item) => {
        const itemWeight = item.weight || 0;
        return sum + itemWeight;
    }, 0);
    
    const weightMultiplier = totalWeight > 10 ? 2 : 1;
    
    return baseShipping * weightMultiplier;
}
```

### 3. Use Block Scope Strategically

```javascript
// ✅ Use block scope to limit variable lifetime
function processFormData(formData) {
    const errors = [];
    
    // Email validation block
    {
        const email = formData.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }
    }
    
    // Password validation block  
    {
        const password = formData.password;
        const minLength = 8;
        
        if (password.length < minLength) {
            errors.push('Password must be at least 8 characters');
        }
    }
    
    return errors;
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

## Hoisting Behavior Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Hoisting** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Initialization on Hoist** | ✅ undefined | ❌ Uninitialized | ❌ Uninitialized |
| **Temporal Dead Zone** | ❌ No | ✅ Yes | ✅ Yes |
| **Scope Type** | Function | Block | Block |
| **Redeclaration Allowed** | ✅ Yes | ❌ No | ❌ No |
| **Reassignment Allowed** | ✅ Yes | ✅ Yes | ❌ No |
| **Access Before Declaration** | Returns undefined | ReferenceError | ReferenceError |
| **React Compatibility** | ⚠️ Problematic | ✅ Good | ✅ Best |

<br>

## Frequently Asked Questions

### Q1. Why does JavaScript have hoisting in the first place?

Hoisting exists because of how JavaScript's compilation phase works. When JavaScript code runs, the engine first scans through your code to identify all variable and function declarations, registering them in memory before any code execution begins. This happens during the creation of the execution context.

I initially thought this was a quirky design flaw, but it actually serves important purposes. Function hoisting allows you to organize your code with the main logic at the top and helper functions at the bottom, which often makes code more readable. It also enables recursive function calls and mutual recursion patterns that wouldn't otherwise work.

However, the different hoisting behaviors between `var`, `let`, and `const` reflect JavaScript's evolution toward safer, more predictable code patterns.

<br>

### Q2. How does the Temporal Dead Zone actually protect my code?

The TDZ prevents you from accidentally using variables before they're properly initialized, which was a common source of bugs with `var`. When you try to access a `let` or `const` variable before its declaration, you get an immediate, clear error instead of a mysterious `undefined` value.

In my React projects, this has saved me countless hours of debugging. Instead of wondering why a component is rendering with unexpected `undefined` values, I get a clear error message pointing me to exactly where I'm trying to use a variable too early.

<br>

### Q3. Should I ever use var in modern JavaScript development?

In modern JavaScript and React development, I recommend avoiding `var` entirely. The combination of function scope and automatic `undefined` initialization creates too many opportunities for bugs. Every use case for `var` can be better handled with `let` or `const`.

The only exception might be when working with very old codebases or specific compatibility requirements, but even then, tools like Babel can transpile `let` and `const` to work in older environments.

<br>

### Q4. How does hoisting affect React hooks?

React hooks must be declared at the top level of your component function, and hoisting knowledge helps you understand why. Since hooks rely on consistent call order between renders, you need to be very careful about conditional declarations or variable scope issues.

```javascript
function MyComponent() {
    // ✅ Hooks at the top level - predictable hoisting behavior
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    
    useEffect(() => {
        // ✅ Variables declared in proper scope
        const timer = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);
    
    return <div>{count} - {name}</div>;
}
```

<br>

### Q5. What tools can help me catch hoisting-related bugs?

ESLint is your best friend here. Rules like `no-var`, `prefer-const`, and `no-use-before-define` will catch most hoisting-related issues before they become bugs. TypeScript also provides excellent compile-time checking for variable usage patterns.

I also recommend using your browser's developer tools debugger to step through code execution and see exactly when variables are initialized versus when they're accessed.

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

## Conclusion: Master Hoisting, Master JavaScript

**Key Takeaways:**
- Hoisting moves declarations to the top of scope, but initialization stays in place
- `var` initializes to `undefined` immediately, while `let`/`const` remain in TDZ until declaration
- Function declarations are fully hoisted, but function expressions follow variable rules  
- Block scope with `let`/`const` prevents many common bugs that plague `var` usage
- Modern best practice: prefer `const`, use `let` when needed, avoid `var` entirely

**Practice Challenge:** Build a simple user registration form validator that demonstrates proper variable scoping. Use `const` for validation rules, `let` for changing state, and implement proper error handling that showcases block scope benefits.

Next up, we'll dive into **JavaScript Closures** – another fundamental concept that will elevate your React development skills. With your solid understanding of hoisting and scope, closures will make perfect sense!

What's your experience with hoisting been like? Have you encountered any tricky bugs that this article helped clarify? I'd love to hear about your "aha!" moments or any additional questions in the comments below. Your experience could help fellow developers avoid the same pitfalls! 🚀

<br>