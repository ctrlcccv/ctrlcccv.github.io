---
title: >  
    JS 변수 선언법: var 대신 let과 const를 써야 하는 이유
    
description: >  
    var 때문에 발생하는 버그 사례부터 let과 const의 차이점, 객체 내부 변경까지 현대 자바스크립트 변수 선언법을 초보자도 쉽게 이해할 수 있도록 상세히 알려드립니다.

slug: 2025-06-26-let-const
date: 2025-06-26 00:00:00+0000
lastmod: 2025-06-26 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-26-let-const.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - ES6
    - 문법
---
> 💡 [스코프](/code/2025-06-16-javascript-scope/)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.  

자바스크립트를 배우다 보면 변수 선언할 때 `var`, `let`, `const` 중 어떤 걸 써야 할지 고민이 되죠? 

저도 처음엔 "변수 선언은 다 똑같은 거 아닌가?"라고 생각했는데, 실제 프로젝트에서 `var` 때문에 예상치 못한 버그를 겪고 나서야 그 차이점을 깨달았어요. 특히 반복문에서 `var`를 썼다가 모든 버튼이 같은 동작을 하는 황당한 상황을 경험했거든요.

이 글에서는 `var`가 왜 문제가 되는지, 그리고 `let`과 `const`를 언제 어떻게 써야 하는지 명확하게 알려드릴게요.

기본적인 변수 선언 문법부터 실무에서 자주 마주치는 함정들까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.  

<br>

## let과 const 핵심 요약

**let과 const**는 ES6에서 도입된 모던 자바스크립트 변수 선언 키워드입니다. `let`은 값이 변할 수 있는 변수를, `const`는 한 번 할당하면 변하지 않는 상수를 선언할 때 사용합니다. 둘 다 블록 스코프를 지원해 `var`보다 안전한 코딩이 가능합니다.

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

## var가 문제가 되는 3가지 이유

### 1. 블록 스코프를 무시하는 함수 스코프

`var`는 블록(`{}`) 안에서 선언해도 함수 전체에서 접근할 수 있어요. 이게 예상치 못한 문제를 만들어냅니다.

```javascript
function showMessage() {
    if (true) {
        var greeting = "안녕하세요";
    }
    console.log(greeting); // "안녕하세요" - 블록 밖에서도 접근 가능!
}

showMessage();
```

실제 프로젝트에서는 이런 일이 벌어져요.

```javascript
// ❌ 문제가 되는 코드
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 3, 3, 3 출력 (0, 1, 2가 아님!)
    }, 100);
}
```

모든 `setTimeout`이 같은 `i` 변수를 참조하기 때문에 반복문이 끝난 후의 값인 3만 출력돼요.

<br>

### 2. 중복 선언을 허용해서 실수하기 쉬움

```javascript
var username = "김철수";
var username = "이영희"; // 에러 없이 덮어씌워짐
console.log(username); // "이영희"
```

큰 프로젝트에서 같은 변수명을 실수로 다시 선언하면 기존 값이 사라져서 디버깅이 어려워져요.

<br>

### 3. 호이스팅으로 인한 예측 불가능한 동작

```javascript
console.log(score); // undefined (에러가 아님)
var score = 100;
```

선언 전에 변수를 사용해도 에러가 나지 않아서 버그를 찾기 어려워집니다.

📝 **참고**: [호이스팅](/code/2025-06-20-javascript-hoisting)이란 변수와 함수 선언이 코드 실행 전에 메모리에 먼저 등록되는 자바스크립트의 특성이에요.  
`var`는 호이스팅될 때 `undefined`로 초기화되어 예상치 못한 동작을 만들어냅니다.

<br>

## let: 값이 변하는 변수를 위한 선택

`let`은 변수 값을 나중에 바꿔야 할 때 사용해요. `var`의 문제점들을 모두 해결해줍니다.

<br>

### let 사용법과 특징

```javascript
let age = 25;
age = 26; // 값 변경 가능
console.log(age); // 26
```

<br>

### let의 블록 스코프 동작

```javascript
function testBlockScope() {
    if (true) {
        let message = "블록 안에서만 접근 가능";
        console.log(message); // "블록 안에서만 접근 가능"
    }
    // console.log(message); // ReferenceError 발생
}
```

<br>

### 반복문에서 let 사용하기

아까 `var`로 문제가 되었던 코드를 `let`으로 고쳐보면

```javascript
// ✅ 올바른 코드
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i); // 0, 1, 2 정상 출력
    }, 100);
}
```

`let`은 반복할 때마다 새로운 변수를 만들어서 각각의 값을 기억해요.

<br>

### let 사용 시 주의사항

1. **중복 선언 불가**: 같은 이름으로 다시 선언하면 에러가 나요.
2. **선언 전 사용 불가**: 호이스팅은 되지만 접근할 수 없어요.
3. **블록 스코프**: `{}` 밖에서는 접근할 수 없어요.

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

## const: 상수 선언의 올바른 이해

`const`는 한 번 값을 할당하면 바꿀 수 없는 상수를 만들 때 써요. 하지만 객체와 배열의 경우 조금 다르게 동작합니다.

<br>

### const 기본 사용법

```javascript
const PI = 3.14159;
const siteName = "내 블로그";

// PI = 3.14; // TypeError: Assignment to constant variable
```

<br>

### const 선언 시 필수 규칙

1. **선언과 동시에 값 할당 필수**

```javascript
// ❌ 이렇게 하면 에러
const name; // SyntaxError: Missing initializer

// ✅ 올바른 방법
const name = "김철수";
```

2. **한 번 할당하면 재할당 불가**

```javascript
const score = 100;
// score = 90; // TypeError 발생
```

<br>

### const와 객체/배열의 특별한 관계

여기서 많은 분들이 헷갈리는 부분이에요. `const`로 선언한 객체나 배열은 **내부 값을 변경할 수 있어요**.

```javascript
const student = {
    name: "김철수",
    age: 20
};

// ✅ 객체 속성 변경 가능
student.age = 21;
student.grade = "A";
console.log(student); // { name: "김철수", age: 21, grade: "A" }

// ❌ 객체 자체 재할당은 불가
// student = { name: "이영희" }; // TypeError
```

```javascript
const fruits = ["사과", "바나나"];

// ✅ 배열 내용 변경 가능
fruits.push("오렌지");
fruits[0] = "포도";
console.log(fruits); // ["포도", "바나나", "오렌지"]

// ❌ 배열 자체 재할당은 불가
// fruits = ["딸기"]; // TypeError
```

**왜 이런 일이 생길까요?**

`const`는 변수가 가리키는 메모리 주소를 고정해요. 객체나 배열의 경우 그 주소는 그대로 두고 안의 내용만 바뀌기 때문에 변경이 가능한 거예요.

<br>

## let과 const 올바른 사용 가이드

### 언제 어떤 걸 써야 할까요?

| 상황 | 사용할 키워드 | 예시 |
|------|-------------|------|
| 값이 변하지 않는 경우 | `const` | 설정값, API URL, 고정 메시지 |
| 값이 변해야 하는 경우 | `let` | 카운터, 사용자 입력, 반복문 변수 |
| 절대 사용하지 말 것 | `var` | - |

### 실무에서 자주 쓰는 패턴

#### 1. 기본은 const, 필요시 let

```javascript
// ✅ 기본적으로 const 사용
const userName = "김철수";
const maxRetry = 3;
const apiUrl = "https://api.example.com";

// ✅ 값이 변해야 할 때만 let
let currentPage = 1;
let isLoading = false;

for (let i = 0; i < 5; i++) {
    // 반복문에는 let 사용
}
```

#### 2. 객체와 배열은 거의 const

```javascript
// ✅ 대부분의 객체/배열은 const
const userInfo = {
    name: "김철수",
    email: "kim@example.com"
};

const todoList = [];

// 내용 변경은 자유롭게
userInfo.name = "이영희";
todoList.push("쇼핑하기");
```

#### 3. 함수도 const로 선언

```javascript
// ✅ 함수 표현식도 const 사용
const calculateTotal = (price, tax) => {
    return price + (price * tax);
};

const showMessage = function(text) {
    console.log(text);
};
```

### var에서 let/const로 마이그레이션 방법

기존 `var` 코드를 안전하게 바꾸는 단계예요.

1. 모든 `var`를 `const`로 바꿔보세요.
2. 값이 변경되는 곳에서 에러가 나면 `let`으로 변경하세요.
3. 테스트해서 정상 동작하는지 확인하세요.

```javascript
// ❌ 기존 var 코드
var name = "김철수";
var age = 25;
var hobbies = ["독서", "영화"];

// ✅ 1단계: 모두 const로 변경
const name = "김철수";
const age = 25;
const hobbies = ["독서", "영화"];

// ✅ 2단계: 값이 변하는 것만 let으로
const name = "김철수";
let age = 25; // 나이는 변할 수 있으니 let
const hobbies = ["독서", "영화"];
```

<br>

## 자주 하는 질문과 답변

### Q: const 객체의 속성을 변경할 수 없게 만들 방법이 있나요?

A: `Object.freeze()`를 사용하면 객체를 완전히 불변으로 만들 수 있어요.

```javascript
const user = Object.freeze({
    name: "김철수",
    age: 25
});

// user.age = 30; // 무시됨 (strict mode에서는 에러)
console.log(user.age); // 25 (변경되지 않음)
```

하지만 중첩된 객체까지는 freeze되지 않으므로 깊은 freeze가 필요하면 별도 함수를 만들어야 해요.

<br>

### Q: let과 const 둘 다 호이스팅이 일어나나요?

A: 네, 둘 다 호이스팅이 일어나지만 `var`와 달리 TDZ(Temporal Dead Zone) 때문에 선언 전에는 접근할 수 없어요.

```javascript
console.log(a); // ReferenceError (var였다면 undefined)
let a = 10;
```

<br>

### Q: 전역 변수는 어떻게 선언하는 게 좋나요?

A: 전역 변수도 `const`나 `let`을 사용하세요. `var`는 전역 객체의 속성이 되어 예상치 못한 충돌이 생길 수 있어요.

```javascript
// ✅ 좋은 방법
const GLOBAL_CONFIG = {
    theme: "dark",
    language: "ko"
};

// ❌ 피해야 할 방법
var theme = "dark"; // window.theme이 됨
```

<br>

### Q: 반복문에서 const를 쓸 수 있나요?

A: for...of나 for...in에서는 가능하지만, 일반 for문에서는 불가능해요.

```javascript
// ✅ 가능
const numbers = [1, 2, 3];
for (const num of numbers) {
    console.log(num); // 매번 새로운 const 변수 생성
}

// ❌ 불가능
for (const i = 0; i < 3; i++) { // 에러: i를 변경할 수 없음
    console.log(i);
}
```

<br>

### Q: 함수 내부에서도 let/const를 써야 하나요?

A: 네! 함수 내부에서도 블록 스코프가 중요해요. 특히 if문이나 반복문 안에서 변수를 선언할 때 더욱 안전합니다.

```javascript
function processData(data) {
    if (data.length > 0) {
        const result = data.map(item => item * 2);
        return result;
    }
    // result는 여기서 접근 불가 (안전함)
}
```

<br>

## 마무리

let과 const를 올바르게 사용하는 것만으로도 자바스크립트 코드가 훨씬 안전하고 예측 가능해집니다.

**핵심 포인트 정리:**
- 기본적으로 `const`를 사용하고, 값이 변해야 할 때만 `let`을 써요.
- `var`는 레거시 코드가 아닌 이상 사용하지 마세요.
- `const` 객체/배열의 내부 값은 변경 가능하다는 점을 기억하세요.
- 블록 스코프 덕분에 변수 충돌 위험이 크게 줄어들어요.

오늘 배운 내용으로 간단한 할 일 목록 앱을 만들어보세요. 어떤 변수는 `const`로, 어떤 건 `let`으로 선언할지 고민해보는 것만으로도 좋은 연습이 될 거예요.

다음 글에서는 자바스크립트의 원시타입과 참조타입의 차이점, 그리고 각각의 복사 방식에 대해 자세히 알아보겠습니다.

여러분의 변수 선언 경험은 어떠셨나요? 특히 `var`로 인해 겪었던 버그나 `const` 사용하면서 헷갈렸던 점이 있다면 댓글로 공유해주세요! 🚀

<br>
