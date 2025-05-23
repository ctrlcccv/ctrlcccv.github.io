---
title: >  
    React - useEffect 가이드 및 실전 예제

description: >  
    React useEffect 가이드 및 실전 예제입니다. 의존성 배열을 통한 실행 시점 제어와 클린업 함수의 활용법까지, 실제 개발에 바로 적용 가능한 예제와 함께 알아봅니다.

slug: 2024-03-25-useEffect
date: 2024-03-25 00:00:00+0000
lastmod: 2025-05-23 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-25-useEffect.webp

categories:
    - React
tags:
    - React Hooks
    - useEffect
    - 사이드 이펙트
    - 클린업 함수
---
웹 개발을 하다 보면 페이지가 처음 로드된 후에 특정 작업을 실행해야 할 때가 있지 않나요?

React로 컴포넌트를 개발할 때 화면이 그려진 후에 추가 작업을 실행해야 하는 경우가 자주 있습니다. 예를 들어 서버에서 데이터를 가져오거나, 이벤트 리스너를 등록하거나, 타이머를 설정하는 등의 작업을 페이지 로드 이후에 실행해야 할 때가 많습니다. 이런 작업들을 처리할 수 있게 해주는 것이 바로 React의 useEffect 훅입니다. 이번 글에서는 누구나 쉽게 이해할 수 있도록 useEffect의 기본 개념부터 실제 활용법까지 자세히 알아보겠습니다.  

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


## useEffect 기본 개념

useEffect는 React 컴포넌트에서 "부수 효과"를 처리하기 위한 훅입니다. 일상생활에 비유하자면, 방에 들어간 후에 불을 켜거나, 카페에 도착한 후 음료를 주문하는 것과 같습니다. 즉, 어떤 행동(렌더링)이 완료된 후에 수행하는 추가 작업이라고 생각하면 됩니다.

```javascript
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 화면이 그려진 후에 실행될 코드
    console.log('컴포넌트가 화면에 나타났습니다!');
  }, []); // 의존성 배열
  
  return <div>Hello World</div>;
}
```
* **기본 구조**  
<span class="txt">
useEffect는 두 가지 인자를 받습니다. 첫 번째는 실행할 함수, 두 번째는 의존성 배열입니다.  
위 예제에서는 빈 배열([])을 전달했기 때문에 컴포넌트가 처음 나타날 때만 실행됩니다.
</span>

* **실행 시점**  
<span class="txt">
useEffect 내부의 코드는 화면 렌더링이 완료된 후에 실행됩니다.  
이는 자바스크립트의 이벤트 리스너와 비슷한 역할을 합니다.
</span>

<br>

### 일상 속 예시로 이해하기

* **방 입장**: 방에 들어간 후(컴포넌트 렌더링)에 불을 켜고(useEffect), 나갈 때(언마운트) 불을 끕니다(클린업 함수).
* **식당**: 식당에 자리 잡은 후(렌더링)에 음식을 주문합니다(useEffect). 식사를 마치고 떠날 때(언마운트) 계산을 합니다(클린업 함수).
* **여행**: 여행지에 도착한 후(렌더링)에 관광을 시작합니다(useEffect). 떠나기 전에(언마운트) 짐을 챙깁니다(클린업 함수).

실제 사용 예를 생각해보면, 페이지가 로드된 후 서버에서 데이터를 가져오거나, 화면 크기가 변경될 때 레이아웃을 조정하거나, 타이머를 설정하는 등 다양한 상황에서 useEffect를 활용할 수 있습니다.

<br>

## 의존성 배열 사용하기

```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // 1. 빈 배열: 컴포넌트가 처음 나타날 때만 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다.');
  }, []);
  
  // 2. 의존성 배열에 값 포함: 해당 값이 변경될 때마다 실행
  useEffect(() => {
    console.log(`카운트가 ${count}로 변경되었습니다.`);
    document.title = `현재 카운트: ${count}`;
  }, [count]);
  
  // 3. 의존성 배열 생략: 모든 상태 변화마다 실행 (거의 사용하지 않음)
  useEffect(() => {
    console.log('매번 렌더링될 때마다 실행됩니다.');
  });
  
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```
* **빈 배열 ([])의 의미**  
<span class="txt">
컴포넌트가 처음 화면에 나타날 때(마운트될 때) 딱 한 번만 실행됩니다.  
페이지를 처음 로드할 때 한 번만 실행해야 하는 초기화 코드에 적합합니다.
</span>

* **의존성 배열에 값 넣기 ([count])**  
<span class="txt">
배열 안에 넣은 값(count)이 변경될 때마다 useEffect가 다시 실행됩니다.  
특정 값의 변화를 감지하여 작업을 수행할 때 사용합니다.
</span>

* **의존성 배열 생략**  
<span class="txt">
의존성 배열을 생략하면 컴포넌트가 리렌더링될 때마다 useEffect가 실행됩니다.  
이 방식은 성능 문제를 일으킬 수 있어 꼭 필요한 경우가 아니면 사용하지 않는 게 좋습니다.
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

## 클린업 함수 (정리 함수)

```javascript
import React, { useState, useEffect } from 'react';

function WindowResizeTracker() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // 이벤트 핸들러 함수
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
    
    // 클린업 함수: 컴포넌트가 언마운트될 때 실행
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      <p>현재 창 너비: {windowWidth}px</p>
      {windowWidth < 768 ? <p>모바일 화면입니다.</p> : <p>데스크톱 화면입니다.</p>}
    </div>
  );
}
```
* **클린업 함수란?**  
<span class="txt">
useEffect 내에서 return 함수는 컴포넌트가 사라지거나(언마운트) 다음 useEffect가 실행되기 전에 호출됩니다.  
이 함수는 "정리"를 담당하며, 메모리 누수를 방지하고 리소스를 효율적으로 관리합니다.
</span>

* **언제 필요한가요?**  
<span class="txt">
이벤트 리스너, 타이머(setInterval, setTimeout), 외부 구독(웹소켓 등), 애니메이션 등 지속적으로 실행되는 작업을 등록했을 때 필요합니다.  
컴포넌트가 사라져도 이런 작업들은 계속 실행될 수 있어 반드시 정리해줘야 합니다.
</span>

<br>

## 실제 활용 예시

### 데이터 가져오기

```javascript
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 데이터 가져오기
    fetch('https://api.example.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setLoading(false);
      });
  }, []); // 빈 배열: 컴포넌트가 처음 마운트될 때만 실행
  
  return (
    <div>
      <h2>상품 목록</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - {product.price}원</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```
* **데이터 로딩 관리**  
<span class="txt">
컴포넌트가 처음 나타날 때 API 요청을 보내고, 데이터가 로드될 때까지 로딩 상태를 표시합니다.  
데이터를 한 번만 가져오기 위해 의존성 배열을 빈 배열([])로 설정했습니다.
</span>

* **사용자 경험 개선**  
<span class="txt">
로딩 상태를 통해 사용자에게 데이터를 가져오는 중임을 알려주고, 데이터가 준비되면 목록을 표시합니다.  
이는 사용자가 빈 화면을 보는 시간을 줄여 더 나은 경험을 제공합니다.
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

## 마운트와 언마운트 이해하기

```javascript
import React, { useState, useEffect } from 'react';

// 자식 컴포넌트
function ModalPopup({ onClose }) {
  useEffect(() => {
    // 🔵 마운트 시: 모달이 열리면 스크롤 막기
    document.body.style.overflow = 'hidden';
    console.log('모달이 열렸습니다!');
    
    // 🔴 언마운트 시: 모달이 닫히면 스크롤 다시 허용
    return () => {
      document.body.style.overflow = 'auto';
      console.log('모달이 닫혔습니다!');
    };
  }, []);
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>환영합니다!</h2>
        <p>이것은 모달 팝업입니다.</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

// 부모 컴포넌트
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="app">
      <h1>useEffect 예제: 마운트와 언마운트</h1>
      <button onClick={() => setShowModal(true)}>모달 열기</button>
      
      {/* showModal이 true일 때만 ModalPopup 컴포넌트가 화면에 나타남 */}
      {showModal && <ModalPopup onClose={() => setShowModal(false)} />}
    </div>
  );
}
```
* **마운트란?**  
<span class="txt">
컴포넌트가 화면에 처음 나타나는 것을 의미합니다.  
위 예제에서는 '모달 열기' 버튼을 클릭하여 ModalPopup 컴포넌트를 마운트합니다.
</span>

* **언마운트란?**  
<span class="txt">
컴포넌트가 화면에서 사라지는 것을 의미합니다.  
모달의 '닫기' 버튼을 클릭하면 ModalPopup 컴포넌트가 언마운트됩니다.
</span>

* **클린업 함수의 역할**  
<span class="txt">
모달이 열릴 때(마운트) 페이지 스크롤을 막고, 닫힐 때(언마운트) 스크롤을 다시 허용합니다.  
이렇게 하면 모달이 열려 있는 동안 배경 콘텐츠가 스크롤되는 것을 방지할 수 있습니다.
</span>

<br>

## 주의사항 및 팁

### 1. 무한 루프 방지하기
```javascript
// ❌ 잘못된 방법: 무한 루프 발생
useEffect(() => {
  setCount(count + 1); // count 변경 → 리렌더링 → 다시 useEffect 실행 → count 변경 ...
}, [count]);

// ✅ 올바른 방법: 특정 조건에서만 상태 업데이트
useEffect(() => {
  if (someCondition) {
    setCount(count + 1);
  }
}, [count, someCondition]);
```

### 2. 의존성 배열 올바르게 설정하기
```javascript
// ❌ 잘못된 방법: 의존성 배열에 필요한 값이 누락됨
useEffect(() => {
  console.log(name); // name을 사용하지만 의존성 배열에 포함되지 않음
}, []); // 의존성 배열이 비어 있어 name이 변경되어도 effect가 실행되지 않음

// ✅ 올바른 방법: 사용하는 모든 변수를 의존성 배열에 포함
useEffect(() => {
  console.log(name);
}, [name]); // name이 변경될 때마다 effect가 실행됨
```

### 3. 여러 개의 useEffect 분리하기
```javascript
// ❌ 잘못된 방법: 하나의 useEffect에서 여러 작업 처리
useEffect(() => {
  // 데이터 가져오기
  fetchData();
  
  // 이벤트 리스너 등록
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [fetchData]); // fetchData가 변경될 때마다 이벤트 리스너도 다시 등록됨

// ✅ 올바른 방법: 관련 있는 작업끼리 분리
useEffect(() => {
  fetchData();
}, [fetchData]);

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // 컴포넌트가 마운트될 때만 등록, 언마운트될 때만 제거
```

<br>

## 결론

이번 글에서는 React의 useEffect 훅에 대해 알아보았습니다. useEffect는 컴포넌트가 렌더링된 후에 부수 효과(side effects)를 실행할 수 있게 해주는 강력한 도구입니다. 의존성 배열을 활용하여 효과가 실행되는 시점을 제어하고, 클린업 함수를 통해 리소스를 효율적으로 관리할 수 있습니다.

useEffect를 활용하면 이벤트 리스너 등록, 애니메이션 효과, 외부 API 호출, 로컬 스토리지 활용 등 다양한 작업을 수행할 수 있습니다. 특히 기존 자바스크립트 라이브러리의 이벤트와 비슷하지만, 더 세밀하고 유연하게 각 UI 요소마다 다른 효과를 적용할 수 있다는 장점이 있습니다.

이 글이 React의 useEffect를 이해하는 데 도움이 되었길 바랍니다. 실제 프로젝트에 적용해보면서 더 깊이 이해해 보세요. 다른 궁금한 점이나 추가 예제가 필요하시면 댓글로 남겨주세요!

<br>
