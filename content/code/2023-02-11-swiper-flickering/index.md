---
title: CSS - Swiper 슬라이드 iOS 환경에서 깜박임 문제 해결
description: iOS 환경에서 Swiper 슬라이드를 사용할 때 발생하는 깜박임 문제를 해결하는 방법입니다.  
slug: 2023-02-11-swiper-flickering
date: 2023-02-11 00:00:00+0000
## image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-multiple.webp

categories:
    - CSS
tags:
    - Swiper.js
---
iOS 환경에서 Swiper 슬라이드를 사용할 때 발생하는 깜박임 문제를 해결하는 방법입니다.  
backface-visibility와 transform 속성을 활용하여 문제를 해결했습니다.  


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

## 문제 상황과 원인
iOS 기기에서 Swiper 슬라이드를 사용하면, 슬라이드를 넘길 때 화면이 깜빡이는 문제가 발생할 수 있습니다.  
이 문제의 원인은 iOS 웹킷 브라우저의 렌더링 방식과 관련이 있습니다.  
브라우저는 화면을 그릴 때 백 페이스(요소의 뒷면)의 처리나 하드웨어 가속을 고려하게 됩니다.   
이로 인해 슬라이드가 넘어갈 때 백 페이스 처리가 부족하거나 브라우저의 그래픽 가속이 올바르게 이루어지지 않아, 깜빡임이 발생할 수 있습니다.   
<br>

## 해결 방법
비슷한 문제를 겪은 다른 개발자들의 질문과 답변을 참고하여 문제를 해결했습니다.   
아래는 문제 해결을 위해 적용한 코드입니다.    

### HTML 구조

참고를 위해 작성한 HTML 구조입니다.  

```html
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
            <li class="swiper-slide">slider5</li>
            <li class="swiper-slide">slider6</li>
        </ul>
    </div>
    <span class="swiper-button-prev">이전</span>
    <span class="swiper-button-next">다음</span>
</div>
```

### CSS 속성 적용

깜빡임 문제를 해결하기 위해 적용한 CSS 속성입니다.

```css
.slider .swiper-slide {-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0, 0, 0);}
```

### 속성 설명
* -webkit-backface-visibility: hidden :  
웹킷 브라우저에서 요소의 뒷면인 백 페이스의 가시성을 숨깁니다. 이를 통해 백 페이스 처리가 최적화되어 깜빡임을 줄일 수 있습니다.
* -webkit-transform: translate3d(0, 0, 0) :  
요소에 3D 변환을 적용하여 GPU 가속을 활용합니다. 이를 통해 브라우저는 부드러운 애니메이션 처리를 위해 그래픽 가속을 사용하게 됩니다.  
<br>

## 결론
iOS 환경에서 Swiper 슬라이드를 사용할 때 발생하는 깜빡임 문제는 웹 개발자들이 자주 마주하는 문제 중 하나입니다.  
깜빡임과 같은 화면 이슈는 사용자 경험을 해치는 중요한 문제이므로, 위에 방법을 활용하면 최적화된 슬라이드를 구현할 수 있습니다.  
<br>

> [스택 오버플로우(Stack Overflow) 원본 답변](https://stackoverflow.com/questions/68369533/slides-flickering-after-end-loop-in-swiper-slider)
