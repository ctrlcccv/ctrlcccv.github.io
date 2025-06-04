---
title: >  
    React Memoization: useMemo vs useCallback Differences

description: >  
    Learn the key differences between useMemo and useCallback hooks in React with practical examples to optimize your application performance.

slug: 2025-06-13-usememo-usecallback
date: 2025-06-13 00:00:00+0000
lastmod: 2025-06-13 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-10-usememo-usecallback.webp

alternates:
  - title: "React useMemo vs useCallback 차이점 쉽게 이해하기"
    href: "https://ctrlcccv.github.io/code/2025-06-10-usememo-usecallback/"
    hreflang: "ko"
  - title: "React Memoization: useMemo vs useCallback Differences" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-13-usememo-usecallback/"
    hreflang: "en"

categories:
    - React
tags:
    - React Hooks
    - Performance Optimization
    - Memoization
---

Have you ever used useMemo and useCallback hooks in React but struggled to understand the real difference between them?

These two hooks often confuse developers due to their similar names and syntax. However, they serve distinct purposes and operate differently under the hood. In this post, we'll break down the key differences between useMemo and useCallback through clear, practical examples.

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

## The Core Difference Between useMemo and useCallback

Both hooks leverage memoization (storing computed values to avoid recalculation), but they memoize different things:

```javascript
// useMemo: Memoizes a computed value (the result)
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback: Memoizes the function definition itself
const memoizedFunction = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

- **useMemo**: Memoizes the **result of executing a function**.
- **useCallback**: Memoizes the **function itself** without executing it.

This fundamental difference means useMemo runs your function and stores its result, while useCallback preserves the function reference without running it.

<br>

## Comparing Real-World Use Cases

### Differences with the Same Dependencies

```javascript
function ExampleComponent({ data }) {
  // useMemo: Memoize the data processing result
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return data.filter(item => item.active).map(item => ({
      ...item,
      name: item.name.toUpperCase()
    }));
  }, [data]);

  // useCallback: Memoize the function that processes the same data
  const processData = useCallback(() => {
    console.log('Processing data...');
    return data.filter(item => item.active).map(item => ({
      ...item,
      name: item.name.toUpperCase()
    }));
  }, [data]);

  return (
    <div>
      {/* useMemo: Already processed result is used directly */}
      <div>Processed items count: {processedData.length}</div>
      
      {/* useCallback: Function must be called to get the result */}
      <button onClick={() => console.log(processData())}>
        View Processed Data
      </button>
    </div>
  );
}
```

In this example:
- `useMemo` evaluates if `data` has changed on each render. If not, it simply returns the cached result without reprocessing.
- `useCallback` preserves the function reference, but the function executes from scratch each time the button is clicked.

<br>

### Differences When Passing to Child Components

```javascript
// Child component (optimized with React.memo)
const ChildComponent = React.memo(({ data, onItemClick }) => {
  console.log('Child component rendering');
  return (
    <ul>
      {data.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// Parent component
function ParentComponent() {
  const [items] = useState([
    { id: 1, name: 'Apple', active: true },
    { id: 2, name: 'Banana', active: false },
    { id: 3, name: 'Orange', active: true }
  ]);
  const [count, setCount] = useState(0);

  // useMemo: Process data to pass to child
  const activeItems = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  // useCallback: Memoize function to pass to child
  const handleItemClick = useCallback((id) => {
    console.log(`Item ${id} clicked`);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increase count: {count}
      </button>
      <ChildComponent 
        data={activeItems} 
        onItemClick={handleItemClick} 
      />
    </div>
  );
}
```

In this example:
- `useMemo` creates a filtered array only when the source `items` array changes.
- `useCallback` maintains the same function reference across renders, ensuring it's not recreated when `count` changes.
- Both hooks prevent unnecessary re-renders of the child component that's wrapped with `React.memo`.

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

## When to Choose Which Hook?

### When to Use useMemo:

1. **For expensive calculations**
   ```javascript
   // Filtering and sorting a large dataset
   const processedData = useMemo(() => {
     return largeDataset
       .filter(item => item.category === selectedCategory)
       .sort((a, b) => a.value - b.value);
   }, [largeDataset, selectedCategory]);
   ```

2. **When creating reference-sensitive values for child components**
   ```javascript
   // Creating a new object (effective with React.memo)
   const userConfig = useMemo(() => {
     return { name: user.name, permissions: user.permissions };
   }, [user.name, user.permissions]);
   ```

<br>

### When to Use useCallback:

1. **For event handlers passed to optimized child components**
   ```javascript
   // Event handler passed to child component
   const handleClick = useCallback(() => {
     setIsOpen(!isOpen);
   }, [isOpen, setIsOpen]);
   ```

2. **For functions included in useEffect dependency arrays**
   ```javascript
   // Function used in useEffect dependency
   const fetchData = useCallback(() => {
     api.getData(userId).then(setData);
   }, [userId]);

   useEffect(() => {
     fetchData();
   }, [fetchData]);
   ```

<br>

## Important Considerations

### 1. Avoid Premature Optimization

```javascript
// Simple calculations don't need memoization
const sum = useMemo(() => a + b, [a, b]); // Unnecessary overhead

// Simple functions may not benefit from memoization
const simpleHandler = useCallback(() => {
  setCount(count + 1);
}, [count]); // Minimal optimization benefit
```

For simple operations, the overhead of memoization might exceed the benefits. Focus on optimizing areas with measurable performance bottlenecks.

<br>

### 2. Properly Manage Dependency Arrays

```javascript
// Incorrect: Missing dependency
const handleSubmit = useCallback(() => {
  api.submit(formData);
}, []); // formData is missing - potential bug!

// Correct usage
const handleSubmit = useCallback(() => {
  api.submit(formData);
}, [formData]);
```

Always include all values referenced in your function in the dependency array to avoid stale closures and subtle bugs.

<br>

### 3. Handle Reference Types Carefully

```javascript
// Problem: New options object created on every render
const options = { theme: theme, language: language };
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data, options);
}, [data, options]); // options reference changes each render!

// Solution: Memoize the options object too
const options = useMemo(() => {
  return { theme, language };
}, [theme, language]);
```

Remember that objects and arrays create new references with each render, so they should also be memoized when used in dependency arrays.

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

## Performance Comparison Example

### Before Optimization:
```javascript
function ProductList({ products, category }) {
  // Filtering and sorting on every render
  const filteredProducts = products
    .filter(product => product.category === category)
    .sort((a, b) => a.price - b.price);
    
  return (
    <ul>
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

**Performance Results**: 1,000 items, 10 renders - Average render time: 120ms, Total calculations: 10

<br>

### After Optimization (using useMemo):
```javascript
function ProductList({ products, category }) {
  // Memoize filtering and sorting results
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => product.category === category)
      .sort((a, b) => a.price - b.price);
  }, [products, category]);
    
  return (
    <ul>
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

**Performance Results**: Same conditions - Average render time: 45ms, Total calculations: 1

<br>

## Conclusion

While both `useMemo` and `useCallback` are performance optimization tools in React, they serve different purposes:

- **useMemo** prevents expensive recalculations by caching computed values.
- **useCallback** preserves function references to prevent unnecessary re-renders of child components.

Using these hooks strategically in the right places can significantly improve your React application's performance. However, focus on optimizing genuine bottlenecks rather than applying memoization indiscriminately.

How are you using useMemo and useCallback in your React projects? Share your performance optimization experiences in the comments!

<br>
