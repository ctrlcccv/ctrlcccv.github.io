---
title: >  
    JavaScript 객체란 무엇인가? 초보자도 이해하는 쉬운 설명

description: >  
    JavaScript 객체의 모든 것을 실무 예제와 함께 배워보세요. 객체 리터럴부터 this 키워드, 메서드 활용, 얕은 복사 vs 깊은 복사까지 초보자도 쉽게 이해할 수 있는 완전 가이드입니다.

slug: 2025-07-15-javascript-objects
date: 2025-07-15 00:00:00+0000
lastmod: 2025-07-15 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-15-javascript-objects.webp

categories:
    - JavaScript 
tags:
    - 자바스크립트 기초
    - 객체
    - 메서드
    
---
> 💡 **선행 학습 추천**  
> 이 글을 더 쉽게 이해하려면 먼저 이 글들을 읽어보세요.
> - [자바스크립트 스코프 ⭐️ 필수!](/code/2025-06-16-javascript-scope/) - this 키워드와 메서드 이해의 기초
> - [JavaScript 원시타입 vs 참조타입](/code/2025-06-30-primitive-reference/) - 객체 복사와 참조의 차이점
> - [JavaScript 얕은 복사 vs 깊은 복사](/code/2025-07-04-javascript-copy/) - 객체 조작 시 가장 중요한 개념

JavaScript를 배우다 보면 객체(Object)라는 개념에서 "이게 뭐지?"하며 막막함을 느끼죠. 저도 처음엔 객체가 단순히 데이터를 담는 상자 정도로만 생각했는데, 실제 프로젝트를 진행하면서 객체가 JavaScript의 핵심이자 모든 것의 기반이라는 걸 깨달았어요.

이 글에서는 JavaScript 객체의 개념부터 this 키워드, 메서드 활용법까지 실무에서 바로 써먹을 수 있는 내용들을 명확하게 알려드릴게요. 기본 문법부터 객체 복사, 구조 분해 할당까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.

<br>

## JavaScript 객체란?

**JavaScript 객체는 관련된 데이터와 기능을 하나로 묶어놓은 데이터 구조입니다.** 속성(데이터)과 행동(메서드)을 함께 가지고 있으며, 중괄호 `{}`를 사용해 만들 수 있습니다. 객체는 키-값 쌍으로 구성되어 있어 복잡한 데이터를 체계적으로 관리할 수 있게 해줍니다.

<br>

## 객체가 왜 중요할까요?

실제 프로젝트에서는 사용자 정보, 상품 데이터, 설정값 등 모든 것이 객체 형태로 다뤄져요. 제가 쇼핑몰 프로젝트를 진행할 때, 상품 하나만 해도 이름, 가격, 재고, 카테고리 등 여러 정보가 필요했는데, 이를 각각 변수로 관리하려니 너무 복잡했거든요. 객체를 사용하니 관련 정보를 깔끔하게 정리할 수 있었어요.

```javascript
// ❌ 변수로 따로 관리하면 복잡해요
const productName = "MacBook Pro";
const productPrice = 2000000;
const productStock = 5;
const productCategory = "laptop";

// ✅ 객체로 묶으면 깔끔하고 관리하기 쉬워요
const product = {
    name: "MacBook Pro",
    price: 2000000,
    stock: 5,
    category: "laptop"
};
```

<br>

## 객체 기본 문법과 사용법

### 1. 객체 생성하기

객체를 만드는 가장 기본적인 방법은 객체 리터럴을 사용하는 것입니다.

```javascript
const person = {
    name: "김철수",
    age: 25,
    job: "개발자",
    city: "서울"
};

console.log(person); // {name: "김철수", age: 25, job: "개발자", city: "서울"}
```

<br>

### 2. 객체 속성에 접근하는 방법

| 방법 | 문법 | 언제 사용하나요? | 예시 |
|------|------|------------------|------|
| 점 표기법 | `객체.속성명` | 속성명이 확실할 때 | `person.name` |
| 대괄호 표기법 | `객체["속성명"]` | 동적으로 접근할 때 | `person["name"]` |
| 변수를 통한 접근 | `객체[변수]` | 속성명이 변수에 있을 때 | `person[propertyName]` |

```javascript
const user = {
    name: "이영희",
    age: 28,
    email: "younghee@example.com"
};

// 점 표기법
console.log(user.name); // "이영희"

// 대괄호 표기법
console.log(user["age"]); // 28

// 변수를 사용한 접근
const propertyName = "email";
console.log(user[propertyName]); // "younghee@example.com"
```

<br>

### 3. 객체 속성 수정하기

1. **속성 추가하기**: 존재하지 않는 속성에 값을 할당하면 새로 추가됩니다.
2. **속성 변경하기**: 기존 속성에 새 값을 할당합니다.
3. **속성 삭제하기**: `delete` 키워드를 사용합니다.

```javascript
const student = {
    name: "박민수",
    grade: "A"
};

// 속성 추가
student.age = 20;
student.major = "컴퓨터공학";

// 속성 변경
student.grade = "A+";

// 속성 삭제
delete student.age;

console.log(student); // {name: "박민수", grade: "A+", major: "컴퓨터공학"}
```


<br>

## 객체 메서드 마스터하기

### 메서드란 무엇인가요?

메서드는 객체 안에 들어있는 함수입니다. 객체가 할 수 있는 "행동"을 정의하죠.

```javascript
const calculator = {
    result: 0,
    
    // ✅ ES6+ 축약 문법 (권장)
    add(number) {
        this.result += number;
        return this.result;
    },
    
    // ✅ 기존 문법 (function 키워드 사용)
    subtract: function(number) {
        this.result -= number;
        return this.result;
    },
    
    getResult() {
        return this.result;
    },
    
    // 메서드 체이닝을 위해 this 반환
    reset() {
        this.result = 0;
        return this; // 체이닝 가능하게 만들기
    }
};

// 메서드 사용
calculator.add(10).add(5).subtract(3);
console.log(calculator.getResult()); // 12
```

**기존 문법이 필요한 경우:**
```javascript
const obj = {
    // 1. 동적 프로퍼티명 (진짜 필요한 경우!)
    [`method${dynamicName}`]: function() {
        return "동적으로 생성된 메서드";
    },
    
    // 2. 나머지는 대부분 개인/팀 취향 문제
    regularMethod() {
        return "축약 문법으로 충분해요!";
    }
};
```

**메서드 정의 방법 비교:**

| 방법 | 문법 | 언제 사용하나요? |
|------|------|------------------|
| **ES6+ 축약 문법** | `methodName() { ... }` | 일반적인 메서드 (권장) |
| **기존 문법** | `methodName: function() { ... }` | 동적 프로퍼티명, 레거시 코드 |

실제로는 **축약 문법**을 쓰고, 동적 프로퍼티명이 필요한 특별한 경우에만 기존 문법을 사용합니다!  

<br>

### this 키워드 완전 정복

`this`는 현재 메서드를 호출한 객체를 가리킵니다. 제가 처음 배울 때 가장 헷갈렸던 부분이었는데, 간단한 규칙만 기억하면 돼요.

**핵심 규칙**: 매개변수로 받지 않고 객체의 속성에 접근해야 할 때는 반드시 `this`를 사용해야 합니다!

```javascript
const shoppingCart = {
    items: [],
    total: 0,
    
    // ✅ this가 필요한 경우 - 객체 속성 접근
    addItem(name, price) {
        this.items.push({ name, price });
        this.total += price;
        console.log(`${name}이(가) 장바구니에 추가되었습니다.`);
    },
    
    // ✅ this가 필요한 경우 - 객체 속성 변경
    clearCart() {
        this.items = [];
        this.total = 0;
        console.log("장바구니가 비워졌습니다.");
    },
    
    // ❌ this가 불필요한 경우 - 매개변수만 사용
    calculateTax(amount) {
        return amount * 0.1; // 외부 데이터만 사용
    }
};

shoppingCart.addItem("노트북", 1500000);
shoppingCart.addItem("마우스", 50000);
console.log(shoppingCart.total); // 1550000
```


<br>

## 실무에서 자주 쓰이는 객체 패턴

### 1. 중첩 객체 다루기

실제 프로젝트에서는 객체 안에 객체가 들어있는 경우가 많아요.

```javascript
const employee = {
    name: "김개발",
    position: "프론트엔드 개발자",
    contact: {
        email: "kim.dev@company.com",
        phone: "010-1234-5678",
        address: {
            city: "서울",
            district: "강남구",
            zipCode: "06288"
        }
    },
    skills: ["JavaScript", "React", "TypeScript"]
};

// 중첩 객체 접근
console.log(employee.contact.email); // "kim.dev@company.com"
console.log(employee.contact.address.city); // "서울"
```

<br>

### 2. 객체 복사 - 얕은 복사 vs 깊은 복사

이 부분은 실무에서 정말 중요해요! 제가 프로젝트에서 버그를 만들어낸 가장 큰 원인 중 하나였거든요.

```javascript
const originalUser = {
    name: "홍길동",
    hobbies: ["독서", "영화감상"]
};

// ❌ 얕은 복사 - 중첩된 배열은 참조 공유
const copiedUser = { ...originalUser };
copiedUser.hobbies.push("게임");

console.log(originalUser.hobbies); // ["독서", "영화감상", "게임"] - 원본도 변경됨!
console.log(copiedUser.hobbies);   // ["독서", "영화감상", "게임"]

// ✅ 깊은 복사 - 완전히 독립적인 복사본
const deepCopiedUser = JSON.parse(JSON.stringify(originalUser));
deepCopiedUser.hobbies.push("요리");

console.log(originalUser.hobbies);   // ["독서", "영화감상", "게임"] - 원본 유지
console.log(deepCopiedUser.hobbies); // ["독서", "영화감상", "게임", "요리"]
```

<br>

### 3. 구조 분해 할당으로 효율적으로 데이터 추출하기

**구조 분해 할당(Destructuring Assignment)은 객체나 배열에서 원하는 값만 쏙쏙 뽑아내는 JavaScript 문법입니다.** 기존에는 `obj.property` 형태로 하나하나 접근해야 했지만, 구조 분해 할당을 사용하면 한 번에 여러 값을 변수로 만들 수 있어요.

```javascript
const apiResponse = {
    status: "success",
    data: {
        user: {
            id: 123,
            name: "김코딩",
            email: "coding@example.com"
        },
        posts: ["post1", "post2"]
    }
};

// ❌ 기존 방식 - 반복적이고 번거로워요
const status = apiResponse.status;
const user = apiResponse.data.user;
const posts = apiResponse.data.posts;
const name = user.name;
const email = user.email;

// ✅ 구조 분해 할당으로 깔끔하게 추출
const { status } = apiResponse;
const { user, posts } = apiResponse.data;
const { name, email } = user;

console.log(name);   // "김코딩"
console.log(email);  // "coding@example.com"
console.log(status); // "success"
```

<br>

## 생성자 함수와 프로토타입 미리보기

나중에 더 자세히 배우게 될 내용이지만, 간단히 맛보기로 알아볼까요?

<br>

### 생성자 함수

같은 구조의 객체를 여러 개 만들어야 할 때 사용해요.

```javascript
// 생성자 함수 (대문자로 시작하는 것이 관례)
function User(name, age) {
    this.name = name;
    this.age = age;
    this.introduce = function() {
        console.log(`안녕하세요! ${this.name}입니다.`);
    };
}

// new 키워드로 객체 생성
const user1 = new User("김철수", 25);
const user2 = new User("이영희", 30);

user1.introduce(); // "안녕하세요! 김철수입니다."
user2.introduce(); // "안녕하세요! 이영희입니다."
```

<br>

### 프로토타입

모든 객체가 공유하는 메서드를 정의할 때 사용해요.

```javascript
function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

// 모든 Car 객체가 공유하는 메서드
Car.prototype.start = function() {
    console.log(`${this.brand} ${this.model}의 시동을 겁니다.`);
};

const myCar = new Car("현대", "아반떼");
myCar.start(); // "현대 아반떼의 시동을 겁니다."
```

<br>

## 자주 묻는 질문 (FAQ)

### Q: JavaScript 객체와 배열의 차이점은 무엇인가요?

객체는 키-값 쌍으로 데이터를 저장하고, 배열은 순서가 있는 데이터 목록을 저장해요. 객체는 속성 이름으로 접근하고, 배열은 인덱스 번호로 접근하죠. 실무에서는 사용자 정보 같은 구조화된 데이터는 객체로, 게시글 목록 같은 순서가 있는 데이터는 배열로 관리합니다.

<br>

### Q: this 키워드를 언제 써야 하나요?

객체의 속성이나 메서드에 접근할 때 `this`를 사용해요. 매개변수로 받은 값만 사용하는 경우에는 `this`가 필요 없지만, 객체 자신의 데이터를 읽거나 수정할 때는 반드시 `this`를 써야 합니다. 저도 처음엔 헷갈렸는데, "객체 자신의 것을 쓸 때는 this"라고 기억하시면 돼요.

<br>

### Q: 객체 복사할 때 스프레드 연산자와 JSON 방식의 차이점은?

스프레드 연산자(`...`)는 얕은 복사를 하기 때문에 중첩된 객체나 배열은 참조를 공유해요. JSON 방식(`JSON.parse(JSON.stringify())`)은 깊은 복사를 하지만 함수나 undefined 값은 복사되지 않아요. 실무에서는 상황에 따라 적절한 방법을 선택해야 하는데, 단순한 객체라면 스프레드 연산자를, 복잡한 중첩 구조라면 깊은 복사 방법을 사용하는 게 좋아요.

<br>

### Q: 메서드 체이닝이 무엇이고 어떻게 구현하나요?

메서드 체이닝은 여러 메서드를 연속으로 호출하는 기법이에요. 메서드에서 `this`를 반환하면 체이닝이 가능해집니다. jQuery나 로다시 같은 라이브러리에서 많이 사용하는 패턴인데, 코드를 더 읽기 쉽고 간결하게 만들어줘요.

```javascript
// 메서드 체이닝 예제 - 사용자 프로필 관리
const userProfile = {
    name: "",
    email: "",
    age: 0,
    
    setName(name) {
        this.name = name;
        return this; // 체이닝을 위해 this 반환
    },
    
    setEmail(email) {
        this.email = email;
        return this;
    },
    
    setAge(age) {
        this.age = age;
        return this;
    },
    
    getInfo() {
        console.log(`이름: ${this.name}, 이메일: ${this.email}, 나이: ${this.age}`);
        return this;
    }
};

// ❌ 체이닝 없이 사용
userProfile.setName("김철수");
userProfile.setEmail("kimcs@example.com");
userProfile.setAge(25);
userProfile.getInfo();

// ✅ 메서드 체이닝으로 깔끔하게
userProfile
    .setName("이영희")
    .setEmail("younghee@example.com")
    .setAge(28)
    .getInfo(); // "이름: 이영희, 이메일: younghee@example.com, 나이: 28"
```

<br>

### Q: 객체 속성에 접근할 때 점 표기법과 대괄호 표기법 중 어떤 걸 써야 하나요?

일반적으로는 점 표기법을 사용하는 게 좋아요. 더 간결하고 읽기 쉽거든요. 하지만 속성 이름에 공백이나 특수문자가 있거나, 변수를 통해 동적으로 접근해야 할 때는 대괄호 표기법을 사용해야 해요. 실무에서는 대부분 점 표기법을 쓰고, 필요할 때만 대괄호 표기법을 쓰는 편이에요.

<br>

## 마무리

지금까지 JavaScript 객체의 핵심 개념들을 살펴봤어요. 정리하면

* **객체는 관련된 데이터와 기능을 묶어놓은 데이터 구조**로, 실무에서 가장 많이 사용하는 타입입니다.
* **this 키워드는 객체 자신을 가리키며**, 객체의 속성에 접근할 때 반드시 필요해요.
* **메서드는 객체의 행동을 정의**하고, 체이닝을 통해 더 효율적인 코드를 작성할 수 있어요.
* **얕은 복사와 깊은 복사의 차이**를 이해하고 상황에 맞게 적절한 방법을 선택하는 것이 중요해요.

오늘 배운 내용으로 간단한 사용자 관리 시스템이나 쇼핑 카트 기능을 만들어보세요. 직접 코드를 작성해보는 것이 가장 빠른 학습 방법이에요!

다음 글에서는 생성자 함수와 프로토타입에 대해 더 자세히 다뤄보겠습니다. 클래스 문법과의 관계도 함께 알아볼 예정이에요.

여러분의 JavaScript 객체 학습 경험은 어떠셨나요? 어려웠던 부분이나 궁금한 점이 있다면 댓글로 공유해주세요! 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_objects">MDN Web Docs - 객체로 작업하기</a>
    <a target="_blank" href="https://tc39.es/ecma262/#sec-object-type">ECMAScript 사양 - Object Type</a>
</div>