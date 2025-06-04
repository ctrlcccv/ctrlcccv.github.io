---
title: CSS - 가변 폰트 사용법, font-variation-settings 속성까지
description: >  
    가변 폰트를 활용한 웹 디자인에서 CSS 설정 및 font-variation-settings 속성 활용법을 소개합니다. @font-face 및 font-variation-settings을 통해 스타일 조절이 가능합니다.

slug: 2024-01-14-variable-font
date: 2024-01-14 00:00:00+0000
lastmod: 2024-01-14 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-14-variable-font.webp

categories:
    - CSS
tags:
    - 웹폰트
---

웹 디자인은 끊임없는 진화 속에 있으며, 가변 폰트(variable fonts)는 글꼴 디자인 분야에 혁명을 가져와 우리의 타이포그래피 접근 방식을 변화시켰습니다. 기존의 정적인 폰트와는 달리, 가변 폰트는 단일 폰트 파일 내에서 다양한 스타일 범위를 제공하여 디자이너와 개발자에게 이전에는 경험하지 못한 창의적인 유연성을 제공합니다.

가변 글꼴은 보통 일반, 볼드, 이탤릭과 같은 다양한 글꼴 스타일에 대한 별도의 파일을 가지는 전통적인 방식을 벗어납니다. 대신, 하나의 가변 글꼴 파일은 무게, 너비, 그리고 기타 속성들 사이에서 자연스러운 전환을 가능케 하며, 이러한 유연성은 디자인과 개발 모두에게 새로운 가능성을 열어줍니다.  

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

## 가변 폰트 장점

* **웹 성능 향상**  
가변 폰트는 여러 스타일을 하나의 파일로 통합함으로써 웹 페이지 로딩 시간을 단축시켜 주어, HTTP 요청 수를 줄이는 데 기여합니다.

* **반응형 타이포그래피**  
개발자들은 다양한 기기 및 화면 크기에서 일관된 시각적 경험을 제공할 수 있습니다.

* **효율적인 리소스 활용**  
가변 폰트는 여러 정적 글꼴 파일이 필요 없기 때문에 더 효율적인 웹 개발 워크플로우를 구축할 수 있도록 도와줍니다.  
<br>

## 가변 폰트 사용법
### 가변 폰트 다운로드
가변 폰트를 사용하려면 먼저 해당 폰트를 다운로드해야 합니다. 인터넷에서 원하는 가변 폰트를 찾고, 폰트 제공자의 웹 사이트나 다른 신뢰할 수 있는 출처에서 폰트 파일을 다운로드하세요.  
<br>

### 폰트 적용을 위한 CSS 설정
웹 페이지에서 가변 폰트를 사용하기 위해 CSS를 설정합니다.   
CSS @font-face 규칙을 사용하여 폰트를 불러옵니다.

```css
@font-face {
    font-family: 'YourVariableFont';
    src: url('path/to/your-variable-font.woff2') format('woff2');
    font-weight: 100 900; /* 원하는 두께 범위 지정 */
    font-style: normal; /* 이탤릭이나 기울임 설정 가능 */
}

body {
    font-family: 'YourVariableFont', sans-serif;
}
```

가변 폰트는 다양한 스타일과 두께를 제공하므로, 사용하고자 하는 스타일 및 두께를 CSS에서 설정합니다.   
예를 들어, font-weight: 300을 사용하여 폰트의 두께를 조절할 수 있습니다.

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

### font-variation-settings 속성
font-variation-settings 속성은 CSS에서 가변 폰트의 여러 축(axis)에 대한 설정을 제어하는 데 사용되는 속성입니다. 이 속성은 @font-face 규칙 내에서 폰트를 정의할 때 사용되며, 각 축의 설정 값을 지정합니다. 각 축은 폰트 디자인의 특정 측면을 나타내며, 사용자는 이 값을 조절하여 원하는 스타일을 얻을 수 있습니다.   

다음은 font-variation-settings 속성을 사용한 예제와 그에 대한 설명입니다.  

```css
body {
    font-family: 'YourVariableFont', sans-serif;
    font-variation-settings: 'wght' 325, 'wdth' 50, 'slnt' 10;
}
```
* **'wght' axis (폰트 가중치)**  
'wght' 325는 폰트의 가중치를 325로 설정합니다. 이 값이 클수록 글자는 두껍게 보입니다.

* **'wdth' axis (폰트 너비)**  
'wdth' 50은 폰트의 너비를 50으로 설정합니다. 작은 값은 글자 간격을 좁게 만들고, 큰 값은 넓게 만듭니다.

* **'slnt' axis (기울임)**  
'slnt' 10은 폰트를 10도로 기울입니다.   
<br>

## 결론
가변 폰트는 웹 디자인에 혁명을 가져와 여러 스타일을 하나의 파일로 통합하여 웹 페이지 로딩 속도를 높이고 반응형 타이포그래피를 가능하게 합니다. 폰트를 적용하기 위해 @font-face 규칙을 사용하고, font-variation-settings 속성을 이용하여 특정 축을 조절하여 스타일을 설정할 수 있습니다. 이를 통해 일관된 시각적 경험과 효율적인 리소스 활용이 가능하며, 웹 디자인 분야에 새로운 창의성과 효율성을 제공합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings/">[참고문서] font-variation-settings</a>
</div>

