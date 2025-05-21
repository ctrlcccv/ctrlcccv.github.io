---
title: >  
    JavaScript Computed Property Name: 동적 객체 구성 방법

description: >  
    JavaScript의 Computed Property Name은 객체의 속성 이름을 동적으로 생성하여 유연성을 높이는 데 활용됩니다.  

slug: 2024-04-04-computed-property-name
date: 2024-04-04 00:00:00+0000
lastmod: 2024-04-04 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-04-04-computed-property-name.webp

categories:
    - JavaScript
tags:

---
자바스크립트에서 객체를 다룰 때, 특히 객체의 속성 이름을 동적으로 생성하고자 할 때가 있습니다. 이때 ES6에서 도입된 Computed Property Name(계산된 속성 이름)은 매우 유용한 기능입니다. 이 기능은 객체 속성의 이름을 변수나 식을 통해 동적으로 생성할 수 있게 해줍니다. 이 글에서는 Computed Property Name이 무엇인지, 어떻게 사용하는지, 그리고 실제 개발에서 어떻게 활용할 수 있는지에 대해 알아보겠습니다.  


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

## 기본 개념

Computed Property Name은 객체 리터럴 내부에서 속성 이름을 동적으로 생성하는 기능입니다. 객체 리터럴의 속성 이름으로는 변수나 식을 사용할 수 있습니다. 이를 통해 객체를 보다 동적으로 구성할 수 있습니다.  

```javascript
const prefix = "property_";
const obj = {
    [prefix + "name"]: "value"
};

console.log(obj); // { property_name: "value" }
```

위 코드에서 `obj` 객체는 `prefix` 변수와 "name" 문자열을 연결하여 `property_name`이라는 속성 이름을 동적으로 생성합니다.  

<br>

## 표현식 사용

Computed Property Name에서는 임의의 표현식도 사용할 수 있습니다. 이를 통해 보다 유연하게 속성 이름을 생성할 수 있습니다.

```javascript
const obj = {
    [2 + 2]: "four",
    ["hello" + "world"]: "helloworld"
};

console.log(obj); // { 4: "four", helloworld: "helloworld" }
```

위 코드에서 `obj` 객체는 2와 2를 더하여 `4`라는 속성 이름을 생성하고, "hello"와 "world" 문자열을 연결하여 `helloworld`라는 속성 이름을 동적으로 생성합니다.  


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

## 메서드 정의

Computed Property Name은 메서드 정의에서도 사용할 수 있습니다. 이를 통해 메서드의 이름을 동적으로 지정할 수 있습니다.  

```javascript
const methodName = "dynamicMethod";

const obj = {
    [methodName]() {
        console.log("Dynamic method");
    }
};

obj.dynamicMethod(); // "Dynamic method"
```

위 코드에서 `obj` 객체는 `methodName` 변수를 사용하여 `dynamicMethod`라는 메서드 이름을 동적으로 생성합니다.  

<br>

## 속성 접근

Computed Property Name으로 생성된 속성은 일반적인 속성과 마찬가지로 접근할 수 있습니다.

```javascript
const prefix = "property_";

const obj = {
    [prefix + "name"]: "value"
};

console.log(obj.property_name); // "value"

// 대괄호 표기법을 사용할 수도 있습니다.
console.log(obj[prefix + "name"]); // "value"
```

위 코드에서 `obj` 객체의 `property_name` 속성에 접근하는 두 가지 방법을 보여줍니다.  

<br>

## 활용 예시


**1. 동적인 데이터 처리**  

API 응답이나 사용자 입력과 같은 동적인 데이터를 기반으로 객체 속성 이름을 생성할 수 있습니다.

```javascript
const API_RESPONSE = {
    "user_id": 123,
    "username": "johndoe",
    "email": "johndoe@example.com"
};

const user = {
    [API_RESPONSE.user_id]: {
        username: API_RESPONSE.username,
        email: API_RESPONSE.email
    }
};

console.log(user[123]); // { username: "johndoe", email: "johndoe@example.com" }
```

위 코드에서 `user` 객체는 API 응답 데이터를 기반으로 `123`이라는 속성 이름을 동적으로 생성하고, 해당 속성에 사용자 정보를 저장합니다.

**2. 코드 재사용성 향상**  

반복적인 코드를 줄이고 코드 재사용성을 높일 수 있습니다.

```javascript
const createFormElement = (type, name) => ({
    type,
    name,
    [type === "checkbox" ? "checked" : "value"]: ""
});

const formElements = {
    username: createFormElement("text", "username"),
    email: createFormElement("email", "email"),
    password: createFormElement("password", "password"),
    rememberMe: createFormElement("checkbox", "rememberMe")
};

console.log(formElements);
```

위 코드에서 `createFormElement` 함수는 다양한 유형의 폼 요소를 생성하는 함수입니다. `formElements` 객체는 `createFormElement` 함수를 사용하여 반복적인 코드를 줄이고 코드 재사용성을 높입니다.

**3. 상태 관리**  

컴포넌트 상태를 동적으로 관리하는 데 활용할 수 있습니다.

```javascript
const App = () => {
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleClick}>Increase Count</button>
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

위 코드에서 `count` 변수는 컴포넌트의 상태를 나타내는 변수입니다. `setCount` 함수는 `count` 변수의 값을 업데이트하는 함수입니다. `handleClick` 함수는 `setCount` 함수를 사용하여 `count` 변수의 값을 1 증가시킵니다.  

<br>

## 주의할 점

Computed Property Name은 강력한 기능이지만, 사용할 때 몇 가지 주의할 점이 있습니다.

* **브라우저 호환성:** ES6 기능이기 때문에 모든 브라우저에서 지원되지 않습니다. 특히 IE 11 이하 버전에서는 호환성 문제가 발생할 수 있으므로, 사용 시에는 polyfill을 고려해야 합니다.
* **코드 가독성:** 지나치게 사용하면 코드의 가독성을 낮출 수 있습니다. 코드를 이해하기 어렵게 만들어 유지보수를 어렵게 할 수 있으므로, 적절하게 사용해야 합니다.
* **디버깅:** 동적으로 생성되는 속성 이름으로 디버깅이 어려울 수 있습니다. 따라서 코드를 디버깅할 때 어려움을 겪을 수 있으므로, 신중하게 사용해야 합니다.
* **성능:** Computed Property Name은 성능 저하를 일으킬 수 있습니다. 속성 이름을 매번 계산해야 하므로, 일반적인 속성 접근보다 느릴 수 있습니다.
* **키 충돌:** Computed Property Name으로 생성된 속성 이름이 기존 속성 이름과 충돌할 수 있습니다. 충돌을 방지하기 위해 주의해야 합니다.

<br>

## 결론

Computed Property Name은 객체를 보다 동적으로 구성하고 유연하게 사용할 수 있도록 해주는 강력한 기능입니다. 이 기능은 다양한 실제 개발 상황에서 활용될 수 있으며, 코드 재사용성을 높이고 상태 관리를 쉽게 만들어줍니다. 그러나 브라우저 호환성과 코드의 가독성을 고려하여 적절하게 사용해야 합니다.

