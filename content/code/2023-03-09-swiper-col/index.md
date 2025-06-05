---
title: >
    jQuery - Swiper로 구현하는 Grid Loop Slider

description: >  
    jQuery와 Swiper를 활용하여 반응형 그리드 슬라이더를 구현하는 방법을 소개합니다. 다양한 디바이스에서 최적화된 콘텐츠 전시를 위한 슬라이더를 직접 만들어보세요.

slug: 2023-03-09-swiper-col
date: 2023-03-09 00:00:00+0000
lastmod: 2025-05-09 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-col.webp

alternates:
  - title: "jQuery - Swiper로 구현하는 Grid Loop Slider"
    href: "https://ctrlcccv.github.io/code/2023-03-09-swiper-col/"
    hreflang: "ko"
  - title: "How to Create a Swiper Grid Loop in jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-05-13-swiper-col/"
    hreflang: "en"
  - title: "Grid Loop Slider Example"
    href: "https://ctrlcccv.github.io/code/2023-03-09-swiper-col/"
    hreflang: "x-default"

    
categories:
    - jQuery
tags:
    - Swiper.js
---
여러 개의 콘텐츠를 슬라이드 형태로 보여주고 싶은데, 화면 크기에 따라 자동으로 조절되면서 무한으로 반복되는 방법이 궁금하지 않으신가요?

웹사이트를 만들 때 여러 개의 콘텐츠를 한 번에 보여주고 싶을 때가 있습니다. 예를 들어, 쇼핑몰에서는 상품 목록을, 포트폴리오에서는 작품들을 효과적으로 전시할 수 있습니다. 이번 포스트에서는 jQuery와 Swiper 라이브러리를 활용하여 반응형 그리드 슬라이더를 구현하는 방법을 알아보겠습니다.



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
    <div class="viewport">
        <div class="swiper-wrapper">
            <div class="item">1
            <div class="item">2
            <div class="item">3
            <div class="item">4
            <div class="item">5
            <div class="item">6
            <div class="item">7
            <div class="item">8
            <div class="item">9
            <div class="item">10
            <div class="item">11
            <div class="item">12
        
    
    <div class="swiper-prev">이전
    <div class="swiper-next">다음
    <div class="swiper-pagination">

```

* **슬라이더의 기본 구조**  
<span class="txt">
전체 슬라이더를 감싸는 `.slider` 클래스와 실제 슬라이더가 보여지는 `.viewport`가 있습니다.  
`viewport` 내부에는 Swiper 라이브러리가 인식하는 `.swiper-wrapper` 클래스가 배치됩니다.
</span>

* **슬라이드 아이템**  
<span class="txt">
`.item` 클래스로 각 슬라이드 아이템을 구성합니다. 여기서는 1부터 12까지 총 12개의 아이템이 준비되어 있습니다.
</span>

* **네비게이션과 페이지네이션**  
<span class="txt">
`.swiper-prev`와 `.swiper-next`는 슬라이더 이동 버튼이며, `.swiper-pagination`은 현재 슬라이드 위치를 표시합니다. 이 요소들은 Swiper 라이브러리에서 자동으로 연결됩니다.
</span>

<br>

## CSS 스타일

```css
.slider { position: relative; max-width: 1180px; margin: 20px auto 0; padding: 0 50px; } 
.slider .viewport { overflow: hidden; } 
.slider .swiper-slide { display: grid; gap:10px; grid-template-columns: repeat(3, 2fr); } 
.slider .item { width: 100%; height: 150px; background: #8ab4f8; font-size: 20px; line-height: 150px; text-align: center; } 
.slider .swiper-prev, .slider .swiper-next { position: absolute; top: 50%; width: 35px; height: 35px; background:url('images/arrow.png') center center no-repeat; background-size: cover; font-size: 0; text-indent: -999em; cursor: pointer; } 
.slider .swiper-prev { left: 0; transform: rotateY(180deg) translate(0,-50%); } 
.slider .swiper-next { right:0; transform: translate(0,-50%); } 
.slider .swiper-pagination { display: flex; justify-content: center; position: relative; width: 100%; margin-top: 20px; } 
.slider .swiper-pagination-bullet { width: 10px; height: 10px; margin: 0 5px; background: #ccc; opacity: 1; } 
.slider .swiper-pagination-bullet-active { background: #8ab4f8; } 

@media (max-width: 767px){
    .slider .swiper-slide { grid-template-columns: repeat(3, 1fr); } 
}
```

* **슬라이더 레이아웃**  
<span class="txt">
`.slider`에는 최대 너비와 여백을 설정하여 화면 중앙에 배치됩니다. 좌우 패딩은 네비게이션 버튼을 위한 공간을 확보합니다.
</span>

* **그리드 레이아웃**  
<span class="txt">
`.swiper-slide`는 CSS 그리드를 사용하여 한 슬라이드 내 6개의 아이템을 3x2 형태로 배치합니다. `gap` 속성으로 아이템 간 간격을 설정합니다.
</span>

* **아이템 스타일링**  
<span class="txt">
각 `.item`은 고정 높이와 배경색을 가지며, 텍스트는 중앙 정렬됩니다.
</span>

* **네비게이션 버튼**  
<span class="txt">
이전/다음 버튼은 슬라이더 좌우에 절대 위치로 배치됩니다. 이전 버튼은 화살표 이미지를 `rotateY`로 회전시켜 반대 방향을 가리키도록 합니다.
</span>

* **페이지네이션**  
<span class="txt">
페이지네이션은 `flex`로 중앙 정렬되며, 각 `bullet`의 스타일과 `active` 상태 스타일을 정의합니다.
</span>

* **반응형 처리**  
<span class="txt">
모바일 화면(767px 이하)에서는 그리드 컬럼 너비를 조정하여 더 좁은 화면에서도 3개의 아이템이 잘 보이도록 만듭니다.
</span>

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
function slideAct() {
    // 슬라이더 요소 선택
    const $sliders = $(".slider");
    
    // 반응형 설정값
    const config = {
        breakpoints: [
            { name: 'desktop', width: 768, itemsPerView: 6 },  // PC: 한 화면에 6개
            { name: 'mobile', width: 0, itemsPerView: 3 }      // 모바일: 한 화면에 3개
        ]
    };
    
    // 슬라이더 상태 관리
    const state = {
        swipers: [],         // 스와이퍼 인스턴스
        originalItems: [],   // 원본 아이템
        slideIndexes: [],    // 슬라이드 위치
        deviceMode: ''       // 현재 디바이스 모드
    };
    
    // 슬라이더 초기화
    function initSliders() {
        $sliders.each(function(index) {
            state.slideIndexes[index] = 0;
            // 원본 아이템 저장
            if (!state.originalItems[index]) {
                state.originalItems[index] = $(this).find('.item').clone();
            }
        });
    }
    
    // 현재 디바이스 모드 반환
    function getDeviceMode(windowWidth) {
        const breakpoint = config.breakpoints.find(bp => windowWidth >= bp.width);
        return breakpoint ? breakpoint.name : config.breakpoints[config.breakpoints.length - 1].name;
    }
    
    // 화면 크기 변경 시 슬라이더 재구성
    $(window).on('resize', function() {
        const newDeviceMode = getDeviceMode(window.innerWidth);
        if (state.deviceMode !== newDeviceMode) {
            state.deviceMode = newDeviceMode;
            arrangeSlides();
        }
    });
    
    // 슬라이드 재구성
    function arrangeSlides() {
        // 현재 모드에 맞는 아이템 수 계산
        const breakpoint = config.breakpoints.find(bp => bp.name === state.deviceMode);
        const itemsPerView = breakpoint ? breakpoint.itemsPerView : config.breakpoints[0].itemsPerView;
        
        // 기존 슬라이드 초기화
        $sliders.find('.item').parent('.swiper-slide').each(function() {
            $(this).find('.item').unwrap();
        });
        $sliders.find('.swiper-slide-duplicate').remove();
        
        // 슬라이드 다시 생성
        $sliders.each(function(index) {
            const $currentSlider = $(this).addClass(`slider-${index}`);
            const $wrapper = $currentSlider.find('.swiper-wrapper');
            $wrapper.empty();
            
            // 원본 아이템 복사 후 슬라이드 생성
            const $items = state.originalItems[index].clone();
            const itemCount = $items.length;
            for (let i = 0; i < itemCount; i += itemsPerView) {
                const $slide = $('<div class="swiper-slide">');
                $items.slice(i, i + itemsPerView).clone().appendTo($slide);
                $wrapper.append($slide);
            }
            // 마지막 슬라이더 처리 후 스와이퍼 초기화
            if (index === $sliders.length - 1) {
                initSwipers(itemsPerView);
            }
        });
    }
    
    // Swiper 인스턴스 생성
    function initSwipers(itemsPerView) {
        $sliders.each(function(index) {
            const $currentSlider = $(this);
            // 기존 스와이퍼 제거
            if (state.swipers[index]) {
                state.swipers[index].destroy(true, true);
                state.swipers[index] = null;
            }
            // 스와이퍼 설정
            const swiperConfig = {
                slidesPerView: 1,
                initialSlide: Math.floor(state.slideIndexes[index] / itemsPerView),
                loop: true,
                navigation: {
                    nextEl: $currentSlider.find('.swiper-next')[0],
                    prevEl: $currentSlider.find('.swiper-prev')[0],
                },
                pagination: {
                    el: $currentSlider.find('.swiper-pagination')[0],
                    clickable: true,
                    renderBullet: function(index, className) {
                        return `<span class="${className}"></span>`;
                    }
                },
                on: {
                    slideChange: function() {
                        state.slideIndexes[index] = this.realIndex * itemsPerView;
                    }
                }
            };
            // 스와이퍼 생성
            state.swipers[index] = new Swiper($currentSlider.find('.viewport')[0], swiperConfig);
        });
    }
    
    // 초기화 및 실행
    initSliders();
    state.deviceMode = getDeviceMode(window.innerWidth);
    arrangeSlides();
}

$(document).ready(function() {
    slideAct();
})
```

* **설정 및 상태 관리**  
<span class="txt">
`config` 객체는 반응형 브레이크포인트와 각 화면 크기별 표시할 아이템 수를 정의합니다. `state` 객체는 슬라이더의 현재 상태를 추적하는 데 사용됩니다.
</span>

* **초기화 함수**  
<span class="txt">
`initSliders` 함수는 각 슬라이더의 원본 아이템을 복제하여 저장합니다. 이 원본 아이템들은 화면 크기가 변경될 때 새로운 슬라이드를 생성하는 데 사용됩니다.
</span>

* **디바이스 모드 감지**  
<span class="txt">
`getDeviceMode` 함수는 현재 창 너비에 따라 'desktop'이나 'mobile' 모드를 반환합니다. `resize` 이벤트에서 디바이스 모드가 변경되면 슬라이드를 재구성합니다.
</span>

* **슬라이드 재구성**  
<span class="txt">
`arrangeSlides` 함수는 현재 디바이스 모드에 맞게 슬라이드를 다시 구성합니다. 기존 슬라이드를 초기화하고, 원본 아이템들을 현재 모드에 맞는 개수로 그룹화하여 새 슬라이드를 생성합니다.
</span>

* **Swiper 인스턴스 생성**  
<span class="txt">
`initSwipers` 함수는 Swiper 인스턴스를 생성하고 설정합니다. 무한 루프, 네비게이션, 페이지네이션 등 Swiper의 다양한 기능을 활용합니다. 슬라이드 변경 시 현재 슬라이드 인덱스를 `state`에 저장합니다.
</span>

<br>

### 반응형 설정 확장하기: 태블릿 추가하기

```js
// 반응형 설정값 (태블릿 추가)
const config = {
    breakpoints: [
        { name: 'desktop', width: 1024, itemsPerView: 6 },  // PC: 한 화면에 6개 (1024px 이상)
        { name: 'tablet', width: 768, itemsPerView: 4 },    // 태블릿: 한 화면에 4개 (768px~1023px)
        { name: 'mobile', width: 0, itemsPerView: 3 }       // 모바일: 한 화면에 3개 (767px 이하)
    ]
};
```

위 코드처럼 `breakpoints` 배열에 태블릿 설정을 추가하면 디바이스별로 더 세밀한 반응형 제어가 가능합니다. 여기서 주의할 점은 `width` 값을 큰 것부터 작은 순서로 정렬해야 합니다. `getDeviceMode` 함수는 창 너비가 설정된 `width` 이상인 첫 번째 `breakpoint`를 찾기 때문입니다.

<br>

## 실제 활용 팁

* **여러 슬라이더 지원**  
<span class="txt">
이 코드는 페이지 내 여러 슬라이더를 동시에 지원합니다. 각 슬라이더의 상태는 `state` 객체의 배열에 독립적으로 저장됩니다.
</span>

* **다양한 그리드 레이아웃**  
<span class="txt">
CSS의 `grid-template-columns` 속성을 수정하여 다양한 그리드 레이아웃을 구현할 수 있습니다. 예를 들어, 2x3 그리드나 4x2 그리드 등 원하는 형태로 변경 가능합니다.
</span>

<br>

## 결론

이번 포스트에서는 jQuery와 Swiper를 활용한 반응형 그리드 슬라이더 구현 방법을 알아보았습니다. 이 코드는 화면 크기에 따라 자동으로 콘텐츠 레이아웃을 조정하면서도 무한 루프와 편리한 네비게이션을 제공합니다. 특히 여러 개의 콘텐츠를 그리드 형태로 보여주어야 하는 웹사이트에서 유용하게 활용할 수 있습니다.

이 포스트가 도움이 되셨나요? 더 궁금한 점이나 의견이 있다면 댓글로 남겨주세요. 함께 더 나은 코드를 만들어 나가요!

<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-03-09-swiper-col/">예제결과 미리보기</a>
</div>

