---
title: CSS - 햄버거 메뉴 애니메이션
description: >  
    CSS를 활용하여 간단하고 쉽게 적용할 수 있는 햄버거 메뉴 애니메이션을 만드는 방법입니다.
slug: 2023-11-03-hamburger-menu
date: 2023-11-03 00:00:00+0000
lastmod: 2023-11-03 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-03-hamburger-menu.webp

categories:
    - CSS
tags:
    - CSS 애니메이션
---
햄버거 메뉴 아이콘은 모바일 및 데스크톱 웹 애플리케이션에서 메뉴를 손쉽게 열고 닫을 수 있는 중요한 UI 요소 중 하나입니다. 이 글에서는 CSS를 활용하여 간단하고 쉽게 적용할 수 있는 햄버거 메뉴 애니메이션을 만드는 방법을 살펴보겠습니다.  



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
햄버거 메뉴 아이콘을 만들기 위한 HTML 구조를 정의합니다. 아래와 같이 구성할 수 있습니다.
```html
<a class="menu_icon" href="#">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</a>
```
여기서 &lt;a&gt; 태그는 클릭할 수 있는 링크로 사용되며, 그 안에는 네 개의 &lt;span&gt; 요소가 포함되어 있습니다. 이 네 개의 &lt;span&gt; 요소가 햄버거 메뉴의 선으로 표현됩니다.  
<br>

## CSS 스타일
CSS를 사용하여 햄버거 메뉴 아이콘을 스타일링하고 애니메이션 효과를 적용합니다.
```css
.menu_icon { display: inline-block; position: relative; width: 50px; height: 40px; } 
.menu_icon span { position: absolute; left: 50%; width: 100%; height: 7px; background: #333; border-radius: 4px; transform:translate(-50%,0) rotate(0deg); transition: 0.2s ease-in-out; } 
.menu_icon span:nth-child(1) { top: 0px; } 
.menu_icon span:nth-child(2), 
.menu_icon span:nth-child(3) { top: 50%; transform: translate(-50%,-50%); } 
.menu_icon span:nth-child(4) { bottom: 0; } 
.menu_icon.active span:nth-child(1) { top: 50%; width: 0; transform: translate(-50%,-50%); }
.menu_icon.active span:nth-child(2) { transform:translate(-50%, -50%) rotate(45deg); } 
.menu_icon.active span:nth-child(3) { transform:translate(-50%, -50%) rotate(-45deg); } 
.menu_icon.active span:nth-child(4) { bottom: 50%; width: 0; transform: translate(-50%,50%); }
```
아래에서 코드를 기능별로 자세히 설명하겠습니다. <span style="background-color:#fff5b1;color:#000;">밑줄</span>로 표시한 속성만 디자인 시안에 맞게 수정하시면 됩니다.

* **.menu_icon 클래스 (메뉴 아이콘 크기 설정)**  
  * display: inline-block : 요소를 인라인 블록 요소로 표시합니다.
  * position: relative : 요소를 상대적으로 위치시킵니다.
  * <span style="background-color:#fff5b1;color:#000;">width: 50px / height: 40px</span> : 요소(메뉴 아이콘)의 너비와 높이를 설정합니다.

* **.menu_icon span 클래스 (메뉴 아이콘의 선 스타일 설정)**  
  * position: absolute : 요소를 절대 위치로 설정합니다. 이는 부모 요소인 .menu_icon에 상대적으로 배치됩니다.
  * left: 50% : 요소를 수평 중앙으로 이동시킵니다.
  * width: 100% : 요소의 너비를 100%로 설정합니다.
  * <span style="background-color:#fff5b1;color:#000;">height: 7px</span> : 높이를 7px로 지정하여 수평인 선을 생성합니다.
  * <span style="background-color:#fff5b1;color:#000;">background: #333</span> : 선의 배경색을 어두운 회색(#333)으로 설정합니다.
  * <span style="background-color:#fff5b1;color:#000;">border-radius: 4px</span> : 선의 끝부분을 둥글게 만듭니다.
  * transform: translate(-50%, 0) rotate(0deg) : 요소를 수평으로 중앙 정렬하고, 초기에는 회전하지 않은 상태로 설정합니다.
  * <span style="background-color:#fff5b1;color:#000;">transition: 0.2s ease-in-out</span> : 요소에 0.2초 동안 ease-in-out 속도 함수를 사용하여 부드러운 애니메이션 효과를 적용합니다.

* **.menu_icon span:nth-child(n) 클래스 (선 위치 설정)**  
  * .menu_icon span:nth-child(1) : 첫 번째 선은 상단에 위치합니다.
  * .menu_icon span:nth-child(2),   
  .menu_icon span:nth-child(3) : 두 번째와 세 번째 선은 중앙에 위치하며, 수평 및 수직으로 중앙 정렬됩니다.
  * .menu_icon span:nth-child(4) : 네 번째 선은 하단에 위치합니다.

* **.menu_icon.active span:nth-child(n) 클래스 (메뉴 아이콘 활성화 설정)**  
  * .menu_icon.active span:nth-child(1) : 활성화된 상태에서 첫 번째 선은 수평 중앙으로 축소됩니다.
  * .menu_icon.active span:nth-child(2) : 활성화된 상태에서 두 번째 선은 45도 회전합니다.
  * .menu_icon.active span:nth-child(3) : 활성화된 상태에서 세 번째 선은 -45도 회전합니다.
  * .menu_icon.active span:nth-child(4) : 활성화된 상태에서 네 번째 선은 수평 중앙으로 축소됩니다.



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
jQuery를 사용하여 메뉴 아이콘을 클릭할 때 active 클래스를 토글링 하는 이벤트를 처리합니다.
```js
$(document).ready(function() {
    const menuIcon = $('.menu_icon');
    menuIcon.click(function(e) {
        e.preventDefault();
        menuIcon.toggleClass('active');
    });
});
```
* **햄버거 메뉴 아이콘 선택**  
  * const menuIcon = $('.menu_icon')    
.menu_icon 클래스를 가진 요소를 선택하고 menuIcon 변수에 할당합니다. 이 변수는 햄버거 메뉴 아이콘을 나타내는 DOM 요소를 참조합니다.

* **클릭 이벤트 핸들링**  
  * menuIcon.click(function(e) { ... })    
menuIcon 변수로 선택한 요소(햄버거 메뉴 아이콘)에 대한 클릭 이벤트 핸들러를 등록합니다. 즉, 햄버거 메뉴 아이콘을 클릭할 때 이 함수가 실행됩니다.

* **기본 동작 차단**  
  * e.preventDefault()    
클릭 이벤트의 기본 동작을 차단합니다. 주로 &lt;a&gt; 태그로 둘러싸인 햄버거 메뉴 아이콘을 클릭할 때 페이지의 링크를 따라가지 않도록 방지합니다.

* **active 클래스 토글링**  
  * menuIcon.toggleClass('active')    
menuIcon 변수에 할당된 요소에 active 클래스를 토글링(추가 또는 제거)합니다. 다시 말해, 햄버거 메뉴 아이콘을 클릭할 때마다 active 클래스가 해당 요소에 추가되거나 제거됩니다. 이것은 CSS 코드에서 정의한 애니메이션 효과를 활성화 또는 비활성화하는 데 사용됩니다.  
<br>

## 결론
이렇게 햄버거 메뉴 아이콘에 멋진 애니메이션 효과를 추가할 수 있습니다. 사용자가 작은 화면에서 메뉴를 열거나 닫을 때 시각적으로 더 흥미롭게 표현할 수 있습니다. CSS와 JavaScript를 적절하게 조합하여 원하는 효과를 만들어 보세요!  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-03-hamburger-menu/">예제결과 미리보기</a>
</div>

