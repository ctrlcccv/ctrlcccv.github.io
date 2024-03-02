---
title: >  
    핀터레스트 레이아웃, masonry.js로 쉽게 구현하기
description: >  
    

slug: 2024-03-02-masonry
date: 2024-03-02 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-02-masonry.webp

categories:
    - jQuery
tags:
    - 배경 효과
---
웹 디자인에서 다양한 레이아웃을 구현하는 것은 사용자 경험을 향상시키고 독특한 시각적 효과를 제공하는 데 중요합니다. 특히 핀터레스트와 같은 플랫폼은 독특하고 다양한 레이아웃 구성으로 사용자들을 매료시키고 있습니다. 이번 글에서는 그 중에서도 핀터레스트 스타일의 레이아웃을 Masonry.js를 활용하여 어떻게 간편하게 구현할 수 있는지에 대해 알아보겠습니다.  
<br>

## HTML 구조

```html
<div class="masonry">
    <div class="item" style="height: 300px;">1</div>
    <div class="item" style="height: 100px;">2</div>
    <div class="item" style="height: 200px;">3</div>
    <div class="item" style="height: 300px;">4</div>
    <div class="item" style="height: 100px;">5</div>
    <div class="item" style="height: 200px;">6</div>
    <div class="item" style="height: 100px;">7</div>
    <div class="item" style="height: 150px;">8</div>
    <div class="item" style="height: 100px;">9</div>
    <div class="item" style="height: 200px;">10</div>
</div>
```
* masonry 클래스로 감싸진 컨테이너를 생성합니다.
* 각각의 요소는 item 클래스로 정의하여 균형있는 배치를 구성합니다.  
<br>

## CSS 스타일
```css
.masonry { 
    max-width: 600px; 
    margin: 0 auto; 
}
.item { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: calc(25% - 20px); 
    margin:10px; 
    background: #8ab4f8; 
    font-size: 24px; 
    font-weight: 500; 
}
```
* masonry 클래스에 최대 너비 600px, 가운데 정렬 스타일을 적용합니다.
* item 클래스는 플렉스 박스 속성, 너비, 여백, 배경색, 폰트 스타일 등을 설정하여 아이템들이 조화롭게 보이도록 합니다.
<br>

## jQuery 코드
```js
$('.masonry').masonry({
    itemSelector: '.item',
    horizontalOrder: true
});
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

* jQuery Masonry 플러그인을 사용하여 .masonry 컨테이너 내의 .item 요소들에 Masonry 레이아웃을 적용합니다.
* horizontalOrder 옵션을 사용하여 아이템을 수평으로 정렬합니다.  
<br>

## 옵션 설명 및 사용법

**itemSelector**  
그리드의 아이템을 선택하기 위한 CSS 선택자를 지정합니다.
```js
$('.grid').masonry({
    itemSelector: '.grid-item'
});
```

## 결론
핀터레스트 스타일의 레이아웃을 Masonry.js로 쉽게 구현하는 방법을 알아보았습니다. 다양한 옵션을 효과적으로 활용하면 웹 디자인에서 독창적이고 효과적인 레이아웃을 만들 수 있습니다. Masonry.js의 사용으로 개발자들은 더 나은 사용자 경험을 제공할 뿐만 아니라, 레이아웃 구현에 소요되는 시간과 노력을 크게 절약할 수 있습니다.  
<br>
더불어 Masonry.js를 사용하여 핀터레스트와 같은 동적이고 매력적인 레이아웃을 구현함으로써 웹 페이지의 인기와 사용자 상호작용을 높일 수 있을 것입니다. 따라서 Masonry.js는 웹 디자이너와 개발자들에게 매우 유용한 도구임이 확실합니다. 계속해서 새로운 도구와 기술을 탐험하며, 더 나은 웹 디자인을 위한 여정을 이어가길 바랍니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-02-21-cherry-blossom/" target="_blank">예제결과 미리보기</a>
</div>

