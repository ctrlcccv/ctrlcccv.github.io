---
title: >  
    React useCallback으로 불필요한 리렌더링 방지하기

description: >  
    React의 useCallback 훅을 활용해 함수를 효율적으로 관리하고 불필요한 리렌더링을 방지해보세요. 실제 사례를 통해 앱 성능을 높이는 방법을 알아봅니다.

slug: 2025-06-06-react-usecallback
date: 2025-06-06 00:00:00+0000
lastmod: 2025-06-06 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-06-react-usecallback.webp

canonical: "https://ctrlcccv.github.io/code/2025-06-06-react-usecallback/"
alternates:
  - title: "React useCallback으로 불필요한 리렌더링 방지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-06-react-usecallback/"
    hreflang: "ko"
  - title: "Stop React Re-renders with useCallback Hook" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-11-react-usecallback/"
    hreflang: "en"

categories:
    - React
tags:
    - React Hooks
    - useCallback
    - 성능 최적화
---

리액트 컴포넌트가 불필요하게 다시 렌더링되어 앱이 느려지고 있나요?

리액트로 개발하다 보면 컴포넌트가 다시 그려질 때마다 함수가 새로 만들어져 성능이 저하되는 경우가 많습니다. 특히 자식 컴포넌트에 함수를 props로 넘겨줄 때 이런 문제가 더 심해집니다. React의 useCallback 훅은 이런 문제를 간단하게 해결해 줍니다.

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

## useCallback 기본 개념 이해하기

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

function 텍스트에디터() {
  const [텍스트크기, set텍스트크기] = useState(16);
  const [텍스트색상, set텍스트색상] = useState('black');

  // 1. 빈 의존성 배열 - 컴포넌트 마운트 시 한 번만 생성됨
  const 기본설정적용 = useCallback(() => {
    set텍스트크기(16);
    set텍스트색상('black');
  }, []); // 빈 배열: 함수가 컴포넌트 생명주기 동안 유지됨

  // 2. 의존성이 있는 경우: `색상변경` 함수는 `텍스트크기`에 의존합니다. 
  const 색상변경 = useCallback((새색상) => {
    console.log(`${텍스트크기}px 크기의 텍스트 색상을 ${새색상}으로 변경합니다`);
    set텍스트색상(새색상);
  }, [텍스트크기]); // 텍스트크기가 변경될 때만 함수가 재생성됨
  
  return (
    <div style={{ padding: '20px', border: '1px solid gray' }}>
      <p style={{ fontSize: `${텍스트크기}px`, color: 텍스트색상 }}>
        이 텍스트는 크기와 색상을 변경할 수 있습니다.
      </p>
      <div>
        <button onClick={() => set텍스트크기(텍스트크기 + 1)}>텍스트 크게</button>
        <button onClick={() => set텍스트크기(텍스트크기 - 1)}>텍스트 작게</button>
      </div>
      <div>
        <button onClick={() => 색상변경('red')} style={{ color: 'red' }}>빨강</button>
        <button onClick={() => 색상변경('blue')} style={{ color: 'blue' }}>파랑</button>
      </div>
      <button onClick={기본설정적용}>기본 설정으로</button>
    </div>
  );
}
```

### useCallback이란?
useCallback은 함수를 "기억"해두는 React의 특별한 기능입니다. 컴포넌트가 다시 그려질 때마다 함수를 새로 만들지 않고, 특정 값이 바뀔 때만 함수를 새로 만들어 성능을 개선합니다.  

<br>

### 기본 구조
```jsx
const 기억된함수 = useCallback(
  () => {
    // 함수 내용
  },
  [의존성1, 의존성2] // 의존성 배열
);
```

### 작동 방식

1. **빈 의존성 배열**: `기본설정적용` 함수는 빈 의존성 배열(`[]`)을 사용하여 컴포넌트가 처음 나타날 때 한 번만 만들어지고, 이후에는 계속 같은 함수를 재사용합니다. 이 함수는 항상 같은 일을 수행하므로 다시 만들 필요가 없습니다.

2. **의존성이 있는 경우**: `색상변경` 함수는 `텍스트크기`에 의존합니다. 텍스트 크기가 바뀔 때마다 함수도 새로 만들어져야 최신 텍스트 크기 값을 제대로 사용할 수 있습니다. 만약 의존성 배열에 `텍스트크기`를 넣지 않으면, 함수는 처음에 기억한 이전 값을 계속 사용하게 됩니다.

이렇게 useCallback을 활용하면, 특히 자식 컴포넌트에 함수를 전달할 때 불필요한 재렌더링을 방지하여 앱 성능을 높일 수 있습니다.

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

## 함수 안정화와 불필요한 리렌더링 방지하기

```jsx
import React, { useState, useCallback } from 'react';

// 자식 컴포넌트 (React.memo로 최적화)
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

// 부모 컴포넌트
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 공부하기', completed: false },
    { id: 2, text: 'useCallback 이해하기', completed: false }
  ]);
  
  // useCallback을 사용하여 함수 메모이제이션
  const handleToggleOptimized = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // 빈 의존성 배열: 함수가 항상 같게 유지됨
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggleOptimized} // 최적화된 함수 사용
          />
        ))}
      </ul>
    </div>
  );
}
```

### 문제와 해결책

**문제:**
리액트에서 컴포넌트가 다시 그려질 때마다 내부 함수도 새로 만들어집니다. 자바스크립트에서는 함수 내용이 같아도 각각 다른 함수로 취급하기 때문에, 자식 컴포넌트에 props로 전달할 때 문제가 생깁니다.

```jsx
// 두 함수는 같은 일을 하지만 서로 다른 함수로 인식됩니다
const fn1 = () => console.log('안녕');
const fn2 = () => console.log('안녕');
console.log(fn1 === fn2); // false
```

이 때문에 `React.memo`로 최적화한 자식 컴포넌트도 불필요하게 리렌더링됩니다. 부모가 리렌더링될 때마다 자식에게 전달되는 함수의 참조값이 매번 바뀌기 때문입니다.

**해결책:**
`useCallback`은 의존성 배열이 바뀌지 않는 한 같은 함수를 계속 사용합니다.

```jsx
// 메모이제이션된 함수 - 컴포넌트가 리렌더링되어도 같은 참조 유지
const handleToggle = useCallback((id) => {
  // 함수 내용
}, []);
```

**작동 원리:**
1. 컴포넌트 첫 렌더링 시 함수가 생성되고 메모리에 저장됩니다.
2. 컴포넌트가 다시 렌더링되어도 저장된 함수를 재사용합니다.
3. 의존성 배열의 값이 변경된 경우에만 함수를 새로 생성합니다.

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

## 모범 사례와 흔한 실수

```jsx
function WarningExampleComponent() {
  const [count, setCount] = useState(0);
  
  // 1. 불필요한 사용 (과도한 최적화의 예)
  const simpleHandler = useCallback(() => {
    console.log('간단한 핸들러');
  }, []); // 단순한 함수에는 useCallback이 과도할 수 있음
  
  // 2. 의존성 배열 오류 (잘못된 사용)
  const wrongDependencies = useCallback(() => {
    console.log(`현재 카운트: ${count}`); // count 사용
  }, []); // 버그: count가 의존성에서 누락됨
  
  // 3. 올바른 사용 예제
  const correctExample = useCallback(() => {
    console.log(`현재 카운트: ${count}`);
    console.log(`사용자 이름: ${user.name}`);
  }, [count, user.name]); // 올바른 의존성: 사용하는 모든 값 포함
  
  // 4. 함수형 업데이트로 의존성 줄이기
  const incrementWithoutDeps = useCallback(() => {
    setCount(c => c + 1); // 이전 상태를 기반으로 업데이트
  }, []); // count가 의존성에 필요하지 않음
}
```

useCallback 사용 시 주요 가이드라인:

* **성능 측정 후 최적화하기**: React DevTools Profiler로 실제 성능 문제를 먼저 확인하세요.
* **의존성 배열 제대로 관리하기**: 함수 안에서 사용하는 모든 값을 의존성 배열에 포함시키세요.
* **함수형 업데이트 활용하기**: 이전 상태를 기반으로 업데이트하면 의존성 배열에서 해당 상태를 제거할 수 있습니다.

<br>

## 실전 사용 사례: 이벤트 핸들러와 API 호출

```jsx
import React, { useState, useCallback, useEffect } from 'react';

function ProductSearch({ categoryId }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // API 호출 함수를 useCallback으로 메모이제이션
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/products?category=${categoryId}&search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('상품을 불러오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, searchTerm]); // categoryId나 searchTerm이 변경될 때만 함수 재생성
  
  // 컴포넌트 마운트 시 또는 categoryId 변경 시 상품 불러오기
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // useCallback으로 메모이제이션된 함수를 의존성으로 사용
  
  return (
    <div>{/* UI 컴포넌트 */}</div>
  );
}
```

**실제 애플리케이션 적용 사례:**
- **API 호출**: 데이터를 불러오는 함수를 메모이제이션하여 불필요한 API 호출 방지
- **이벤트 핸들러**: 폼 제출, 버튼 클릭 등의 이벤트 핸들러 안정화
- **useEffect 의존성**: useEffect의 의존성 배열에 함수를 안전하게 포함

<br>

## useCallback 최적화 퀴즈!

```jsx
import React, { useState, useCallback } from 'react';

// 자식 컴포넌트 (React.memo로 최적화)
const Button = React.memo(({ onClick, label }) => {
  console.log(`${label} 버튼 렌더링됨`);
  return <button onClick={onClick}>{label}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  
  // 방법 1
  const incrementWithEmptyDeps = useCallback(() => {
    setCount(count + 1);
  }, []);
  
  // 방법 2
  const incrementWithDeps = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  // 방법 3
  const incrementWithFunctionalUpdate = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  
  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <p>카운트: {count}</p>
      <Button onClick={incrementWithDeps} label="증가" />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        테마 변경
      </button>
    </div>
  );
}
```

위 코드에는 세 가지 방법으로 구현된 카운트 증가 함수가 있습니다. 이 중에서 불필요한 리렌더링을 막으면서도 정확하게 작동하는 최적의 방법은 무엇일까요? 자신의 생각을 아래에 적어보세요.

<div class="quiz-wrap2">
    <label for="quiz-input-1">정답 입력 : </label>
    <textarea id="quiz-input-1" name="quiz-input-1" class="quiz-input" placeholder="최적의 방법과 그 이유를 자유롭게 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

정답: 방법 3

<br>

이 문제는 useCallback을 올바르게 사용하고 의존성 배열을 효과적으로 관리하는 방법을 이해하고 있는지 확인하는 문제입니다.

* **방법 1: 빈 의존성 배열 사용**  
<span class="txt">
빈 의존성 배열 `[]`을 사용하면 함수는 컴포넌트가 처음 마운트될 때 한 번만 생성됩니다. 하지만 함수 내부에서 참조하는 `count` 값이 업데이트되지 않는 문제가 있습니다. 이로 인해 버튼을 여러 번 클릭해도 카운터가 항상 1만 증가하는 버그가 발생합니다.
</span>

* **방법 2: count를 의존성 배열에 포함**  
<span class="txt">
`count`를 의존성 배열에 포함시키면 최신 `count` 값을 항상 참조할 수 있어 정확하게 작동합니다. 하지만 `count`가 변경될 때마다 함수가 새로 생성되기 때문에, `Button` 컴포넌트가 불필요하게 다시 렌더링됩니다. 이는 useCallback을 사용하는 성능 최적화 효과를 반감시킵니다.
</span>

* **방법 3: 함수형 업데이트 사용**  
<span class="txt">
함수형 업데이트 방식(`prevCount => prevCount + 1`)을 사용하면 함수 내부에서 `count` 값을 직접 참조하지 않고도 항상 최신 상태값을 기반으로 업데이트할 수 있습니다. 따라서 의존성 배열을 비워도 안전하게 작동하며, 컴포넌트가 리렌더링되어도 함수의 참조가 유지되어 `Button` 컴포넌트의 불필요한 리렌더링을 방지할 수 있습니다.
</span>

이처럼 useCallback과 함수형 업데이트를 함께 사용하면, 불필요한 리렌더링을 방지하면서도 항상 최신 상태를 기반으로 정확하게 동작하는 최적의 방법을 구현할 수 있습니다.
</details>

<br>

<div class="btn_wrap">
    <a href="/code/2023-11-08-password-eye/">[관련글] React useCallback 퀴즈 (5문제 + 해설)</a>
</div>
