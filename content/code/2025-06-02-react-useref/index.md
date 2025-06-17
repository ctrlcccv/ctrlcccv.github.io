---
title: >  
    React - useRef 훅으로 DOM 직접 제어하고 값 유지하기

description: >  
    React의 useRef 훅을 활용하여 DOM 요소에 직접 접근하고 렌더링과 무관하게 값을 유지하는 방법을 알아봅니다. 실무에서 자주 사용되는 예제와 함께 useRef의 모든 것을 정리했습니다.

slug: 2025-06-02-react-useref
date: 2025-06-02 00:00:00+0000
lastmod: 2025-06-02 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-02-react-useref.webp

alternates:
  - title: "React - useRef 훅으로 DOM 직접 제어하고 값 유지하기"
    href: "https://ctrlcccv.github.io/code/2025-06-02-react-useref/"
    hreflang: "ko"
  - title: "React useRef: How to Access DOM Elements Directly" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-03-react-useref/"
    hreflang: "en"

  
categories:
    - React
tags:
    - React Hooks
    - useRef
    - DOM 제어
---

웹 앱에서 특정 요소에 포커스를 주거나 스크롤 위치를 조정할 때마다 복잡한 코드를 작성해야 해서 불편했던 적이 있으신가요? 

React는 가상 DOM을 통해 UI를 효율적으로 관리하지만, 때로는 실제 DOM 요소에 직접 접근하거나 컴포넌트가 리렌더링되어도 값을 그대로 유지해야 할 때가 있습니다. 이런 상황에서 useRef 훅은 아주 유용한 해결책이 됩니다.

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

## useRef의 기본 개념

```jsx
import React, { useRef } from 'react';

function 입력폼() {
  // useRef 생성
  const 입력칸Ref = useRef(null);
  
  const 포커스하기 = () => {
    // useRef로 DOM 요소에 직접 접근
    입력칸Ref.current.focus();
  };

  return (
    <div>
      <input ref={입력칸Ref} type="text" />
      <button onClick={포커스하기}>입력칸 포커스</button>
    </div>
  );
}
```

### useRef는 무엇인가요? 
useRef는 DOM 요소를 직접 제어할 수 있게 해주는 도구입니다. 일상생활에 비유하자면, TV를 보면서 채널을 바꾸고 싶을 때 리모컨을 사용하는 것과 같습니다. React에서는 이 '리모컨'(useRef)을 사용해 원하는 요소를 찾아 제어할 수 있습니다.

<br>

### 어떻게 사용하나요? 
1. 먼저 `useRef()`로 리모컨을 만듭니다. (예: `const 입력칸Ref = useRef(null)`)
2. DOM 요소에 이 리모컨을 연결합니다. (예: `<input ref={입력칸Ref} />`)
3. 이제 `입력칸Ref.current`로 언제든지 그 요소를 제어할 수 있습니다.

<br>

### 실제 사용 예시  
위 예제에서는 버튼을 클릭하면 입력칸에 자동으로 커서가 위치하도록 만들었습니다. 마치 리모컨의 버튼을 눌러 TV의 특정 기능을 실행하는 것처럼, `입력칸Ref.current.focus()`는 입력칸에 커서를 위치시키라는 명령을 내리는 것입니다.

<br>

## useRef의 특별한 점

```jsx
import React, { useRef, useState, useEffect } from 'react';

function 렌더링카운터() {
  // 일반 변수 - 리렌더링될 때마다 초기화됨
  let 일반변수 = 0;
  
  // useState - 값 변경 시 리렌더링 발생
  const [상태값, 상태변경] = useState(0);
  
  // useRef - 리렌더링 시에도 값 유지, 값 변경해도 리렌더링 하지 않음
  const 렌더링횟수 = useRef(0);
  
  useEffect(() => {
    일반변수++;
    렌더링횟수.current++;
    console.log(`일반변수: ${일반변수}, 렌더링횟수: ${렌더링횟수.current}`);
  });
  
  return (
    <div>
      <p>렌더링 횟수: {렌더링횟수.current}</p>
      <p>상태값: {상태값}</p>
      <button onClick={() => 상태변경(상태값 + 1)}>상태 증가</button>
    </div>
  );
}
```

* **값 유지하기**  
<span class="txt">
일반 변수와 달리, useRef로 생성한 객체의 .current 값은 컴포넌트가 리렌더링되어도 초기화되지 않습니다.
위 예제에서 버튼을 클릭하면 컴포넌트가 리렌더링되고, 일반변수는 다시 0이 되지만 렌더링횟수.current는 계속 증가합니다.
</span>

* **화면 업데이트 없음**  
<span class="txt">
useState와 달리 useRef의 .current 값이 변경되어도 컴포넌트가 리렌더링되지 않습니다.
이는 성능 최적화에 도움이 되지만, 값이 바뀌어도 화면에 바로 반영되지 않는다는 점을 주의해야 합니다.
</span>

* **가상 DOM과의 관계**  
<span class="txt">
useRef를 통한 DOM 제어는 React의 가상 DOM 시스템을 우회합니다.
이것이 바로 useRef 값이 변경되어도 리렌더링이 발생하지 않는 이유입니다.
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

## 실무에서의 useRef 활용 예시

### 1. 무한 스크롤 구현하기

```jsx
function ProductList() {
  const lastItemRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // IntersectionObserver로 마지막 아이템 감지
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 마지막 아이템이 화면에 보이면 다음 페이지 로드
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
          {/* 마지막 아이템에 ref 연결 */}
          <div ref={index === products.length - 1 ? lastItemRef : null}>
            {product.name}
          </div>
        </div>
      ))}
    </div>
  );
}
```

* **무한 스크롤 효과적으로 구현하기**  
<span class="txt">
useRef와 IntersectionObserver를 함께 사용하면 무한 스크롤을 쉽게 구현할 수 있습니다.
마지막 상품이 화면에 보이면 자동으로 다음 페이지를 불러옵니다.
</span>

<br>

### 2. 비디오 플레이어 제어하기

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current) {
      // 비디오 요소의 내장 메서드로 재생/정지 제어
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
        {isPlaying ? '일시정지' : '재생'}
      </button>
    </div>
  );
}
```

* **미디어 요소 직접 제어하기**  
<span class="txt">
비디오나 오디오 같은 미디어 요소를 useRef로 참조하면 play(), pause() 같은 내장 메서드를 직접 호출할 수 있습니다.
</span>

<br>

## useState vs useRef - 언제 무엇을 써야 할까?

```jsx
function StateComparisonComponent() {
  // 화면에 보이는 값 - useState 사용
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 화면에 보이지 않는 내부 값 - useRef 사용
  const submitCountRef = useRef(0);
  const timerRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    submitCountRef.current += 1;
    
    // 3초 후 알림 숨기기
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
      <button type="submit">제출</button>
      {isSubmitted && <p>제출되었습니다!</p>}
    </form>
  );
}
```

* **선택 기준**  
<span class="txt">
가장 중요한 질문은 "이 값이 바뀔 때 화면을 다시 그려야 하나요?"입니다.
화면에 직접 표시되는 값(inputValue, isSubmitted)은 useState를 씁니다.
내부 로직에만 필요한 값(submitCount, timerID)은 useRef를 쓰는 것이 효율적입니다.
</span>

* **렌더링 최적화**  
<span class="txt">
불필요한 리렌더링을 줄이려면 화면에 바로 반영할 필요가 없는 값은 useRef로 관리하는 것이 좋습니다.
특히 타이머ID나 이전 상태값 저장 같은 경우에는 useRef가 더 적합합니다.
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

## useRef 사용 시 주의사항

```jsx
function CautionComponent() {
  const refValue = useRef(0);
  const [stateValue, setStateValue] = useState(0);
  
  // 잘못된 사용: 렌더링 중에 .current 값 변경
  refValue.current += 1; // 이렇게 하면 안 됩니다!
  
  const handleIncrement = () => {
    // 올바른 사용: 이벤트 핸들러 안에서 .current 값 변경
    refValue.current += 1;
    console.log(refValue.current);
    
    // 값을 화면에 표시하려면 상태를 업데이트해야 함
    setStateValue(refValue.current);
  };
  
  return (
    <div>
      <p>참조값: {refValue.current}</p>
      <p>상태값: {stateValue}</p>
      <button onClick={handleIncrement}>증가</button>
    </div>
  );
}
```

* **렌더링 중 .current 값 바꾸지 않기**  
<span class="txt">
컴포넌트가 렌더링되는 중에 직접 .current 값을 바꾸면 예상치 못한 문제가 생길 수 있습니다.
.current 값은 이벤트 핸들러나 useEffect 안에서만 바꿔야 합니다.
</span>

* **화면 업데이트 주의**  
<span class="txt">
useRef 값이 변경되어도 화면이 자동으로 업데이트되지 않습니다.
useRef 값을 화면에 반영하려면 useState와 함께 사용해야 합니다.
</span>

* **DOM 요소 존재 확인하기**  
<span class="txt">
DOM 요소에 접근하기 전에 그 요소가 실제로 있는지 확인해야 합니다.
항상 if (refValue.current) { /* 로직 수행 */ } 형태로 안전하게 접근하세요.
</span>

<br>

## useRef 핵심 개념 퀴즈!

```javascript
import React, { useState, useRef, useEffect } from 'react';

function CounterComponent() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);
  const countButtonRef = useRef(null);
  
  const handleStateClick = () => {
    setCount(count + 1);
  };
  
  const handleRefClick = () => {
    refCount.current += 1;
    console.log("refCount:", refCount.current);
  };
  
  useEffect(() => {
    console.log("컴포넌트 렌더링됨");
  });
  
  return (
    <div>
      <p>State 카운트: {count}</p>
      <p>Ref 카운트: {refCount.current}</p>
      <button onClick={handleStateClick}>State 증가</button>
      <button ref={countButtonRef} onClick={handleRefClick}>Ref 증가</button>
    </div>
  );
}
```

위 코드를 살펴보고 아래 질문에 답해보세요.  

'Ref 증가' 버튼을 5번 클릭했을 때, 화면에 보이는 "Ref 카운트" 값은 얼마일까요?

<div class="quiz-wrap">
  <span>정답 입력 : <input type="text" class="quiz-input"></span>
</div>

<details>
<summary>정답 확인하기</summary>


정답: 0  

<br>

이 문제는 useRef의 가장 중요한 특성을 이해하고 있는지 확인하는 문제입니다.

'Ref 증가' 버튼을 클릭하면 내부적으로 refCount.current 값은 5까지 증가하지만, 화면에는 여전히 초기값인 0이 표시됩니다. 이것이 useRef의 핵심 특성을 보여주는 부분입니다.

1. **값이 변해도 화면이 갱신되지 않습니다.**
<span class="txt">
useRef의 .current 값이 변경되어도 컴포넌트는 다시 렌더링되지 않습니다. 따라서 console.log에는 증가된 값이 출력되지만, 화면에는 반영되지 않습니다.
</span>

2. **DOM 업데이트와의 관계**
<span class="txt">
React의 가상 DOM 시스템은 state가 변경될 때만 화면을 업데이트합니다. useRef는 이 메커니즘 밖에서 작동하므로, 값이 변경되어도 화면에 자동으로 반영되지 않습니다.
</span>

</details>

<br>