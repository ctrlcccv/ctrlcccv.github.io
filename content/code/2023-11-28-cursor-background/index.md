---
title: jQuery - 마우스 따라 움직이는 배경 이미지
description: >  
    jQuery를 사용하여 마우스 움직임에 따라 배경 이미지와 텍스트가 움직이는 패럴랙스 효과를 구현하는 방법을 설명합니다. 이러한 인터랙티브 요소는 사용자 참여를 유도하고 웹사이트를 보다 몰입감 있는 공간으로 만듭니다.  
slug: 2023-11-28-cursor-background
date: 2023-11-28 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-28-cursor-background2.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
jQuery를 활용하여 마우스 움직임에 따라 배경 이미지와 텍스트가 움직이는 패럴랙스 효과를 구현하는 방법을 소개합니다.
마우스 움직임에 반응하는 동적 요소가 사용자 참여를 유도하고, 더 몰입감 있는 브라우징 경험을 제공합니다.  
<br>

## HTML 구조
```html
<div id="container">
    <img src="https://unsplash.it/800/800?random=" alt="배경 이미지" class="bg">
    <h1 class="title">타이틀</h1>
</div>
```
* **컨테이너** : container 아이디는 배경 이미지와 타이틀을 감싸며 패럴랙스 효과의 기준점이 됩니다.
* **배경 이미지 요소** : img 클래스는 웹 페이지의 배경 이미지로 사용됩니다.
* **타이틀 요소** : title 클래스는 페이지의 타이틀을 표시합니다.  

<br>

## CSS 스타일
```css
#container { overflow: hidden; display: flex; justify-content: center; align-items: center; position: relative; width: 600px; height: 600px; margin: 50px auto 0; } 
#container .bg { width: 800px; height: 800px; } 
#container .title {position: absolute;top: 50%;left: 50%;margin-top: -33px;margin-left: -63px;font-size: 46px; font-weight: 700;color: #fff; text-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }
```
* **컨테이너 스타일링**   
container 아이디는 중앙 정렬되며, 내부 요소가 벗어나지 않도록 overflow: hidden 속성이 적용됩니다.

* **배경 이미지 스타일링**  
bg 클래스를 통해 배경 이미지의 크기와 위치가 설정됩니다. 이미지의 크기는 움직이는 범위에 맞춰 설정합니다.

* **타이틀 스타일링**  
title 클래스는 타이틀의 시각적 요소를 정의합니다.

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
// #container 요소를 선택합니다.
const containerSelector = '#container';
const $container = $(containerSelector);
// container의 위치와 크기 정보를 얻습니다.
let bounds = $container[0].getBoundingClientRect();
// 마우스 위치와 움직임 여부를 추적하는 객체를 초기화합니다.
const mousePos = { x: 0, y: 0, hasMoved: false };

// #container 위에서 마우스가 움직일 때마다 마우스 위치를 업데이트합니다.
$(document).on('mousemove', containerSelector, function(e) {
    mousePos.hasMoved = true;
    mousePos.x = e.clientX - bounds.left;
    mousePos.y = e.clientY - bounds.top;
});

// 특정 대상에 패럴랙스 효과를 적용하는 함수입니다.
function applyParallax(target, moveFactor) {
    const xMovement = (mousePos.x - bounds.width / 2) / bounds.width * moveFactor;
    const yMovement = (mousePos.y - bounds.height / 2) / bounds.height * moveFactor;
    $(target).css('transform', `translate(${xMovement}px, ${yMovement}px)`);
}

// 패럴랙스 효과를 지속적으로 새로 고칩니다.
function refreshParallax() {
    if (mousePos.hasMoved) {
        applyParallax('.bg', -200);
        applyParallax('.title', -100);
        mousePos.hasMoved = false;
    }

    requestAnimationFrame(refreshParallax);
}

// 윈도우의 크기가 변경되거나 스크롤 할 때 bounds를 업데이트합니다.
$(window).on('resize scroll', function() {
    bounds = $container[0].getBoundingClientRect();
});

// 패럴랙스 애니메이션을 시작합니다.
refreshParallax();
```
* **마우스 위치 추적**  
  * mousemove 이벤트를 이용하여 마우스의 x, y 좌표를 실시간으로 추적합니다.
  * 추적된 마우스 위치는 mousePos 객체에 저장되며, 이는 배경 이미지와 텍스트의 움직임 계산에 사용됩니다.

* **패럴랙스 효과 구현**  
  * applyParallax 함수를 통해 요소에 변형을 적용합니다.
  * 마우스 위치에 따라 요소의 위치를 계산하고, CSS의 transform 속성을 사용하여 이동 효과를 생성합니다.  
  * applyParallax('.bg', -200) : 배경 이미지(.bg)에 패럴랙스 효과를 적용합니다. -200은 배경 이미지가 마우스 움직임에 따라 움직일 수 있는 최대 거리를 나타냅니다. 거리 수치를 음수 대신 양수로 입력하면 움직이는 방향을 반대로 변경할 수 있습니다.

* **애니메이션 효과의 지속성**  
  * requestAnimationFrame을 활용하여 refreshParallax 함수를 반복 호출합니다. 이 함수는 마우스 움직임을 감지하고, 해당 움직임에 따라 applyParallax 함수를 호출하여 요소들의 위치를 업데이트합니다. 이를 통해 부드럽고 연속적인 애니메이션 효과가 유지됩니다.
  * refreshParallax는 마우스의 움직임을 체크하고, 움직임이 있을 때 요소의 위치를 업데이트한 후 mousePos.hasMoved를 false로 재설정하여 다음 움직임을 대기합니다.

* **창 크기 조정 및 스크롤 이벤트 처리**  
  * 사용자가 브라우저 창을 조정하거나 스크롤 할 때마다 container 아이디의 경계를 재계산합니다.
  * 패럴랙스 효과의 정확도를 유지하기 위해 필요합니다.  
<br>

## 결론
배경 이미지와 텍스트의 동적 움직임은 웹사이트에 새로운 차원의 상호작용을 가져다줍니다. 마우스의 각 움직임이 화면 상의 요소들과 연동되어, 사용자가 웹 페이지의 일부가 되는 듯한 경험을 제공합니다. 이는 단순한 기능적 구현을 넘어, 사용자의 참여를 끌어내고 감각적인 반응을 이끌어내는 예술적 접근입니다. 이러한 인터랙티브한 요소는 웹사이트를 단순한 정보의 전달 수단이 아닌, 사용자와의 활발한 상호작용이 일어나는 공간으로 변모시킵니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-28-cursor-background/">예제결과 미리보기</a>
</div>