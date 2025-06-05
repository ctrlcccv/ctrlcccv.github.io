---
title: >  
    Stop React Re-renders with useCallback Hook

description: >  
    Learn how React's useCallback hook eliminates unnecessary re-renders, boosting your app's performance with practical, easy-to-follow examples.

slug: 2025-06-11-react-usecallback
date: 2025-06-11 00:00:00+0000
lastmod: 2025-06-11 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-11-react-usecallback-en.webp

alternates:
  - title: "React useCallback으로 불필요한 리렌더링 방지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-06-react-usecallback/"
    hreflang: "ko"
  - title: "Stop React Re-renders with useCallback Hook" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-11-react-usecallback/"
    hreflang: "en"
  - title: "React useCallback으로 불필요한 리렌더링 방지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-06-react-usecallback/"
    hreflang: "x-default"

categories:
    - React
tags:
    - React Hooks
    - useCallback
    - Performance Optimization
---

Noticing your React app getting sluggish? One of the most common culprits is unnecessary function recreation. Every time your component renders, React creates brand new function instances – even if they do exactly the same thing. This becomes particularly problematic when passing these functions to child components as props.

Luckily, React's `useCallback` hook offers an elegant solution to this performance bottleneck.

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

## Understanding useCallback

<iframe src="https://codesandbox.io/embed/pzg786?view=preview"
     style="width:100%; height: 250px; border:0; border-radius: 4px; overflow:hidden;"
     title="useCallback-en"
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

  // Created once and persisted across renders
  const applyDefaultSettings = useCallback(() => {
    setTextSize(16);
    setTextColor('black');
  }, []); // Empty array = never recreate this function

  // Recreated only when textSize changes
  const changeColor = useCallback((newColor) => {
    console.log(`Applying ${newColor} to ${textSize}px text`);
    setTextColor(newColor);
  }, [textSize]); // Dependency array lists values the function needs
  
  return (
    <div style={{ padding: '20px', border: '1px solid gray' }}>
      <p style={{ fontSize: `${textSize}px`, color: textColor }}>
        This text can change size and color.
      </p>
      <div>
        <button onClick={() => setTextSize(textSize + 1)}>Larger</button>
        <button onClick={() => setTextSize(textSize - 1)}>Smaller</button>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('blue')}>Blue</button>
        <button onClick={applyDefaultSettings}>Reset</button>
      </div>
    </div>
  );
}
```

### How useCallback Works

Think of `useCallback` as a memory tool that tells React: "Remember this function and don't recreate it unless something specific changes." It's like giving React a sticky note so it can recall the exact same function later.

```jsx
const memoizedFunction = useCallback(
  () => {
    // Your function logic here
  },
  [dependencies] // Only recreate when these values change
);
```

### Two Common Patterns

1. **Stable Functions (Empty Dependency Array)**: The `applyDefaultSettings` function is created just once when the component first mounts. Since it always does the same thing, there's no need to ever recreate it.

2. **Dependent Functions**: The `changeColor` function depends on `textSize`, so we list that dependency. This way, the function updates only when the text size changes, ensuring it always has access to the current value.

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

## Stopping Re-render Cascades

```jsx
import React, { useState, useCallback } from 'react';

// Child component optimized with React.memo
const TodoItem = React.memo(({ todo, onToggle }) => {
  console.log(`Rendering TodoItem: ${todo.text}`); // Shows when component renders
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
    { id: 2, text: 'Master useCallback', completed: false }
  ]);
  
  // Stabilized with useCallback
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No dependencies = stable reference
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}
```

### The Problem Explained

Here's what happens without `useCallback`:

Every time a component renders, JavaScript creates entirely new function instances. Even functions that look identical are different objects in memory:

```jsx
const sayHi1 = () => console.log('Hi');
const sayHi2 = () => console.log('Hi');
console.log(sayHi1 === sayHi2); // false - completely different objects
```

This creates a sneaky performance issue: Even when you optimize a child component with `React.memo`, it will still re-render unnecessarily when it receives a new function reference from its parent – which happens on every parent render!

<br>

### How useCallback Solves This

With `useCallback`, the function maintains its identity between renders:

1. **First render**: React creates the function and stores it in memory
2. **Later renders**: Instead of creating a new function, React returns the same function instance
3. **Result**: Child components receive the exact same function reference and skip re-rendering
4. **Updates**: Only when a dependency changes does React create a fresh function

This pattern is particularly valuable for optimizing lists, forms, and data-heavy interfaces where unnecessary re-renders can create noticeable performance issues.

<br>

## Perfect Use Cases for useCallback

```jsx
function ProductSearch({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // API fetch function stabilized with useCallback
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/products?category=${categoryId}&search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  }, [categoryId, searchTerm]); // Only recreate when search parameters change
  
  // Safe to use in useEffect without causing infinite loops
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  return <div>{/* UI components */}</div>;
}
```

**When useCallback Shines:**
- **API Calls**: Prevent duplicate network requests caused by function recreation
- **Event Handlers**: Keep handlers stable when passed to optimized child components
- **useEffect Dependencies**: Safely include functions in effect dependencies without triggering infinite loops
- **Performance-Critical Areas**: Optimize rendering in complex UI hierarchies and long lists

<br>

## Avoiding Common Mistakes

```jsx
function ExampleComponent() {
  const [count, setCount] = useState(0);
  
  // MISTAKE: Missing dependency
  const buggyFunction = useCallback(() => {
    console.log(`Count: ${count}`);
    // This will always show the initial count value!
  }, []); // Bug: Missing count in dependencies
  
  // CORRECT: All dependencies included
  const correctFunction = useCallback(() => {
    console.log(`Count: ${count}`);
  }, [count]); // Updates when count changes
  
  // SMART: Using functional updates to minimize dependencies
  const smartIncrement = useCallback(() => {
    setCount(prev => prev + 1); // No need for count in dependencies
  }, []);
}
```

**Best Practices:**

* **✓ Measure first**: Use React DevTools Profiler to identify actual performance bottlenecks before optimization.
* **✓ Be selective**: Don't wrap every function in useCallback – only those passed to child components or used in effect dependencies.
* **✓ Include all dependencies**: List every external value your callback uses to avoid bugs with stale data.
* **✓ Use functional updates**: When updating state based on previous state, use the functional form to reduce dependencies.
* **✗ Avoid premature optimization**: useCallback has its own performance cost – use it where it matters.
* **✗ Don't ignore dependency warnings**: The ESLint react-hooks plugin catches missing dependencies for a reason.

<br>

## Conclusion

The `useCallback` hook is a powerful tool for preventing unnecessary re-renders in React applications. Used strategically, it can significantly improve performance, especially in larger applications with complex component trees.

For maximum impact, focus on memoizing these three function types:
1. Event handlers passed to optimized child components
2. Functions used in useEffect dependencies
3. Callbacks that trigger expensive operations

Remember: measure performance first, then optimize where it matters most.

<br>
