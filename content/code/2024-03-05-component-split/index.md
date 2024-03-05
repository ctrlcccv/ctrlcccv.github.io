---
title: >  
    React 컴포넌트 분리 기준: 관리하기 쉬운 코드 만들기

description: >  
    리액트 애플리케이션에서의 효과적인 컴포넌트 분리는 코드 가독성과 유지보수성을 높이는 전략으로, 단일 책임 원칙과 재사용성을 고려하여 프레젠테이셔널/컨테이너 컴포넌트, HOC 등을 활용합니다.

slug: 2024-03-05-component-split
date: 2024-03-04 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-05-component-split.webp

categories:
    - React
tags:

---
리액트 애플리케이션 개발에서 컴포넌트 분리는 코드의 구조를 명확하게 유지하고 유지보수성을 높이는 핵심 전략입니다. 이 글에서는 리액트 컴포넌트를 효과적으로 분리하는 기준과 전략을 심층적으로 다루고, 실제 개발에 적용할 수 있는 구체적인 예시 코드를 제공합니다.   
<br>

## 컴포넌트 분리의 중요성  

컴포넌트 분리는 다음과 같은 이점을 제공합니다.

* **단일 책임 원칙 (SRP) 구현:** 각 컴포넌트는 하나의 명확한 역할을 수행하여 코드의 이해도와 유지보수성을 향상시킵니다.
* **재사용성 향상:** 공통 기능을 가진 컴포넌트를 분리하여 여러 페이지에서 재사용할 수 있습니다.
* **가독성 증대:** 코드를 작고 독립적인 컴포넌트로 나누어 코드의 가독성과 이해도를 높입니다.
* **테스트 용이성:** 컴포넌트 단위 테스트를 쉽게 수행하여 코드의 안정성을 높일 수 있습니다.
* **협업 개선:** 개발자들이 각 컴포넌트에 집중하여 개발하면서 협업 효율성을 높일 수 있습니다.

<br>

## 컴포넌트 분리 기준

컴포넌트 분리 기준은 다음과 같습니다.

* **단일 책임 원칙:** 각 컴포넌트는 하나의 명확한 역할을 수행해야 합니다.
* **재사용 가능성:** 비슷한 기능을 하는 부분은 독립된 컴포넌트로 분리하여 재사용성을 높입니다.
* **가독성:** 코드를 작고 독립적인 컴포넌트로 나누어 가독성을 높입니다.
* **상태와 라이프사이클:** 컴포넌트가 관리하는 상태와 라이프사이클 메서드를 고려하여 분리합니다.
* **UI 요소:** 서로 다른 UI 요소는 별도의 컴포넌트로 분리합니다.

<br>

## 컴포넌트 분리 전략

컴포넌트 분리 전략은 다음과 같습니다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8535540836842352" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

* **프레젠테이셔널 컴포넌트 중심 개발**  
  - 프레젠테이셔널 컴포넌트는 UI 구현에 집중하고, 컨테이너 컴포넌트는 데이터 로직과 같은 최소한의 기능만 담당합니다.
  - 컨테이너 컴포넌트의 역할을 줄여 프레젠테이셔널 컴포넌트의 재사용성을 높이고 코드 관리를 간소화합니다.

* **Hooks 활용**   
  - `useState`, `useEffect`와 같은 Hooks를 사용하여 컴포넌트 상태 관리 및 로직 처리를 분리합니다.
  - 코드를 더 작고 재사용 가능한 단위로 나누고, 컴포넌트 간의 의존성을 줄입니다.

* **GraphQL 활용**  
  - GraphQL API를 사용하여 데이터 쿼리 및 변형을 컴포넌트에서 직접 처리합니다.
  - 컴포넌트 간 데이터 전달 및 상태 관리 코드를 간소화하고, 필요한 데이터만 로딩하여 성능을 향상시킵니다.

* **스타일링 라이브러리 활용**  
  - `styled-components` 같은 라이브러리는 성능 개선, TypeScript 지원, 더욱 유연한 스타일링 기능 등을 제공합니다.
  - 최신 기능을 활용하여 코드를 더욱 효율적이고 유지 관리하기 쉽게 만듭니다.

* **상태 관리 라이브러리 선택**  
  - `Redux`는 여전히 대규모 앱에 적합하지만, `zustand`, `Recoil`과 같은 가벼운 라이브러리가 등장했습니다.
  - 프로젝트 규모와 특성에 따라 적합한 라이브러리를 선택하여 상태 관리 코드를 간소화합니다.

* **Serverless 아키텍처 고려**  
  - Serverless 아키텍처는 컴포넌트 개발에 직접적인 영향을 미치지는 않지만, 백엔드 개발 방식을 변화시켜 앱 개발 전반에 영향을 미칩니다.
  - Serverless 환경에 맞춰 컴포넌트 분리 전략을 설계하여 앱의 확장성 및 유연성을 높일 수 있습니다.
  
<br>

## 실제 개발 적용 예시

다음은 실제 개발에서 컴포넌트 분리를 적용한 예시입니다.

* **댓글 시스템**  
    * `CommentList` 컴포넌트: 댓글 목록 표시
    * `CommentForm` 컴포넌트: 댓글 작성
    * `Comment` 컴포넌트: 개별 댓글 표시

* **상품 상세 페이지**  
    * `ProductInfo` 컴포넌트: 상품 정보 표시
    * `ProductReview` 컴포넌트: 상품 리뷰 표시
    * `ProductQnA` 컴포넌트: 상품 Q&A 표시

* **사용자 프로필 페이지**  
    * `UserProfile` 컴포넌트: 사용자 기본 정보 표시
    * `UserEdit` 컴포넌트: 사용자 정보 수정
    * `UserOrders` 컴포넌트: 사용자 주문 목록 표시

<br>

## 코드 예시

다음은 댓글 시스템 예시의 코드 블록입니다.

```js
// CommentList.js
function CommentList({ comments }) {
    return (
        <ul>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </ul>
    );
}

// CommentForm.js
function CommentForm({ onSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">댓글 작성</button>
        </form>
    );
}

// Comment.js
function Comment({ comment }) {
    return (
        <li>
           {comment.author} - {comment.content}
        </li>
    );
}
```

<br>

## 추가 고려 사항

* **컴포넌트 크기:** 컴포넌트는 너무 크거나 작지 않도록 적절한 크기로 유지해야 합니다.
* **파일 구조:** 컴포넌트 파일을 논리적으로 구성하여 관리하기 쉽게 해야 합니다.
* **명명 규칙:** 컴포넌트 이름을 명확하고 일관되게 지어야 합니다.
* **테스트:** 컴포넌트 단위 테스트를 수행하여 코드의 안정성을 높여야 합니다.

<br>

## 결론

컴포넌트 분리는 리액트 애플리케이션의 유지보수성을 높이는 중요한 전략입니다. 이 글에서 제시된 기준, 전략, 예시를 참고하여 리액트 컴포넌트를 효과적으로 분리하고 코드의 가독성과 유지보수성을 향상시키세요.
