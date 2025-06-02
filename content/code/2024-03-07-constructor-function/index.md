---
title: >  
    JavaScript 객체 생성의 핵심: new 키워드와 생성자 함수

description: >  
    자바스크립트에서 생성자 함수와 new 키워드를 활용하여 객체를 생성하고 초기화하는 기본 개념과 활용 방법에 대한 설명을 다룹니다.

slug: 2024-03-07-constructor-function
date: 2024-03-07 00:00:00+0000
lastmod: 2024-03-07 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-07-constructor-function.webp

categories:
    - JavaScript
tags:

---
자바스크립트에서 객체를 만들 때, 생성자 함수는 매우 강력하고 유용한 도구입니다. 생성자 함수는 객체를 생성하고 초기화하는 역할을 수행하며, 객체 지향 프로그래밍에서 중요한 개념 중 하나입니다. 이 글에서는 자바스크립트 생성자 함수의 기본 개념과 다양한 활용 방법을 알아보겠습니다.  



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

## 생성자 함수란?

생성자 함수는 일종의 템플릿으로, 객체를 생성하고 초기화하는 데 사용됩니다. 일반적으로 함수 이름의 첫 글자를 대문자로 쓰는 관습이 있어, 생성자 함수를 식별하기 쉽게 합니다. 예를 들어, 다음은 간단한 생성자 함수의 예입니다.

```javascript
function Person(name, age) {
    // 객체의 속성을 정의합니다.
    this.name = name;
    this.age = age;

    // 객체의 메서드를 정의합니다.
    this.sayHello = function() {
        console.log(`안녕하세요, 제 이름은 ${this.name}이고, ${this.age}살입니다.`);
    };
}
```

이 생성자 함수는 `Person`이라는 객체를 만들기 위한 템플릿으로 사용됩니다.  

<br>

## 객체 생성과 초기화

생성자 함수를 사용하여 객체를 생성하고 초기화하는 방법은 다음과 같습니다.

```javascript
const person1 = new Person('John', 25);
const person2 = new Person('Jane', 30);

// 생성된 객체의 속성과 메서드를 확인합니다.
console.log(person1.name); // 출력: John
console.log(person2.age); // 출력: 30
person1.sayHello(); // 출력: 안녕하세요, 제 이름은 John이고, 25살입니다.
person2.sayHello(); // 출력: 안녕하세요, 제 이름은 Jane이고, 30살입니다.
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


위 코드에서 `new` 키워드를 사용하여 `Person` 생성자 함수를 호출하면, 새로운 객체가 생성되고 해당 객체의 속성들과 메서드들이 초기화됩니다.

<br>


## 프로토타입과 상속

생성자 함수는 자바스크립트의 프로토타입 기반 상속을 구현하는데 사용됩니다. 모든 객체는 해당 생성자 함수의 프로토타입을 공유하며, 이를 통해 객체 간에 속성과 메서드를 공유할 수 있습니다.

```javascript
// Person 생성자 함수의 프로토타입에 메서드를 추가합니다.
Person.prototype.sayGoodbye = function() {
    console.log(`안녕히 가세요, 제 이름은 ${this.name}이었습니다.`);
};

person1.sayGoodbye(); // 출력: 안녕히 가세요, 제 이름은 John이었습니다.
person2.sayGoodbye(); // 출력: 안녕히 가세요, 제 이름은 Jane이었습니다.
```

위 코드에서 `Person` 생성자 함수의 프로토타입에 `sayGoodbye` 메서드를 추가하면, `Person` 생성자 함수를 통해 생성된 모든 객체는 `sayGoodbye` 메서드를 사용할 수 있습니다.

<br>

## 생성자 함수의 오버라이딩

프로토타입 객체에서 상속받은 메서드를 재정의하여 객체마다 다른 동작을 구현할 수 있습니다.

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function() {
    console.log(`안녕하세요, 제 이름은 ${this.name}입니다.`);
};

function Employee(name, department) {
    Person.call(this, name); // 상속
    this.department = department;
}

Employee.prototype.sayHello = function() {
    console.log(`안녕하세요, 제 이름은 ${this.name}이고, ${this.department} 부서에서 일하고 있습니다.`);
};

const person = new Person('John');
const employee = new Employee('Jane', '영업');

person.sayHello(); // 출력: 안녕하세요, 제 이름은 John입니다.
employee.sayHello(); // 출력: 안녕하세요, 제 이름은 Jane이고, 영업 부서에서 일하고 있습니다.
```

위 코드에서 `Employee` 생성자 함수는 `Person` 생성자 함수를 상속받아 `name` 속성을 재사용합니다. 또한 `sayHello` 메서드를 오버라이딩하여 부서 정보를 추가로 출력합니다.

<br>

## 다양한 활용 예시

생성자 함수는 다양한 상황에서 활용될 수 있습니다.

* **복잡한 객체 생성:** 여러 속성과 메서드를 가진 복잡한 객체를 쉽게 생성할 수 있습니다.
* **코드 재사용:** 프로토타입을 통해 코드를 재사용하고 유지보수성을 향상시킬 수 있습니다.
* **객체 지향 프로그래밍:** 객체 지향 프로그래밍 패턴을 구현하여 코드의 구조와 가독성을 높일 수 있습니다.

**예시**  

<div class="mt-1">

* **사용자 정보 관리:** 이름, 이메일 주소, 비밀번호 등 사용자 정보를 관리하는 객체를 생성할 수 있습니다.
* **제품 정보 관리:** 제품 이름, 가격, 설명 등 제품 정보를 관리하는 객체를 생성할 수 있습니다.
* **게임 개발:** 게임 캐릭터, 배경, 아이템 등 게임 요소를 생성하는 객체를 생성할 수 있습니다.



<br>

## 결론

자바스크립트 생성자 함수는 객체 지향 프로그래밍의 핵심 개념 중 하나로, 객체를 생성하고 초기화하는 강력한 도구입니다. 프로토타입을 통한 상속을 지원하여 코드의 재사용성을 높이고, 복잡한 객체를 간편하게 생성할 수 있게 해줍니다. 이를 통해 코드를 더 쉽게 이해하고 유지보수하기 쉽게 만들 수 있습니다. 생성자 함수를 잘 이해하고 활용한다면, 자바스크립트에서 더 나은 객체 지향 코드를 작성할 수 있을 것입니다.


