---
layout: post
title: CSS - Swiper 슬라이드 iOS 환경에서 깜박임 문제 해결
#image: 
  #path: /assets/img/blog/swiper-multiple.webp
description: >
  아이폰에서 Swiper 슬라이드를 넘길 때 깜빡거리는 문제 해결
keywords: > 
  Swiper, 깜빡임
sitemap: true
comments: false
---
아이폰에서 Swiper 슬라이드를 넘길 때 깜빡거리는 문제가 있었다.  
[stackoverflow](https://stackoverflow.com/questions/68369533/slides-flickering-after-end-loop-in-swiper-slider){:target="_blank"}에 비슷한 질문이 있어서 답변 중 아래 코드로 문제를 해결했다.

## HTML

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

## CSS

```css
.slider .swiper-slide {-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0, 0, 0);}
```

