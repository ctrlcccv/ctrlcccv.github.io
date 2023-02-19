---
layout: post
title: jQuery -Swiper slider 페이징(pagination) 번호 커스텀
image: 
  path: /assets/img/blog/slick-progress.webp
description: >
  
keywords: > 
  
sitemap: true
comments: false
---

slick.js 플러그인을 사용하여 각 이미지의 제목과 진행 표시줄을 나타내는 이미지 슬라이드를 만들었다. 

## HTML

```html
<div class="slider_wrap">
  <!-- 이미지 슬라이드 -->
  <div class="slider">
    <div class="list"><img src="images/text1.png"></div>
    <div class="list"><img src="images/text2.png"></div>
    <div class="list"><img src="images/text3.png"></div>
    <div class="list"><img src="images/text4.png"></div>
  </div>
  <!-- 진행 표시줄 -->
  <ul class="progress">
    <li>
      <span class="bar"></span>
      <strong class="tit">Slide 1</strong>
    </li>
    <li>
      <span class="bar"></span>
      <strong class="tit">Slide 2</strong>
    </li>
    <li>
      <span class="bar"></span>
      <strong class="tit">Slide 3</strong>
    </li>
    <li>
      <span class="bar"></span>
      <strong class="tit">Slide 4</strong>
    </li>
  </ul>
</div>
```

기존 slick slider 코드에 진행 표시줄 HTML을 추가했다.

## CSS

```css
/* 이미지 슬라이드 */
.slider_wrap {position: relative;overflow: hidden;height: 600px;}
.slider {font-size: 0;}
.slider .list {position: relative;width: 100%;height: 600px;}
.slider .list img {position: absolute;top:0;left:0;width: 100%;height: 100%;object-fit: cover;}

/* 진행 표시줄 */
.progress {display: flex;position: absolute;left: 50%;bottom: 0;width:1180px;max-width: 100%;height: 44px;transform: translate(-50%, 0);background: rgba(0,0,0,0.7);text-align: center;}
.progress > li {position: relative;flex-grow: 1;cursor: pointer;}
.progress > li .bar {position: absolute;top: 0;left: 0;width: 0;height: 4px;background-color: #ffffff;}
.progress > li.active .bar {animation:countingBar 3.5s linear forwards;}
@keyframes countingBar {
	0% {width: 0;}
	100% {width:100%;}
}
.progress > li .tit {display: block;padding: 14px 0 10px;font-size: 14px;font-weight: 500;color: #fff;}
```

.progress > li (진행 표시줄 리스트)에 active 클래스를 추가하면 countingBar 애니메이션이 실행되어 진행 표시줄 길이가 100%로 늘어난다.

## JS

```js
$(window).on('load', function() {
  progress();
});

function progress(){
  const $slider = $(".slider");
  const $progress = $('.progress > li');
  
  //슬라이드가 실행되면 첫번째 $progress에 active 추가
  $slider.on('init', (event, slick) => {
    $progress.eq(0).addClass('active');
  });

  //슬라이드 실행
  $slider.slick({
    autoplay: true,
    autoplaySpeed:3000,
    speed: 500,
    arrows: false,
    fade: true,
    infinite: true,
  });
  
  //슬라이드가 바뀌면 $progress에 active 추가
  $slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    $progress.eq(nextSlide).addClass('active').siblings().removeClass('active');
  });

  //$progress를 클릭했을 때, 해당 슬라이드로 이동
  $progress.on('click', function (){
    if (!$(this).hasClass('active')) {
      const barIndex = $(this).index();
      $slider.slick('slickGoTo', barIndex);
    }
  });
};
```

첫 번째 $progress에 active 클래스를 미리 추가하면 슬라이드 실행 속도와 맞지 않아, 실행 후 active 클래스를 추가했다.  
beforeChange 이벤트로 슬라이드가 변경될 때 슬라이드 index 값을 nextSlide 매개변수로 전달받았다.  
그리고 $progress의 같은 index를 찾아 active 클래스를 추가하여 countingBar 애니메이션을 실행했다.   
$progress를 클릭했을 때 index 값을 찾고, slickGoTo 메서드로 해당 슬라이드로 이동한다.

<br><br>
[>> 예제 보기](https://ctrlcccv.github.io/slick-progress){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
