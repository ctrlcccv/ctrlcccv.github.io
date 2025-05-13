---
title: jQuery - 스크롤 내리면 나타나는 텍스트
description: >  
    jQuery를 활용하여 스크롤에 따라 텍스트 스타일이 변하는 웹 기능을 설명합니다. 스크롤에 반응하는 불투명도, 크기, 위치 변화 구현 방법과 사용자 경험에 미치는 영향을 다룹니다.
slug: 2023-11-22-scroll-text
date: 2023-11-22 00:00:00+0000
lastmod: 2023-11-22 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-22-scroll-text.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
이 글에서는 jQuery를 활용하여 특정한 스크롤 동작에 반응하여 텍스트의 스타일이 변화하는 웹 페이지 기능을 소개합니다. 사용자가 페이지를 스크롤 할 때마다 텍스트의 불투명도, 크기, 그리고 위치가 동적으로 변하도록 구현되었습니다.  


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
<div class="content">
    <p class="scroll_txt type_fade">스크롤을 내리면 텍스트가 나타납니다.</p>
    <p class="scroll_txt type_size">스크롤을 내리면 텍스트의 크기가 변경됩니다.</p>
    <p class="scroll_txt type_right">스크롤을 내리면 텍스트가 오른쪽에서 왼쪽으로 이동합니다.</p>
</div>
<div class="content2">
    <p class="scroll_txt type_bottom">스크롤을 내리면 텍스트가 아래에서 위로 이동합니다.</p>
</div>
```
* div 태그는 .content와 .content2 클래스를 가지며, 각각 여러 p 태그를 포함합니다.
* 각 p 태그는 scroll_txt 클래스와 추가적인 클래스 (type_fade, type_size, type_right, type_bottom)를 가지고 있습니다.
* 이 추가적인 클래스들은 jQuery를 통해 스타일이 변경될 특정 텍스트 요소들을 구별하는 데 사용됩니다.  
<br>

## CSS 스타일
```css
.content {overflow: hidden;}
.content2 {overflow: hidden;padding-bottom: 140px;margin-bottom: -140px;}
.scroll_txt {text-align: center;font-size: 24px;font-weight: 700;padding:50px 0; }
```
* .content와 .content2 클래스는 요소가 화면 밖으로 벗어난 부분을 숨기는 속성을 가지고 있습니다.
* .scroll_txt 클래스는 텍스트에 대한 기본 스타일을 설정합니다.  

<br>

## jQuery 코드
```js
// elements 배열을 정의합니다.
// 이 배열에는 여러 HTML 요소와 그에 대한 스타일 변화의 정보가 담겨 있습니다.
const elements = [
    // 첫 번째 요소: 페이드 효과가 있는 스크롤 텍스트
    {
        $element: $('.scroll_txt.type_fade'),
        opacity: 60, // 불투명도 전환 위치 설정 (%) => 요소가 화면의 60% 이상 올라가면 opacity 속성의 값이 1로 설정되어 완전히 보이게 됩니다.
    },
    // 두 번째 요소: 크기 변화가 있는 스크롤 텍스트
    {
        $element: $('.scroll_txt.type_size'),
        initScale: 200, // 초기 크기 비율 (%)
        finalScale: 100, // 최종 크기 비율 (%)
    },
    // 세 번째 요소: 오른쪽에서 왼쪽으로 이동하는 스크롤 텍스트
    {
        $element: $('.scroll_txt.type_right'),
        initTranslateX: 100, // 초기 X축 이동 거리 (px)
        finalTranslateX: 0, // 최종 X축 이동 거리 (px)
    },
    // 네 번째 요소: 아래에서 위로 이동하는 스크롤 텍스트
    {
        $element: $('.scroll_txt.type_bottom'),
        initTranslateY: 140, // 초기 Y축 이동 거리 (px)
        finalTranslateY: 0, // 최종 Y축 이동 거리 (px)
    },
];

// 기본값 설정: 속성이 정의되지 않은 경우 기본값을 할당합니다.
elements.forEach(element => {
    element.opacity = element.opacity || 40;
    element.initScale = element.initScale || 100;
    element.finalScale = element.finalScale || 100;
    element.initTranslateX = element.initTranslateX || 0;
    element.finalTranslateX = element.finalTranslateX || 0;
    element.initTranslateY = element.initTranslateY || 0;
    element.finalTranslateY = element.finalTranslateY || 0;
});

$(window).scroll(() => {
    const windowHeight = window.innerHeight; // 브라우저 창의 높이
    const scrollHeight = document.documentElement.scrollHeight; // 문서 전체의 높이
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // 현재 스크롤 위치

    // elements 배열의 각 요소에 대해 스크롤에 따른 스타일 변화를 적용합니다.
    elements.forEach(({ $element, opacity, finalScale, initScale, initTranslateX, finalTranslateX, initTranslateY, finalTranslateY }) => {
        const opacityThreshold = windowHeight * opacity / 100; // 불투명도 적용 임곗값 계산

        $element.each(function() {
            const elemTop = this.getBoundingClientRect().top; // 요소의 상단 위치
            const distance = Math.max(0, windowHeight - elemTop); // 요소와 창 하단 사이의 거리
            let opacity, scale, translateX, translateY;

            // 스크롤 위치에 따라 스타일을 조정합니다.
            if (distance >= opacityThreshold || scrollTop + windowHeight >= scrollHeight) {
                // 불투명도와 변환을 최종값으로 설정
                opacity = 1;
                scale = finalScale / 100;
                translateX = finalTranslateX;
                translateY = finalTranslateY;
            } else if (distance > 0) {
                // 거리에 따라 불투명도와 변환을 점진적으로 조정
                const distanceRatio = distance / opacityThreshold;
                opacity = distanceRatio;
                scale = (distanceRatio * (finalScale - initScale) + initScale) / 100;
                translateX = distanceRatio * (finalTranslateX - initTranslateX) + initTranslateX;
                translateY = distanceRatio * (finalTranslateY - initTranslateY) + initTranslateY;
            } else {
                return;
            }

            // 계산된 스타일을 적용합니다.
            $(this).css({
                opacity: opacity.toFixed(2),
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale.toFixed(2)})`
            });
        });
    });
});
```
jQuery 코드의 주요 구성 요소와 기능은 다음과 같습니다.  


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

### 요소 배열 정의  
elements 배열은 특정 HTML 요소들과 그들에 적용할 스타일 변화 정보를 담고 있습니다.

```js
const elements = [
    {
        $element: $('.element'),
        opacity: 40, // 불투명도 전환 위치 설정 (%)
        initScale: 100, // 초기 크기 비율 (%)
        finalScale: 100, // 최종 크기 비율 (%)
        initTranslateX: 0, // 초기 X축 이동 거리 (px)
        finalTranslateX: 0, // 최종 X축 이동 거리 (px)
        initTranslateY: 0, // 초기 Y축 이동 거리 (px)
        finalTranslateY: 0, // 최종 Y축 이동 거리 (px)
    },
];
```
이 배열에는 jQuery 선택자를 이용하여 특정한 HTML 요소들을 선택하고, 이들에 적용할 스타일 변화 정보를 설정합니다. 각 요소는 불투명도, 크기, 위치 등의 변화를 위한 속성을 가지며, 이러한 속성들은 스크롤에 따라 동적으로 적용됩니다. initTranslateX 속성과 initTranslateY 속성을 음수로 설정하면 이동 시작 방향을 변경할 수 있습니다.  

이 방식으로 여러 속성을 조합하여 다양한 스크롤 효과를 구현할 수 있습니다. 예를 들어, 텍스트의 불투명도를 변경하거나, 크기를 조절하거나, 위치를 이동시키는 등의 효과를 결합할 수 있습니다.  

* **스크롤 이벤트 처리**  
  * $(window).scroll() 함수는 사용자가 스크롤 할 때 실행됩니다.
  * 이 함수 내에서, 브라우저 창의 높이, 문서의 전체 높이, 현재 스크롤 위치 등이 계산됩니다.

* **스타일 적용 로직**  
  * forEach 메서드를 사용해 elements 배열의 각 요소에 대한 스타일 변화를 처리합니다.
  * 각 요소의 상단 위치는 getBoundingClientRect().top을 통해 계산되고, 이를 바탕으로 불투명도, 크기, 위치 변화가 계산됩니다.
  * 스크롤 위치에 따라 요소의 불투명도, 크기, 위치가 점진적으로 변화합니다.
  * 계산된 스타일은 jQuery의 css() 메서드를 사용해 적용됩니다.  
<br>

## 결론
스크롤에 따라 변화하는 텍스트는 사용자의 주의를 끌고 페이지와의 상호작용을 증가시키는 매우 효과적인 방법입니다. 이는 웹사이트에 생동감을 불어넣고, 사용자들에게 기억에 남는 경험을 제공합니다. 하지만, 이러한 동적 요소가 과도하게 사용될 경우, 사용자에게 혼란을 줄 수 있으며, 가독성에 부정적인 영향을 미칠 수 있습니다. 따라서, 이러한 효과는 콘텐츠의 가독성을 해치지 않도록 신중하게 적용해야 합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io//ctrlcccv-demo/2023-11-22-scroll-text/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-10-30-scroll-show/">[관련글] jQuery - 스크롤 내리면 나타나는 애니메이션</a>
</div>