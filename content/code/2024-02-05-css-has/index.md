---
title: >  
    CSS :has() 부모 요소 접근을 위한 새로운 선택자
description: >  
    CSS의 :has() 속성은 특정 상황에서 부모 요소에 쉽게 접근할 수 있게 해주는 선택자로, 주어진 선택자 목록 중 하나라도 일치하면 해당 요소를 선택합니다. 이를 통해 더 효율적이고 유연한 웹 디자인이 가능해지며, :is()나 :where()와 함께 사용하여 브라우저 호환성을 고려할 수 있습니다.    

slug: 2024-02-05-css-has
date: 2024-02-05 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-02-05-css-has.webp

categories:
    - CSS
tags:
    - 가상 클래스
---
CSS는 웹 디자인과 스타일링에서 핵심적인 역할을 하는 언어입니다. 최근에 도입된 :has() 속성은 이전에는 어려웠던 특정 상황에서의 선택자를 간편하게 다룰 수 있게 해주는 강력한 기능입니다. 2023년 12월 이후, 이 기능은 최신 디바이스 및 브라우저에서 작동하며, 이전의 디바이스나 브라우저에서는 동작하지 않을 수 있습니다.  
<br>


## :has() 속성이란?

`:has()` 가상 클래스는 주어진 선택자 목록 중 하나라도 현재 요소와 일치하는 것이 있으면 해당 요소를 선택합니다. 이것은 상대적인 선택자 목록을 인수로 사용하여 참조 요소에 대해 부모 요소나 이전 형제 요소를 선택하는 방법을 제공합니다.

```css
/* h1 뒤에 즉시 따라오는 p를 가진 h1을 선택하고 스타일을 적용합니다. */
h1:has(+ p) {
    margin-bottom: 0;
}
```

## 문법

```css
:has(<relative-selector-list>) {
    /* 스타일 정의 */
}
```
**브라우저 호환성에 대한 고려**  

브라우저가 `:has()` 가상 클래스를 지원하지 않으면, 해당 가상 클래스를 사용한 부분이 포함된 전체 선택자 블록이 실패합니다.
다만, 해당 부분이 `:is()`나 `:where()`와 같은 선택자 목록 안에 있으면 다른 부분은 여전히 작동할 수 있습니다.  

**`:has()`의 무한 반복 방지**  

`:has()`는 선택한 요소의 조상 중 일치하는 요소가 있는지 확인합니다.
그러나 `:has()` 내에서 다시 다른 `:has()`를 중첩하는 경우, 무한한 반복 쿼리를 초래할 수 있어 허용되지 않습니다.
예를 들어, A 요소에 `:has(B)`가 적용되어 B와 매칭되는지 확인하는데, B 요소 내에서 다시 `:has(A)`를 사용하면 무한 반복이 발생할 수 있습니다. 이를 "순환 쿼리"라고 합니다.

**가상 요소 제한**  

가상 요소는 `:has()` 안에서 유효한 선택자가 아니며, `:has()`의 앵커로 사용될 수 없습니다.  


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

## 예제

### 형제 조합자 사용

```html
<section>
    <article>
        <h1>제목</h1>
        <p>
          본문 내용
        </p>
    </article>
    <article>
        <h1>제목</h1>
        <h2>부제목</h2>
        <p>
          본문 내용
        </p>
    </article>
</section>
```

<br>

```css
/* h1이 바로 뒤에 오는 경우 여백을 조정합니다. */
h1:has(+ h2) {
    margin: 0 0 25px 0;
}
```
### :is()와 함께 사용하기

```html
<section>
    <article>
        <h1>제목</h1>
        <h2>부제목</h2>
        <p>
            본문 내용
        </p>
    </article>
    <article>
        <h1>제목</h1>
        <h2>부제목</h2>
        <h3>세부 제목</h3>
        <p>
            본문 내용
        </p>
    </article>
</section>
```

<br>

```css
/* h1, h2, h3가 바로 뒤에 오는 경우 여백을 조정합니다. */
:is(h1, h2, h3):has(+ :is(h2, h3, h4)) {
    margin: 0 0 25px 0;
}
```

### 논리적 연산

`:has()` 관계 선택자는 여러 기능 중 하나가 true인지 또는 모든 기능이 true인지 확인하는 데 사용할 수 있습니다.

```css
/* 콘텐츠에 오디오 또는 비디오가 포함된 경우에 스타일을 적용합니다. */
body:has(video, audio) {
    /* 오디오 또는 비디오 콘텐츠가 포함된 경우 적용할 스타일 */
}

/* 콘텐츠에 오디오와 비디오가 모두 포함된 경우에 스타일을 적용합니다. */
body:has(video):has(audio) {
    /* 오디오와 비디오 모두 포함된 경우 적용할 스타일 */
}
```

## 정규 표현식과의 유사성

CSS의 :has() 구조는 정규 표현식의 전방 탐색(assertion)과 유사한 부분이 있습니다. 이는 조건에 따라 요소를 선택하지만 실제로 조건과 일치하는 요소 자체를 선택하지 않는다는 점에서 유사합니다.

**긍정 전방 탐색 (?=pattern)**

정규 표현식 abc(?=xyz)에서 문자열 abc는 xyz가 바로 뒤에 나타날 때만 일치합니다. 이는 CSS에서 `.abc:has(+ .xyz)`로 나타낼 수 있습니다. 여기서 `:has(+ .xyz)` 부분은 전방 탐색 연산처럼 작동하며, .abc 요소를 선택하고 .xyz 요소는 선택하지 않습니다.

**부정 전방 탐색 (?!pattern)**

부정 전방 탐색 abc(?!xyz)에서 문자열 abc는 xyz가 바로 뒤에 나타나지 않을 때만 일치합니다. 이는 CSS에서 `.abc:has(+ :not(.xyz))`로 표현됩니다. 이는 .abc 요소를 선택하지만, 다음 요소가 .xyz인 경우 .abc를 선택하지 않습니다.  

<br>

## 결론

:has() 속성은 CSS에 더 많은 기능과 유연성을 제공하며, 효율적이고 유지보수가 쉬운 스타일을 적용할 수 있습니다. CSS의 발전으로 더 다양한 디자인을 구현할 수 있게 되었으며, 앞으로 이를 통해 더 다양한 웹 디자인이 기대됩니다.  
<br>

<div class="btn_wrap">
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has" target="_blank">[참고문서] :has()</a>
</div>
