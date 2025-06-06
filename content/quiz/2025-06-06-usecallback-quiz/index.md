---
title: >  
    React useCallback 퀴즈 (5문제 + 해설)

description: >  
    리액트 useCallback 훅의 실제 사용법을 5가지 최적화 문제로 마스터해보세요. 불필요한 리렌더링부터 무한 루프까지, 정답과 해설로 성능 최적화 기술을 배워보세요.

slug: 2025-06-06-usecallback-quiz
date: 2025-06-06 00:00:00+0000
lastmod: 2025-06-06 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-06-usecallback-quiz.webp

categories:
    - Quiz
tags:
    - React Hooks
    - useCallback
    - 성능 최적화
---
리액트에서 useCallback을 정확히 이해하고 활용하는 능력을 테스트하는 5가지 문제입니다. 각 문제에서 가장 적절한 답변을 선택하고, 그 이유를 함께 작성해보세요.

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

## 1. 불필요한 리렌더링 방지하기

```jsx
function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSearch = () => {
    onSearch(query);
  };
  
  return (
    <>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <MemoizedSearchButton onClick={handleSearch} />
    </>
  );
}

const MemoizedSearchButton = React.memo(({ onClick }) => {
  console.log('검색 버튼 렌더링');
  return <button onClick={onClick}>검색</button>;
});
```

**Q1. 위 코드에서 발생하는 문제점과 가장 적절한 해결책은 무엇인가요?**

A. 문제 없음, 코드가 이미 최적화되어 있다.<br>
B. handleSearch를 useCallback으로 감싸고 의존성 배열에 query와 onSearch를 추가한다.<br>
C. MemoizedSearchButton에 key 속성을 추가하여 강제로 리렌더링한다.<br>
D. handleSearch를 컴포넌트 외부로 이동시킨다.

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: B**

handleSearch 함수는 컴포넌트가 리렌더링될 때마다 새로 생성됩니다. 이로 인해 React.memo로 감싼 MemoizedSearchButton 컴포넌트가 불필요하게 다시 렌더링됩니다. React.memo는 props가 변경되지 않으면 리렌더링을 방지하는데, 매번 새로운 함수 참조가 전달되므로 최적화 효과가 사라집니다.

useCallback을 사용하면 이 문제를 해결할 수 있습니다.

```jsx
const handleSearch = useCallback(() => {
  onSearch(query);
}, [query, onSearch]);
```

이렇게 하면 query나 onSearch가 변경되지 않는 한 handleSearch 함수의 참조가 유지되어, MemoizedSearchButton이 불필요하게 리렌더링되는 것을 방지할 수 있습니다.
</details>

<br>

## 2. 의존성 배열 문제

```jsx
function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  
  const fetchUserData = useCallback(async () => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    setUserData(data);
  }, []); // 빈 의존성 배열
  
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  
  // 컴포넌트 나머지 부분
}
```

**Q2. 이 코드의 문제점과 올바른 해결책은 무엇인가요?**

A. 문제 없음, 코드가 이미 최적화되어 있다.<br>
B. useCallback 대신 useMemo를 사용해야 한다.<br>
C. fetchUserData의 의존성 배열에 userId를 추가해야 한다.<br>
D. useEffect의 의존성 배열에 userId를 직접 추가해야 한다.

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: C**

fetchUserData 함수는 내부에서 userId를 사용하지만, 의존성 배열에는 포함되어 있지 않습니다. 이로 인해 userId가 변경되어도 함수는 새로 생성되지 않고, 항상 처음 마운트될 때의 userId 값만 사용합니다. 따라서 다른 사용자 ID로 변경되어도 항상 첫 번째 사용자의 데이터만 가져오는 버그가 발생합니다.

올바른 해결책은 fetchUserData의 의존성 배열에 userId를 추가하는 것입니다:

```jsx
const fetchUserData = useCallback(async () => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  setUserData(data);
}, [userId]); // userId를 의존성 배열에 추가
```

이렇게 하면 userId가 변경될 때마다 fetchUserData 함수가 새로 생성되어 최신 userId 값을 사용하게 됩니다.
</details>

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

## 3. 카운터 업데이트 문제

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => {
    setCount(count + 1);
  }, []);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}
```

**Q3. 위 코드에서 발생하는 문제점과 적절한 해결책은 무엇인가요?**

A. 의존성 배열에 count를 추가한다<br>
B. 함수형 업데이트(prevCount => prevCount + 1)를 사용한다<br>
C. useCallback 대신 일반 함수를 사용한다<br>
D. useCallback 대신 useMemo를 사용한다

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: B**

현재 코드에서는 increment 함수가 빈 의존성 배열을 사용해 컴포넌트가 처음 마운트될 때의 count 값(0)만 계속 참조합니다. 이로 인해 버튼을 여러 번 클릭해도 count가 항상 1로만 증가하는 문제가 발생합니다.

함수형 업데이트를 사용하면 이 문제를 해결할 수 있습니다.

```jsx
const increment = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []);
```

함수형 업데이트 방식은 외부 count 값을 직접 참조하지 않고 리액트가 제공하는 최신 상태값을 기반으로 업데이트합니다. 따라서 의존성 배열을 비워도 항상 현재 count 값에서 1씩 정확하게 증가시킬 수 있습니다.

선택지 A(의존성 배열에 count 추가)도 문제를 해결할 수 있지만, count가 변경될 때마다 함수가 새로 생성되므로 useCallback의 메모이제이션 효과가 사라진다는 단점이 있습니다.
</details>

<br>

## 4. 무한 루프 문제

```jsx
function DataFetcher() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  
  const fetchData = useCallback(async () => {
    const response = await fetch(`/api/data?filter=${filter}`);
    const result = await response.json();
    setData(result);
  }, [filter]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="필터 입력"
      />
      <ul>
        {data.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

**Q4. 위 코드에서 발생할 수 있는 문제와 가장 적절한 해결책은 무엇인가요?**

A. useCallback을 제거하고 일반 함수 사용하기<br>
B. useEffect 의존성 배열에서 fetchData 제거하기<br>
C. useEffect에 디바운스(debounce) 로직 추가하기<br>
D. filter 상태 대신 useRef 사용하기

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: C**

현재 코드에서는 사용자가 입력할 때마다 다음과 같은 연쇄 반응이 일어납니다.
1. 사용자가 입력 → filter 상태 변경
2. filter 변경 → fetchData 함수 재생성
3. fetchData 재생성 → useEffect 트리거
4. API 호출 후 데이터 설정 → 컴포넌트 리렌더링

사용자가 빠르게 타이핑하면 모든 키 입력마다 API 호출이 발생하여 불필요한 네트워크 요청이 많아지고 성능이 저하됩니다.

디바운스 패턴을 적용하면 이 문제를 효과적으로 해결할 수 있습니다.

```jsx
useEffect(() => {
  const handler = setTimeout(() => {
    fetchData();
  }, 500); // 500ms 후에 fetchData 실행
  
  return () => {
    clearTimeout(handler); // 이전 타이머 취소
  };
}, [fetchData]);
```

이렇게 하면 사용자가 타이핑을 멈춘 후 일정 시간(500ms)이 지난 후에만 API 호출이 발생하므로, 불필요한 API 호출을 줄이고 성능을 개선할 수 있습니다.
</details>

<br>

## 5. 최적화 전략 평가

```jsx
function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({ name, email });
  }, [name, email]);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={handleNameChange} 
        placeholder="이름"
      />
      <input 
        type="email" 
        value={email} 
        onChange={handleEmailChange} 
        placeholder="이메일"
      />
      <button type="submit">제출</button>
    </form>
  );
}
```

**Q5. 위 코드에서 useCallback 사용에 대한 가장 적절한 평가는 무엇인가요?**

A. 모든 함수에 useCallback 사용이 적절하다<br>
B. handleNameChange와 handleEmailChange는 useCallback이 불필요하다<br>
C. handleSubmit에만 useCallback이 불필요하다<br>
D. 모든 함수에 useCallback 대신 useMemo를 사용해야 한다

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: B**

handleNameChange와 handleEmailChange 함수는 단순히 입력값을 상태에 저장하는 간단한 함수입니다. 이 함수들은 자식 컴포넌트에 props로 전달되지 않고 현재 컴포넌트 내부에서만 사용되므로 useCallback으로 메모이제이션할 필요가 없습니다.

이러한 경우 다음과 같이 인라인 함수를 사용하는 것이 더 간결하고 가독성이 좋습니다.

```jsx
<input 
  type="text" 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
  placeholder="이름"
/>
```

반면, handleSubmit 함수는 form 제출 시 사용되는 함수로, 실제 애플리케이션에서는 API 호출이나 데이터 검증 등 복잡한 로직이 포함될 수 있어 useCallback을 유지하는 것이 적절할 수 있습니다. 또한 이 함수는 name과 email 값에 의존하므로 의존성 배열에 이들을 포함시키는 것이 중요합니다.

과도한 최적화는 코드를 더 복잡하게 만들 수 있으므로, 실제로 성능 문제가 발생하는 경우에만 useCallback을 적용하는 것이 좋은 방법입니다.
</details>


<br>