---
title: CSS - 유튜브 동영상 반응형 사이즈로 만들기
description: >  
    유튜브 동영상을 16:9 비율로 반응형 웹사이트에 맞게 구현하는 CSS 기법을 소개합니다. 가로 세로 비율을 유지하며 모든 디바이스에서 완벽하게 표현되는 비디오 삽입 방법을 설명합니다.

slug: 2023-12-30-youtube-size
date: 2023-12-30 00:00:00+0000
lastmod: 2023-12-30 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-30-youtube-size.webp

categories:
    - CSS
tags:
    - YouTube
---
유튜브 동영상을 웹페이지에 적절하게 삽입하는 것은 웹사이트의 시각적 매력을 높일 수 있는 중요한 방법입니다. 이 글에서는 유튜브 동영상을 반응형으로 만드는 CSS 기법을 소개하며, 사용자가 어떤 플랫폼이나 디바이스에서 접속하더라도 최적의 동영상 시청 경험을 제공하는 방법을 알아봅니다.  


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
<div class="wrap">
    <div class="video">
        <iframe src="https://www.youtube.com/embed/Jruqk1rSGeg?si=55AFpgUVVnuSOb7p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
</div>
```
* **외부 컨테이너 (.wrap)**
  * `wrap` 클래스를 가진 `div`는 유튜브 비디오를 감싸는 컨테이너로 사용되며, CSS를 통해 스타일링됩니다.

* **비디오 컨테이너 (.video)**
  * 실제 동영상을 포함하는 `video` 클래스를 가진 `div`는 반응형 스타일링을 위한 레이아웃의 기초입니다.

* **iframe 요소**
  * `iframe` 태그를 사용하여 유튜브의 동영상을 직접 임베드합니다.
  * `src` 속성에는 일반적인 유튜브 동영상 주소 대신에 임베드용 URL을 사용합니다.
  * `title` 속성을 통해 동영상 제목을 명시하며, 접근성을 개선합니다.
  * `frameborder` 속성은 iframe의 테두리를 나타냅니다. 여기서는 "0"으로 설정함으로써 테두리를 제거합니다.
  * `allowfullscreen` 속성은 사용자가 전체 화면 모드로 비디오를 볼 수 있도록 허용합니다.  


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

## CSS 스타일
```css
.wrap {
    max-width: 80%; 
    margin: 50px auto 0; 
}

.video {
    position: relative;
    width: 100%;
    height: 0; 
    padding-bottom: 56.25%; 
}

.video iframe {
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%; 
    height: 100%; 
} 
```

* **동영상 컨테이너 설정 (.wrap)**  
  * 동영상을 감싸는 외부 컨테이너로, `wrap` 클래스를 사용합니다.
  * `max-width` 속성을 사용하여 컨테이너의 최대 너비를 80%로 제한합니다. 이는 컨테이너가 실제 사용 가능한 공간보다 더 넓어지지 않도록 합니다.
  * `margin` 속성에 `50px auto 0` 값을 지정하여 컨테이너를 수직으로 중앙에 위치시킵니다. 위쪽 여백은 50px, 좌우 여백은 자동으로 설정되며, 하단 여백은 없습니다.  

* **동영상 비율 설정 (.video)**  
  * 내부 컨테이너 `.video`는 실제로 동영상을 담는 공간입니다.
  * `position: relative`를 설정하여, 이후 절대 위치로 설정될 iframe이 부모 요소를 기준으로 위치할 수 있도록 합니다.
  * `width`를 `100%`로 설정하여 부모 요소인 `.wrap`의 너비에 따라 동적으로 너비가 조절됩니다.
  * `height`를 `0`으로 설정하고, `padding-bottom`을 비율에 맞게 `56.25%`로 설정함으로써 동영상의 가로 대 세로 비율인 16:9를 유지할 수 있게 합니다.  

CSS에서 `padding-bottom` 비율을 계산함으로써 특정 가로 세로 비율을 유지하고자 할 때, 다음과 같은 과정을 통해 결정할 수 있습니다. 이 예제에서는 16:9 비율 (널리 사용되는 HD 비디오 형식) 이 사용됩니다. 16:9 비율에서 세로 비율은 가로 비율 대비 9/16입니다. 이 비율을 백분율로 변환하려면 다음과 같이 계산합니다.

> (세로 / 가로) * 100 = (9 / 16) * 100 ≈ 56.25%

이 계산은 가로 크기가 100%일 때 세로 크기를 유지 비율로 정하는 데 활용됩니다.    

* **인라인 프레임 설정 (.video iframe)**  

  * 인라인 프레임인 `iframe` 태그에 스타일을 적용합니다.
  * `position: absolute` 설정을 통해, `.video` 컨테이너 내에서의 절대 위치를 기준으로 하게 됩니다.
  * `top`과 `left`를 `0`으로 설정하여 컨테이너의 상단과 왼쪽 가장자리에 맞춥니다.
  * `width`와 `height`를 `100%`으로 설정하여 부모 컨테이너 `.video`의 전체 영역을 채우도록 합니다.    
<br>

## 결론 
이와 같은 CSS 기법을 사용하여 유튜브 동영상을 반응형으로 재생할 수 있습니다. 화면 크기와 관계없이 동영상은 항상 적합한 비율과 크기로 표시되어 사용자에게 일관된 시청 경험을 제공합니다. 이는 다양한 화면 크기에 대응하는 웹 디자인을 가능하게 하는 중요한 기술입니다.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-30-youtube-size/">예제결과 미리보기</a>
</div>