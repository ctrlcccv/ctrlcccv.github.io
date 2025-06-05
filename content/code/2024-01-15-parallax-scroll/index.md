---
title: jQuery - 패럴렉스 스크롤 예제
description: >  
    패럴렉스 스크롤 효과를 jQuery로 구현하는 방법을 소개합니다. 화면 스크롤에 따라 다른 속도로 움직이는 요소들이 어떻게 시각적인 깊이감을 주는지, 그리고 그 과정에서 jQuery가 어떻게 작동하는지에 대한 설명과 코드 예제를 제공합니다.

slug: 2024-01-15-parallax-scroll
date: 2024-01-15 00:00:00+0000
lastmod: 2024-01-15 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-15-parallax-scroll.webp

categories:
    - jQuery
tags:
    - 배경 효과
---
패럴렉스 스크롤은 사용자의 스크롤 동작에 따라 배경과 전경의 요소들이 서로 다른 속도로 움직이면서 3D 같은 가시적 깊이감을 주는 기술입니다. 웹 디자인에서 이를 활용하면 더욱 몰입감 있고, 생동감 있는 사용자 경험을 제공할 수 있습니다. 이번 글에서는 jQuery를 이용해 간단한 패럴렉스 스크롤 효과를 구현하는 예제를 알아보겠습니다.  

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
<div class="parallax">
    <img src="https://picsum.photos/id/80/2000/2000" alt="배경 이미지" class="bg">
    <p class="fast">빠르게 올라갑니다.</p>
    <p class="slow">느리게 올라갑니다.</p>
</div>

<div class="container">
    <h1>Parallax Scroll</h1>
</div>
```
* **패럴렉스 컨테이너**
  * `parallax` 클래스를 가진 `<div>`는 패럴렉스 효과를 적용할 요소의 컨테이너 역할을 합니다.
  * 배경 이미지(`.bg`), 빠른 텍스트(`.fast`)와 느린 텍스트(`.slow`) 요소들이 포함됩니다.

* **텍스트 요소**
  * `fast`와 `slow` 클래스는 각각 스크롤 속도가 서로 다른 텍스트를 나타냅니다. 이를 통해 스크롤 시 속도 차이를 눈으로 확인할 수 있습니다.

* **컨테이너**
  * `container` 클래스는 패럴렉스 스크롤 제목을 중앙에 표시하는 역할을 합니다.  
<br>

## CSS 스타일
```css
.parallax { overflow: hidden; position: relative; font-size: 0; }
.parallax .bg { position: relative; width: 100%; height: 100vh; z-index: -1; object-fit: cover; }
.parallax .fast, .parallax .slow { position: absolute; top: 50%; left: 50%; font-size: 48px; font-weight: 700; line-height: 1.2; color: #fff; text-align: center; z-index: 1; transform: translate(-50%, -50%); }
.container { display: flex; justify-content: center; align-items: center; position: relative; width: 100%; height: 100vh; background-color: #8ab4f8; text-align: center; }
.container h1 { font-size: 60px; color: #fff; }
```
* **기본 레이아웃**
  * `parallax` 클래스에는 패럴렉스가 적용되는 요소의 포함되는 기본 스타일이 정의되어 있습니다. `overflow: hidden`은 컨테이너 밖으로 벗어나는 이미지가 보이지 않도록 합니다.
  * `bg` 클래스는 배경 이미지로 적용되며, 화면에 꽉 차게 표시됩니다.

* **텍스트 스타일**
  * `fast`와 `slow` 클래스를 가진 텍스트는 절대 위치로 설정되어 `transform: translate(-50%, -50%)`를 통해 가운데 정렬됩니다. zIndex는 배경보다 앞에 오도록 설정합니다.

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
let ypos; // 스크롤 위치를 추적하기 위한 변수입니다.

// 패럴랙스 효과를 관리하는 함수입니다.
function parallax() {
    ypos = $(window).scrollTop(); // 현재 window의 스크롤 위치를 가져옵니다.
    updatePosition('.bg', ypos, 0.8, 'top'); // 배경에 대한 top 위치 업데이트
    updatePosition('.parallax .fast', ypos, 0.2, 'margin-top'); // 빠른 속도로 움직이는 요소 위치 업데이트
    updatePosition('.parallax .slow', ypos, 0.6, 'margin-top'); // 느린 속도로 움직이는 요소 위치 업데이트
}

// 주어진 요소의 위치를 업데이트하는 함수입니다.
function updatePosition(selector, scrollPos, factor, type) {
    $(selector).css(type, `${scrollPos * factor}px`); // 계산된 값을 사용하여 CSS 속성값을 설정합니다.
}

// 스크롤 이벤트가 발생할 때 parallax 함수를 호출합니다.
$(window).on('scroll', function () {
    requestAnimationFrame(parallax);
});

// 초기 실행을 통해 패럴랙스 효과를 활성화합니다.
parallax();
```
* **초기화 및 스크롤 위치 추적**
  * ypos 변수는 스크롤 위치를 추적하는 데 사용됩니다.
  * 페이지 로드 시 parallax 함수를 호출하여 초기 스크롤 위치에 대한 패럴랙스 효과를 적용합니다.

* **패럴랙스 효과 함수**
  * parallax 함수는 스크롤 위치에 따라 배경 이미지 및 움직이는 요소들의 위치를 업데이트합니다.
  * updatePosition 함수를 호출하여 각 요소의 위치를 조절합니다.

* **위치 업데이트 함수 (updatePosition)**
  * selector는 CSS에서 해당 요소를 식별하는 업데이트할 요소의 선택자입니다.
  * scrollPos는 현재 페이지에서의 스크롤 위치입니다.
  * factor는 요소의 움직임에 영향을 주는 계수입니다. 값이 클수록 느리게 움직이며, 0 ~ 1 사이의 수를 사용합니다.
  * type은 CSS 속성을 지정하며, 이 예제에서는 'top' 또는 'margin-top' 중 하나를 선택하여 사용합니다.
  * css 메서드를 사용하여 주어진 요소의 CSS 속성값을 업데이트합니다.
  * scrollPos * factor를 통해 스크롤 위치에 계수를 곱한 값을 적용하여 움직임을 조절합니다.

* **스크롤 이벤트 핸들러**
  * 사용자가 페이지를 스크롤 할 때마다 parallax 함수가 호출되어 패럴랙스 효과를 적용합니다.
  * requestAnimationFrame을 사용하여 부드러운 애니메이션을 구현합니다.  
<br>

## 결론
위에서 설명한 코드를 활용하여 패럴렉스 스크롤 효과를 구현할 수 있습니다. 이 글을 통해 소개된 패럴렉스 스크롤 효과를 웹사이트에 적용해보면서 사용자의 시선을 사로잡는 웹 페이지를 디자인해보시기 바랍니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-15-parallax-scroll/" target="_blank">예제결과 미리보기</a>
</div>

