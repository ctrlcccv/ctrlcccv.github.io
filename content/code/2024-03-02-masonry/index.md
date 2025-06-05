---
title: >  
    핀터레스트 레이아웃, masonry.js로 쉽게 구현하기
description: >  
    Masonry.js를 활용하여 핀터레스트 스타일의 웹 레이아웃을 손쉽게 만드는 방법을 자세히 설명합니다.  

slug: 2024-03-03-masonry
date: 2024-03-03 00:00:00+0000
lastmod: 2024-03-03 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-03-03-masonry.webp

categories:
    - jQuery
tags:

---
웹 디자인에서 다양한 레이아웃을 구현하는 것은 사용자 경험을 향상시키고 독특한 시각적 효과를 제공하는 데 중요합니다. 특히 핀터레스트와 같은 플랫폼은 독특하고 다양한 레이아웃 구성으로 사용자들을 매료시키고 있습니다. 이번 글에서는 핀터레스트 스타일의 레이아웃을 Masonry.js를 활용하여 어떻게 간편하게 구현할 수 있는지에 대해 알아보겠습니다.  

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
$('.masonry').masonry({
    itemSelector: '.item'
});
```

**columnWidth**  
각 열의 너비를 지정합니다.
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200 // 픽셀 단위로 지정
});
```

**percentPosition**  
true로 설정하면 그리드 아이템의 크기를 백분율로 지정합니다.
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: '.sizer',
    percentPosition: true
});
```

**gutter**  
그리드 아이템 사이의 간격을 지정합니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    gutter: 20 // 픽셀 단위로 지정
});
```

**horizontalOrder**  
true로 설정하면 왼쪽에서 오른쪽으로 아이템이 배치됩니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    horizontalOrder: true // 왼쪽에서 오른쪽으로 배치
});
```

**stamp**  
그리드에 포함되지 않아야 하는 요소를 지정합니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    stamp: '.stamp' // .stamp 클래스를 가진 요소는 그리드에 포함되지 않음
});
```

**fitWidth**  
true로 설정하면 그리드의 너비가 부모 요소에 맞게 조정됩니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    fitWidth: true
});
```

**originLeft 및 originTop**  
false로 설정하면 그리드의 왼쪽 및 위쪽에서 시작하는 것이 아니라 오른쪽 및 아래쪽에서 시작합니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    originLeft: false,
    originTop: false
});
```

**containerStyle**  
그리드 컨테이너에 적용할 CSS 스타일을 정의합니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    containerStyle: {
        position: 'relative',
        background: '#f0f0f0',
        padding: '20px'
    }
});
```

**transitionDuration**  
그리드 아이템의 위치가 변경될 때의 애니메이션 지속 시간을 설정합니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    transitionDuration: '0.5s' // 0.5초 동안의 애니메이션
});
```

**stagger**  
그리드 아이템이 나타날 때까지의 지연을 설정합니다. 각 아이템은 순차적으로 나타납니다. 이를 사용하여 그리드의 아이템이 부드럽게 나타날 수 있습니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    stagger: 30 // 각 아이템은 30밀리초씩 지연됨
});
```

**resize**  
윈도우 크기 변경 시 그리드를 자동으로 다시 배치할지 여부를 설정합니다. true로 설정하면 윈도우 크기가 변경될 때 자동으로 다시 배치됩니다.  
```js
$('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    resize: true // 윈도우 크기가 변경되면 자동으로 다시 배치
});
```

**initLayout**  
false로 설정하면 초기 레이아웃을 수동으로 초기화해야 합니다.  
```js
var $grid = $('.masonry').masonry({
    itemSelector: '.item',
    columnWidth: 200,
    initLayout: false
});

// 초기 레이아웃을 나중에 초기화
$grid.masonry();
```
<br>

## 결론
핀터레스트 스타일의 레이아웃을 Masonry.js로 쉽게 구현하는 방법을 알아보았습니다. 다양한 옵션을 효과적으로 활용하면 웹 디자인에서 독창적이고 효과적인 레이아웃을 만들 수 있습니다. Masonry.js의 사용으로 개발자들은 더 나은 사용자 경험을 제공할 뿐만 아니라, 레이아웃 구현에 소요되는 시간과 노력을 크게 절약할 수 있습니다.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-03-03-masonry/" target="_blank">예제결과 미리보기</a>
</div>


