---
title: >  
    자바스크립트 함수 표현식 가이드 - 실무에서 바로 쓰는 핵심 정리

description: >  
    자바스크립트 함수 표현식의 모든 것을 쉽게 설명합니다. 함수 선언문과의 차이점, 호이스팅, 콜백 함수 사용법까지 실제 코드 예제로 완벽하게 마스터하세요.

slug: 2025-06-24-function-expression
date: 2025-06-24 00:00:00+0000
lastmod: 2025-06-24 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-24-function-expression.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 함수 표현식
    - 호이스팅
---

> 💡 [스코프](/code/2025-06-16-javascript-scope/), [호이스팅](/code/2025-06-25-javascript-hoisting/)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.  

자바스크립트를 배우다 보면 함수를 정의하는 방법이 여러 가지라는 걸 알게 되죠. 특히 함수 표현식을 처음 접했을 때 "이게 언제 쓰이는 거지?"라고 의문을 품는 경우가 많아요.

저도 처음엔 함수 선언문만 사용하다가, 이벤트 처리를 배우면서 함수 표현식을 만났는데요. "왜 똑같은 함수인데 이렇게 복잡하게 써야 하지?"라고 생각했었어요. 하지만 함수 표현식의 특성을 제대로 알고 나니, 언제 어떻게 써야 하는지 명확해지더라고요.

이 글에서는 함수 표현식이 무엇인지부터 실무에서 어떻게 활용하는지까지 명확하게 알려드릴게요. 호이스팅의 차이점부터 콜백 함수 사용법까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.

<br>

## 자바스크립트 함수 표현식 핵심 요약

**함수 표현식(Function Expression)이란?**  
함수를 값처럼 취급해서 변수에 할당하거나 다른 함수의 인자로 전달할 수 있는 방식입니다. 함수 선언문과 달리 호이스팅 시 함수 전체가 끌어올려지지 않아 정의 후에만 사용할 수 있습니다.

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

## 함수 표현식이 뭔가요?

함수 표현식은 **함수를 하나의 값으로 보는 관점**에서 시작해요. 마치 숫자나 문자열을 변수에 저장하듯이, 함수도 변수에 저장할 수 있다는 거죠.

실제 프로젝트에서는 이벤트 처리, 콜백 함수, 조건부 함수 생성 등 다양한 상황에서 활용됩니다. 특히 React를 배우기 전에 이 개념을 확실히 해두면, 나중에 이벤트 핸들러나 useEffect 훅을 이해하기 훨씬 쉬워져요.

```javascript
// 함수 선언문 - 이건 이미 익숙하죠?
function sayHello() {
    console.log("안녕하세요!");
}

// 함수 표현식 - 함수를 변수에 저장!
const greetUser = function() {
    console.log("반갑습니다!");
};

// 둘 다 똑같이 호출할 수 있어요
sayHello();    // "안녕하세요!"
greetUser();   // "반갑습니다!"
```

함수 표현식의 핵심은 **함수가 표현식의 일부**가 된다는 것이에요. 즉, 함수 자체가 하나의 값이 되는 거죠.

<br>

### 함수 표현식을 구분하는 방법

| 구분 | 함수 선언문 | 함수 표현식 |
|------|-------------|-------------|
| 형태 | `function 이름() {}` | `const 변수 = function() {}` |
| 위치 | 독립적인 문(Statement) | 표현식의 일부 |
| 사용 시점 | 선언 전 사용 가능 | 정의 후 사용 가능 |

<br>

## 언제 함수 표현식을 사용해야 할까요?

제가 함수 표현식을 가장 많이 사용하는 상황들을 정리해 봤어요.

<br>

### 1. 이벤트 핸들러로 사용할 때

```javascript
// 버튼 클릭 시 실행할 함수
const handleButtonClick = function() {
    alert("버튼이 클릭되었습니다!");
    console.log("사용자 액션 기록됨");
};

// 이벤트 리스너에 함수 연결
document.getElementById('myButton').addEventListener('click', handleButtonClick);
```

### 2. 조건에 따라 다른 함수를 사용할 때

```javascript
const userRole = "admin"; // 실제로는 로그인 정보에서 가져옴

// 사용자 권한에 따라 다른 메뉴 함수를 할당
const getMenuList = userRole === "admin" 
    ? function() { 
        return ["대시보드", "사용자 관리", "설정"]; 
      }
    : function() { 
        return ["홈", "프로필", "도움말"]; 
      };

console.log(getMenuList()); // admin이면 관리자 메뉴 출력
```

### 3. 콜백 함수로 전달할 때

```javascript
const numbers = [1, 2, 3, 4, 5];

// 배열의 각 요소를 2배로 만드는 함수
const doubleNumbers = numbers.map(function(num) {
    return num * 2;
});

console.log(doubleNumbers); // [2, 4, 6, 8, 10]

// setTimeout에서도 자주 사용해요
setTimeout(function() {
    console.log("3초 후에 실행됩니다!");
}, 3000);
```

<br>

<div class="btn_wrap">
    <a href="/code/2025-06-09-javascript-callback/">[관련글] JavaScript 콜백 함수(Callback function) 쉽게 이해하기</a>
</div>

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

## 호이스팅에서 가장 많이 실수하는 부분

이 부분이 정말 중요해요! 저도 처음에 이 차이를 몰라서 몇 번 당황했던 기억이 있어요.

<br>

### 함수 선언문의 호이스팅

```javascript
// ✅ 이건 잘 동작해요 (함수 선언문)
console.log(sayHello()); // "안녕하세요!" 출력

function sayHello() {
    return "안녕하세요!";
}
```

함수 선언문은 호이스팅될 때 **함수 전체**가 메모리에 올라가서 선언 전에도 사용할 수 있어요.

<br>

### 함수 표현식의 호이스팅

```javascript
// ❌ 이건 에러가 발생해요 (함수 표현식)
console.log(greetUser()); // ReferenceError: Cannot access 'greetUser' before initialization

const greetUser = function() {
    return "반갑습니다!";
};
```

함수 표현식은 변수 호이스팅 규칙을 따라서 **변수만** 호이스팅되고, 함수 할당은 코드 실행 시점에 이루어져요.

<br>

### 호이스팅 비교표

| 특성 | 함수 선언문 | 함수 표현식 |
|------|-------------|-------------|
| 선언 전 사용 | ✅ 가능 | ❌ 불가능 (ReferenceError) |
| 호이스팅 | 함수 전체 | 변수명만 |
| TDZ 적용 | ❌ 없음 | ✅ 적용 |

<br>

## 실무에서 자주 하는 실수들

제가 신입 때 했던 실수를 공유해볼게요. 여러분은 이런 실수 안 하셨으면 좋겠어요!

<br>

### 실수 1: 괄호 사용법 헷갈리기

```javascript
const showAlert = function() {
    alert("알림창 표시!");
};

// ❌ 잘못된 방법 - 함수를 즉시 실행해버림
button.addEventListener('click', showAlert());

// ✅ 올바른 방법 - 함수 자체를 전달
button.addEventListener('click', showAlert);
```

**기억하세요.**
- `showAlert` → 함수 자체를 전달 (나중에 실행)
- `showAlert()` → 함수를 지금 당장 실행 (결과값 전달)

<br>

### 실수 2: 정의 순서 무시하기

```javascript
// ❌ 이렇게 하면 에러 발생
const result = calculate(10, 5); // ReferenceError!

const calculate = function(a, b) {
    return a + b;
};

// ✅ 이렇게 해야 정상 동작
const calculate = function(a, b) {
    return a + b;
};

const result = calculate(10, 5); // 15
```

<br>

## 화살표 함수와 함수 표현식

ES6에서 도입된 화살표 함수도 함수 표현식의 한 종류예요. 더 간결하게 쓸 수 있어서 요즘 많이 사용하죠.

<br>

### 기본 변환 방법

```javascript
// 일반 함수 표현식
const add = function(a, b) {
    return a + b;
};

// 화살표 함수로 변환
const add = (a, b) => {
    return a + b;
};

// 더 간단하게 (한 줄인 경우 return 생략 가능)
const add = (a, b) => a + b;
```

### 실무 활용 예시

```javascript
const users = [
    { name: "김민수", age: 25 },
    { name: "이영희", age: 30 },
    { name: "박철수", age: 28 }
];

// 일반 함수 표현식
const adultUsers = users.filter(function(user) {
    return user.age >= 25;
});

// 화살표 함수로 더 간결하게
const adultUsers = users.filter(user => user.age >= 25);
```

💡 **팁**: [화살표 함수](/code/2024-03-06-arrow-function/)도 동일한 호이스팅 규칙을 따라요. 정의 후에만 사용할 수 있다는 점 기억하세요!

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

## 실전 예제: 쇼핑몰 장바구니 구현

실제로 쇼핑몰 장바구니 기능을 만들면서 함수 표현식을 어떻게 활용하는지 보여드릴게요.

```javascript
// 장바구니 관련 함수들을 객체로 관리
const shoppingCart = {
    items: [],
    
    // 상품 추가 함수
    addItem: function(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        console.log(`${product.name}이(가) 장바구니에 추가되었습니다.`);
    },
    
    // 상품 제거 함수
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        console.log("상품이 장바구니에서 제거되었습니다.");
    },
    
    // 총 금액 계산 함수
    getTotal: function() {
        return this.items.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }
};

// 사용 예시
const product1 = { id: 1, name: "노트북", price: 1000000 };
const product2 = { id: 2, name: "마우스", price: 30000 };

shoppingCart.addItem(product1);
shoppingCart.addItem(product2);

console.log(`총 금액: ${shoppingCart.getTotal().toLocaleString()}원`);
```

이 예시에서 모든 메서드들이 함수 표현식으로 정의되어 있어요. 객체 내부에서 함수를 정의할 때는 이런 방식을 주로 사용해요.

<br>

## 자주 묻는 질문들

### Q1. 함수 표현식과 함수 선언문 중 어느 것을 써야 하나요?

**답변**: 상황에 따라 다르지만, 저는 이런 기준으로 선택해요.

- **함수 선언문**: 전역에서 공통으로 사용하는 유틸리티 함수
- **함수 표현식**: 특정 상황에서만 사용하거나, 조건부로 생성하는 함수

함수 표현식을 사용하면 코드의 실행 순서를 더 명확하게 파악할 수 있어서, 가독성 측면에서도 좋아요.

<br>

### Q2. const와 let 중 어느 것으로 함수 표현식을 선언해야 하나요?

**답변**: 대부분의 경우 `const`를 사용하는 것을 추천해요. 함수를 재할당할 일은 거의 없고, 실수로 변경하는 것을 방지할 수 있거든요.

```javascript
// ✅ 추천하는 방법
const calculateTax = function(price) {
    return price * 0.1;
};

// ❌ 권장하지 않는 방법 (재할당 위험)
let calculateTax = function(price) {
    return price * 0.1;
};
```

<br>

### Q3. 익명 함수와 함수 표현식은 같은 건가요?

**답변**: 비슷하지만, 정확히는 다른 개념이에요. 

- **익명 함수**: 이름이 없는 함수
- **함수 표현식**: 함수를 표현식으로 사용하는 방식

익명 함수가 함수 표현식으로 사용되는 경우가 많아서 헷갈리는 경우가 있어요.

```javascript
// 익명 함수를 함수 표현식으로 사용
const greet = function() { return "안녕!"; };

// 기명 함수를 함수 표현식으로 사용
const greet = function sayHello() { return "안녕!"; };
```

<br>

### Q4. 호이스팅 때문에 함수 표현식을 사용하는 게 더 안전한가요?

**답변**: 네, 맞아요! 함수 표현식을 사용하면 "정의 후 사용" 원칙이 강제되어서 코드의 실행 순서를 예측하기가 더 쉬워져요. 
실제로 많은 개발팀에서 일관성을 위해 함수 표현식을 주로 사용하는 코딩 컨벤션을 따르고 있어요.

<br>

### Q5. React를 배울 때 함수 표현식을 어떻게 활용하나요?

**답변**: React에서는 함수 표현식이 정말 많이 사용돼요! 특히 이런 상황에서요.

```javascript
// 이벤트 핸들러
const handleClick = function() {
    console.log("버튼 클릭됨!");
};

// useEffect의 콜백 함수
useEffect(function() {
    // 부수 효과 처리
}, []);

// 조건부 렌더링
const renderButton = isLoggedIn 
    ? function() { return <LogoutButton />; }
    : function() { return <LoginButton />; };
```

지금 함수 표현식을 확실히 이해해 두시면, React 배울 때 훨씬 수월할 거예요!

<br>

## 마무리

함수 표현식의 핵심을 정리하면 이렇습니다.

- **함수를 값으로 취급**해서 변수에 저장하거나 다른 함수에 전달할 수 있어요.
- **호이스팅 시 변수만 끌어올려져서** 정의 후에만 사용할 수 있어요.
- **이벤트 처리, 콜백 함수, 조건부 함수 생성** 등에서 활용도가 높아요.
- **코드의 실행 순서가 명확해져서** 예측할 수 있는 코드를 작성할 수 있어요.

오늘 배운 내용으로 간단한 계산기나 할 일 목록 앱을 만들어보세요. 특히 버튼 클릭 이벤트를 처리할 때 함수 표현식을 활용해 보시면 개념이 더 확실해질 거예요.

다음 글에서는 자바스크립트 변수 선언법에 대해 다뤄보겠습니다. 함수 표현식을 `const`로 선언하는 이유와 `var`, `let`, `const`의 차이점을 알아보면서 더 안전한 코드 작성법을 배워보세요!

여러분의 함수 표현식 학습 경험은 어떠셨나요? 헷갈렸던 부분이나 궁금한 점이 있다면 댓글로 공유해주세요! 함께 이야기 해보면서 더 깊이 이해해 봐요. 😊

<br>
