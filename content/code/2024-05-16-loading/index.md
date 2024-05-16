---
title: >  
    리액트로 로딩화면 만들기: 단계별 안내 및 활용 예시

description: >  
    리액트를 활용하여 로딩화면을 만드는 방법을 단계별로 설명합니다. 컴포넌트 구조, 스타일링, 상태 관리 등을 포함한 실용적인 예제를 통해 이해하기 쉽게 안내합니다.

slug: 2024-05-16-loading
date: 2024-05-16 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-05-16-loading.webp

categories:
    - React
tags:
    
---
웹 애플리케이션을 개발하다 보면, 데이터 로딩이나 리소스 준비가 필요한 경우 사용자를 기다리게 할 필요가 있습니다. 이러한 상황에서 로딩화면(Loading Screen)을 통해 사용자에게 진행중임을 알리고, 사용자 경험을 향상시킬 수 있습니다. 이번 글에서는 리액트를 활용하여 실제 동작하는 로딩화면을 단계별로 구현하는 방법을 설명합니다.  

<br>

## 컴포넌트 구조
로딩화면을 구현하기 위해 기본적인 컴포넌트 구조를 설정합니다. App 컴포넌트와 LoadingScreen 컴포넌트를 만들겠습니다.

```jsx
// src/App.js
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import './App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 인위적으로 3초 후 로딩 완료 설정
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            {isLoading ? <LoadingScreen /> : <div>콘텐츠를 여기에 삽입하세요!</div>}
        </div>
    );
}

export default App;

// src/LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="spinner"></div>
            <p>로딩 중...</p>
        </div>
    )
};

export default LoadingScreen;
```

## 스타일링

로딩 화면과 스피너를 스타일링하는 CSS를 추가합니다. 간단한 애니메이션과 레이아웃을 사용하여 로딩 스크린을 꾸미겠습니다.

```css
.loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 5px solid transparent;
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

## 기능 확장

기본 로딩 화면 기능을 구현하였으니, 이제 이를 확장하여 다른 상황에서도 사용할 수 있도록 추가적인 기능을 구현해 보겠습니다. 예를 들어, 데이터를 API에서 불러오는 동안 로딩 화면을 표시하도록 하겠습니다.

```jsx
// src/App.js 수정
import React, { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import './App.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        // API 요청
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="App">
            {isLoading ? <LoadingScreen /> : 
            <div>
                <h1>데이터 불러오기 완료</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>}
        </div>
    );
}

export default App;
```
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

* **API 요청 및 상태 관리**
  - API에서 데이터를 불러오기 위해 `useEffect`를 사용하여 컴포넌트가 마운트(`mounted`)될 때 API 요청을 보냅니다.
  - API 요청이 진행 중일 때 로딩 상태를 관리하기 위해 `useState`를 사용합니다.

* **상태 초기화**
  - `isLoading` 상태를 `true`로 초기화하여 처음에는 로딩화면이 보이도록 설정합니다.
  - `data` 상태는 API에서 받아온 데이터를 저장하기 위해 `null`로 초기화합니다.

* **API 요청 및 데이터 상태 업데이트**
  - `useEffect`를 사용하여 컴포넌트가 마운트될 때 API 요청을 보냅니다.
  - `fetch` 함수를 사용하여 데이터를 요청합니다.
  - 요청이 성공하면 `data` 상태를 업데이트하고, `isLoading` 상태를 `false`로 설정하여 로딩화면을 숨깁니다.
  - 요청이 실패하면 에러를 콘솔에 출력하고, `isLoading` 상태를 `false`로 설정하여 로딩화면을 숨깁니다.

* **조건부 렌더링**
  - `isLoading` 상태에 따라 조건부 렌더링을 수행합니다.
  - `isLoading`이 `true`인 경우 `LoadingScreen` 컴포넌트를 렌더링합니다.
  - `isLoading`이 `false`인 경우 데이터를 포함하는 콘텐츠를 렌더링합니다. 예제에서는 API에서 받아온 데이터를 리스트 형태로 보여줍니다.

<br>

## 결론
이번 글에서는 리액트를 활용하여 로딩화면을 구현하는 방법을 단계별로 설명했습니다. 기본적인 컴포넌트 구조 설정부터 스타일링, 확장 기능 구현, 사용자 경험 개선에 이르기까지 다양한 측면을 다루었습니다. 이러한 로딩화면은 사용자에게 데이터 로딩 중임을 명확하게 알리고, 기다려야 하는 상황에서도 긍정적인 경험을 제공하는 중요한 역할을 합니다.    