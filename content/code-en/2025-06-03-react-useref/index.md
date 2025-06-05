---
title: >  
    React useRef: How to Access DOM Elements Directly

description: >  
    Master React's useRef hook to easily access DOM elements and store values between renders with these practical examples.

slug: 2025-06-03-react-useref
date: 2025-06-03 00:00:00+0000
lastmod: 2025-06-03 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-02-react-useref.webp

alternates:
  - title: "React - useRef 훅으로 DOM 직접 제어하고 값 유지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-02-react-useref/"
    hreflang: "ko"
  - title: "React useRef: How to Access DOM Elements Directly" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-03-react-useref/"
    hreflang: "en"
  - title: "React - useRef 훅으로 DOM 직접 제어하고 값 유지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-02-react-useref/"
    hreflang: "x-default"

categories:
    - React
tags:
    - React Hooks
    - useRef
    - DOM Manipulation
---

Need to directly grab DOM elements or keep track of values without causing your component to re-render? React's useRef hook is your answer. While React normally manages updates through its virtual DOM, useRef gives you a way to work outside this system when needed.

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

## Getting Started with useRef

```jsx
import React, { useRef } from 'react';

function InputForm() {
  // Create a useRef
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Directly access the DOM element
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    
  );
}
```

### What is useRef?
Think of useRef as a remote control for a DOM element. Just like a TV remote gives you direct control over your television regardless of what's playing, useRef gives you direct access to DOM elements regardless of React's rendering cycles. The remote stays in your hand (persists between renders) and lets you directly control the element without going through React's usual update process.

<br>

### Using useRef in 3 Simple Steps
1. **Create your reference**: Call `useRef(null)` to create a new ref
2. **Connect to an element**: Attach this ref to a DOM element using the ref attribute
3. **Access the element**: Use the `.current` property to interact with the element

In our example, clicking the button focuses the text input - showing how useRef lets you control a DOM element directly without triggering any re-renders.

<br>

## What Makes useRef Special

```jsx
import React, { useRef, useState, useEffect } from 'react';

function RenderCounter() {
  // Regular variable - resets on every render
  let regularVar = 0;
  
  // useState - changes trigger re-renders
  const [stateValue, setStateValue] = useState(0);
  
  // useRef - persists across renders, changes don't trigger re-renders
  const renderCount = useRef(0);
  
  useEffect(() => {
    regularVar++;
    renderCount.current++;
    console.log(`regularVar: ${regularVar}, renderCount: ${renderCount.current}`);
  });
  
  return (
    <div>
      <p>Render count: {renderCount.current}</p>
      <p>State value: {stateValue}</p>
      <button onClick={() => setStateValue(stateValue + 1)}>Increase State</button>
    
  );
}
```

* **Persistent Memory** - Unlike regular variables that reset every time your component renders, useRef values stick around.
* **Silent Updates** - When you change a useState value, React re-renders your component. Change a useRef value, and nothing happens on screen.
* **Direct DOM Access** - useRef gives you a direct line to the actual DOM element, bypassing React's usual update system.

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

## Real-World useRef Examples

### 1. Creating an Infinite Scroll

```jsx
function ProductList() {
  const lastItemRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Load next page when last item is visible
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }
    
    return () => observer.disconnect();
  }, [products]);

  return (
    <div>
      {products.map((product, index) => (
        <div key={product.id}>
          {/* Connect ref to last item */}
          <div ref={index === products.length - 1 ? lastItemRef : null}>
            {product.name}
          
        
      ))}
    
  );
}
```

This example creates that smooth infinite scrolling you see on social media feeds. By combining useRef with IntersectionObserver, we can detect when a user reaches the bottom of your content and automatically load more items.

<br>

### 2. Creating a Custom Video Player

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div className="video-container">
      <video 
        ref={videoRef} 
        src="/video-path.mp4"
        onEnded={() => setIsPlaying(false)}
      />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    
  );
}
```

Want to build your own video player? By connecting useRef to a video element, you can tap into all the built-in video methods like play() and pause() with clean, simple code.

<br>

## When to Use useState vs useRef

```jsx
function StateComparisonComponent() {
  // Visible values - use useState
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Internal values not shown on screen - use useRef
  const submitCountRef = useRef(0);
  const timerRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    submitCountRef.current += 1;
    
    // Hide notification after 3 seconds
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
      {isSubmitted && <p>Submitted successfully!</p>}
    </form>
  );
}
```

* **The Golden Rule** - If users need to see it on screen, use useState. If it's just for internal tracking, use useRef.
* **Performance Benefits** - Every useState update triggers a re-render of your component. useRef updates happen silently, making your app faster.

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

## useRef Tips and Common Mistakes

```jsx
function WarningsComponent() {
  const refValue = useRef(0);
  const [stateValue, setStateValue] = useState(0);
  
  // WRONG: Changing .current during rendering
  refValue.current += 1; // Don't do this!
  
  const handleIncrement = () => {
    // CORRECT: Change .current in event handlers
    refValue.current += 1;
    console.log(refValue.current);
    
    // Update state to display the value on screen
    setStateValue(refValue.current);
  };
  
  return (
    <div>
      <p>Ref value: {refValue.current}</p>
      <p>State value: {stateValue}</p>
      <button onClick={handleIncrement}>Increment</button>
    
  );
}
```

* **Don't Change Refs During Rendering** - Never modify ref values in the main component body - only in event handlers or effects.
* **Screen Updates Need State** - Changing a ref value won't update your UI. To show a ref value, sync it to a state value.
* **Safety Check First** - Always check that your ref exists before using it: `if (myRef.current) { /* now it's safe */ }`

<br>

## Wrap-Up

The useRef hook gives you a direct line to DOM elements and a place to store values that persist between renders without causing unnecessary updates. It's like having a secret toolbox that works alongside React's main system.

Key takeaways:
- Use useState for anything visible on screen
- Use useRef for behind-the-scenes tracking
- Only change ref values in event handlers or effects
- Always check that ref elements exist before using them

<br>