---
title: >  
    jQuery - 페이지 스크롤에 따라 진행 표시줄 표시하기
description: >  
    jQuery를 이용해서 페이지 상단에 고정된 위치에 스크롤에 따라 너비가 변하는 프로그레스 바를 구현하는 방법에 대해 상세하게 알아보겠습니다.
slug: 2024-01-18-scroll-progress
date: 2024-01-18 00:00:00+0000
lastmod: 2024-01-18 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-18-scroll-progress.webp

categories:
    - jQuery
tags:
    - 진행 표시줄
---
웹 페이지를 스크롤 할 때 사용자의 위치를 가시적으로 나타내주는 프로그레스 바(진행 표시줄)는 사용자 경험을 향상시키는 아주 효과적인 방법입니다. 이러한 표시줄은 사용자가 문서 내에서 어디쯤 있는지, 얼마나 많은 내용을 소비했는지 한눈에 파악할 수 있도록 도와줍니다. 이 글에서는 jQuery를 이용해서 페이지 상단에 고정된 위치에 스크롤에 따라 너비가 변하는 프로그레스 바를 구현하는 방법에 대해 상세하게 알아보겠습니다.  

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
<div class="progress">
    <div class="bar"></div>
</div>
```
* **프로그레스 컨테이너**
  * 클래스 `progress`로 지정된 `<div>` 요소는 프로그레스 바의 외부 컨테이너 역할을 합니다.

* **프로그레스 바**
  * `progress` 내부의 `<div class="bar">` 요소는 실제로 사용자의 스크롤 진행 상황을 나타내기 위해 너비가 변하는 내부 바입니다.   
<br>  

## CSS 스타일

CSS 설정을 통해 프로그레스 바 컨테이너가 항상 페이지 상단에 고정되어 내용을 스크롤 해도 사라지지 않고, 내부 바는 초기에 너비가 0%로 설정되어 있어 스크롤을 진행하기 전에는 보이지 않습니다. 

```css
.progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: #c8c8c8;
    z-index: 1;
}
.progress .bar {
    width: 0%;
    height: 10px;
    background-color: #003366;
}
```
* **프로그레스 컨테이너 스타일**
  * `position: fixed`를 통해 항상 브라우저 창 상단에 고정됩니다.
  * `width: 100%`으로 브라우저 창의 전체 너비를 차지하게 합니다.
  * `background-color: #c8c8c8`는 프로그레스 바의 배경 색을 설정하여, 프로그레스 바가 채워지지 않은 부분의 모습을 결정합니다.

* **프로그레스 바 스타일**
  * 초기에 `width: 0%`로 설정하여 페이지 로딩 시에 보이지 않습니다.
  * `background-color: #003366`는 프로그레스 바 자체의 색상을 설정합니다.    
<br>

## jQuery 코드

주요 기능인 프로그레스 바의 진행 상황을 업데이트하는 것은 `updateProgressBar` 함수를 통해 구현되며, 사용자가 스크롤을 할 때마다 이 함수가 호출되어 내부 바의 너비가 업데이트됩니다.

```js
function updateProgressBar() {
    const documentHeight = $(document).height(); // 문서의 총 높이
    const windowHeight = $(window).height(); // 윈도우 창의 높이
    // 현재 스크롤된 위치를 계산
    const scrollPosition = $(window).scrollTop();
    // 스크롤된 비율을 계산
    const scrolledPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
    // 프로그레스 바의 너비를 스크롤 비율에 따라 조정
    $(".progress .bar").css('width', scrolledPercentage + "%");
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

* **문서와 윈도우 요소의 높이 측정**
  * 문서의 전체 높이를 `$(document).height()`로 가져옵니다.
  * 브라우저 윈도우의 높이는 `$(window).height()`를 통해 측정됩니다.

* **스크롤 위치 계산**
  * `$(window).scrollTop()`을 사용하여 현재 사용자가 스크롤 한 위치를 알아냅니다. 

* **스크롤된 비율 계산**
  * `scrollPosition / (documentHeight - windowHeight)`를 통해 전체 문서 대비 스크롤 된 위치의 비율을 계산합니다. 

* **프로그레스 바 업데이트**
  * 계산된 비율 값에 따라 `$(".progress .bar").css('width', scrolledPercentage + "%")`를 사용하여 프로그레스 바의 너비를 실시간으로 업데이트합니다.

* **스크롤 이벤트 바인딩**
  * `$(window).on('scroll', updateProgressBar);`이 부분이 스크롤 이벤트에 함수를 연동시키는 중요한 코드로서, 사용자가 스크롤을 할 때마다 프로그레스 바가 업데이트됩니다.    

<br>

## 결론
이 코드를 통해 사용자는 웹 페이지를 스크롤 하면서 페이지의 진행 상황을 상단의 프로그레스 바로 쉽게 확인할 수 있습니다. 글 읽기나 콘텐츠 탐색 중에 위치를 잃지 않고, 얼마나 더 스크롤 해야 하는지 등의 정보를 직관적으로 파악할 수 있습니다.   

다양한 화면 크기와 디자인, 요구 조건을 충족시키는 커스터마이징이 가능하므로, 실제 웹 페이지나 애플리케이션에 맞게 프로그레스 바의 디자인과 기능을 조정하여 사용할 수 있습니다.   
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-18-scroll-progress/" target="_blank">예제결과 미리보기</a>
</div>
