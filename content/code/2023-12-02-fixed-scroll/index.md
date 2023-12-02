---
title: jQuery - 가로 스크롤에 따라 fixed 요소 위치 조정
description: >  
    
slug: 2023-12-02-fixed-scroll
date: 2023-12-02 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-02-fixed-scroll.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
웹 페이지 디자인에서 고정 요소(Fixed elements)는 사용자 인터페이스의 중요한 부분을 이룹니다. 특히, 사용자가 페이지를 탐색할 때 항상 보이는 정보나 컨트롤을 제공하는 데 유용합니다. 이번 글에서는 jQuery를 활용하여 가로 스크롤 시 고정 요소의 위치를 조정하는 방법을 소개합니다. 이 기법은 사용자가 페이지를 가로로 스크롤 할 때 고정 요소가 화면에 계속 보이게 하면서 동시에 다른 내용이 가려지지 않도록 하는 데에 목적이 있습니다. 이러한 방식은 특히 넓은 화면 레이아웃이나 대용량의 데이터를 표시해야 하는 대시보드, 리포트 페이지에서 유용합니다.  
<br>

## HTML 구조
```html
<div class="wrap">
    <div class="left">브라우저 화면 크기 1000px 이하에서<br>오른쪽으로 스크롤 하여 고정 요소를 확인해보세요.</div>
    <div class="right">
        <div class="fixed_box">고정 요소</div>
    </div>
</div>
```
* **wrap 클래스**   
주요 컨테이너로 전체 레이아웃을 감싸며, display: flex를 사용해 내부 요소들을 수평으로 정렬합니다.

* **left 클래스**  
주요 내용을 담는 왼쪽 영역입니다. 800px의 고정 너비를 가지고 배경색으로 구분됩니다.

* **right 클래스**  
고정 요소를 포함하는 부분으로, 200px의 너비를 가집니다. 이 영역 안에 고정 요소가 위치합니다.

* **fixed_box 클래스**   
실제 고정되는 요소로, 사용자가 스크롤을 할 때 위치가 조정됩니다.  
<br>

## CSS 스타일
```css
.wrap { display: flex; align-items: flex-start; width: 1000px; margin: 0 auto; } 
.left { width: 800px; height: 100vh; background: #cdb4db; } 
.right { width: 200px; height: 100vh; background: #ffc8dd; } 
.fixed_box { position: fixed; width:200px; height: 200px; background: #a2d2ff; } 
```
* **wrap 클래스**  
  * 용도 : 주요 레이아웃을 정의하는 컨테이너입니다. .left와 .right 섹션을 수평으로 정렬합니다.
  * 스타일 : display: flex를 사용하여 내부 요소들을 가로 방향으로 정렬합니다. align-items: flex-start로 아이템들을 컨테이너의 상단에 맞춥니다.
  * 크기 : width: 1000px로 너비를 고정하고, 자동 마진을 통해 중앙 정렬합니다.  

* **left 클래스**  
  * 용도 : 페이지의 주요 내용을 담는 섹션입니다.
  * 스타일 : height: 100vh로 뷰포트 높이에 맞춰 전체 높이를 설정하고, background: #cdb4db로 구분이 쉬운 배경색을 적용합니다.
  * 크기 : width: 800px로 고정 너비를 설정합니다.

* **right 클래스**  
  * 용도 : 고정 요소를 포함하는 섹션입니다. .left 영역 옆에 있습니다.
  * 스타일 : background: #ffc8dd로 배경색을 다르게 하여 시각적으로 구분합니다.
  * 크기 : width: 200px로 너비를 설정하고, height: 100vh로 뷰포트 높이에 맞춰 전체 높이를 설정합니다.

* **fixed_box 클래스**  
  * 용도 : 고정되어야 하는 요소를 정의합니다. 스크롤에 따라 위치가 변하지 않도록 설정됩니다.
  * 스타일 : position: fixed를 사용하여 항상 같은 위치에 고정합니다.  

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
```js
const fixedBox = $(".fixed_box"); // 고정 요소 선택
let lastScroll = 0; // 마지막 스크롤 위치 저장

$(window).on('scroll', function() {
    const currentScroll = $(this).scrollLeft(); // 현재 스크롤 위치

    // 위치 변경 시 요소 이동
    if (currentScroll !== lastScroll) {
        fixedBox.css("margin-left", -currentScroll);
        lastScroll = currentScroll;  // 위치 업데이트
    }
});
```
* **변수 선언**  
  * fixedBox : 고정될 요소를 선택하는 jQuery 객체입니다.
  * lastScroll : 마지막 스크롤 위치를 저장하는 변수입니다.

* **스크롤 이벤트 핸들링**  
  * $(window).on('scroll', function() {...}) : 윈도우의 스크롤 이벤트를 감지합니다. 사용자가 스크롤 할 때마다 이 함수가 실행됩니다.
  * currentScroll 계산 : $(this).scrollLeft()를 사용하여 현재 수평 스크롤 위치를 측정합니다.

* **요소 위치 조정**  
  * 조건 확인 : if (currentScroll !== lastScroll) {...}을 통해 현재 스크롤 위치가 마지막으로 기록된 위치와 다른지 확인합니다.
  * 요소 이동 : fixedBox.css("margin-left", -currentScroll)로 .fixed_box의 왼쪽 마진을 현재 스크롤 위치의 음수 값으로 설정합니다. 이로써 스크롤에 따라 요소가 움직이게 됩니다.
  * 위치 업데이트 : lastScroll = currentScroll로 현재 스크롤 위치를 저장하여, 다음 이벤트에 사용합니다.  
<br>

## 결론
이 예제는 jQuery를 활용하여 가로 스크롤에 따른 고정 요소의 위치 조정을 보여줍니다. 이 방법은 사용자의 스크롤 동작에 반응하여 특정 요소를 고정하면서 사용자 경험을 해치지 않는 유연한 디자인을 구현할 수 있게 합니다.   

이러한 접근 방식은 가로 스크롤 시에도 중요한 정보나 컨트롤이 사용자에게 지속적으로 노출되도록 보장함으로써, 특히 대량의 정보를 다루는 웹사이트나 애플리케이션에서 사용자의 효율성과 만족도를 높이는 데 크게 기여합니다. 또한, 이와 같은 기능은 사용자가 원하는 정보에 더 쉽게 접근할 수 있게 함으로써, 전반적인 웹사이트 사용성을 개선하는 효과적인 수단이 됩니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-02-fixed-scroll/">예제결과 미리보기</a>
</div>
