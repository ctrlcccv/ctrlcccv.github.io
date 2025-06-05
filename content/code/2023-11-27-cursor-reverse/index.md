---
title: jQuery - 마우스 커서 애니메이션 (반전, 확대)
description: >  
    이 글에서는 jQuery를 이용하여 마우스 커서에 반전 및 확대 애니메이션 효과를 추가하는 방법을 자세히 설명합니다. HTML, CSS, jQuery를 결합하여 사용자 상호작용에 따라 동적으로 반응하는 커서를 구현하는 과정을 소개합니다
slug: 2023-11-27-cursor-reverse
date: 2023-11-27 00:00:00+0000
lastmod: 2023-11-27 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-27-cursor-reverse.webp

categories:
    - jQuery
tags:
    - 마우스 커서 커스텀
---

이 글에서는 jQuery를 이용하여 마우스 커서에 애니메이션 효과를 추가하는 코드를 소개합니다.   
사용자의 마우스 움직임에 반응하여 커서가 반전되거나 확대되는 시각적 효과를 제공합니다.

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

이러한 접근 방식의 장점은 다음과 같습니다.

* **향상된 사용자 참여** : 독특한 커서 디자인은 사용자의 관심을 끌고, 웹사이트와의 상호작용을 촉진합니다.
* **시각적 매력** : 애니메이션 효과는 웹사이트에 독창적인 느낌을 부여합니다.
* **직관적인 사용자 경험** : 사용자가 어떤 요소 위에 마우스를 올렸는지 쉽게 인식할 수 있습니다.
* **맞춤형 상호작용** : 웹사이트의 특정 부분에 대한 사용자의 관심을 집중시킬 방법을 제공합니다. 

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/code/2023-11-23-cursor-custom/">[관련글] jQuery - 마우스 커서 따라다니는 효과</a>
    <a target="_blank" href="https://www.thinkthingthank.com/">예제 디자인 참고 사이트</a>
</div>

<br>

## HTML 구조
HTML 구조는 마우스 커서 애니메이션 효과를 위한 기본적인 뼈대를 제공합니다.   
cursor 클래스 요소는 마우스 커서를 시각적으로 대체합니다.
```html
<div class="cursor"></div>
<div class="title">마우스를 요소 위에 올리면 반전됩니다.</div>
<a href="#self" class="link">링크 위에 올리면 확대됩니다.</a>
```

## CSS 스타일
```css
body { background: #fff; } 
.cursor { position: absolute; top: 0; left: 0; width: 40px; height: 40px; background-color: #fff; border-radius: 50%; z-index: 9999; pointer-events: none; transition: transform 200ms ease-out; mix-blend-mode: difference; } 
.cursor.cursor_expand { transform: scale(1.5); } 
.title { margin-top: 200px; padding: 30px 0; font-size: 40px; font-weight: 700; color: #000; text-align: center; } 
.link { display: block; margin-top: 200px; padding: 30px 0; font-size: 40px; font-weight: 700; color: #000; text-align: center; text-decoration: none; } 
```
* **커서 스타일링**   
  * cursor 클래스는 커서의 모양, 크기, 위치 등을 정의합니다. mix-blend-mode: difference 속성은 커서가 다른 요소 위에 있을 때 반전 효과를 제공합니다.
  * cursor_expand 클래스는 커서 확대 효과를 위한 스타일을 정의합니다.
  * pointer-events: none 속성은 커서 요소가 마우스 이벤트를 받지 않도록 설정합니다. 이를 통해 커서 아래에 있는 요소들이 마우스 이벤트를 정상적으로 감지하고 반응할 수 있습니다.

* **페이지 레이아웃**  
  * .title과 .link 클래스는 텍스트와 링크의 스타일을 정의하며, 중앙 정렬과 상단 여백으로 시각적 구분을 제공합니다.

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
const $cursor = $('.cursor');
const $link = $('.link');
let isMouseOverLink = false; // .link 요소 위에 마우스가 있는지 추적
let isMouseDown = false; // 마우스 버튼이 눌려 있는지 추적

// 커서 상태 업데이트 - $link 위에 있거나 마우스 버튼이 눌려있으면 확대
function updateCursor() {
    if (isMouseOverLink || isMouseDown) {
        $cursor.addClass('cursor_expand');
    } else {
        $cursor.removeClass('cursor_expand');
    }
}

// 마우스 이동에 따라 커서 위치 업데이트
$(document).mousemove(function(e) {
    $cursor.css({
        'left': e.pageX - $cursor.width() / 2 + 'px',
        'top': e.pageY - $cursor.height() / 2 + 'px'
    });
    updateCursor(); // 마우스 이동 시 커서 상태 업데이트
});

// .link 요소에 마우스 오버 시 isMouseOverLink 업데이트
$link.mouseenter(function() {
    isMouseOverLink = true;
    updateCursor();
}).mouseleave(function() {
    isMouseOverLink = false;
    updateCursor();
});

// 마우스 버튼 누름/뗌에 따라 isMouseDown 업데이트
$(document).mousedown(function() {
    isMouseDown = true;
    updateCursor();
}).mouseup(function() {
    isMouseDown = false;
    updateCursor();
});
```
* **초기 변수 설정**  
  * $cursor, $link는 각각 커서와 링크 요소를 jQuery 객체로 저장합니다.
  * isMouseOverLink, isMouseDown는 마우스의 상태를 추적합니다.

* **마우스 이동 이벤트 처리**  
  * mousemove : 문서 전체의 마우스 움직임을 추적합니다. 마우스 이동 시 함수 실행됩니다.
  * e.pageX와 e.pageY : 마우스의 X, Y 좌표를 제공합니다.
  * $cursor.css : 마우스 위치에 따라 커서의 CSS 위치를 동적으로 업데이트합니다.

* **링크 요소의 마우스 이벤트 처리**  
  * mouseenter와 mouseleave : link 클래스 요소에 마우스가 들어오거나 나갈 때 이벤트를 처리합니다.
  * mouseenter는 isMouseOverLink를 true로, mouseleave는 false로 설정합니다.

* **마우스 버튼 이벤트 처리**  
  * mousedown와 mouseup : 마우스 버튼의 눌림과 뗌을 감지합니다.
  * mousedown은 isMouseDown을 true로, mouseup은 false로 설정합니다.

* **커서 상태 업데이트 함수 (updateCursor)**  
  * isMouseOverLink나 isMouseDown에 따라 커서의 상태를 조정합니다.
  * 조건에 따라 $cursor에 cursor_expand 클래스를 추가하거나 제거하여 확대 상태를 조절합니다.
  * translate() 함수를 사용하여 커서가 마우스 위치에 따라 움직이도록 합니다.  
<br>

## 결론
jQuery를 사용하여 마우스 커서에 독특한 애니메이션 효과를 적용하는 방법을 살펴보았습니다. HTML과 CSS를 통해 기본 구조와 스타일을 설정하고, jQuery를 사용하여 상호작용에 따른 커서의 동적인 변화를 구현했습니다.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io//ctrlcccv-demo/2023-11-27-cursor-reverse/">예제결과 미리보기</a>
</div>

