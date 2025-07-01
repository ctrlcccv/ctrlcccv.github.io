---
title: >  
    JavaScript 원시타입 vs 참조타입: 차이점과 복사 방식 총정리

description: >  
    자바스크립트의 원시타입과 참조타입은 무엇이 다를까요? 메모리 저장 방식, 불변성과 가변성, 얕은 복사와 깊은 복사의 차이까지 핵심 개념을 코드 예제로 쉽게 정리해 드립니다.

slug: 2025-06-30-primitive-reference
date: 2025-06-30 00:00:00+0000
lastmod: 2025-06-30 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-30-primitive-reference.webp

alternates:
  - title: "자바스크립트 원시타입 vs 참조타입: 차이점과 복사 방식 총정리"
    href: "https://ctrlcccv.github.io/code/2025-06-30-primitive-reference/"
    hreflang: "ko"
  - title: "JavaScript Primitive vs Reference: The Bug You Didn't Expect" 
    href: "https://ctrlcccv.github.io/code-en/2025-07-01-primitive-reference/"
    hreflang: "en"

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 원시타입
    - 참조타입
---

자바스크립트를 배우다 보면 변수를 복사했는데 한쪽을 바꿨더니 다른 쪽도 같이 바뀌는 상황을 경험하게 되죠.

저도 처음 자바스크립트를 배울 때 이런 일로 몇 시간씩 헤맸던 기억이 생생해요. 분명 새로운 변수에 복사했는데 왜 원본까지 바뀌는 건지 도저히 이해할 수 없었거든요. 그런데 원시타입과 참조타입의 차이를 알고 나니 모든 게 명확해졌어요.

이 글에서는 자바스크립트의 핵심 개념인 원시타입과 참조타입의 차이점을 완전히 이해할 수 있도록 도와드릴게요.

초보자도 쉽게 이해할 수 있는 간단한 예제부터 실무에서 자주 마주치는 상황까지, 단계별로 차근차근 살펴보겠습니다.

<br>

## 자바스크립트 원시타입과 참조타입 핵심 요약

**원시타입**(Primitive Type)은 데이터 자체를 변수에 저장하는 타입이고, **참조타입**(Reference Type)은 데이터가 저장된 메모리 주소를 변수에 저장하는 타입입니다. 이 차이로 인해 복사 방식과 데이터 변경 시 동작이 완전히 달라집니다.

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

## 원시타입(Primitive Type) 완전 정리

원시타입은 자바스크립트에서 가장 기본이 되는 데이터 타입입니다.

실제 프로젝트에서는 변수 할당과 값 복사가 매 순간 일어나기 때문에, 원시타입의 동작 방식을 정확히 아는 것이 중요해요.

<br>

### 원시타입의 7가지 종류

1. **문자열** (`string`) - 텍스트 데이터
2. **숫자** (`number`) - 정수와 소수
3. **큰 정수** (`bigint`) - 매우 큰 정수
4. **참/거짓** (`boolean`) - true 또는 false  
5. **정의되지 않음** (`undefined`) - 값이 할당되지 않은 상태
6. **빈 값** (`null`) - 의도적으로 비어 있음을 나타냄
7. **고유 식별자** (`symbol`) - 유일한 식별자

<br>

### 원시타입의 핵심 특징

```javascript
// ✅ 원시타입: 데이터 자체가 복사됨
let studentName = "김철수";
let copyName = studentName;

studentName = "이영희";

console.log(studentName); // "이영희"  
console.log(copyName);    // "김철수" (원본과 독립적)
```

**왜 이렇게 동작할까요?**
원시타입은 변수에 실제 데이터를 직접 저장하기 때문입니다. `copyName = studentName`에서 "김철수"라는 문자열 자체가 복사되어, 두 변수는 완전히 독립적인 데이터를 가지게 됩니다.

<br>

### 원시타입의 불변성(Immutability)

```javascript
// ❌ 원시타입은 변경할 수 없어요
let greeting = "안녕하세요";
greeting[0] = "A";  // 시도해봐도 변경되지 않음

console.log(greeting); // "안녕하세요" (그대로)

// ✅ 새로운 값을 할당하는 방식으로만 가능
greeting = "Hello";
console.log(greeting); // "Hello"
```

원시타입은 한 번 생성되면 그 값을 바꿀 수 없어요. 새로운 값을 할당하면 기존 데이터를 수정하는 것이 아니라, 새로운 데이터를 만들어서 변수에 할당하는 거예요.

<br>

## 참조타입(Reference Type) 완전 정리  

참조타입을 이해하려면 먼저 **메모리 주소** 개념을 알아야 해요.

**메모리 주소란?**  
컴퓨터의 메모리(RAM)에서 데이터가 저장된 위치를 나타내는 고유한 번호예요. 마치 우리가 집 주소를 통해 집을 찾는 것처럼, 컴퓨터도 메모리 주소를 통해 데이터를 찾습니다.

```javascript
// 쉬운 비유로 이해하기
let 원시타입 = "김철수";        // 직접 이름을 저장
let 참조타입 = { name: "김철수" }; // 객체가 있는 '주소'를 저장

// 원시타입: 변수에 "김철수"라는 데이터 자체가 저장됨
// 참조타입: 변수에 "123번지"같은 주소가 저장되고, 그 주소에 가면 객체가 있음
```

실제 프로젝트에서는 객체나 배열을 복사하고 수정하는 일이 정말 많은데, 참조타입의 특성을 모르면 예상치 못한 버그가 발생할 수 있어요.

<br>

### 참조타입의 3가지 종류

1. **객체** (`{}`) - 키-값 쌍의 데이터 집합
2. **배열** (`[]`) - 순서가 있는 데이터 목록  
3. **함수** (`function`) - 실행할 수 있는 코드 블록

<br>

### 참조타입의 핵심 특징

```javascript
// ✅ 참조타입: 메모리 주소가 복사됨
let student1 = { name: "김철수", age: 20 };
let student2 = student1;

student1.name = "이영희";

console.log(student1.name); // "이영희"
console.log(student2.name); // "이영희" (같이 바뀜!)
```

**왜 둘 다 바뀔까요?**  
참조타입은 변수에 데이터가 저장된 메모리 주소를 저장합니다. `student2 = student1`에서 같은 주소가 복사되어, 두 변수는 동일한 객체를 가리키게 됩니다.

<br>

### **배열에서도 마찬가지예요**

```javascript
// ❌ 예상과 다른 결과
let colors1 = ["빨강", "파랑"];
let colors2 = colors1;

colors2.push("노랑");

console.log(colors1); // ["빨강", "파랑", "노랑"] 
console.log(colors2); // ["빨강", "파랑", "노랑"]
```

`colors2`에만 "노랑"을 추가했는데 `colors1`도 바뀌었어요. 두 변수가 같은 배열을 가리키고 있기 때문입니다.

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

## 원시타입 vs 참조타입 주요 차이점

두 타입의 차이점을 표로 정리하면 다음과 같습니다.

| **구분** | **원시타입** | **참조타입** |
|----------|-------------|-------------|
| **저장 방식** | 데이터 자체를 저장 | 메모리 주소를 저장 |
| **복사 방식** | 데이터가 복사됨 | 주소가 복사됨 |
| **독립성** | 복사 후 완전히 독립적 | 같은 데이터를 공유 |
| **변경 가능성** | 불변(immutable) | 가변(mutable) |
| **비교 방식** | 값으로 비교 | 주소로 비교 |

<br>

### 실무에서 자주 실수하는 상황

```javascript
// ❌ 잘못된 객체 비교
let person1 = { name: "김철수" };
let person2 = { name: "김철수" };

console.log(person1 === person2); // false (다른 주소)

// ✅ 같은 객체를 가리킬 때만 true
let person3 = person1;
console.log(person1 === person3); // true (같은 주소)
```

내용이 같아도 다른 객체로 인식되는 것이 참조타입의 특징이에요.

<br>

## 안전한 복사 방법 배우기

참조타입을 안전하게 복사하는 방법을 알아보겠습니다.

실제 프로젝트에서는 데이터를 수정하기 전에 복사본을 만들어서 작업하는 경우가 많아요. 이때 올바른 복사 방법을 사용해야 원본 데이터를 보호할 수 있습니다.

<br>

### 얕은 복사 vs 깊은 복사란?

복사 방법에는 두 가지가 있어요.

- **얕은 복사(Shallow Copy)**: 객체의 첫 번째 레벨만 복사하는 방법
- **깊은 복사(Deep Copy)**: 객체의 모든 중첩된 레벨까지 완전히 복사하는 방법

```javascript
// 얕은 복사 예시
let student = { 
  name: "김철수", 
  scores: { math: 90, english: 85 }  // 중첩된 객체
};

let shallowCopy = { ...student };  // 얕은 복사
shallowCopy.scores.math = 100;
console.log(student.scores.math);  // 100 (원본도 바뀜!)

// 깊은 복사 예시  
let deepCopy = JSON.parse(JSON.stringify(student));  // 깊은 복사
deepCopy.scores.english = 95;
console.log(student.scores.english);  // 85 (원본 보호됨)
```

**언제 어떤 복사를 사용해야 할까요?**
- 객체나 배열 안에 다른 객체나 배열이 없다면 → **얕은 복사**로 충분
- 중첩된 구조가 있다면 → **깊은 복사** 필요

이제 각각의 방법을 자세히 알아보겠습니다.

<br>

### 1단계: 객체 얕은 복사

```javascript
// ✅ 스프레드 연산자로 복사
let originalStudent = { name: "김철수", age: 20 };
let copiedStudent = { ...originalStudent };

copiedStudent.name = "이영희";

console.log(originalStudent.name); // "김철수" (원본 보호됨)
console.log(copiedStudent.name);   // "이영희"
```

### 2단계: 배열 얕은 복사

```javascript
// ✅ 배열도 스프레드 연산자로
let originalColors = ["빨강", "파랑"];
let copiedColors = [...originalColors];

copiedColors.push("노랑");

console.log(originalColors); // ["빨강", "파랑"] (원본 보호됨)
console.log(copiedColors);   // ["빨강", "파랑", "노랑"]
```

### 3단계: 깊은 복사가 필요한 경우

```javascript
// ❌ 중첩된 객체는 얕은 복사로 해결되지 않아요
let originalData = {
  name: "김철수",
  scores: { math: 90, english: 85 }
};

let copiedData = { ...originalData };
copiedData.scores.math = 100;

console.log(originalData.scores.math); // 100 (원본도 바뀜!)

// ✅ 깊은 복사 방법
let safecopiedData = JSON.parse(JSON.stringify(originalData));
copiedData.scores.math = 95;

console.log(originalData.scores.math); // 90 (원본 보호됨)
```

<br>

## 함수에서 매개변수 전달하기

함수에 데이터를 전달할 때도 원시타입과 참조타입의 차이가 나타납니다.

실제 프로젝트에서는 함수를 통해 데이터를 처리하는 경우가 많은데, 이때 원본 데이터가 의도치 않게 변경되는 것을 방지해야 해요.

<br>

### 원시타입을 함수에 전달하기

```javascript
function changeScore(score) {
  score = 100;  // 지역 변수만 변경됨
  console.log("함수 내부:", score); // 100
}

let studentScore = 85;
changeScore(studentScore);
console.log("원본 점수:", studentScore); // 85 (변경되지 않음)
```

원시타입은 데이터가 복사되어 전달되므로 원본이 안전해요.

<br>

### 참조타입을 함수에 전달하기

```javascript
// ❌ 위험한 방법: 원본이 변경됨
function changeStudentInfo(student) {
  student.name = "이영희";  // 원본 객체가 변경됨!
}

let myStudent = { name: "김철수", age: 20 };
changeStudentInfo(myStudent);
console.log(myStudent.name); // "이영희" (원본이 바뀜)

// ✅ 안전한 방법: 복사본을 만들어서 사용
function safeChangeStudentInfo(student) {
  let copiedStudent = { ...student };
  copiedStudent.name = "이영희";
  return copiedStudent;
}

let myStudent2 = { name: "김철수", age: 20 };
let newStudent = safeChangeStudentInfo(myStudent2);

console.log(myStudent2.name); // "김철수" (원본 보호됨)
console.log(newStudent.name); // "이영희"
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

## 자주 묻는 질문 (FAQ)

### const로 선언한 객체도 변경할 수 있나요?

네, 가능합니다. `const`는 변수 자체의 재할당을 막는 것이지, 객체의 내부 속성 변경은 막지 않아요.

```javascript
const student = { name: "김철수" };
student.name = "이영희";  // ✅ 가능 (속성 변경)
console.log(student.name); // "이영희"

// student = { name: "박민수" };  // ❌ 불가능 (변수 재할당)
```

실무에서는 객체의 속성은 자유롭게 변경하면서, 변수 자체가 다른 객체를 가리키는 것을 방지할 때 `const`를 사용해요.

<br>

### 배열과 객체를 비교할 때 왜 false가 나오나요?

참조타입은 메모리 주소로 비교하기 때문입니다. 내용이 같아도 다른 주소에 저장되면 false가 나와요.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1 === arr2); // false (다른 주소)

// 내용을 비교하려면 JSON.stringify 사용
console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // true
```

실제 프로젝트에서는 내용 비교가 필요할 때 별도의 함수를 만들어서 사용하는 경우가 많아요.

<br>

### 깊은 복사를 해야 하는 경우는 언제인가요?

객체나 배열 안에 또 다른 객체나 배열이 중첩되어 있을 때 깊은 복사가 필요해요.

```javascript
let student = {
  name: "김철수",
  subjects: {
    math: 90,
    english: 85
  }
};

// 얕은 복사로는 부족해요
let copy1 = { ...student };
copy1.subjects.math = 100;
console.log(student.subjects.math); // 100 (원본도 바뀜!)

// 깊은 복사가 필요해요
let copy2 = JSON.parse(JSON.stringify(student));
copy2.subjects.english = 95;
console.log(student.subjects.english); // 85 (원본 보호됨)
```

<br>

### 함수도 참조타입인가요?

네, 맞습니다. 함수도 참조타입이기 때문에 변수에 할당하고 복사할 수 있어요.

```javascript
function greet() {
  console.log("안녕하세요!");
}

let myFunction = greet;  // 함수를 변수에 할당
myFunction();  // "안녕하세요!" (같은 함수 실행)

console.log(greet === myFunction); // true (같은 함수를 가리킴)
```

실무에서는 이런 특성을 활용해서 함수를 다른 함수의 매개변수로 전달하거나, 배열에 저장하는 등의 작업을 많이 해요.

<br>

## 마무리: 원시타입과 참조타입, 이제 마스터하셨나요?

자바스크립트의 원시타입과 참조타입 차이를 이해하는 것은 단순한 이론 학습이 아니라, 앞으로 마주하게 될 모든 자바스크립트 코드를 제대로 이해하기 위한 필수 기초예요.

저도 처음엔 이 개념이 어려웠는데, 한 번 제대로 이해하고 나니 코드가 왜 그렇게 동작하는지 명확하게 보이더라고요. 특히 리액트 같은 라이브러리를 배울 때도 이 개념이 정말 중요하거든요.

**핵심 포인트 정리:**

- ✅ **원시타입**: 데이터 자체를 저장, 복사하면 완전히 독립적
- ✅ **참조타입**: 메모리 주소를 저장, 복사하면 같은 데이터 공유  
- ✅ **안전한 복사**: 스프레드 연산자나 깊은 복사 방법 활용
- ✅ **실무 팁**: 함수에서 원본 데이터 보호하기

오늘 배운 내용으로 간단한 학생 정보 관리 프로그램을 만들어보세요. 학생 정보를 추가하고 수정하면서 원시타입과 참조타입의 차이를 직접 체험해보시면 더욱 확실하게 이해하실 거예요!

다음 글에서는 오늘 배운 원시타입과 참조타입의 개념을 바탕으로 자바스크립트 불변성(Immutability)에 대해 깊이 다뤄보겠습니다. 왜 불변성이 중요한지, 그리고 실무에서 불변성을 유지하는 다양한 방법들을 알아볼 예정이에요.

궁금한 점이나 어려운 부분이 있다면 언제든 댓글로 질문해 주세요. 같이 공부하는 마음으로 성심껏 답변드릴게요! 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures">MDN - JavaScript 데이터 타입과 자료구조</a>
</div>
