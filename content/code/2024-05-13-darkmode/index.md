---
title: >  
    React - useContext로 간편하게 다크모드 구현하기

description: >  
    리액트의 Context API를 활용하여 다크 모드를 구현하는 방법을 안내합니다. 사용자는 버튼을 클릭하여 테마를 라이트 모드와 다크 모드로 전환할 수 있습니다. 

slug: 2024-05-13-darkmode
date: 2024-05-13 00:00:00+0000
lastmod: 2024-05-13 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-05-13-darkmode.webp

categories:
    - React
tags:
    - useContext
---
다크 모드는 현대 웹 애플리케이션에서 매우 인기 있는 기능 중 하나입니다. 사용자는 화면을 어두운 테마로 변경하여 애플리케이션을 사용할 수 있습니다. 이러한 다양한 환경을 지원하기 위해 리액트의 Context API를 활용하여 다크 모드를 만들어 보겠습니다.   

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

## Context 생성

```jsx
// DarkModeContext.js

import React, { createContext, useState, useContext } from 'react';

// 다크 모드 상태를 저장하고 토글하는 Context 생성
const DarkModeContext = createContext();

// 다크 모드 상태를 제공하는 Provider 컴포넌트 생성
export const DarkModeProvider = ({ children }) => {
    // 다크 모드 상태를 useState를 통해 관리
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 다크 모드 상태를 토글하는 함수
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode); // 상태를 반대로 전환
    };

    // Provider 컴포넌트에서는 자식 컴포넌트들에게 상태와 토글 함수를 전달
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// useContext를 통해 다크 모드 Context에 접근할 수 있는 훅
export const useDarkMode = () => useContext(DarkModeContext);
```

- `DarkModeContext.js` 파일에서는 다크 모드 상태와 토글 함수를 포함하는 Context를 생성합니다.
- `createContext()` 함수를 사용하여 새로운 Context를 만듭니다.
- `useState()` 훅을 사용하여 다크 모드 상태를 관리합니다.
- `toggleDarkMode()` 함수를 정의하여 다크 모드 상태를 토글합니다.
- `<DarkModeContext.Provider>`를 사용하여 하위 컴포넌트에 상태를 전달합니다.

<br>

## Provider 설정

```jsx
// App.js

import React from 'react';
import { DarkModeProvider } from './DarkModeContext';
import MainComponent from './MainComponent';

function App() {
    // DarkModeProvider를 사용하여 다크 모드 Context를 애플리케이션에 제공
    return (
        <DarkModeProvider>
            {/* MainComponent를 렌더링 */}
            <MainComponent />
        </DarkModeProvider>
    );
}

export default App;
```
- `App.js` 파일에서는 `DarkModeProvider`를 최상위 컴포넌트로 설정하여 애플리케이션 전체에서 다크 모드 Context를 사용할 수 있도록 합니다.
- `DarkModeProvider` 컴포넌트는 하위 컴포넌트들을 감싸며, 다크 모드 상태와 토글 함수를 하위 컴포넌트에 제공합니다.

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

## 컴포넌트에서 DarkMode 사용
```jsx
// MainComponent.js

import React from 'react';
import { useDarkMode } from './DarkModeContext';

const MainComponent = () => {
    // 다크 모드 상태와 토글 함수를 가져옴
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className={isDarkMode ? 'dark' : 'light'}>
            {/* 버튼을 클릭하면 토글 함수를 호출하여 다크 모드를 전환 */}
            <button onClick={toggleDarkMode}>
                {isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            </button>
            {/* 현재 모드에 따라 표시되는 텍스트가 변경됨 */}
            <h1>{isDarkMode ? '다크 모드' : '라이트 모드'}</h1>
        
    );
};

export default MainComponent;
```
- `MainComponent.js` 파일에서는 다크 모드를 적용할 대상 컴포넌트에서 `useDarkMode` 훅을 사용하여 상태를 가져옵니다.
- `isDarkMode` 변수를 통해 현재 다크 모드 상태를 확인하고, `toggleDarkMode` 함수를 사용하여 상태를 전환합니다.
- JSX에서 `isDarkMode` 변수를 사용하여 적절한 클래스 또는 스타일을 적용하여 다크 모드와 라이트 모드를 구분합니다.
- 버튼을 클릭하여 다크 모드와 라이트 모드를 전환할 수 있도록 설정합니다.

<br>

## 결론
리액트 Context API를 활용하여 다크 모드를 만들었습니다. 이제 사용자는 버튼을 클릭하여 다크 모드와 라이트 모드를 전환할 수 있습니다. 이를 통해 사용자 경험을 향상시키고 웹 애플리케이션을 보다 편안하게 사용할 수 있습니다. 이렇듯이, 리액트의 Context API는 다양한 상황에서 유용하게 활용될 수 있습니다.   
