---
title: CSS - 마우스 스크롤 유도 애니메이션
description: >  
    
slug: 2023-12-04-mouse-scroll
date: 2023-12-04 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-04-mouse-scroll.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
웹 페이지에서 사용자의 관심을 끌고, 스크롤을 유도하는 효과적인 방법 중 하나는 시각적인 애니메이션을 사용하는 것입니다. 이번 글에서는 마우스 스크롤 유도 애니메이션을 구현하는 CSS 코드에 대해 설명합니다. 이 코드는 마우스 모양과 화살표가 순차적으로 움직이는 애니메이션을 통해 사용자의 시선을 아래로 이동시켜, 페이지 내의 추가 내용 탐색을 유도합니다. 이러한 시각적 요소는 페이지의 흐름을 자연스럽게 이끌어 주는 중요한 역할을 합니다.  
<br>

## HTML 구조
```html
<div class="mouse_scroll" aria-label="스크롤 유도">
    <span class="mouse"></span>
    <div class="dowm_arrow">
        <span class="dowm_arrow1"></span>
        <span class="dowm_arrow2"></span>
        <span class="dowm_arrow3"></span>
    </div>
</div>
```
* **mouse_scroll 클래스**  
이 요소는 전체 마우스 스크롤 애니메이션의 컨테이너 역할을 합니다. 웹 페이지에서 시각적 중심을 이루며, 사용자의 시선을 아래로 유도하는 주요 요소입니다.

* **mouse 클래스**  
이것은 마우스 모양을 형성하는 요소로, 사용자에게 스크롤을 상징적으로 나타냅니다. 마우스 휠을 연상시키는 디자인으로, 스크롤을 유도하는 데 중요한 역할을 합니다.

* **down_arrow 클래스 내부의 &lt;span&gt; 요소**  
이 요소들은 아래로 향하는 화살표들을 구성합니다. 각각의 &lt;span&gt;은 하나의 화살표를 나타내며, 사용자의 시선을 아래로 이끌기 위해 순차적으로 애니메이션 효과가 적용됩니다.

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

## CSS 스타일
```css
body {padding-top: 70px;}
header {position: fixed;top: 0;left: 0;width: 100%;background: #000;z-index: 1;}
.menu {display: flex;justify-content: center;}
.menu > li {list-style: none;}
.menu > li a {display: flex;align-items: center;height: 70px;padding: 0 15px;font-size: 16px;color: #fff;text-decoration: none;}
.menu > li.active a {color: #fff000;}
.section {height: calc(100vh - 70px);}
#sec1 {background: #FFC0CB;}
#sec2 {background: #FFE4E1;}
#sec3 {background: #FFF6D3;}
#sec4 {background: #AEEEEE;}
footer {height: 300px;background: #000;}

@media (max-width: 600px) {
    body { padding-top: 50px; }
    .menu > li a {font-size: 14px;height: 50px;padding: 0 10px;}
    .section {height: calc(100vh - 50px);}
}
```
* **.mouse_scroll**  
이 클래스는 컨테이너를 화면의 중심에 고정시키기 위해 사용됩니다. position: fixed는 요소를 고정된 위치에 배치하며, bottom과 left 속성은 화면 중앙으로 이동시킵니다. transform: translateX(-50%)는 정확한 중앙 정렬을 위해 사용됩니다.

* **.mouse**  
마우스 모양을 스타일링하기 위한 코드입니다. border와 border-radius를 이용하여 마우스의 외곽선과 둥근 모양을 형성합니다.

* **.mouse::after**  
이 가상 요소는 마우스 내부에 움직이는 점을 만듭니다. animation 속성은 이 점이 지속적으로 움직이는 애니메이션 효과를 부여하여, 스크롤 동작을 나타냅니다.

* **.down_arrow 및 .down_arrow span**  
이 코드는 화살표의 모양과 애니메이션을 정의합니다. 화살표는 border-right와 border-bottom으로 형성되며, transform을 통해 적절한 각도로 회전됩니다. 각 화살표의 애니메이션은 사용자의 시선을 아래로 유도합니다.

* **@keyframes mouse-pulse**  
이 키 프레임 애니메이션은 .mouse::after 요소에 적용되며, 점이 위아래로 움직이는 효과를 생성합니다. 이는 마우스의 스크롤 휠 동작을 시각적으로 나타냅니다.

* **@keyframes fade-arrow**  
화살표의 나타남과 사라짐을 나타내는 애니메이션입니다. 이 효과는 사용자에게 계속해서 아래로 스크롤할 것을 시각적으로 유도합니다.  
<br>

## 결론
이 블로그 글에서 설명한 마우스 스크롤 유도 애니메이션은 웹사이트 사용자 경험(UX)을 개선하는 강력한 도구입니다. 복잡하지 않은 HTML과 CSS 코드를 통해 구현된 이 애니메이션은 사용자의 시선을 효과적으로 페이지의 다른 부분으로 이끌어, 추가 내용을 탐색하게 만듭니다.  

애니메이션은 단순히 미적 요소를 넘어서, 사용자의 행동을 유도하는 데 중요한 역할을 합니다. 사용자가 웹 페이지에서 원하는 정보를 쉽게 찾을 수 있도록 돕는 동시에, 사이트의 전체적인 흐름과 이야기를 자연스럽게 이끌어줍니다. 따라서, 마우스 스크롤 유도 애니메이션은 웹사이트 디자인에서 중요한 요소로 간주됩니다.

또한, 이 애니메이션은 다양한 웹사이트와 애플리케이션에서 광범위하게 적용될 수 있습니다. 랜딩 페이지, 포트폴리오, 온라인 매거진, e-커머스 사이트 등 다양한 유형의 웹사이트에서 이 애니메이션을 활용해 사용자의 관심을 끌고, 필요한 정보로 안내할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-04-mouse-scroll/">예제결과 미리보기</a>
</div>