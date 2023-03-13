---
layout: post
title: jQuery - Swiper loop 옵션 복제 문제 해결 (반응형)
image: 
  path: /assets/img/blog/swiper-loop.webp
description: >
  반응형을 지원하는 Swiper.js 무한 반복 옵션 코드 예제 
keywords: > 
  Swiper, loop
sitemap: true
comments: false
---
화면 크기에 따라 슬라이드의 수가 변경되는 Swiper 반응형 슬라이드를 만들었다.  
기본적으로 Swiper의 breakpoints 옵션을 사용하면 화면 크기에 따라 슬라이드의 수나, 간격을 지정해 줄 수 있다.  

그러나 loop 옵션을 사용하게 되면 무한 반복을 나타내기 위해 슬라이드를 복제하게 된다.  
PC 버전에서 볼 때 슬라이드 수가 5개 이상이면 문제가 없지만, 4개 이하일 때도 복제되어 제대로 작동하지 않았다.  
슬라이드 수에 따라 loop의 Boolean 값을 선언해도, 슬라이드가 3개~5개면 PC에서 모바일 크기로 변경되었을 때 loop 옵션이 전환되지 않았다.
그래서 화면 크기가 변경될 때마다, 슬라이드 함수를 초기화하고 다시 호출했다.

## HTML

```html
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>
```

## CSS

```css
.slider {overflow: hidden;position: relative;max-width: 1210px;margin: 50px auto;padding: 0 60px;}
.slider .inner {overflow: hidden;margin: 0 auto;}
.slide_list > li {display: flex;justify-content: center;align-items: center; height: 150px;background: #8ab4f8;font-size: 20px;color: #000;text-align: center;}
.slider .btn {position: absolute;top: 50%;width: 35px;height: 35px;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {left: 0;transform:translate(0,-50%) rotateY(180deg);}
.slider .btn.btn_next {right: 0;transform: translate(0,-50%);}
```

HTML과 CSS는 기존 Swiper 코드와 동일하다.

## JS

```js
$(window).on('load', function () {
    slider();  
})

function slider() {
    let swiper = undefined;
    let slideNum = $('.slider .swiper-slide').length //슬라이드 총 개수
    let slideInx = 0; //현재 슬라이드 index

    //디바이스 체크
    let oldWChk = window.innerWidth > 1180 ? 'pc' : 'mo';
    sliderAct();
    $(window).on('resize', function () {
        let newWChk = window.innerWidth > 1180 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    })
    
    //슬라이드 실행
    function sliderAct(){
        //슬라이드 초기화 
        if (swiper != undefined){ 
            swiper.destroy();
            swiper = undefined;
        }

        //slidesPerView 옵션 설정
        let viewNum = oldWChk == 'pc' ? 5 : 2.3;
        //loop 옵션 체크
        let loopChk = slideNum > viewNum;
        
        swiper = new Swiper(".slider .inner", {
            slidesPerView: viewNum,
            initialSlide :slideInx,
            spaceBetween: 10,
            loop: loopChk,
            autoplay: {
                delay: 2000,
            },
            navigation: {
                nextEl: $('.slider .btn_next'),
                prevEl: $('.slider .btn_prev'),
            },
            on: {
                activeIndexChange: function () {
                    slideInx = this.realIndex; //현재 슬라이드 index 갱신
                }
            },
        });
    }
}

```
처음에는 리사이즈할 때마다 SliderAct 함수를 호출했는데, 모바일 환경에서는 스크롤 할 때 상 · 하단 바가 유동적으로 움직여 리사이즈 처리가 되어 슬라이드가 초기화되었다.  
그리고 과도하게 초기화되는 것을 막기 위해 리사이즈할 때 화면 크기에 따라 디바이스 체크를 하고, 변경되면 SliderAct 함수를 호출했다.  

SliderAct 함수를 호출했을 때 슬라이드가 실행되고 있으면 destroy 메서드로 모든 이벤트와 슬라이드 인스턴스를 삭제하고, swiper 함수의 타입을 object에서 undefined로 변경하여 완전히 초기화했다.  
초기화될 때 슬라이드 index가 0으로 돌아가서, 슬라이드가 동작할 때마다 realIndex 속성으로 현재 index를 구하고, swiper의 initialSlide 옵션을 사용하여 index를 다시 선언했다.

<br>
[>> 예제 보기](https://ctrlcccv.github.io/swiper-loop){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
