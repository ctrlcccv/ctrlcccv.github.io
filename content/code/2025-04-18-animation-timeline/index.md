---
title: >  
    animation-timeline: CSS로 만드는 부드러운 스크롤 애니메이션

description: >  
    CSS의 animation-timeline 속성을 활용하여 스크롤 기반 애니메이션을 구현하는 방법과 예제를 소개합니다.

slug: 2025-04-18-animation-timeline
date: 2025-04-18 02:00:00+0000
lastmod: 2025-04-18 02:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-18-animation-timeline.webp

categories:
    - CSS
tags:
    - 스크롤 이벤트
---
스크롤할 때 자연스럽게 콘텐츠가 나타나는 효과를 CSS만으로 구현할 수 있을까요?  

최근 CSS는 점점 더 많은 기능을 제공하면서, 단순한 스타일링을 넘어서 인터랙션까지 제어할 수 있는 도구로 발전하고 있습니다. 그 대표적인 예가 animation-timeline 속성입니다. 이 속성을 활용하면 JavaScript 없이도 스크롤이나 화면 진입 같은 사용자 행동에 따라 애니메이션을 제어할 수 있습니다.


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

## animation-timeline이란?

animation-timeline 속성은 애니메이션이 어떤 기준을 따라 진행될지를 정의하는 기능입니다. 일반적으로 CSS 애니메이션은 페이지 로드 후 자동으로 실행되지만, 이 속성을 사용하면 스크롤이나 뷰포트 진입 같은 외부 상호작용을 애니메이션의 타이밍 기준으로 삼을 수 있습니다.  

```css
.element {
    animation-name: fade-in;
    animation-duration: auto;
    animation-timeline: scroll();
}
```
이 코드는 사용자의 스크롤 위치에 따라 .element의 애니메이션이 실행되도록 설정한 예시입니다.  

<br>

### 브라우저 지원 현황
animation-timeline, scroll-timeline, view-timeline 등은 현재 최신 버전의 Chrome, Edge, Firefox에서 실험적 기능 또는 기본 기능으로 부분적으로 지원됩니다. Safari는 아직 완전한 지원을 제공하지 않으며, 프로젝트 적용 시 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline) 또는 [Can I use](https://caniuse.com/) 사이트에서 최신 지원 현황을 꼭 확인하는 것이 좋습니다.  

<br>

## 예제 1: 요소가 화면에 보일 때 페이드 인

### HTML
```html
<section class="fade-in-box">
    <h2>Scroll to Fade In</h2>
    <p>이 콘텐츠는 스크롤할 때 서서히 나타납니다.</p>
</section>
```

### CSS
```css
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-box {
    animation-name: fade-in;
    animation-timeline: view();
    animation-duration: auto;
    animation-fill-mode: both;
    animation-range: entry 0% exit 100%;
}
```
### 예제 결과 미리보기

<p class="codepen" data-height="300" data-theme-id="dark" data-slug-hash="Ggggwxb" data-pen-title="2025-04-18-swiper-progress2-1" data-user="SANNA-the-encoder" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/SANNA-the-encoder/pen/Ggggwxb">
  2025-04-18-swiper-progress2-1</a> by SANNA (<a href="https://codepen.io/SANNA-the-encoder">@SANNA-the-encoder</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>


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

## 예제 2: animation-range로 애니메이션 구간 제어

### HTML
```html
<div class="step">
    <h3>애니메이션 구간 조정</h3>
    <p>이 박스는 스크롤 진행률이 20%에서 40% 사이일 때만 애니메이션이 작동합니다.</p>
</div>
```

### CSS
```css
.step {
    animation-name: step-in;
    animation-timeline: scroll();
    animation-duration: auto;
    animation-fill-mode: both;
    animation-range: entry 20% entry 40%;
}

@keyframes step-in {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
```
### 예제 결과 미리보기

<p class="codepen" data-height="300" data-theme-id="dark" data-slug-hash="jEEEXzz" data-pen-title="Untitled" data-user="SANNA-the-encoder" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/SANNA-the-encoder/pen/jEEEXzz">
  Untitled</a> by SANNA (<a href="https://codepen.io/SANNA-the-encoder">@SANNA-the-encoder</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

<br>
<br>

## 예제 3: 여러 요소가 순차적으로 등장하기
### HTML
```html
<section class="scroll-section">
    <div class="box delay-1">첫 번째 박스</div>
    <div class="box delay-2">두 번째 박스</div>
    <div class="box delay-3">세 번째 박스</div>
</section>
```

### CSS
```css
.scroll-section {
    margin-top: 100vh;
    padding: 100px;
}

.box {
    opacity: 0;
    transform: translateY(30px);
    animation-name: fade-in-up;
    animation-duration: auto;
    animation-timeline: view();
    animation-fill-mode: both;
    animation-range: entry 0% exit 100%;
    margin-bottom: 40px;
    background: #eee;
    padding: 30px;
    border-radius: 12px;
}

.delay-1 {
    animation-range: entry 0% exit 100%;
}
.delay-2 {
    animation-range: entry 20% exit 100%;
}
.delay-3 {
    animation-range: entry 40% exit 100%;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```
### 예제 결과 미리보기

<p class="codepen" data-height="300" data-theme-id="dark" data-slug-hash="PwwwVwO" data-pen-title="2025-04-18-swiper-progress2-3" data-user="SANNA-the-encoder" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/SANNA-the-encoder/pen/PwwwVwO">
  2025-04-18-swiper-progress2-3</a> by SANNA (<a href="https://codepen.io/SANNA-the-encoder">@SANNA-the-encoder</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>

<br>
<br>

## 기타 유용한 관련 속성 소개
* **scroll-timeline-name, view-timeline-name**: 여러 요소 간 타임라인을 공유할 때 사용할 수 있는 이름 설정 속성입니다.
* **scroll-timeline-axis**: 수직 또는 수평 스크롤 중 어떤 축을 기준으로 할지 설정할 수 있습니다.
* **@scroll-timeline**: 타임라인을 미리 선언하고, 여러 요소에 재사용할 수 있습니다.

이런 속성들은 추후 보다 복잡한 레이아웃이나 컴포넌트 기반 구조에서 매우 유용하게 활용될 수 있습니다.  

<br>

## 접근성 고려도 함께
애니메이션은 시각적으로 풍부한 경험을 제공하지만, 일부 사용자에게는 피로감을 줄 수 있습니다.  
과도한 애니메이션은 자제하는 것이 좋으며, prefers-reduced-motion 미디어 쿼리를 사용해 사용자 설정에 따라 애니메이션을 줄일 수 있도록 배려하는 것이 좋습니다.

```css
@media (prefers-reduced-motion: reduce) {
    .box {
        animation: none;
    }
}
```
<br>

## 마무리하며
animation-timeline 속성은 CSS의 표현력을 한층 끌어올려주는 기능입니다. 스크롤을 기반으로 한 애니메이션이나, 뷰포트에 콘텐츠가 진입할 때 반응하는 효과를 JavaScript 없이 구현할 수 있다는 점에서 개발 효율성과 유지보수 측면에서 큰 장점을 가집니다.  

animation-range를 활용해 애니메이션 구간을 정밀하게 제어하고, view()나 scroll() 같은 다양한 타임라인을 적용하면 더욱 생동감 있는 사용자 경험을 만들 수 있습니다.  

브라우저 지원 상황을 고려하여 점진적으로 활용해 나간다면, 실제 프로젝트에 유용하게 적용할 수 있는 강력한 도구가 될 것입니다.

<br>
