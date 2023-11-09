---
title: jQuery - slick slider progress bar
description: 각 이미지의 제목과 진행 표시줄을 나타내는 slick slider 코드 예제입니다.
slug: 2023-01-30-slick-progress
date: 2023-01-30 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/slick-progress.webp

categories:
    - jQuery
tags:
    - slick.js
    - 진행 표시줄
---

Slick.js 플러그인을 활용하여 이미지 슬라이드와 함께 제목을 포함한 진행 표시줄을 구현하는 방법입니다.  

## HTML 코드

이미지 슬라이드와 진행 표시줄을 담기 위한 HTML 구조입니다.

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

## CSS 코드

이미지 슬라이드와 진행 표시줄의 스타일링을 위한 CSS 코드입니다.  

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
.progress > li 선택자에 active 클래스를 추가하면, countingBar 애니메이션이 실행되어 진행 표시줄의 길이가 100%로 확장됩니다. 이렇게 하면 해당 슬라이드의 진행 상태를 시각적으로 표현할 수 있습니다.  

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


## jQuery 코드

Slick 슬라이드와 진행 표시줄을 조작하는 jQuery 스크립트를 추가합니다.  

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
### 코드 구성요소 및 기능 설명

* 슬라이드 및 진행 표시줄 선택
  * const $slider = $(".slider") : HTML에서 클래스가 slider인 요소를 선택합니다. 이 요소는 이미지 슬라이드 컨테이너입니다.
  * const $progress = $('.progress > li') : 진행 표시줄의 각 항목을 선택합니다

* 슬라이드 초기화 및 설정 :  
  $slider.slick({ ... })를 통해 Slick 슬라이드를 초기화하며, 다양한 옵션을 설정할 수 있습니다. 자동 슬라이딩, 애니메이션 속도, 화살표 숨김 등을 설정할 수 있습니다.

* 슬라이드 변경 시 진행 표시줄 업데이트 :   
  슬라이드가 변경되기 전에(beforeChange 이벤트) 진행 표시줄에서 해당 슬라이드에 active 클래스를 추가하고 이전 활성 슬라이드의 active 클래스를 제거합니다. 이로써 진행 표시줄이 활성 슬라이드를 반영합니다.
  
* 진행 표시줄 클릭 이벤트 :   
  진행 표시줄 항목을 클릭했을 때의 동작을 정의합니다. 클릭한 항목이 활성화되지 않았을 경우, 해당 인덱스를 찾고 Slick 슬라이드의 slickGoTo 메서드를 사용하여 해당 슬라이드로 이동합니다.

<br>

## 결론

이 코드를 통해 사용자는 이미지 슬라이드와 진행 표시줄 간의 시각적 상호작용을 경험할 수 있습니다. 이미지 슬라이드의 자동 탐색과 함께 진행 표시줄을 클릭하여 원하는 이미지로 바로 이동할 수 있는 편리한 기능을 제공합니다. 코드를 이용하여 다양한 페이지에 이미지 슬라이드와 진행 표시줄을 구현해보세요!  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-01-30-slick-progress/" target="_blank">예제결과 미리보기</a>
</div>