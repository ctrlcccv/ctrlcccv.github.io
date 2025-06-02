---
title: CSS - 유튜브 동영상 배경 만들기 (반응형)
description: >  
    HTML과 CSS를 활용하여 유튜브 동영상을 웹사이트의 반응형 배경으로 설정하는 방법에 대해 상세하게 설명합니다. 동영상이 자동으로 재생되고 무음 상태로 반복되며, 클릭이나 터치를 방지하는 스타일링 기법을 다룹니다.

slug: 2024-01-05-youtube-background
date: 2024-01-05 01:00:00+0000
lastmod: 2024-01-05 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-05-youtube-background.webp

categories:
    - CSS
tags:
    - YouTube
---
웹사이트 디자인에서 동영상 배경은 방문자에게 강렬하고 다이나믹한 인상을 줄 수 있는 매력적인 요소입니다. 특히, 유튜브 동영상을 배경으로 사용하는 경우, 고품질의 영상 콘텐츠를 쉽게 통합할 수 있습니다. 이 글에서는 유튜브 동영상을 반응형 웹 디자인에 적합하게 배경으로 설정하는 방법을 소개합니다.  



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
<div class="video_bg">
    <iframe src="https://www.youtube.com/embed/rJe_YsLJqUY?autoplay=1&mute=1&loop=1&playlist=rJe_YsLJqUY"></iframe>

```
* **비디오 컨테이너**
  * `video_bg` 클래스를 가지는 `div` 요소는 유튜브 동영상 `iframe`을 감싸고 있으며, 반응형 배경의 컨테이너 역할을 합니다.

* **iframe 요소**
  * 유튜브 동영상을 임베딩하기 위해 `iframe` 태그를 사용합니다.
  * 동영상의 URL에는 자동 재생(`autoplay=1`), 음소거(`mute=1`), 루프 재생(`loop=1`), 그리고 재생 목록(`playlist`) 파라미터가 포함되어 있어 동영상이 배경에서 부드럽게 반복됩니다.  
<br>

### 다른 동영상으로 변경하는 방법
1. 유튜브에서 배경으로 설정하고 싶은 동영상을 선택합니다.
2. 동영상 페이지 아래 '공유' 버튼을 클릭한 후 '퍼가기'를 선택합니다.
3. 퍼가기 코드에 있는 src 속성의 URL 중 `https://www.youtube.com/embed/` 다음에 오는 부분이 동영상의 고유 ID입니다.
4. 해당 ID를 복사하여 `iframe`의 src 속성값의 `rJe_YsLJqUY` 부분과 `playlist` 파라미터값에 붙여 넣습니다.

예를 들어, 새로운 동영상의 ID가 `Jruqk1rSGeg`라면, `iframe` 태그는 다음과 같이 변경됩니다.

```html
<iframe src="https://www.youtube.com/embed/Jruqk1rSGeg?autoplay=1&mute=1&loop=1&playlist=Jruqk1rSGeg"></iframe>
```
<br>

### 주의사항
- `autoplay`, `mute`, `loop`, `playlist` 파라미터는 반드시 URL에 포함시켜서 동영상이 자동으로 재생되고, 무음 상태로 반복되도록 설정해야 합니다.
- `playlist` 파라미터에 동영상 ID를 추가하여 동일한 동영상이 반복되도록 해야 합니다.



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
.video_bg {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
}
.video_bg iframe {
    position: absolute;
    top: -60px;
    bottom: -60px;
    left: 0;
    width: 100%;
    height: calc(100% + 120px);
    border: none;
}
.video_bg::after {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
```
* **컨테이너 스타일**
  * `.video_bg`는 `overflow: hidden` 속성을 통해 컨테이너 밖으로 벗어나는 동영상 부분을 숨깁니다.
  * `position: relative`와 `padding-bottom: 56.25%`를 사용하여 반응형 16:9 비율을 유지합니다.

* **`iframe` 스타일**
  * `iframe` 태그에 `position: absolute`를 적용하여 컨테이너 내에서 절대적 위치를 설정합니다.
  * `top`과 `bottom` 값을 음수로 하여 영상의 위아래를 잘라냄으로써, 영상의 타이틀과 컨트롤러가 보이지 않게 숨깁니다.
  * `height`는 `calc(100% + 120px)`를 사용하여 `top`과 `bottom`의 잘린 부분을 보충하고, 영상이 전체 컨테이너를 채우도록 합니다.
  * `border: none`을 통해 `iframe` 주변의 테두리를 없앱니다. 

* **클릭 방지 레이어**
  * `::after` 가상 요소를 사용하여 실제 영상 위에 투명한 레이어를 추가합니다.
  * 이 레이어는 `z-index: 1`로 설정하여 동영상을 가리며, 사용자의 클릭이나 터치가 동영상에 직접 전달되는 것을 방지합니다.  
<br>

## 결론
유튜브 동영상을 HTML과 CSS를 이용하여 웹사이트의 배경으로 설정하는 방법은 시각적으로 매력적인 웹 디자인 요소를 추가하는 훌륭한 방법입니다. 이 방법을 사용하면, 반응형 디자인을 유지하면서도 사용자의 조작 없이 음소거 상태로 자동 재생되는 동영상 배경을 구현할 수 있습니다. 오늘 소개한 기법을 통해 방문자에게 인상적인 첫인상과 사용자 경험을 제공하는 웹페이지를 만들어 보세요.    
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-05-youtube-background/">예제결과 미리보기</a>
</div>

