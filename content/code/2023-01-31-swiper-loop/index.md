---
title: jQuery - Swiper loop 옵션 복제 문제 해결 (반응형)
description: 반응형을 지원하는 Swiper.js 무한 반복 옵션 코드 예제입니다.
slug: 2023-01-31-swiper-loop
date: 2023-01-31 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-loop.webp

categories:
    - jQuery
tags:
    - Swiper.js
---

jQuery와 Swiper 라이브러리를 사용하여 반응형 슬라이드를 만들면서 겪은 loop 옵션의 복제 문제를 해결하는 방법입니다.  
Swiper 라이브러리를 사용하면 화면 크기에 따라 슬라이드의 수가 동적으로 변하도록 반응형 슬라이드를 손쉽게 구현할 수 있습니다.   
하지만 loop 옵션을 사용하면 슬라이드를 무한 반복하기 위해 내용을 복제하는데, 이에 따라 몇 가지 문제가 발생할 수 있습니다.  

## 문제 상황
화면 크기에 따라 슬라이드의 개수가 변경되는 Swiper 반응형 슬라이드를 개발하셨다고 가정해봅시다.   
PC 버전은 최대 5개, 모바일 버전은 최대 3개의 슬라이드를 보여줘야 합니다.  
Swiper의 breakpoints 옵션을 사용하여 화면 크기에 따라 슬라이드 개수와 간격을 조절할 수 있습니다.   
그러나 loop 옵션을 함께 사용하면 무한 반복 효과를 만들기 위해 슬라이드를 복제하게 됩니다.  
<br>
이러한 상황에서 PC 버전의 슬라이드 개수가 5개 이상이면 문제가 없지만, 4개 이하일 때에도 슬라이드가 복제되어 정상적으로 작동하지 않습니다.  
또한 슬라이드 개수에 따라 loop 옵션의 Boolean 값을 변경하더라도, 슬라이드 개수가 3개에서 5개 사이일 때 PC에서 모바일 크기로 변경하게 되면, 정상적으로 전환되지 않는 문제가 발생합니다.  

## 해결 방법
위의 문제를 해결하기 위해 다음과 같은 방법을 사용했습니다.

- 초기화와 리사이즈 이벤트 :  
슬라이드를 초기화하고 리사이즈 이벤트를 처리하는 함수를 만들었습니다. 이 함수는 Swiper 인스턴스를 제거하고 다시 만드는 역할을 수행합니다. 이렇게 함으로써 슬라이드의 개수에 따라 loop 옵션을 제어할 수 있습니다.

- 슬라이드 개수, loop 옵션 설정 :  
화면 크기에 따라 보여지는 슬라이드 개수를 설정하고, 해당 개수가 loop 옵션을 사용해야 할지 결정합니다. 슬라이드 개수가 보여지는 슬라이드 개수보다 작으면 loop 옵션을 사용하지 않는 것으로 결정됩니다.

- 슬라이드 인덱스 관리 :  
Swiper 인스턴스의 activeIndexChange 이벤트를 활용하여 현재 슬라이드의 인덱스를 관리합니다. 이를 통해 슬라이드가 변경될 때 현재 인덱스를 갱신하여 올바른 슬라이드를 보여줍니다.
<br><br>

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


### HTML 구조

먼저, Swiper를 구현하기 위한 기본적인 HTML 구조입니다.

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

### CSS 스타일

Swiper의 스타일은 아래와 같이 정의되어 있습니다.

```css
.slider {overflow: hidden;position: relative;max-width: 1210px;margin: 50px auto;padding: 0 60px;}
.slider .inner {overflow: hidden;margin: 0 auto;}
.slide_list > li {display: flex;justify-content: center;align-items: center; height: 150px;background: #8ab4f8;font-size: 20px;color: #000;text-align: center;}
.slider .btn {position: absolute;top: 50%;width: 35px;height: 35px;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {left: 0;transform:translate(0,-50%) rotateY(180deg);}
.slider .btn.btn_next {right: 0;transform: translate(0,-50%);}
```

### jQuery 코드

실제로 슬라이드를 초기화하고 관리하는 jQuery 코드입니다.

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
#### 문제 해결을 위한 단계별 접근

* 초기 문제 파악  
  * Swiper를 사용한 반응형 슬라이드에서 loop 옵션을 활성화하면, 슬라이드가 무한 반복을 위해 복제됩니다.  

* 초기화 문제 확인  
  * 스크롤 시 모바일 환경에서는 상·하단 바의 유동적인 움직임으로 인해 리사이즈 처리가 발생하여 슬라이드 초기화 문제가 발생합니다.
  * 모바일 환경에서도 슬라이드 초기화가 필요한 경우를 고려해야 합니다.  

* 디바이스 체크 및 리사이즈 처리
  * 화면 크기에 따라 디바이스 체크를 수행하여 PC 또는 모바일 환경 여부를 확인합니다.
  * window.innerWidth 값과 브레이크포인트 값(예: 1180)을 비교하여 디바이스 유형을 설정합니다.
  * 화면 크기가 변경될 때마다 디바이스 체크를 수행하여 변경 여부를 확인합니다.
  * 변경된 디바이스 유형에 따라 슬라이드 초기화 및 호출을 수행합니다.  

* 슬라이드 초기화 함수 구현
  * sliderAct() 함수를 정의하여 슬라이드 초기화 및 호출을 담당합니다.
  * 기존에 실행 중인 슬라이드가 있으면 destroy() 메서드를 사용하여 이벤트와 슬라이드 인스턴스를 삭제합니다.
  * swiper 변수를 undefined로 초기화하여 완전한 초기화를 수행합니다.
  * 화면 크기 및 디바이스 유형에 따라 slidesPerView 값 설정을 수행합니다.
  * 슬라이드 개수와 slidesPerView 값을 비교하여 loop 옵션 여부를 결정합니다.  

* 슬라이드 초기화 함수 활용
  * sliderAct() 함수를 호출하여 슬라이드 초기화를 수행합니다.
  * window.onload 이벤트에서 초기화 함수를 호출합니다.
  * 화면 크기 변경 시 리사이즈 이벤트에서 디바이스 체크 및 초기화 함수 호출을 수행합니다.  

* 슬라이드 이동 상태 유지
  * 슬라이드 이동 시 activeIndexChange 이벤트를 통해 현재 슬라이드의 실제 인덱스(realIndex)를 갱신합니다.
  * initialSlide 옵션을 사용하여 현재 슬라이드의 실제 인덱스로 설정하여 슬라이드 이동 상태를 유지합니다.
<br><br>


## 결론
Swiper의 loop 옵션 복제 문제를 해결하고, 반응형 슬라이드를 구현하는 방법을 소개해드렸습니다.   
화면 크기에 따라 슬라이드 수를 조정하고, 리사이즈 이벤트를 활용하여 슬라이드 함수를 초기화함으로써 문제를 효과적으로 해결할 수 있습니다.  

이 예제 코드를 활용하여 원하는 디자인에 맞는 Swiper 반응형 슬라이드를 만들어 보시기 바랍니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-01-31-swiper-loop/">예제결과 미리보기</a>
</div>