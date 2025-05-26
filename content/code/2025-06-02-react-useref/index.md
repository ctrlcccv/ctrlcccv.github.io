---
title: >  
    React - useRef 훅으로 DOM 직접 제어하고 값 유지하기

description: >  
    React의 useRef 훅을 활용하여 DOM 요소에 직접 접근하고 렌더링과 무관하게 값을 유지하는 방법을 알아봅니다. 실무에서 자주 사용되는 예제와 함께 useRef의 모든 것을 정리했습니다.

slug: 2025-06-02-react-useref
date: 2025-06-02 00:00:00+0000
lastmod: 2025-06-02 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-02-react-useref.webp

categories:
    - React
tags:
    - React Hooks
    - useRef
    - DOM 제어
---

웹 앱에서 특정 요소에 포커스를 주거나 스크롤 위치를 조정할 때마다 복잡한 코드를 작성해야 해서 불편했던 적이 있으신가요?

React는 가상 DOM을 통해 UI를 효율적으로 관리하는 장점이 있지만, 때로는 실제 DOM 요소에 직접 접근해야 할 때가 있습니다. 또한 컴포넌트가 리렌더링되어도 값을 그대로 유지해야 하는 경우도 있습니다. 이런 상황에서 useRef 훅은 아주 유용한 해결책이 됩니다.

<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

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
  
  // useRef - 리렌더링 시에도 값 유지, 값 변경해도 리렌더링 안 함
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

<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## 실무에서의 useRef 활용 예시

### 1. 무한 스크롤 구현하기

```jsx
function 상품목록() {
  const 마지막아이템Ref = useRef(null);
  const [상품들, 상품설정] = useState([]);
  const [페이지, 페이지설정] = useState(1);

  useEffect(() => {
    const 관찰자 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // 마지막 아이템이 화면에 보이면 다음 페이지 로드
        페이지설정(이전페이지 => 이전페이지 + 1);
      }
    });
    
    if (마지막아이템Ref.current) {
      관찰자.observe(마지막아이템Ref.current);
    }
    
    return () => 관찰자.disconnect();
  }, [상품들]);

  return (
    <div>
      {상품들.map((상품, 인덱스) => (
        <div key={상품.id}>
          {/* 마지막 아이템에 ref 연결 */}
          <div ref={인덱스 === 상품들.length - 1 ? 마지막아이템Ref : null}>
            {상품.이름}
          </div>
        </div>
      ))}
    </div>
  );
}
```

* **무한 스크롤 효과적으로 구현하기**  
<span class="txt">
useRef와 IntersectionObserver를 함께 쓰면 사용자가 페이지 아래쪽까지 스크롤했을 때 자동으로 새 데이터를 불러오는 무한 스크롤을 쉽게 만들 수 있습니다.
마지막 상품이 화면에 보이는지 감지해서 자동으로 다음 페이지를 불러옵니다.
</span>

<br>

### 2. 비디오 플레이어 제어하기

```jsx
function 비디오플레이어() {
  const 비디오Ref = useRef(null);
  const [재생중, 재생중설정] = useState(false);
  
  const 재생토글 = () => {
    if (비디오Ref.current) {
      if (재생중) {
        비디오Ref.current.pause();
      } else {
        비디오Ref.current.play();
      }
      재생중설정(!재생중);
    }
  };
  
  return (
    <div className="비디오-컨테이너">
      <video 
        ref={비디오Ref} 
        src="/비디오경로.mp4"
        onEnded={() => 재생중설정(false)}
      />
      <button onClick={재생토글}>
        {재생중 ? '일시정지' : '재생'}
      </button>
    </div>
  );
}
```

* **미디어 요소 직접 제어하기**  
<span class="txt">
비디오나 오디오 같은 미디어 요소를 useRef로 참조하면 play(), pause() 같은 내장 메서드를 직접 호출할 수 있습니다.
이렇게 하면 미디어 플레이어의 다양한 기능을 React 앱에 쉽게 통합할 수 있습니다.
</span>

<br>

## useState vs useRef - 언제 무엇을 써야 할까?

```jsx
function 상태비교컴포넌트() {
  // 화면에 보이는 값 - useState 사용
  const [입력값, 입력값설정] = useState("");
  const [제출됨, 제출됨설정] = useState(false);
  
  // 화면에 보이지 않는 내부 값 - useRef 사용
  const 제출횟수Ref = useRef(0);
  const 타이머Ref = useRef(null);
  
  const 제출처리 = (e) => {
    e.preventDefault();
    제출됨설정(true);
    제출횟수Ref.current += 1;
    
    // 3초 후 알림 숨기기
    clearTimeout(타이머Ref.current);
    타이머Ref.current = setTimeout(() => {
      제출됨설정(false);
    }, 3000);
  };
  
  return (
    <form onSubmit={제출처리}>
      <input 
        value={입력값}
        onChange={(e) => 입력값설정(e.target.value)}
      />
      <button type="submit">제출</button>
      {제출됨 && <p>제출되었습니다!</p>}
    </form>
  );
}
```

* **선택 기준**  
<span class="txt">
가장 중요한 질문은 "이 값이 바뀔 때 화면을 다시 그려야 하나요?"입니다.
화면에 직접 표시되는 값(입력값, 제출됨)은 useState를 씁니다.
내부 로직에만 필요한 값(제출횟수, 타이머ID)은 useRef를 쓰는 것이 효율적입니다.
</span>

* **렌더링 최적화**  
<span class="txt">
불필요한 리렌더링을 줄이려면 화면에 바로 반영할 필요가 없는 값은 useRef로 관리하는 것이 좋습니다.
특히 타이머ID나 이전 상태값 저장 같은 경우에는 useRef가 더 적합합니다.
</span>

<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## useRef 사용 시 주의사항

```jsx
function 주의사항컴포넌트() {
  const 참조값 = useRef(0);
  const [상태값, 상태값설정] = useState(0);
  
  // 잘못된 사용: 렌더링 중에 .current 값 변경
  참조값.current += 1; // 이렇게 하면 안 됩니다!
  
  const 증가처리 = () => {
    // 올바른 사용: 이벤트 핸들러 안에서 .current 값 변경
    참조값.current += 1;
    console.log(참조값.current);
    
    // 값을 화면에 표시하려면 상태를 업데이트해야 함
    상태값설정(참조값.current);
  };
  
  return (
    <div>
      <p>참조값: {참조값.current}</p>
      <p>상태값: {상태값}</p>
      <button onClick={증가처리}>증가</button>
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
항상 if (참조.current) { /* 로직 수행 */ } 형태로 안전하게 접근하세요.
</span>

<br>

## 결론

useRef는 React 애플리케이션에서 DOM을 직접 제어하고 리렌더링 없이 값을 유지해야 할 때 유용한 도구입니다.가상 DOM을 우회하여 작동하기 때문에 렌더링 성능에 영향을 주지 않으면서 필요한 작업을 수행할 수 있습니다.

사용자에게 보여지는 값은 useState로, 내부 로직에만 필요한 값은 useRef로 관리하는 패턴을 기억하세요. 이렇게 하면 앱의 성능을 최적화하면서도 필요한 기능을 모두 구현할 수 있습니다.

useRef를 활용한 여러분만의 특별한 방법이나 사례가 있다면 댓글로 알려주세요! 함께 더 좋은 React 개발 방법을 찾아봅시다.

<br>