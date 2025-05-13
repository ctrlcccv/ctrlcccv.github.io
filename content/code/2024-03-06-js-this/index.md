---
title: >  
    JavaScript this 예제: 암시적, 명시적, new 바인딩 비교

description: >  
    JavaScript에서 this 키워드의 암시적, 명시적, new 바인딩 등 관련된 예제를 통해 이해를 돕는 내용으로, 함수의 실행 컨텍스트에 따라 다양한 객체에 this가 바인딩되는 규칙을 설명합니다.   

slug: 2024-03-06-js-this
date: 2024-03-06 01:00:00+0000
lastmod: 2024-03-06 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-06-js-this.webp

categories:
    - JavaScript
tags:

---
JavaScript에서의 this는 함수가 실행될 때 동적으로 결정되는 특별한 키워드로, 코드 내에서 현재 실행 컨텍스트를 나타냅니다. this의 동작 방식은 함수가 호출되는 상황에 따라 다르며, 이는 개발자에게 코드를 작성하는 동안 유연성을 제공합니다. this의 개념을 명확히 이해하고 활용하는 것은 JavaScript를 효과적으로 다루는 핵심 요소 중 하나입니다.  

이 글에서는 this의 주요 바인딩 규칙과 예시를 살펴보겠습니다. 암시적 바인딩, 명시적 바인딩, new 바인딩, 전역 바인딩 등의 다양한 바인딩 방식을 통해 this가 어떻게 작동하는지 이해하고, 화살표 함수와 최신 JavaScript 기능이 this에 미치는 영향도 알아보겠습니다.   


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

## this란 무엇일까요?

JavaScript에서 this는 함수가 실행될 때 동적으로 결정되는 특별한 키워드입니다. 이는 함수가 어떤 컨텍스트에서 실행되는지에 따라 다양한 객체를 참조하며, 코드의 작동 방식에 큰 영향을 미칩니다.


**this의 역할**

<div class="mt-1">

* 함수의 실행 컨텍스트를 나타냅니다.
* 함수 내에서 현재 객체를 참조합니다.
* 객체 메서드를 호출할 때 객체 자체를 참조합니다.
* <a href="/code/2024-03-07-constructor-function/" target="_blank" class="link">생성자 함수</a>를 호출할 때 새로 생성된 객체를 참조합니다.

</div>

**this의 예시 코드**

```javascript
const person = {
    name: 'John',
    greet() {
        console.log(`Hello, ${this.name}!`); // this는 person 객체를 참조합니다.
    }
};

person.greet(); // 출력: Hello, John!

function globalFunction() {
    console.log(this === window); // this는 전역 객체(window)를 참조합니다.
}

globalFunction(); // 출력: true
```

<br>

## this 바인딩 예시 코드

**암시적 바인딩**

JavaScript에서 가장 흔하게 사용되는 this 바인딩 중 하나는 암시적 바인딩입니다. 이는 함수가 호출될 때, 해당 함수가 속한 객체에 바인딩 되는 것을 의미합니다.


<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```javascript
const person = {
    name: 'John',
    greet: function() {
        console.log(`Hello, ${this.name}!`);
    }
};

person.greet(); // 출력: Hello, John!
```
**명시적 바인딩**

명시적 바인딩은 함수의 this 값을 개발자가 직접 지정할 수 있도록 하는 방법입니다. 이를 위해 `call`, `apply`, `bind` 등의 메서드가 사용됩니다.

```javascript
function greet() {
    console.log(`Hello, ${this.name}!`);
}

const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

greet.call(person1); // 출력: Hello, Alice!
greet.apply(person2); // 출력: Hello, Bob!

const greetPerson1 = greet.bind(person1);
greetPerson1(); // 출력: Hello, Alice!
```
**new 바인딩**

'new' 키워드를 사용하여 생성자 함수를 호출할 때, this는 새로 생성된 객체에 바인딩 됩니다.

```javascript
function Person(name) {
    this.name = name;
}

const john = new Person('John');
console.log(john.name); // 출력: John
```
**전역 바인딩**

함수가 어떠한 객체에도 속하지 않을 때, this는 전역 객체에 바인딩 됩니다. 브라우저 환경에서는 `window` 객체가 전역 객체입니다.

```javascript
function globalFunction() {
    console.log(this === window); // 출력: true
}

globalFunction();
```
**<a href="/code/2024-03-06-arrow-function/" target="_blank" class="link">화살표 함수</a>**

화살표 함수는 this 바인딩을 암시적으로 상속하지 않습니다. 

```javascript
const person = {
    name: 'John',
    greet: () => {
        console.log(`Hello, ${this.name}!`);
    }
};

person.greet(); // 출력: Hello, undefined!
```

위 코드에서 this는 화살표 함수가 속한 객체인 `person`이 아니라, 화살표 함수가 정의된 범위인 즉, 전역 객체에 바인딩 됩니다.

<br>

## 관련된 최신 JavaScript 기능

최신 JavaScript 버전에는 this 바인딩과 관련된 새로운 기능들이 도입되었습니다.

* **Reflect.get()** 메서드는 객체의 속성값을 가져올 때 this 바인딩을 명시적으로 지정할 수 있도록 합니다.
* **Reflect.apply()** 메서드는 함수를 호출할 때 this 바인딩을 명시적으로 지정할 수 있도록 합니다.

<br>

## 결론
this 바인딩은 JavaScript에서 함수의 실행 컨텍스트를 결정하는 중요한 개념입니다. 함수가 어떻게 호출되는지에 따라 'this'는 다양한 객체에 바인딩 될 수 있으며, 이는 코드의 작동 방식에 큰 영향을 미칩니다.  

본 블로그 글에서는 this 바인딩의 주요 규칙과 예시를 통해 기본적인 이해를 제공했습니다. 또한, 화살표 함수와 최신 JavaScript 기능과 관련된 this 바인딩의 변화도 다루었습니다.  

this 바인딩은 다양한 상황에서 다양한 방식으로 작동하기 때문에 완전히 이해하기 어려울 수 있습니다. 하지만, 꾸준히 예시를 통해 경험하고 다양한 상황에서 this 바인딩 작동 방식을 파악하여 코드 작성 능력을 향상시킬 수 있습니다.
