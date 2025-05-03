---
title: >  
    jQuery - 메뉴 hover 움직이는 밑줄 효과 만들기
description: >  
    jQuery를 활용하여 내비게이션 메뉴에 마우스를 올릴 때 밑줄이 움직이는 효과를 만드는 방법을 자세히 설명합니다. 동적인 CSS 변수와 jQuery의 이벤트 핸들링 기능을 이용하여 효과적인 UI를 구현할 수 있습니다.
slug: 2024-01-31-underline-move
date: 2024-01-31 00:00:00+0000
lastmod: 2024-01-31 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-31-underline-move.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
웹 페이지의 내비게이션은 사용자 경험에서 매우 중요한 부분입니다. 특히, 내비게이션 메뉴에 마우스를 올렸을 때 동적인 효과를 주면 사용자의 시선을 끌고 상호작용을 유도할 수 있습니다. 이번 블로그 글에서는 jQuery와 CSS를 사용하여 메뉴에 마우스를 올렸을 때 밑줄이 움직이는 'hover 효과'를 만드는 방법에 대해 설명하겠습니다.   

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
<nav>
    <div class="inner">
        <ul class='menu'>
            <li class='active'><a href='#'>메뉴 1</a></li>
            <li><a href='#'>메뉴 2</a></li>
            <li><a href='#'>메뉴 3</a></li>
            <li><a href='#'>메뉴 4</a></li>
            <li><a href='#'>메뉴 5</a></li>
        </ul>
        <span class='marker'></span>
    </div>
</nav>
```
- `<nav>` 태그는 웹 페이지의 내비게이션 섹션을 정의하는데 사용됩니다. 고유한 식별자와 클래스 이름을 줄 수 있어 스타일링과 JavaScript 조작이 쉬워집니다.

- 내부 `inner` 클래스는 최대 너비를 설정하고 가운데 정렬하기 위한 컨테이너 역할을 합니다. 이는 `max-width`와 `margin: 0 auto` 스타일을 사용하여 구현됩니다.

- 여러 `<li>` 태그로 이루어진 `menu` 클래스는 실제 메뉴 아이템을 나열하는 데 사용되며, 각 항목은 `<a>` 태그로 링크를 제공합니다.

- `marker` 클래스는 마우스 호버시에 나타날 움직이는 밑줄을 위한 요소입니다. CSS와 jQuery를 통해서 동적으로 위치를 조정하게 됩니다.  
<br>  

## CSS 스타일

```css
nav {
    display: block;
    position: relative;
    width: 100%;
    background-color: #001F3F;
}

nav .inner {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
}

nav .marker {
    position: absolute;
    bottom: 0;
    width: 90px;
    height: 3px;
    background-color: #FFD700;
    z-index: 1;
    opacity: 0;
    transform: translateX(-50%) translateX(var(--marker-translate, 0px));
    transition: all 0.3s ease;
}

nav .inner:hover .marker {
    opacity: 1;
}

.menu {
    display: flex;
    justify-content: center;
    text-align: center;
    list-style: none;
}

.menu li {
    flex: 1;
}

.menu li a {
    display: block;
    padding: 15px 0 18px;
    font-size: 16px;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease;
}

.menu li:hover a {
    color: #FFD700;
}
```
- `nav` 태그에는 `position: relative`를 적용하여 `.marker`의 절대 위치를 조정할 기준을 제공합니다.

- `inner` 클래스에는 `max-width`와 `margin`을 적용하여 내부 요소를 중앙에 배치합니다.

- `marker` 클래스는 호버 효과의 핵심 요소로, 절대 위치를 사용하여 메뉴 하단에 배치되며, `transform` 속성을 이용하여 동적으로 위치가 변하도록 합니다.

- `menu` 클래스의 `<li>` 요소들은 `flex: 1` 속성을 통해 동일한 너비를 가지도록 조정됩니다.

- 메뉴 아이템에 대한 스타일은 `hover` 상태일 때와 일반 상태에서 다르게 설정하여 시각적인 피드백을 제공합니다.  

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

## jQuery 코드

```js
$('.menu li').on('mouseenter', function () {
    // 각 메뉴 li의 left 위치와 너비를 가져옵니다.
    const $menuItem = $(this);
    const itemLeft = $menuItem.position().left;
    const itemWidth = $menuItem.outerWidth();
     
    // 마커의 위치값을 계산합니다.
    const centerValue = itemLeft + itemWidth / 2;
     
    // 마커를 움직여 메뉴 li의 가운데로 위치시킵니다.
    $('.marker').css('--marker-translate', centerValue + 'px');
});
```
- jQuery의 `.on()` 메소드를 사용하여 각 메뉴 항목(`<li>`)에 마우스가 진입하는(`mouseenter`) 이벤트에 반응할 수 있도록 이벤트 핸들러를 설정합니다.

- 이벤트 핸들러 내에서는 현재 마우스가 올라가 있는 메뉴 항목의 위치(`.position().left`)와 너비(`.outerWidth()`)를 측정합니다.

- 계산된 위치 값(`centerValue`)을 CSS 변수(`--marker-translate`)에 할당하여 `.marker`의 위치를 해당 메뉴 항목의 중앙으로 이동시킵니다.

- CSS의 `transform` 속성을 이용하여 `.marker`를 부드럽게 이동시키는 애니메이션 효과를 적용합니다.  
<br>

## 결론
jQuery와 CSS를 이용하여 메뉴 밑줄 이동 효과를 만드는 방법을 배웠습니다. 사용자가 메뉴 항목에 마우스를 올릴 때 동적으로 움직이는 밑줄은 효과적인 시각적 피드백을 제공하며, 사용자가 내비게이션을 이용하도록 유도합니다. 이러한 기능은 웹사이트의 전반적인 사용자 경험을 향상시킬 뿐만 아니라, 디자인에 현대적이고 역동적인 느낌을 더해줍니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-31-underline-move/" target="_blank">예제결과 미리보기</a>
</div>
