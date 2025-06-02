---
title: >  
    React - 예제로 쉽게 이해하는 useState와 함수형 업데이트

description: >  
    React의 useState 훅을 처음 접하는 초보자도 쉽게 이해할 수 있도록 개념부터 실전 활용까지 자세히 설명합니다. 다양한 예제와 함께 상태 관리의 기초를 배워보세요.

slug: 2025-05-18-react-usestate
date: 2025-05-18 00:00:00+0000
lastmod: 2025-05-18 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-18-react-usestate.webp

categories:
    - React
tags:
    - React Hooks
    - 상태 관리
    - 함수형 컴포넌트
---

리액트로 개발할 때 버튼을 클릭하거나 입력값이 바뀔 때마다 화면을 어떻게 새로 그려야 할지 고민해보신 적 있으신가요?

웹 개발을 하다 보면 사용자의 입력이나 버튼 클릭, API 호출 등으로 데이터가 변경되는 상황을 자주 마주하게 됩니다. 이런 변경 사항을 화면에 효과적으로 반영하는 것이 리액트의 핵심인데, 이때 필요한 것이 바로 useState 훅입니다. 마치 메모장에 숫자를 적어두고 필요할 때 확인하거나 바꾸는 것처럼 간단하게 상태를 관리할 수 있습니다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8535540836842352" crossorigin="anonymous"></script>

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

## useState의 기본 사용법

```jsx
import React, { useState } from 'react';

function Counter() {
  // count: 현재 상태값, setCount: 상태를 변경하는 함수
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    
  );
}
```

* **useState 훅 불러오기**  
<span class="txt">리액트 패키지에서 useState를 불러와 사용합니다. 모든 훅은 use로 시작하는 것이 리액트의 규칙입니다.</span>

* **초기값 설정**  
<span class="txt">useState(0)에서 0은 count의 초기값입니다. 숫자뿐만 아니라 문자열, 배열, 객체 등 어떤 타입의 값이든 초기값으로 사용할 수 있습니다.</span>

* **상태값과 변경 함수**  
<span class="txt">배열 구조 분해 할당을 통해 [count, setCount]를 얻습니다. count는 현재 상태값이고, setCount는 이 값을 변경할 수 있는 함수입니다.</span>

* **이벤트 핸들링**  
<span class="txt">버튼을 클릭하면 setCount(count + 1)이 실행되어 count 값이 1 증가하고, 리액트는 자동으로 화면을 다시 
렌더링합니다.</span>

<br>

## 다양한 타입의 상태 관리하기

### 문자열 상태 관리
```jsx
function NameInput() {
  const [이름, 이름변경] = useState('');

  return (
    <div>
      <input
        type="text"
        value={이름}
        onChange={(e) => 이름변경(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>안녕하세요, {이름 || '익명'}님!</p>
    
  );
}
```

💡 **팁**: input 요소의 value 속성을 useState와 연결하면 제어 컴포넌트(Controlled Component)가 됩니다. 이를 통해 입력값을 실시간으로 관리하고 검증할 수 있습니다.

<br>

### 객체 상태 관리
```jsx
function UserForm() {
  const [사용자, 사용자변경] = useState({
    이름: '',
    나이: 20,
    취미: ''
  });

  const 정보수정 = (필드, 값) => {
    // 객체 업데이트 시 스프레드 연산자로 기존 값 복사 후 변경
    사용자변경({...사용자, [필드]: 값});
  };

  return (
    <div>
      <input
        value={사용자.이름}
        onChange={(e) => 정보수정('이름', e.target.value)}
        placeholder="이름"
      />
      <input
        type="number"
        value={사용자.나이}
        onChange={(e) => 정보수정('나이', Number(e.target.value))}
        placeholder="나이"
      />
      <select 
        value={사용자.취미} 
        onChange={(e) => 정보수정('취미', e.target.value)}
      >
        <option value="">취미 선택</option>
        <option value="reading">독서</option>
        <option value="sports">운동</option>
        <option value="coding">코딩</option>
      </select>
      
      <p>이름: {사용자.이름}, 나이: {사용자.나이}, 취미: {사용자.취미 || '없음'}</p>
    
  );
}
```

📝 **참고**: 객체 상태 업데이트 시 반드시 새 객체를 생성해야 합니다. `사용자변경({...사용자, 이름: '홍길동'})`처럼 스프레드 연산자를 사용하면 기존 객체의 모든 속성을 복사한 후 특정 속성만 변경할 수 있습니다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8535540836842352" crossorigin="anonymous"></script>

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

## 이전 상태를 기반으로 업데이트하기 - 중요!

```jsx
function SafeCounter() {
  const [count, setCount] = useState(0);

  // 함수를 전달하는 방식 (안전한 업데이트)
  const 한번증가 = () => {
    setCount(이전값 => 이전값 + 1);
  };

  // 연속으로 세 번 증가
  const 세번증가 = () => {
    // 각 호출마다 이전 상태를 기반으로 업데이트
    setCount(이전값 => 이전값 + 1);
    setCount(이전값 => 이전값 + 1);
    setCount(이전값 => 이전값 + 1);
  };

  // 🚫 이렇게 하면 안 됩니다! - 잘못된 방식
  const 잘못된증가 = () => {
    // 세 번의 호출이 모두 같은 count 값을 참조합니다
    setCount(count + 1); // count가 0이라면
    setCount(count + 1); // 여전히 0에 1을 더합니다
    setCount(count + 1); // 여전히 0에 1을 더합니다
    // 결과: 예상은 count가 3 증가하는 것이지만, 실제로는 1만 증가합니다!
  };

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={한번증가}>1 증가</button>
      <button onClick={세번증가}>3 증가 (올바른 방식)</button>
      <button onClick={잘못된증가}>3 증가 (잘못된 방식)</button>
    
  );
}
```

* **함수형 업데이트의 필요성**  
<span class="txt">리액트에서 상태 업데이트는 항상 함수형 업데이트 방식을 사용하는 것이 권장됩니다. 이는 `setState(이전상태 => 새로운상태)` 형태로 작성합니다.</span>

* **함수형 업데이트**  
<span class="txt">setCount(이전값 => 이전값 + 1)와 같이 함수를 전달하면, React는 자동으로 이전 상태값(이전값)을 함수의 매개변수로 제공합니다.</span>

* **일괄 업데이트의 안전성**  
<span class="txt">리액트는 성능 최적화를 위해 여러 상태 업데이트를 한 번에 처리하는데, 함수형 업데이트를 사용하면 각 업데이트가 항상 최신 상태를 기반으로 실행됩니다.</span>

* **비동기 처리의 신뢰성**  
<span class="txt">비동기 작업 중 상태 업데이트가 필요할 때도 함수형 업데이트를 사용하면 항상 최신 상태를 기반으로 업데이트할 수 있습니다.</span>

💡 **핵심 팁**: 항상 함수형 업데이트 방식을 사용하는 습관을 들이세요. 단순한 상황에서는 차이가 없어 보일 수 있지만, 복잡한 상태 업데이트나 비동기 처리에서 예측할 수 없는 버그를 방지할 수 있습니다.

<br>

## useState의 고급 활용법

### 초기값을 함수로 전달하기
```jsx
function ExpensiveInitialState() {
  // 복잡한 계산이 필요한 초기값은 함수로 전달
  const [결과, 결과변경] = useState(() => {
    // 이 코드는 컴포넌트 첫 렌더링 시에만 실행됨
    console.log('복잡한 초기값 계산 중...');
    return 복잡한계산();
  });

  // 복잡한 계산을 시뮬레이션하는 함수
  function 복잡한계산() {
    let 결과 = 0;
    for (let i = 0; i < 1000; i++) {
      결과 += i;
    }
    return 결과;
  }

  return (
    <div>
      <p>계산 결과: {결과}</p>
      <button onClick={() => 결과변경(이전값 => 이전값 + 1)}>증가</button>
    
  );
}
```

💡 **팁**: 초기값 계산이 복잡하거나 시간이 오래 걸릴 때, 함수를 전달하면 첫 렌더링 시에만 계산되고 이후 렌더링에서는 건너뛰어 성능을 최적화할 수 있습니다.

<br>

## useState 사용 시 주의사항

### 상태 업데이트는 비동기적
```jsx
function AsyncUpdate() {
  const [카운트, 카운트변경] = useState(0);

  const 버튼클릭 = () => {
    카운트변경(이전값 => 이전값 + 1);
    // 여기서 console.log(카운트)를 실행하면 아직 업데이트되지 않은 값이 출력됨
    console.log("업데이트 직후 (아직 반영 안됨):", 카운트);
    
    // setTimeout을 사용해 다음 렌더링 후 로그 확인
    setTimeout(() => {
      console.log("다음 렌더링 후:", 카운트);
    }, 0);
  };

  return (
    <div>
      <p>카운트: {카운트}</p>
      <button onClick={버튼클릭}>증가</button>
    
  );
}
```

* **상태 업데이트의 비동기성**  
<span class="txt">카운트변경 함수를 호출해도 카운트 값은 즉시 변경되지 않습니다. React는 효율성을 위해 여러 상태 업데이트를 한꺼번에 처리합니다.</span>

* **최신 상태 확인**  
<span class="txt">업데이트된 상태는 다음 렌더링에서 반영됩니다. 함수형 업데이트를 사용하면 항상 최신 상태를 기반으로 업데이트할 수 있습니다.</span>

<br>

### 여러 상태 변수의 관리
```jsx
function TodoApp() {
  // 관련 상태를 개별적으로 관리
  const [할일목록, 할일목록변경] = useState([]);
  const [입력값, 입력값변경] = useState('');

  const 할일추가 = () => {
    if (입력값.trim()) {
      할일목록변경(이전목록 => [...이전목록, 입력값]);
      입력값변경(''); // 입력 필드 초기화
    }                  
  };

  return (
    <div>
      <input
        value={입력값}
        onChange={(e) => 입력값변경(e.target.value)}
        placeholder="할 일 입력"
      />
      <button onClick={할일추가}>추가</button>
      <ul>
        {할일목록.map((할일, 인덱스) => (
          <li key={인덱스}>{할일}</li>
        ))}
      </ul>
    
  );
}
```

💡 **팁**: 상태가 서로 관련이 없으면 여러 개의 useState를 사용하는 것이 좋습니다. 하지만 상태가 서로 밀접하게 연관되어 있다면 useReducer 훅을 고려해보세요.

<br>

## 결론

이번 포스트에서는 React의 useState 훅에 대해 기본 개념부터 고급 활용법까지 알아보았습니다. useState는 단순한 카운터부터 복잡한 폼 상태 관리까지 다양한 상황에서 활용할 수 있는 리액트의 핵심 도구입니다.

**가장 중요한 것은 함수형 업데이트 패턴의 사용입니다.** `setState(이전값 => 새로운값)` 형태로 작성하는 함수형 업데이트는 더 안전하고 예측 가능한 방식으로 상태를 업데이트합니다. 특히 다음과 같은 상황에서는 필수적으로 사용해야 합니다:

1. 연속적인 여러 상태 업데이트가 필요할 때
2. 비동기 함수(setTimeout, Promise, API 호출) 내에서 상태를 업데이트할 때
3. 이전 상태를 기반으로 계산이 필요한 업데이트를 할 때

이 패턴을 처음부터 일관되게 사용하는 습관을 들이면, 나중에 더 복잡한 상태 관리 로직에서도 예상치 못한 버그를 방지할 수 있습니다.

useState에 대해 더 알고 싶은 내용이 있거나 실제 프로젝트에 적용하며 어려움이 있으셨다면 댓글로 남겨주세요! 함께 고민하고 해결책을 찾아볼 수 있을 것입니다.

