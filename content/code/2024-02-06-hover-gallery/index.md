---
title: >  
    CSS - hover 효과로 영역이 확대되는 이미지 갤러리 만들기
description: >  
    CSS의 hover 선택자를 사용하여 마우스를 올렸을 때 선택된 이미지의 영역이 확대되는 갤러리를 제작하는 방법을 상세히 설명합니다. 갤러리 디자인에 적합한 HTML 마크업과, 이미지들을 유연하게 배치하는 flex 속성, 그리고 이미지의 확대 효과를 부드럽게 처리하는 transition 속성까지, 단계별로 쉽게 따라 할 수 있는 가이드를 제공합니다.  

slug: 2024-02-06-hover-gallery
date: 2024-02-06 00:00:00+0000
lastmod: 2024-02-06 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-02-06-hover-gallery.webp

categories:
    - CSS
tags:
    - CSS 애니메이션
---
웹사이트의 시각적인 매력을 높이는 데 중요한 요소 중 하나는 이미지 갤러리입니다. 이미지 갤러리는 사용자의 관심을 끌고, 웹사이트의 콘텐츠를 효과적으로 전시하는 방법으로 활용됩니다. 특히, 사용자의 마우스 호버(hover)를 감지하여 이미지가 확대되는 효과는 사용자 경험을 풍부하게 만들어 주는 요소입니다.  

이 글에서는 마우스를 이미지 위에 올렸을 때 영역이 확대되는 갤러리 효과를 구현하는 데 필요한 HTML 구조와 CSS 코드를 상세히 설명합니다. HTML에서는 갤러리를 구성할 이미지들을 리스트 형태로 정의하고, CSS에서는 flexbox 레이아웃과 hover 선택자, 그리고 transition 속성을 활용하여 각 이미지가 자연스럽게 확대되도록 스타일링하는 방법을 다룹니다.  

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

이미지 갤러리를 만들기 위한 HTML 구조는 간결하고 명료해야 합니다. 복잡한 구조보다는 최대한 단순하고 의미론적인 마크업을 사용하여 구축하는 것이 바람직합니다. 다음은 이미지 갤러리를 위한 기본 HTML 구조입니다.

```html
<ul class="gallery">
    <li><img src="https://picsum.photos/id/90/1000/1000" alt="이미지"></li>
    <li><img src="https://picsum.photos/id/91/1000/1000" alt="이미지"></li>
    <li><img src="https://picsum.photos/id/92/1000/1000" alt="이미지"></li>
    <li><img src="https://picsum.photos/id/93/1000/1000" alt="이미지"></li>
</ul>
```

* **&lt;ul&gt; 요소와 클래스**
  * 이미지들을 감싸고 있는 &lt;ul&gt; 요소는 갤러리의 컨테이너로 작용하며, 'gallery'라는 클래스를 가집니다.

* **&lt;li&gt; 요소**
  * 각 &lt;li&gt; 요소는 갤러리 내의 개별 이미지를 의미합니다. 이들은 블록 레벨 요소로, 하나의 행에 자신의 공간을 차지하려는 특성을 가지고 있습니다.

* **&lt;img&gt; 요소와 src 속성**
  * &lt;img&gt; 태그는 실제로 갤러리에서 보일 이미지를 표시합니다. 각 이미지는 고유한 src(URL) 속성이 있어 웹 브라우저가 웹 서버로부터 이미지를 가져와 표시할 수 있게 합니다.

* **alt 속성**
  * 'alt' 속성은 이미지의 대체 텍스트를 제공하며, 이미지가 불러와 지지 않을 때나, 시각 장애가 있는 사용자가 스크린 리더를 사용할 때 중요한 정보를 제공합니다. 이는 웹 접근성(Web Accessibility)을 높이는 데 기여합니다.  

<br>

## CSS 스타일

이미지 갤러리의 HTML 구조가 완성되었다면, 이제 CSS를 이용하여 스타일을 적용합니다. CSS는 웹 페이지의 디자인을 결정하는 중요한 부분으로, 여기서는 flexbox 레이아웃과 hover 효과 그리고 transition 애니메이션을 중점적으로 다룹니다.

```css
.gallery {
    display: flex;
    width: 600px;
    height: 300px;
}

.gallery > li {
    flex: 1;
    position: relative;
    transition: all 0.3s;
}

.gallery > li:hover {
    flex: 3;
}

.gallery > li img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

* **.gallery 클래스**
  * 이 클래스는 &lt;ul&gt; 요소에 적용되어 전체 갤러리의 레이아웃을 결정합니다.
  * 'display: flex' 속성을 통해 자식 요소들(&lt;li&gt;들)이 유연한 박스 모델(flexbox) 안에서 배치되도록 합니다.
  * 'width'와 'height' 속성으로 갤러리의 너비와 높이를 고정값으로 설정합니다.

* **.gallery > li 스타일링**
  * 갤러리의 각 항목(&lt;li&gt;들)은 기본적으로 'flex: 1' 속성을 통해 같은 비율로 공간을 차지합니다.
  * 'position: relative'는 하위 요소인 &lt;img&gt; 태그가 절대 위치를 기준으로 설정될 때, &lt;li&gt;를 기준으로 하도록 만듭니다.
  * 'transition: all 0.3s' 속성은 스타일 변화가 0.3초 동안 진행되도록 하여 부드러운 확대/축소 애니메이션을 생성합니다.

* **Hover 효과와 flex 확대**
  * '.gallery > li:hover' 선택자는 사용자가 마우스를 갤러리의 특정 항목 위에 올렸을 때 그 항목에만 적용됩니다.
  * 'flex: 3' 속성은 호버되는 &lt;li&gt;의 flex 값을 3으로 변경하여, 해당 &lt;li&gt;가 다른 &lt;li&gt;들에 비해 커집니다.

* **.gallery > li img 이미지 스타일링**
  * &lt;img&gt; 요소는 절대 위치로 설정되어 &lt;li&gt; 요소 내에서 자신의 부모요소인 &lt;li&gt;를 기준으로 위치를 잡습니다.
  * 'top', 'left', 'width', 'height' 속성을 모두 0 혹은 100%로 설정하여 이미지가 &lt;li&gt;의 크기에 맞춰진 전체 영역을 차지하도록 합니다.
  * 'object-fit: cover'는 이미지가 &lt;li&gt; 영역을 벗어나지 않으면서 비율을 유지하며 채워지도록 합니다.


<br>

## 결론
마우스 호버를 통한 이미지의 영역 확대는 갤러리 내의 특정 이미지에 주목할 기회를 만들어주며, 웹사이트 방문자를 끌어들이는 중요한 요인이 됩니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-02-06-hover-gallery/" target="_blank">예제결과 미리보기</a>
</div>
