---
title: >  
    React - useEffect 동작 원리, 주요 개념, 다양한 활용 사례

description: >  
    React의 useEffect 훅은 함수형 컴포넌트에서 라이프사이클 메서드를 대체하고 부수 효과를 처리하는데 사용됩니다. 의존성 배열을 통해 특정 상태의 변화에만 반응하며, 클린업 함수를 활용하여 메모리 누수를 방지할 수 있습니다.

slug: 2024-03-25-useEffect
date: 2024-03-25 00:00:00+0000
lastmod: 2024-03-25 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-25-useEffect.webp

categories:
    - React
tags:

---
React useEffect 훅은 함수형 컴포넌트에서 라이프사이클 메서드의 기능을 대체하고 부수 효과를 처리하는 강력한 도구입니다. 이 훅을 통해 컴포넌트의 상태 변화를 감지하고 그에 따라 필요한 작업을 수행할 수 있습니다. 의존성 배열을 활용하여 특정 상태의 변화에만 반응하도록 설정할 수 있고, 클린업 함수를 통해 메모리 누수를 방지할 수도 있습니다.  

이 글에서는 useEffect 훅의 동작 원리, 주요 개념, 다양한 사용 사례, 그리고 실제 프로젝트 적용 예시까지 심층적으로 살펴봅니다.  

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

## useEffect 훅의 동작 원리

useEffect 훅은 컴포넌트가 렌더링 될 때마다 실행되는 함수를 정의합니다. 이 함수는 컴포넌트의 상태, props, 또는 DOM과 같은 외부 요소에 의존할 수 있습니다. 의존성이 변경될 때마다 useEffect 훅은 다시 실행됩니다.  
useEffect 훅은 다음과 같은 두 가지 인자를 받습니다.  

* **부수 효과 함수:** 컴포넌트가 렌더링 될 때마다 실행되는 함수입니다.
* **의존성 배열:** 부수 효과 함수가 다시 실행될 때마다 확인해야 하는 값들의 배열입니다.

```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
    // 클릭 횟수를 저장하는 상태와 업데이트 함수를 정의합니다.
    const [count, setCount] = useState(0);

    // 페이지 제목을 클릭 횟수로 업데이트합니다.
    useEffect(() => {
        document.title = `${count}번 클릭했습니다`;
    }, [count]); // count가 변경될 때만 실행됩니다.

    return (
        <div>
            <p>{count}번 클릭했습니다</p>
            <button onClick={() => setCount(count + 1)}>
                클릭하세요
            </button>
        </div>
    );
}
```
위 코드에서 useEffect 훅은 count 값이 변경될 때마다 document.title을 업데이트합니다.  
<br>

## useEffect 훅의 주요 개념

* **부수 효과:** 컴포넌트 렌더링 흐름에 영향을 주는 작업들로, 상태 변경, 외부 API 호출, 구독 설정/해제 등이 해당합니다.
* **의존성 배열:** 부수 효과 함수가 다시 실행될 때마다 확인해야 하는 값들의 배열입니다.
* **클린업 함수:** 컴포넌트가 언마운트되기 직전이나 다음 부수 효과 함수가 호출되기 직전에 실행되는 함수입니다.
* **조건부 실행:** 특정 조건을 충족할 때만 부수 효과 함수를 실행합니다.   

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

## useEffect 훅의 다양한 사용 사례

**데이터 불러오기**

```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
    // 데이터 상태와 업데이트 함수를 정의합니다.
    const [data, setData] = useState([]);

    useEffect(() => {
        // 외부 API에서 데이터를 가져와 상태를 업데이트합니다.
        async function fetchData() {
            const response = await fetch('https://api.example.com/data');
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData(); // 데이터를 가져오는 함수를 호출합니다.
    }, []); // 데이터를 가져오는 효과는 한 번만 실행됩니다.

    // 데이터 배열을 매핑하여 이름을 화면에 표시합니다.
    return (
        <div>
            {data.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    );
}
```

**스크롤 이벤트 처리**
```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
    // 스크롤 위치를 저장하는 상태와 그 상태를 업데이트하는 함수를 정의합니다.
    const [scrollTop, setScrollTop] = useState(0);

    // 컴포넌트가 처음 렌더링 될 때 스크롤 이벤트를 설정합니다.
    useEffect(() => {
        function handleScroll() {
            setScrollTop(window.pageYOffset);
        }

        window.addEventListener('scroll', handleScroll);

        // 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 현재 스크롤 위치를 화면에 표시합니다.
    return (
        <div>
            <p>스크롤 위치: {scrollTop}</p>
            {/* 추가적인 JSX 코드 */}
        </div>
    );
}
```
위 코드에서 useEffect 훅은 스크롤 이벤트 발생 시마다 scrollTop state를 업데이트합니다. 컴포넌트가 언마운트될 때 리스너를 제거하여 메모리 누수를 방지합니다.  
<br>

**타이머 설정**
```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
    // 초를 저장하는 상태와 초를 업데이트하는 함수를 정의합니다.
    const [seconds, setSeconds] = useState(0);

    // 컴포넌트가 처음 렌더링 될 때 1초마다 초를 증가시키는 타이머를 설정합니다.
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);

        // 언마운트될 때 타이머를 제거합니다.
        return () => clearInterval(intervalId);
    }, []);

    // 현재 경과된 시간을 화면에 표시합니다.
    return (
        <div>
            <p>경과 시간: {seconds}초</p>
        </div>
    );
}
```
위 코드에서 useEffect 훅은 1초 간격으로 타이머를 설정하여 seconds state를 업데이트합니다. 컴포넌트가 언마운트될 때 타이머를 제거하여 메모리 누수를 방지합니다.  
<br>

**구독 설정/해제**
```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
    // 데이터를 저장하는 상태와 업데이트 함수를 정의합니다.
    const [data, setData] = useState([]);

    // 'data-update' 이벤트를 구독하고, 데이터가 업데이트될 때마다 상태를 업데이트합니다.
    useEffect(() => {
        const subscription = socket.on('data-update', (updatedData) => {
            setData(updatedData);
        });

        // 언마운트될 때 구독을 해제합니다.
        return () => subscription.unsubscribe();
    }, []);

    // 데이터 배열을 매핑하여 각 항목의 이름을 화면에 표시합니다.
    return (
        <div>
            {data.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    );
}
```
위 코드에서 useEffect 훅은 socket.io를 사용하여 서버로부터 데이터 업데이트 이벤트를 구독하고 data state를 업데이트합니다. 컴포넌트가 언마운트될 때 구독을 해제하여 메모리 누수를 방지합니다.  
<br>

**애니메이션 구현**
```javascript
import React, { useEffect, useState, useRef } from 'react';

function MyComponent() {
    // 애니메이션 상태를 저장하는 상태 변수와 그 상태를 변경하는 함수를 정의합니다.
    const [isAnimated, setIsAnimated] = useState(false);

    // 애니메이션을 적용할 요소에 대한 참조를 생성합니다.
    const animationRef = useRef();

    // 애니메이션 상태에 따라 요소에 애니메이션을 적용하거나 중지합니다.
    useEffect(() => {
        if (isAnimated) {
            animationRef.current.style.animation = 'my-animation 1s ease-in-out';
        } else {
            animationRef.current.style.animation = 'none';
        }
    }, [isAnimated]); // 애니메이션 상태가 변경될 때만 실행됩니다.

    // 애니메이션을 적용할 요소와 버튼을 화면에 표시합니다.
    return (
        <div ref={animationRef}>
            <p>애니메이션 요소</p>
            <button onClick={() => setIsAnimated(true)}>애니메이션 시작</button>
            <button onClick={() => setIsAnimated(false)}>애니메이션 중단</button>
        </div>
    );
}
```
위 코드에서 useEffect 훅은 isAnimated state에 따라 애니메이션 CSS 클래스를 적용하여 애니메이션 효과를 구현합니다. useRef 훅을 사용하여 DOM 요소에 직접 접근하고 애니메이션 속성을 설정합니다.  
<br>

## useEffect 훅 활용 팁

* **의존성 배열을 최적화하여 불필요한 렌더링 방지**  
의존성 배열에 꼭 필요한 값만 포함하여 컴포넌트 렌더링 성능을 향상시킬 수 있습니다.  

* **클린업 함수를 사용하여 메모리 누수 방지**  
컴포넌트 언마운트 시 리스너, 타이머 등을 제거하여 메모리 누수를 방지합니다.  

* **조건부 실행으로 불필요한 부수 효과 제거**  
특정 조건을 만족할 때만 부수 효과 함수를 실행하여 성능 향상 및 코드 간결화를 도모합니다.  

* **useRef 훅과 함께 사용하여 최적화**  
변하지 않는 값을 저장하거나 DOM 요소에 직접 접근해야 하는 경우 useRef 훅과 함께 사용하여 성능을 향상시킬 수 있습니다.  
<br>

## 결론
`useEffect` 훅은 React 함수형 컴포넌트에서 라이프사이클 메서드를 대체하고 부수 효과를 처리하는 데 쓰입니다. 이를 활용하여 상태 변화를 감지하고 필요한 작업을 수행할 수 있습니다. 의존성 배열을 설정하여 특정 상태의 변화에만 반응하도록 조절할 수 있으며, 클린업 함수를 활용하여 메모리 누수를 방지할 수 있습니다. 이를 통해 React 애플리케이션의 성능과 유지보수성을 향상시킬 수 있습니다.  