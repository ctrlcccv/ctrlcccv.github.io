---
title: >  
    JavaScript Shallow Copy vs Deep Copy: 2025 Edition

description: >  
    Struggling with JavaScript copy operations? Learn critical differences between shallow and deep copying, when to use each, and master latest techniques including structuredClone().

slug: 2025-07-07-javascript-copy
date: 2025-07-07 00:00:00+0000
lastmod: 2025-07-07 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-07-javascript-copy-en.webp

alternates:
  - title: "JavaScript 얕은 복사 vs 깊은 복사: 2025년 최신 가이드 (feat. structuredClone)"
    href: "https://ctrlcccv.github.io/code/2025-07-04-javascript-copy/"
    hreflang: "ko"
  - title: "JavaScript Shallow Copy vs Deep Copy: 2025 Edition" 
    href: "https://ctrlcccv.github.io/code-en/2025-07-07-javascript-copy/"
    hreflang: "en"

categories:
    - JavaScript 
tags:
    - JavaScript fundamentals
    - shallow copy
    - deep copy
---
> 💡 Having some background knowledge about JavaScript [Primitive vs Reference](/code-en/2025-07-01-primitive-reference) will make this article much easier to follow and understand.

When working with JavaScript objects and arrays, you've probably encountered this frustrating scenario: "I copied my data to a new variable, but why is my original data changing too?" Sound familiar?

I remember struggling with this exact problem early in my development journey. I thought I was creating independent copies of my objects, but my original data kept getting modified unexpectedly. This became especially problematic when building interactive applications where user actions would accidentally overwrite important data. Then I had that "aha!" moment when I finally understood the difference between shallow and deep copying – it completely changed how I approach data manipulation in JavaScript.

In this comprehensive guide, I'll walk you through everything you need to know about JavaScript copying methods. We'll cover the fundamental concepts, explore 5 different copying techniques, and see practical examples that you'll encounter in real-world development.

From basic spread operators to the latest `structuredClone()` method, you'll learn exactly when and how to use each approach to avoid those sneaky bugs that can crash your applications.

<br>

## What is JavaScript Copy?

> **JavaScript Copy: The Essential Definition**
>
> **Shallow copy** creates a new object but keeps references to nested objects from the original. **Deep copy** creates a completely independent duplicate with no shared references. The choice between them depends on your data structure and whether you need complete isolation from the original object.

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

## Why JavaScript Copy Methods Matter in Real Development

### The Root Cause: Reference vs Value Types

Understanding copying issues requires knowledge of how JavaScript stores different data types.

JavaScript has two fundamental data categories:

- **Primitive Types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`
  - Stored as actual values
  - Copying always creates independent duplicates

- **Reference Types**: `object`, `array`, `function`
  - Stored as memory addresses (references)
  - Copying requires special attention

```javascript
// Primitive types - no problems here
let originalPrice = 99.99;
let discountedPrice = originalPrice;
discountedPrice = 79.99;
console.log(originalPrice); // 99.99 (unchanged)

// Reference types - this is where things get tricky!
let originalCart = ['laptop', 'mouse', 'keyboard'];
let userCart = originalCart;  // Points to the same memory location
userCart.push('monitor');
console.log(originalCart); // ['laptop', 'mouse', 'keyboard', 'monitor'] (original changed!)
```
<br>

### Why This Matters in Real Applications

In production environments, most data is structured as objects or arrays: user profiles, product inventories, form data, API responses. Without proper copying techniques, you risk:

- Accidental data corruption
- Unexpected UI updates
- Hard-to-debug state management issues
- Performance problems from unwanted re-renders

<br>

## Understanding Shallow Copy

### What is Shallow Copy?

Shallow copy creates a **new object for the top level only**, but nested objects and arrays still **share references** with the original.

Think of it like copying a filing cabinet. You get a new cabinet (top level), but the folders inside (nested objects) are the same ones from the original cabinet.

```javascript
const productCatalog = {
    title: "Electronics Store",     // Top level (gets copied)
    categories: {                   // Nested object (shared reference)
        laptops: ['MacBook', 'ThinkPad'],
        phones: ['iPhone', 'Samsung']
    }
};

// Common shallow copy methods
const catalog1 = Object.assign({}, productCatalog);
const catalog2 = { ...productCatalog };  // Spread operator (most popular)

// Top-level changes are independent
catalog1.title = "Tech Warehouse";
console.log(productCatalog.title); // "Electronics Store" (original intact)
console.log(catalog1.title);       // "Tech Warehouse"

// Nested changes affect both objects!
catalog1.categories.laptops.push('Dell XPS');
console.log(productCatalog.categories.laptops); // ['MacBook', 'ThinkPad', 'Dell XPS'] (original modified!)
console.log(catalog1.categories.laptops);       // ['MacBook', 'ThinkPad', 'Dell XPS']
```
<br>

### When to Use Shallow Copy

Shallow copying is perfect when you need:

1. **Simple object structures** without nesting
2. **Performance optimization** (faster than deep copy)
3. **Memory efficiency** (shared references save space)

```javascript
// ✅ Perfect for shallow copy
const userProfile = {
    username: "johndoe",
    email: "john@example.com",
    isActive: true
};

const updatedProfile = { ...userProfile, isActive: false };
// Simple structure means no reference issues!
```

<br>

## Mastering Deep Copy

### What is Deep Copy and When You Need It

Deep copy creates a **completely independent duplicate** at every level. All nested objects, arrays, and properties are newly created with no shared references.

This is like photocopying every single document in that filing cabinet and putting them in a brand new cabinet.

```javascript
const applicationState = {
    currentUser: "alice_dev",
    preferences: {
        theme: "dark",
        notifications: {
            email: true,
            push: false,
            desktop: true
        }
    },
    recentProjects: ["weather-app", "todo-list"]
};

// Deep copy using structuredClone (2025 recommended method!)
const backupState = structuredClone(applicationState);

// Change deeply nested values
backupState.preferences.notifications.email = false;
backupState.recentProjects.push("portfolio-site");

console.log(applicationState.preferences.notifications.email);  // true (original preserved!)
console.log(backupState.preferences.notifications.email);       // false
console.log(applicationState.recentProjects);                   // ["weather-app", "todo-list"]
console.log(backupState.recentProjects);                        // ["weather-app", "todo-list", "portfolio-site"]
```
<br>

### Essential Use Cases for Deep Copy

You absolutely need deep copy when:

1. **Working with nested data structures**
2. **Preserving original data integrity**
3. **Creating backup copies before modifications**
4. **Managing application state safely**

<br>

## 5 JavaScript Copy Methods Compared

### Method 1: structuredClone() - The Modern Standard

The newest and most reliable method, built into modern browsers.

```javascript
const complexData = {
    id: 'user_123',
    createdAt: new Date('2024-01-15'),
    tags: new Set(['developer', 'javascript', 'react']),
    metadata: new Map([['version', '1.0'], ['env', 'production']]),
    config: {
        settings: {
            autoSave: true,
            theme: 'dark'
        }
    }
};

const perfectCopy = structuredClone(complexData);

// All complex types are properly preserved!
console.log(perfectCopy.createdAt instanceof Date);     // true
console.log(perfectCopy.tags.has('developer'));         // true
console.log(perfectCopy.metadata.get('version'));       // '1.0'
```

**Benefits of structuredClone():**
- No external libraries required
- Handles Date, Map, Set, RegExp, and more
- Manages circular references automatically
- Excellent performance

**Limitations:**
- Cannot copy functions
- Not supported in very old browsers (but widely available in 2025)

<br>

### Method 2: JSON Parse/Stringify - Simple but Limited

```javascript
// ❌ Problematic example
const dataWithComplexTypes = {
    name: "DevProject",
    launchDate: new Date(),                        // Becomes string
    execute: function() { return "Running"; },     // Disappears
    status: undefined,                             // Disappears
    config: null                                   // Preserved as null
};

const jsonCopy = JSON.parse(JSON.stringify(dataWithComplexTypes));
console.log(jsonCopy.launchDate instanceof Date); // false - now a string!
console.log(jsonCopy.execute);                     // undefined - function lost!

// ✅ Safe usage example
const basicProjectData = {
    projectName: "My Website",
    version: "2.1.0",
    contributors: ["Alice", "Bob", "Charlie"],
    isPublic: true
};

const safeCopy = JSON.parse(JSON.stringify(basicProjectData));
// Works perfectly with basic data types
```

**Why JSON Method Has Limitations:**

JSON was designed for **data interchange between servers and clients**, so it only supports basic, serializable data types. JavaScript-specific objects like functions, Date objects, or undefined values can't be represented in JSON format.

<br>

### Method 3: Spread Operator (...) - Best for Shallow Copy

```javascript
// Perfect for simple objects
const taskItem = {
    id: 1,
    text: "Learn JavaScript copying",
    completed: false,
    priority: "high"
};

const updatedTask = { ...taskItem, completed: true };

// Great for arrays too
const originalTasks = [
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" }
];

const newTaskList = [...originalTasks, { id: 3, text: "Task 3" }];
```

<br>

### Method 4: Object.assign() - Alternative Shallow Copy

```javascript
const defaultConfig = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

const userConfig = {
    timeout: 10000,
    debug: true
};

// Merge configurations
const finalConfig = Object.assign({}, defaultConfig, userConfig);
// Results in: { apiUrl: "https://api.example.com", timeout: 10000, retries: 3, debug: true }
```

<br>

### Method 5: Lodash cloneDeep() - When You Need Functions

```javascript
// npm install lodash
import _ from 'lodash';

const moduleWithMethods = {
    name: "UserManager",
    data: { users: [] },
    addUser: function(user) { this.data.users.push(user); },
    getCount: () => this.data.users.length
};

const clonedModule = _.cloneDeep(moduleWithMethods);
console.log(clonedModule.addUser.toString()); // Function is preserved!
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

## 2025 Best Practices Guide

### Choosing the Right Method: Decision Matrix

| **Scenario** | **Recommended Method** | **Why This Choice** |
|--------------|------------------------|-------------------|
| Simple objects + performance critical | Spread operator `{...obj}` | Fastest and sufficient |
| Nested objects + no special types | `structuredClone()` | Safe and reliable |
| Complex types (Date, Map, Set) | `structuredClone()` | Preserves type integrity |
| Need to copy functions | `_.cloneDeep()` | Only method that handles functions |
| Legacy browser support needed | JSON method + validation | Maximum compatibility |

<br>

### Real-World Implementation Examples

Here's how these copying methods solve actual development challenges:

<br>

#### 1. Form Data Management
```javascript
// Managing form state without mutations
const originalFormData = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com"
    },
    preferences: {
        newsletter: true,
        notifications: false
    }
};

// User makes changes - create independent copy
const formDraft = structuredClone(originalFormData);
formDraft.personalInfo.firstName = "Jane";
formDraft.preferences.newsletter = false;

// Original data remains untouched for reset functionality
console.log(originalFormData.personalInfo.firstName); // "John" (preserved!)
```

<br>

#### 2. Shopping Cart State Management
```javascript
const shoppingCart = {
    items: [
        { productId: 'P1', name: 'Laptop', quantity: 1, price: 999 },
        { productId: 'P2', name: 'Mouse', quantity: 2, price: 25 }
    ],
    discounts: {
        code: 'SAVE10',
        percentage: 10
    }
};

// Add new item without affecting original cart
const updatedCart = structuredClone(shoppingCart);
updatedCart.items.push({ productId: 'P3', name: 'Keyboard', quantity: 1, price: 75 });

// Safe to modify without side effects
console.log(shoppingCart.items.length);     // 2 (original preserved)
console.log(updatedCart.items.length);      // 3 (new version)
```

<br>

#### 3. API Response Processing
```javascript
const apiResponse = {
    timestamp: "2024-01-15T10:30:00Z",  // String format from API
    userData: {
        profile: {
            name: "Developer",
            joinDate: "2023-06-01T00:00:00Z"
        },
        settings: { theme: "auto" }
    }
};

// Process data while preserving original
const processedData = structuredClone(apiResponse);
processedData.timestamp = new Date(processedData.timestamp);
processedData.userData.profile.joinDate = new Date(processedData.userData.profile.joinDate);
processedData.userData.settings.theme = "dark";

// Original API response stays intact for debugging
console.log(typeof apiResponse.timestamp);              // "string"
console.log(processedData.timestamp instanceof Date);   // true
```

<br>

## Frequently Asked Questions

### How do I know when to use shallow vs deep copy?

Examine your object structure first. If you have nested objects or arrays that you plan to modify, use deep copy. For simple, flat objects, shallow copy is sufficient and faster. When in doubt, `structuredClone()` is the safest choice. In my experience, I follow the principle: "Start with `structuredClone()` and optimize only if performance becomes an issue."

<br>

### Is structuredClone() always better than JSON methods?

In most cases, yes. `structuredClone()` preserves data types accurately while JSON methods can transform or lose data (functions, Date objects, undefined values). The performance difference is negligible for typical use cases. However, for processing thousands of simple objects in performance-critical applications, JSON methods might have a slight speed advantage.

<br>

### Can I copy functions with structuredClone()?

No, `structuredClone()` cannot copy functions. If you need to copy functions, use Lodash's `cloneDeep()`. However, in modern JavaScript development, it's often better to separate data from behavior—keep your data as plain objects and functions separate for better architecture and testability.

<br>

### Which method performs best?

**For shallow copying:**
- Spread operator (`{...obj}`, `[...arr]`) is fastest
- Perfect balance of speed and correctness for simple structures

**For deep copying:**
- **Performance ranking**: JSON methods > `structuredClone()` > Lodash
- **Reliability ranking**: `structuredClone()` > Lodash > JSON methods

But remember: correctness trumps performance. `structuredClone()` offers:
- Perfect type preservation (Date, Map, Set, RegExp)
- Circular reference handling (JSON methods throw errors)
- Predictable results (no data transformation surprises)
- Built-in availability (no external dependencies)

The performance difference is usually negligible (milliseconds), so prioritize safe, bug-free code with `structuredClone()`!

<br>

### What about copying arrays?

Arrays follow the same principles as objects. Use spread operator `[...array]` for shallow copying simple arrays, and `structuredClone(array)` for arrays containing objects or nested arrays. Array methods like `slice()` also create shallow copies but spread operator is more readable and consistent.

<br>

## Key Takeaways

Let's summarize the essential points about JavaScript copying:

- **Shallow Copy**: Copies only the top level, perfect for simple structures
- **Deep Copy**: Creates completely independent copies, essential for nested data
- **2025 Recommendations**: Spread operator for shallow, `structuredClone()` for deep copying
- **Golden Rule**: When uncertain, choose `structuredClone()` for safety


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


## What's Next?

Practice these concepts by building a simple todo list application. Create, modify, and delete tasks while ensuring your original data stays protected. Try implementing undo functionality using these copying techniques—you'll quickly see why proper copying is crucial for robust applications.

Now that you understand how JavaScript manages data through copying, you might be wondering: "How does JavaScript actually find and access these variables in the first place?" The answer lies in understanding **JavaScript's lexical environment**—the sophisticated system that tracks where variables live and how they can be accessed.

In our next article, we'll dive deep into the fascinating world of variable lookup, scope chains, and closures. You'll discover why your variables sometimes behave unexpectedly and learn the fundamental concepts that make JavaScript's variable management system tick. Understanding lexical environments will make you a much more confident developer when working with complex data structures and closures.

What's been your experience with JavaScript copying? Have you encountered any tricky situations or discovered clever solutions? Share your stories in the comments below—let's learn together! 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone">MDN - structuredClone() Official Documentation</a>
</div>