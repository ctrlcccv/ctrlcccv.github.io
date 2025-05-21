---
title: jQuery - 스크롤 내리면 나타나는 애니메이션
description: >  
    jQuery의 스크롤 이벤트와 CSS의 transform 속성을 결합하여, 웹 페이지의 요소가 스크롤을 내릴 때 나타나는 효과를 구현하는 방법입니다.
slug: 2023-10-30-scroll-show
date: 2023-10-30 00:00:00+0000
lastmod: 2023-10-30 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-30-scroll-show.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
jQuery의 스크롤 이벤트와 CSS의 transform 속성을 결합하여, **웹 페이지의 요소가 스크롤을 내릴 때 나타나는 효과**를 구현하는 방법입니다.
아래에서 실제 예제 코드와 함께 이 기술을 구현하는 방법을 자세히 설명하겠습니다.  


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## HTML 구조
HTML에서는 div 요소들을 사용하여 컨텐츠를 구성하고, 각각의 요소에는 **scroll_on** 클래스가 부여됩니다.   
이 클래스는 스크롤 애니메이션을 적용할 대상을 나타냅니다.
```html
<div class="scroll_wrap">
    <div class="scroll_on">제자리에서 나타납니다.</div>
    <div class="scroll_on type_top">위에서 나타납니다.</div>
    <div class="scroll_on type_left">왼쪽에서 나타납니다.</div>
    <div class="scroll_on type_right">오른쪽에서 나타납니다.</div>
    <div class="scroll_on type_bottom">밑에서 나타납니다.</div>
</div>
```

## CSS 스타일
CSS 스타일을 사용하여 각 요소의 레이아웃과 스타일을 정의합니다.   
요소들의 초기 상태에서는 opacity 속성이 0으로 설정되어 화면에서 숨겨져 있습니다.
```css
.scroll_wrap {overflow: hidden;}
.scroll_on {padding:50px 0;font-size: 24px;font-weight:700;text-align: center;opacity: 0;transition: all 1s;}
.scroll_on.active {opacity: 1 !important;transform: translate(0, 0) !important;}
.scroll_on.type_top {transform: translate(0, -50px);}
.scroll_on.type_bottom {transform: translate(0, 50px);}
.scroll_on.type_left {transform: translate(-50px, 0);}
.scroll_on.type_right {transform: translate(50px, 0);}
```
* **.scroll_wrap**  
스크롤 영역 내용이 넘치지 않도록 숨깁니다.

* **.scroll_on**  
요소들을 초기에 투명하게 하고, 나타날 때까지 숨깁니다.

* **.scroll_on.active**  
active 클래스가 추가되면 요소를 투명하지 않게 만들어 화면에 나타나게 합니다.

* **.scroll_on.type_top**  
type_top 클래스가 추가되면 요소가 위에서 아래로 나타납니다.

* **.scroll_on.type_bottom**   
type_bottom 클래스가 추가되면 요소가 아래에서 위로 나타납니다.

* **.scroll_on.type_left**  
type_left 클래스가 추가되면 요소가 왼쪽에서 오른쪽으로 나타납니다.

* **.scroll_on.type_right**  
type_right 클래스가 추가되면 요소가 오른쪽에서 왼쪽으로 나타납니다.  

<br>

## jQuery 코드
jQuery를 사용하여 스크롤 이벤트를 모니터링하고, 요소들을 화면에 나타나게 하는 코드가 구현되어 있습니다. 


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

```js
$(document).ready(function() {
    // 클래스가 "scroll_on"인 모든 요소를 선택합니다.
    const $counters = $(".scroll_on");
    
    // 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const loop = true; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function() {
        // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
        $counters.each(function() {
            const $el = $(this);
    
            // 요소의 위치 정보를 가져옵니다.
            const rect = $el[0].getBoundingClientRect();
            const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
            const contentHeight = rect.bottom - rect.top; // 요소의 높이
            
            // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
            if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                $el.addClass('active');
            }
            // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
            if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
                $el.removeClass('active');
            }
        });
    }).scroll();
});
```

* **요소 선택**   
$counters 변수는 웹 페이지에서 클래스가 scroll_on으로 지정된 모든 요소를 선택합니다. 이 요소들에 애니메이션 효과를 적용하기 위해 선택합니다.  

* **노출 비율 및 애니메이션 반복 설정**   
  * exposurePercentage 변수는 스크롤 이벤트에 반응하여 요소가 화면에 어느 정도 노출되어야 애니메이션을 활성화할지 결정합니다. 이 예제에서는 100%로 설정되어 요소가 화면에 완전히 나타날 때 애니메이션이 활성화됩니다.
  * loop 변수는 애니메이션을 반복할지 여부를 제어합니다. true로 설정하면 요소가 화면을 벗어났을 때 다시 숨기도록 설정됩니다.

* **스크롤 이벤트 모니터링**  
$(window).on('scroll', function() { ... }) 코드는 브라우저 창의 스크롤 이벤트를 모니터링합니다. 사용자가 스크롤을 하면 해당 이벤트가 발생하고, 이때마다 내부의 함수가 실행됩니다.

* **요소 반복 처리**  
$counters.each(function() { ... }) 코드는 $counters 변수에 저장된 요소들에 대해 반복적으로 함수를 실행합니다.

* **요소 위치 정보 가져오기**  
  * rect 변수는 현재 처리 중인 요소의 위치 정보를 가져옵니다.
  * winHeight 변수는 현재 브라우저 창의 높이를 저장합니다.
  * contentHeight 변수는 요소의 높이를 계산하여 저장합니다.
  
* **요소 노출 여부 확인 및 애니메이션 적용**  
스크롤 이벤트에 따라 요소가 화면에 특정 비율만큼 노출되었는지 확인합니다. 이때, exposurePercentage 값을 기준으로 비교하여 해당 비율만큼 노출되면 요소에 active 클래스를 추가하고 애니메이션을 활성화합니다.

* **애니메이션 반복 여부 확인 및 적용**  
loop 변수의 값과 요소의 화면 위치를 확인하여 애니메이션을 반복할지 여부를 결정합니다. loop 변수가 true로 설정되어 있고 요소가 화면을 벗어나면 active 클래스를 제거하여 요소를 다시 숨깁니다.  
<br>

## 결론
jQuery를 통해 스크롤 기반의 애니메이션을 구현하는 것은 비교적 간단하며, 웹 페이지의 인터랙션을 향상시킬 수 있는 강력한 도구 중 하나입니다. 
페이지 스크롤을 내리면 요소들이 부드럽게 나타나는 이러한 효과는 웹 페이지를 더 눈에 띄게 만들어 줄 것입니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-30-scroll-show/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-11-22-scroll-text/">[관련글] jQuery - 스크롤 내리면 나타나는 텍스트</a>
</div>
