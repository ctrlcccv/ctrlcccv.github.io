---
title: >  
    JavaScript 렉시컬 환경이란? 도서관 비유로 쉽게 이해하기

description: >  
    자바스크립트 렉시컬 환경의 동작 원리를 도서관 비유로 쉽게 이해해 보세요. 환경 레코드, 외부 참조, 스코프 체인부터 클로저의 기반까지 실무 예제와 함께 완벽 정리했습니다.

slug: 2025-07-08-lexical-environment
date: 2025-07-08 00:00:00+0000
lastmod: 2025-07-08 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-08-lexical-environment.webp

categories:
    - JavaScript 
tags:
    - 자바스크립트 기초
    - 렉시컬 환경
---
> 💡 **선행 학습 추천**  
> 이 글을 더 쉽게 이해하려면 먼저 이 글들을 읽어보세요.
> - [자바스크립트 스코프 ⭐️ 필수!](/code/2025-06-16-javascript-scope/) - 변수 접근 범위의 기본 개념
> - [자바스크립트 호이스팅](/code/2025-06-20-javascript-hoisting/) - 변수 선언과 초기화 과정
> - [블록 vs 함수 차이점](/code/2025-06-18-block-function/) - 코드 그룹화 방법의 이해


자바스크립트를 배우다 보면 "변수는 어디서 찾아오는 걸까?"라는 궁금증이 생기죠. 특히 함수 안에서 바깥쪽 변수를 사용할 때, 어떻게 자바스크립트가 그 변수를 찾아내는지 신기하지 않으셨나요?

저도 처음엔 "그냥 찾아지는 거 아닌가?"라고 생각했는데, 실제로는 자바스크립트 엔진이 정교한 시스템을 사용해서 변수를 관리하고 있다는 걸 깨달았어요. 바로 <strong>렉시컬 환경(Lexical Environment)</strong>이라는 개념 때문이었죠.

이 글에서는 렉시컬 환경이 무엇인지, 어떻게 작동하는지를 도서관 비유와 함께 쉽게 알려드릴게요. 기본 개념부터 실제 코드 동작 원리까지, 실제 예제와 함께 단계별로 살펴봅니다.

<br>

## 렉시컬 환경이란?

**렉시컬 환경**은 자바스크립트에서 변수와 함수가 어디에 정의되어 있는지를 추적하는 시스템입니다. 쉽게 말해서 <strong>"코드의 위치를 기억하는 시스템"</strong>이라고 생각하면 됩니다. 자바스크립트 엔진이 변수를 찾을 때 사용하는 내부 구조로, 각 스코프마다 하나씩 생성되어 변수 검색의 경로를 제공합니다.

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

## 도서관으로 이해하는 렉시컬 환경

실무에서 렉시컬 환경을 이해하려면 **도서관 시스템**으로 생각해 보세요. 제가 이 비유를 처음 떠올렸을 때, 복잡했던 개념이 한 번에 이해되더라고요.

```javascript
// 전역 렉시컬 환경에 저장됨 (모든 곳에서 접근 가능)
let globalBook = "자바스크립트 완벽 가이드";  // 중앙도서관

function library() {
    // library 함수의 렉시컬 환경에 저장됨 (library 내부에서만 접근 가능)
    let localBook = "리액트 입문서";  // 지역도서관
    
    function readingRoom() {
        // readingRoom 함수의 렉시컬 환경에 저장됨 (readingRoom 내부에서만 접근 가능)
        let personalBook = "개인 노트";  // 개인 서재
        
        // 변수 검색 과정:
        console.log(globalBook);  // 1. readingRoom → 2. library → 3. 전역에서 발견!
        console.log(localBook);   // 1. readingRoom → 2. library에서 발견!
        console.log(personalBook); // 1. readingRoom에서 바로 발견!
    }
    
    readingRoom();
}

library();
```

이 코드에서 각 함수는 하나의 도서관이라고 생각해 보세요.

- **중앙도서관 (전역 스코프)**: 모든 사람이 접근할 수 있는 책들
- **지역도서관 (library 함수)**: 특정 지역 사람들만 접근할 수 있는 책들  
- **개인 서재 (readingRoom 함수)**: 개인만 접근할 수 있는 책들

<br>

## 렉시컬 환경의 구조

렉시컬 환경은 두 가지 핵심 요소로 구성됩니다.

| 구성 요소 | 역할 | 도서관 비유 |
|-----------|------|-------------|
| **환경 레코드** | 변수와 함수의 실제 값을 저장하는 공간 | 실제 책들이 있는 책장 |
| **외부 참조** | 바깥쪽 렉시컬 환경을 가리키는 포인터 | 다른 도서관으로 가는 길 |

<br>

### 1. 환경 레코드 (Environment Record)

환경 레코드는 **변수와 함수들이 실제로 저장되는 공간**입니다. 도서관의 책장이라고 생각하면 됩니다.

```javascript
function createProfile() {
    // createProfile의 렉시컬 환경에 저장되는 변수들
    let userName = "김개발";
    let userAge = 25;
    
    // 함수도 렉시컬 환경에 저장됨
    function showProfile() {
        // 외부 렉시컬 환경(createProfile)의 변수들에 접근 가능
        console.log(`이름: ${userName}, 나이: ${userAge}`);
    }
    
    return showProfile;
}
```

**createProfile 함수의 환경 레코드**:
```javascript
// 렉시컬 환경의 환경 레코드 구조 예시
{
    userName: "김개발",        // 변수 저장
    userAge: 25,              // 변수 저장
    showProfile: function() { ... }  // 함수도 저장됨
}
```

<br>

### 2. 외부 참조 (Outer Lexical Environment Reference)

외부 참조는 **스코프 체인의 방향을 알려주는 포인터**입니다. 현재 도서관에서 책을 찾지 못했을 때, 다음에 찾아갈 도서관의 주소라고 생각하면 됩니다.

```javascript
// 전역 렉시컬 환경
let globalVar = "전역 변수";

function outer() {
    // outer 함수의 렉시컬 환경 (외부 참조: 전역)
    let outerVar = "외부 변수";
    
    function inner() {
        // inner 함수의 렉시컬 환경 (외부 참조: outer)
        let innerVar = "내부 변수";
        
        // 변수 검색: inner → outer → 전역 순서로 찾음
        console.log(globalVar);  // 전역까지 올라가서 찾음
    }
    
    inner();
}

outer();
```

**스코프 체인 방향**:
```
inner → outer → 전역 → null
```

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

## 변수 검색 과정 5단계

자바스크립트 엔진이 변수를 찾는 과정을 단계별로 알아보겠습니다.

<br>

### 1. 현재 렉시컬 환경에서 검색
```javascript
function findVariable() {
    let localVar = "지역 변수";  // 현재 렉시컬 환경에 저장
    console.log(localVar);  // 1단계: 현재 환경에서 바로 찾음 ✅
}
```

### 2. 외부 참조를 따라 이동
```javascript
let globalVar = "전역 변수";  // 전역 렉시컬 환경

function outer() {
    let outerVar = "외부 변수";  // outer의 렉시컬 환경
    
    function inner() {
        // inner의 렉시컬 환경 (outerVar가 없음)
        console.log(outerVar);  // 2단계: outer 환경으로 이동해서 찾음 ✅
    }
    
    inner();
}
```

### 3. 스코프 체인을 따라 계속 검색
```javascript
let global = "전역";  // 전역 렉시컬 환경

function first() {
    let firstVar = "첫번째";  // first의 렉시컬 환경
    
    function second() {
        let secondVar = "두번째";  // second의 렉시컬 환경
        
        function third() {
            // third의 렉시컬 환경 (변수들이 없음)
            // 스코프 체인: third → second → first → 전역
            console.log(global);     // third → second → first → 전역에서 발견 ✅
            console.log(firstVar);   // third → second → first에서 발견 ✅
            console.log(secondVar);  // third → second에서 발견 ✅
        }
        
        third();
    }
    
    second();
}

first();
```

### 4. 변수를 찾으면 검색 중단
```javascript
let name = "전역 김철수";  // 전역 렉시컬 환경

function test() {
    let name = "지역 이영희";  // test의 렉시컬 환경 (전역 name을 가림)
    console.log(name);  // "지역 이영희" - 가장 가까운 곳에서 찾으면 중단 ✅
}

test();
```

### 5. 찾지 못하면 ReferenceError 발생
```javascript
function errorExample() {
    // undefinedVar는 어떤 렉시컬 환경에도 없음
    console.log(undefinedVar);  // 전역까지 찾아도 없음 → ReferenceError ❌
}
```

<br>

## 실제 프로젝트에서의 활용

실무에서 렉시컬 환경을 이해하면 이런 상황들을 쉽게 해결할 수 있어요.

<br>

### 변수 섀도잉 (Variable Shadowing) 이해하기

```javascript
// ❌ 의도하지 않은 변수 섀도잉
let userName = "전역 사용자";  // 전역 렉시컬 환경

function processUser() {
    // 같은 이름의 변수가 지역 렉시컬 환경에 생성됨 (전역 변수를 가림)
    let userName = "지역 사용자";  // 전역 변수를 가림
    
    function displayUser() {
        // 가장 가까운 렉시컬 환경에서 userName을 찾음
        console.log(userName);  // "지역 사용자" 출력 (전역 변수에 접근 불가)
    }
    
    displayUser();
}

processUser();
console.log(userName);  // "전역 사용자" 출력 (전역 변수는 그대로 유지)
```

```javascript
// ✅ 의도적인 변수 섀도잉 활용
function createCalculator() {
    let result = 0;  // 계산기의 내부 상태 (외부에서 직접 접근 불가)
    
    return {
        add: function(num) {
            // 클로저를 통해 외부 함수의 result 변수에 접근
            result += num;  // 외부의 result 변수에 접근
            return result;
        },
        reset: function() {
            // 같은 렉시컬 환경의 result 변수를 초기화
            result = 0;     // 내부 상태 초기화
            return result;
        }
    };
}

const calc = createCalculator();
console.log(calc.add(5));   // 5 (result = 0 + 5)
console.log(calc.add(3));   // 8 (result = 5 + 3)
console.log(calc.reset());  // 0 (result = 0으로 초기화)
```

<br>

### 클로저의 기반 이해하기

렉시컬 환경은 클로저가 작동하는 핵심 원리입니다.

```javascript
function createCounter() {
    let count = 0;  // 이 변수가 createCounter의 렉시컬 환경에 저장됨
    
    // 반환되는 함수는 외부 렉시컬 환경(createCounter)을 기억함
    return function() {
        count++;    // 외부 함수의 렉시컬 환경에 있는 count에 접근
        return count;
    };
}

// 각각 독립적인 렉시컬 환경을 가짐
const counter1 = createCounter();  // counter1만의 count 변수 (렉시컬 환경 1)
const counter2 = createCounter();  // counter2만의 count 변수 (렉시컬 환경 2)

console.log(counter1());  // 1 (렉시컬 환경 1의 count: 0 → 1)
console.log(counter1());  // 2 (렉시컬 환경 1의 count: 1 → 2)
console.log(counter2());  // 1 (렉시컬 환경 2의 count: 0 → 1, 독립적임)
```

<br>

## var, let, const의 렉시컬 환경 차이점

각 변수 선언 방식이 렉시컬 환경에서 어떻게 다르게 작동하는지 알아보겠습니다.

<br>

### var의 호이스팅과 렉시컬 환경

```javascript
// ❌ var의 호이스팅으로 인한 혼란
console.log(varVariable);  // undefined (에러가 아님!)
var varVariable = "var 변수";

// 실제로는 이렇게 동작함 (렉시컬 환경에서의 처리)
var varVariable;  // 선언과 동시에 렉시컬 환경에 undefined로 저장됨
console.log(varVariable);  // undefined (렉시컬 환경에서 찾음)
varVariable = "var 변수";  // 값 할당
```

<br>

### let/const의 TDZ와 렉시컬 환경

```javascript
// ❌ let/const의 TDZ (Temporal Dead Zone)
console.log(letVariable);  // ReferenceError! (렉시컬 환경에 있지만 접근 불가)
let letVariable = "let 변수";

// ✅ 올바른 사용법
let letVariable = "let 변수";  // 렉시컬 환경에 저장되고 접근 가능해짐
console.log(letVariable);  // "let 변수" (렉시컬 환경에서 정상 접근)
```

**렉시컬 환경에서의 차이점**:

| 선언 방식 | 초기화 시점 | 호이스팅 | 스코프 |
|-----------|-------------|----------|--------|
| **var** | 선언과 동시에 undefined | 함수 스코프 최상단 | 함수 스코프 |
| **let** | 값 할당 시점 | TDZ 상태 | 블록 스코프 |
| **const** | 값 할당 시점 | TDZ 상태 | 블록 스코프 |

<br>

## 메모리 관리와 가비지 컬렉션

렉시컬 환경은 메모리 관리와도 밀접한 관련이 있습니다.

<br>

### 메모리 누수 방지하기

```javascript
// ❌ 메모리 누수 가능성
function createLeak() {
    // 큰 데이터가 렉시컬 환경에 저장됨
    let largeData = new Array(1000000).fill("데이터");
    
    return function() {
        console.log("함수 실행");
        // largeData를 사용하지 않지만 클로저로 인해 렉시컬 환경에 계속 유지됨
    };
}

// ✅ 메모리 효율적인 방법
function createEfficient() {
    let largeData = new Array(1000000).fill("데이터");
    let processedData = largeData.length;  // 필요한 부분만 추출해서 렉시컬 환경에 저장
    largeData = null;  // 큰 데이터 해제 (가비지 컬렉션(메모리 자동 정리) 대상이 됨)
    
    return function() {
        // 작은 데이터만 렉시컬 환경에 유지됨
        console.log(`처리된 데이터 크기: ${processedData}`);
    };
}
```

<br>


## 자주 묻는 질문 (FAQ)

### 렉시컬 환경과 실행 컨텍스트의 차이점은 무엇인가요?

렉시컬 환경은 실행 컨텍스트의 일부입니다. 실행 컨텍스트는 렉시컬 환경뿐만 아니라 `this` 바인딩, 외부 환경 참조 등을 포함하는 더 큰 개념이에요. 저는 처음에 이 둘을 헷갈렸는데, 렉시컬 환경을 "변수 저장소"로, 실행 컨텍스트를 "함수 실행에 필요한 모든 정보"로 구분해서 생각하니까 이해가 쉬워졌어요.

<br>

### 렉시컬 스코핑과 동적 스코핑의 차이점은 무엇인가요?

렉시컬 스코핑은 **코드가 작성된 위치**에 따라 스코프가 결정되는 방식이고, 동적 스코핑은 **함수가 호출된 위치**에 따라 스코프가 결정되는 방식입니다. 자바스크립트는 렉시컬 스코핑을 사용해요. 실제 프로젝트에서는 이 덕분에 코드를 예측하기 쉽고 디버깅하기 편합니다.

<br>

### 클로저가 메모리 누수를 일으킬 수 있는 이유는 무엇인가요?

클로저는 외부 함수의 렉시컬 환경을 참조하고 있기 때문에, 해당 환경의 모든 변수가 가비지 컬렉션(사용하지 않는 메모리를 자동으로 정리하는 기능)되지 않습니다. 특히 큰 데이터를 가진 변수가 있다면 메모리에 계속 남아있게 되죠. 저는 이벤트 리스너에서 클로저를 사용할 때 이런 문제를 겪었는데, 사용이 끝나면 `removeEventListener`로 정리하는 습관을 들이니까 해결됐어요.

<br>

### 렉시컬 환경이 성능에 미치는 영향은 어떤가요?

스코프 체인을 따라 변수를 검색하는 과정에서 약간의 성능 비용이 발생할 수 있습니다. 하지만 현대 자바스크립트 엔진들이 매우 최적화되어 있어서 일반적인 사용에서는 성능 문제를 걱정할 필요가 없어요. 오히려 코드의 가독성과 유지보수성이 더 중요하다고 생각합니다.

<br>

### 블록 스코프와 렉시컬 환경은 어떤 관계인가요?

`let`과 `const`로 선언된 변수들은 블록 스코프를 가지며, 각 블록마다 새로운 렉시컬 환경이 생성됩니다. 이는 `var`와 다른 점이에요. 예를 들어, `for` 루프에서 `let`을 사용하면 각 반복마다 새로운 렉시컬 환경이 만들어져서 클로저 관련 문제를 방지할 수 있습니다.

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

## 마무리

렉시컬 환경에 대해 알아보았는데, 핵심 포인트를 정리해보면

- **렉시컬 환경**은 변수와 함수의 위치를 추적하는 자바스크립트의 내부 시스템입니다.
- **환경 레코드**는 실제 값들이 저장되는 공간이고, **외부 참조**는 스코프 체인의 방향을 알려줍니다.
- **클로저와 메모리 관리**의 기반이 되는 중요한 개념입니다.

오늘 배운 내용으로 간단한 카운터나 계산기를 만들어보세요. 렉시컬 환경이 어떻게 작동하는지 직접 체험해볼 수 있을 거예요.

다음 글에서는 렉시컬 환경을 기반으로 한 **클로저**에 대해 자세히 다뤄보겠습니다. 클로저를 이해하면 더 고급 자바스크립트 패턴을 사용할 수 있게 될 거예요!

여러분의 렉시컬 환경 학습 경험은 어떠셨나요? 어려웠던 부분이나 궁금한 점이 있다면 댓글로 공유해주세요! 함께 배워나가요 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures">MDN Web Docs - Closures</a>
</div>