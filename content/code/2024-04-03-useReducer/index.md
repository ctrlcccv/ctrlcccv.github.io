---
title: >  
    복잡한 로직도 쉽게! React useReducer 핵심 개념과 활용법

description: >  
    React의 useReducer는 복잡한 상태 관리를 쉽게 만들어주는 도구입니다. 상태 업데이트 로직을 명확히 정의하고 중앙 집중화하여 유지 보수성과 확장성을 향상시킵니다.

slug: 2024-04-03-useReducer
date: 2024-04-03 00:00:00+0000
lastmod: 2024-04-03 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-04-03-useReducer.webp

categories:
    - React
tags:

---
React 애플리케이션을 개발할 때, 상태 관리는 매우 중요한 요소입니다. React는 기본적으로 useState를 제공하지만, 더 복잡한 상황에서는 useReducer라는 든든한 조력자가 필요합니다. useReducer는 상태 로직을 명확하게 정의하고, 중앙 집중화하여 관리할 수 있도록 도와줍니다. 이 글에서는 useReducer의 작동 방식, 활용 방법, 그리고 다양한 상황에서의 사용 예시를 통해 애플리케이션의 유지 보수성과 확장성을 높이는 방법을 소개합니다.  


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

## useReducer란?
useReducer는 React의 핵심 훅 중 하나로, 상태 관리를 위한 강력한 도구입니다. useState와 유사하게 작동하지만, 더 복잡한 상태 로직을 다루고, 성능을 최적화하는 데 효과적입니다.  

<br>

## useReducer의 구조
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```
useReducer는 다음과 같은 구성 요소로 이루어집니다.

* **state:** 현재 상태를 나타내는 변수입니다.
* **dispatch:** 액션을 발생시키는 함수로, reducer에 액션을 전달하여 상태를 업데이트합니다.
* **reducer:** 상태 업데이트 로직을 담당하는 함수입니다.
* **initialState:** 상태의 초깃값을 설정합니다.

<br>

## useReducer를 사용하는 이유

* **복잡한 상태 로직 처리:** 여러 개의 상태 변수와 업데이트 로직을 간결하고 명확하게 관리할 수 있습니다.
* **중앙 집중화:** 상태 업데이트 로직을 한곳에 모아 코드의 가독성과 유지 보수성을 향상시킵니다.
* **성능 최적화:** 불필요한 렌더링을 방지하고, 상태 업데이트를 효율적으로 처리합니다.

<br>

## 활용 예시

### 카운터 애플리케이션  

카운터 애플리케이션은 useReducer의 기본적인 활용 예시입니다. 버튼 클릭에 따라 카운터 값을 증가 또는 감소시키는 간단한 로직을 구현할 수 있습니다.

```jsx
// 초기 상태를 정의합니다.
const initialState = { count: 0 };

// 상태를 업데이트하는 reducer 함수를 정의합니다.
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }; // count를 1 증가시킵니다.
        case 'decrement':
            return { count: state.count - 1 }; // count를 1 감소시킵니다.
        default:
            throw new Error(); // 알 수 없는 액션 타입이면 에러를 발생시킵니다.
    }
}

// 카운터 컴포넌트를 정의합니다.
function Counter() {
    // useReducer 훅을 사용하여 state와 dispatch 함수를 받습니다.
    const [state, dispatch] = useReducer(reducer, initialState);

    // 현재 count 상태를 출력하고, 버튼 클릭에 따라 액션을 dispatch 합니다.
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    );
}
```

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

* **상태 관리:** 카운터 값을 `state` 변수에 저장하고 `dispatch` 함수로 업데이트합니다.
* **액션 처리:** `reducer` 함수는 액션 타입에 따라 카운터 값을 증가/감소시킵니다.
* **UI 업데이트:** `Counter` 컴포넌트는 `state.count` 값을 출력하고 버튼 클릭 시 액션을 dispatch합니다.

<br>

### Todo List 애플리케이션  

Todo List 애플리케이션은 useReducer의 다양한 기능을 활용하는 좋은 예시입니다. Todo 항목 추가, 삭제, 완료 등의 복잡한 상태 업데이트 로직을 useReducer를 통해 간결하고 효율적으로 관리할 수 있습니다.  

```jsx
const initialState = { todos: [] }; // 초기 상태를 설정합니다.

function reducer(state, action) {
    switch (action.type) {
        case 'addTodo':
            return { todos: [...state.todos, action.payload] }; // 새로운 할 일을 추가합니다.
        case 'removeTodo':
            return { todos: state.todos.filter(todo => todo.id !== action.payload) }; // 할 일을 삭제합니다.
        case 'toggleTodo':
            return {
                todos: state.todos.map(todo => {
                    if (todo.id === action.payload) {
                        return { ...todo, completed: !todo.completed }; // 할 일의 완료 상태를 변경합니다.
                    }
                    return todo;
                }),
            };
        default:
            throw new Error(); // 액션에 대한 처리가 없으면 에러를 발생시킵니다.
    }
}

function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState); // 리듀서를 사용하여 상태를 관리합니다.

    const addTodo = text => dispatch({ type: 'addTodo', payload: text }); // 새로운 할 일을 추가합니다.
    const removeTodo = id => dispatch({ type: 'removeTodo', payload: id }); // 할 일을 삭제합니다.
    const toggleTodo = id => dispatch({ type: 'toggleTodo', payload: id }); // 할 일의 완료 상태를 변경합니다.

    return (
        <div>
            <input
                type="text"
                placeholder="새로운 할 일 입력..."
                onKeyPress={(e) => {
                    if (e.key === 'Enter') addTodo(e.target.value); // 엔터 키를 눌러 새로운 할 일을 추가합니다.
                }}
            />
            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)} // 체크박스를 토글하여 할 일의 완료 상태를 변경합니다.
                        />
                        {todo.text}
                        <button onClick={() => removeTodo(todo.id)}>X</button> // 할 일을 삭제하는 버튼입니다.
                    </li>
                ))}
            </ul>
        </div>
    );
}
```
* **상태 관리:** Todo 항목 목록을 `state.todos` 변수에 저장하고 `dispatch` 함수로 업데이트합니다.
* **액션 처리:** `reducer` 함수는 액션 타입에 따라 Todo 항목 목록을 추가/삭제/완료 상태 변경합니다.
* **UI 업데이트:** `TodoList` 컴포넌트는 `state.todos` 목록을 반복하여 출력하고, 사용자 입력을 받아 액션을 dispatch합니다.

<br>

## 결론
useReducer는 React 애플리케이션에서 상태 관리를 위한 강력한 도구입니다. 복잡한 상태 로직을 간결하고 효율적으로 처리하고, 애플리케이션의 유지 보수성과 확장성을 향상시키는 데 도움을 줄 수 있습니다.
