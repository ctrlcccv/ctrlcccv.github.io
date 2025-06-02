---
title: CSS - 스크롤 해도 고정되는 배경 이미지 만들기
description: >  
    CSS를 활용하여 스크롤 시에도 고정된 배경 이미지를 만드는 방법에 대해 자세히 설명합니다. 각기 다른 스타일의 배경 이미지를 가진 섹션들을 구성하고, 배경 고정 효과를 주어 독특한 시각적 경험을 제공하는 웹 페이지 디자인 기법을 소개합니다.

slug: 2024-01-11-background-fixed
date: 2024-01-11 00:00:00+0000
lastmod: 2024-01-11 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-11-background-fixed.webp

categories:
    - CSS
tags:
    - 배경 효과
---
배경 이미지는 페이지의 분위기를 결정짓는 핵심적인 역할을 하며, 독특한 스크롤 효과는 사용자의 관심을 끌고 인터랙션을 유도합니다. 이번 글에서는 여러 배경 이미지들이 스크롤 시 고정되며, 콘텐츠가 그 위에서 스크롤 되는 효과를 구현하는 방법을 자세히 설명합니다. CSS의 `background-attachment` 속성을 사용하여 이러한 효과를 쉽게 만들 수 있습니다.  



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

HTML 구조는 간단합니다. 각각의 배경 이미지를 가진 `<div>` 태그들로 구성되어 있습니다. 각 `div`에는 고유의 클래스(`bg_type1`, `bg_type2`, `bg_type3`)가 할당되어, 특정한 배경 이미지를 지정할 수 있도록 합니다.

```html
<div class="bg bg_type1">
<div class="bg bg_type2">
<div class="bg bg_type3">
```
이들 각각의 `div`는 페이지에서 전체 높이(`100vh`)의 섹션으로 표시되며, 각각 다른 배경 이미지를 가집니다.   
<br>

## CSS 스타일

CSS에서는 해당 HTML 구조에 스타일을 적용하여 각 섹션에 배경 이미지를 넣고 위치를 고정시킵니다.  

```css
.bg {
    height: 100vh;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.bg_type1 {
    background-image: url('https://picsum.photos/id/79/2000/2000');
}

.bg_type2 {
    background-image: url('https://picsum.photos/id/80/2000/2000');
}

.bg_type3 {
    background-image: url('https://picsum.photos/id/81/2000/2000');
    background-attachment: local;
}
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


* **배경 이미지 공통 스타일 (.bg)**

  * `height: 100vh`  
  각 배경이 화면의 전체 높이를 차지하도록 설정합니다.

  * `background-position: center center`  
  배경 이미지가 반드시 섹션의 중심에 있도록 합니다.

  * `background-size: cover`  
  배경 이미지가 섹션의 크기에 맞게 조절되어 모든 공간을 감싸도록 합니다.

  * `background-repeat: no-repeat`  
  배경 이미지가 반복되지 않고 한 번만 표시됩니다.

  * `background-attachment: fixed`  
  스크롤 해도 배경 이미지가 고정되도록 설정합니다. 이는 이미지가 뷰포트에 상대적으로 고정되어, 사용자가 스크롤 할 때 이미지가 움직이지 않고 그 자리에 남아있게 만듭니다.

* **각 배경 이미지 스타일**  

  * `.bg_type1`, `.bg_type2`는 고유한 URL의 배경 이미지를 가지며 `background-attachment: fixed` 속성을 통해 스크롤 해도 고정되어 있습니다.  

  * `.bg_type3` 또한 고유한 배경 이미지를 가지지만, 여기에서는 `background-attachment: local` 속성을 사용했습니다. 이 속성은 배경이 뷰포트가 아닌 해당 요소(`div`)에 상대적으로 고정되어, 요소가 스크롤 될 때 배경 이미지도 함께 스크롤 됩니다. 이를 통해 나머지 두 섹션과는 다른 스크롤 효과를 경험할 수 있습니다.

<br>

## 결론
CSS를 활용하여 스크롤 시에도 고정된 배경 이미지를 만드는 방법을 배웠습니다. `background-attachment` 속성을 사용함으로써 간단하게 배경 고정 효과를 줄 수 있으며, 사용자에게 멋진 시각적 경험을 제공합니다. 또한, 배경을 고정시키거나 이동시키는 방법을 알게 되면, 웹사이트의 다양한 섹션에 다채로운 동적 효과를 부여할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-11-background-fixed/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2024-01-12-background-fixed2/">[관련글] background-attachment:fixed 모바일에서 안되는 문제 해결 방법</a>
</div>

