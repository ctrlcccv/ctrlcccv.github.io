---
title: >  
    Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결

description: >  
    Swiper.js 11 이상 버전에서 발생할 수 있는 centeredSlides 슬라이드 전환 오류를 해결하기 위해 복제 슬라이드를 활용한 최적화 방법을 소개합니다.

alternates:
  - title: "Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결"
    href: "https://ctrlcccv.github.io/code/2025-04-15-swiper-center3/"
    hreflang: "ko"
  - title: "Swiper.js: How to Fix Loop + CenteredSlides Issues"
    href: "https://ctrlcccv.github.io/code-en/2025-04-16-swiper-center3/"
    hreflang: "en"
    
slug: 2025-04-15-swiper-center3
date: 2025-04-15 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-15-swiper-center3.webp

categories:
    - jQuery
tags:
    - Swiper.js
---
이번 블로그 글에서는 Swiper.js 11 이상 버전에서 centeredSlides 옵션 사용 시 발생할 수 있는 슬라이드 전환 오류를 해결하는 방법을 소개합니다.
최신 Swiper.js는 다양한 기능을 제공하지만, 특히 centeredSlides처럼 특정 옵션이 예상대로 작동하지 않는 경우가 있습니다. 슬라이드 개수가 부족하거나, 복제 슬라이드를 동적으로 생성해야 하는 상황에서는 이러한 오류가 더욱 자주 발생합니다.  

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

이러한 슬라이드 전환 오류는 사용자가 콘텐츠를 매끄럽게 탐색하는 데 방해가 될 수 있으며, 경우에 따라 사이트 전반의 완성도에도 영향을 줄 수 있습니다.  
이 글에서는 복제 슬라이드를 추가해 슬라이드 수를 확보하고, 그 과정에서 발생할 수 있는 다양한 오류를 해결하는 코드를 함께 살펴보겠습니다.  

특히 Swiper.js 11 이상 버전에서 복제 슬라이드를 어떻게 활용할 수 있는지, 그리고 사용자 지정 페이지네이션, 자동 재생 설정 등 다양한 기능을 통해 슬라이드 동작을 최적화하는 방법에 대해 자세히 설명드리겠습니다.  

<br>

## HTML 구조

```html
<div class="slider_center">
    <div class="inner">
        <ul class="slider_list swiper-wrapper">
            <li class="swiper-slide">1</li>
            <li class="swiper-slide">2</li>
            <li class="swiper-slide">3</li>
            <li class="swiper-slide">4</li>
            <li class="swiper-slide">5</li>
            <li class="swiper-slide">6</li>
            <li class="swiper-slide">7</li>
            <li class="swiper-slide">8</li>
            <li class="swiper-slide">9</li>
            <li class="swiper-slide">10</li>
        </ul>
    </div>
    <div class="pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
```
* **슬라이드 기본 구조**  
<span class="txt">최상위 .slider_center 요소는 슬라이드 전체를 감싸는 컨테이너로, 전체 레이아웃의 틀을 형성합니다. 이 요소는 CSS를 통해 위치를 조정하고, 슬라이드가 컨테이너 밖으로 넘치지 않도록 오버플로우를 제어합니다.</span>

* **슬라이드 목록**
<span class="txt">.slider_list.swiper-wrapper 요소는 모든 슬라이드 항목을 감싸는 리스트입니다. 이 구조는 Swiper.js에서 슬라이드를 구성하기 위한 필수적인 기반입니다.</span>

* **슬라이드 아이템**  
<span class="txt">.swiper-slide 요소는 각각 하나의 슬라이드를 나타냅니다. 이 예제에서는 숫자 1부터 10까지의 콘텐츠가 포함되어 있으며, CSS를 통해 일정한 크기와 배경색으로 디자인됩니다. 사용자는 이 슬라이드를 스크롤하거나 버튼을 통해 쉽게 탐색할 수 있습니다.</span>

* **페이지네이션**  
<span class="txt">.pagination 요소는 현재 어떤 슬라이드가 표시되고 있는지를 시각적으로 나타내는 페이징 UI입니다. Swiper.js가 이 요소를 자동으로 업데이트하여, 사용자가 슬라이드를 직관적으로 탐색할 수 있도록 도와줍니다.</span>

* **네비게이션 버튼**  
<span class="txt">.swiper-button-prev와 .swiper-button-next 요소는 슬라이드 간 이동을 위한 네비게이션 버튼입니다. 사용자는 이 버튼을 클릭해 이전 또는 다음 슬라이드로 쉽게 이동할 수 있습니다.</span>

<br>

## CSS 스타일

```css
.slider_center { overflow: hidden; position: relative; margin-top: 100px; } 
.slider_list > li { display: flex; justify-content: center; align-items: center; width: 300px; height: 400px; background: #8ab4f8; font-size: 36px; font-weight: 500; } 
.pagination { display: flex; justify-content: center; margin-top: 20px; } 
.swiper-button-next, .swiper-button-prev { color: #000; }
.slider_center .inner { position: relative; left: 50%; width: 200vw; transform: translate(-50%); } 
```
* **슬라이드 컨테이너 스타일**  
<span class="txt">.slider_center 요소는 슬라이드의 최상위 컨테이너로서, 전반적인 레이아웃을 구성하는 데 핵심적인 역할을 합니다. overflow: hidden 속성은 슬라이드 콘텐츠가 컨테이너 밖으로 넘치지 않도록 막아주며, position: relative는 내부 요소의 위치를 유연하게 조정할 수 있도록 합니다.</span>

* **슬라이드 아이템 스타일**  
<span class="txt">.slider_list > li 요소는 각 슬라이드 항목에 스타일을 적용합니다. display: flex로 콘텐츠를 수직·수평 방향 모두 중앙 정렬하고, width: 300px, height: 400px을 지정해 슬라이드 크기를 일정하게 유지합니다.</span>

* **페이지네이션 스타일**  
<span class="txt">.pagination 요소는 슬라이드 하단에 위치한 페이징 영역입니다. display: flex를 사용하여 요소를 가운데 정렬하고, 슬라이드와의 여백은 margin-top: 20px으로 조정합니다.
</span>

* **네비게이션 버튼 스타일**  
<span class="txt">.swiper-button-next와 .swiper-button-prev는 슬라이드 간 이동을 돕는 버튼입니다. 버튼을 명확하게 인식할 수 있어 직관적인 인터랙션을 유도합니다.</span>

* **복제 슬라이드 스타일과 필요성**  
<span class="txt">
.slider_center .inner 요소는 슬라이드 내부의 레이아웃을 담당합니다.   
left: 50%와 transform: translate(-50%)를 함께 사용하여 갤러리 콘텐츠를 정확히 중앙에 정렬하며, width: 200vw는 복제 슬라이드가 자연스럽게 이어지도록 보장합니다.  
</span>

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

<br>

## jQuery 코드
```js
function centerSlider() {
    // 원본 슬라이드 리스트와 복제 슬라이드 추가할 리스트 선택
    const $sliderList = $('.slider_list');
    const $originalList = $('.slider_list > li');
    const originalSlideCount = $originalList.length;
    const targetCount = 20; // 목표 슬라이드 수

    // 현재 슬라이드 수
    const currentSlideCount = $sliderList.find('> li[data-cloned!=true]').length;
    // 필요한 복제 슬라이드 수
    const neededClones = Math.max(0, Math.ceil((targetCount - currentSlideCount) / originalSlideCount));

    // 필요한 만큼 원본 리스트 복제하여 추가
    for (let i = 0; i < neededClones; i++) {
        $originalList.each(function () {
            const $clone = $(this).clone();
            $sliderList.append($clone);
        });
    }

    // Swiper 설정
    const swiperOptions = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: -50,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.slider_center .pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => index < originalSlideCount ? `<span class="${className}"></span>` : '',
        },
        navigation: {
            nextEl: '.slider_center .swiper-button-next',
            prevEl: '.slider_center .swiper-button-prev',
        },
    };

    // Swiper 초기화
    const swiper = new Swiper('.slider_center .inner', swiperOptions);

    // 슬라이드 전환 시작 시 페이지네이션 업데이트
    swiper.on('transitionStart', () => {
        // 현재 인덱스 계산
        let currentIndex = swiper.realIndex < originalSlideCount ? swiper.realIndex : swiper.realIndex % originalSlideCount;
        // 페이지네이션 선택
        const $paginationItems = $('.slider_center .pagination .swiper-pagination-bullet');
        $paginationItems.removeClass('swiper-pagination-bullet-active'); // 이전 활성화 상태 제거
        $paginationItems.eq(currentIndex).addClass('swiper-pagination-bullet-active'); // 현재 인덱스를 활성화
    });

    // 슬라이드 전환 종료 시 인덱스 업데이트
    let autoplayActive = false; // 현재 자동 슬라이드 활성화 상태
    swiper.on('transitionEnd', () => {
        const currentIndex = swiper.realIndex;
        if (currentIndex >= originalSlideCount) {
            const originalIndex = currentIndex % originalSlideCount; // 원래 인덱스 계산
            swiper.slideToLoop(originalIndex, 0); // 원래 인덱스로 슬라이드 이동
            autoplayActive = true; // 자동 슬라이드 활성화
        }
        if (autoplayActive) {
            swiper.autoplay.start(); // 자동 슬라이드 시작
            setTimeout(() => {
                autoplayActive = false; // 1초 후 자동 슬라이드 비활성화
            }, 1000);
        }
    });
}
```
* **슬라이드 초기화**  
<span class="txt">
    centerSlider 함수는 슬라이드를 초기 설정한 뒤, 부족한 개수만큼 복제 슬라이드를 생성해 추가합니다.
    Swiper.js 11 버전에서는 loop 옵션을 사용할 경우, 슬라이드가 일정 개수 이상 있어야 무한 반복 기능이 정상적으로 작동합니다.
    슬라이드 수가 부족하면 동작에 문제가 생길 수 있으므로, 충분히 확보하는 것이 중요합니다.
    이 예제에서는 슬라이드가 총 20개가 되도록 설정되어 있으며, 원본 슬라이드 목록을 기준으로 복제가 이루어집니다.
</span>

* **복제 슬라이드 생성**  
<span class="txt">현재 슬라이드 개수를 확인한 뒤, 목표 개수(20개)에 도달하기 위해 얼마나 더 복제해야 하는지를 계산합니다. 원본 슬라이드를 필요한 만큼 복제해 리스트에 추가하고, 각 복제 슬라이드에는 data-cloned 속성을 부여해 원본과 복제본을 쉽게 구분할 수 있도록 만듭니다.</span>

* **Swiper.js 설정**  
<span class="txt">슬라이드의 전체적인 동작 방식을 설정하는 단계입니다. 무한 반복 기능, 중앙 슬라이드 정렬, 자동 재생, 시각 효과, 페이지네이션 등 다양한 옵션을 적용할 수 있습니다.</span>

* **페이지네이션 처리**  
<span class="txt">transitionStart 이벤트를 통해 현재 슬라이드의 인덱스를 파악하고, 그에 맞춰 페이지네이션 상태를 갱신합니다. 비활성화된 페이지네이션 버튼이 현재 위치를 나타내는 활성 상태로 바뀌며, 사용자가 어떤 슬라이드를 보고 있는지 직관적으로 알 수 있도록 도와줍니다.</span> 

* **자동 슬라이드 제어**   
<span class="txt">transitionEnd 이벤트에서는 슬라이드 전환이 완료된 후 현재 활성 슬라이드를 확인하고, 원본 슬라이드로 이동합니다. 원본 슬라이드로 돌아올 때 Swiper의 자동 재생 기능이 멈추는 문제를 해결하기 위해, 자동 재생을 다시 실행시켜 슬라이드 전환 흐름이 자연스럽게 이어지도록 보완했습니다.</span>

<br>

## 결론

이번 블로그에서는 Swiper.js 11 이상 버전에서 발생할 수 있는 centeredSlides 슬라이드 전환 오류를 해결하는 방법에 대해 자세히 살펴보았습니다. 특히, centeredSlides 기능을 활용하여 슬라이드 간의 원활한 전환을 이루고 사용자 경험을 향상시키는 방안을 소개했습니다. 복제 슬라이드를 도입하여 충분한 슬라이드 수를 확보함으로써, 슬라이드 전환 시 발생하는 문제를 해결했습니다. 또한, 인덱스 업데이트를 통해 현재 슬라이드 위치를 정확하게 반영했습니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-15-swiper-center3/">예제결과 미리보기</a>
</div>
