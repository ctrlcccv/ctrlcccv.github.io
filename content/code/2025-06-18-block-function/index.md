---
title: >  
    자바스크립트 블록 vs 함수 차이점 비교 가이드

description: >  
    자바스크립트 초보자도 쉽게 이해할 수 있는 블록과 함수의 핵심 차이점을 실제 코드 예제와 함께 알아보세요. 호출과 재사용의 차이부터 실무에서 언제 사용해야 하는지까지 정리했습니다.

slug: 2025-06-18-block-function
date: 2025-06-18 00:00:00+0000
lastmod: 2025-06-18 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-18-block-function.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 블록
    - 함수
---

자바스크립트를 배우다가 블록과 함수가 헷갈려서 고민한 적 있으신가요?

자바스크립트를 처음 배울 때 많은 분들이 블록과 함수의 차이점을 명확하게 이해하지 못해 어려움을 겪습니다. 블록과 함수 모두 중괄호 `{}`를 사용하기 때문에 겉보기에는 비슷해 보이지만, 실제로는 역할과 기능 면에서 완전히 다릅니다. 이번 포스트에서는 코드 예제와 함께 두 개념의 핵심 차이점을 명확히 알아보겠습니다.

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

## 블록(Block)이란?

블록은 중괄호 `{}`로 감싼 코드의 그룹입니다. 가장 기본적인 형태로 코드를 정리하고 그룹화합니다.

```javascript
{
  let message = "이것은 블록입니다";
  console.log(message);
  console.log("블록 안의 코드가 실행됩니다");
}
```

### 블록의 특징

**즉시 실행**  
<span class="txt">
블록은 코드가 해당 라인에 도달하는 순간 바로 실행됩니다.  
별도의 호출 과정 없이 위에서 아래로 순차적으로 실행됩니다.
</span>

**재사용 불가능**  
<span class="txt">
한 번 실행되고 나면 재사용할 수 없습니다. 동일한 작업을 수행하려면 코드를 다시 작성해야 합니다.
</span>

**이름 없음**  
<span class="txt">블록에는 이름을 붙일 수 없어서 나중에 참조하거나 호출할 방법이 없습니다.</span>

<br>

## 함수(Function)란?

함수는 이름을 붙일 수 있는 코드 그룹으로, 필요할 때마다 호출해서 사용할 수 있습니다.

```javascript
function sayHello() {
  let message = "이것은 함수입니다";
  console.log(message);
  console.log("함수가 호출될 때 실행됩니다");
}
```

### 함수의 특징

**호출 필요**  
<span class="txt">
함수는 정의만으로는 실행되지 않습니다. `sayHello()`처럼 호출해야 비로소 내부 코드가 실행됩니다.
</span>

**재사용 가능**  
<span class="txt">
한 번 정의한 함수는 언제든 몇 번이든 호출해서 사용할 수 있습니다.  
이것이 함수의 가장 큰 장점입니다.
</span>

**이름 있음**   
<span class="txt">함수에는 `sayHello`처럼 이름을 붙일 수 있어서 나중에 쉽게 찾아서 호출할 수 있습니다.</span>

<br>

## 실행 방식 비교

두 방식의 차이점을 실제 코드로 비교해보겠습니다.

```javascript
// 블록 - 즉시 실행됨
console.log("1. 시작");
{
  console.log("2. 블록 실행");
}
console.log("3. 블록 다음");

// 함수 - 호출해야 실행됨
function myFunction() {
  console.log("함수가 실행됨");
}
console.log("4. 함수 정의 완료");
myFunction(); // 이때 함수 실행
console.log("5. 끝");
```

**실행 결과:**
```
1. 시작
2. 블록 실행
3. 블록 다음
4. 함수 정의 완료
함수가 실행됨
5. 끝
```

💡 **팁**: 함수는 정의와 실행이 분리되어 있어서 원하는 시점에 여러 번 호출할 수 있습니다.

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

## 재사용성 비교

### 블록 - 재사용 불가능
```javascript
// 첫 번째 인사
{
  console.log("안녕하세요");
}

// 같은 코드를 다시 사용하려면 또 작성해야 함
{
  console.log("안녕하세요");
}
```

### 함수 - 재사용 가능
```javascript
function greet() {
  console.log("안녕하세요");
}

greet(); // 첫 번째 호출
greet(); // 두 번째 호출
greet(); // 몇 번이든 호출 가능
```

📝 **참고**: 같은 코드를 여러 번 사용해야 한다면 반드시 함수를 사용하는 것이 효율적입니다.

<br>

## 입력과 출력 기능

함수는 블록과 달리 입력값(매개변수)을 받고 출력값(return)을 돌려줄 수 있습니다.

### 매개변수로 입력값 받기
```javascript
function greetUser(name) {  // name을 받아서 (입력값)
  console.log("안녕하세요, " + name + "님!");
}

greetUser("철수"); // "안녕하세요, 철수님!"
greetUser("영희"); // "안녕하세요, 영희님!"
```

### return으로 출력값 돌려주기
```javascript
function add(a, b) {
  return a + b;  // 계산 결과를 돌려줌
}

let result = add(5, 3);
console.log(result); // 8
```

블록은 이런 입출력 기능이 없어서 외부와 데이터를 주고받을 수 없습니다.

<br>

## 언제 무엇을 사용해야 할까?

### 블록을 사용하는 경우
* 일시적으로 코드를 그룹화하고 싶을 때
* 변수의 유효 범위를 제한하고 싶을 때
* 단 한 번만 실행되는 코드를 정리할 때

### 함수를 사용하는 경우
* 같은 코드를 여러 번 사용해야 할 때
* 외부에서 값을 입력받아 처리해야 할 때
* 계산 결과를 반환해야 할 때
* 코드에 의미 있는 이름을 붙이고 싶을 때

💡 **팁**: 코드를 재사용하거나 다른 곳에서 호출해야 한다면 함수를, 단순히 코드를 정리만 하려면 블록을 사용하세요.

<br>

## 📝 퀴즈: 블록과 함수 실행 순서 맞추기

다음 코드를 보고 실행 순서를 예측해보세요. 블록과 함수의 차이를 제대로 이해했는지 확인해볼 수 있습니다.

```javascript
console.log("시작");

{
  console.log("A 실행");
}

function showMessage() {
  console.log("B 실행");
}

{
  console.log("C 실행");
}

showMessage();
console.log("끝");
```

**문제: 위 코드의 실행 순서는 무엇인가요?**

A. 시작 → A 실행 → B 실행 → C 실행 → 끝<br>
B. 시작 → A 실행 → C 실행 → B 실행 → 끝<br>
C. 시작 → B 실행 → A 실행 → C 실행 → 끝<br>
D. 시작 → A 실행 → C 실행 → 끝

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="선택한 답변과 그 이유를 작성해주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답: B**

**실행 순서:**
1. `console.log("시작");`
2. `console.log("A 실행");` (첫 번째 블록)
3. `console.log("C 실행");` (두 번째 블록)
4. `console.log("B 실행");` (함수 호출)
5. `console.log("끝");`

**해설:**
블록은 코드가 해당 라인에 도달하는 순간 즉시 실행됩니다. 따라서 첫 번째 블록과 두 번째 블록이 순서대로 실행됩니다. 

반면 `function showMessage()`는 함수를 정의하는 구문일 뿐, 즉시 실행되지는 않습니다. 함수 내부의 코드는 `showMessage()`처럼 함수가 호출되는 시점에 실행됩니다.

이것이 블록과 함수의 가장 중요한 차이점입니다. **블록은 즉시 실행, 함수는 호출 시점에 실행**됩니다.
</details>

<br>

이번 포스팅이 블록과 함수의 차이점을 이해하는 데 도움이 되셨나요? 더 궁금한 점이 있다면 댓글로 남겨주세요!

<br>