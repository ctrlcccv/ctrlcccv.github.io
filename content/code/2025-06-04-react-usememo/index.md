---
title: >  
    useMemo 활용한 React 객체 안정화 & 리렌더링 최적화 기법

description: >  
    React의 useMemo 훅을 활용한 렌더링 최적화와 객체 안정화 기법을 알아봅니다. 성능 문제 해결부터 실무 활용 사례까지 단계별로 이해하기 쉽게 설명합니다.

slug: 2025-06-04-react-usememo
date: 2025-06-04 00:00:00+0000
lastmod: 2025-06-04 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-04-react-usememo.webp

alternates:
  - title: "useMemo 활용한 React 객체 안정화 & 리렌더링 최적화 기법"
    href: "https://ctrlcccv.github.io/code/2025-06-04-react-usememo/"
    hreflang: "ko"
  - title: "React useMemo Tutorial: Optimize Render Performance" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-05-react-usememo/"
    hreflang: "en"
  - title: "useMemo 활용한 React 객체 안정화 & 리렌더링 최적화 기법"
    href: "https://ctrlcccv.github.io/code/2025-06-04-react-usememo/"
    hreflang: "x-default"

categories:
    - React
tags:
    - React Hooks 
    - useMemo
    - 성능 최적화
---

React 앱에서 같은 계산을 계속 반복해서 수행하느라 답답했던 적이 있으신가요?

웹 개발을 하다 보면 복잡한 계산이나 데이터 처리가 매 렌더링마다 반복되어 성능이 떨어지는 경우가 많습니다. 특히 대량의 데이터를 필터링하거나 정렬할 때는 화면이 버벅거리고 앱이 느려지는 문제가 발생합니다. 이런 상황에서 React의 useMemo 훅이 효과적인 해결책이 될 수 있습니다.

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

## useMemo 기본 이해하기

```jsx
import React, { useState, useMemo } from 'react';

function 계산컴포넌트() {
  const [숫자A, 숫자A설정] = useState(0);
  const [숫자B, 숫자B설정] = useState(0);
  
  // 비용이 많이 드는 계산을 useMemo로 최적화
  const 합계 = useMemo(
    // 첫 번째 인자: 계산 함수 - 메모이제이션할 값을 계산하고 반환합니다
    () => {
      console.log("합계 다시 계산중...");
      return 숫자A + 숫자B;
    }, 
    // 두 번째 인자: 의존성 배열 - 이 값들이 변경될 때만 위의 계산 함수가 다시 실행됩니다
    [숫자A, 숫자B]
  ); 
  
  return (
    <div>
      <input 
        type="number" 
        value={숫자A} 
        onChange={(e) => 숫자A설정(Number(e.target.value))} 
      />
      <input 
        type="number" 
        value={숫자B} 
        onChange={(e) => 숫자B설정(Number(e.target.value))} 
      />
      <p>합계: {합계}</p>
    </div>
  );
}
```

### useMemo란?
useMemo는 쉽게 말해 "이전에 계산한 값을 기억해두는 상자"입니다. 자주 시키는 음식을 기억해뒀다가 같은 메뉴를 주문할 때 바로 제공하는 것처럼, useMemo도 이전 계산 결과를 재사용합니다.

<br>

### 기본 구조

useMemo 훅은 두 가지 필수 인자를 받아 동작합니다:

1. **계산 함수**: 메모이제이션(재사용)할 값을 만들어내는 함수입니다. 이 함수의 결과값이 저장되고 필요할 때 재사용됩니다.
2. **의존성 배열**: 이 배열에 포함된 값들이 변경될 때만 계산 함수가 다시 실행됩니다. 배열 내 값들이 이전과 동일하다면 계산을 건너뛰고 저장된 결과를 그대로 사용합니다.

<br>

### 작동 원리
위 예제에서 `합계` 값은 useMemo로 메모이제이션됩니다. 컴포넌트가 다시 그려져도 `숫자A`와 `숫자B`가 변하지 않았다면, 이전에 계산된 합계 값을 그대로 사용합니다. 이렇게 하면 불필요한 계산을 줄이고 앱 성능을 높일 수 있습니다.

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

## 객체 안정화와 불필요한 리렌더링 방지

```jsx
function ParentComponent() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  
  // 안정화되지 않은 객체 - 매 렌더링마다 새 객체 생성됨
  const userInfo = { 
    name: user.name,
    details: `${user.name} is ${user.age} years old`,
    role: user.age >= 19 ? 'Adult' : 'Minor'
  }; // 매번 새로운 메모리 주소를 가진 객체 생성
  
  // useMemo로 객체 안정화 - user.name이나 user.age가 변경될 때만 새 객체 생성
  const memoizedUserInfo = useMemo(() => {
    return {
      name: user.name,
      details: `${user.name}님은 ${user.age}세입니다`,
      role: user.age >= 19 ? '성인' : '미성년자'
    };
  }, [user.name, user.age]); // 의존성 배열 - 이 값들이 변경될 때만 재계산
  
  return (
    <>
      {/* 매 렌더링마다 자식이 리렌더링됨 (비효율적) */}
      <ChildComponent userInfo={userInfo} />
      
      {/* user 정보가 변경될 때만 자식이 리렌더링됨 (효율적) */}
      <OptimizedChild userInfo={memoizedUserInfo} />
    </>
  );
}

// React.memo로 최적화된 자식 컴포넌트 - props가 변경될 때만 리렌더링
const OptimizedChild = React.memo(function({ userInfo }) {
  console.log("자식 컴포넌트 렌더링");
  return <div>{userInfo.details}</div>;
});
```

React에서 컴포넌트가 다시 그려질 때마다 내부에서 만든 객체는 새로 생성됩니다. 자바스크립트에서 객체는 참조 타입이므로, 내용이 같아도 다른 메모리 주소를 가진 새 객체로 인식합니다. 이로 인해 React.memo로 최적화한 자식 컴포넌트도 불필요하게 리렌더링됩니다.

useMemo를 사용하면 의존성 배열의 값이 바뀔 때만 새 객체를 만들어 불필요한 자식 컴포넌트 리렌더링을 방지할 수 있습니다.

<br>

## 실무 활용 사례: 데이터 필터링 및 정렬

```jsx
function ProductList({ products, searchTerm, category, sortBy }) {
  // 필터링 및 정렬된 상품 목록을 계산하고 메모이제이션
  const filteredProducts = useMemo(() => {
    console.log("상품 필터링 중..."); // 성능 측정용 로그
    
    // 1단계: 검색어와 카테고리로 필터링
    let result = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (category === 'all' || product.category === category)
    );
    
    // 2단계: 정렬 기준에 따라 정렬
    if (sortBy === 'price-asc') {
      result = result.sort((a, b) => a.price - b.price); // 가격 오름차순
    } else if (sortBy === 'price-desc') {
      result = result.sort((a, b) => b.price - a.price); // 가격 내림차순
    } else if (sortBy === 'name') {
      result = result.sort((a, b) => a.name.localeCompare(b.name)); // 이름순
    }
    
    return result;
  }, [products, searchTerm, category, sortBy]); // 이 값들이 변경될 때만 재계산
  
  return (
    <div>
      <p>{filteredProducts.length}개 상품 찾음</p>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>{product.name} - {product.price}원</li>
        ))}
      </ul>
    </div>
  );
}
```

**실제 적용 시나리오:**
- **쇼핑몰**: 사용자가 검색어를 입력하거나 필터/정렬 옵션을 변경할 때마다 상품 목록을 효율적으로 업데이트
- **대시보드**: 대량의 데이터를 필터링하고 가공해야 하는 비즈니스 인텔리전스 도구
- **관리자 패널**: 사용자/주문/콘텐츠 목록의 검색 및 필터링 기능

**성능 개선 효과:**
1. 검색어, 카테고리, 정렬 옵션이 변경될 때만 데이터 처리 로직이 실행됩니다.
2. 입력 필드에 타이핑하거나 다른 UI 상호작용 시에도 화면 응답성이 유지됩니다.
3. 특히 대량 데이터(수백~수천 항목) 처리 시 효과가 극대화됩니다.

이 패턴은 실무에서 가장 많이 활용되는 useMemo 사용법입니다. 사용자 입력에 따라 데이터를 실시간으로 필터링하고 정렬할 때 계산 비용이 크게 들 수 있는데, useMemo를 사용하면 필요한 경우에만 재계산하여 앱의 반응성을 유지할 수 있습니다.


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

## 주의사항 및 모범 사례

```jsx
function WarningExampleComponent() {
  const [count, setCount] = useState(0);
  
  // 1. 간단한 계산에는 불필요 (과도한 사용 예시)
  const unnecessaryExample = useMemo(() => count + 10, [count]); 
  // 주의: 이런 간단한 계산은 useMemo 오버헤드가 더 클 수 있음
  
  // 2. 의존성 배열 관리 (잘못된 사용)
  const wrongDependencies = useMemo(() => {
    return calculateWithCount(count);
  }, []); // 버그 발생: count가 의존성 배열에 없어 값이 갱신되지 않음
  
  // 3. 올바른 사용 예시
  const correctExample = useMemo(() => {
    // 정말 무거운 계산만 여기에 넣기
    return expensiveCalculation(count);
  }, [count]); // 올바른 의존성: 원시값 직접 사용
  
  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)}>증가</button>
      <p>현재 카운트: {count}</p>
    </div>
  );
}
```

useMemo를 사용할 때 주의할 점:

* **성능 측정 먼저**: 실제 성능 문제가 있는 부분을 먼저 찾아서 적용하세요.
* **간단한 계산에는 사용하지 않기**: 메모이제이션 비용이 계산 자체보다 클 수 있습니다.
* **의존성 배열 정확히 관리하기**: 계산에 사용되는 모든 값은 의존성 배열에 꼭 포함해야 합니다.
* **객체와 배열 주의하기**: 의존성 배열에 객체나 배열 대신 원시 타입 값(숫자, 문자열, 불리언)을 사용하세요.

<br>

## 결론

React의 useMemo 훅은 복잡한 계산을 최적화하고 객체의 참조 안정성을 유지하는 강력한 도구입니다. 모든 계산에 적용하기보다는 실제 성능 병목이 있는 부분을 찾아 적용하는 것이 좋습니다. 복잡한 데이터 처리, 객체 안정화, 비용이 많이 드는 계산에 집중적으로 사용하면 최상의 결과를 얻을 수 있습니다.

여러분은 프로젝트에서 useMemo를 어떻게 활용하고 계신가요? 혹시 메모이제이션으로 해결한 성능 문제가 있으신가요? 댓글로 경험을 공유해주세요!

<br>
