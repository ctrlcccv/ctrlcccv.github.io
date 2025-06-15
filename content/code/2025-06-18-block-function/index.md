---
title: >  
    자바스크립트 블록 vs 함수 차이점 비교 가이드

description: >  
    자바스크립트 초보자를 위한 블록과 함수의 핵심 차이점을 실무 경험과 함께 정리했습니다. 언제 블록을 쓰고 언제 함수를 써야 하는지, 실제 코드 예제로 명확하게 알아보세요.

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

자바스크립트를 배우다 보면 블록과 함수가 모두 중괄호 `{}`를 사용해서 "이 둘이 뭐가 다른 거지?"라고 헷갈리는 순간이 있지 않나요?

저도 처음 자바스크립트를 배울 때 블록과 함수를 제대로 구분하지 못해서 코드를 작성할 때마다 고민했던 기억이 있어요. 특히 "언제 블록을 쓰고 언제 함수를 써야 하는지" 감이 잡히지 않아서 무작정 함수만 사용하곤 했죠. 하지만 실무를 하면서 각각의 역할과 목적이 명확히 다르다는 걸 깨달았어요.

이 글에서는 자바스크립트 초보자가 꼭 알아야 할 블록과 함수의 핵심 차이점을 실제 코드 예제와 함께 명확하게 알려드릴게요.

기본 개념부터 실무 활용법까지, 여러분이 앞으로 리액트를 배우기 전에 반드시 이해해야 할 자바스크립트 기초를 단계별로 살펴봅니다.

<br>

## 자바스크립트 블록 vs 함수 핵심 요약


<strong>블록(Block)</strong>은 중괄호로 감싼 코드 그룹으로, 코드가 해당 라인에 도달하는 순간 즉시 실행됩니다.   
<strong>함수(Function)</strong>는 이름을 가진 코드 그룹으로, 호출할 때만 실행되며 재사용이 가능합니다.   
가장 큰 차이점은 **실행 시점**과 **재사용 가능 여부**입니다.

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

## 자바스크립트 블록이란?

블록은 중괄호 `{}`로 감싼 코드의 그룹입니다. 가장 기본적인 형태로 코드를 정리하고 그룹화하는 역할을 해요.  
실제 프로젝트에서는 변수의 범위를 제한하거나 일시적으로 코드를 정리할 때 주로 사용합니다.   

```javascript
// 쇼핑몰 상품 정보를 임시로 처리하는 블록
{
  let productName = "맥북 프로";
  let productPrice = 2000000;
  let discountRate = 0.1;
  
  console.log(`상품명: ${productName}`);
  console.log(`할인된 가격: ${productPrice * (1 - discountRate)}원`);
}
// 여기서는 productName, productPrice, discountRate 변수에 접근할 수 없음
```

<br>

### 블록의 주요 특징

| 특징 | 설명 | 예시 상황 |
|------|------|-----------|
| **즉시 실행** | 코드가 해당 라인에 도달하면 바로 실행 | 페이지 로딩 시 초기화 작업 |
| **재사용 불가** | 한 번 실행되면 다시 사용할 수 없음 | 일회성 데이터 처리 |
| **이름 없음** | 블록에는 이름을 붙일 수 없음 | 임시 변수 그룹화 |
| **스코프 생성** | 블록 내부 변수는 외부에서 접근 불가 | 변수 충돌 방지 |

<br>

## 자바스크립트 함수란?

함수는 이름을 붙일 수 있는 코드 그룹으로, 필요할 때마다 호출해서 사용할 수 있어요.  
실무에서 함수는 정말 중요해요. 저는 같은 코드를 세 번 이상 작성하게 되면 반드시 함수로 만드는 습관을 지니고 있어요. 이렇게 하면 코드 유지보수가 훨씬 쉬워집니다.

```javascript
// 상품 할인 가격을 계산하는 함수
function calculateDiscountPrice(originalPrice, discountRate) {
  let discountedPrice = originalPrice * (1 - discountRate);
  return discountedPrice;
}

// 여러 상품에 재사용 가능
let macbookPrice = calculateDiscountPrice(2000000, 0.1);
let ipadPrice = calculateDiscountPrice(800000, 0.15);
let iphonePrice = calculateDiscountPrice(1200000, 0.05);
```

<br>

### 함수의 주요 특징

| 특징 | 설명 | 예시 상황 |
|------|------|-----------|
| **호출 필요** | 정의만으로는 실행되지 않음, 호출해야 실행 | 버튼 클릭 시 실행되는 기능 |
| **재사용 가능** | 한 번 정의하면 몇 번이든 호출 가능 | 공통 계산 로직 |
| **이름 있음** | 함수에 의미 있는 이름을 붙일 수 있음 | `calculateTax`, `validateEmail` 등 |
| **입출력 가능** | 매개변수로 입력받고 return으로 결과 반환 | 데이터 변환, 계산 함수 |

<br>

## 블록 vs 함수 실행 시점 비교

두 방식의 가장 큰 차이점은 **언제 실행되느냐**입니다. 이 부분을 정확히 이해해야 자바스크립트 코드 흐름을 파악할 수 있어요.

<br>

### 실행 순서 확인하기

```javascript
console.log("1. 프로그램 시작");

// 블록 - 즉시 실행됨
{
  console.log("2. 첫 번째 블록 실행");
}

// 함수 정의 - 아직 실행되지 않음
function showMessage() {
  console.log("4. 함수가 실행됨");
}

// 또 다른 블록 - 즉시 실행됨
{
  console.log("3. 두 번째 블록 실행");
}

// 이제 함수를 호출 - 이때 함수 내부 코드 실행
showMessage();

console.log("5. 프로그램 종료");
```

**실행 결과:**
```
1. 프로그램 시작
2. 첫 번째 블록 실행
3. 두 번째 블록 실행
4. 함수가 실행됨
5. 프로그램 종료
```

💡 **중요 포인트**: 함수는 정의와 실행이 완전히 분리되어 있어요. 이 특성 때문에 원하는 시점에 코드를 실행할 수 있답니다.

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

## 재사용성으로 보는 블록 vs 함수

제가 실무에서 경험한 바로는, 같은 로직을 여러 번 사용해야 하는 상황이 정말 많아요. 이때 블록과 함수의 차이가 극명하게 드러납니다.

<br>

### ❌ 블록을 사용한 비효율적인 방법

```javascript
// 사용자별 환영 메시지 - 블록 사용 (비효율적)
{
  let userName = "김철수";
  console.log(`안녕하세요, ${userName}님! 쇼핑몰에 오신 것을 환영합니다.`);
}

{
  let userName = "이영희";
  console.log(`안녕하세요, ${userName}님! 쇼핑몰에 오신 것을 환영합니다.`);
}

{
  let userName = "박민수";
  console.log(`안녕하세요, ${userName}님! 쇼핑몰에 오신 것을 환영합니다.`);
}
```

<br>

### ✅ 함수를 사용한 효율적인 방법

```javascript
// 사용자별 환영 메시지 - 함수 사용 (효율적)
function welcomeUser(userName) {
  console.log(`안녕하세요, ${userName}님! 쇼핑몰에 오신 것을 환영합니다.`);
}

// 간단하게 재사용
welcomeUser("김철수");
welcomeUser("이영희");
welcomeUser("박민수");
```

**왜 함수가 더 좋을까요?**

1. **코드량 감소**: 같은 기능을 더 적은 코드로 구현
2. **유지보수 용이**: 환영 메시지를 바꾸려면 함수 내부만 수정
3. **가독성 향상**: `welcomeUser("김철수")`만 봐도 무슨 일을 하는지 명확

<br>

## 매개변수와 반환값 활용하기

함수의 강력한 기능 중 하나는 외부와 데이터를 주고받을 수 있다는 점이에요. 블록에는 이런 기능이 없어서 데이터 처리에 한계가 있어요.  

<br>

### 쇼핑몰 할인 계산 예제

```javascript
// 할인된 가격과 절약 금액을 함께 계산하는 함수
function calculateDiscount(originalPrice, discountPercent) {
  let discountAmount = originalPrice * (discountPercent / 100);
  let finalPrice = originalPrice - discountAmount;
  
  return {
    originalPrice: originalPrice,
    discountAmount: discountAmount,
    finalPrice: finalPrice,
    savingMessage: `${discountAmount.toLocaleString()}원 절약!`
  };
}

// 다양한 상품에 적용
let laptopDeal = calculateDiscount(1500000, 20);
let headphoneDeal = calculateDiscount(300000, 15);

console.log(`노트북: ${laptopDeal.finalPrice.toLocaleString()}원 (${laptopDeal.savingMessage})`);
console.log(`헤드폰: ${headphoneDeal.finalPrice.toLocaleString()}원 (${headphoneDeal.savingMessage})`);
```

이런 식으로 함수를 사용하면 복잡한 계산도 재사용할 수 있는 형태로 만들 수 있어요.

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

## 실무에서 언제 무엇을 사용할까?

제가 5년간 개발하면서 정리한 블록과 함수 사용 기준을 공유해드릴게요.

<br>

### 블록을 사용하는 경우

1. **변수 스코프 제한**: 임시 변수가 다른 코드와 충돌하는 것을 방지
2. **코드 그룹화**: 관련된 코드를 시각적으로 묶어서 가독성 향상
3. **일회성 초기화**: 페이지 로딩 시 한 번만 실행되는 설정 코드

```javascript
// 페이지 초기화 시 한 번만 실행되는 코드
{
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById('copyright');
  copyrightElement.textContent = `© ${currentYear} 우리 회사. 모든 권리 보유.`;
}
```

<br>

### 함수를 사용하는 경우

1. **재사용이 필요한 로직**: 같은 코드를 여러 곳에서 사용
2. **사용자 상호작용**: 버튼 클릭, 폼 제출 등 이벤트 처리
3. **데이터 변환**: 입력값을 받아서 가공된 결과를 반환
4. **복잡한 계산**: 여러 단계의 처리가 필요한 로직

```javascript
// 이메일 유효성 검사 - 여러 곳에서 재사용
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// 폼 제출 시 사용
function handleFormSubmit() {
  const emailInput = document.getElementById('email').value;
  
  if (!isValidEmail(emailInput)) {
    alert('올바른 이메일 주소를 입력해주세요.');
    return;
  }
  
  // 이메일이 유효한 경우 처리...
}
```

<br>

## 자주 묻는 질문 (FAQ)

### Q1. 블록과 함수 중 어느 것이 성능이 더 좋나요?

블록과 함수의 성능 차이는 거의 없어요. 더 중요한 건 **코드의 목적에 맞게 사용하는 것**입니다. 재사용이 필요하면 함수를, 단순 그룹화가 목적이면 블록을 사용하세요. 성능보다는 코드의 가독성과 유지보수성을 고려해서 선택하는 것이 좋습니다.

<br>

### Q2. 함수 안에서 블록을 사용해도 되나요?

네, 전혀 문제없어요! 오히려 함수 내부에서 블록을 사용하면 변수 스코프를 더 세밀하게 관리할 수 있어서 좋습니다. 저도 복잡한 함수를 작성할 때 관련 코드를 블록으로 묶어서 정리하곤 해요.

```javascript
function processUserData(userData) {
  // 데이터 검증 블록
  {
    let isValid = userData && userData.email && userData.name;
    if (!isValid) return null;
  }
  
  // 데이터 가공 블록
  {
    let processedData = {
      email: userData.email.toLowerCase(),
      name: userData.name.trim()
    };
    return processedData;
  }
}
```

<br>

### Q3. 리액트를 배우기 전에 블록과 함수를 꼭 알아야 하나요?

네, 반드시 알아야 해요! 리액트는 함수형 컴포넌트를 주로 사용하는데, 자바스크립트 함수의 개념을 모르면 리액트를 이해하기 어려워요. 특히 함수의 매개변수, 반환값, 재사용성 개념은 리액트 컴포넌트와 직접적으로 연결되어 있어서 필수 지식입니다.

<br>

### Q4. 화살표 함수도 일반 함수와 동일하게 동작하나요?

기본적인 동작은 거의 동일해요. 하지만 `this` 바인딩, 호이스팅 등에서 차이가 있어요. 초보자라면 먼저 일반 함수 문법에 익숙해진 후에 화살표 함수를 배우는 것을 추천해요. 제가 처음 배울 때도 이 순서로 학습해서 혼란을 줄일 수 있었거든요.

<br>

### Q5. 블록 없이 함수만 사용해도 되나요?

기술적으로는 가능하지만 권장하지 않아요. 블록은 코드를 논리적으로 그룹화하고 변수 스코프를 관리하는 중요한 역할을 해요. 함수는 재사용과 모듈화에 초점을 맞춘 도구라서, 목적에 맞게 적절히 섞어서 사용하는 것이 좋은 코딩 습관입니다.

<br>

## 마무리

오늘 배운 자바스크립트 블록과 함수의 핵심 차이점을 정리해 보겠습니다.

• **실행 시점**: 블록은 즉시 실행, 함수는 호출 시 실행  
• **재사용성**: 블록은 일회용, 함수는 몇 번이든 재사용 가능  
• **데이터 처리**: 함수만 매개변수와 반환값 사용 가능  
• **사용 목적**: 블록은 코드 그룹화, 함수는 기능 모듈화

이 개념들을 확실히 이해하고 나면 리액트 학습이 훨씬 수월해질 거예요. 오늘 배운 내용으로 간단한 계산기나 할 일 목록 같은 작은 프로젝트를 만들어보세요. 직접 코드를 작성해 보면서 블록과 함수의 차이를 체감해 보는 것이 중요해요.

여러분의 자바스크립트 학습 경험은 어떠셨나요? 블록과 함수를 사용하면서 어려웠던 점이나 궁금한 점이 있다면 댓글로 공유해주세요! 

<br>