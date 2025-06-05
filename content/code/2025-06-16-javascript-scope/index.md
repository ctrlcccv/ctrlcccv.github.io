---
title: >  
    전역/함수/블록 스코프: JavaScript 변수의 사용 범위

description: >  
    자바스크립트의 스코프(Scope) 개념을 쉽게 이해하고 변수를 효과적으로 관리하는 방법을 알아봅니다. 전역, 함수, 블록 스코프부터 스코프 체인과 렉시컬 스코프까지 설명합니다.

slug: 2025-06-16-javascript-scope
date: 2025-06-16 00:00:00+0000
lastmod: 2025-06-16 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-16-javascript-scope.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 변수 관리
    - 스코프
---

코드를 작성하다가 어떤 변수가 특정 위치에서만 접근되고 다른 곳에서는 접근이 안 돼서 당황한 적 있으신가요?

자바스크립트로 개발할 때 변수가 어디까지 영향을 미치는지, 즉 스코프(Scope)를 이해하는 것은 정말 중요합니다. 이번 글에서는 자바스크립트의 스코프 개념을 누구나 쉽게 이해할 수 있도록 설명하고, 실제 코딩에서 활용하는 방법을 알아보겠습니다.

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

## 스코프란 무엇인가?

```javascript
// 전역 스코프
const 전역변수 = "전역에서 선언된 변수입니다";

function 함수() {
    // 함수 스코프
    const 함수내변수 = "함수 안에서만 사용 가능";
    console.log(함수내변수); // "함수 안에서만 사용 가능" 출력
    console.log(전역변수);   // "전역에서 선언된 변수입니다" 출력
}

// console.log(함수내변수); // 에러! 함수 밖에서는 접근 불가
```

스코프는 쉽게 말해 '변수를 사용할 수 있는 범위'입니다. 변수가 어디서 접근 가능하고 어디서는 접근할 수 없는지를 결정하는 규칙입니다.  
자바스크립트에는 크게 세 가지 스코프가 있습니다.

<br>

## 스코프의 종류

### 1. 전역 스코프 (Global Scope)

```javascript
// 전역 스코프의 변수
const 사이트이름 = "개발 블로그";

function 헤더출력() {
    console.log(사이트이름); // 접근 가능
}

function 푸터출력() {
    console.log(사이트이름); // 접근 가능
}
```

* **특징**: 코드의 가장 바깥쪽에 선언된 변수로, 어디에서든 접근할 수 있습니다.
* **장점**: 모든 곳에서 사용할 수 있어 편리합니다.
* **단점**: 너무 많이 사용하면 코드가 복잡해지고 예상치 못한 버그가 생길 수 있습니다.

<br>

### 2. 함수 스코프 (Function Scope)

```javascript
function 사용자정보출력() {
    // 함수 스코프의 변수
    const 이름 = "홍길동";
    const 나이 = 30;
    
    console.log(`이름: ${이름}, 나이: ${나이}`); // 접근 가능
}

// console.log(이름); // 에러! 함수 밖에서는 접근 불가
```

* **특징**: 함수 안에 선언된 변수는 오직 그 함수 내부에서만 사용할 수 있습니다.
* **장점**: 변수의 사용 범위를 제한해서 코드를 더 안전하게 만들어줍니다.
* **활용**: 특정 기능에만 필요한 변수는 함수 안에 선언하면 코드가 더 깔끔해집니다.

<br>

### 3. 블록 스코프 (Block Scope)

```javascript
if (true) {
    // 블록 스코프의 변수
    const 메시지 = "블록 안에서만 사용 가능";
    let 카운트 = 1;
    
    console.log(메시지); // 접근 가능
    console.log(카운트); // 접근 가능
}

// console.log(메시지); // 에러! 블록 밖에서는 접근 불가
// console.log(카운트); // 에러! 블록 밖에서는 접근 불가
```

* **특징**: 중괄호 `{}` 안에서 `let`이나 `const`로 선언된 변수는 그 블록 안에서만 사용할 수 있습니다.
* **적용**: `if`, `for`, `while` 같은 제어문에서 사용하는 변수를 제한할 수 있습니다.

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

## var, let, const의 차이점

```javascript
// var 예제
function varTest() {
    var x = 1;
    if (true) {
        var x = 2;  // 같은 변수를 재선언
        console.log(x);  // 2
    }
    console.log(x);  // 2 (변경됨)
}

// let 예제
function letTest() {
    let y = 1;
    if (true) {
        let y = 2;  // 다른 변수를 선언
        console.log(y);  // 2
    }
    console.log(y);  // 1 (변경되지 않음)
}
```

* **var**: 함수 스코프만 인식합니다. 블록 안에서 선언해도 함수 전체에서 접근할 수 있습니다.
* **let과 const**: 블록 스코프를 인식합니다. 블록 안에서 선언하면 블록 밖에서는 접근할 수 없습니다.
* **재선언**: `var`는 같은 스코프에서 다시 선언해도 되지만, `let`과 `const`는 불가능합니다.
* **재할당**: `var`와 `let`은 값을 바꿀 수 있지만, `const`는 한 번 정하면 바꿀 수 없습니다.

💡 **팁**: 요즘 자바스크립트 개발에서는 `var` 대신 `let`과 `const`를 사용하는 게 좋습니다. 변수의 범위(스코프)가 더 명확해지고 예측 가능한 코드를 작성할 수 있습니다.

<br>

## 스코프 체인과 렉시컬 스코프

### 스코프 체인

```javascript
const 전역변수 = "전역";

function 외부함수() {
    const 외부변수 = "외부";
    
    function 내부함수() {
        const 내부변수 = "내부";
        console.log(내부변수); // "내부" 출력
        console.log(외부변수); // "외부" 출력
        console.log(전역변수); // "전역" 출력
    }
    
    내부함수();
}
```

스코프 체인은 변수를 찾을 때 가장 가까운 스코프부터 순서대로 찾아나가는 과정입니다. 내부 함수에서 변수를 사용할 때, 자바스크립트는:

1. 먼저 자기 자신의 스코프에서 변수를 찾습니다.
2. 없으면 외부 함수의 스코프에서 찾습니다.
3. 계속 바깥쪽으로 나가며 전역 스코프까지 찾습니다.

<br>

### 렉시컬 스코프

```javascript
const 변수 = "전역값";

function 부모() {
    const 변수 = "부모값";
    
    function 자식() {
        console.log(변수); // "부모값" 출력
    }
    
    자식();
}

부모();
```

렉시컬 스코프는 함수가 선언된 위치에 따라 변수를 찾는 범위가 결정되는 것을 말합니다. 함수가 어디서 호출되었는지가 아니라, 어디서 만들어졌는지에 따라 스코프가 정해집니다.

📝 **참고**: 자바스크립트는 렉시컬 스코핑 방식을 사용합니다. 이것은 함수가 작성된 시점에 이미 그 함수의 스코프가 결정된다는 의미입니다.

<br>

## 변수 섀도잉

```javascript
const 이름 = "김개발";

function 사용자정보() {
    const 이름 = "이코딩"; // 전역 변수를 가림
    console.log(이름); // "이코딩" 출력
}

사용자정보();
console.log(이름); // "김개발" 출력
```

변수 섀도잉은 안쪽 스코프의 변수가 바깥쪽 스코프의 같은 이름 변수를 가리는 현상입니다. 위 예제에서 `사용자정보()` 함수 안의 `이름` 변수는 전역 변수 `이름`을 가리고 있습니다.

💡 **팁**: 변수 섀도잉은 의도하지 않은 버그를 만들 수 있습니다. 가능하면 다른 이름을 사용하거나 변수의 범위를 명확히 하는 것이 좋습니다.

<br>

## 실전 활용 예시

### 즉시 실행 함수로 스코프 제한하기

```javascript
// 전역 스코프를 오염시키지 않음
(function() {
    const password = "1234";
    const username = "admin";
    
    function login() {
        console.log(`${username}님, 환영합니다!`);
    }
    
    login();
})();

// console.log(password); // 에러! 접근 불가
```

즉시 실행 함수(IIFE)를 사용하면 전역 스코프를 오염시키지 않고 변수와 함수를 깔끔하게 관리할 수 있습니다.

<br>

### 클로저 활용하기

```javascript
function createCounter() {
    let count = 0; // 외부에서 직접 접근 불가
    
    return {
        increment: function() { // 증가 함수
            count++;
            return count;
        },
        decrement: function() { // 감소 함수
            count--;
            return count;
        },
        getValue: function() { // 현재 값 반환 함수
            return count;
        }
    };
}

const counter = createCounter(); // 카운터 생성
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
```

클로저를 활용하면 외부에서 직접 건드릴 수 없는 비공개 변수를 만들 수 있습니다. 이런 방식은 데이터를 안전하게 보호하고 관리하는 데 유용합니다.

<br>

## 스코프 퀴즈!

```javascript
let x = "전역 x";

function outer() {
    let y = "outer y";
    
    function inner() {
        let x = "inner x";
        console.log(x); // (1)
        console.log(y); // (2)
    }
    
    console.log(x); // (3)
    inner();
}

outer();
console.log(x); // (4)
```

위 코드에서 (1), (2), (3), (4) 각 위치에서 어떤 값이 출력될까요? 아래에 정답을 입력해보세요.  

<div class="quiz-wrap">
    <span>(1) <input type="text" class="quiz-input"></span>
    <span>(2) <input type="text" class="quiz-input"></span>
    <span>(3) <input type="text" class="quiz-input"></span>
    <span>(4) <input type="text" class="quiz-input"></span>
</div>

<details>
<summary>정답 확인하기</summary>

(1) inner x  
(2) outer y   
(3) 전역 x  
(4) 전역 x  

<br>

이 문제는 스코프 체인과 렉시컬 스코프의 개념을 이해하고 있는지 확인하는 문제입니다.

* **(1) console.log(x)**  
<span class="txt">
inner() 함수 내부에서는 자신의 스코프에 선언된 지역 변수 x를 사용합니다. 스코프 체인에 따라 가장 가까운 자기 자신의 스코프에서 먼저 변수를 찾기 때문에 "inner x"가 출력됩니다.
</span>

* **(2) console.log(y)**  
<span class="txt">
inner() 함수 내부에는 y 변수가 없습니다. 이때 스코프 체인을 따라 바로 바깥 스코프인 outer() 함수의 스코프에서 y를 찾아 "outer y"를 출력합니다.
</span>

* **(3) console.log(x)**  
<span class="txt">
outer() 함수 내부에는 x 변수가 정의되어 있지 않습니다. 따라서 스코프 체인을 따라 더 바깥쪽인 전역 스코프에서 x를 찾아 "전역 x"를 출력합니다.
</span>

* **(4) console.log(x)**  
<span class="txt">
전역 스코프에서는 전역 변수 x를 직접 참조하므로 "전역 x"가 출력됩니다.
</span>

이렇게 자바스크립트는 변수를 찾을 때 현재 위치에서 시작해 바깥쪽으로 단계적으로 찾아가는 스코프 체인 방식을 사용합니다. 또한 함수가 어디서 호출되는지가 아니라 어디서 선언되었는지에 따라 상위 스코프가 결정되는 렉시컬 스코프 방식을 따릅니다.
</details>

<br>