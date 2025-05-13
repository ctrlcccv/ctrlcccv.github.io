---
title: >  
    JavaScript filter() 사용법: 배열에서 특정 요소 추출하기

description: >  
    JavaScript의 filter() 메서드는 배열에서 특정 조건을 만족하는 요소를 추출하는데 사용됩니다. 이를 통해 코드를 간결하게 작성하고 데이터를 효율적으로 처리할 수 있습니다.

slug: 2024-03-26-filter
date: 2024-03-26 01:00:00+0000
lastmod: 2024-03-26 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-26-filter.webp

categories:
    - JavaScript
tags:

---
JavaScript에서 배열을 다룰 때 종종 필요한 작업 중 하나는 특정 조건을 만족하는 요소들만 추출하는 것입니다. 이를 위해 JavaScript에서는 `filter()` 메서드를 제공합니다. `filter()` 메서드는 원본 배열에서 특정 조건을 만족하는 요소들로 이루어진 새로운 배열을 생성합니다. 이 글에서는 JavaScript의 `filter()` 메서드에 대해 자세히 알아보겠습니다.  


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

## 기본 사용법
`filter()` 메서드는 배열의 각 요소에 대해 제공된 함수를 호출하고, 그 함수가 `true`를 반환하는 요소들로 이루어진 새로운 배열을 반환합니다.  
```javascript
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers); // 출력: [2, 4]
```
<br>

## 콜백 함수
`filter()` 메서드의 인자로 전달되는 콜백 함수는 세 가지 매개변수를 가집니다.  

* **`element`**: 현재 처리 중인 배열 요소
* **`index` (선택적)**: 현재 처리 중인 요소의 인덱스
* **`array` (선택적)**: `filter()`가 호출된 배열

**콜백 함수 예시**
```javascript
// 숫자 배열에서 짝수만 추출하기
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);

// 문자열 배열에서 특정 문자로 시작하는 문자열만 추출하기
const fruits = ['apple', 'banana', 'cherry', 'orange'];
const fruitsStartingWithA = fruits.filter(fruit => fruit[0] === 'a');

// 객체 배열에서 특정 조건을 만족하는 객체만 추출하기
const products = [
    { name: 'Apple', price: 100 },
    { name: 'Banana', price: 80 },
    { name: 'Cherry', price: 120 }
];
const affordableProducts = products.filter(product => product.price < 100);
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

**콜백 함수 팁**  
* 콜백 함수는 간결하고 명확하게 작성하는 것이 좋습니다.
* 조건이 복잡할 경우 화살표 함수를 사용하면 코드를 더욱 간결하게 작성할 수 있습니다.
* 콜백 함수 내에서 필요한 경우 `index`와 `array` 매개변수를 활용할 수 있습니다.

<br>

## 새로운 배열 생성
`filter()` 메서드는 새로운 배열을 반환합니다. 따라서 원본 배열은 변경되지 않습니다.

```javascript
const numbers = [1, 2, 3, 4, 5];

const filteredNumbers = numbers.filter(num => num > 3);

console.log(filteredNumbers); // 출력: [4, 5]
console.log(numbers); // 출력: [1, 2, 3, 4, 5]
```

<br>

## 실제 사용 사례 예시
`filter()` 메서드는 다양한 실제 개발 상황에서 활용될 수 있습니다.  

* **검색 기능:** 검색어에 해당하는 데이터를 추출
* **필터링 기능:** 특정 조건을 만족하는 데이터만 표시
* **데이터 정제:** 불필요한 데이터를 제거

**온라인 쇼핑몰 검색 기능 구현**  
다음은 온라인 쇼핑몰에서 검색어를 입력하면 `filter()` 메서드를 사용하여 검색어에 해당하는 상품 목록을 추출하는 예시입니다.  
```javascript
const products = [
    { name: 'Apple iPhone 13', price: 1000000 },
    { name: 'Samsung Galaxy S22', price: 900000 },
    { name: 'Google Pixel 6', price: 800000 },
    { name: 'LG Wing', price: 700000 }
];

const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', () => {
    // 사용자가 입력한 검색어를 가져옴
    const searchText = searchInput.value;
    // 검색어를 포함하는 제품들로 배열을 필터링
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

    // 검색 결과 목록을 업데이트하는 코드
});
```

**SNS 키워드 필터링 기능 구현**  
다음은 SNS에서 특정 키워드를 포함하는 게시글만 필터링하여 보여주는 예시입니다.  
```javascript
const posts = [
    { content: '오늘 날씨가 너무 좋다!' },
    { content: 'JavaScript filter() 메서드 정말 유용하다!' },
    { content: '프로그래밍 공부하기 힘들지만 재밌다!' },
    { content: '커피 한 잔 마시며 여유로운 시간을 보내는 중!' }
];

const keywordInput = document.querySelector('#keyword-input');

keywordInput.addEventListener('input', () => {
    // 사용자가 입력한 키워드를 가져옴
    const keyword = keywordInput.value;
    // 키워드를 포함하는 게시글들로 배열을 필터링
    const filteredPosts = posts.filter(post => post.content.toLowerCase().includes(keyword.toLowerCase()));

    // 필터링 된 게시글 목록을 업데이트하는 코드
});
```

**데이터 분석에서 특정 조건 만족하는 데이터 추출**  
다음은 데이터 분석에서 특정 조건을 만족하는 데이터만 추출하여 분석하는 예시입니다.  
```javascript
const data = [
    { age: 20, gender: 'male', income: 1000000 },
    { age: 30, gender: 'female', income: 2000000 },
    { age: 40, gender: 'male', income: 3000000 },
    { age: 50, gender: 'female', income: 4000000 }
];

const youngMales = data.filter(person => person.age < 30 && person.gender === 'male');

// 젊은 남성들의 소득 데이터 분석 코드
```
<br>

## 결론
JavaScript의 `filter()` 메서드는 배열에서 특정 조건을 만족하는 요소들을 쉽게 추출할 수 있는 강력한 도구입니다. 이를 통해 코드를 간결하게 유지하고 읽기 쉽게 만들 수 있습니다.  



