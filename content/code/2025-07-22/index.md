---
title: > 
    JavaScript this 완벽 가이드: 헷갈리는 5가지 상황 마스터하기

description: >
    JavaScript this 바인딩의 모든 것을 실습 예제로 배워보세요. 객체 메서드, 화살표 함수, 콜백 함수까지 헷갈리는 상황을 단계별로 정리한 완벽 가이드입니다. 

slug: 2025-07-22-javascript-this
date: 2025-07-22 00:00:00+0000
lastmod: 2025-07-22 00:00:00+0000

image: https://raw.githubusercontent.com/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-22-javascript-this.webp

categories:
    - JavaScript
tags:
    - 자바스크립트 기초
    - this 바인딩
    - 화살표 함수
---

> 💡 **선행 학습 추천**  
> 이 글을 더 쉽게 이해하려면 먼저 이 글들을 읽어보세요.
> - [JavaScript 스코프 ⭐️ 필수!](/code/2025-06-16-javascript-scope/) - 화살표 함수의 상위 스코프 개념 이해
> - [JavaScript 객체 ⭐️ 필수!](/code/2025-07-16-javascript-objects/) - this 키워드의 기본 개념과 객체 메서드

JavaScript를 배우다 보면 this 키워드 때문에 "내 코드가 왜 이상하게 동작하지?"라며 당황하는 경우가 많죠. 분명히 객체의 메서드를 호출했는데 undefined가 나오거나, 화살표 함수를 썼더니 예상과 다른 결과가 나오는 상황 말이에요.

저도 처음 JavaScript를 배울 때는 this가 정말 헷갈렸어요. 특히 React를 배우면서 이벤트 핸들러에서 this를 제대로 바인딩하지 못해서 몇 시간을 삽질한 경험이 있거든요. 그런데 this의 동작 원리를 제대로 이해하고 나니 코드가 훨씬 예측 가능해졌고, 버그도 현저히 줄어들었습니다.

이 글에서는 JavaScript this 바인딩의 핵심 개념부터 실무에서 자주 마주치는 헷갈리는 상황까지 명확하게 정리해드릴게요. 객체 메서드, 화살표 함수, 콜백 함수, setTimeout까지 단계별 실습 예제와 함께 차근차근 살펴보겠습니다.

<br>

## JavaScript this란 무엇인가?

**JavaScript this는 "현재 실행 중인 함수를 호출한 객체"를 가리키는 키워드입니다.** 쉽게 말해, 함수를 실행하는 주체가 누구인지 알려주는 역할을 해요. 일반 함수에서는 호출 방식에 따라 this가 달라지고, 화살표 함수에서는 함수가 정의된 위치의 상위 스코프를 따라갑니다. 이 차이점을 정확히 이해하는 것이 JavaScript this 마스터의 핵심입니다.

<br>

## JavaScript this가 헷갈리는 5가지 상황

실무에서 자주 마주치는 this 바인딩 상황들을 단계별로 정리해보겠습니다.

<br>

### 1. 객체 메서드에서의 this

객체의 메서드에서 this는 **그 메서드를 소유한 객체**를 가리킵니다.

```javascript
const person = {
    name: "김철수",
    sayHello: function() {
        console.log("안녕하세요, 저는 " + this.name + "입니다.");
    }
};

person.sayHello(); // "안녕하세요, 저는 김철수입니다."
```

**실무에서의 활용**

제가 쇼핑몰 프로젝트를 진행할 때, 장바구니 기능을 구현하면서 이런 패턴을 많이 사용했어요.

```javascript
const cart = {
    items: [],
    total: 0,
    
    addItem: function(item) {
        this.items.push(item);
        this.calculateTotal();
    },
    
    calculateTotal: function() {
        this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        console.log(`총 금액: ${this.total}원`);
    }
};

cart.addItem({ name: "노트북", price: 1000000 });
cart.addItem({ name: "마우스", price: 30000 });
// 총 금액: 1030000원
```

<br>

### 2. 일반 함수에서의 this

일반 함수를 단독으로 호출하면 this는 **전역 객체**(브라우저에서는 window, Node.js에서는 global)를 가리킵니다.

```javascript
function showThis() {
    console.log(this); // 브라우저에서는 window 객체
}

showThis();
```

**주의해야 할 상황**

객체 메서드 안에서 내부 함수를 정의할 때 이 문제가 자주 발생해요.

```javascript
const obj = {
    value: 10,
    show: function() {
        console.log(this.value); // 10 (obj.value)
        
        function inner() {
            console.log(this.value); // undefined (전역 객체의 value)
        }
        inner();
    }
};

obj.show();
```

이런 상황에서 실제로 많은 개발자들이 실수를 하죠. 해결 방법은 뒤에서 알려드릴게요.

<br>

### 3. 화살표 함수에서의 this

화살표 함수는 **자신만의 this를 가지지 않고**, 함수가 정의된 위치의 상위 스코프의 this를 사용합니다.

```javascript
const user = {
    name: "이영희",
    
    // 일반 함수
    sayHello: function() {
        console.log(this.name); // "이영희"
    },
    
    // 화살표 함수
    sayBye: () => {
        console.log(this.name); // undefined (전역 객체의 name)
    }
};

user.sayHello(); // "이영희"
user.sayBye(); // undefined
```

**화살표 함수의 올바른 활용**

그럼 화살표 함수는 언제 사용해야 할까요? 바로 **내부 함수나 콜백에서 상위 스코프의 this를 유지하고 싶을 때**입니다.

```javascript
const obj = {
    value: 10,
    show: function() {
        // 화살표 함수는 show 메서드의 this(obj)를 따라감
        const inner = () => {
            console.log(this.value); // 10
        };
        inner();
    }
};

obj.show(); // 10
```

<br>

### 4. 콜백 함수에서의 this

콜백 함수에서 this는 **호출하는 주체**에 따라 달라집니다. 이 부분이 가장 헷갈리는 부분 중 하나예요.

<br>

#### ❌ 잘못된 예시 (일반 함수 콜백)

```javascript
const timer = {
    sec: 0,
    start: function() {
        setInterval(function() {
            this.sec++; // this는 전역 객체를 가리킴
            console.log(this.sec); // NaN 또는 undefined
        }, 1000);
    }
};

timer.start();
```

<br>

#### ✅ 올바른 예시 (화살표 함수 콜백)

```javascript
const timer = {
    sec: 0,
    start: function() {
        setInterval(() => {
            this.sec++; // this는 timer 객체를 가리킴
            console.log(this.sec); // 1, 2, 3, ...
        }, 1000);
    }
};

timer.start();
```

**실무 팁**

React 컴포넌트에서 이벤트 핸들러를 작성할 때도 같은 원리가 적용돼요.

```javascript
class MyComponent extends React.Component {
    state = { count: 0 };
    
    // 화살표 함수로 정의하면 this 바인딩 문제 없음
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };
    
    render() {
        return <button onClick={this.handleClick}>클릭</button>;
    }
}
```

<br>

### 5. 이벤트 핸들러에서의 this

DOM 이벤트 핸들러에서 this는 **이벤트가 발생한 요소**를 가리킵니다.

```javascript
// HTML: <button id="myButton">클릭하세요</button>

document.getElementById('myButton').addEventListener('click', function() {
    console.log(this); // 클릭된 button 요소
    this.style.backgroundColor = 'red';
});
```

하지만 화살표 함수를 사용하면 상위 스코프의 this를 따라가므로 주의해야 해요.

```javascript
document.getElementById('myButton').addEventListener('click', () => {
    console.log(this); // window 객체 (전역 스코프)
    // this.style.backgroundColor = 'red'; // 에러!
});
```

<br>

## this 바인딩 문제 해결 방법

### 1. 화살표 함수 활용

가장 간단하고 현대적인 방법입니다.

```javascript
const calculator = {
    result: 0,
    
    add: function(number) {
        // 화살표 함수로 내부 로직 구현
        const addOperation = () => {
            this.result += number;
            return this.result;
        };
        
        return addOperation();
    }
};
```

<br>

### 2. 변수에 this 저장

전통적인 방법으로, 여전히 많은 레거시 코드에서 볼 수 있어요.

```javascript
const obj = {
    value: 10,
    show: function() {
        const self = this; // this를 변수에 저장
        
        function inner() {
            console.log(self.value); // 10
        }
        inner();
    }
};
```

<br>

### 3. bind() 메서드 활용

함수의 this를 명시적으로 바인딩하는 방법입니다.

```javascript
const user = {
    name: "홍길동",
    getName: function() {
        return this.name;
    }
};

// 변수에 할당할 때 bind()로 this 고정
const getName = user.getName.bind(user);
console.log(getName()); // "홍길동"
```

bind() 외에도 call(), apply()라는 바인딩 메서드들이 있어요. 이 세 가지는 실무에서 동적 this 바인딩이나 라이브러리 개발 시 유용하게 사용됩니다.  
다음 글에서는 call(), apply(), bind()의 차이점과 실무 활용법을 자세히 다뤄보겠습니다!  

<br>

## 실무에서 자주 하는 this 관련 실수들

### 실수 1: 메서드를 변수에 할당할 때

```javascript
const user = {
    name: "홍길동",
    getName: function() {
        return this.name;
    }
};

const getName = user.getName;
console.log(getName()); // undefined (this가 전역 객체를 가리킴)

// 해결 방법
const getName = user.getName.bind(user);
console.log(getName()); // "홍길동"
```

<br>

### 실수 2: 배열 메서드의 콜백에서 this 사용

```javascript
const processor = {
    prefix: "처리됨:",
    
    process: function(items) {
        // ❌ 잘못된 방법
        return items.map(function(item) {
            return this.prefix + item; // this는 전역 객체
        });
        
        // ✅ 올바른 방법
        return items.map(item => {
            return this.prefix + item; // this는 processor 객체
        });
    }
};
```

<br>

## 자주 묻는 질문 (FAQ)

### Q1. 화살표 함수는 언제 사용하고 일반 함수는 언제 사용해야 하나요?

**답변**: 제가 실무에서 경험한 기준을 말씀드리면, **객체의 메서드는 일반 함수로, 콜백이나 내부 함수는 화살표 함수로** 작성하는 것이 안전합니다. 화살표 함수는 상위 스코프의 this를 따라가므로, 메서드 내부에서 this를 유지하고 싶을 때 특히 유용해요.

<br>

### Q2. setTimeout 안에서 this를 사용할 때 주의할 점은 무엇인가요?

**답변**: setTimeout의 콜백 함수는 전역 스코프에서 실행되므로, 일반 함수로 작성하면 this가 전역 객체를 가리킵니다. 객체의 속성에 접근하려면 반드시 화살표 함수를 사용하거나 bind()를 활용해야 해요. 저는 대부분의 경우 화살표 함수를 사용합니다.

<br>

### Q3. React에서 this 바인딩 문제를 어떻게 해결하나요?

**답변**: React 클래스 컴포넌트에서는 이벤트 핸들러를 화살표 함수로 정의하거나, 생성자에서 bind()를 사용하는 방법이 있습니다. 하지만 요즘은 함수 컴포넌트와 훅을 사용하는 것이 더 일반적이고, 이 경우 this 바인딩 문제 자체가 발생하지 않아요.

<br>

### Q4. 화살표 함수를 객체 메서드로 사용하면 안 되는 이유는 무엇인가요?

**답변**: 화살표 함수는 자신만의 this를 가지지 않고 상위 스코프의 this를 따라가기 때문에, 객체의 메서드로 사용하면 해당 객체가 아닌 전역 객체를 가리키게 됩니다. 

**여기서 중요한 포인트는 "객체는 스코프가 아니다"라는 것입니다.** JavaScript에서 스코프를 만드는 건 함수, 블록(if, for, while 등)뿐이에요. 객체는 단순히 데이터를 담는 그릇일 뿐 스코프를 생성하지 않습니다.

```javascript
const user = {
    name: "홍길동",
    sayHello: () => {
        // 화살표 함수는 user 객체 내부가 아닌
        // 전역 스코프에서 this를 찾음
        console.log(this.name); // undefined
    }
};
```

그래서 객체의 메서드는 일반 함수로 정의하는 것이 좋습니다.

<br>

### Q5. this 바인딩을 디버깅할 때 좋은 방법이 있나요?

**답변**: 가장 간단한 방법은 `console.log(this)`를 함수 내부에 추가해서 this가 무엇을 가리키는지 직접 확인하는 것입니다. 또한 브라우저 개발자 도구의 디버거를 사용하면 함수 실행 시점의 this 값을 정확히 파악할 수 있어요.

<br>

## 핵심 정리

JavaScript this 바인딩의 핵심 포인트를 정리하면

* **객체 메서드**: this는 메서드를 소유한 객체를 가리킵니다.
* **일반 함수**: this는 전역 객체를 가리킵니다.
* **화살표 함수**: this는 상위 스코프의 this를 따라갑니다.
* **콜백 함수**: 화살표 함수를 사용하면 this 바인딩 문제를 해결할 수 있습니다.

오늘 배운 내용으로 간단한 타이머 객체를 만들어보세요. 시작, 정지, 리셋 기능을 가진 타이머를 구현하면서 this 바인딩을 직접 경험해보시길 추천합니다. 실습을 통해 익힌 지식이 가장 오래 기억에 남거든요.

다음 글에서는 JavaScript call(), apply(), bind() 메서드에 대해 자세히 다뤄보겠습니다. 동적 this 바인딩과 고급 활용법을 마스터하면 더욱 유연하고 강력한 코드를 작성할 수 있을 거예요.

여러분의 JavaScript this 관련 경험은 어떠셨나요? 어떤 상황에서 가장 헷갈리셨는지 댓글로 공유해주세요! 함께 토론하면서 더 깊이 이해해보아요. 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this">MDN Web Docs - this</a>
</div>