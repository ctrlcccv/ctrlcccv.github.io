---
title: >  
    React의 useCallback으로 함수 최적화하기: 실전 가이드

description: >  
    React의 useCallback 훅을 마스터하여 함수를 메모이제이션하고 불필요한 리렌더링을 방지해보세요. 실제 사용 사례와 함께 앱 성능을 향상시키는 방법을 알아봅니다.

slug: 2025-06-06-react-usecallback
date: 2025-06-30 00:00:00+0000
lastmod: 2025-06-30 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-06-react-usecallback.webp

categories:
    - React
tags:
    - React Hooks
    - useCallback
    - 성능 최적화
---

리액트 컴포넌트가 불필요하게 다시 렌더링되어 앱이 느려지고 있나요?

리액트 개발을 하다 보면 컴포넌트가 렌더링될 때마다 함수가 새롭게 생성되어 성능 문제가 발생하는 경우가 많습니다. 특히 자식 컴포넌트에 함수를 props로 전달할 때 이런 문제는 더욱 두드러집니다. React의 useCallback 훅은 이런 문제를 효과적으로 해결할 수 있습니다.

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

  // 2. 의존성 있는 경우 - 의존성이 변경될 때만 함수 재생성
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

<br>

### useCallback이란?
useCallback은 함수를 "기억"해두는 React의 특별한 기능입니다. 컴포넌트가 리렌더링될 때마다 내부 함수가 새로 생성되는 것을 방지하고, 특정 의존성이 변경될 때만 함수를 새로 만들어 성능을 최적화합니다.

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
1. **빈 의존성 배열**: 컴포넌트가 처음 렌더링될 때 한 번만 함수를 생성하고 이후에는 같은 함수 참조를 유지합니다.
2. **의존성이 있는 경우**: 의존성 값이 변경될 때만 함수를 새로 생성합니다.

<br>

## 함수 안정화와 불필요한 리렌더링 방지하기

```jsx
import React, { useState, useCallback } from 'react';

// 자식 컴포넌트 (React.memo로 최적화)
const TodoItem = React.memo(({ todo, onToggle }) => {
  console.log(`TodoItem 렌더링: ${todo.text}`);
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
  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // 의존성 없음 - 함수가 항상 같게 유지됨
  
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

리액트에서 컴포넌트가 렌더링될 때마다 내부 함수는 새로운 참조를 갖게 됩니다. JavaScript에서 함수는 내용이 아닌 참조로 비교되기 때문입니다. useCallback으로 함수를 감싸면 의존성이 변경되지 않는 한 동일한 함수 참조를 유지하여 React.memo로 최적화된 자식 컴포넌트의 불필요한 리렌더링을 방지할 수 있습니다.

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
  
  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  
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

## 모범 사례와 흔한 실수

```jsx
function WarningExampleComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '홍길동' });
  
  // 1. 불필요한 사용 (과도한 최적화의 예)
  const simpleHandler = useCallback(() => {
    console.log('간단한 핸들러');
  }, []); // 단순한 함수에는 useCallback이 과도할 수 있음
  
  // 2. 의존성 배열 오류 (잘못된 사용)
  const wrongDependencies = useCallback(() => {
    console.log(`현재 카운트: ${count}`); // count 사용
    console.log(`사용자 이름: ${user.name}`); // user.name 사용
  }, []); // 버그: count와 user.name이 의존성에서 누락됨
  
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

* **성능 측정 후 최적화**: React DevTools Profiler로 실제 성능 병목을 먼저 파악하세요.
* **단순한 함수는 메모이제이션 생략**: 간단한 함수에는 useCallback의 오버헤드가 더 클 수 있습니다.
* **의존성 배열 철저히 관리**: 함수 내에서 사용하는 모든 값을 의존성 배열에 포함시키세요.
* **함수형 업데이트 활용**: 이전 상태를 기반으로 업데이트하면 의존성 배열에서 해당 상태를 제거할 수 있습니다.

<br>

## 결론

useCallback 훅은 React의 성능 최적화를 위한 강력한 도구입니다. 함수 참조를 안정화하여 불필요한 리렌더링을 방지하고, 특히 메모이제이션된 자식 컴포넌트와 함께 사용할 때 그 효과가 극대화됩니다. 

최대한의 효과를 얻으려면 이벤트 핸들러, API 호출 함수, 그리고 자식 컴포넌트에 전달되는 콜백 함수에 useCallback을 집중적으로 사용하세요. 이러한 기법을 활용하면 애플리케이션의 복잡성이 증가하더라도 반응성과 성능을 유지할 수 있습니다.

<br>

<div class="btn_wrap">
    <a href="https://react.dev/reference/react/useCallback">React 공식 문서: useCallback</a>
    <a href="/code/2025-06-04-react-usememo/">[관련글] React의 useMemo로 계산 최적화하기</a>
</div>
