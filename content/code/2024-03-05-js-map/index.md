---
title: >  
    JavaScript map() 사용법: 배열 조작을 위한 핵심 도구
    
description: >  
    JavaScript의 map() 메서드는 배열의 각 요소에 대해 주어진 함수를 실행하고 그 결과를 새로운 배열로 반환하는 함수형 프로그래밍 방식의 핵심 도구입니다. 이를 통해 간결하고 효율적인 코드를 작성하며 다양한 배열 조작 작업을 수행할 수 있습니다.  
slug: 2024-03-05-js-map
date: 2024-03-05 00:00:00+0000
lastmod: 2024-03-05 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-05-js-map.webp

categories:
    - JavaScript
tags:

---

자바스크립트의 `map()` 메서드는 배열의 각 요소에 대해 주어진 함수를 실행하고 그 결과를 새로운 배열로 반환하는 함수형 프로그래밍 방식의 핵심 도구입니다. 이 메서드는 간결하고 효율적인 코드를 작성하며, 다양한 배열 조작 작업을 수행할 수 있도록 지원합니다.   

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

## 작동 방식
`map()` 메서드는 다음과 같은 방식으로 작동합니다.

* **콜백 함수 정의:** 사용자는 콜백 함수를 정의하여 배열의 각 요소에 적용할 변환 작업을 구현합니다. 콜백 함수는 현재 요소, 인덱스, 그리고 원본 배열을 인수로 받습니다.
* **배열 순회:** `map()` 메서드는 배열의 각 요소를 차례대로 순회하며 콜백 함수를 실행합니다.
* **새로운 배열 생성:** 콜백 함수가 반환한 값은 새로운 배열에 추가됩니다.
* **새로운 배열 반환:** 모든 요소를 처리한 후, `map()` 메서드는 새로운 배열을 반환합니다.

<br>

## 주요 특징

* **간결성:** for 루프를 사용하지 않고도 간결하게 배열을 조작할 수 있습니다.
* **가독성:** 콜백 함수를 사용하여 코드의 의도를 명확하게 표현할 수 있습니다.
* **함수형 프로그래밍:** 함수형 프로그래밍 방식을 쉽게 적용할 수 있습니다.
* **불변성:** 호출한 원본 배열을 변경하지 않고 유지하면서, 새로운 배열을 반환합니다.

<br>

## 활용 사례

* **데이터 변환:** 숫자를 문자열로 변환하거나, 문자열을 대문자로 변환하는 등의 작업에 활용할 수 있습니다. 
* **데이터 필터링:** 특정 조건에 맞는 요소만 추출합니다.
* **배열 병합:** 여러 배열을 하나의 배열로 합칩니다.
* **객체 생성:** 배열의 요소를 사용하여 객체 생성합니다.

<br>

## 실제 활용 예시

**상품 목록에서 할인된 가격 계산**

```javascript
const products = [
    { name: "상품 1", price: 10000 },
    { name: "상품 2", price: 20000 },
    { name: "상품 3", price: 30000 },
];

const discountedProducts = products.map((product) => {
    return {
        ...product,
        discountPrice: product.price * 0.9,
    };
});

console.log(discountedProducts);
```



<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>



**사용자 정보에서 이름과 이메일 추출**

```javascript
const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
];

const namesAndEmails = users.map((user) => ({
    name: user.name,
    email: user.email,
}));

console.log(namesAndEmails);
```
<br>

## 활용 팁

**<a href="/code/2024-03-06-arrow-function/" target="_blank" class="link">화살표 함수</a> 활용**  

기존 예시를 화살표 함수를 사용하여 더욱 간결하게 표현할 수 있습니다.

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
```

**인덱스 활용**

콜백 함수의 두 번째 매개변수로 인덱스를 활용하여 요소의 위치에 따라 변환 작업을 수행할 수 있습니다.

```javascript
const fruits = ["사과", "바나나", "오렌지"];

const indexedFruits = fruits.map((fruit, index) => {
    return `${index + 1}. ${fruit}`;
});

console.log(indexedFruits); // ["1. 사과", "2. 바나나", "3. 오렌지"]
```

**조건부 변환**

콜백 함수에서 조건문을 사용하여 특정 조건에 맞는 요소만 변환할 수 있습니다.

```javascript
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.map(num => {
    if (num % 2 === 0) {
        return num * 2;
    } else {
        return num;
    }
});

console.log(evenNumbers); // [2, 4, 6, 8, 10]
```

**다른 메서드와 함께 활용**

`map()` 메서드를 <a href="/code/2024-03-26-filter/" target="_blank" class="link">filter()</a> 메서드나 `reduce()` 메서드와 함께 사용하여 더욱 복잡한 작업을 수행할 수 있습니다.

```javascript
const products = [
    { name: "상품 1", price: 10000 },
    { name: "상품 2", price: 20000 },
    { name: "상품 3", price: 30000 },
];

const discountedProducts = products
    .filter(product => product.price > 20000)
    .map(product => ({
        ...product,
        discountPrice: product.price * 0.9,
    }));

console.log(discountedProducts);
```

**배열 요소의 특정 속성만 추출**

```javascript
const users = [
    { name: "Alice", age: 20 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 40 },
];

const namesAndAges = users.map(user => ({
    name: user.name,
    age: user.age,
}));

console.log(namesAndAges);
```

**배열을 객체로 변환**

```javascript
const numbers = [1, 2, 3, 4, 5];

const numberToObject = numbers.map(num => ({
    number: num,
    squared: num * num,
}));

console.log(numberToObject);
```
<br>

## 결론
map() 메서드는 코드를 간결하게 작성하고 가독성을 높이며, 다양한 배열 조작 작업을 지원하여 자바스크립트 개발자들에게 많은 편의를 제공합니다. 함수형 프로그래밍의 원리를 적용하여 불변성을 유지하며 효과적으로 배열을 다룰 수 있는 이 강력한 도구를 활용하면 코드의 품질을 향상시킬 수 있습니다.  
