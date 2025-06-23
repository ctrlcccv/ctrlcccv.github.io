---
title: >  
    JavaScript 얕은 복사 vs 깊은 복사: 2025년 최신 가이드 (feat. structuredClone)

description: >  
  JavaScript 복사 개념이 헷갈리시나요? 얕은 복사와 깊은 복사의 차이점부터 실무에서 바로 쓸 방법까지, 초보자도 쉽게 이해할 수 있도록 단계별로 설명합니다.

slug: 2025-07-04-javascript-copy
date: 2025-07-04 00:00:00+0000
lastmod: 2025-07-04 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-04-javascript-copy.webp

categories:
    - JavaScript 
tags:
    - 자바스크립트 기초
    - 얕은 복사
    - 깊은 복사
---
> 💡 [원시타입 vs 참조타입](code/2025-06-30-primitive-reference)에 대해 미리 알고 계시면 이 글의 내용을 더 쉽게 이해하실 수 있습니다.

JavaScript를 배우다 보면 객체나 배열을 복사할 때 예상치 못한 상황에서 어려움을 겪죠. "분명 새로운 변수에 복사했는데 왜 원본까지 바뀌는 거지?" 하고 당황스러웠던 경험 있으시죠?

저도 처음엔 객체를 복사했다고 생각했는데 원본 데이터까지 함께 변경되어서 당황했었어요. 특히 React를 배우기 전에 이 개념을 제대로 이해하지 못해서 상태 관리할 때 많이 헤맸던 기억이 나네요. 그때 얕은 복사와 깊은 복사의 차이를 명확하게 알게 되면서 "아, 이래서 그랬구나!" 하는 깨달음이 있었어요.

이 글에서는 JavaScript의 얕은 복사와 깊은 복사를 명확하게 구분하고, 언제 어떤 방법을 사용해야 하는지 알려드릴게요. 기본 개념부터 최신 방법인 `structuredClone()`까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.

<br>

## JavaScript 복사의 핵심 요약

<strong>얕은 복사(Shallow Copy)</strong>는 객체의 최상위 레벨만 복사하고 내부 객체는 원본과 같은 참조를 공유합니다. <strong>깊은 복사(Deep Copy)</strong>는 객체의 모든 레벨을 새로 복사하여 완전히 독립적인 복사본을 만듭니다. 이 차이는 참조타입(객체, 배열)에서만 발생하며, 원시타입은 항상 값이 복사됩니다.

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

## 왜 복사 방법을 알아야 할까요?

### 참조타입에서만 발생하는 문제

JavaScript의 데이터 타입은 크게 두 가지로 나뉩니다.

- **원시타입(Primitive Type)**: `number`, `string`, `boolean`, `undefined`, `null`
  - 값 자체가 저장되어 복사할 때 문제없음

- **참조타입(Reference Type)**: `object`, `array`, `function`
  - 메모리 주소(참조)가 저장되어 복사할 때 주의 필요

```javascript
// 원시타입 - 문제없음
let originalNumber = 10;
let copiedNumber = originalNumber;
copiedNumber = 20;
console.log(originalNumber); // 10 (변화없음)

// 참조타입 - 문제 발생!
let originalArray = [1, 2, 3];
let copiedArray = originalArray;  // 같은 주소를 가리킴
copiedArray.push(4);
console.log(originalArray); // [1, 2, 3, 4] (원본도 변함!)
```

실제 프로젝트에서는 사용자 정보, 쇼핑 카트, 게시글 목록 등 대부분이 객체나 배열 형태로 다뤄지기 때문에 이 개념을 정확히 알아야 버그 없는 코드를 작성할 수 있어요.

<br>

## 얕은 복사(Shallow Copy) 이해하기

### 얕은 복사의 개념과 특징

얕은 복사는 객체의 **최상위 레벨만 새로 복사**하고, 내부에 있는 객체나 배열은 **원본과 같은 참조를 공유**하는 방식입니다.

```javascript
const studentInfo = {
    name: "김철수",        // 최상위 레벨 (새로 복사됨)
    grades: {               // 내부 객체 (참조 공유됨)
        math: 90,
        english: 85
    }
};

// 얕은 복사 방법들
const copy1 = Object.assign({}, studentInfo);
const copy2 = { ...studentInfo };  // 스프레드 연산자 (가장 많이 사용)

// 최상위 레벨 수정 - 서로 독립적
copy1.name = "박영희";
console.log(studentInfo.name); // "김철수" (원본 그대로)
console.log(copy1.name);  // "박영희"

// 내부 객체 수정 - 둘 다 변경됨!
copy1.grades.math = 100;
console.log(studentInfo.grades.math); // 100 (원본도 변함!)
console.log(copy1.grades.math);  // 100
```

<br>

### 얕은 복사를 사용하는 경우

1. 단순한 객체 구조일 때
2. 성능이 중요할 때 (더 빠름)
3. 메모리를 절약하고 싶을 때

```javascript
// ✅ 얕은 복사가 적합한 경우
const userBasicInfo = {
    name: "김개발",
    age: 28,
    job: "개발자"
};

const updatedInfo = { ...userBasicInfo, age: 29 };
// 단순한 구조라서 문제없음!
```

<br>

## 깊은 복사(Deep Copy) 완전 정복

### 깊은 복사의 개념과 필요성

깊은 복사는 객체의 **모든 레벨을 완전히 새로 복사**해서 원본과 **완전히 독립적인** 복사본을 만드는 방식입니다.

```javascript
const complexData = {
    user: "홍길동",
    settings: {
        theme: "다크모드",
        notifications: {
            email: true,
            push: false
        }
    },
    hobbies: ["독서", "영화감상"]
};

// 깊은 복사 (structuredClone 사용 - 2025년 추천!)
const completeClone = structuredClone(complexData);

// 아무리 깊숙한 곳을 수정해도 원본에 영향 없음
completeClone.settings.notifications.email = false;
completeClone.hobbies.push("게임");

console.log(complexData.settings.notifications.email);   // true (원본 그대로!)
console.log(completeClone.settings.notifications.email);   // false
console.log(complexData.hobbies);           // ["독서", "영화감상"]
console.log(completeClone.hobbies);           // ["독서", "영화감상", "게임"]
```

<br>

### 깊은 복사를 사용하는 경우

1. 중첩된 객체나 배열이 있을 때
2. 원본 데이터를 온전히 보호하고 싶을 때
3. 복사본을 마음껏 수정해야 할 때

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

## 깊은 복사 방법 비교 완전 가이드

### 1. structuredClone() - 2025년 표준 방법

현재 가장 권장되는 방법으로, 브라우저에 내장된 함수입니다.

```javascript
const original = {
    name: "김철수",
    date: new Date("2023-01-01"),
    map: new Map([["키", "값"]]),
    array: [1, 2, { inner: "값" }]
};

const clone = structuredClone(original);

// 모든 타입이 정확하게 보존됨!
console.log(clone.date instanceof Date);  // true
console.log(clone.map.get("키"));          // "값"
```

**장점**:
- 내장 함수라 별도 라이브러리 불필요
- Date, Map, Set, RegExp 등 완벽 지원
- 순환 참조 처리 가능
- 성능 우수

**단점**:
- 함수는 복사 불가능
- 구형 브라우저 지원 안됨 (하지만 2025년엔 거의 모든 환경에서 지원)

<br>

### 2. JSON 방식 - 간단하지만, 제한적

```javascript
// ❌ 문제가 있는 방식
const problematicObject = {
    name: "홍길동",
    birthday: new Date(),              // 문자열로 변환됨
    greet: function() { return "안녕"; },  // 사라짐
    status: undefined               // 사라짐
};

const jsonClone = JSON.parse(JSON.stringify(problematicObject));
console.log(jsonClone.birthday instanceof Date);  // false - 문자열이 됨!
console.log(jsonClone.greet);                  // undefined - 사라짐!

// ✅ 단순한 데이터에만 사용
const simpleObject = {
    name: "김철수",
    age: 30,
    hobbies: ["독서", "영화"]
};

const safeClone = JSON.parse(JSON.stringify(simpleObject));
// 이런 경우엔 문제없음
```
**JSON 방식이 제한적인 이유**

JSON(JavaScript Object Notation)은 원래 **서버와 클라이언트 간 데이터 교환**을 위해 만들어진 **텍스트 기반 형식**입니다. 따라서 문자열로 변환할 수 있는 기본적인 타입들(`string`, `number`, `boolean`, `array`, `object`, `null`)만 지원하고, JavaScript만의 특별한 객체나 함수는 지원하지 않아요.

<br>

### 3. Lodash cloneDeep - 함수까지 복사 가능

```javascript
// npm install lodash 필요
import _ from 'lodash';

const objectWithFunction = {
    data: "값",
    method: function() { return "안녕"; }
};

const perfectClone = _.cloneDeep(objectWithFunction);
console.log(perfectClone.method());  // "안녕" - 함수도 복사됨!
```

<br>

## 2025년 실무 권장 가이드

### 상황별 최적 선택 기준

| **상황** | **추천 방법** | **이유** |
|----------|---------------|----------|
| 단순한 객체 + 성능 중요 | 얕은 복사 (`{...obj}`) | 빠르고 충분함 |
| 중첩 객체 + 특별한 타입 없음 | `structuredClone()` | 안전하고 정확함 |
| Date, Map, Set 포함 | `structuredClone()` | 타입 보존 |
| 함수 복사 필요 | `_.cloneDeep()` | 함수까지 지원 |
| 레거시 환경 | JSON 방식 + 주의 | 호환성 좋음 |

<br>

### 실무에서 자주 마주치는 상황들

```javascript
// 🎯 React 상태 관리에서
const [userList, setUserList] = useState([
    { id: 1, name: "김철수", settings: { theme: "라이트" } },
    { id: 2, name: "박영희", settings: { theme: "다크" } }
]);

// ❌ 잘못된 방법 - 얕은 복사로 상태 변경
const newList = [...userList];
newList[0].settings.theme = "다크";  // 원본도 함께 변경됨!

// ✅ 올바른 방법 - 깊은 복사로 안전하게 변경
const correctNewList = structuredClone(userList);
correctNewList[0].settings.theme = "다크";  // 안전함!
setUserList(correctNewList);
```

```javascript
// 🎯 API 응답 데이터 가공에서
const apiResponse = {
    userInfo: {
        name: "김개발",
        joinDate: "2023-01-01T00:00:00Z"  // 문자열 형태
    },
    settings: { theme: "auto" }
};

// 원본 보존하면서 가공
const processedData = structuredClone(apiResponse);
processedData.userInfo.joinDate = new Date(processedData.userInfo.joinDate);
processedData.settings.theme = "라이트";

// 원본은 그대로, 가공된 데이터만 사용
console.log(apiResponse.settings.theme);      // "auto" (원본 보존)
console.log(processedData.settings.theme);  // "라이트"
```

<br>

## 자주 묻는 질문 (FAQ)

### Q1. 얕은 복사와 깊은 복사 중 어떤 걸 써야 하나요?

객체의 구조를 살펴보세요. 중첩된 객체나 배열이 있다면 깊은 복사, 단순한 구조라면 얕은 복사를 사용하세요. 확실하지 않다면 `structuredClone()`을 사용하는 것이 안전합니다.

<br>

### Q3. structuredClone()이 JSON 방식보다 항상 좋은가요?

대부분은 `structuredClone()`이 더 좋습니다. JSON 방식은 함수, Date, undefined 등이 사라지거나 변형되지만, `structuredClone()`은 정확하게 보존해요. 성능 차이도 실제 사용에서는 무시할 수 있는 수준입니다. 다만 아주 단순한 객체를 대량으로 처리할 때는 JSON 방식이 조금 더 빠를 수 있어요.

<br>

### Q4. 복사할 때 함수도 같이 복사하고 싶어요.

`structuredClone()`은 함수를 복사하지 못합니다. 함수까지 복사하려면 Lodash의 `cloneDeep()`을 사용하거나, 애초에 데이터와 함수를 분리하는 설계를 고려해 보세요. 실무에서는 함수를 복사하기보다는 순수 데이터만 복사하고 필요한 함수는 별도로 관리하는 것이 더 좋은 패턴이에요.

<br>

### Q5. 성능을 고려하면 어떤 방법이 가장 좋을까요?

**얕은 복사가 필요한 경우:**
- `{...obj}`, `[...arr]` 스프레드 연산자가 가장 빠릅니다.
- 단순한 객체 구조라면 성능과 정확성 모두 만족!

**깊은 복사가 필요한 경우:**
- **성능 순서**: JSON 방식 > `structuredClone()`
- **정확성 순서**: `structuredClone()` > JSON 방식

하지만 깊은 복사에서는 성능보다 **정확성과 안전성**이 더 중요해요. `structuredClone()`은 조금 느릴 수 있지만 다음과 같은 강력한 장점들이 있어요.

- **타입 완벽 보존**: Date, Map, Set, RegExp 등이 정확하게 복사됨
- **순환 참조 처리**: JSON 방식은 에러가 나지만 `structuredClone()`은 문제없이 처리
- **예측할 수 있는 결과**: 데이터가 예상치 못하게 변형되지 않음
- **내장 함수**: 별도 라이브러리 설치 불필요

실제 성능 차이는 대부분 무시할 수 있는 수준(밀리초 단위)이므로, 버그 없는 안전한 코드를 위해 `structuredClone()`을 사용하는 것을 강력히 추천해요!

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

## 마무리

JavaScript의 복사 개념을 정리해 보면

- **얕은 복사**: 최상위 레벨만 복사, 단순한 구조에 적합
- **깊은 복사**: 모든 레벨을 복사, 중첩 구조에 필수
- **2025년 기준**: 스프레드 연산자, `structuredClone()`이 가장 권장되는 방법
- **실무 팁**: 확실하지 않으면 `structuredClone()` 사용하기

오늘 배운 내용으로 간단한 사용자 정보 관리 시스템을 만들어보세요. 사용자 목록을 복사해서 수정하고, 원본이 변경되지 않는지 확인해 보면 개념이 더 명확해질 거예요.

다음 글에서는 JavaScript의 **렉시컬 환경(Lexical Environment)** 개념을 도서관 비유로 쉽게 알아보겠습니다. 변수가 어떻게 찾아지는지, 스코프 체인이 무엇인지 궁금하셨다면 놓치지 마세요!

여러분의 복사 관련 경험은 어떠셨나요? 특히 어려웠던 부분이나 헷갈렸던 점이 있다면 댓글로 공유해 주세요! 함께 배워나가요. 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Web/API/Window/structuredClone">MDN - structuredClone() 공식 문서</a>
</div>