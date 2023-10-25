---
title: jQuery - Swiper 메뉴 클릭 시 스크롤 이동, 활성화 메뉴 표시하기
description: >  
    Swiper 메뉴에 스크롤 이동과 활성화된 효과를 적용하고, 스크롤 했을 때 활성화된 메뉴를 가운데 정렬하는 기능을 구현하였습니다.  
slug: 2023-10-22-swiper-menu
date: 2023-10-22 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-22-swiper-menu.webp

categories:
    - jQuery
tags:
    - Swiper.js
    - 스크롤 이벤트
---
[jQuery - Swiper 스와이프메뉴 클릭하면 가운데오기](https://ctrlcccv.github.io/code/2023-10-12-swiper-click/) 작업 이후, Swiper로 제작한 메뉴에 대한 추가 기능을 개발하게 되었습니다. 이번 작업에서는 **스크롤 이동과 활성화된 메뉴에 효과를 적용하고, 스크롤 했을 때 활성화된 메뉴를 가운데 정렬하는 기능**을 구현하였습니다.  
<br>

## HTML 구조
HTML 구조를 살펴보겠습니다. 다음과 같이 메뉴와 컨텐츠 섹션을 감싸는 wrap 요소와 메뉴를 포함하는 menu_wrap 요소, 그리고 각 메뉴 항목과 컨텐츠 섹션을 정의한 menu와 content 요소로 구성되어 있습니다.
```html
<div class="wrap">
    <div class="menu_wrap">
        <div class="in_Layer tab_swiper">
            <ul class="menu swiper-wrapper">
                <li class="swiper-slide active"><a href="#con1">첫번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con2">두번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con3">세번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con4">네번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con5">다섯번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con6">여섯번째 메뉴</a></li>
                <li class="swiper-slide"><a href="#con7">일곱번째 메뉴</a></li>
            </ul>
        </div>
    </div>

    <div class="content" id="con1">1</div>
    <div class="content" id="con2">2</div>
    <div class="content" id="con3">3</div>
    <div class="content" id="con4">4</div>
    <div class="content" id="con5">5</div>
    <div class="content" id="con6">6</div>
    <div class="content" id="con7">7</div>
</div>
```

## CSS 스타일
메뉴와 컨텐츠에 대한 CSS 스타일링은 다음과 같습니다. 메뉴는 화면 상단에 고정되며, 활성화된 메뉴 항목은 색상이 변경됩니다.
```css
.wrap {position: relative;max-width: 700px;margin: 0 auto;padding-top: 65px;}
.menu_wrap {position: absolute;top: 0;width: 100%;max-width: 700px;background: #000;}
.menu_wrap .in_Layer {overflow: hidden;}
.menu {display: flex;align-items: center;}
.menu > li:last-child {padding-right: 0;}
.menu > li a {display: flex;align-items: center;position: relative;height: 65px;padding: 0 20px;font-size: 18px; font-weight: 500; letter-spacing:-0.025em; color: #fff;text-decoration: none;}
.menu > li.active a {color: #FFC0CB;}
.content {display: flex;justify-content: center;align-items: center;height: calc(100vh - 65px);font-size: 60px;font-weight: 500;}
#con1, #con3, #con5, #con7 {background: #FFC0CB;}
#con2, #con4, #con6 {background: #E6E6FA;}

@media screen and (max-width: 1180px) {
    .wrap {padding-top: 45px;}
    .menu > li a {height: 45px;font-size: 16px;}
    .content {height: calc(100vh - 45px);}
}
```

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
menuScroll 함수는 메뉴를 고정하고 활성화된 메뉴 항목을 중앙으로 이동시키는 데 사용됩니다.    
클릭했을 때 가운데 정렬하는 initTabSwipers 함수는 [jQuery - Swiper 스와이프메뉴 클릭하면 가운데오기](https://ctrlcccv.github.io/code/2023-10-12-swiper-click/)를 참고해 주세요.

```js
$(document).ready(function () {
    initTabSwipers(); // 클릭하면 탭 가운데 정렬 함수
    menuScroll(); // 메뉴 클릭 시 스크롤 이동 함수
});

function menuScroll() {
    const $menuWrap = $('.menu_wrap');
    const $menuBox = $menuWrap.find('.tab_swiper');
    const $menu = $('.menu');
    const $menuList = $menu.find('li');
    const $menuItems = $menu.find('a')
    const $contents = $('.content');
    const offsetMo = 0; // 메뉴 상단 고정 위치 (모바일)
    const offsetPC = 0; // 메뉴 상단 고정 위치 (PC)
    const topMo = 45; // 스크롤 했을 때 컨텐츠 시작 위치 (모바일)
    const topPc = 65; // 스크롤 했을 때 컨텐츠 시작 위치 (PC)
    const breakpoints = 1181; // 모바일 사이즈 분기점
    let windowWidth = window.innerWidth;
    let isMobile = window.innerWidth < breakpoints;
    let position = $menuWrap.offset().top;
    let resizeTimer;
    let scrollTimer;

    // 메뉴를 고정하는 함수
    function scrollAct() {
        const scrollTop = $(window).scrollTop();
        const offset = isMobile ? offsetMo : offsetPC;
        const menuWrapTop = isMobile ? offsetMo : offsetPC;
        if (scrollTop > position - offset) {
            $menuWrap.css({ 'position': 'fixed', 'top': menuWrapTop + 'px' });
        } else {
            $menuWrap.css({ 'position': 'absolute', 'top': '0' });
        }
    }

    // 활성화된 메뉴 항목을 중앙으로 이동하는 함수
    function activeMenu(target) {
        const targetPos = target.position();
        let pos;
        let listWidth = 0;

        $menu.find('.swiper-slide').each(function () {
            listWidth += $(this).outerWidth();
        });

        const selectTargetPos = targetPos.left + target.outerWidth() / 2;
        if ($menu.outerWidth() < listWidth) {
            const boxHarf = $menuBox.width() / 2;
            if (selectTargetPos <= boxHarf) { // 왼쪽에 위치
                pos = 0;
            } else if ((listWidth - selectTargetPos) <= boxHarf) { // 오른쪽에 위치
                pos = listWidth - $menuBox.width();
            } else {
                pos = selectTargetPos - boxHarf;
            }
        }
        $menu.css({
            "transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
            "transition-duration": "300ms"
        });
    }

    // 창 크기 변경 이벤트 핸들러
    function handleResize() {
        if (windowWidth == window.innerWidth) return;
        $(window).off('scroll', scrollAct);
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            isMobile = window.innerWidth < breakpoints;
            $menuWrap.css({ 'position': 'absolute', 'top': '0' });
            position = $menuWrap.offset().top;
            $(window).on('scroll', scrollAct);
        }, 100);
        windowWidth = window.innerWidth;
    }

    // 스크롤 할 때 메뉴의 활성 상태를 설정하는 함수
    function handleScroll() {
        if (!$('html, body').is(":animated")) {
            const scltop = $(window).scrollTop() + (isMobile ? topMo : topPc);
            if ($(window).scrollTop() + window.innerHeight < $(document).height()) {
                const scltop = $(window).scrollTop() + (isMobile ? topMo : topPc);
                $.each($contents, function (idx, item) {
                    const targetTop = $(this).offset().top;
                    if (targetTop <= scltop) {
                        clearTimeout(scrollTimer);
                        scrollTimer = setTimeout(function () {
                            $menuList.removeClass('active');
                            $menuList.eq(idx).addClass('active');
                            activeMenu($menuList.eq(idx));
                        }, 50);
                    }
                });
            }else{ // 맨 아래에 도달하면 마지막 메뉴 항목 활성화
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                    const lastInx = $menuList.length - 1
                    $menuList.removeClass('active');
                    $menuList.eq(lastInx).addClass('active');
                    activeMenu($menuList.eq(lastInx));
                }, 50);
            }
        }
    }

    // 페이지 로드 시 초기화 작업
    $(window).on('load', function () {
        $(window).on('scroll', scrollAct).scroll();
    });

    // 창 크기 변경 이벤트 및 스크롤 이벤트 핸들러 등록
    $(window).on('resize', handleResize);
    $(window).scroll(handleScroll);

    // 메뉴 클릭 이벤트 핸들러 등록
    $menuItems.on('click', function (e) {
        e.preventDefault();
        const gnbHash = $(this).attr('href');
        const offset = $(gnbHash).offset().top - (isMobile ? topMo - 1 : topPc - 1);
        $('html, body').animate({ scrollTop: offset }, 500);
        $(this).closest('li').addClass('active').siblings().removeClass('active');
    });
}
```

* **변수 선언 및 초기화**    

  * $menuWrap, $menuBox, $menu, $menuList, $menuItems, $contents : 각각 메뉴와 컨텐츠 요소를 jQuery 객체로 저장합니다.
  * offsetMo, offsetPC : 모바일과 PC 모드에서 메뉴를 상단에 고정하기 위한 위치를 설정합니다.
  * topMo, topPc : 스크롤한 후 컨텐츠가 시작되는 위치를 설정합니다.
  * breakpoints : 모바일과 PC 모드를 구분할 화면 크기 분기점을 설정합니다.
  * isMobile : 현재 화면 크기가 모바일인지 여부를 저장합니다.
  * position : 메뉴의 초기 위치를 저장합니다.
  * resizeTimer, scrollTimer : 타이머 변수로, 리사이즈 및 스크롤 이벤트에 딜레이를 주기 위해 사용됩니다.  

* **메뉴 고정 (scrollAct 함수)**  
  * scrollAct 함수는 스크롤 이벤트를 처리하며, 메뉴를 화면 상단에 고정시키거나 해제합니다.
  * scrollTop을 사용하여 현재 스크롤 위치를 확인하고, isMobile 변수에 따라 메뉴 상단 고정 위치를 선택합니다.
  * 스크롤 위치가 position - offset보다 크면 메뉴를 고정하고, 그렇지 않으면 메뉴를 절대 위치로 설정합니다.  

* **활성화된 메뉴 표시 (activeMenu 함수)**  
  * activeMenu 함수는 활성화된 메뉴 항목을 중앙으로 이동시킵니다.
  * 선택된 메뉴 항목의 위치(targetPos)를 확인하고, 메뉴 항목들의 너비(listWidth)를 계산합니다.
  * 현재 활성화된 메뉴 항목을 중앙에 위치시키기 위해 pos 값을 계산하고, 메뉴를 이동시킵니다.

* **창 크기 변경 이벤트 처리 (handleResize 함수)**  
  * 창 크기가 변경될 때를 감지하여 메뉴를 초기 상태로 되돌립니다.
  * resizeTimer를 사용하여 변경이 완료된 후에만 처리하도록 합니다.

* **스크롤 이벤트 처리 (handleScroll 함수)**
  * 스크롤 이벤트를 처리하여 현재 화면에 표시된 컨텐츠에 해당하는 메뉴 항목을 활성화합니다.
  * 스크롤 위치와 컨텐츠 위치를 비교하여 가장 가까운 메뉴 항목을 활성화합니다.
  * 페이지의 맨 아래에 도달하면 마지막 메뉴 항목을 활성화합니다.

* **메뉴 클릭 이벤트 핸들러 등록 ($menuItems.on('click') 부분)**  
  * 메뉴 항목을 클릭할 때 페이지를 부드럽게 스크롤하여 해당 컨텐츠로 이동합니다.
  * 클릭한 메뉴 항목을 활성화하고, 다른 메뉴 항목의 활성화 상태를 제거합니다.  
<br>


> 예제 확인하기 
> * [https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-22-swiper-menu](https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-22-swiper-menu/)  

> 관련 글  
> * [jQuery - Swiper 스와이프메뉴 클릭하면 가운데오기](/code/2023-10-12-swiper-click/)  
