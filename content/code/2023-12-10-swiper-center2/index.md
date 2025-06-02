---
title: jQuery - Swiper 가운데 크게 정렬하기 (반응형)
description: >  
    반응형 웹사이트를 위한 jQuery와 Swiper 기반의 슬라이더 구현 방법을 탐구합니다. 사용자 화면 크기에 따라 조정되며, 중앙에 활성화된 슬라이드를 강조하는 슬라이더의 HTML, CSS, jQuery 코드 및 기능을 상세히 설명합니다.  
slug: 2023-12-10-swiper-center2
date: 2023-12-10 00:00:00+0000
lastmod: 2025-04-19 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-10-swiper-center2.webp

categories:
    - jQuery
tags:
    - Swiper.js
---
⚠️ 이 코드는 Swiper.js 5.2.0 버전을 기준으로 작성되었습니다. 최신 버전에서는 호환성 문제가 발생할 수 있습니다.  

<div class="btn_wrap">
    <a href="/code/2025-04-15-swiper-center3/">[관련글] Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결</a>
</div>


<br>

웹 사이트에서 슬라이더는 사용자 인터페이스의 핵심 요소로서, 이미지나 콘텐츠를 돋보이게 하는 역할을 합니다. 본 글에서 다루는 코드는 jQuery와 Swiper 라이브러리를 사용하여 구현된 반응형 슬라이더입니다. 이 슬라이더는 사용자의 화면 크기에 따라 동적으로 조정되며, 항상 활성화된 슬라이드를 중앙에 크게 표시하여 사용자의 시선을 끕니다.  



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
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/10/1000/600" alt="썸네일 이미지"></span></li>
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/20/1000/600" alt="썸네일 이미지"></span></li>
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/30/1000/600" alt="썸네일 이미지"></span></li>
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/40/1000/600" alt="썸네일 이미지"></span></li>
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/50/1000/600" alt="썸네일 이미지"></span></li>
            <li class="swiper-slide"><span class="img"><img src="https://picsum.photos/id/60/1000/600" alt="썸네일 이미지"></span></li>
        </ul>
    
    <span class="btn btn_prev"><img src="./images/arrow.png" alt="이젼"></span>
    <span class="btn btn_next"><img src="./images/arrow.png" alt="다음"></span>

```
* **슬라이더 컨테이너**  
slider 클래스는 전체 슬라이더를 포함하는 외부 컨테이너입니다.

* **이너 래퍼**   
inner 클래스는 슬라이드들을 감싸는 내부 래퍼입니다.

* **슬라이드 목록**   
slide_list 클래스는 개별 슬라이드 swiper-slide 클래스 요소를 포함합니다. 각 슬라이드는 이미지와 함께 구성됩니다.

* **이동 버튼**  
btn 클래스는 슬라이더를 이전과 다음으로 이동시키는 버튼입니다.   
<br>

## CSS 스타일
```css
/* 슬라이더 기본 스타일 */
.slider { position: relative; margin: 150px auto 0; } 
.slider .inner { overflow: hidden; width: 100%; margin: 0 auto; } 

/* 슬라이더 내 각 슬라이드 아이템 스타일 */
.slide_list > li { position: relative; width: 31%; transform: scale(0.7); transition: all 0.3s; opacity: 0.5; } 
.slide_list > li a { display: block; } 
.slide_list > li .img { overflow: hidden; display: block; position: relative; padding-bottom: 60%; border-radius: 10px; } 
.slide_list > li .img img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; } 

/* 현재 활성화된 슬라이드 스타일 */
.slide_list > li.swiper-slide-active,
.slide_list > li.swiper-slide-duplicate-active { transform: scale(1); opacity: 1; } 

/* 이전 및 다음 슬라이드의 여백 조정 */
.slide_list > li.swiper-slide-prev { margin-right: 2%; margin-left: -2%; } 
.slide_list > li.swiper-slide-next { margin-right: -2%; margin-left: 2%; } 

/* 화면상 첫 번째 및 마지막 슬라이드의 여백 조정 */
.slide_list > li.first { margin-right: -4%; margin-left: 4%; } 
.slide_list > li.last { margin-right: 4%; margin-left:-4%; } 

/* 슬라이더 이동 버튼 스타일 */
.slider .btn { position: absolute; top: 50%; width:3%; font-size: 0; z-index: 10; transform: translate(0,-50%); cursor: pointer; } 
.slider .btn img { width: 100%; } 
.slider .btn.btn_prev { right: 50%; margin-right: 17%; } 
.slider .btn.btn_next { left: 50%; margin-left: 17%; } 
.slider .btn.btn_prev img { transform: rotateY(180deg); } 

/* 모바일 화면에서 슬라이더 스타일 조정 */
@media (max-width: 767px){
    .slider { margin-top: 50px; } 
    .slide_list > li .img { border-radius: 5px; } 
    .slide_list > li { width: 50%; } 
    .slider .btn { display: none; } 
}
```
* **슬라이더 위치 및 마진**  
.slider는 슬라이더의 위치와 상단 마진을 정의합니다.

* **슬라이드 스타일링**  
.slide_list > li는 각 슬라이드의 위치, 크기, 투명도 등을 설정합니다.

* **활성화된 슬라이드 스타일**  
.slide_list > li.swiper-slide-active는 활성화된 슬라이드에 적용되는 스타일을 정의합니다.

* **이동 버튼 스타일링**  
.slider .btn은 이동 버튼의 위치와 스타일을 정의합니다.

* **반응형 스타일**  
미디어 쿼리를 통해 모바일 화면에서의 슬라이더 스타일을 조정합니다.  




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
// 슬라이더 요소 선택 및 변수 초기화
const $slider = $('.slider');
let swiper = undefined;
let slideNum = $slider.find('.swiper-slide').length; // 슬라이드 총 개수
let slideInx = 0; // 현재 슬라이드 인덱스

// 디바이스 크기에 따라 화면 유형 설정 ('pc' 또는 'mo')
let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
sliderAct(); // 슬라이더 활성화

let resizeTimer;
// 창 크기 변경 시 디바이스 크기 체크 및 슬라이더 재설정
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    }, 300);
});

// 슬라이더 실행 및 설정 함수
function sliderAct() {
    // 슬라이더 초기화 (이미 존재하는 경우)
    if (swiper != undefined) {
        swiper.destroy();
        swiper = undefined;
    }

    // 슬라이드 보기 옵션 설정 (디바이스에 따라 변경)
    let viewNum = oldWChk == 'pc' ? 2 : 1;

    // 슬라이드 수에 따라 무한반복 옵션 설정
    let loopChk = slideNum > viewNum;

    // 슬라이더 구성 및 옵션 설정
    swiper = new Swiper($slider.find('.inner')[0], {
        slidesPerView: "auto",
        initialSlide: slideInx,
        loop: loopChk,
        centeredSlides: true,
        navigation: {
            prevEl: $slider.find('.btn_prev')[0],
            nextEl: $slider.find('.btn_next')[0],
        },
        on: {
            slideChangeTransitionStart: function() {
                slideInx = this.realIndex; // 현재 슬라이드 인덱스 갱신
                updateClass();
            },
            init: function() {
                updateClass();
            },
        },
    });

    // 슬라이더 클래스 업데이트 함수
    function updateClass() {
        // 화면상 첫 번째 및 마지막 슬라이드에 클래스 추가 및 제거
        $slider.find('.swiper-slide-prev').prev().addClass('first').siblings().removeClass('first');
        $slider.find('.swiper-slide-next').next().addClass('last').siblings().removeClass('last');
    }
}
```
* **변수 초기화 및 슬라이더 선택**  
  * $slider  
  슬라이더의 DOM 요소를 선택합니다.

  * swiper  
  슬라이더 인스턴스 변수, 초기에는 undefined입니다.

  * slideNum  
  슬라이더 내 슬라이드의 총 개수를 동적으로 계산합니다.

  * slideInx  
  현재 활성화된 슬라이드의 인덱스, 초깃값은 0입니다.

* **화면 크기에 따른 설정**  
  * oldWChk  
  화면 너비에 따라 'pc' 또는 'mo'로 설정합니다.

  * sliderAct()  
  슬라이더를 초기화하고 설정을 적용합니다.

* **창 크기 변경 감지 및 슬라이더 재설정**  
  * resizeTimer  
  창 크기 변경 시, 이벤트 발생을 조절하는 타이머입니다.

  * $(window).on('resize', ...)  
  화면 크기 변경 시 sliderAct()를 호출하여 슬라이더를 재설정합니다.

* **슬라이더 실행 및 설정 (sliderAct 함수)**  
  * 슬라이더 재설정  
  존재하는 슬라이더를 파괴하고 새로운 설정으로 초기화합니다.

  * viewNum  
  한 번에 보여줄 슬라이드의 수를 화면 크기에 따라 설정합니다.

  * loopChk  
  슬라이드 수에 따라 무한반복 옵션을 설정합니다.

  * Swiper 설정  
  슬라이더 옵션 설정 및 인스턴스 생성.

  * 이벤트 핸들러  
  슬라이드 변경 시 현재 슬라이드 인덱스를 업데이트합니다.

* **슬라이더 클래스 업데이트 (updateClass 함수)**  
화면상 첫 번째 및 마지막 슬라이드에 클래스를 동적으로 추가하거나 제거하여 슬라이더의 외관을 조정합니다.  
<br>

## 결론
이 글에서는 jQuery와 Swiper 라이브러리를 활용하여 구현된 반응형 슬라이더를 자세히 살펴보았습니다. 이 슬라이더는 사용자의 화면 크기에 맞춰 동적으로 조정되며, 활성화된 슬라이드를 중앙에 크게 표시하는 기능을 제공합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-10-swiper-center2/">예제결과 미리보기</a>
    <a href="/code/2025-04-15-swiper-center3/">[관련글] Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결</a>
</div>
