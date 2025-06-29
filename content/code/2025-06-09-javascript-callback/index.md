---
title: >  
    JavaScript 콜백 함수(Callback function) 쉽게 이해하기

description: >  
    콜백 함수의 개념부터 실무 활용 사례까지 쉽게 설명합니다. 비동기 프로그래밍의 핵심인 콜백 함수를 이해하고 실전에서 활용해보세요.

slug: 2025-06-09-javascript-callback
date: 2025-06-09 00:00:00+0000
lastmod: 2025-06-09 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-09-javascript-callback.webp

alternates:
  - title: "JavaScript 콜백 함수(Callback function) 쉽게 이해하기"
    href: "https://ctrlcccv.github.io/code/2025-06-09-javascript-callback/"
    hreflang: "ko"
  - title: "What is a Callback in JS: Functions That Wait" 
    href: "https://ctrlcccv.github.io/code-en/2025-06-12-javascript-callback/"
    hreflang: "en"

categories:
    - JavaScript
tags:
    - 콜백 함수
    - 비동기 프로그래밍
    - 함수형 프로그래밍
---

웹 개발을 하다 보면 콜백 함수라는 용어를 자주 들어보셨을 텐데요. 정확히 무엇인지 헷갈리신 적이 있으신가요?

콜백 함수는 자바스크립트에서 가장 기본적이면서도 강력한 개념 중 하나입니다. 특히 비동기 작업을 처리할 때 필수적인 요소이며, 웹 개발에서 매우 중요한 기술입니다. 이번 글에서는 콜백 함수가 무엇인지, 어떻게 활용하는지 쉽게 풀어서 설명해드리겠습니다.

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

## 콜백 함수란 무엇인가요?

콜백 함수는 다른 함수에 인수로 전달되어 특정 작업이 완료된 후 호출되는 함수입니다. 쉽게 말해, "나중에 불러줘"라고 부탁하는 함수입니다.

<br>

### 일상생활에서의 콜백 함수

1. **배달 앱 주문**: 
   - 주요 기능: 음식점에 주문을 접수합니다.
   - 인수로 전달: "배달이 시작되면 문자 보내주세요"라는 옵션을 선택합니다.
   - 작업 완료 시 실행: 실제로 배달이 시작될 때 앱이 자동으로 문자를 보냅니다.

2. **음식점 진동벨**: 
   - 주요 기능: 카운터에서 주문을 합니다.
   - 인수로 전달: 점원이 손님에게 진동벨을 건네줍니다.
   - 작업 완료 시 실행: 음식이 준비되었을 때 진동벨이 울립니다.

이처럼 콜백 함수는 '특정 조건이 충족되었을 때 실행될 기능'을 미리 등록해두는 방식입니다.

<br>

### 기본 구조

```javascript
function 주요함수(인자1, 인자2, 콜백함수) {
    // 어떤 작업 수행
    
    // 작업이 끝나면 콜백 함수 호출
    콜백함수();
}

// 사용 예시
주요함수(값1, 값2, function() {
    console.log("작업이 완료되었습니다!");
});
```

여기서 `function() { console.log("작업이 완료되었습니다!"); }`가 콜백 함수입니다. 이 함수는 `주요함수`가 작업을 완료한 후에 호출됩니다.

<br>

## 콜백 함수의 간단한 예제

```javascript
// 콜백 함수를 받는 함수 정의
function greet(name, callback) {
    console.log("안녕하세요, " + name + "님!");
    // 작업 완료 후 콜백 함수 호출
    callback();
}

// 콜백으로 사용될 함수 정의
function sayGoodbye() {
    console.log("안녕히 가세요!");
}

// greet 함수에 sayGoodbye 함수를 콜백으로 전달
greet("홍길동", sayGoodbye);
```

**결과:**
```
안녕하세요, 홍길동님!
안녕히 가세요!
```

이 예제에서:
- `greet` 함수는 `name`과 `callback` 두 개의 매개변수를 받습니다.
- `sayGoodbye` 함수는 콜백으로 사용됩니다.
- `greet("홍길동", sayGoodbye)`를 호출하면, `greet` 함수가 실행된 후 `sayGoodbye` 함수가 호출됩니다.


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

## 익명 콜백 함수 사용하기

콜백 함수는 꼭 이름이 있는 함수일 필요가 없습니다. 대부분의 경우 익명 함수(이름이 없는 함수)로 바로 작성합니다.

```javascript
// 익명 콜백 함수 사용 예제
greet("김철수", function() {
    console.log("또 만나요!");
});
```

**결과:**
```
안녕하세요, 김철수님!
또 만나요!
```

이 예제에서는 `sayGoodbye` 함수를 미리 정의하지 않고, 직접 익명 함수를 `greet` 함수의 인수로 전달했습니다. 이렇게 하면 코드가 더 간결해지고, 함수를 한 번만 사용할 때 매우 편리합니다.

<br>

## 실무에서 자주 사용되는 콜백 함수 예시

### 1. 배열의 forEach 메서드

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach 메서드에 전달된 익명 함수가 콜백 함수입니다.
numbers.forEach(function(number) {
    console.log(number); // 배열의 각 요소를 출력
});
```

이 예제에서 `function(number) { console.log(number); }`가 콜백 함수입니다. 배열의 각 요소마다 이 콜백 함수가 호출됩니다.

<br>

### 2. 이벤트 리스너

```javascript
// HTML: <button id="myButton">클릭하세요</button>

document.getElementById('myButton').addEventListener('click', function() {
    alert('버튼이 클릭되었습니다!');
});
```

여기서 `function() { alert('버튼이 클릭되었습니다!'); }`가 콜백 함수입니다. 버튼이 클릭될 때마다 이 함수가 호출됩니다.

<br>

### 3. 비동기 HTTP 요청 (AJAX)

```javascript
function fetchData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(new Error('요청 실패'));
        }
    };
    xhr.send();
}

// fetchData 함수 사용 예시
fetchData('https://api.example.com/data', function(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log('데이터 수신:', data);
    }
});
```

이 예제에서 `function(error, data) {...}`가 콜백 함수입니다. 서버에서 데이터를 가져오는 비동기 작업이 완료된 후 이 함수가 호출됩니다.

<br>

### 4. 타이머 함수

```javascript
// 2초 후에 콜백 함수 실행
setTimeout(function() {
    console.log('2초가 지났습니다!');
}, 2000);

// 3초마다 콜백 함수 반복 실행
setInterval(function() {
    console.log('3초마다 실행됩니다!');
}, 3000);
```

여기서 `setTimeout`과 `setInterval`에 전달된 함수들은 콜백 함수입니다. 지정된 시간이 지나면 이 함수들이 호출됩니다.

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

## 콜백 함수와 비동기 프로그래밍

콜백 함수는 자바스크립트의 비동기 프로그래밍에서 핵심적인 역할을 합니다. 웹에서는 네트워크 요청, 파일 처리, 타이머 등 많은 작업이 비동기적으로 이루어집니다.

```javascript
console.log("작업을 시작합니다.");

// 비동기 작업 예시 (3초 후 실행)
setTimeout(function() {
    console.log("커피가 준비되었습니다.");
}, 3000);

console.log("다음 작업을 먼저 진행합니다.");
```

**결과:**
```
작업을 시작합니다.
다음 작업을 먼저 진행합니다.
(3초 후)
커피가 준비되었습니다.
```

이 예제에서 볼 수 있듯이, `setTimeout`의 콜백 함수는 3초 후에 실행되지만, 코드의 실행은 기다리지 않고 바로 다음 줄로 넘어갑니다. 이것이 비동기 프로그래밍의 핵심입니다. 카페에서 커피를 주문하고 나서 커피가 나올 때까지 다른 일을 할 수 있는 것과 같은 원리입니다.

<br>

## 콜백 지옥과 해결 방법

콜백 함수를 중첩해서 사용하면 가독성이 떨어지는 "콜백 지옥(Callback Hell)"이 발생할 수 있습니다.

```javascript
// 콜백 지옥의 예시
fetchUserData(userId, function(userData) {
    fetchUserPosts(userData.id, function(posts) {
        fetchPostComments(posts[0].id, function(comments) {
            console.log(comments);
            // 더 많은 중첩된 콜백...
        });
    });
});
```

이런 문제는 Promise나 async/await를 사용하여 해결할 수 있습니다.

```javascript
// Promise 사용
fetchUserData(userId)
    .then(userData => fetchUserPosts(userData.id))
    .then(posts => fetchPostComments(posts[0].id))
    .then(comments => console.log(comments));

// async/await 사용
async function getUserComments(userId) {
    const userData = await fetchUserData(userId);
    const posts = await fetchUserPosts(userData.id);
    const comments = await fetchPostComments(posts[0].id);
    console.log(comments);
}
```

<br>

## 퀴즈: 콜백 함수 이해하기

다음 코드를 보고 문제를 풀어보세요.

```javascript
function processOrder(orderType, callback) {
    console.log(orderType + " 주문을 처리합니다.");
    
    setTimeout(function() {
        console.log("주문 처리 완료!");
        callback();
    }, 2000);
    
    console.log("다음 작업을 진행합니다.");
}

function sendNotification() {
    console.log("알림을 전송했습니다.");
}

processOrder("아메리카노", sendNotification);
console.log("프로그램 종료");
```

**Q. 위 코드를 실행했을 때 콘솔에 출력되는 메시지들을 순서대로 작성해보세요.**

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="콘솔에 출력되는 메시지들을 순서대로 작성해주세요.&#10;예시: &#10;1. 첫 번째 메시지&#10;2. 두 번째 메시지&#10;..."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

**정답:**
1. 아메리카노 주문을 처리합니다.
2. 다음 작업을 진행합니다.
3. 프로그램 종료
4. (2초 후) 주문 처리 완료!
5. 알림을 전송했습니다.

JavaScript는 비동기 처리를 지원하는 언어입니다. 이 코드에서 `setTimeout`은 비동기 함수로, 2초 후에 콜백 함수를 실행하도록 예약만 하고 바로 다음 코드로 넘어갑니다.

**실행 순서 해설:**
1. "아메리카노 주문을 처리합니다." - processOrder 함수의 첫 번째 console.log 실행
2. setTimeout이 콜백을 2초 후 실행하도록 예약 (바로 넘어감)
3. "다음 작업을 진행합니다." - processOrder 함수의 마지막 console.log 실행
4. "프로그램 종료" - 메인 코드의 마지막 console.log 실행
5. (2초 후) "주문 처리 완료!" - setTimeout의 콜백 함수 내부 실행
6. "알림을 전송했습니다." - sendNotification 콜백 함수 실행

이것이 바로 콜백 함수와 비동기 프로그래밍의 핵심입니다. 콜백 함수는 특정 작업이 완료된 후에 실행되며, 다른 코드의 실행을 막지 않습니다.
</details>

<br>
