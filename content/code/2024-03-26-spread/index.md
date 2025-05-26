---
title: >  
    JavaScript 스프레드 문법 (...) : 배열 & 객체 활용법

description: >  
    자바스크립트의 스프레드 문법을 설명하고, 배열과 객체를 다루는 다양한 활용법을 다룹니다. 코드를 간결하게 작성하고 가독성을 높이며, 개발자는 더욱 효율적으로 코드를 작성하고 유지보수할 수 있습니다.

slug: 2024-03-26-spread
date: 2024-03-26 00:00:00+0000
lastmod: 2024-03-26 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-26-spread.webp

categories:
    - JavaScript
tags:
    - ES6
    - 문법
    - 웹개발

---
자바스크립트는 동적이고 유연한 언어로, 여러 기능을 제공하여 개발자가 코드를 더 효율적으로 작성할 수 있도록 도와줍니다. 그 중 스프레드 문법은 ES6(ES2015)부터 도입되어 자바스크립트의 강력한 기능 중 하나로 자리 잡았습니다. 스프레드 문법은 배열과 객체를 다루는데 유용하며, 코드의 가독성과 유지보수성을 향상하는데 큰 역할을 합니다. 이번 글에서는 스프레드 문법의 개념과 다양한 활용법에 대해 알아보겠습니다.  


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## 스프레드 문법이란?

스프레드 문법은 배열이나 객체를 펼쳐서 다른 배열이나 객체에 추가하거나 함수 인수로 전달하는 기능입니다. 기존 방식보다 코드의 간결성과 가독성을 크게 향상시키고, 유지보수에도 용이합니다.  

<br>

## 기본 활용법

**배열 합치기 및 복사**  
스프레드 문법을 사용하면 여러 배열을 쉽게 합치거나 새로운 배열을 복사할 수 있습니다.  
```javascript
// 배열 합치기
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // [1, 2, 3, 4, 5, 6]

// 배열 복사
const originalArr = [1, 2, 3];
const copyArr = [...originalArr];
console.log(copyArr); // [1, 2, 3]
```

**함수 호출**   
스프레드 문법을 사용하여 배열을 함수 인수로 전달할 수 있습니다.  
```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers)); // 6
```

**객체 병합 및 복사**  
스프레드 문법을 사용하여 여러 객체를 병합하거나 새로운 객체를 복사할 수 있습니다.  
```javascript
// 객체 병합
const obj1 = { foo: 'bar', x: 42 };
const obj2 = { foo: 'baz', y: 13 };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { foo: 'baz', x: 42, y: 13 }

// 객체 복제
const originalObj = { a: 1, b: 2, c: 3 };
const copyObj = { ...originalObj };
console.log(copyObj); // { a: 1, b: 2, c: 3 }
```


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## 심화 활용법  

**배열 확장 및 분해**  
스프레드 문법을 사용하여 기존 배열에 새로운 요소를 추가하거나 배열을 분해하여 새로운 변수에 할당할 수 있습니다.  
```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5, 6];
console.log(newArr); // [1, 2, 3, 4, 5, 6]

const [first, ...rest] = newArr;
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5, 6]
```

**객체 프로퍼티 동적 생성 및 확장**  
스프레드 문법을 사용하면 객체 프로퍼티를 동적으로 생성하거나 기존 객체에 새로운 프로퍼티를 추가할 수 있습니다.  

**예시 1: 동적 프로퍼티 생성**  
```javascript
const name = 'John Doe';
const age = 30;

const person = { ...{ name }, age };
console.log(person); // { name: 'John Doe', age: 30 }
```
위 코드에서 `...{ name }`은 `name` 변수의 값을 키로 하는 객체를 생성합니다. 이렇게 동적으로 프로퍼티를 생성하면 변수의 값을 직접 사용하지 않고도 객체를 만들 수 있습니다.  

**예시 2: 기존 객체 확장**  
```javascript
const person = { name: 'John Doe', age: 30 };

const additionalInfo = { city: 'Seoul', country: 'Korea' };
const updatedPerson = { ...person, ...additionalInfo };
console.log(updatedPerson); // { name: 'John Doe', age: 30, city: 'Seoul', country: 'Korea' }
```
위 코드에서 `...additionalInfo`는 `additionalInfo` 객체의 모든 프로퍼티를 `person` 객체에 추가합니다. 이렇게 기존 객체에 새로운 프로퍼티를 추가하면 코드를 간결하게 유지하면서 객체를 확장할 수 있습니다.  

**얕은 복사 vs 깊은 복사**  
스프레드 문법을 사용하여 객체를 복사할 때 얕은 복사가 수행됩니다. 얕은 복사는 객체의 참조만 복사하기 때문에, 내부 객체는 복사되지 않습니다. 깊은 복사를 수행하려면 `JSON.parse(JSON.stringify(obj))`와 같은 방법을 사용해야 합니다.  
```javascript
const originalObj = { a: { b: 1 } };
const copyObj = { ...originalObj };

originalObj.a.b = 2;

console.log(copyObj.a.b); // 2
```
위 코드에서 `copyObj`는 `originalObj`의 얕은 복사입니다. 따라서 `originalObj`의 내부 객체 `a.b`의 값을 변경하면 `copyObj`의 값도 변경됩니다.

**Rest 문법과 함께 사용**  
스프레드 문법은 Rest 문법과 함께 사용하여 배열이나 객체의 일부 요소를 추출하거나 남은 요소를 새로운 변수에 할당할 수 있습니다.  

**예시: 배열에서 일부 요소 추출**  
```javascript
const numbers = [1, 2, 3, 4, 5];

const [first, ...rest] = numbers;

console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```
위 코드에서 `[first, ...rest]`는 `numbers` 배열의 첫 번째 요소를 `first` 변수에 할당하고 나머지 요소를 `rest` 배열에 할당합니다.  

<br>

## 실제 개발 사례

* 데이터 목록을 컴포넌트에 렌더링할 때 스프레드 문법을 사용하여 목록을 컴포넌트 props로 전달합니다.
* API 응답 데이터를 객체에 파싱할 때 스프레드 문법을 사용하여 응답 데이터의 프로퍼티를 객체 프로퍼티에 매핑합니다.
* 객체의 프로퍼티 값을 유효성 검사할 때 스프레드 문법을 사용하여 객체의 프로퍼티를 펼쳐서 검사합니다.

<br>

## 결론

자바스크립트의 스프레드 문법은 배열과 객체를 다룰 때 매우 유용합니다. 기존의 방식보다 코드를 간결하고 가독성 있게 작성할 수 있으며, 복사, 병합, 분해 등 다양한 작업에 활용됩니다. 이를 통해 개발자는 더욱 효율적으로 코드를 작성하고 유지보수할 수 있습니다.  
