---
title: >  
    jQuery - Swiper 단계별 프로그레스바 페이지네이션 연동

description: >  
    jQuery와 Swiper.js를 활용하여 단계별 프로그레스바 페이지네이션을 연동하는 방법을 소개합니다.

alternates:
  - title: "jQuery - Swiper 단계별 프로그레스바 페이지네이션 연동"
    href: "https://ctrlcccv.github.io/code/2025-04-18-swiper-progress2/"
    hreflang: "ko"
  - title: "Swiper.js Slider: Custom Step Progress Bar Tutorial"
    href: "https://ctrlcccv.github.io/code-en/2025-04-18-swiper-progress2/"
    hreflang: "en"

slug: 2025-04-18-swiper-progress2
date: 2025-04-18 00:00:00+0000
lastmod: 2025-04-18 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-18-swiper-progress2.webp

categories:
    - jQuery
tags:
    - Swiper.js
    - 진행 표시줄
---
이번 글에서는 jQuery를 활용하여 Swiper.js 슬라이드와 단계별 프로그레스바 페이지네이션을 연동하는 방법을 소개합니다. 프로그레스바는 사용자가 콘텐츠를 소화하는 데 소요되는 시간이나 단계를 직관적으로 알 수 있게 해주며, 각 단계를 명확히 구분함으로써 사용자가 자신의 진행 상태를 더 쉽게 이해할 수 있도록 돕습니다.  

코드 예제와 함께 실제 웹 개발에서 어떻게 적용할 수 있는지 단계별로 살펴보며, 슬라이드와 프로그레스바 기능을 여러분의 웹사이트에 쉽게 추가하는 방법을 알려드립니다.  

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

## HTML 구조

```html
<div class="slider">
    <div class="inner">
        <ul class="slide_list swiper-wrapper">
            <li class="swiper-slide">1</li>
            <li class="swiper-slide">2</li>
            <li class="swiper-slide">3</li>
            <li class="swiper-slide">4</li>
            <li class="swiper-slide">5</li>
        </ul>
    </div>
    <ul class="progress">
        <li>STEP 1</li>
        <li>STEP 2</li>
        <li>STEP 3</li>
        <li>STEP 4</li>
        <li>STEP 5</li>
    </ul>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
```
* **슬라이드 컨테이너**  
<span class="txt">.slider는 전체 슬라이드를 감싸는 최상위 요소입니다. .inner 내부에 슬라이드 목록인 .slide_list가 포함되어 있습니다.</span>

* **슬라이드 항목**  
<span class="txt">각 .swiper-slide 요소는 슬라이드 한 장을 의미하며, 여기서는 숫자 1~5가 각각 표시되어 있습니다.</span>

* **진행 상태 표시**  
<span class="txt">.progress는 단계별 진행 상황을 나타내는 페이지네이션으로, 각 단계가 STEP 1, STEP 2 형식으로 표현됩니다.</span>

* **이전/다음 버튼**  
<span class="txt">.swiper-button-prev와 .swiper-button-next는 슬라이드를 앞뒤로 이동할 수 있는 네비게이션 버튼입니다.</span>

<br>

## CSS 스타일

```css
.slider { --transition-duration: 0.7s; --progress-width: 0; position: relative; max-width: 640px; margin: 50px auto 0; } 
.slider .inner { overflow: hidden; } 
.slide_list > li { display: flex; justify-content: center; align-items: center; width: 300px; height: 200px; margin: 0 10px; background: #8ab4f8; font-size: 36px; font-weight: 500; } 
.swiper-button-next, 
.swiper-button-prev { color: #000; top: calc(50% - 17px); } 
.progress { display: flex; justify-content: space-between; position: relative; bottom: auto !important; height: 15px; margin: 20px auto 0; } 
.progress::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background: #D3D3D3; z-index: 0; transform: translate(0, -50%); } 
.progress::after { content: ''; position: absolute; top: 50%; left: 0; width: var(--progress-width); height: 2px; background: #000; z-index: 1; transform: translate(0, -50%); transition: all var(--transition-duration); } 
.progress > li { position: relative; width: auto; height: auto; margin: 0 !important; background: none; text-align: center; opacity: 1 !important; } 
.progress > li .dots { display: flex; justify-content: center; align-items: center; position: relative; z-index: 2; } 
.progress > li .dots::before { content: ''; display: block; width: 15px; height: 15px; background: #D3D3D3; border-radius: 50%; z-index: 2; transition: all var(--transition-duration); } 
.progress > li.end .dots::before { background: #000; } 
.progress > li.swiper-pagination-bullet-active .dots::before { background: #000; } 
.progress > li .txt { position: absolute; top: calc(100% + 16px); left: 50%; font-size: 20px; font-weight: 700; line-height: 1; color: #D3D3D3; white-space: nowrap; transform: translate(-50%, 0); transition: all var(--transition-duration); } 
.progress > li.end .txt { color: #000; } 
.progress > li.swiper-pagination-bullet-active .txt { color: #000; } 
```
* **슬라이더 전체 구조 스타일링**  
<span class="txt">.slider 클래스는 슬라이드의 최대 너비와 상단 마진을 설정하며, CSS 변수 --transition-duration을 통해 슬라이드 전환 애니메이션 속도를 제어합니다. 이를 통해 전환 효과를 부드럽고 일관되게 유지할 수 있습니다.</span>

* **슬라이드 항목 정렬 및 디자인**  
<span class="txt">.slide_list > li 요소는 Flexbox를 이용해 중앙 정렬되며, 지정된 너비(300px)와 높이(200px), 여백(양옆 10px)을 통해 균일한 슬라이드 구성을 만듭니다.</span>

* **네비게이션 버튼 위치 및 스타일**  
<span class="txt">.swiper-button-next와 .swiper-button-prev는 슬라이더의 수직 가운데 위치에 정렬되며, 기본 색상은 검정색입니다. 이를 통해 사용자에게 자연스럽게 슬라이드 이동 버튼의 위치를 안내하고, 사용 편의성을 높입니다.</span>

* **전체 진행바 기본 스타일**  
<span class="txt">.progress는 Flexbox를 사용하여 각 단계 항목을 수평으로 균일하게 배치합니다. ::before와 ::after 의사 요소를 사용해 기본 회색 배경선과 진행 중인 검정색 바를 분리하여 표시하며, 진행 상태를 두 개의 레이어로 명확하게 표현합니다.</span>

* **단계별 항목 구성 및 정렬**  
<span class="txt">각 .progress > li 요소는 개별 단계로 구성되며, 도트(.dots)와 텍스트(.txt)로 구성되어 있습니다. 도트는 15px의 원형으로 표시되고, 텍스트는 하단에 위치해 사용자에게 현재 단계의 설명을 전달합니다.</span>

* **완료된 단계 표시**  
<span class="txt">.end 클래스가 적용된 항목은 도트와 텍스트 색상이 진한 검정으로 변경되어 완료된 단계를 시각적으로 구분할 수 있게 합니다. 이 처리는 전환 중 이전 항목에 순차적으로 클래스가 적용되며, 현재까지 진행된 흐름을 자연스럽게 표현해줍니다.</span>

* **현재 활성 단계 강조**  
<span class="txt">.swiper-pagination-bullet-active 클래스는 현재 활성화된 페이지네이션 항목에 자동으로 부여되며, 해당 항목의 도트와 텍스트에 동일한 강조 스타일을 적용합니다. 이를 통해 사용자는 현재 위치를 한눈에 파악할 수 있습니다.</span>

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
$(document).ready(function(){
    centerSlider()
})

function centerSlider() {
    const titles = []; // 슬라이드 제목 배열
    const $sliderList = $('.slide_list'); // 슬라이드 목록
    const $slides = $('.slide_list > li'); // 슬라이드 항목
    const $progressItems = $('.progress > li'); // 페이지네이션 항목
    const originalSlideCount = $slides.length; // 원본 슬라이드 수
    const targetSlideCount = 5; // 목표 슬라이드 수

    // 슬라이드 제목 배열에 저장
    $progressItems.each((_, item) => {
        titles.push($(item).text());
    });

    // 복제 슬라이드 수 계산
    const currentSlideCount = $sliderList.find('> li[data-cloned!=true]').length;
    const clonesNeeded = Math.max(0, Math.ceil((targetSlideCount - currentSlideCount) / originalSlideCount));

    // 슬라이드 복사
    for (let i = 0; i < clonesNeeded; i++) {
        $slides.each(function () {
            $sliderList.append($(this).clone());
        });
    }

    // 슬라이드 옵션
    const swiperOptions = {
        loop: true, 
        centeredSlides: true, 
        slidesPerView: 'auto', 
        autoplay: {
            delay: 3000,
        },
        pagination: { 
            el: '.progress',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => {
                if (index >= originalSlideCount) return '';
                return `<li class="${className}">
                            <span class="dots"></span>
                            <span class="txt">${titles[index]}</span>
                        </li>`;
            },
        },
        navigation: {
            nextEl: '.slider .swiper-button-next',
            prevEl: '.slider .swiper-button-prev',
        },
    };

    const swiper = new Swiper('.slider .inner', swiperOptions);  // Swiper 초기화

    // 슬라이드 전환 시작 시 페이지네이션 및 진행바 업데이트
    swiper.on('transitionStart', () => {
        const currentIndex = swiper.realIndex < originalSlideCount 
            ? swiper.realIndex 
            : swiper.realIndex % originalSlideCount;

        // 현재 인덱스에 맞는 페이지네이션 활성화
        $('.progress .swiper-pagination-bullet')
            .removeClass('swiper-pagination-bullet-active')
            .eq(currentIndex).addClass('swiper-pagination-bullet-active');

        updatePreviousClasses(); // 이전 클래스 업데이트
        updateProgressBar(); // 진행바 업데이트
    });

    // 슬라이드 전환 종료 시 인덱스 업데이트
    let autoplayActive = false; // 자동 재생 활성화 상태
    swiper.on('transitionEnd', () => {
        const currentIndex = swiper.realIndex;
        if (currentIndex >= originalSlideCount) {
            const originalIndex = currentIndex % originalSlideCount;  
            swiper.slideToLoop(originalIndex, 0); // 원래 인덱스로 이동
            autoplayActive = true; // 자동 재생 활성화
        }
        if (autoplayActive) {
            swiper.autoplay.start(); // 자동 재생 시작
            setTimeout(() => {
                autoplayActive = false; // 자동 재생 비활성화
            }, 1000);
        }
    });

    // 이전 항목에 클래스 업데이트
    function updatePreviousClasses() {
        const $activeBullet = $('.swiper-pagination-bullet-active');  
        $activeBullet.prevAll().addClass('end'); // 이전 항목에 클래스 추가
        $('.progress > li').not($activeBullet).removeClass('end'); // 나머지 항목에서 클래스 제거
    }

    // 진행바 업데이트
    function updateProgressBar() {
        const $progress = $('.progress'); // 진행바 요소
        const $items = $progress.find('> li'); // 항목 요소
        const totalItemsCount = $items.length - 1; // 전체 항목 수
        let activeIndex = swiper.realIndex % originalSlideCount;
        if (activeIndex >= originalSlideCount) {
            activeIndex -= originalSlideCount; // 기본 슬라이드 수를 뺀 인덱스 조정
        }

        $items.removeClass('end').slice(0, activeIndex).addClass('end'); // 활성화 항목 계산
        const percentage = (activeIndex / totalItemsCount) * 100; // 진행률 계산
        $progress.css('--progress-width', `${percentage}%`); // 진행바 스타일 설정
    }
}
```
* **슬라이드 제목 추출**  
<span class="txt">슬라이드와 연동될 페이지네이션 항목의 텍스트를 titles 배열에 저장합니다. 각 단계의 텍스트는 .progress > li 요소를 each 메서드를 사용하여 반복적으로 추출되며, 이 배열은 이후 Swiper의 커스텀 페이지네이션 생성에 활용됩니다.</span>  

* **복제 슬라이드 생성**  
<span class="txt">슬라이드가 무한 반복되도록 하기 위해, 원본 슬라이드 개수를 기준으로 부족한 수만큼 슬라이드를 복제합니다. clonesNeeded 값을 계산해 필요한 만큼 복제하고, 이를 통해 슬라이드가 원활하게 이어지도록 합니다.</span>  

* **Swiper 초기화 및 설정**  
<span class="txt">Swiper 인스턴스를 생성하면서 슬라이드의 다양한 동작 옵션을 설정합니다. loop, centeredSlides, autoplay, pagination, navigation 등의 설정을 통해 자동 전환, 중앙 정렬, 커스텀 페이지네이션, 방향 버튼 제어 등을 지원합니다.</span>

* **슬라이드 전환 시작 시 처리**  
<span class="txt">transitionStart 이벤트를 활용해 슬라이드 전환이 시작될 때 실행할 로직을 정의합니다. 현재 인덱스를 계산한 후, 해당 단계의 페이지네이션 항목을 강조하고, 이전 항목들에 클래스(end)를 적용해 시각적 진행 상태를 표현합니다.</span>

* **슬라이드 전환 종료 시 처리**  
<span class="txt">transitionEnd 이벤트에서는 현재 슬라이드가 원본 슬라이드 개수를 초과한 경우, slideToLoop()를 사용해 원래 위치로 즉시 이동시킵니다. 이와 함께 자동 재생 기능도 재활성화하여 슬라이드 흐름이 자연스럽게 이어지도록 만듭니다.</span>

* **이전 항목에 클래스 적용**  
<span class="txt">활성화된 페이지네이션 항목을 기준으로, 그 이전 항목들에 end 클래스를 추가해 '완료된 단계'임을 시각적으로 표현합니다. 동시에, 현재 활성 항목을 제외한 나머지 항목에서는 해당 클래스를 제거하여 현재 진행 상황만 남도록 처리합니다.</span>  

* **진행바 동기화**  
<span class="txt">슬라이드 전환 시점에 맞춰 .progress::after의 너비를 조정합니다. 전체 단계 수 대비 현재 인덱스를 백분율로 계산해 --progress-width 커스텀 속성에 적용하고, 이를 통해 진행 상태를 실시간으로 반영하는 시각적 효과를 구현합니다.</span>  

<br>

## 결론
이번 글에서는 jQuery와 Swiper.js를 활용해 단계별 프로그레스바 페이지네이션을 연동하는 방법을 상세히 소개했습니다. 이런 슬라이드 구성은 단순한 이미지 슬라이더를 넘어, 교육용 콘텐츠, 제품 소개, 단계별 튜토리얼 등 다양한 곳에서 효과적으로 활용될 수 있습니다.  

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-17-swiper-progress2/index.html">예제결과 미리보기</a>
    <a href="/code/2025-04-15-swiper-center3/">[관련글] Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결</a>
</div>
