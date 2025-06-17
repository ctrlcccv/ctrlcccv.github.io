---
title: >  
    React useEffect Tutorial: From Basic to Advanced

description: >  
    Master React's useEffect hook with practical examples. Learn to control component lifecycles and implement cleanup functions for better React apps.

slug: 2025-05-30-useeffect
date: 2025-05-30 00:00:00+0000
lastmod: 2025-05-30 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-25-useEffect.webp

canonical: "https://ctrlcccv.github.io/code/2024-03-25-useeffect/"
alternates:
  - title: "React - useEffect 가이드 및 실전 예제"
    href: "https://ctrlcccv.github.io/code/2024-03-25-useeffect/"
    hreflang: "ko"
  - title: "React useEffect Tutorial: From Basic to Advanced"
    href: "https://ctrlcccv.github.io/code-en/2025-05-30-useeffect/"
    hreflang: "en"

categories:
    - React
tags:
    - React Hooks
    - useEffect
    - Side Effects
    - Cleanup Functions
---

Have you ever needed to run code right after your React component renders on screen?

That's exactly what useEffect is for. Whether you need to fetch data, set up event listeners, or update the DOM, useEffect helps you perform these actions at the right time. This guide breaks down this essential React hook with practical examples you can start using today.

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

## What is useEffect?

Think of useEffect as React's way to handle "side effects" – anything that happens outside your component's rendering process. It lets you run code after React has updated the DOM.

```javascript
import React, { useEffect } from 'react';

function WelcomeMessage() {
  useEffect(() => {
    // This runs after component renders
    console.log('Welcome message is now visible!');
    
    // This runs when component is removed
    return () => {
      console.log('Welcome message is being removed');
    };
  }, []); // The empty array means "run once after first render"
  
  return <h2>Welcome to our app!</h2>;
}
```

* **How It Works**  
<span class="txt">
useEffect takes two arguments: a function to run and a dependency array.  
The empty array `[]` tells React to run your effect only once when the component mounts.
</span>

* **Real-World Analogy**  
<span class="txt">
It's like a smart home system: when you enter a room (component renders), the lights turn on automatically (useEffect runs). When you leave (component unmounts), the lights turn off (cleanup function runs).
</span>

<br>

## Controlling When Effects Run

One of useEffect's most powerful features is the ability to control exactly when your effects run:

```javascript
function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  
  // Runs only once when the component first appears
  useEffect(() => {
    document.title = 'User Profile Page';
  }, []);
  
  // Runs whenever userId changes
  useEffect(() => {
    console.log(`Fetching data for user #${userId}`);
  }, [userId]);
  
  // Runs after every render
  useEffect(() => {
    console.log(`Mode: ${darkMode ? 'Dark' : 'Light'}, User: #${userId}`);
  });
  
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <h1>User Profile: #{userId}</h1>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

* **Empty Array (`[]`)**  
<span class="txt">
Your effect runs exactly once after the first render – perfect for initialization tasks like setting page titles or initial data fetching.
</span>

* **With Dependencies (`[userId]`)**  
<span class="txt">
Your effect runs whenever any value in the dependency array changes – great for keeping operations in sync with specific state changes.
</span>

* **No Dependency Array**  
<span class="txt">
Your effect runs after every render – useful in rare cases but can cause performance issues if overused.
</span>

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

## Cleaning Up Effects

Proper cleanup is crucial for preventing memory leaks and unexpected behavior:

```javascript
function WindowSizeTracker() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Define handler
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    // Set up listener
    window.addEventListener('resize', handleResize);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      <p>Current window width: {windowWidth}px</p>
      <p>{windowWidth < 768 ? 'Mobile view' : 'Desktop view'}</p>
    </div>
  );
}
```

* **When Cleanup Happens**  
<span class="txt">
Cleanup functions run before the component unmounts or before the effect runs again due to dependency changes – ensuring resources are properly released.
</span>

* **What Requires Cleanup**  
<span class="txt">
Always clean up event listeners, timers (setTimeout/setInterval), subscriptions, WebSockets, and other ongoing processes to prevent memory leaks.
</span>

<br>

## Handling API Requests with useEffect

Data fetching is perhaps the most common useEffect use case:

```javascript
function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Track if component is still mounted
    let isMounted = true;
    
    async function fetchWeather() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/weather/current');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(`Failed to load weather: ${err.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchWeather();
    
    // Cleanup: prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []);
  
  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return null;
  
  return (
    <div>
      <h1>Current Weather</h1>
      <div>Temperature: {weather.temperature}°F</div>
      <div>Condition: {weather.condition}</div>
    </div>
  );
}
```

* **Best Practices**  
<span class="txt">
Use an "isMounted" flag to prevent state updates after component unmounting – avoiding React warnings and memory leaks.  
Always include loading and error states to create a better user experience.
</span>

<br>

## Managing Component Lifecycles

useEffect is perfect for handling different stages of your component's lifecycle:

```javascript
function Modal({ isOpen, onClose, message }) {
  // "When component mounts" effect
  useEffect(() => {
    console.log('Modal component created');
    return () => console.log('Modal component destroyed');
  }, []);
  
  // "When prop changes" effect
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling when modal opens
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      if (isOpen) {
        // Re-enable scrolling when modal closes
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <div>{message}</div>
      </div>
    </div>
  );
}
```

* **Understanding Lifecycles**  
<span class="txt">
"Mounting" is when a component first appears on screen, and "unmounting" is when it's removed.  
With useEffect, you can target specific lifecycle events by using appropriate dependency arrays.
</span>

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

## Common useEffect Pitfalls and Solutions

### Avoiding Infinite Loops

```javascript
// ❌ Problem: Creates an infinite loop
function BadCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // Updates state, triggering re-render and another effect run
  }, [count]);
  
  return <div>{count}</div>;
}

// ✅ Solution: Use functional updates
function GoodCounter() {
  const [count, setCount] = useState(0);
  const [shouldCount, setShouldCount] = useState(false);
  
  useEffect(() => {
    if (shouldCount) {
      // This approach doesn't need count in dependencies
      setCount(prev => (prev < 5 ? prev + 1 : prev));
    }
  }, [shouldCount]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setShouldCount(!shouldCount)}>
        {shouldCount ? 'Stop' : 'Start'} Counting
      </button>
    </div>
  );
}
```

### Including All Dependencies

```javascript
// ✅ Properly handling dependencies
function SearchComponent({ searchTerm }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Skip empty searches
    if (!searchTerm.trim()) return;
    
    // Debounce searches while typing
    const timer = setTimeout(() => {
      fetch(`https://api.example.com/search?q=${searchTerm}`)
        .then(r => r.json())
        .then(setResults);
    }, 300);
    
    // Clean up timer if searchTerm changes before timeout
    return () => clearTimeout(timer);
  }, [searchTerm]); // searchTerm correctly included in dependencies
  
  return <ResultsList items={results} />;
}
```

### Separating Effects by Concern

```javascript
// ✅ Separate effects for separate concerns
function ProfilePage({ userId }) {
  // Data fetching effect
  useEffect(() => {
    fetchUserData(userId);
  }, [userId]);
  
  // DOM event handling effect
  useEffect(() => {
    function handleResize() {/* resize logic */}
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Analytics effect
  useEffect(() => {
    logPageView('profile');
  }, []);
}
```

<br>

## Key Takeaways

useEffect is a powerful tool for synchronizing your React components with external systems. Remember these core principles:

- Use dependency arrays strategically to control when your effects run
- Always clean up resources you create in your effects
- Keep each effect focused on a single responsibility
- Be careful with state updates in effects to avoid infinite loops

Mastering useEffect will help you build more responsive, efficient React applications that handle complex interactions smoothly while maintaining great performance.

Have a question about useEffect or a tricky use case? Drop a comment below!

<br>

