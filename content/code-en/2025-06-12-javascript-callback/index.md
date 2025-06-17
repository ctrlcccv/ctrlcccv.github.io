---
title: >  
    What is a Callback in JS: Functions That Wait

description: >  
    Learn JavaScript callback functions and their role in asynchronous programming with practical examples.

slug: 2025-06-12-javascript-callback
date: 2025-06-12 00:00:00+0000
lastmod: 2025-06-12 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-12-javascript-callback-en.webp

canonical: "https://ctrlcccv.github.io/code/2025-06-09-javascript-callback/"
alternates:
  - title: "JavaScript 콜백 함수(Callback function) 쉽게 이해하기"
    href: "https://ctrlcccv.github.io/code/2025-06-09-javascript-callback/"
    hreflang: "ko"
  - title: "What is a Callback in JS: Functions That Wait" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-12-javascript-callback/"
    hreflang: "en"

categories:
    - JavaScript
tags:
    - Callback Functions
    - Asynchronous Programming
    - Performance Optimization
---

Ever come across the term "callback function" in web development and wondered what it actually means?

Callback functions are fundamental to JavaScript and incredibly powerful. They're the backbone of asynchronous operations and are used throughout modern web development. In this guide, I'll break down what callback functions are and how to use them in straightforward terms.

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

## What is a Callback Function?

A callback function is simply a function that you pass as an argument to another function. This function is then called at a later time when a specific task completes. Think of it as saying, "Here's what I want you to do after you finish your current task."

<br>

### Real-Life Analogies for Callbacks

1. **Food Delivery App**:
   - Main process: You order food through an app
   - Callback: "Notify me when the delivery driver is on the way"
   - Execution: The app automatically sends you a notification when your delivery starts

2. **Restaurant Pager**:
   - Main process: You place your order at a counter
   - Callback: The staff hands you a buzzer
   - Execution: The buzzer vibrates when your food is ready for pickup

Callbacks create a system where certain actions happen automatically when specific conditions are met.

<br>

### Basic Structure

```javascript
function mainFunction(arg1, arg2, callbackFunction) {
    // Main function does its work first
    
    // When finished, it executes the callback
    callbackFunction();
}

// Using the function with a callback
mainFunction(value1, value2, function() {
    console.log("Task completed!");
});
```

In this example, `function() { console.log("Task completed!"); }` is the callback. It only runs after `mainFunction` finishes its work.

<br>

## Simple Callback Example

```javascript
// A function that accepts a callback parameter
function greet(name, callback) {
    console.log("Hello, " + name + "!");
    // Execute the callback after greeting
    callback();
}

// A function we'll use as a callback
function sayGoodbye() {
    console.log("Goodbye!");
}

// Passing sayGoodbye as a callback to greet
greet("John", sayGoodbye);
```

**Output:**
```
Hello, John!
Goodbye!
```

What's happening here:
- `greet` accepts two arguments: a name and a callback function
- `sayGoodbye` is passed as the callback
- When `greet("John", sayGoodbye)` runs, it first displays the greeting, then executes the callback

<br>

## Using Anonymous Callback Functions

Callbacks don't need to be defined separately. You can create them on the spot as anonymous functions:

```javascript
// Using an anonymous function as the callback
greet("Jane", function() {
    console.log("See you later!");
});
```

**Output:**
```
Hello, Jane!
See you later!
```

This approach makes your code more concise, especially when the callback is only needed once.

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

## Common Real-World Callback Examples

### 1. Array Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach uses a callback function for each array element
numbers.forEach(function(number) {
    console.log(number); // Prints each number in the array
});
```

<br>

### 2. Event Listeners

```javascript
// HTML: <button id="myButton">Click me</button>

document.getElementById('myButton').addEventListener('click', function() {
    alert('Button was clicked!');
});
```

Here, the callback function runs each time someone clicks the button.

<br>

### 3. Handling API Requests

```javascript
function fetchData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(new Error('Request failed'));
        }
    };
    xhr.send();
}

// Using the fetchData function
fetchData('https://api.example.com/data', function(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log('Data received:', data);
    }
});
```

This callback handles the response after an API request completes, whether it succeeds or fails.

<br>

### 4. Timer Functions

```javascript
// Run code after a delay
setTimeout(function() {
    console.log('2 seconds have passed!');
}, 2000);

// Run code repeatedly at intervals
setInterval(function() {
    console.log('This message appears every 3 seconds');
}, 3000);
```

These functions use callbacks to execute code after a specific time period.

<br>

## Callbacks and Asynchronous Programming

Callbacks are essential to JavaScript's asynchronous programming model. They allow your code to continue running while waiting for operations like network requests or timers to complete.

```javascript
console.log("Starting the coffee machine...");

// Asynchronous operation with callback
setTimeout(function() {
    console.log("Your coffee is ready!");
}, 3000);

console.log("Getting the milk from the fridge...");
```

**Output:**
```
Starting the coffee machine...
Getting the milk from the fridge...
(3 seconds later)
Your coffee is ready!
```

The `setTimeout` callback doesn't block the rest of your code. This is like starting your coffee maker and then doing other kitchen tasks while waiting for the coffee to brew.

<br>

## The Callback Hell Problem and Solutions

When you nest multiple callbacks, you can end up with difficult-to-read code known as "Callback Hell" or the "Pyramid of Doom":

```javascript
fetchUserData(userId, function(userData) {
    fetchUserPosts(userData.id, function(posts) {
        fetchPostComments(posts[0].id, function(comments) {
            fetchCommentAuthor(comments[0].authorId, function(author) {
                console.log(author.name);
                // Even more nested callbacks...
            });
        });
    });
});
```

### Modern Solutions

1. **Named Functions:**
```javascript
function handleAuthor(author) {
    console.log(author.name);
}

function handleComments(comments) {
    fetchCommentAuthor(comments[0].authorId, handleAuthor);
}

function handlePosts(posts) {
    fetchPostComments(posts[0].id, handleComments);
}

function handleUserData(userData) {
    fetchUserPosts(userData.id, handlePosts);
}

fetchUserData(userId, handleUserData);
```

2. **Promises:**
```javascript
fetchUserData(userId)
    .then(userData => fetchUserPosts(userData.id))
    .then(posts => fetchPostComments(posts[0].id))
    .then(comments => fetchCommentAuthor(comments[0].authorId))
    .then(author => {
        console.log(author.name);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

3. **Async/Await:**
```javascript
async function getUserAuthor(userId) {
    try {
        const userData = await fetchUserData(userId);
        const posts = await fetchUserPosts(userData.id);
        const comments = await fetchPostComments(posts[0].id);
        const author = await fetchCommentAuthor(comments[0].authorId);
        console.log(author.name);
    } catch (error) {
        console.error("Error:", error);
    }
}

getUserAuthor(userId);
```

<br>

## Conclusion

Callbacks are a core JavaScript feature that let you define what happens after certain operations complete. They're essential for handling asynchronous tasks and are built into many JavaScript functions and methods.

While callbacks remain fundamental to JavaScript, modern approaches like Promises and async/await have emerged to address the readability challenges of nested callbacks in complex code.

How do you use callbacks in your projects? Do you prefer traditional callbacks or newer approaches? Share your experiences in the comments!

<br>
