---
title: >  
    자바스크립트 호이스팅, 변수 선언 전 사용 가능한 이유

description: >  
    자바스크립트 호이스팅의 모든 것을 쉽게 설명합니다. var와 let/const의 호이스팅 차이점, TDZ(Temporal Dead Zone) 개념, 블록 스코프까지 실제 코드 예제로 완벽하게 마스터하세요.

slug: 2025-06-20-javascript-hoisting
date: 2025-06-20 00:00:00+0000
lastmod: 2025-06-20 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-20-javascript-hoisting.webp

alternates:
  - title: "자바스크립트 호이스팅, 변수 선언 전 사용 가능한 이유"
    href: "https://ctrlcccv.github.io/code/2025-06-20-javascript-hoisting/"
    hreflang: "ko"
  - title: "JavaScript Hoisting: Master TDZ and Function Behavior" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-23-javascript-hoisting"
    hreflang: "en"
    
categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 호이스팅
    - TDZ
---

> 💡 [스코프](/code/2025-06-16-javascript-scope/)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.

자바스크립트를 배우다 보면 변수를 선언하기 전에 사용했는데 에러가 나지 않거나, 예상과 다른 결과가 나와서 "어? 이게 왜 이렇게 동작하지?"라고 당황한 적이 있으실 거예요.

저도 처음 자바스크립트를 배울 때 이런 상황을 마주했는데, 특히 `var`로 선언한 변수가 선언 전에도 `undefined`로 출력되는 걸 보고 완전히 혼란스러웠어요. 그런데 호이스팅의 개념을 정확히 알고 나니, 자바스크립트 코드의 동작을 예측할 수 있게 되었고 더 안전한 코드를 작성할 수 있게 되었습니다.

이 글에서는 자바스크립트 호이스팅의 모든 것을 명확하게 알려드릴게요. `var`, `let`, `const`의 호이스팅 차이점부터 TDZ(Temporal Dead Zone)라는 중요한 개념까지, 어려운 이론보다는 직접 손으로 따라 할 수 있는 실제 코드 예제를 중심으로 설명해 드리겠습니다.

호이스팅의 기본 개념부터 실무에서 자주 만나는 함정과 해결법까지, 실제 코드 예제와 함께 단계별로 살펴봅니다. 이 글을 다 읽고 나면 "왜 이 코드는 에러가 나지 않을까?"라는 의문이 완전히 해결될 거예요.

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

## 자바스크립트 호이스팅 핵심 정의

**자바스크립트 호이스팅이란?**

호이스팅(Hoisting)은 변수와 함수 선언이 코드 실행 전에 해당 스코프의 맨 위로 "끌어올려지는" 것처럼 동작하는 자바스크립트의 특성입니다. 정확히는 자바스크립트 엔진이 코드를 실행하기 전에 변수와 함수의 이름을 메모리에 미리 등록하는 과정으로, 선언만 끌어올려지고 할당(값 대입)은 원래 위치에서 이루어집니다.

<br>

## 왜 호이스팅을 알아야 할까요?

실제 프로젝트에서는 코드가 수백, 수천 줄이 되는데, 호이스팅을 모르면 예상치 못한 버그가 발생할 수 있어요. 특히 React 같은 프레임워크를 배우기 전에 호이스팅을 확실히 이해해 두면, 컴포넌트 내에서 변수를 다룰 때 훨씬 안전하게 코드를 작성할 수 있습니다.  

<br>

## var로 선언한 변수의 호이스팅 동작

`var`로 선언한 변수는 호이스팅 되면서 `undefined`로 자동 초기화됩니다. 이게 다른 언어와 가장 큰 차이점이에요.

<br>

### var 호이스팅의 기본 동작

```javascript
// ❌ 이렇게 쓰면 헷갈려요
console.log(userName); // undefined (에러가 아님!)
var userName = "김철수";
console.log(userName); // "김철수"
```

위 코드는 실제로 다음과 같이 동작합니다.

```javascript
// ✅ 실제 동작 방식 (자바스크립트 엔진이 내부적으로 처리)
var userName; // 선언이 위로 끌어올려지고 undefined로 초기화
console.log(userName); // undefined
userName = "김철수"; // 할당은 원래 위치에서
console.log(userName); // "김철수"
```

<br>

### 함수 내에서 var 호이스팅

```javascript
function userProfile() {
    console.log("사용자 이름:", name); // undefined
    console.log("사용자 나이:", age); // undefined
    
    var name = "이영희";
    var age = 25;
    
    console.log("사용자 이름:", name); // "이영희"
    console.log("사용자 나이:", age); // 25
}

userProfile();
```

**var의 특징:**
1. **선언과 초기화가 동시에 발생** - 호이스팅 시점에 `undefined`로 초기화됩니다.
2. **함수 스코프** - 블록 내부에서 선언해도 함수 전체에서 접근 가능합니다.
3. **재선언 허용** - 같은 이름으로 여러 번 선언할 수 있습니다.

<br>

## let과 const의 호이스팅과 TDZ

`let`과 `const`도 호이스팅 되지만, `var`와는 다르게 TDZ(Temporal Dead Zone) 때문에 선언 전에는 접근할 수 없어요.

<br>

### let과 const의 기본 동작

```javascript
// ❌ 이렇게 하면 에러가 발생해요
console.log(productName); // ReferenceError: Cannot access 'productName' before initialization
let productName = "아이폰";

console.log(companyName); // ReferenceError: Cannot access 'companyName' before initialization  
const companyName = "애플";
```

<br>

### TDZ(Temporal Dead Zone)란?

TDZ는 `let`과 `const` 변수가 선언되기 전까지 접근할 수 없는 구간을 말합니다. 이 구간에서는 변수가 마치 존재하지 않는 것처럼 동작해요.

```javascript
function shoppingCart() {
    // 여기서부터 cartItems의 TDZ 시작
    console.log(cartItems); // ReferenceError!
    
    let cartItems = ["노트북", "마우스"]; // 여기서 TDZ 끝
    console.log(cartItems); // ["노트북", "마우스"]
}
```

<br>

### TDZ의 범위와 섀도잉

```javascript
let globalMessage = "전역 메시지";

function testTDZ() {
    console.log(globalMessage); // "전역 메시지" (정상 접근)
    
    if (true) {
        console.log(globalMessage); // ReferenceError! (블록 내 호이스팅 때문)
        let globalMessage = "지역 메시지"; // 여기서 TDZ 끝
        console.log(globalMessage); // "지역 메시지"
    }
    
    console.log(globalMessage); // "전역 메시지" (블록 벗어남)
}
```

**let과 const의 특징:**
1. **선언은 되지만 초기화는 안 됨** - 선언문에 도달해야 초기화됩니다.
2. **블록 스코프** - 선언된 블록 내에서만 유효합니다.
3. **재선언 금지** - 같은 스코프에서 중복으로 선언할 수 없습니다.

<br>

## 함수 호이스팅의 특별한 동작

함수는 변수와 다르게 호이스팅 동작이 특별해요. 함수 선언문과 함수 표현식의 차이를 알아보겠습니다.

<br>

### 함수 선언문 호이스팅

```javascript
// ✅ 함수 선언문은 완전히 호이스팅됩니다 
sayHello(); // "안녕하세요!" - 정상 작동!

function sayHello() {
    console.log("안녕하세요!");
}
```


### 함수 표현식 호이스팅

```javascript
// ❌ 함수 표현식은 변수 호이스팅 규칙을 따릅니다
console.log(greetUser); // undefined
greetUser(); // TypeError: greetUser is not a function

var greetUser = function() {
    console.log("사용자님 환영합니다!");
};
```

### 화살표 함수와 호이스팅

```javascript
// ❌ 화살표 함수도 변수 호이스팅 규칙을 따릅니다
console.log(calculateTotal); // ReferenceError!
const calculateTotal = (price) => price * 1.1;
```

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

## 블록 스코프에서의 호이스팅 동작

`let`과 `const`는 자신이 선언된 블록 스코프에서만 호이스팅 됩니다. 이 부분이 가장 헷갈리는 부분인데, 실제 코드로 살펴볼게요.

<br>

### 블록별 독립적 호이스팅

```javascript
let userCount = 100;

function checkUserLimit() {
    console.log("함수 시작:", userCount); // 100 (정상 접근)
    
    if (userCount > 50) {
        console.log("조건문 내부:", userCount); // ReferenceError!
        let userCount = 200; // 블록 내 새로운 변수
        console.log("조건문 내부 (초기화 후):", userCount); // 200
    }
    
    console.log("함수 종료:", userCount); // 100 (다시 전역 변수)
}
```

### 실무에서 자주 하는 실수

```javascript
// ❌ for문에서 var 사용 시 의도치 않은 동작
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var 사용:", i); // 모두 3이 출력됨
    }, 100);
}

// ✅ let 사용으로 문제 해결
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let 사용:", j); // 0, 1, 2가 순서대로 출력
    }, 100);
}
```

<br>

## 실무에서 주의해야 할 호이스팅 함정들

제가 실무를 하면서 직접 겪었거나, 팀원들이 자주 하는 실수를 정리해 봤어요.

<br>

### 에러 발생 시 실행 완전 중단

```javascript
function processUserData() {
    console.log("데이터 처리 시작");
    console.log(undefinedVariable); // ReferenceError!
    console.log("이 줄은 절대 실행되지 않음");
}

// processUserData(); // 함수 호출 시 에러로 인해 프로그램 중단
```

`ReferenceError`가 발생하면 그 지점에서 실행이 완전히 중단됩니다. 이는 실무에서 매우 중요한 포인트예요.

<br>

### var의 블록 스코프 무시 문제

```javascript
function handleUserLogin(isLoggedIn) {
    if (isLoggedIn) {
        var welcomeMessage = "로그인되었습니다!";
    }
    
    // ❌ 블록 밖에서도 접근 가능 (의도치 않은 동작)
    console.log(welcomeMessage); // "로그인되었습니다!" 또는 undefined
}

// ✅ let을 사용하면 블록 스코프를 지킵니다
function handleUserLogin2(isLoggedIn) {
    if (isLoggedIn) {
        let welcomeMessage = "로그인되었습니다!";
        console.log(welcomeMessage); // 블록 내에서만 사용
    }
    
    // console.log(welcomeMessage); // ReferenceError!
}
```

<br>

### 현대 자바스크립트 모범 사례

1. `var` 대신 `let`과 `const` 사용하기
```javascript
// ❌ 피해야 할 방식
var productPrice = 29900;

// ✅ 권장 방식
const productPrice = 29900; // 변경하지 않을 값
let userAge = 25; // 변경 가능한 값
```

2. 변수는 사용하기 전에 선언하기
```javascript
// ✅ 좋은 습관
const userName = "김영수";
const userEmail = "youngsoo@email.com";

console.log(`사용자: ${userName}, 이메일: ${userEmail}`);
```

3. 적절한 스코프 범위 설정하기
```javascript
function calculateShippingCost(items) {
    let totalWeight = 0;
    
    for (const item of items) {
        // 반복문 내에서만 사용되는 변수는 블록 내 선언
        const itemWeight = item.weight || 0;
        totalWeight += itemWeight;
    }
    
    return totalWeight > 5 ? 3000 : 2500;
}
```

4. ESLint 같은 도구로 잠재적 문제 미리 찾기

<br>

## var vs let vs const 호이스팅 비교표

| 특성 | var | let | const |
|------|-----|-----|-------|
| **호이스팅 여부** | ✅ 됨 | ✅ 됨 | ✅ 됨 |
| **초기화 시점** | 선언과 동시 (`undefined`) | 선언문 도달 시 | 선언문 도달 시 |
| **TDZ 존재** | ❌ 없음 | ✅ 있음 | ✅ 있음 |
| **스코프** | 함수 스코프 | 블록 스코프 | 블록 스코프 |
| **재선언 가능** | ✅ 가능 | ❌ 불가능 | ❌ 불가능 |
| **재할당 가능** | ✅ 가능 | ✅ 가능 | ❌ 불가능 |
| **선언 전 접근** | `undefined` 반환 | `ReferenceError` | `ReferenceError` |

<br>

## 자주 묻는 질문들 (FAQ)

### Q1. 호이스팅이 일어나는 이유가 뭔가요?

호이스팅은 자바스크립트 엔진이 코드를 실행하기 전에, **컴파일 단계에서 변수와 함수 선언을 미리 메모리에 등록**하기 때문에 발생합니다. 이 과정은 자바스크립트의 <strong>실행 컨텍스트(Execution Context, 코드가 실행되는 환경을 관리하는 영역)</strong>가 만들어질 때 함께 진행돼요.

저도 이 개념을 처음 배웠을 때는 "왜 굳이 이렇게 복잡하게 동작할까?"라는 생각이 들었어요. 그런데 알고 보니, **자바스크립트 엔진이 코드를 더 빠르게 실행하고 최적화하기 위해** 이런 구조를 선택한 거더라고요.

특히 함수 선언문은 **미리 메모리에 등록되어 있기 때문에, 호출보다 나중에 선언해도 문제없이 실행**할 수 있다는 장점이 있어요. 이게 바로 호이스팅 덕분입니다!


<br>

### Q2. TDZ는 왜 만들어졌나요?

TDZ(Temporal Dead Zone)는 `let`과 `const`가 ES6에서 도입되면서, **더 안전한 코드를 작성할 수 있도록** 하기 위해 생긴 개념이에요. 기존에 쓰이던 `var`는 선언 전에 접근해도 에러가 나지 않아서, 예측하기 어려운 버그가 자주 발생했거든요.

제 경험상, TDZ 덕분에 **변수를 실수로 잘못 사용하는 경우가 확실히 줄어들었어요.** 선언 전에 접근하면 바로 에러가 나기 때문에, 문제를 더 빨리 찾아낼 수 있어요.

<br>

### Q3. 함수 선언문과 함수 표현식 중 어떤 걸 써야 하나요?

상황에 따라 다르지만, 최근에는 <strong>함수 표현식(특히 화살표 함수)</strong>을 더 많이 사용하는 추세예요. 

```javascript
// 함수 선언문 - 호이스팅으로 어디서든 호출 가능
function calculatePrice(quantity, unitPrice) {
    return quantity * unitPrice;
}

// 함수 표현식 - 선언 후에만 사용 가능 (더 예측 가능)
const calculatePrice = (quantity, unitPrice) => {
    return quantity * unitPrice;
};
```

저는 컴포넌트 내부의 작은 함수들은 화살표 함수를, 재사용성이 높은 유틸 함수는 함수 선언문을 사용하는 편이에요.

<br>

### Q4. React에서 호이스팅은 어떻게 영향을 주나요?

React 컴포넌트 내에서도 자바스크립트 호이스팅 규칙이 그대로 적용돼요. 특히 `useState`나 `useEffect` 같은 Hook을 사용할 때 변수 스코프를 잘 관리해야 해요.

```javascript
function UserProfile() {
    // ✅ Hook은 항상 컴포넌트 최상단에 선언
    const [userName, setUserName] = useState('');
    
    useEffect(() => {
        // ✅ effect 내부에서 사용할 변수는 적절한 스코프에 선언
        const fetchUserData = async () => {
            const data = await getUserInfo();
            setUserName(data.name);
        };
        
        fetchUserData();
    }, []);
    
    return <div>{userName}</div>;
}
```

<br>

### Q5. 호이스팅을 완전히 피할 수 있는 방법이 있나요?

완전히 피할 수는 없지만, **좋은 코딩 습관**으로 호이스팅으로 인한 문제를 최소화할 수 있어요.

1. 변수는 사용하기 직전에 선언하기
2. `const`를 우선 사용하고, 변경이 필요할 때만 `let` 사용하기
3. `var`는 사용하지 않기
4. ESLint 같은 도구로 잠재적 문제 미리 찾기

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

## 마무리: 호이스팅으로 더 나은 자바스크립트 개발자 되기

**핵심 요약:**
- 호이스팅은 선언만 끌어올리고 할당은 원래 위치에서 발생합니다.
- `var`는 `undefined`로 초기화되지만, `let`/`const`는 TDZ로 보호됩니다.
- 함수 선언문은 완전히 호이스팅되어 어디서든 호출 가능합니다.
- 블록 스코프에서 `let`/`const`는 해당 블록에서만 호이스팅됩니다.
- 현대 자바스크립트에서는 `const` → `let` → `var` 순으로 사용하는 것이 좋습니다.


오늘 배운 호이스팅 개념으로 간단한 **사용자 로그인 상태 관리** 함수를 만들어보세요. `const`와 `let`을 적절히 활용하면서 블록 스코프도 고려해 보면 좋을 것 같아요. 실제로 코드를 작성하면서 호이스팅 동작을 체험해 보는 게 가장 빠른 학습 방법이거든요.

다음 글에서는 [자바스크립트 함수 표현식](/code/2025-06-24-function-expression/)에 대해 다뤄보겠습니다. 호이스팅을 이해하셨다면 함수 선언문과 함수 표현식의 호이스팅 차이점도 쉽게 이해하실 수 있을 거예요!

여러분의 자바스크립트 호이스팅 학습 경험은 어떠셨나요? 어려웠던 부분이나 추가로 궁금한 점이 있다면 댓글로 공유해주세요! 실무에서 호이스팅 때문에 겪었던 경험담도 환영해요. 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Glossary/Hoisting">JavaScript 호이스팅 - MDN 문서</a>
</div>


