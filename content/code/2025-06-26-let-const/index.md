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

변수를 선언할 때 `var`, `let`, `const` 중 어떤 것을 써야 할지 고민해 본 적 있으신가요?

특히 `var`는 오래된 방식이라 실수하기 쉽고, 예상하지 못한 버그를 만드는 주범입니다. 그래서 최신 자바스크립트 개발자들은 `let`과 `const`를 쓰도록 권장하는데요.

하지만 `let`과 `const`도 정확히 어떻게 다른지, 언제 써야 하는지 모르면 실무에서 헷갈릴 때가 많습니다. 이번 글에서는 `var`가 왜 문제인지, 그리고 `let`과 `const`를 어떻게 올바르게 사용하는지, 그리고 `const`로 선언한 객체의 내부 값을 변경할 때 주의할 점까지 쉽게 설명해 드리겠습니다.

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

## var 사용으로 생기는 대표적인 문제 3가지

### 1. 함수 스코프만 지원하고 블록 스코프를 무시합니다.

```javascript
if (true) {
    var message = "var는 블록 스코프를 무시합니다";
}
console.log(message); // "var는 블록 스코프를 무시합니다"
```

`var`로 선언한 변수는 `if`, `for` 같은 블록 안에 있어도 함수 전체에서 접근할 수 있습니다. 이 때문에 의도치 않은 변수 값 변경이나 충돌이 생길 수 있습니다.

💡 **실무 예시**: 반복문에서 `var`를 사용하면 예상과 다른 결과가 나올 수 있습니다.

<br>

### 2. 중복 선언을 허용해 변수 덮어쓰기가 쉽습니다.

```javascript
var name = "철수";
var name = "영희"; // 에러 없이 재선언됨
console.log(name); // "영희"
```

변수를 다시 선언해도 에러가 나지 않으니, 실수로 변수명이 겹치면 디버깅이 어려워집니다.

<br>

### 3. 호이스팅으로 인해 코드 예측이 어려워집니다.

```javascript
console.log(count); // undefined (에러가 아님)
var count = 10;
```

`var` 변수 선언은 코드 최상단으로 끌어올려지는 [호이스팅](/code/2025-06-25-javascript-hoisting)이 발생해, 선언 전에 변수를 참조해도 `undefined`를 반환합니다. 이 동작은 초보자에게 매우 혼란스럽습니다.

📝 **참고**: 호이스팅이란 변수와 함수 선언이 코드 실행 전에 메모리에 등록되는 자바스크립트의 특성입니다.

<br>

## let: 바뀌는 값을 위한 변수 선언법

`let`은 변수 값을 나중에 변경할 필요가 있을 때 사용합니다. `var`와 달리 블록 스코프를 지원해 안전합니다.

```javascript
let age = 20;
age = 21;  // 재할당 가능
console.log(age); // 21
```

### 블록 스코프가 적용됩니다.

```javascript
if (true) {
    let message = "안녕하세요";
    console.log(message); // "안녕하세요"
}
// console.log(message); // ReferenceError: message is not defined
```

블록 밖에서 `message`를 호출하면 에러가 납니다. 이는 변수가 예상치 못한 곳에서 사용되는 것을 방지합니다.

<br>

### 중복 선언을 금지합니다.

```javascript
let score = 100;
let score = 90; // SyntaxError 발생
```

같은 이름으로 재선언할 수 없어서 실수를 방지할 수 있습니다.

<br>

### 반복문에서 안전하게 사용할 수 있습니다.

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i);
}
// console.log(i); // ReferenceError: i is not defined
```
`let`은 반복문마다 새로운 스코프를 생성하므로, 반복문 변수 선언에 가장 적합한 키워드입니다.

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

## const: 상수 선언이지만 객체와 배열 내부는 수정 가능합니다.

`const`는 한 번 할당한 값을 바꾸지 않을 때 사용합니다. 선언과 동시에 초기화가 필수입니다.

📝 **참고**: 상수(常數, constant)는 "항상 같은 수"라는 뜻으로, 한 번 정해지면 변하지 않는 값을 말합니다. 예를 들어 원주율 π(3.14159...)나 API 주소처럼 프로그램 실행 중에 바뀌지 않는 값들이 상수입니다.

```javascript
const birthday = "2000-01-01";
// birthday = "2001-01-01"; // TypeError 발생
```

<br>

### 선언과 동시에 값을 할당해야 합니다.

```javascript
const name; // ❌ SyntaxError: Missing initializer in const declaration
name = "철수"; // 이렇게 나중에 할당할 수 없습니다

const name = "철수"; // ✅ 올바른 사용법
```

<br>

### 객체와 배열은 내부 수정이 가능합니다.

이 부분이 많은 개발자들이 헷갈리는 포인트입니다.

```javascript
const person = { name: "철수", age: 20 };
person.age = 21; // ✅ 가능! 객체의 속성은 변경 가능
console.log(person.age); // 21

// person = { name: "영희" }; // ❌ TypeError 발생
```

```javascript
const fruits = ["사과", "바나나"];
fruits.push("오렌지"); // ✅ 가능! 배열의 내용은 변경 가능
console.log(fruits); // ["사과", "바나나", "오렌지"]

// fruits = ["포도"]; // ❌ TypeError 발생
```

💡 **핵심**: `const`는 변수가 참조하는 메모리 주소를 고정하지만, 그 주소에 있는 객체와 배열의 내용은 자유롭게 변경할 수 있습니다.

<br>

## 실전 팁 - let과 const 올바르게 쓰는 방법

### 1. 기본은 `const` 사용하기

값이 변하지 않는 변수는 무조건 `const`로 선언하세요. 실수로 변경하는 일을 방지할 수 있습니다.

```javascript
const PI = 3.14159;
const API_URL = "https://api.example.com";
const colors = ["red", "green", "blue"];
```

<br>

### 2. 값이 변해야 할 때만 `let` 사용하기

반복문 카운터, 사용자 입력값 등 값이 바뀌는 경우에만 `let`을 사용합니다.

```javascript
let count = 0;
for (let i = 0; i < 10; i++) {
    count += i;
}
```

<br>

### 3. `var`는 사용하지 말기

레거시 코드가 아니라면 `var` 사용은 피하고 `let`, `const`로 모두 교체하세요.

<br>

### 4. 리팩토링 가이드

기존 `var` 코드를 `const`로 먼저 바꾸고, 필요시 `let`으로 수정하는 게 안전합니다.

💡 **팁**: 처음에는 모든 변수를 `const`로 선언하고, 값을 변경해야 할 때만 `let`으로 바꾸는 습관을 기르면 좋습니다.


<br>


## 자주 발생하는 오류 Q&A + 퀴즈

다음 코드를 보고 각 줄의 실행 결과를 예측해 보세요.

```javascript
const student = {
    name: "김철수",
    scores: [90, 85, 88],
    info: { grade: 3, class: 2 }
};

console.log(student.name);  // 1
student.name = "이영희";
console.log(student.name);  // 2

student.scores.push(92);
console.log(student.scores); // 3

student.info.grade = 4;
console.log(student.info.grade); // 4

student.newProperty = "추가됨";
console.log(student.newProperty); // 5

// student = { name: "박민수" }; // 6
```

**문제**: 1~5번 `console.log` 출력값은 무엇일까요? 6번 주석을 해제하면 어떤 오류가 발생할까요?

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="각 console.log의 출력 결과와 6번 주석 해제 시 발생하는 오류를 작성해 주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

<br>

**정답:**

1. `"김철수"`
2. `"이영희"` (객체 속성은 변경 가능)
3. `[90, 85, 88, 92]` (배열 내부 값 변경 가능)
4. `4` (중첩 객체 속성도 변경 가능)
5. `"추가됨"` (새 속성 추가 가능)
6. **TypeError: Assignment to constant variable** (객체 자체 재할당은 불가)

**해설:**

`const`로 선언된 객체의 특성을 잘 보여주는 예제입니다.

* **객체 속성 변경 가능**: `student.name`을 "김철수"에서 "이영희"로 바꿀 수 있습니다.
* **배열 내부 변경 가능**: `scores` 배열에 새로운 값을 추가할 수 있습니다.
* **중첩 객체 변경 가능**: `info.grade`처럼 객체 안의 객체 속성도 변경할 수 있습니다.
* **새 속성 추가 가능**: 기존에 없던 `newProperty`를 추가할 수 있습니다.
* **객체 자체 재할당 불가**: `student` 변수에 새로운 객체를 할당하려면 TypeError가 발생합니다.

**핵심 포인트**: `const`는 변수가 참조하는 메모리 주소를 고정하지만, 그 주소에 있는 객체의 내용은 자유롭게 변경할 수 있습니다.

</details>

<br>

## 결론

`let`과 `const`를 올바르게 쓰는 법만 알아도 코드 안정성과 가독성이 크게 높아집니다.

기본적으로는 `const`를 쓰고, 변해야 할 때만 `let`으로 선언하는 습관을 들이세요. 그리고 `var`는 레거시 코드가 아닌 이상 사용하지 마세요.

이 글이 자바스크립트 변수 선언에 대한 이해에 도움이 되셨나요? 변수 선언할 때 가장 헷갈렸던 점이나 실무에서 겪은 사례가 있다면 댓글로 공유해주세요!

<br>
