---
title: jQuery - Swiper pagination 텍스트로 커스텀 + progress bar
description: >  
    Swiper.js를 활용하여 페이지 제목과 progress bar를 추가한 슬라이드 코드 예제입니다.
slug: 2023-07-24-swiper-progress
date: 2023-07-24 01:00:00+0000
lastmod: 2023-07-24 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-progress.webp

categories:
    - jQuery
tags:
    - Swiper.js
    - 진행 표시줄
---
Swiper.js 플러그인의 pagination 옵션을 텍스트로 변경하고, 각 페이지의 progress bar 형태를 추가했다.  

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
<div class="slider">
    <!-- 슬라이드 -->
    <ul class="list swiper-wrapper">
        <li class="swiper-slide">1번째 슬라이드</li>
        <li class="swiper-slide">2번째 슬라이드</li>
        <li class="swiper-slide">3번째 슬라이드</li>
        <li class="swiper-slide">4번째 슬라이드</li>
        <li class="swiper-slide">5번째 슬라이드</li>
    </ul>
    
    <!-- 슬라이드 타이틀 (pagination) -->
    <ul class="slide_tit">
        <li>1번째 슬라이드</li>
        <li>2번째 슬라이드</li>
        <li>3번째 슬라이드</li>
        <li>4번째 슬라이드</li>
        <li>5번째 슬라이드</li>
    </ul>

    <!-- 버튼, 페이지 번호 -->
    <div class="control">
        <span class="btn btn_prev">&lt;</span>
        <span class="num"></span>
        <span class="btn btn_next">&gt;</span>
    </div>
</div>
```
pagination 부분에 들어갈 텍스트는 slide_tit 클래스에 별도로 작성했다.  
<br>

## CSS 스타일
```css
/* 슬라이드 */
.slider {position: relative;}
.slider .list > li {display: flex;justify-content: center;align-items: center;width: 100%;height: 400px;background: #a6e6ff;font-size: 24px;font-weight: 500;}

/* 슬라이드 타이틀 */
.slider .slide_tit {display: flex;position: absolute;bottom: 0;left: 50%;max-width: 1180px;z-index: 100;transform: translate(-50%,0);}
.slider .slide_tit > li {display: flex;flex:1 1 0;justify-content: center;align-items: center;position: relative;width: auto;height: 40px;margin: 0!important;margin: 0;padding: 0 10px;background: rgba(0,0,0,0.3);border-radius:0;font-size: 16px;letter-spacing:-0.025em;color: rgb(255, 255, 255);opacity: 1;}
.slider .slide_tit > li.swiper-pagination-bullet-active {background: #fff;color: #000000;}
.slider .slide_tit > li .bar {position: absolute;top: 0;left: 0;width:0;height: 2px;background: #000000;}
.slider .slide_tit > li.swiper-pagination-bullet-active .bar {animation-name: countingBar;animation-duration: 3s;animation-timing-function: linear;animation-fill-mode:forwards;}

@keyframes countingBar {
    0% {width: 0;}
    100% {width:100%;}
}

/* 슬라이드 버튼, 페이지 번호 */
.slider .control {display: flex;justify-content: center;align-items: center; position: absolute;bottom: 100px;left:50%; width: 120px; height: 30px;margin-left: 470px; background-color: rgb(0, 0, 0, 0.3);border-radius:15px;z-index: 100;}
.slider .control .btn {display: flex;align-items: center;font-size: 16px;font-weight: 400;letter-spacing:-0.025em;color: #fff;cursor: pointer;}
.slider .control .num {margin: 0 7px;font-size: 16px;font-weight: 300;letter-spacing:-0.025em;color: #fff;}
```
pagination 버튼이 active 되었을 때 progress bar 의 width값이 100%로 올라가는 애니메이션을 추가했다.  

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

## jQuery 코드
```js
$(document).ready(function() {
    slider();
})

function slider() {
    var titArray = []; //슬라이드 타이틀
    $('.slider .slide_tit > li').each(function(index, item) {
        var txt = $(this).text();
        titArray.push(txt);
    }).promise().done(function() {
        //슬라이드 전체 페이지 번호
        var num = $(".slider .num");
        var slides = $(".slider .swiper-slide");
        var slideCount = slides.length;
        num.html(`<strong>1</strong> / ${slideCount}`);

        //슬라이드 시작
        var swiper = new Swiper('.slider', {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 3000, //CSS animation과 시간 동일하게
                disableOnInteraction: false
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.slider .btn_next',
                prevEl: '.slider .btn_prev',
            },
            //pagination 텍스트 & progress bar 형태로 변경
            pagination: {
                el: '.slider .slide_tit',
                clickable: 'true',
                type: 'bullets',
                renderBullet: (index, className) => {
                    return `<li class=${className}><span class="bar"></span><span class="txt">${titArray[index]}</span></li>`;
                },
            },
            //현재 페이지 번호 갱신
            on: {
                slideChange: () => {
                    num.html(`<strong>${swiper.realIndex + 1}</strong> / ${slideCount}`);
                }
            }
        })
    });
}
```

슬라이드의 제목을 배열에 저장하고, 전체 슬라이드 수를 페이지 번호로 표시하는 기능이다.  
코드는 다음과 같은 구성 요소로 이루어져 있다.  

* slider() : 슬라이더를 생성하고 제어하는 함수  
* titArray : 슬라이드의 제목을 저장할 배열  
* $('.slider .slide_tit > li').each(function(index, item){ ... }) : .slider .slide_tit 클래스를 가진 엘리먼트의 각 자식 li에서 제목을 추출하여 titArray에 추가한다.  
* .promise().done(function() { ... }) : 제목을 모두 가져온 후에 실행될 로직을 지정한다.  
* 슬라이드 전체 페이지 번호와 라이브러리 옵션을 설정한다.
* on: {slideChange: () => { ... }} : 슬라이드 변경 시 페이지 번호를 갱신하는 이벤트 핸들러를 등록한다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-24-swiper-progress/">예제결과 미리보기</a>
</div>

