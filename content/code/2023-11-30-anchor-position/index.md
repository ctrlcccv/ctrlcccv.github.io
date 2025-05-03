---
title: CSS - Anchor Positioning 앵커 포지셔닝의 이해와 활용
description: >  
    CSS 앵커 포지셔닝의 기본 개념과 활용 방법을 설명하는 글입니다. 앵커 생성, 위치 지정, 크기 조정 및 폴백 스타일링에 대한 실용적인 예제와 자세한 설명을 포함합니다.
slug: 2023-11-30-anchor-position
date: 2023-11-30 00:00:00+0000
lastmod: 2023-11-30 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-30-anchor-position.webp

categories:
    - CSS
tags:
    - Anchor Positioning
---
CSS 절대 위치 지정은 웹 페이지에서 요소들을 자유롭게 배치할 수 있는 강력한 기능입니다. 그러나 종종 다른 요소들에 상대적으로 위치를 지정해야 할 필요가 있습니다. 이러한 상황에서 '앵커 포지셔닝(anchor positioning)'이라는 새로운 개념이 등장했습니다. 이는 동적인 UI 요소들의 배치에 특히 유용합니다.  

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

## 앵커의 정의와 찾기

### 앵커 생성 : anchor-name 속성

anchor-name 속성은 요소를 앵커로 지정하고 이름을 부여합니다. 이 이름은 다른 요소들이 참조할 수 있는 트리-스코프 이름입니다.  
```css
#button {
    anchor-name: --button-anchor;
}
```
이 예제에서 #button은 --button-anchor라는 이름의 앵커로 지정됩니다. 이 앵커 이름은 다른 요소들이 위치를 정할 때 참조할 수 있는 고유한 식별자가 됩니다. 예를 들어, 버튼 위에 툴팁을 표시하거나 팝업 메뉴를 연결하는 데 사용될 수 있습니다.  
<br>

### 암시적 앵커 요소
특정 조건 한에, 일부 요소는 다른 요소에 대해 암시적 앵커로 기능할 수 있습니다.
```html
<div id="popover" data-anchor="button">...</div>
```
이 예제에서 #popover는 data-anchor 속성을 통해 #button에 암시적으로 고정됩니다. 이는 특정 API 또는 자바스크립트 라이브러리에서 사용되는 방식으로, 팝오버가 버튼에 연관되어 표시되어야 할 때 유용합니다.  

<br>

### 앵커 찾기
앵커 지정자를 사용하여 타겟 앵커 요소를 찾습니다.
```css
#tooltip {
    position: absolute;
    top: anchor(--button-anchor bottom);
}
```
이 예제에서 #tooltip은 --button-anchor 앵커의 바닥면 바로 아래에 있도록 설정됩니다. 이를 통해 버튼에 마우스를 올렸을 때 버튼 바로 아래에 툴팁이 나타나도록 할 수 있습니다.  

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

## 앵커 기반 위치 지정
절대 위치 지정된 요소는 anchor() 함수를 사용하여 앵커 요소의 위치를 참조할 수 있습니다.  
<br>

### anchor() 함수
anchor() 함수는 위치 지정에 필요한 값을 반환합니다.
```css
#tooltip {
    position: absolute;
    bottom: anchor(--button-anchor top - 10px);
}
```
이 예제에서 #tooltip은 --button-anchor 앵커의 상단으로부터 10px 위에 위치합니다. 이 방식을 사용하면 버튼 위에 일정한 간격을 두고 툴팁을 배치할 수 있습니다, 특히 동적인 인터페이스에서 요소 간의 공간을 일관되게 유지하고자 할 때 유용합니다.  
<br>

### 자동 앵커 위치 지정
auto와 auto-same &lt;anchor-side&gt; 키워드를 사용하여 위치를 자동으로 조정합니다.
```css
#dialog {
    position: absolute;
    bottom: anchor(auto);
}
```
#dialog는 anchor(auto)를 통해 화면 크기나 다른 요소의 위치에 따라 자동으로 최적의 위치를 찾습니다. 이는 동적인 웹 페이지 레이아웃에서 요소가 화면이나 다른 요소에 가려지지 않도록 하는 데 유용합니다.  
<br>

## 앵커 기반 크기 조정
절대 위치 지정된 요소는 anchor-size() 함수를 통해 앵커 요소의 크기에 따라 자신의 크기를 조정할 수 있습니다.
```css
#popover {
    width: anchor-size(--button-anchor width);
}
```
#popover의 너비는 --button-anchor 앵커의 너비와 동일하게 설정됩니다. 이를 통해 버튼의 너비에 따라 동적으로 팝오버의 너비를 조정할 수 있습니다. 이 방법은 특히 반응형 디자인에서 요소들이 서로 다른 크기를 가질 때 유용합니다.  
<br>

## 폴백 크기 / 위치 지정
앵커 포지셔닝은 때로 예측하기 어려운 결과를 초래할 수 있으므로, position-fallback 속성을 통해 폴백 스타일 규칙을 적용할 수 있습니다.  
```css
#notification {
    position: absolute;
    position-fallback: --fallback-position;
}

@position-fallback --fallback-position {
    @try {
        bottom: anchor(--button-anchor top);
    }
    @try {
        top: anchor(--button-anchor bottom);
    }
}
```
#notification은 처음에는 --button-anchor의 상단에 위치하려고 시도하지만, 공간이 부족하면 자동으로 아래쪽으로 이동합니다. 이러한 폴백 메커니즘은 요소가 화면 밖으로 나가거나 다른 중요한 요소를 가리지 않도록 하는 데 중요한 역할을 합니다.  
<br>

## 결론
CSS 앵커 포지셔닝은 웹 페이지 디자인의 유연성과 정밀성을 크게 향상시키며, 개발자들이 사용자 인터페이스를 더욱 동적이고 반응적으로 만들 수 있도록 도와줍니다. 이 기술은 복잡한 레이아웃을 효과적으로 관리하고 사용자 경험을 향상시키는 데 중요한 역할을 합니다.  
<br>
<div class="btn_wrap">
    <a href="https://www.w3.org/TR/css-anchor-position-1/">참고 공식 문서</a>
</div>
