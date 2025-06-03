---
title: >  
    Boost React Performance: Stop Re-renders with useCallback

description: >  
    Master React's useCallback hook to prevent unnecessary re-renders and optimize your app's performance. Simple examples and practical tips for real-world use.

slug: 2025-06-11-react-usecallback
date: 2025-06-11 00:00:00+0000
lastmod: 2025-06-11 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-11-react-usecallback-en.webp

categories:
    - React
tags:
    - React Hooks
    - useCallback
    - Performance Optimization
---

Is your React app getting sluggish because of too many re-renders?

In React development, a common performance killer is function recreation. Every time a component re-renders, all its functions are created from scratch. This becomes especially problematic when you pass these functions down to child components as props. Thankfully, React's useCallback hook provides an elegant fix for this issue.


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

## What is useCallback and Why Should You Care?

<br>

<iframe src="https://codesandbox.io/embed/zjshm3?view=preview&module=%2Fsrc%2FApp.tsx"
     style="width:100%; height: 300px; border:0; border-radius: 4px; overflow:hidden;"
     title="useCallback"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<br>
<br>

```jsx
import React, { useState, useCallback } from 'react';

function TextEditor() {
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState('black');

  // 1. Empty dependency array - created only once when component mounts
  const applyDefaultSettings = useCallback(() => {
    setTextSize(16);
    setTextColor('black');
  }, []); // Empty array: function persists throughout component lifecycle

  // 2. With dependencies: changeColor depends on textSize
  const changeColor = useCallback((newColor) => {
    console.log(`Changing text color to ${newColor} for ${textSize}px text`);
    setTextColor(newColor);
  }, [textSize]); // Function recreated only when textSize changes
  
  return (
    <div style={{ padding: '20px', border: '1px solid gray' }}>
      <p style={{ fontSize: `${textSize}px`, color: textColor }}>
        This text can change size and color.
      </p>
      <div>
        <button onClick={() => setTextSize(textSize + 1)}>Larger Text</button>
        <button onClick={() => setTextSize(textSize - 1)}>Smaller Text</button>
      </div>
      <div>
        <button onClick={() => changeColor('red')} style={{ color: 'red' }}>Red</button>
        <button onClick={() => changeColor('blue')} style={{ color: 'blue' }}>Blue</button>
      </div>
      <button onClick={applyDefaultSettings}>Reset to Default</button>
    </div>
  );
}
```

### useCallback in a Nutshell
Think of useCallback as a memory tool for functions. It tells React, "Hey, remember this function and don't recreate it unless something specific changes." This saves resources and prevents unnecessary re-renders.

<br>

### How to Use It
```jsx
const memoizedFunction = useCallback(
  () => {
    // What your function does
  },
  [thingsThatMightChange] // Only recreate when these values change
);
```

### Two Key Patterns
Let's break down the example above:

1. **When Nothing Changes (Empty Array)**: The `applyDefaultSettings` function uses `[]` as its dependency array, meaning it's created once when the component first appears and never recreated. Since it always does the same thing (reset to defaults), this makes perfect sense.

2. **When Something Might Change**: The `changeColor` function needs to know the current `textSize`. We include `textSize` in the dependency array so that whenever text size changes, the function updates to use the new size. Without this, it would forever use the initial text size from when it was first created.

By using useCallback smartly, you prevent child components from re-rendering unnecessarily when their function props haven't actually changed in meaningful ways.

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

## Stopping Unnecessary Re-renders in Their Tracks

```jsx
import React, { useState, useCallback } from 'react';

// Child component (optimized with React.memo)
const TodoItem = React.memo(({ todo, onToggle }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </li>
  );
});

// Parent component
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Understand useCallback', completed: false }
  ]);
  
  // Function without useCallback - recreated on every render
  const handleToggleNormal = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  // Function with useCallback - memoized
  const handleToggleOptimized = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Empty dependency array: function remains stable
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggleOptimized} // Using the optimized function
          />
        ))}
      </ul>
    </div>
  );
}
```

### The Problem Explained Simply

**What's Happening:**
In React, when a component refreshes (re-renders), all the functions inside it are created brand new. JavaScript sees these as completely different functions, even if they do exactly the same thing:

```jsx
// These look identical but JavaScript treats them as completely different
const sayHi1 = () => console.log('Hi');
const sayHi2 = () => console.log('Hi');
console.log(sayHi1 === sayHi2); // false - they're different objects in memory
```

This creates a sneaky problem: even if you've optimized a child component with React.memo to prevent unnecessary updates, it will still re-render whenever a parent passes it a new function reference - which happens on every parent render!

**The Fix:**
useCallback keeps the function reference stable between renders:

```jsx
// This function maintains the same identity across renders
const stableFunction = useCallback(() => {
  // Function logic here
}, []);
```

**How This Works:**
1. First render: React creates the function and remembers it
2. Later renders: Instead of creating a new function, React gives you the same one it remembered
3. The child component receives the exact same function reference, so it doesn't need to re-render
4. Only if values in the dependency array change does React create a new function

This is especially powerful for optimizing lists, complex forms, and data-heavy UIs where unnecessary re-renders can seriously impact performance.


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

## Real-World Examples: When to Use useCallback

```jsx
import React, { useState, useCallback, useEffect } from 'react';

function ProductSearch({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Stabilize the fetch function with useCallback
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?category=${categoryId}&search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, searchTerm]); // Only recreate when search criteria change
  
  // Event handler that won't change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  
  // Safe to use in useEffect without causing infinite loops
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // The function's identity only changes when needed
  
  return (
    <div>{/* UI components */}</div>
  );
}
```

**Perfect Use Cases:**
- **Data Fetching**: Keep API calls from firing repeatedly due to function recreation
- **Event Handlers**: Stabilize handlers for events like form submissions and button clicks
- **useEffect Dependencies**: Avoid the dreaded infinite re-render loop when including functions in useEffect
- **Callback Props**: Keep child components from re-rendering unnecessarily

<br>

## Common Mistakes and Best Practices

```jsx
function WarningExampleComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John Doe' });
  
  // MISTAKE 1: Using useCallback when it's not needed
  const simpleHandler = useCallback(() => {
    console.log('Simple handler');
  }, []); // Overkill for this simple function
  
  // MISTAKE 2: Missing dependencies
  const buggyFunction = useCallback(() => {
    console.log(`Current count: ${count}`); // Using count
    console.log(`User name: ${user.name}`); // Using user.name
  }, []); // BUG! Missing count and user.name in dependencies
  
  // CORRECT: All used values in dependencies
  const correctFunction = useCallback(() => {
    console.log(`Current count: ${count}`);
    console.log(`User name: ${user.name}`);
  }, [count, user.name]); // ✓ All used values included
  
  // SMART: Using functional updates to reduce dependencies
  const smartIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1); // Uses previous state instead of current
  }, []); // No need for count in dependencies
}
```

**useCallback Do's and Don'ts:**

* **✓ DO measure first**: Use React DevTools Profiler to find actual performance bottlenecks before optimizing.
* **✓ DO skip useCallback** for trivial functions that don't get passed to child components.
* **✓ DO include all dependencies** used in your function to avoid stale closures and bugs.
* **✓ DO use functional updates** (`setState(prev => ...)`) to minimize dependency requirements.
* **✗ DON'T** wrap every function in useCallback - it has its own performance cost.
* **✗ DON'T** forget dependencies - the ESLint react-hooks plugin can help catch these.

<br>

## Conclusion

useCallback is like a performance superpower for your React applications - when used correctly. It helps prevent the cascade of unnecessary re-renders that can slow down your app, especially in component trees with many levels or long lists.

For the biggest impact, focus on memoizing these three types of functions:
1. Event handlers passed to optimized child components
2. Functions used in useEffect dependencies
3. Callback functions that trigger expensive operations

Remember that premature optimization can sometimes add complexity without real benefits. Start with clean code, measure performance, then optimize where it matters most.

What performance tricks have you discovered with useCallback in your own projects? Share your wins and challenges in the comments below!

<br>
