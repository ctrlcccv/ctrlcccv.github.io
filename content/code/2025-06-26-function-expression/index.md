---
title: >  
    자바스크립트 함수 표현식, 헷갈린다면 이 글로 정리 끝!

description: >  
    자바스크립트 함수 표현식의 모든 것을 쉽게 설명합니다. 함수 선언문과의 차이점, 호이스팅, 콜백 함수 사용법까지 실제 코드 예제로 완벽하게 마스터하세요.

slug: 2025-06-26-function-expression
date: 2025-06-26 00:00:00+0000
lastmod: 2025-06-26 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-26-function-expression.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 함수 표현식
    - 호이스팅
---

> 💡 [스코프](/code/2025-06-16-javascript-scope/), [호이스팅](/code/2025-06-25-javascript-hoisting/)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.  


함수를 변수에 저장하거나 다른 함수에 전달할 때 어떤 방식을 사용해야 할지 고민해 본 적이 있으신가요?

자바스크립트에서 함수를 정의하는 방법은 여러 가지가 있습니다. 그중에서도 함수 표현식은 매우 유용하면서도 많은 개발자들이 궁금해하는 개념입니다. 언제 함수 선언문을 쓰고 언제 함수 표현식을 써야 하는지, 호이스팅은 어떻게 다르게 작동하는지 명확하게 이해하면 더 안전하고 예측할 수 있는 코드를 작성할 수 있습니다.

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

## 함수 표현식이란?

함수 표현식(Function Expression)은 **함수를 값으로 취급해서 표현식의 일부로 사용하는 방식**입니다.  
이 값은 변수에 할당될 수도 있고, 함수의 인자로 전달될 수도 있으며, 즉시 실행될 수도 있습니다.  

📝 **참고**: 표현식(Expression)이란 **값을 만들어내는 코드 조각**입니다. 계산하거나 평가했을 때 결과값이 나오는 것이 바로 표현식입니다. (예: `2 + 3` → `5`, `"안녕"` → 문자열)  

<br>

### 기본 형태
```javascript
// 함수 선언문 (Function Declaration)
function sayHello() {
    console.log("안녕하세요!");
}

// 함수 표현식 (Function Expression)
const sayHello = function() {
    console.log("안녕하세요!");
};
```

### 익명 함수 표현식
**변수에 할당되지 않아도 함수 표현식**입니다!

```javascript
// 모두 함수 표현식 (변수명 없음)
button.addEventListener('click', function() {
    alert("클릭됨!");
});

setTimeout(function() {
    console.log("1초 후 실행");
}, 1000);

const numbers = [1, 2, 3].map(function(num) {
    return num * 2;
});
```

💡 **팁**: 함수가 **표현식의 일부로 사용되면** 모두 함수 표현식입니다.  

<br>

## 언제 함수 표현식을 사용하나요?

함수를 "값"처럼 다루고 싶을 때 함수 표현식을 사용합니다.  

<br>

### 1. 변수에 함수를 저장할 때
```javascript
const calculator = function(a, b) {
    return a + b;
};
```

### 2. 조건부로 함수를 생성할 때
```javascript
const getMenu = userType === "admin" 
    ? function() { return "관리자 메뉴"; }
    : function() { return "일반 메뉴"; };
```

### 3. 콜백 함수로 사용할 때
```javascript
// 이벤트 핸들러
button.addEventListener('click', function() {
    alert("클릭됨!");
});

// 배열 메서드
const doubled = [1, 2, 3].map(function(num) {
    return num * 2;
});
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

## 호이스팅의 차이점

### 함수 선언문: 선언 전에 호출 가능
```javascript
sayHello(); // "안녕!" 출력됨

function sayHello() {
    console.log("안녕!");
}
```

### 함수 표현식: 변수 호이스팅 규칙 적용
```javascript
sayHello(); // ReferenceError: Cannot access 'sayHello' before initialization

const sayHello = function() {
    console.log("안녕!");
};
```

* **순서가 중요함**: 함수 표현식은 정의한 후에만 사용할 수 있습니다.
* **[TDZ](/code/2025-06-25-javascript-hoisting/#tdztemporal-dead-zone란) 적용**: `const`/`let`을 사용한 함수 표현식은 TDZ 규칙을 따릅니다.

<br>

## 괄호의 의미: 즉시 실행 vs 함수 전달

함수 표현식 사용 시 가장 흔한 실수는 **괄호의 잘못된 사용**입니다.

```javascript
const handleClick = function() {
    alert("버튼이 클릭되었습니다!");
};

// ❌ 잘못된 사용 - 즉시 실행됨
button.addEventListener('click', handleClick());

// ✅ 올바른 사용 - 함수 자체를 전달
button.addEventListener('click', handleClick);
```

**괄호의 의미:**
* `handleClick` → 함수 자체 (나중에 실행)
* `handleClick()` → 함수 즉시 실행 (결과값 반환)

<br>

## 화살표 함수와 실무 팁

### 화살표 함수: 함수 표현식의 간결한 형태
```javascript
// 일반 함수 표현식
const add = function(a, b) {
    return a + b;
};

// 화살표 함수 (동일한 함수 표현식)
const add = (a, b) => a + b;

// 콜백에서 활용
const doubled = numbers.map(num => num * 2);
```

### 실무에서 주의할 점
```javascript
// ❌ 정의 전 사용
const result = calculate(5, 3); // 에러!
const calculate = function(a, b) { return a + b; };

// ✅ 정의 후 사용
const calculate = function(a, b) { return a + b; };
const result = calculate(5, 3);
```

💡 **팁**: [화살표 함수](/code/2024-03-06-arrow-function/)도 함수 표현식의 일종으로, 동일한 호이스팅 규칙을 따릅니다.

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

## 📝 퀴즈: 함수 표현식과 호이스팅 마스터하기

다음 코드를 보고 실행 결과를 예측해 보세요.  

```javascript
console.log("1. 시작");

setTimeout(executeA(), 1000);
setTimeout(executeB, 2000);

console.log("2. 중간");

function executeA() {
    console.log("3. A 실행됨");
}

const executeB = function() {
    console.log("4. B 실행됨");
};

console.log("5. 끝");
```

문제: 위 코드에서 콘솔에 출력되는 내용과 순서를 정확히 작성하고, 에러가 발생한다면 어느 지점에서 왜 발생하는지 설명해 주세요.

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="실행 순서와 결과, 에러 발생 지점과 이유를 상세히 작성해 주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

<br>

**정답:**

1. `console.log("1. 시작")` → "1. 시작"
2. `console.log("3. A 실행됨")` → "3. A 실행됨" 
3. **ReferenceError 발생** - 실행 중단

**해설:**

이 문제는 **함수 표현식의 호이스팅**과 **괄호의 의미**를 동시에 다루는 복합 문제입니다.

1. **`executeA()` 호출이 성공하는 이유**  
<span class="txt">
함수 선언문 `executeA`는 호이스팅 되어 코드 실행 전에 메모리에 등록되므로, 선언 전에도 호출할 수 있습니다.
</span>

2. **에러 발생 지점과 이유**  
<span class="txt">
`setTimeout(executeB, 2000)`에서 `executeB`에 접근하려고 하지만, 함수 표현식은 TDZ(Temporal Dead Zone) 상태이므로 `ReferenceError: Cannot access 'executeB' before initialization`가 발생합니다.
</span>

3. **괄호의 차이점**  
<span class="txt"> 
`executeA()`는 함수를 즉시 실행하여 결과를 반환하는 반면, `executeB`는 함수 자체를 참조하지만 TDZ로 인해 에러가 발생합니다.
</span>

4. **실행 중단**  
<span class="txt">
`ReferenceError`가 발생하면 전체 스크립트 실행이 중단되므로, `console.log("2. 중간")` 이후의 모든 코드는 실행되지 않습니다.
</span>

**핵심 포인트:**
- 함수 선언문은 호이스팅 되어 선언 전에 호출할 수 있지만, 함수 표현식은 변수 호이스팅 규칙을 따릅니다.
- `const`/`let`으로 선언한 함수 표현식은 TDZ 적용됩니다.
- 괄호 `()`의 유무가 함수 실행 시점을 결정합니다.
- `ReferenceError`는 전체 실행을 중단시킵니다.
</details>

<br>

이 글이 함수 표현식을 이해하는 데 도움이 되셨나요? 함수를 "값으로 사용"한다는 개념만 확실히 이해하면 언제 함수 표현식을 써야 할지 자연스럽게 알 수 있을 것입니다. 더 궁금한 점이 있다면 댓글로 남겨주세요!

<br>
