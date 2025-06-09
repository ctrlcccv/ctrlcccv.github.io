---
title: >  
    자바스크립트 호이스팅과 TDZ 개념 총정리

description: >  
    자바스크립트 호이스팅의 모든 것을 쉽게 설명합니다. var와 let/const의 호이스팅 차이점, TDZ(Temporal Dead Zone) 개념, 블록 스코프까지 실제 코드 예제로 완벽하게 마스터하세요.

slug: 2025-06-25-javascript-hoisting
date: 2025-06-25 00:00:00+0000
lastmod: 2025-06-25 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-25-javascript-hoisting.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 호이스팅
    - TDZ
---


> 💡 [스코프](/code/2025-06-16-javascript-scope/)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.

변수를 선언하기 전에 사용했는데 에러가 나지 않거나, 예상과 다른 결과가 나와서 당황한 적이 있으신가요?

자바스크립트의 호이스팅과 TDZ(Temporal Dead Zone)는 많은 개발자들이 어려워하는 개념입니다. 이 두 개념을 정확히 이해하지 못하면 예상치 못한 버그가 발생하거나 코드의 동작을 예측하기 어려워집니다. 이번 글에서는 호이스팅의 동작 원리부터 `var`, `let`, `const`의 차이점, TDZ의 개념과 활용까지 자바스크립트 변수 관리의 모든 것을 정리해 보겠습니다.  

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

## 호이스팅이란?

호이스팅(Hoisting)은 변수와 함수 선언이 코드 실행 전에 해당 스코프의 맨 위로 "끌어올려지는" 것처럼 동작하는 자바스크립트의 특성입니다.  
정확히는 자바스크립트 엔진이 코드를 실행하기 전에 **변수와 함수의 이름을 메모리에 미리 등록**하는 과정입니다.  

```javascript
console.log(myVar); // undefined (에러가 아님!)
var myVar = "안녕하세요";
console.log(myVar); // "안녕하세요"
```

위 코드는 실제로 다음과 같은 방식으로 동작합니다.

```javascript
var myVar; // 선언이 위로 끌어올려짐 (메모리에 등록)
console.log(myVar); // undefined
myVar = "안녕하세요"; // 할당은 원래 위치에서
console.log(myVar); // "안녕하세요"
```

💡 **팁**: 호이스팅은 변수명을 메모리에 등록하는 것이며, 선언만 끌어올려지고 할당은 원래 위치에서 이루어집니다.

<br>

## var의 호이스팅

`var`로 선언한 변수는 호이스팅 되어 `undefined`로 초기화됩니다.

```javascript
function example() {
    console.log(name); // undefined
    var name = "철수";
    console.log(name); // "철수"
}
```

**실제 동작:**
```javascript
function example() {
    var name; // undefined로 초기화
    console.log(name); // undefined
    name = "철수"; // 할당
    console.log(name); // "철수"
}
```

* **선언과 초기화 동시 발생**  
<span class="txt">`var`는 호이스팅 시점에 선언과 `undefined` 초기화가 동시에 발생합니다.</span>

* **함수 스코프**  
<span class="txt">`var`는 함수 스코프를 가지므로, 블록 내부에서 선언해도 함수 전체에서 접근할 수 있습니다.</span>

<br>

## let과 const의 호이스팅

`let`과 `const`도 호이스팅 되지만, TDZ(Temporal Dead Zone) 때문에 선언 전에는 접근할 수 없습니다.

```javascript
console.log(myLet); // ReferenceError!
let myLet = "값";

console.log(myConst); // ReferenceError!
const myConst = "값";
```

* **선언은 되지만 초기화는 안 됨**  
<span class="txt">`let`과 `const`는 호이스팅 되어 메모리에 변수명이 등록되지만, 초기화는 선언문에 도달할 때 이루어집니다.</span>

* **블록 스코프**  
<span class="txt">`let`과 `const`는 블록 스코프를 가지므로, 선언된 블록 내에서만 접근할 수 있습니다.</span>

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

## TDZ(Temporal Dead Zone)란?

TDZ는 `let`과 `const` 변수가 선언되기 전까지 접근할 수 없는 구간을 말합니다.

```javascript
function example() {
    // TDZ 시작
    console.log(x); // ReferenceError!
    
    let x = 1; // x의 TDZ 끝
    console.log(x); // 1
}
```

TDZ의 범위는 스코프 시작부터 변수 선언까지입니다.

```javascript
let name = "전역";

function test() {
    // 여기서부터 지역 name의 TDZ 시작
    console.log(name); // ReferenceError! (전역 name 접근 불가)
    let name = "지역"; // 여기서 TDZ 끝
}
```

📝 **참고**: TDZ는 버그를 방지하여 더 안전한 코드 작성을 도와줍니다.

<br>

## 함수 호이스팅

함수 선언문은 완전히 호이스팅 되어 선언 전에도 호출할 수 있습니다.

```javascript
sayHello(); // "안녕하세요!" - 정상 작동!

function sayHello() {
    console.log("안녕하세요!");
}
```

함수 표현식은 변수 호이스팅 규칙을 따릅니다.

```javascript
console.log(myFunc); // undefined
var myFunc = function() {
    console.log("함수 표현식");
};
```

<br>

## 블록 스코프와 호이스팅

`let`과 `const`는 자신이 선언된 블록 스코프에서만 호이스팅 됩니다.

```javascript
let count = 100;

function test() {
    console.log(count); // 100 (정상 접근)
    
    if (true) {
        console.log(count); // ReferenceError! (블록 내 호이스팅)
        let count = 200;
        console.log(count); // 200
    }
    
    console.log(count); // 100 (블록 벗어나서 다시 전역 접근)
}
```

* **블록별 독립적 호이스팅**  
<span class="txt">각 블록에서 선언된 `let`/`const`는 해당 블록에서만 호이스팅 됩니다.</span>

* **섀도잉 현상**  
<span class="txt">블록 내 변수가 바깥 변수를 가리는 현상이 발생할 수 있습니다.</span>

<br>

## 실무에서 주의할 점

### 에러 발생 시 실행 중단
```javascript
console.log("시작");
console.log(undefinedVariable); // ReferenceError!
console.log("실행 안 됨"); // 이 줄은 절대 실행되지 않음
```

`ReferenceError`가 발생하면 그 지점에서 실행이 완전히 중단됩니다.

<br>

### var의 블록 스코프 무시
```javascript
if (true) {
    var message = "var는 블록을 무시합니다";
}
console.log(message); // "var는 블록을 무시합니다" (접근 가능!)
```

<br>

### 최신 모범 사례
* `var` 대신 `let`과 `const` 사용하기
* 변수는 사용하기 전에 선언하기
* 적절한 스코프 범위 설정하기

💡 **팁**: 현대 자바스크립트에서는 `var`보다 `let`과 `const`를 사용하는 것이 권장됩니다.

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

## 📝 퀴즈: 블록 스코프와 에러 전파 마스터하기

다음 코드를 보고 각 `console.log`의 실행 결과를 예측해 보세요. 호이스팅과 블록 스코프의 동작을 정확히 이해했는지 확인할 수 있습니다.

```javascript
let message = "전역";

function example() {
    console.log("1:", message);
    
    try {
        console.log("2:", message);
        let message = "지역";
        console.log("3:", message);
    } catch (error) {
        console.log("4: 에러 발생");
        console.log("5:", message);
    }
    
    console.log("6:", message);
}

console.log("시작");
example();
console.log("끝");
```

문제: 위 코드에서 각 `console.log`가 출력하는 내용과 실행 순서를 정확히 작성해 주세요. 에러 발생 지점과 그 이후 코드의 실행 여부도 함께 설명해 주세요.

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="각 console.log의 출력 결과와 실행 순서, 에러 발생 지점과 이유를 상세히 작성해 주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

<br>

**정답:**

1. `console.log("시작")` → "시작"
2. `console.log("1:", message)` → "1: 전역"
3. `console.log("2:", message)` → **ReferenceError!** (실행 중단)
4. 나머지 모든 코드 실행 안 됨

**해설:**

이 문제는 **블록 스코프 호이스팅**과 **에러 전파**를 동시에 다루는 복합 문제입니다.

1. **1번이 "전역"인 이유**  
<span class="txt">
함수 시작 시점에서는 아직 `try` 블록에 진입하지 않았으므로 `try` 블록 내의 `let message` 선언이 영향을 주지 않습니다.
</span>

2. **2번에서 `ReferenceError` 발생하는 이유**  
<span class="txt">
`try` 블록에 진입하면서 블록 내의 `let message` 호이스팅이 시작됩니다. 이때 전역 `message`가 가려지지만(섀도잉), 아직 초기화되지 않은 상태(TDZ)이므로 접근할 수 없습니다.
</span>

3. **에러 전파**  
<span class="txt">
`try` 블록 내에서 `ReferenceError`가 발생하면 `catch` 블록이 있어도 **함수 전체가 중단**됩니다. 왜냐하면 `ReferenceError`는 런타임 에러로, `catch`가 예상하는 일반적인 예외와는 다르기 때문입니다.
</span>

4. **전체 실행 중단**  
<span class="txt">
함수에서 에러가 발생하면 호출한 지점으로 에러가 전파되어 `console.log("끝")`도 실행되지 않습니다.
</span>

**핵심 포인트:**
- 블록 스코프 호이스팅은 블록 진입 시점부터 적용됩니다
- TDZ 상태의 변수에 접근하면 `ReferenceError`가 발생합니다  
- `ReferenceError`는 전체 실행을 중단시킵니다
- 에러는 호출 스택을 따라 위로 전파됩니다
</details>

<br>

이 글이 자바스크립트 호이스팅을 이해하는 데 도움이 되셨나요? 복잡해 보이지만 원리를 이해하면 예측할 수 있는 동작입니다. 더 궁금한 점이 있다면 댓글로 남겨주세요!

<br>