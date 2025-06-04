---
title: jQuery - 이미지 돋보기 효과 구현하기 (원하는 비율로 확대)
description: >  
    이미지 위에 마우스를 가져다대면 확대된 이미지 일부를 보여주는 돋보기 효과를 jQuery를 통해 구현합니다. 사용자 지정 확대 배율을 적용하며, 이 효과를 통해 상세한 이미지 내용을 쉽게 확인할 수 있습니다.

slug: 2023-12-19-image-zoom3
date: 2023-12-19 00:00:00+0000
lastmod: 2023-12-19 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-19-image-zoom3.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
웹 페이지 내 이미지에 마우스를 가져다 댈 때 해당 부분을 확대해서 보여주는 돋보기 효과는 e-커머스 상품 이미지, 지도, 예술 작품 등 상세 부분이 중요한 콘텐츠에 유용합니다. 이 글에서는 jQuery를 이용하여 간단하게 돋보기 효과를 구현하는 방법을 설명합니다.    

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
<div class="img_wrap">
    <div class="img">
        <img src="https://picsum.photos/id/74/1000/1000" alt="이미지">
        <span class="magnifier"></span>
    
    <div class="img">
        <img src="https://picsum.photos/id/74/1000/1000" alt="이미지">
        <span class="magnifier"></span>
    

```
* **컨테이너 (.img_wrap):**
  * 이미지를 나열하는 외부 컨테이너입니다.
  * 여러 이미지를 감싸고, flex-box 레이아웃으로 내부 이미지 요소들을 수평으로 배치합니다.

* **이미지 박스 (.img):**
  * 개별 이미지와 돋보기 기능을 위한 span 요소를 감싸는 컨테이너입니다.
  * 내부에는 실제 이미지(`img`)와 돋보기 효과를 위한 span(`.magnifier`)이 포함됩니다.

* **이미지 (img):**
  * 실제로 확대될 이미지를 나타내며, `src` 속성에는 이미지의 URL이 지정됩니다.
  * `alt` 속성으로 이미지에 대한 대체 텍스트를 제공합니다.

* **돋보기 (.magnifier):**
  * 돋보기 효과를 보여주는 요소로, CSS와 연동하여 이미지 위에 원형으로 나타나 확대된 부분을 보여줍니다.
  * 기본 상태에서는 숨겨져 있으며, jQuery 코드를 통해 동적으로 나타나게 됩니다.  
<br>

## CSS 스타일
```css
.img_wrap { display: flex; gap:10px; width: 600px; } 
.img { position: relative; width:calc(50% - 5px); margin: 0 auto 0; } 
.img img { display: block; width: 100%; } 
.magnifier { display: none; position: absolute; width: 100px; height: 100px; border-radius: 50%; z-index: 1; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); } 
.magnifier::after { content:''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border: 4px solid #fff; border-radius: 50%; z-index: 2; } 
```
* **컨테이너 레이아웃:**
  * `.img_wrap`는 이미지를 가로로 나열하여 표시하는 컨테이너입니다.
  * flex 속성을 사용하여 내부의 `.img` 요소들이 가로로 배치되도록 합니다.
  * `gap`을 10px로 설정하여 이미지 사이에 간격을 줍니다.
  * 컨테이너의 폭을 600px로 고정합니다.

* **이미지 박스:**
  * `.img`는 각각의 이미지와 그 위에 나타날 돋보기 요소를 감싸는 컨테이너입니다.
  * position을 relative로 설정하여 내부 요소인 돋보기가 올바른 위치에 나타날 수 있게 합니다.
  * width를 `calc(50% - 5px)`로 설정하여 컨테이너 너비의 절반에서 각 간격의 반이 빠진 값으로 지정합니다.

* **이미지 스타일:**
  * `.img img`는 웹 페이지에 표시되는 실제 이미지 스타일을 정의합니다.
  * `display`를 block으로 설정하여 이미지가 새 줄에서 시작하게 합니다.
  * `width: 100%`으로 설정하여 컨테이너 `.img`의 전체 너비를 채웁니다.

* **돋보기 스타일:**
  * `.magnifier`는 이미지 위에 마우스를 올렸을 때 나타나는 돋보기 요소입니다.
  * display를 none으로 설정하여 기본적으로는 숨겨져 있습니다.
  * position을 absolute로 설정하고, 너비와 높이를 100px로 지정하여 크기를 정합니다.
  * `border-radius: 50%`로 돋보기 모양을 원형으로 만듭니다.
  * box-shadow를 적용하여 돋보기가 주목받도록 합니다.
  * z-index를 1로 설정하여 이미지 위에 돋보기가 표시되게 합니다.
  * `::after` 가상 요소를 이용해 돋보기 중앙에 흰색 테두리를 추가합니다.  


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
$(".img").each(function () {
    const zoomFactor = 2; // 확대 배율 설정
    const imageTarget = $(this).find('img'); // 대상 이미지
    const magnifierDiv = $(this).find('.magnifier'); // 돋보기 요소

    // 확대 효과 함수 정의
    function magnify(e) {
        const mousePosX = e.pageX - $(this).offset().left; // 마우스 X 좌표
        const mousePosY = e.pageY - $(this).offset().top; // 마우스 Y 좌표

        // 마우스가 이미지 영역 안에 있는지 확인
        if (mousePosX < $(this).width() && mousePosY < $(this).height() && mousePosX > 0 && mousePosY > 0) {
            magnifierDiv.fadeIn(100); // 돋보기 표시
        } else {
            magnifierDiv.fadeOut(100); // 돋보기 숨기기
        }

        // 돋보기가 보일 때 위치와 배경을 업데이트
        if (magnifierDiv.is(":visible")) {
            const bgPosX = -(mousePosX * zoomFactor - magnifierDiv.width() / 2);
            const bgPosY = -(mousePosY * zoomFactor - magnifierDiv.height() / 2);
            const magnifierPosX = mousePosX - magnifierDiv.width() / 2;
            const magnifierPosY = mousePosY - magnifierDiv.height() / 2;

            magnifierDiv.css({
                "left": magnifierPosX,
                "top": magnifierPosY,
                "background-image": `url('${imageTarget.attr("src")}')`, // 배경 이미지 설정
                "background-repeat": "no-repeat",
                "background-size": `${imageTarget.width() * zoomFactor}px ${imageTarget.height() * zoomFactor}px`, // 배경 크기 설정
                "background-position": `${bgPosX}px ${bgPosY}px`
            });
        }
    }

    // 이미지에 mousemove 이벤트 핸들러 연결
    $(this).on('mousemove', magnify);
});
```
* **초기 설정**
  * `$(".img").each(function () { /*...*/ })` 코드는 페이지에 있는 모든 `.img` 요소에 동작을 적용합니다.
  * `zoomFactor` 변수를 설정하여 이미지가 돋보기에 의해 몇 배로 확대될지 지정합니다.
  
* **돋보기 효과 함수**
  * `function magnify(e) { /*...*/ }`는 돋보기 효과를 실행하는 함수입니다.
  * `mousePosX`와 `mousePosY`를 계산하여 마우스 위치를 추적합니다.
  * `.fadeIn(100)`과 `.fadeOut(100)` 메소드를 사용하여 돋보기 요소의 부드러운 등장과 사라짐 효과를 제어합니다.

* **돋보기 위치 및 배경 설정**
  * 이미지 위에 돋보기가 존재할 경우(`is(":visible")`), 돋보기 요소의 CSS 스타일을 업데이트합니다.
  * `bgPosX`와 `bgPosY`를 계산하여 확대되는 이미지 부분의 배경 위치를 조정합니다.
  * `magnifierPosX`와 `magnifierPosY`를 계산하여 돋보기 요소가 마우스 위치를 중심으로 하도록 합니다.
  * 돋보기의 `background-image`, `background-size`, `background-position` 속성을 업데이트하여 실제로 이미지가 확대되는 듯한 효과를 제공합니다.

* **이벤트 핸들링**
  * `$(this).on('mousemove', magnify)` 코드를 통해 `.img` 요소에 마우스가 움직일 때마다 `magnify` 함수가 호출되어 돋보기 효과가 실행됩니다.   
<br>


## 결론
jQuery와 간단한 HTML/CSS를 사용하여 이미지에 마우스 오버 시 확대 효과를 제공하는 돋보기 기능을 구현했습니다. 사용자에게 상세한 이미지 정보를 사실적으로 제공함으로써, 사이트의 시각적 요소를 강화할 수 있습니다. 이러한 기능은 웹상에서 제품을 더 자세히 보고 싶어 하는 사용자들에게 특히 유용할 것입니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-19-image-zoom3/">예제결과 미리보기</a>
</div>

