---
title: >  
    JavaScript 클로저, 메모리를 기억하는 함수의 비밀

description: >  
    자바스크립트 클로저가 무엇인지, 왜 중요한지 실무 경험을 바탕으로 쉽게 설명합니다. 메모리 관리부터 실제 활용 사례까지, 단계별 예제와 함께 완벽하게 이해해보세요.

slug: 2025-07-09-javascript-closure
date: 2025-07-25 00:00:00+0000
lastmod: 2025-07-09 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-09-javascript-closure.webp

categories:
    - JavaScript 
tags:
    - 자바스크립트 기초
    - 변수 관리
    - 클로저
---

> 💡 **선행 학습 추천**  
> 이 글을 더 쉽게 이해하려면 먼저 이 글들을 읽어보세요.
> - [자바스크립트 스코프 ⭐️ 필수!](/code/2025-06-16-javascript-scope/) - 변수 접근 범위의 기본 개념
> - [자바스크립트 렉시컬 환경 ⭐️ 필수!](/code/2025-07-08-lexical-environment/) - 클로저의 핵심 동작 원리
> - [JS 변수 선언법: let과 const](/code/2025-06-26-let-const/) - 반복문 클로저 예제 완벽 이해

자바스크립트를 배우다 보면 "클로저(Closure)"라는 개념에서 벽에 부딪히는 경우가 많죠. 함수가 끝났는데도 변수가 살아있다고? 도대체 왜 그럴까요?

저도 처음엔 클로저를 단순히 "함수 안의 함수"라고만 이해했는데, 실제 프로젝트에서 메모리 누수 문제를 겪으면서 클로저의 진짜 의미를 깨달았어요. 클로저는 단순한 문법이 아니라 자바스크립트의 핵심 동작 원리였던 거죠.

이 글에서는 클로저가 정확히 무엇인지, 왜 필요한지, 그리고 어떻게 활용해야 하는지를 명확하게 알려드릴게요. 개념 설명부터 실무 활용법까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.

<br>

## 클로저란 무엇인가?

**클로저(Closure)란?**
클로저는 자바스크립트의 특성으로, 함수가 선언된 **렉시컬 환경(Lexical Environment)을 '기억'하는** 함수 또는 기능을 말합니다. 함수가 생성될 때의 **스코프에 있던 변수들을 나중에도 접근할 수 있게** 해주는 핵심 기능이에요.

**🔑 핵심 포인트**: 내부 함수가 외부 변수를 **참조할 때 클로저가 생성**됩니다. 단순히 함수 안에 함수가 있다고 클로저가 되는 것이 아니라, **외부 스코프의 변수를 실제로 사용해야** 클로저가 만들어져요!

<br>

### 가장 간단한 클로저 예제

먼저 가장 기본적인 예제로 클로저의 동작을 살펴볼게요.

```javascript
function outerFunction(name) {
    // 외부 함수의 변수 - 일반적으로는 함수 실행 후 사라져야 함
    const greeting = "안녕하세요";
    
    // 내부 함수 (클로저) - 외부 변수를 '기억'함
    function innerFunction() {
        // 여기서 greeting과 name에 접근 가능!
        // 외부 함수가 끝났는데도 이 변수들이 살아있는 이유가 바로 클로저
        console.log(greeting + ", " + name + "님!");
    }
    
    // 함수를 반환 - 이 순간 클로저가 생성됨
    return innerFunction;
}

// outerFunction 실행이 끝났지만...
const sayHello = outerFunction("김철수");
// 여전히 greeting과 name 변수에 접근 가능!
sayHello(); // "안녕하세요, 김철수님!"
```

**왜 이런 일이 가능할까요?**
일반적으로 함수가 실행을 마치면 그 함수의 <strong>실행 컨텍스트(Execution Context, 함수가 실행되는 환경과 메모리 공간)</strong>가 사라지고, 지역 변수들도 메모리에서 제거됩니다. 하지만 클로저가 있으면 이야기가 달라져요.

1. `innerFunction`이 `greeting`과 `name`을 참조하고 있어요.
2. 자바스크립트 엔진이 이를 감지하고 **해당 변수들을 메모리에 보존**합니다.
3. `sayHello`가 실행될 때 보존된 변수들에 접근할 수 있게 됩니다.

<br>

### 왜 이런 일이 가능할까요?

일반적으로 함수가 실행을 마치면 그 함수의 지역 변수들은 메모리에서 사라져야 합니다. 하지만 클로저가 있으면 다릅니다.

1. **렉시컬 스코프**: 함수는 선언된 위치에서의 스코프를 '기억'합니다.
2. **참조 유지**: 내부 함수가 외부 변수를 참조하면, 그 변수는 메모리에 유지됩니다.
3. **지연 실행**: 나중에 함수를 호출해도 원래 환경의 변수에 접근할 수 있습니다.

<br>

## 클로저의 실무 활용 사례

### 1. 데이터 은닉과 캡슐화

실제 프로젝트에서는 외부에서 직접 접근하면 안 되는 데이터를 보호해야 할 때가 많아요.

```javascript
// ❌ 이렇게 하면 외부에서 직접 수정 가능
let userCount = 0;

function incrementUser() {
    userCount++;
}

// 문제: 외부에서 직접 조작 가능
userCount = 1000; // 이건 안 돼요! 데이터 무결성 파괴

// ✅ 클로저로 데이터 보호
function createCounter() {
    let count = 0; // private 변수 - 외부에서 직접 접근 불가
    
    // 반환되는 객체의 메서드들만이 count에 접근 가능
    return {
        increment: function() {
            count++; // 클로저를 통해 count 변수에 접근
            return count;
        },
        decrement: function() {
            count--; // 같은 count 변수를 공유
            return count;
        },
        getCount: function() {
            return count; // 값을 읽기만 가능
        }
        // count 변수 자체는 외부에서 절대 접근 불가!
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2

// count 변수에 직접 접근 불가능! (보안 강화)
// counter.count = 1000; // undefined! 접근할 수 없음
```

**핵심 포인트:**
- `count` 변수는 `createCounter` 함수 내부에만 존재하므로 **완전히 보호됨**
- 반환된 메서드들이 모두 **같은 `count` 변수를 공유**하므로 상태가 일관성 있게 유지됨
- 이는 객체지향 프로그래밍의 **캡슐화(Encapsulation)** 개념을 자바스크립트에서 구현한 것

<br>

### 2. 함수 팩토리 패턴

비슷한 기능을 하지만 설정이 다른 함수들을 만들 때 유용해요.

```javascript
function createValidator(minLength) {
    // 각 검증 함수마다 고유한 minLength 값을 '기억'
    return function(password) {
        if (password.length < minLength) {
            // 클로저로 인해 각자의 minLength 값에 접근
            return `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`;
        }
        return "유효한 비밀번호입니다.";
    };
}

// 각기 다른 규칙의 검증 함수 생성
const basicValidator = createValidator(6);    // minLength = 6을 기억
const strongValidator = createValidator(12);  // minLength = 12를 기억

console.log(basicValidator("123")); // "비밀번호는 최소 6자 이상이어야 합니다."
console.log(strongValidator("mypassword123")); // "유효한 비밀번호입니다."
```

**함수 팩토리의 장점:**
- **설정값을 미리 저장해서** 특화된 함수를 만들 수 있음
- 각 함수는 **독립적인 설정을 유지**하므로 서로 영향을 주지 않음
- 코드 중복 없이 **다양한 규칙의 함수들을 효율적으로 생성** 가능

<br>

### 3. 이벤트 핸들러와 콜백

실제 웹 개발에서 자주 마주치는 상황이에요.

```javascript
function setupButton(buttonName, clickCount) {
    const button = document.querySelector(`#${buttonName}`);
    let count = clickCount; // 각 버튼마다 독립적인 카운터
    
    // 이벤트 핸들러도 클로저! count와 buttonName을 기억함
    button.addEventListener('click', function() {
        count++; // 클로저를 통해 count 변수에 접근
        console.log(`${buttonName} 버튼이 ${count}번 클릭되었습니다.`);
        
        // 특정 횟수 달성 시 특별 동작
        if (count === 10) {
            console.log("축하합니다! 10번 클릭 달성!");
        }
    });
}

// 각 버튼마다 독립적인 카운터 생성
setupButton("saveBtn", 0);    // saveBtn은 0부터 시작
setupButton("deleteBtn", 0);  // deleteBtn도 0부터 시작 (서로 독립적)
```

**이벤트 핸들러에서 클로저가 중요한 이유:**
- 이벤트가 발생할 때까지 **상태를 유지**해야 함
- 각 버튼마다 **독립적인 상태 관리**가 필요함
- 함수가 등록된 후에도 **원래 환경의 변수들에 접근**할 수 있어야 함


<br>

## 클로저 사용 시 주의사항

### 메모리 누수 위험

클로저는 강력하지만, 잘못 사용하면 메모리 누수가 발생할 수 있어요.

```javascript
// ❌ 메모리 누수 위험
function createBigDataProcessor() {
    const bigData = new Array(1000000).fill("데이터"); // 큰 데이터 (약 4MB)
    
    return function(index) {
        // 문제: bigData 전체가 메모리에 계속 남아있음
        // 클로저가 bigData를 참조하므로 가비지 컬렉션되지 않음
        return bigData[index];
    };
}

// 이 함수를 여러 번 호출하면 메모리 사용량이 계속 증가!
const processor1 = createBigDataProcessor(); // 4MB 메모리 사용
const processor2 = createBigDataProcessor(); // 추가로 4MB 메모리 사용
// bigData가 여러 개 메모리에 남아있게 됨

// ✅ 필요한 데이터만 클로저에 포함
function createBigDataProcessor() {
    const bigData = new Array(1000000).fill("데이터");
    
    return function(index) {
        const result = bigData[index];
        // 지역 변수로 처리하고 bigData 참조 최소화
        return result;
    };
}

// 더 나은 방법: 필요한 데이터만 미리 추출
function createOptimizedProcessor(indices) {
    const bigData = new Array(1000000).fill("데이터");
    // 필요한 데이터만 추출해서 클로저에 포함
    const extractedData = indices.map(i => bigData[i]);
    
    return function(localIndex) {
        // 전체 bigData 대신 필요한 부분만 참조
        return extractedData[localIndex];
    };
}
```

**메모리 누수가 발생하는 이유:**
1. **클로저가 외부 변수를 참조**하면 해당 변수는 메모리에서 해제되지 않음
2. **큰 데이터를 참조**하면 그 데이터 전체가 메모리에 남아있게 됨
3. **여러 개의 클로저**가 생성되면 메모리 사용량이 배수로 증가

**해결 방법:**
- 클로저에서 **꼭 필요한 데이터만 참조**하기
- **불필요한 참조는 `null`로 해제**하기
- **큰 객체보다는 필요한 값만 추출**해서 사용하기

<br>

### 반복문에서의 클로저 실수

이건 정말 많이 하는 실수예요.

```javascript
// ❌ 모든 함수가 3을 출력
const functions = [];
for (var i = 0; i < 3; i++) {
    functions.push(function() {
        console.log(i); // 모두 3을 출력! 왜 그럴까?
    });
}

functions[0](); // 3 (예상: 0)
functions[1](); // 3 (예상: 1)
functions[2](); // 3 (예상: 2)

// 문제 원인: var는 함수 스코프이므로 하나의 i 변수를 모든 함수가 공유
// 반복문이 끝난 후 i = 3이 되고, 모든 클로저가 이 값을 참조

// ✅ 올바른 방법 1: let 사용
const functions = [];
for (let i = 0; i < 3; i++) { // let은 블록 스코프!
    functions.push(function() {
        console.log(i); // 각각 0, 1, 2 출력
    });
}
// let은 반복문의 각 iteration마다 새로운 i 변수를 생성

// ✅ 올바른 방법 2: 즉시 실행 함수로 값 고정
const functions = [];
for (var i = 0; i < 3; i++) {
    functions.push((function(index) { // 즉시 실행 함수
        return function() {
            console.log(index); // 각 함수마다 고유한 index 값 보존
        };
    })(i)); // 현재 i 값을 index 매개변수로 전달
}
```

**핵심 원리:**
- **`var`는 함수 스코프**: 반복문 전체에서 하나의 `i` 변수를 공유
- **`let`은 블록 스코프**: 각 반복마다 새로운 `i` 변수 생성
- **즉시 실행 함수**: 현재 값을 매개변수로 '고정'시켜 각 클로저가 독립적인 값을 가지도록 함

<br>

## 실제 프로젝트에서의 클로저 활용

### 설정 관리자 만들기

실무에서 자주 사용하는 패턴이에요.

```javascript
function createConfig() {
    // private 설정 객체 - 외부에서 직접 접근 불가
    const settings = {
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3
    };
    
    return {
        get: function(key) {
            // 설정값 읽기 (안전)
            return settings[key];
        },
        set: function(key, value) {
            // 검증 후 설정값 변경
            if (typeof settings[key] !== 'undefined') {
                settings[key] = value;
                console.log(`${key} 설정이 ${value}로 변경되었습니다.`);
            } else {
                console.log(`알 수 없는 설정: ${key}`);
            }
        },
        getAll: function() {
            // 중요: 원본이 아닌 복사본을 반환!
            // 이렇게 해야 외부에서 원본 객체를 조작할 수 없음
            return { ...settings };
        }
    };
}

const config = createConfig();
config.set('timeout', 10000);
console.log(config.get('timeout')); // 10000

// 보안 테스트
const allSettings = config.getAll();
allSettings.apiUrl = 'https://malicious.com'; // 복사본만 변경됨
console.log(config.get('apiUrl')); // 여전히 'https://api.example.com'
```

**이 패턴의 핵심 보안 요소:**
1. **원본 데이터 보호**: `settings` 객체는 클로저 안에서만 접근 가능
2. **복사본 반환**: `getAll()`에서 `{ ...settings }`로 복사본 반환하여 원본 보호
3. **검증된 접근**: `set()` 메서드를 통해서만 값 변경 가능
4. **읽기 전용 접근**: `get()` 메서드로만 개별 값 조회 가능

<br>

### 디바운싱 함수 구현

검색창이나 버튼 클릭 제한에 활용되는 패턴이에요.

```javascript
function debounce(func, delay) {
    let timeoutId; // 클로저로 타이머 ID를 보존
    
    // 반환되는 함수가 클로저 - timeoutId를 기억함
    return function(...args) {
        // 이전 타이머가 있으면 취소 (중요한 부분!)
        clearTimeout(timeoutId);
        
        // 새로운 타이머 설정 - timeoutId에 저장
        timeoutId = setTimeout(() => {
            // delay 시간 후에 실제 함수 실행
            func.apply(this, args);
        }, delay);
    };
}

// 사용 예시
const handleSearch = debounce(function(query) {
    console.log(`검색어: ${query}`);
    // 실제 검색 API 호출
}, 300);

// 300ms 내에 여러 번 호출해도 마지막 호출만 실행됨
handleSearch("자바스크립트");    // 타이머 설정
handleSearch("자바스크립트 클로저"); // 이전 타이머 취소 + 새 타이머 설정
// 결과: 300ms 후 "자바스크립트 클로저"만 검색됨
```

**디바운싱이 작동하는 원리:**
1. **타이머 ID 보존**: `timeoutId` 변수가 클로저로 보존되어 계속 접근 가능
2. **이전 요청 취소**: 새 요청이 오면 `clearTimeout()`으로 이전 타이머 취소
3. **지연 실행**: `setTimeout()`으로 일정 시간 후에 실제 함수 실행
4. **메모리 효율성**: 하나의 `timeoutId`만 유지하므로 메모리 절약

<br>

### 2. 참조 해제로 메모리 관리

```javascript
function createManager() {
    let data = new Array(10000).fill(0); // 큰 데이터 배열
    
    return {
        process: function() {
            // 데이터 처리 작업
            return data.reduce((sum, val) => sum + val, 0);
        },
        cleanup: function() {
            // 중요: 메모리 해제를 위한 참조 제거
            data = null; 
            console.log('메모리가 해제되었습니다.');
        },
        getDataSize: function() {
            // 데이터가 해제되었는지 확인
            return data ? data.length : 0;
        }
    };
}

const manager = createManager();
console.log('처리 결과:', manager.process()); // 데이터 처리
console.log('데이터 크기:', manager.getDataSize()); // 10000

// 사용 후 정리 - 가비지 컬렉션 유도
manager.cleanup();
console.log('정리 후 데이터 크기:', manager.getDataSize()); // 0

// 이제 data 배열이 가비지 컬렉션 대상이 됨
```

**메모리 관리의 핵심:**
1. **명시적 해제**: `data = null`로 참조를 끊어 가비지 컬렉션 유도
2. **상태 확인**: `getDataSize()` 같은 메서드로 해제 상태 확인 가능
3. **예방적 조치**: 큰 데이터를 다룰 때는 반드시 정리 메서드 제공
4. **생명주기 관리**: 언제 데이터를 해제할지 명확한 시점 설정

<br>

## 자주 묻는 질문 (FAQ)

### Q1. 클로저는 언제 사용해야 하나요?

클로저는 **데이터 은닉**, **상태 유지**, **함수 팩토리** 패턴이 필요할 때 사용합니다. 특히 외부에서 직접 접근하면 안 되는 변수를 보호하거나, 비슷한 기능을 하는 여러 함수를 동적으로 생성할 때 매우 유용해요. 제가 실제 프로젝트에서 가장 많이 사용하는 경우는 설정 관리자나 이벤트 핸들러를 만들 때입니다.

<br>

### Q2. 클로저와 일반 함수의 차이점은 무엇인가요?

일반 함수는 실행이 끝나면 지역 변수가 사라지지만, 클로저는 외부 함수의 변수를 계속 '기억'합니다. 예를 들어, 카운터 함수를 만들 때 클로저를 사용하면 카운트 값이 함수 호출 사이에도 유지되지만, 일반 함수로는 이런 상태 유지가 불가능해요.

<br>

### Q3. 클로저 때문에 메모리 누수가 발생할 수 있나요?

네, 가능합니다. 클로저가 큰 객체나 DOM 요소를 참조하고 있으면, 해당 객체들이 가비지 컬렉션되지 않아 메모리 누수가 발생할 수 있어요. 

**메모리 누수가 발생하는 구체적인 상황:**
```javascript
// 위험한 패턴
function createHandler() {
    const bigData = new Array(1000000).fill('data'); // 4MB 정도
    const element = document.getElementById('button');
    
    return function() {
        // bigData와 element 모두 메모리에 계속 남아있음
        console.log(bigData[0], element.textContent);
    };
}
```

**이를 방지하려면:**
- 필요 없어진 클로저 참조를 `null`로 설정
- 클로저에서 참조하는 데이터의 크기를 최소화
- DOM 요소 참조 시 이벤트 리스너 해제 등 정리 작업 수행

<br>

### Q4. React에서도 클로저 개념이 사용되나요?

당연히 사용됩니다! React의 `useState`, `useEffect` 같은 Hook들이 모두 클로저 기반으로 동작해요. 함수 컴포넌트가 리렌더링되어도 이전 상태값을 기억할 수 있는 이유가 바로 클로저 때문입니다. 클로저를 제대로 이해하면 React Hook의 동작 원리도 훨씬 쉽게 이해할 수 있어요.

<br>

### Q5. 클로저 사용 시 성능에 영향이 있나요?

클로저 자체는 큰 성능 오버헤드를 발생시키지 않습니다. 하지만 불필요하게 많은 클로저를 생성하거나, 클로저 내에서 큰 데이터를 참조하면 메모리 사용량이 증가할 수 있어요. 성능이 중요한 부분에서는 클로저 생성을 최소화하고, 꼭 필요한 데이터만 클로저 스코프에 포함시키는 것이 좋습니다.

<br>

## 마무리

클로저는 자바스크립트의 핵심 개념 중 하나로, 다음과 같은 핵심 포인트를 기억해주세요.

- **클로저는 함수가 생성된 환경을 '기억'하는 메커니즘**입니다.
- **데이터 은닉과 상태 유지**에 매우 유용한 패턴이에요.
- **메모리 관리**에 주의하여 사용해야 합니다.
- **React Hook의 기반**이 되는 중요한 개념입니다.

오늘 배운 내용으로 간단한 할 일 관리 앱을 만들어보세요. 클로저를 활용해 할 일 목록을 관리하고, 외부에서 직접 접근할 수 없도록 데이터를 보호해보는 연습을 해보시길 추천드려요.

다음 글에서는 자바스크립트의 또 다른 핵심 개념인 **프로토타입과 상속**에 대해 다뤄보겠습니다.

여러분의 클로저 관련 경험은 어떠셨나요? 처음 클로저를 이해했을 때의 느낌이나, 실제 프로젝트에서 활용한 사례가 있다면 댓글로 공유해주세요! 🚀
