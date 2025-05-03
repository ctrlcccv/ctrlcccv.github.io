---
title: jQuery - 마우스 커서 따라다니는 효과
description: >  
    웹사이트에 독특하고 매력적인 마우스 커서 효과를 구현하는 방법을 설명합니다. jQuery와 CSS를 활용하여 사용자의 마우스 움직임에 반응하고 웹사이트의 개성을 강조하는 커서 디자인의 중요성과 구현 방법을 다룹니다.   
slug: 2023-11-23-cursor-custom
date: 2023-11-23 03:00:00+0000
lastmod: 2023-11-23 03:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-23-cursor-custom.webp

categories:
    - jQuery
tags:
    - 마우스 커서 커스텀
---
웹사이트를 방문하는 순간, 사용자는 다양한 시각적 요소를 통해 그 사이트의 성격을 인지합니다. 이 중에서도 종종 간과되지만 매우 중요한 요소가 바로 '마우스 커서'입니다. 전통적인 화살표 모양의 커서는 기능적으로는 충분하지만, 웹사이트의 창의성과 개성을 표현하는 데에는 한계가 있습니다. 이에 반해, 독창적으로 디자인된 커서는 사용자의 관심을 끌고, 웹사이트의 독특한 분위기를 조성하는 데 큰 역할을 합니다.

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


특히, 디지털 시대에 웹사이트 디자인은 단순한 정보 전달을 넘어서, 사용자 경험과 감성을 자극하는 예술의 영역으로 진화하고 있습니다. 이러한 맥락에서, 커서 디자인은 사용자와의 첫 번째 상호작용 포인트로서, 웹사이트의 창의성을 바로 보여주는 기회가 됩니다. 예를 들어, 동적이고 반응형의 커서는 사용자의 탐색 경험을 풍부하게 만들고, 브랜드 아이덴티티를 강화하는 데 기여합니다.

이 글에서는 이러한 전략적인 커서 디자인을 어떻게 구현하는지 살펴보겠습니다. 특히, 사용자의 마우스 움직임을 따라가는 독창적인 커서 효과의 구현을 통해, 웹사이트에 새로운 생명력을 불어넣는 방법을 소개합니다.

제가 이 커서 효과를 처음 구현했을 때, 가장 큰 고민은 웹사이트의 성능과 호환성이었습니다. 이를 해결하기 위해, jQuery 코드를 최적화하고, CSS의 transform 속성을 적절히 활용하는 방법을 찾았습니다. 또한, 효과가 화려할수록 페이지 로딩 시간에 영향을 줄 수 있기 때문에, 성능 저하를 최소화하는 방법을 모색했습니다.  

<br>

## HTML 구조
cursor 클래스를 가진 div 요소를 생성합니다. 이 요소가 마우스를 따라 움직이는 커서 역할을 합니다.
```html
<div class="cursor"></div>
```

## CSS 스타일
커서의 모양과 애니메이션 효과를 정의합니다.
```css
.cursor { 
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 40px; 
    height: 40px;
    background-color: #000; 
    border-radius: 50%; 
    transition: transform 200ms ease-out;
    pointer-events: none;
    z-index: 9999;
} 
```
* **position**  
absolute를 사용하여 커서가 페이지 내에서 자유롭게 움직일 수 있도록 설정합니다.

* **size**  
width와 height는 커서의 크기를 결정합니다. 여기서는 40px로 지정합니다.

* **background-color**  
background-color를 통해 커서의 색상을 검은색으로 설정합니다.

* **border-radius**  
50%로 설정하여 원형의 모양을 만듭니다.

* **transition**  
transform 속성에 적용된 애니메이션 효과를 200ms의 지속시간과 ease-out의 타이밍 함수로 설정함으로써, 커서의 움직임이 보다 부드럽고 자연스러워집니다.

<br>

## jQuery 코드
동적인 커서 움직임을 구현합니다.

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

```js
// cursor 클래스를 가진 요소를 선택합니다.
const $cursor = $('.cursor');

// $cursor 요소의 크기와 위치 정보를 가져옵니다.
const cursorSize = $cursor[0].getBoundingClientRect();

$(document).on('mousemove', function(e) {
    // 마우스의 현재 X 좌표에서 커서 너비의 절반을 빼서 커서가 마우스 중심에 오도록 합니다.
    const mouseX = e.clientX - cursorSize.width / 2;

    // 마우스의 현재 Y 좌표에서 커서 높이의 절반을 빼서 커서가 마우스 중심에 오도록 합니다.
    const mouseY = e.clientY - cursorSize.height / 2;

    // $cursor 요소의 CSS 'transform' 속성을 업데이트하여 마우스 위치에 따라 이동시킵니다.
    $cursor.css('transform', `translate(${mouseX}px, ${mouseY}px)`);
});
```
* **요소 선택**   
$('.cursor')를 통해 cursor 클래스를 가진 요소를 선택합니다.  

* **커서 정보**   
.getBoundingClientRect() 메서드로 커서의 크기와 위치 정보를 가져옵니다.  

* **마우스 이벤트 처리**   
$(document).on('mousemove', function(e) {...})를 사용하여 마우스 움직임 이벤트를 감지하고 처리합니다.  

* **커서 위치 계산**    
e.clientX와 e.clientY를 사용하여 마우스의 현재 위치를 가져옵니다. 커서의 크기를 고려하여 정확한 위치 계산을 합니다.  

* **CSS Transform**   
translate() 함수를 사용하여 커서가 마우스 위치에 따라 움직이도록 합니다.  
<br>

## 결론
jQuery와 CSS를 사용하여 마우스 커서 효과를 구현하는 방법을 살펴보았습니다. 이 구현은 웹 디자인에서 사용자 경험을 향상시키고, 웹사이트의 개성을 강조하는 데 중요한 역할을 합니다. 먼저 HTML과 CSS를 통해 커서의 기본 구조와 스타일을 설정했으며, 이어서 jQuery를 사용하여 마우스의 움직임을 실시간으로 추적하고 커서를 해당 위치로 이동시키는 방법을 구현했습니다.  

이 과정에서 중요한 부분은 jQuery 코드를 사용하여 마우스 이벤트를 처리하고, 커서의 위치를 마우스 위치에 맞추어 업데이트하는 것입니다. 이를 통해 사용자의 상호작용에 반응하는 유동적이고 매력적인 커서를 제공할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io//ctrlcccv-demo/2023-11-23-cursor-custom/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-11-27-cursor-reverse/">[관련글] jQuery - 마우스 커서 애니메이션 (반전, 확대)</a>
</div>