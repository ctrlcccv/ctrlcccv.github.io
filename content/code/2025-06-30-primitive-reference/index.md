---
title: >  
    자바스크립트 원시타입 vs 참조타입: 차이점과 복사 방식 총정리

description: >  
    자바스크립트의 원시타입과 참조타입은 어떻게 다를까요? 메모리 저장 방식, 불변성과 가변성, 얕은 복사와 깊은 복사의 차이까지 핵심 개념을 코드 예제로 쉽게 정리해드립니다.

slug: 2025-06-30-primitive-reference
date: 2025-06-30 00:00:00+0000
lastmod: 2025-06-30 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-06-30-primitive-reference.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - 원시타입
    - 참조타입
---

변수를 복사했는데 한쪽을 수정하니 다른 쪽도 같이 바뀌어 당황한 적 있으신가요?

자바스크립트에서 변수는 크게 **원시타입**(Primitive Type)과 **참조타입**(Reference Type)으로 나뉘며, 이 둘은 **메모리 저장 방식**부터 **데이터의 복사 방식**까지 완전히 다릅니다.

이 차이를 제대로 이해하지 않으면 디버깅에 어려움을 겪고, 예기치 못한 결과에 당황할 수 있습니다.  
이 글에서는 다음 내용을 실제 코드 예제와 함께 쉽게 설명해드리겠습니다.

- 원시타입과 참조타입의 개념
- 메모리 저장 방식의 차이
- 불변성과 가변성
- 얕은 복사 vs 깊은 복사
- 함수 매개변수 전달 시 주의점

자바스크립트의 동작 원리를 확실히 이해하고 싶다면 꼭 끝까지 읽어보세요!

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

## 자바스크립트 원시타입(Primitive Type)이란?

원시타입은 데이터 자체를 저장하는 자료형입니다. 아래와 같은 7가지 타입이 있습니다.

* 문자열 `string`
* 숫자 `number`
* 큰 정수 `bigint`
* 참/거짓 `boolean`
* 정의되지 않음 `undefined`
* 고유 식별자 `symbol`
* 빈 데이터 `null`

```js
const a = 10;
const b = a;

console.log(b); // 10
```

이렇게 원시타입은 데이터를 복사하면 **데이터 자체가 복사**됩니다.
따라서 `a`를 바꿔도 `b`에는 영향을 주지 않습니다.

원시타입인 숫자는 데이터가 직접 복사됩니다. `b = a`에서 10이라는 데이터가 복사되고, 이후 `a = 20`으로 a만 변경되므로 b는 영향받지 않습니다.

<br>

## 자바스크립트 참조타입(Reference Type)이란?

참조타입을 이해하려면 먼저 **메모리 주소** 개념을 알아야 합니다.  
**원시타입**은 변수에 **데이터를 직접 저장**하지만, **참조타입**은 변수에 **데이터가 있는 주소를 저장**합니다.

```js
// 원시타입: 변수에 데이터를 직접 저장
let a = 100;
let b = a;  // 100이라는 데이터가 b에 직접 복사됨

// 참조타입: 변수에 주소를 저장  
let obj1 = { name: 'JS' };
let obj2 = obj1;  // obj1이 가리키는 주소가 obj2에 복사됨 (같은 객체를 가리킴)
```

💡 참고 : 메모리 주소는 컴퓨터의 RAM(메모리)에서 데이터가 저장된 위치를 나타내는 고유한 번호입니다. 마치 우리가 집 주소를 통해 집을 찾는 것처럼, 컴퓨터도 메모리 주소를 통해 데이터를 찾습니다.

<br>

### 참조타입의 종류

* 객체 `{}`
* 배열 `[]`
* 함수 `function`

<br>

### 왜 같이 바뀔까요?

```js
const person = { name: '홍길동' };
const copy = person;

copy.name = '김철수';
console.log(person.name); // '김철수' (같이 바뀜!)
```

`person`과 `copy`가 **같은 메모리 주소의 객체**를 가리키고 있기 때문입니다.

<br>

### 배열도 마찬가지입니다.

```js
const colors1 = ['빨강', '파랑'];
const colors2 = colors1;

colors2.push('노랑');
console.log(colors1); // ['빨강', '파랑', '노랑']
```

<br>

### 비교할 때도 주의하세요.

```js
const car1 = { brand: '현대' };
const car2 = { brand: '현대' };

console.log(car1 === car2); // false (다른 주소)

const car3 = car1;
console.log(car1 === car3); // true (같은 주소)
```

**핵심**: 참조타입은 데이터가 아닌 **주소를 공유**하므로, 한 곳에서 수정하면 다른 곳에서도 바뀝니다!

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

## 원시타입은 왜 불변(immutable)할까요?

원시타입은 데이터를 바꾸는 것이 아니라, 새로운 데이터를 재할당하게 됩니다.

```js
let str = 'hello';
str[0] = 'H';
console.log(str); // hello (변경되지 않음)
```

문자열은 변경되지 않습니다. 이는 **불변성** 때문인데, 원시타입은 한 번 생성되면 데이터를 변경할 수 없습니다.

```js
let name = "홍길동";
name = "김철수";  // 새로운 문자열 생성!
```

실제로는 "홍길동"을 "김철수"로 바꾸는 것이 아니라, 삭제 후 새로운 문자열을 만들어 할당하는 것입니다.

<br>

## 참조타입은 왜 가변(mutable)할까요?

참조타입은 내부 속성값을 자유롭게 변경할 수 있습니다.

```js
const arr = [1, 2, 3];
arr.push(4);

console.log(arr); // [1, 2, 3, 4]
```

`const`로 선언했어도 배열의 내용은 바뀔 수 있습니다.
주소는 그대로지만, 내부 데이터는 바뀔 수 있기 때문입니다.

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

## 얕은 복사(Shallow Copy) vs 깊은 복사(Deep Copy)

참조타입을 복사할 때는 **얕은 복사**인지 **깊은 복사**인지 꼭 구분해야 합니다.

<br>

### 얕은 복사

객체의 주소값만 복사하는 방식입니다.

```js
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

copy.b.c = 999;
console.log(original.b.c); // 999
```

내부 객체까지는 복사되지 않아서 원본이 변경됩니다.

<br>

### 깊은 복사

모든 중첩된 데이터까지 새롭게 복사합니다.

```js
const original = { a: 1, b: { c: 2 } };
const copy = structuredClone(original);

copy.b.c = 999;
console.log(original.b.c); // 2
```

`structuredClone`은 깊은 복사를 지원하는 브라우저 내장 함수입니다.
구버전 브라우저에서는 `lodash`의 `cloneDeep()` 같은 함수를 활용할 수 있습니다.

<br>

## 함수에 데이터 전달 시 주의할 점

함수 인자로 전달할 때도 같은 규칙이 적용됩니다.

```js
function changeValue(x) {
  x = 100;
}

let num = 1;
changeValue(num);
console.log(num); // 1 (원시타입 - 데이터 복사)
```

```js
function changeObject(obj) {
  obj.value = 100;
}

let myObj = { value: 1 };
changeObject(myObj);
console.log(myObj.value); // 100 (참조타입 - 주소 공유)
```

### 배열과 객체 비교할 때도 주의하세요!

```js
// 데이터가 같아도 다른 객체로 인식됩니다
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1 === arr2); // false

// 같은 주소를 가리킬 때만 true입니다
let arr3 = arr1;
console.log(arr1 === arr3); // true
```

<br>

## 📝 퀴즈: 원시타입과 참조타입 마스터하기

다음 코드를 보고 각 `console.log`의 출력 결과를 예측해 보세요. 원시타입과 참조타입의 메모리 저장 방식을 정확히 이해했는지 확인할 수 있습니다.

```javascript
let a = 10;
let b = a;
a = 20;

let obj1 = { value: 10 };
let obj2 = obj1;
obj1.value = 20;

let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2 = [4, 5, 6];

console.log("a:", a);           // ?
console.log("b:", b);           // ?
console.log("obj1.value:", obj1.value);  // ?
console.log("obj2.value:", obj2.value);  // ?
console.log("arr1:", arr1);     // ?
console.log("arr2:", arr2);     // ?
```

문제: 위 코드에서 각 `console.log`가 출력하는 내용을 정확히 작성하고, 그 이유를 원시타입과 참조타입의 메모리 저장 방식으로 설명해 주세요.

<div class="quiz-wrap2">
    <textarea class="quiz-input" placeholder="각 console.log의 출력 결과와 그 이유를 원시타입과 참조타입의 차이점으로 설명해 주세요."></textarea>
</div>

<details>
<summary>정답 확인하기</summary>

<br>

**정답:**

```
a: 20
b: 10
obj1.value: 20
obj2.value: 20
arr1: [1, 2, 3]
arr2: [4, 5, 6]
```

**해설:**

1. **a: 20, b: 10**  
<span class="txt">
원시타입인 숫자는 데이터가 직접 복사됩니다. `b = a`에서 10이라는 데이터가 복사되고, 이후 `a = 20`으로 a만 변경되므로 b는 영향받지 않습니다.
</span>

2. **obj1.value: 20, obj2.value: 20**  
<span class="txt">
참조타입인 객체는 메모리 주소가 복사됩니다. `obj2 = obj1`에서 같은 객체를 가리키는 주소가 복사되므로, `obj1.value = 20`으로 객체의 내용을 수정하면 obj2도 같은 객체를 참조하여 동일한 결과를 보입니다.
</span>

3. **arr1: [1, 2, 3], arr2: [4, 5, 6]**  
<span class="txt">
처음에는 같은 배열을 가리키지만, `arr2 = [4, 5, 6]`에서 arr2가 새로운 배열을 가리키게 됩니다. 이는 배열의 내용을 수정하는 것이 아니라 변수 자체를 새로운 배열로 할당하는 것이므로 arr1은 원래 배열을 그대로 유지합니다.
</span>

**핵심 포인트:**
- 원시타입: 데이터 복사 → 독립적 변경
- 참조타입: 주소 복사 → 공유된 데이터 수정 시 양쪽 모두 영향
- 참조타입에서 새로운 데이터 할당 vs 내용 수정의 차이점 이해
</details>

<br>

## 마무리: 원시타입과 참조타입, 이제 확실히 이해되셨나요?

자바스크립트에서 원시타입과 참조타입의 차이는 단순한 이론이 아니라, 실무에서 매일 마주치는 문제입니다.
복사, 비교, 함수 전달, 상태 관리에서 발생하는 예기치 않은 버그를 방지하려면 **메모리 구조와 복사 방식에 대한 개념이 반드시 필요**합니다.

요약하자면:

* ✅ 원시타입: 데이터 자체를 복사 (불변)
* ✅ 참조타입: 주소를 복사 (가변)
* ✅ 얕은 복사 vs 깊은 복사 구분은 필수

궁금한 부분이 있다면 댓글로 자유롭게 질문해주세요!

<br>
