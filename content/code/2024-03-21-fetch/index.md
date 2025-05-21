---
title: >  
    JavaScript Fetch API 사용법: 실시간 데이터 처리 예시

description: >  
    JavaScript Fetch API를 사용하여 데이터를 처리하는 방법을 상세히 설명합니다. 기본 사용법부터 옵션 설정, Async/Await과의 활용, API 예시를 다루며 효율적인 웹 개발을 제안합니다.

slug: 2024-03-21-fetch
date: 2024-03-21 00:00:00+0000
lastmod: 2024-03-21 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-21-fetch.webp

categories:
    - JavaScript
tags:

---
JavaScript에서 데이터를 가져오는 것은 웹 개발의 핵심 요소입니다. Fetch API는 비동기적으로 네트워크 리소스를 가져오는 강력하고 유연한 도구로, XMLHttpRequest보다 더 간단하고 효율적인 방식으로 데이터를 처리할 수 있도록 해줍니다. 이 글에서는 Fetch API의 기본적인 사용법과 옵션 설정, Async/Await과의 활용 등을 다루며, API를 사용한 예제를 통해 이해를 높여보겠습니다.  


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

## Fetch API 기본 사용법

Fetch API는 `fetch()` 함수를 사용하여 네트워크 리소스를 요청합니다. 기본적인 사용법은 다음과 같습니다.

```javascript
async function fetchData(url) {
    // 주어진 URL로부터 데이터를 가져옵니다.
    const response = await fetch(url);

    // 응답 상태 코드를 확인합니다.
    if (!response.ok) {
        throw new Error(`네트워크 응답이 올바르지 않습니다. (${response.status})`);
    }

    // 응답 본문을 JSON 형식으로 변환합니다.
    const data = await response.json();

    // 변환된 데이터를 반환합니다.
    return data;
}

// 'https://api.example.com/data' URL로부터 데이터를 가져와 출력합니다.
const data = await fetchData('https://api.example.com/data');
console.log(data);
```

* `response.ok` 속성은 응답 상태 코드가 200 OK인지 확인합니다.
* `response.json()` 메서드는 응답 본문을 JSON 형식으로 변환합니다.  


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

## Fetch 옵션 설정

`fetch()` 함수는 다양한 옵션을 받아 요청을 세밀하게 조정할 수 있습니다. 

* **HTTP 메서드:** `GET`, `POST`, `PUT`, `DELETE` 등의 HTTP 메서드를 지정합니다.
* **헤더:** 요청에 추가할 헤더 정보를 객체 형태로 설정합니다.
* **요청 본문:** POST 요청 시, JSON 데이터와 같은 본문을 설정합니다.
* **타임아웃:** 요청에 대한 제한 시간을 설정합니다.

다음은 옵션을 사용하여 사용자 정보 API에 POST 요청을 보내는 예시입니다.

```javascript
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // 실제 토큰으로 변경
    },
    body: JSON.stringify({ username: 'example', password: '123' })
};

const response = await fetch('https://api.example.com/login', options);

// 응답 상태 코드를 확인합니다.
if (!response.ok) {
    throw new Error(`로그인 실패 (${response.status})`);
}

// 응답 본문을 JSON 형식으로 변환합니다.
const data = await response.json();

// 로그인 성공 시 사용자 정보를 출력합니다.
if (data.success) {
    console.log(data.user);
} else {
    console.error(`로그인 실패: ${data.error}`);
}
```

* `Authorization` 헤더에 사용자의 접근 토큰을 설정해야 합니다.
* `data.success` 속성은 로그인 성공 여부를 나타냅니다.

<br>

## Fetch와 Async/Await

Fetch API는 Promise를 반환하므로, Async/Await을 사용하여 코드를 더욱 간결하고 명확하게 작성할 수 있습니다.  

```javascript
async function login(username, password) {
    // 로그인 API에 요청을 보내고 응답을 기다립니다.
    const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // 실제 토큰으로 변경
        },
        body: JSON.stringify({ username, password })
    });

    // 응답 상태 코드를 확인합니다.
    if (!response.ok) {
        throw new Error(`로그인 실패 (${response.status})`);
    }

    // 응답 본문을 JSON 형식으로 변환합니다.
    const data = await response.json();

    // 로그인 성공 시 사용자 정보를 반환합니다.
    if (data.success) {
        return data.user;
    } else {
        throw new Error(`로그인 실패: ${data.error}`);
    }
}

// 'example' 사용자로 로그인하고 결과를 출력합니다.
const user = await login('example', '123');
console.log(user);
```

`login()` 함수는 사용자 이름과 비밀번호를 입력 받아 로그인 API에 요청을 보내고, 성공 시 사용자 정보를 반환합니다.  

<br>

## 코드 예시 : 댓글 목록 실시간 업데이트

다음은 댓글 목록 API를 사용하여 댓글 목록을 실시간으로 업데이트하는 예시입니다.  

```javascript
async function updateComments() {
    try {
        // 댓글 목록 API에 요청을 보내고 응답을 기다립니다.
        const response = await fetch('https://api.example.com/comments');

        // 응답 상태 코드를 확인합니다.
        if (!response.ok) {
            throw new Error(`댓글 가져오기 실패 (${response.status})`);
        }

        // 응답 본문을 JSON 형식으로 변환합니다.
        const comments = await response.json();

        // 화면에 댓글 목록을 업데이트합니다.
        // ...

        // 1초마다 댓글 목록을 업데이트합니다.
        setTimeout(updateComments, 1000);
    } catch (error) {
        console.error(error);
        // 에러 발생 시 재시도하지 않고 종료합니다.
    }
}

// 댓글 목록을 처음으로 로딩합니다.
updateComments();
```
* `updateComments()` 함수는 댓글 목록 API에 요청을 보내고, 응답을 받아 화면에 댓글 목록을 업데이트합니다.
* `setInterval()` 함수를 사용하여 1초마다 `updateComments()` 함수를 실행하여 댓글 목록을 실시간으로 업데이트합니다.

<br>

## 결론 
JavaScript Fetch API는 강력하고 유연한 네트워크 요청 도구입니다. 비동기적으로 데이터를 가져오고 처리할 수 있는 간단한 API를 제공하여 웹 개발을 보다 효율적으로 만들어줍니다. 위의 예제를 참고하여 프로젝트에서 Fetch API를 활용해보세요.  

