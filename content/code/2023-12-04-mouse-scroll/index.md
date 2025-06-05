---
title: CSS로 마우스 스크롤 유도 애니메이션 만들기
description: >  
    CSS로 마우스 스크롤 유도 애니메이션을 쉽게 만드는 방법을 소개합니다. HTML, CSS 코드 예제와 함께 자세히 설명합니다.
slug: 2023-12-04-mouse-scroll
date: 2023-12-04 01:00:00+0000
lastmod: 2025-04-29 00:00:00+0000

alternates:
  - title: "CSS로 마우스 스크롤 유도 애니메이션 만들기"
    href: "https://ctrlcccv.github.io/code/2023-12-04-mouse-scroll/"
    hreflang: "ko"
  - title: "Create a Scrolling Mouse Animation with CSS"
    href: "https://ctrlcccv.github.io/code-en/2025-05-06-mouse-scroll/"
    hreflang: "en"
  - title: "CSS로 마우스 스크롤 유도 애니메이션 만들기"
    href: "https://ctrlcccv.github.io/code/2023-12-04-mouse-scroll/"
    hreflang: "x-default"

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-04-mouse-scroll.webp

categories:
    - CSS
tags:
    - CSS 애니메이션
---
방문자가 첫 화면에서 바로 이탈하지 않고, 아래 내용을 자연스럽게 읽게 만들려면 어떻게 해야 할까요?  

웹사이트를 만들다 보면, 방문자가 페이지를 자연스럽게 스크롤 하도록 유도하고 싶을 때가 많습니다.  
특히 첫 화면(첫 섹션)에서 바로 다음 내용을 읽게 하려면, 눈에 띄는 스크롤 안내가 효과적입니다.  

이번 글에서는 CSS만 사용해서 마우스 스크롤 유도 애니메이션을 만드는 방법을 소개합니다.  
마우스 모양과 부드럽게 움직이는 화살표로, 사용자의 시선을 자연스럽게 아래로 이끌어보세요!

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

## HTML 구조
```html
<div class="mouse_scroll" aria-label="스크롤 유도">
    <span class="mouse"></span>
    <div class="down_arrow">
        <span class="down_arrow1"></span>
        <span class="down_arrow2"></span>
        <span class="down_arrow3"></span>
    

```
**구성 설명**

- **`.mouse_scroll`**: 마우스 스크롤 애니메이션 전체를 감싸는 컨테이너입니다.
- **`.mouse`**: 마우스 외형을 표현하는 요소입니다.
- **`.down_arrow` 안의 `<span>` 요소들**: 각각 하나의 아래 방향 화살표를 표현합니다.

<br>

## CSS 스타일
```css
/* 마우스 스크롤 유도 전체 컨테이너 */
.mouse_scroll {
    position: fixed;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
}

/* 마우스 외형 */
.mouse {
    display: block;
    width: 23px;
    height: 36px;
    border: 2px solid #ffffff;
    border-radius: 23px;
}

/* 마우스 내부 점 (휠 느낌) */
.mouse::after {
    content: '';
    display: block;
    position: relative;
    width: 2px;
    height: 6px;
    margin: 5px auto;
    background: #ffffff;
    animation: mouse-pulse 1.2s ease infinite;
}

/* 아래쪽 화살표 묶음 영역 */
.down_arrow {
    margin-top: 6px;
}

/* 각 화살표 스타일 */
.down_arrow span {
    display: block;
    position: relative;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-bottom: 2px;
    margin-left: -2px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(45deg) translateX(-50%);
    animation: fade-arrow 1s infinite;
}

/* 두 번째 화살표 애니메이션 설정 */
.down_arrow2:nth-of-type(2) {
    animation-delay: 0.2s;
    animation-direction: alternate;
}

/* 세 번째 화살표 애니메이션 설정 */
.down_arrow3:nth-of-type(3) {
    animation-delay: 0.3s;
    animation-direction: alternate;
}

/* 마우스 휠 점 애니메이션 */
@keyframes mouse-pulse {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(6px);
    }
}

/* 화살표 깜빡이는 애니메이션 */
@keyframes fade-arrow {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
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



**주요 포인트 설명**

* **마우스 모양 만들기**  
<span class="txt">
`border`와 `border-radius`를 활용하여 둥글고 심플한 마우스 형태를 표현합니다.  
흰색 테두리만으로도 직관적인 마우스 이미지를 연출할 수 있습니다.
</span>

* **점(스크롤 휠) 애니메이션**  
<span class="txt">
`.mouse::after` 가상 요소를 사용해 스크롤 휠처럼 보이는 작은 점을 만듭니다.  
이 점은 `mouse-pulse` 애니메이션을 통해 위아래로 부드럽게 움직이며 서서히 사라졌다 나타나는 효과를 줍니다. 사용자에게 스크롤이 가능한 영역임을 자연스럽게 안내합니다.
</span>

* **화살표 애니메이션**  
<span class="txt">
`border-right`와 `border-bottom` 속성을 이용해 45도 회전된 화살표 모양을 만듭니다.  
세 개의 화살표가 `fade-arrow` 애니메이션으로 순서대로 천천히 나타나며, 사용자의 시선을 자연스럽게 아래로 유도합니다.  
</span>

<br>

## 결론

마우스 스크롤 유도 애니메이션은 다음과 같은 곳에 특히 유용합니다:
- 랜딩 페이지
- 포트폴리오 웹사이트
- 제품 소개 페이지
- 온라인 매거진

작은 시각적 장치 하나로도 사용자가 페이지를 자연스럽게 스크롤하거나, 다음 콘텐츠를 읽도록 유도할 수 있습니다.

도움이 되셨나요?
추가로 궁금한 점이 있거나, 다른 애니메이션 예제도 보고 싶다면 댓글로 알려주세요!  
여러분의 의견은 다음 글을 준비하는 데 큰 도움이 됩니다. 🙌

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-04-mouse-scroll/">예제결과 미리보기</a>
</div>

