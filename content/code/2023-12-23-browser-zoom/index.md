---
title: jQuery - 브라우저 화면 확대, 축소 (파이어폭스 지원)
description: >  
    jQuery를 사용하여 웹페이지의 특정 요소를 사용자가 직접 확대 및 축소할 수 있는 인터랙션을 구현하고, 파이어폭스 브라우저를 포함한 다양한 브라우저에서 작동하는 코드에 대해 설명합니다.

slug: 2023-12-23-browser-zoom
date: 2023-12-23 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-23-browser-zoom.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
웹사이트 사용자에게 컨텐츠를 더 세밀하게 볼 수 있는 기능을 제공하는 것은 사용자 친화적인 인터페이스 설계에 매우 중요합니다. 이 글에서는 jQuery를 이용하여 사용자가 웹페이지의 특정 부분의 확대 및 축소를 제어할 수 있는 기능을 소개합니다. 이 기능은 파이어폭스를 포함하여 대부분의 브라우저에서 호환됩니다.  
<br>

## HTML 구조

```html
<div class="wrap">
    <div class="zoom">
        <h1>확대 / 축소 예제</h1>
        <p>zoom 클래스의 요소가 확대 및 축소됩니다.</p>
        <p>
            일부 레이아웃은 크기 변경 후 업데이트 작업이 필요합니다.<br>
            예를 들어 swiper 슬라이드는 observer: true, observeParents: true 옵션과 함께 사용해야 합니다.
        </p>
    </div>
</div>
<div class="btn_wrap">
    <button class="zoom_in">확대(+)</button>
    <button class="zoom_out">축소(-)</button>
</div>
```
* **컨텐츠 요소**
  * `zoom` 클래스를 가진 `div` 요소는 확대 및 축소가 적용될 대상입니다.
  * 사용자가 확대 및 축소를 직접 제어할 수 있도록 확대(+) 및 축소(-) 버튼이 제공됩니다.

* **버튼 컨테이너**
  * `btn_wrap` 클래스를 가진 `div`는 페이지에 고정된 위치에 버튼을 배치하여 언제든지 접근할 수 있게 합니다.  
<br>

## CSS 스타일
```css
.wrap { width: 50%; margin: 0 auto; }
.zoom { padding:30px; background: #d5e5ff; border-radius:15px; text-align: center; transform-origin: top left; word-break: keep-all; }
.btn_wrap { position: fixed; top: 10px; right: 10px; z-index: 1; }
.btn_wrap button { margin: 5px; padding: 10px; background-color: #007BFF; border: none; border-radius: 5px; font-size: 16px; color: #fff; cursor: pointer; }
.btn_wrap button:hover { background-color: #0066CC; }
```
* **레이아웃 스타일링**
  * `wrap` 클래스는 확대/축소되는 컨텐츠의 너비를 정의합니다.
  * `zoom` 클래스는 확대/축소될 요소의 스타일을 지정합니다. 특히, `transform-origin` 속성으로 확대/축소의 기준점을 정합니다.

* **버튼 스타일링**
  * 버튼 컨테이너인 `btn_wrap`은 화면 오른쪽 상단에 고정되어 있으며, z-index를 통해 다른 요소들 위에 있습니다.
  * 버튼에는 배경색, 굴곡, 글꼴 크기, 색상 스타일이 있습니다.   

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
// 확대/축소를 위한 초기 비율과 기준점 지정
let currentScale = 1;
const maxZoomInScale = 1.5;
const minZoomOutScale = 0.5;

// 확대 버튼 클릭 이벤트 핸들러
$('.zoom_in').click(function() {
    if (currentScale.toFixed(1) < maxZoomInScale) {
        currentScale += 0.1;
        updateZoom();
    }
});

// 축소 버튼 클릭 이벤트 핸들러
$('.zoom_out').click(function() {
    if (currentScale.toFixed(1) > minZoomOutScale) {
        currentScale -= 0.1;
        updateZoom();
    }
});

// 확대/축소 업데이트 함수
function updateZoom() {
    const zoomContainer = $('.zoom');
    if (/firefox/i.test(navigator.userAgent)) {
        // 파이어폭스 브라우저인 경우 transform을 사용
        zoomContainer.css({
            transform: `scale(${currentScale})`,
            width: `${100 / currentScale}%`
        });
    } else {
        // 다른 브라우저는 zoom 속성을 사용
        zoomContainer.css('zoom', currentScale);
    }
}

// 초기 확대/축소 업데이트 실행
updateZoom();
```
* **변수 선언 및 초기화**
  - `currentScale`은 현재 확대/축소비율을 저장하고, 초깃값으로 1을 할당합니다. 즉, 원래 크기대로 시작합니다.
  - `maxZoomInScale` 담는 변수는 확대할 수 있는 최대 배율을 정의합니다. 이 예시에서는 최대 1.5배까지 확대할 수 있습니다.
  - `minZoomOutScale`에는 축소할 수 있는 최소 배율을 저장합니다. 여기서는 최소 0.5배까지 축소할 수 있습니다.
  
* **버튼 클릭 이벤트 처리**
  - 확대(`.zoom_in`) 및 축소(`.zoom_out`) 버튼에 대한 클릭 이벤트를 각각 바인드합니다.
  - 클릭 시 각 버튼은 `currentScale` 값을 적절히 증가시키거나 감소시키고, `updateZoom` 함수를 호출하여 화면에 변경 사항을 적용합니다.
  - 조건문을 통해 현재 비율이 최대 또는 최소 배율을 넘지 않도록 제한합니다.

* **확대/축소 적용 함수**
  - `updateZoom` 함수는 확대/축소된 크기를 적용하기 위한 로직을 담고 있습니다.
  - 브라우저의 종류에 따라 확대/축소를 적용하는 방법이 분기 처리됩니다.
  - 파이어폭스의 경우 `transform` CSS 속성을 사용하고, 너비(width)도 현재 배율에 맞추어 조정합니다.
  - 파이어폭스가 아닌 경우 `zoom` 속성을 CSS에 직접 적용하여 확대/축소를 구현합니다.

* **브라우저 호환성**
  - 사용자의 브라우저가 파이어폭스인지 확인하기 위해 `navigator.userAgent`에 대한 정규표현식 검사를 사용합니다. 파이어폭스일 경우 `true`를 반환합니다.  
<br>


## 결론
이 글을 통해 jQuery를 활용하여 웹페이지에서 사용자가 직접 확대 및 축소를 제어할 수 있는 기능을 구현하는 방법을 알아보았습니다. 이 예제는 사용자 인터페이스의 접근성과 편의성을 향상시키기 위해 중요한 요소이며, 크로스 브라우저 호환성까지 고려한 구현법을 제시합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-23-browser-zoom/">예제결과 미리보기</a>
</div>