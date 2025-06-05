---
title: jQuery - 스크롤 시 특정 위치에서 Fixed (반응형)
description: >  
    jQuery를 사용하여 웹 페이지에서 사용자가 스크롤할 때 특정 요소가 화면의 특정 위치에 고정되는 방법을 설명합니다. 반응형 디자인을 고려한 이 예제는 HTML 구조, CSS 스타일, jQuery 코드를 자세히 다루며, 스크롤 및 창 크기 변경에 반응하는 동적인 웹 페이지 기능 구현을 보여줍니다.
slug: 2023-07-28-scroll-fixed
date: 2023-07-28 00:00:00+0000
lastmod: 2023-07-28 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-07-28-scroll-fixed.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
jQuery를 활용하여 웹 페이지 스크롤 시 특정 요소가 화면의 특정 위치에 고정되는 코드 예제를 소개합니다. 이 예제의 핵심은 사용자가 페이지를 스크롤 할 때 특정 요소가 미리 정해진 위치에 도달하면 화면에 고정되어 계속 보이도록 하는 것입니다.   

예를 들어, 사용자가 페이지를 아래로 스크롤 하는 동안 사이드바의 광고나 메뉴가 특정 지점에 도달하면 그 위치에서 고정되어 나머지 페이지와 독립적으로 스크롤 되지 않습니다. 이러한 기능은 중요한 정보나 기능을 사용자의 시선에 지속적으로 노출시키는 데 매우 유용합니다. 또한, 반응형 디자인을 고려하여 화면 크기에 따라 고정 요소의 동작이 달라지도록 설정되어 있어, 다양한 디바이스와 화면 크기에서도 사용자 경험을 일관되게 유지할 수 있습니다.  

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
<header></header>
<div class="wrap">
    <div class="left"></div>
    <div class="right">
        <div class="fixed_box">고정 요소</div>
    </div>
</div>
<footer></footer>
```
* **header와 footer**  
페이지 상단과 하단을 나타내며, 각각 고정된 높이를 가지고 검은색 배경을 사용합니다.  

* **wrap 클래스**   
메인 컨텐츠를 감싸는 컨테이너로, flex 레이아웃을 사용하여 내부 요소를 정렬합니다.

* **left와 right 클래스**  
메인 컨텐츠를 좌우로 나누는 요소들입니다. Left는 주로 넓은 컨텐츠를, Right는 부가적인 정보를 담는 데 사용됩니다.

* **fixed_box 클래스**  
고정될 요소로, 스크롤에 따라 위치가 변경됩니다. 파란색 배경을 사용합니다.  
<br>

## CSS 스타일
```css
header, footer { height: 300px; background: #000; } 
.wrap { display: flex; align-items: flex-start; width: 1200px; margin: 0 auto; } 
.left { width: 900px; height: 100vh; background: #cdb4db; } 
.right { position: relative; width: 300px; height: 100vh; background: #ffc8dd; } 
.fixed_box { position: absolute; width:300px; height: 500px; background: #a2d2ff; } 

/* 반응형 스타일 예시 -> 1200px 이하에서는 고정 요소가 아래에 배치됩니다. */
@media (max-width: 1200px){
    .wrap { display: block; width: 100%; } 
    .left, .right, .fixed_box { width: 100%; height: 300px; } 
}
```
* **Flexbox 레이아웃**  
wrap 클래스에 flex 레이아웃을 적용하여 내부 요소를 가로로 정렬합니다.  

* **반응형 디자인**   
미디어 쿼리를 사용하여 화면 너비가 1200px 이하일 때는 .wrap, .left, .right, .fixed_box의 너비와 높이를 조정하여 세로로 쌓이도록 합니다.

* **고정 박스 스타일**  
fixed_box는 절대 위치를 사용하여 필요에 따라 화면에 고정됩니다.

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
$(window).on('load', function() {
    const $fixedBox = $('.fixed_box'); // 고정될 박스 요소
    const $footer = $('footer'); // 페이지 하단의 footer 요소
    const $body = $('body'); // 페이지 본문
    const topMargin = 50; // 고정될 때의 상단, 하단 여백
    const breakpoint = 1200; // 반응형 디자인의 기준 너비

    // 고정 박스가 없으면 함수를 종료합니다.
    if (!$fixedBox.length) return;

    // 고정 박스의 초기 상단 위치를 계산합니다.
    let initialTop = $fixedBox.offset().top;

    // 스크롤 위치와 화면 너비에 따라 고정 박스의 위치를 업데이트하는 함수
    const updatePosition = () => {
        const scrollTop = $(window).scrollTop(); // 현재 스크롤 위치
        const footerHeight = $footer.outerHeight(true); // footer의 높이
        const bodyHeight = $body.outerHeight(true); // body의 높이
        // 고정 박스가 위치할 수 있는 최대 높이를 계산합니다.
        const availableHeight = bodyHeight - footerHeight - $fixedBox.outerHeight(true) - initialTop - topMargin;

        // 스크롤 위치와 화면 너비에 따라 고정 박스의 위치를 조정합니다.
        if (scrollTop > initialTop - topMargin && window.innerWidth > breakpoint) {
            if (availableHeight + initialTop - topMargin > scrollTop) {
                $fixedBox.css({ 'position': 'fixed', 'top': `${topMargin}px` });
            } else {
                $fixedBox.css({ 'position': 'absolute', 'top': `${availableHeight}px` });
            }
        } else {
            if (window.innerWidth > breakpoint){
                $fixedBox.css({ 'position': 'absolute', 'top': `0` }); // 고정 박스 위치가 최상단일 때
            }else{
                $fixedBox.css({ 'position': 'static' }); // 화면이 좁을 때는 기본 위치로 설정
            }
        }
    };
    
    // 창 크기가 변경될 때 고정 박스의 위치를 초기화하고 초기 상단 위치를 다시 계산합니다.
    let resizeTimer;
    let isResize = false;
    $(window).on('resize', () => {
        clearTimeout(resizeTimer);
        isResize = true;
        resizeTimer = setTimeout(function() {
            $fixedBox.css({ 'position': 'absolute', 'top': '0' });
            initialTop = $fixedBox.offset().top;
            isResize = false;
            updatePosition();
        }, 100);
    });

    // 스크롤 할 때 위치 업데이트 함수를 호출합니다. (창 크기가 변경되지 않을 때)
    $(window).on('scroll', function() {
        if(isResize == false){
            updatePosition();
        }
    });

    updatePosition();
});
```
* **변수 초기화 및 설정**  
  * $fixedBox  
  .fixed_box를 선택합니다. 스크롤에 반응하는 고정될 요소입니다.  

  * $footer  
  footer를 선택합니다. 페이지 하단을 나타냅니다.  

  * $body  
  body를 선택합니다. 전체 페이지 본문을 나타냅니다.  

  * topMargin  
  상단 여백은 50px로 설정됩니다.  

  * breakpoint  
  반응형 디자인의 화면 너비 기준은 1200px입니다.  

  * initialTop  
  $.offset().top을 사용하여 고정 박스의 초기 상단 위치를 계산합니다.  

* **조건 확인**  
  * if (!$fixedBox.length) return  
  고정 박스가 존재하지 않는 경우 함수 실행을 중단합니다.

* **고정 박스 위치 업데이트 함수 (updatePosition)**
  * scrollTop  
  $(window).scrollTop()으로 문서 스크롤 위치를 나타냅니다.

  * footerHeight, bodyHeight  
  .outerHeight(true)로 footer와 body의 높이를 저장합니다.

  * availableHeight  
  body 높이에서 footer 높이, 고정 박스 높이, 초기 top 위치, 상단 여백을 빼서 계산합니다.

  * 스크롤 위치와 화면 너비에 따라 고정 박스의 위치를 조정합니다.
  * 스크롤이 고정 박스 초기 위치를 넘고 화면 너비가 반응형 기준점을 초과할 때 고정합니다.
  * 고정 박스가 footer 영역에 도달하지 않았다면, 상단 여백만큼 떨어진 위치에 고정합니다.
  * 그 외의 경우에는 고정 박스를 기본 위치로 돌려놓습니다.

* **창 크기 변경 대응**  
  * $(window).on('resize', ...)  
  창 크기가 변경될 때마다 이벤트 핸들러를 호출하여 고정 박스의 위치를 재조정합니다.

* **이벤트 핸들링**  
  * $(window).on('resize scroll', updatePosition)  
  윈도우 객체에 'scroll' 이벤트를 바인딩하여 사용자가 스크롤 할 때마다 위치 업데이트 함수를 호출합니다.

<br>

## 결론
jQuery를 활용하여 스크롤에 반응하는 요소를 웹 페이지에서 고정시키는 방법을 상세하게 설명했습니다. 주요 포인트로는, 특정 요소의 동적인 위치 조정, 반응형 디자인에 맞춘 동작, 그리고 스크롤 및 창 크기 변화에 따른 적절한 위치 업데이트가 있습니다. 이러한 기법은 사용자의 스크롤 동작에 따라 중요한 콘텐츠를 계속해서 눈에 띄게 유지하는 데 매우 유용하며, 다양한 화면 크기와 장치에서도 일관된 사용자 경험을 제공합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-28-scroll-fixed/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-12-02-fixed-scroll/">[관련글] jQuery - 가로 스크롤에 따라 fixed 요소 위치 조정</a>
</div>
