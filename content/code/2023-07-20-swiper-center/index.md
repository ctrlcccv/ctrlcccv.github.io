---
title: jQuery - Swiper Center 옵션 커스텀
description: >  
    Swiper.js의 centeredSlides 옵션을 활용한 슬라이드 두가지 코드 예제입니다.
slug: 2023-07-20-swiper-center
date: 2023-07-20 00:00:00+0000
lastmod: 2025-04-19 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-center.webp

categories:
    - jQuery
tags:
    - Swiper.js
---
⚠️ 이 코드는 Swiper.js 3.3.1 버전을 기준으로 작성되었습니다. 최신 버전에서는 호환성 문제가 발생할 수 있습니다. 

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/code/2023-01-31-swiper-loop/">[참고코드] jQuery - Swiper loop 옵션 복제 문제 해결 (반응형)</a>
    <a href="/code/2025-04-15-swiper-center3/">[관련글] Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결</a>
</div>

<br>

Swiper 슬라이드의 centeredSlides 옵션을 사용하여 두 가지 유형의 슬라이드를 만들었다.  
[첫 번째 유형](#첫번째-유형)은 centeredSlides 옵션을 사용하여 슬라이드를 가운데로 정렬시켜 사용자에게 집중되는 효과를 가진 슬라이드를 만들었다.  
[두 번째 유형](#두번째-유형)은 CSS의 transform: scale() 속성을 활용하여 슬라이드 요소의 크기에 변화를 주어 3D carousel 형태의 슬라이드를 만들었다.  


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

## 첫번째 유형

### HTML 구조
```html
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
            <li class="swiper-slide">slider5</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>
```

### CSS 스타일
```css
/* 슬라이드 */
.slider {max-width: 1180px;margin: 50px auto 0;font-size: 0;text-align: center;}
.slider .inner {overflow: hidden;width: 100%;margin: 0 auto;}
.slide_list > li {position: relative;width: calc(25% - 20px);height: 150px;margin:0 10px;background: #8ab4f8;font-size: 20px;line-height: 150px;color: #000;text-align: center;}

/* 영역별 밝기 설정 */
.slide_list > li:after {content:'';position: absolute;top: 0;left: 0;width: 100%;height: 100%;background:rgba(0,0,0,0.5);transition: all 0.3s;opacity: 1;}
.slide_list > li.swiper-slide-active:after,
.slide_list > li.swiper-slide-next:after,
.slide_list > li.swiper-slide-prev:after,
.slide_list > li.swiper-slide-duplicate-active:after,
.slide_list > li.swiper-slide-duplicate-next:after,
.slide_list > li.swiper-slide-duplicate-prev:after {opacity: 0;}

/* 화살표 */
.slider .btn {display: inline-block;width: 35px;height: 35px;margin:30px 15px 0;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {transform: rotateY(180deg);}

@media (max-width: 767px) {
    .slide_list > li { width: calc(50% - 20px);}
    .slide_list > li.swiper-slide-next:after,
    .slide_list > li.swiper-slide-prev:after,
    .slide_list > li.swiper-slide-duplicate-next:after,
    .slide_list > li.swiper-slide-duplicate-prev:after {opacity: 1;}
}
```
슬라이드의 가장자리에 있는 부분이 절반만 노출되게 하도록 Swiper의 slidesPerView와 spaceBetween 옵션을 사용했으나, spaceBetween 옵션으로 지정된 간격까지 영역에 포함되어 정확히 절반이 노출되지 않는 문제가 발생했다. 이 문제를 해결하기 위해 slidesPerView 옵션을 'auto'로 설정하고, 크기와 간격을 CSS로 직접 지정했다.  
<br>
그리고 가장자리에 있는 슬라이드는 가운데 슬라이드에 집중되도록 배경을 어둡게 처리했다.
swiper-slide-duplicate 클래스까지 스타일을 적용한 이유는 마지막 슬라이드에서 첫 번째 슬라이드로 무한 반복되는 과정에서 스타일을 유지하지 못하는 문제가 있었다. 따라서 복제된 슬라이드에도 같은 스타일을 적용했다.  

### jQuery 코드

```js
$(window).on('load', function() {
    slider();
})

function slider() {
    let swiper = undefined;
    let slideNum = $('.slider .swiper-slide').length //슬라이드 총 개수
    let slideInx = 0; //현재 슬라이드 index

    //디바이스 체크
    let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
    sliderAct();
    $(window).on('resize', function() {
        let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    })

    //슬라이드 실행
    function sliderAct() {
        //슬라이드 초기화 
        if (swiper != undefined) {
            swiper.destroy();
            swiper = undefined;
        }

        //slidesPerView 옵션 설정
        let viewNum = oldWChk == 'pc' ? 4 : 2;
        //loop 옵션 체크
        let loopChk = slideNum > viewNum;

        swiper = new Swiper(".slider .inner", {
            slidesPerView: "auto",
            initialSlide: slideInx,
            loop: loopChk,
            centeredSlides: true,
            navigation: {
                nextEl: '.slider .btn_next',
                prevEl: '.slider .btn_prev',
            },
            on: {
                activeIndexChange: function() {
                    slideInx = this.realIndex; //현재 슬라이드 index 갱신
                }
            },
        });
    }
}
```
<br>
<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-20-swiper-center/type1/">예제결과 미리보기 (첫번째 유형)</a>
</div>

<br>

## 두번째 유형

### HTML 구조
```html
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
            <li class="swiper-slide">slider5</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>
```

### CSS 스타일
```css
/* 슬라이드 CSS */
.slider {max-width: 1180px;margin: 50px auto 0;padding: 0 15px;font-size: 0;text-align: center;}
.slider .inner {overflow: hidden;width: 100%;margin: 0 auto;padding: 75px 0;}
.slide_list > li {position: relative;width: 20%; height: 150px;margin: 0;background: #8ab4f8;font-size: 20px;line-height: 150px;color: #000;text-align: center;z-index: 0;transform: scale(1); transition: all 0.3s;}

/* 영역별 크기 설정 */
.slide_list > li.swiper-slide-next,
.slide_list > li.swiper-slide-prev,
.slide_list > li.swiper-slide-duplicate-next,
.slide_list > li.swiper-slide-duplicate-prev {z-index: 50;transform: scale(1.5);}
.slide_list > li.swiper-slide-active,
.slide_list > li.swiper-slide-duplicate-active {z-index: 100;transform: scale(2);}

/* 영역별 밝기 설정 */
.slide_list > li:after {content:'';position: absolute;top: 0;left: 0;width: 100%;height: 100%;background:rgba(0,0,0,0.5);transition: all 0.3s;opacity: 1;}
.slide_list > li.swiper-slide-next:after,
.slide_list > li.swiper-slide-prev:after,
.slide_list > li.swiper-slide-duplicate-next:after,
.slide_list > li.swiper-slide-duplicate-prev:after {background:rgba(0,0,0,0.3);} 
.slide_list > li.swiper-slide-active:after,
.slide_list > li.swiper-slide-duplicate-active:after{opacity: 0;}

/* 화살표 */
.slider .btn {display: inline-block;width: 35px;height: 35px;margin:30px 15px 0;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {transform: rotateY(180deg);}

@media (max-width: 768px) {
    .slider .inner {padding: 38px 0;}
    .slide_list > li { width: 33.333%;}
    .slide_list > li.swiper-slide-next,
    .slide_list > li.swiper-slide-prev,
    .slide_list > li.swiper-slide-duplicate-next,
    .slide_list > li.swiper-slide-duplicate-prev {transform: scale(1);}
    .slide_list > li.swiper-slide-active,
    .slide_list > li.swiper-slide-duplicate-active {transform: scale(1.5);}
}
```
영역별로 크기를 지정하기 위해 transform: scale() 속성을 사용했다. 그리고 슬라이드가 넘어갈 때 크기가 부드럽게 변화하도록 transition 속성을 선언했다.


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

### jQuery 코드
```js
$(window).on('load', function() {
    slider();
})

function slider() {
    let swiper = undefined;
    let slideNum = $('.slider .swiper-slide').length //슬라이드 총 개수
    let slideInx = 0; //현재 슬라이드 index

    //디바이스 체크
    let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
    sliderAct();

    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
            if (newWChk != oldWChk) {
                oldWChk = newWChk;
                sliderAct();
            }
        }, 300);
    })

    //슬라이드 실행
    function sliderAct() {
        //슬라이드 초기화 
        if (swiper != undefined) {
            swiper.destroy();
            swiper = undefined;
        }

        //slidesPerView 옵션 설정
        let viewNum = oldWChk == 'pc' ? 4 : 2;
        //loop 옵션 체크
        let loopChk = slideNum > viewNum;

        swiper = new Swiper(".slider .inner", {
            slidesPerView: "auto",
            initialSlide: slideInx,
            loop: loopChk,
            centeredSlides: true,
            navigation: {
                nextEl: '.slider .btn_next',
                prevEl: '.slider .btn_prev',
            },
            on: {
                activeIndexChange: function() {
                    slideInx = this.realIndex; //현재 슬라이드 index 갱신
                }
            },
        });
    }
}
```
디바이스 화면 리사이즈로 슬라이드를 초기화하고 다시 불러오는 과정에서 CSS transition 속성으로 인해 슬라이드의 크기가 0.3초 동안 변화한다. 그러나 변화하는 시간 동안 sliderAct() 함수가 실행되어 슬라이드의 크기를 정확하게 파악하지 못해 정렬 오류가 발생했다. 이 문제를 해결하기 위해 디바이스 변경 시, setTimeout() 함수를 사용하여 sliderAct() 함수의 호출을 0.3초 동안 지연시켰다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-20-swiper-center/type2/">예제결과 미리보기 (두번째 유형)</a>
    <a href="/code/2025-04-15-swiper-center3/">[관련글] Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결</a>
</div>
