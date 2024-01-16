---
title: background-attachment:fixed 모바일에서 안되는 문제 해결 방법
description: >  
    모바일 환경에서 'background-attachment: fixed' 스타일이 제대로 작동하지 않을 때 사용할 수 있는 CSS와 HTML을 활용하는 대체적 해결 방법을 제공합니다. 고정 배경이미지 효과를 모바일에서도 구현하는 방법을 자세하게 설명합니다.  

slug: 2024-01-12-background-fixed2
date: 2024-01-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-12-background-fixed2.webp

categories:
    - CSS
tags:
    - 배경 효과
---
웹사이트 디자인에서 배경 이미지를 고정시켜 놓고, 콘텐츠만 스크롤 되게 하는 디자인은 인기 있습니다. `background-attachment: fixed` 속성은 이를 쉽게 구현할 수 있게 해주는 CSS 기능입니다. 그러나 모바일 기기는 `background-attachment: fixed` 속성을 지원하지 않거나, 스크롤 성능 문제로 기대했던 효과를 보여주지 않습니다.  

`background-attachment: fixed` 속성으로 인해 발생하는 모바일 환경에서의 문제를 해결하는 방법을 자세히 알아보고, 구체적인 코드 예시를 통해 실제 웹사이트에 적용하는 방법을 제시합니다.  
 
<br>

## HTML 구조

HTML 구조는 `bg_fixed` 클래스를 가진 div 요소들과 배경 이미지, 그리고 콘텐츠를 담을 `content` 클래스로 구성되며, 각각의 div에 고유한 배경 이미지를 지정합니다.

```html
<div class="bg_fixed">
    <img src="https://picsum.photos/id/80/2000/2000" alt="배경 이미지">
</div>

<div class="bg_fixed">
    <img src="https://picsum.photos/id/81/2000/2000" alt="배경 이미지">
</div>

<div class="contents">콘텐츠</div>

<div class="bg_fixed">
    <img src="https://picsum.photos/id/83/2000/2000" alt="배경 이미지">
</div>
```

## CSS 스타일

```css
.bg_fixed {
    height:100vh;
    height:100lvh;
    clip-path: inset(0 0 0 0);
}
.bg_fixed img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height:100lvh;
    object-fit: cover;
}
.contents {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 48px;
    font-weight: 500;
}
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

* **.bg_fixed 스타일링**
  * `height:100vh`는 배경이미지가 전체 뷰포트 높이를 차지하게 해줍니다.
  
  * `clip-path: inset(0 0 0 0)` 속성은 .bg_fixed 요소의 클리핑 경로를 설정합니다. inset(0 0 0 0)는 모든 측면에 대해 클리핑 거리를 0으로 설정하므로, 해당 요소의 내용이 모두 보이게 됩니다. 즉, 배경 이미지가 요소의 전체 영역에 걸쳐 표시되며, 다른 내용이 숨겨지지 않습니다.

* **.bg_fixed img 스타일링**
  * 이미지를 고정시키기 위해서 `position: fixed`를 적용합니다. 스크롤 시에도 배경 이미지가 움직이지 않게 하는 핵심 속성입니다.

  * `object-fit: cover` 속성은 이미지가 컨테이너를 가득 채우면서 비율을 유지하도록 합니다.

* **.contents 스타일링**
  * 콘텐츠 div에는 flexbox를 사용하여 중앙 정렬을 합니다.

코드 예시에서 보듯, 본래 `background-attachment: fixed` 대신에 우리는 `<img>` 태그와 `position: fixed`를 이용해 유사한 효과를 내는 방법을 사용하였습니다. 이는 대부분의 모바일 브라우저에서 작동하며, 배경 이미지가 스크롤 시에도 처음 위치에 고정되어 있도록 합니다.  
<br>

## 결론
이 방법을 사용함으로써, CSS의 `background-attachment: fixed` 속성이 모바일 기기에서 작동하지 않는 문제에 대한 대안적 해결책을 제공합니다. 특히 스크롤 성능 관련 문제를 유발하지 않으면서도 우리가 원하는 디자인 효과를 구현할 수 있습니다.  

웹 개발자는 이러한 기술을 활용하여 모바일 환경에서도 풍부하고 몰입감 있는 사용자 경험을 만들 수 있습니다. 물론 이러한 기술이 모든 상황에 완벽한 해결책은 아닐 수도 있고, 실제 적용에 앞서 충분한 테스팅과 최적화 과정이 필요할 것입니다.  

코드의 구현과 스타일에 대해서는 항상 최신 브라우저들의 지원 상황을 확인하는 것이 중요하고, 가능한 많은 디바이스와 환경에서의 테스트를 통해 더 안정적이고 깔끔한 사용자 경험을 제공하시기 바랍니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-12-background-fixed2/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2024-01-11-background-fixed/">[관련글] CSS - 스크롤 해도 고정되는 배경 이미지 만들기</a>
</div>