---
title: jQuery - 스크롤 내렸을 때 유튜브 영상 자동재생
description: >  
    웹 페이지 스크롤 시 유튜브 영상이 자동으로 재생되는 기능을 구현하는 jQuery 코드입니다. 비디오가 뷰포트에 충분히 노출될 때 재생을 시작하고, 뷰포트 영역을 벗어나면 일시 중지하는 방법을 자세히 설명합니다.

slug: 2024-01-01-youtube-scroll
date: 2024-01-01 00:00:00+0000
lastmod: 2024-01-01 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-01-youtube-scroll.webp

categories:
    - jQuery
tags:
    - YouTube
---
jQuery와 YouTube Iframe API를 사용하여 사용자가 스크롤 하면서 동영상이 있는 영역에 도달했을 때 자동으로 해당 유튜브 영상을 재생하고, 해당 영역에서 벗어났을 때 영상을 일시 중지하도록 하는 기능을 구현하는 코드를 설명합니다.   


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
<div class="con">
    스크롤을 내려서 유튜브 동영상의<br>자동재생을 확인해보세요.

<div class="video" data-video-id="rJe_YsLJqUY">
    <div class="player">

<div class="video" data-video-id="rJe_YsLJqUY">
    <div class="player">

<!-- 더 많은 .video 요소를 추가할 수 있습니다. -->
```
- **동영상 컨테이너 (.video)**

  - 각 `.video` 요소는 하나의 유튜브 비디오를 담는 컨테이너 기능을 합니다. 
  - `data-video-id` 속성으로 해당 동영상의 YouTube ID를 지정합니다.  
<br>

## CSS 스타일

```css
.video { position: relative; width: 854px; height: 480px; margin: 50px auto; } 
.player { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } 
```
- **비디오 및 플레이어 스타일링**

  - `.video` 요소는 동영상의 구체적인 위치와 크기를 지정합니다.
  - `.player` 요소는 비디오 플레이어가 들어갈 자리를 절대 위치로 지정합니다.


<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

## jQuery 코드

```js
// YouTube Iframe API 스크립트 로드
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 페이지에서 비디오 요소를 식별합니다.
const $videos = $('.video');
// 노출되어야 하는 비디오 요소의 백분율 설정
const exposurePercentage = 100;

// YouTube Iframe API가 준비되면 호출되는 함수
function onYouTubeIframeAPIReady() {
    $videos.each(function() {
        const $videoWrap = $(this);
        const videoId = $videoWrap.data('video-id');
        const player = new YT.Player($videoWrap.find('.player')[0], {
            height: '480',
            width: '854',
            videoId: videoId,
            playerVars: { 
                'rel': 0 
            },
            events: { 
                'onReady': onPlayerReady 
            }
        });
        // 각 비디오 요소의 플레이어 및 재생 상태 저장
        $videoWrap.data({ player: player, isPlaying: false });
    });
}

// 플레이어 객체가 준비되면, 스크롤 이벤트 핸들러를 설정합니다.
function onPlayerReady() {
    // 스크롤 이벤트에서 비디오 재생 상태를 확인 및 조정
    $(window).on('scroll', function() {
        $videos.each(function() {
            const $videoWrap = $(this);
            const player = $videoWrap.data('player');
            const isPlaying = $videoWrap.data('isPlaying');
            if (isViewport($videoWrap, exposurePercentage) && !isPlaying) { // 재생
                player.mute();
                player.playVideo();
                const playerState = player.getPlayerState();
                if (playerState == YT.PlayerState.ENDED) {
                    player.playVideo();
                }
                $videoWrap.data('isPlaying', true);
            } else if (!isViewport($videoWrap, exposurePercentage) && isPlaying) { // 일시정지
                player.pauseVideo();
                $videoWrap.data('isPlaying', false);
            }
        });
    }).scroll();
}

// 요소가 뷰포트 내에 exposurePercentage의 값만큼 노출되어 있는지 확인
function isViewport($el, exposure) {
    const rect = $el[0].getBoundingClientRect();
    const winHeight = window.innerHeight;
    const threshold = rect.height * (exposure / 100);
    return rect.top <= winHeight - threshold && rect.bottom >= threshold;
}
```
* **YouTube Iframe API 로드**
  * 동적으로 스크립트를 생성하여 Iframe API 스크립트를 페이지에 로드합니다.
  * 이 API는 YouTube 영상을 앱 내에서 제어할 수 있는 함수들을 제공합니다.

* **자동재생과 일시정지 로직**
  * `onYouTubeIframeAPIReady` 함수 내에서 각 비디오 플레이어 객체를 초기화합니다.
  * `onPlayerReady` 함수는 플레이어가 준비될 때 각 비디오에 스크롤 이벤트를 바인딩합니다.
  * 스크롤 이벤트가 발생할 때마다 `isViewport`함수를 통해 비디오가 충분히 노출되었는지 확인합니다.
  * 충분히 노출된 비디오는 재생되며, 그렇지 않으면 일시 중지됩니다.

* **비디오 뷰포트 검사**
  * `isViewport` 함수는 비디오가 현재 화면에 얼마나 노출되었는지를 계산합니다.
  * 설정된 노출 백분율에 따라 재생 여부를 판단합니다.  
<br>


## 결론 및 주의사항
jQuery와 YouTube Iframe API를 활용하여 스크롤에 반응하는 동영상 재생 기능을 구현함으로써, 사용자의 관심을 끌고 참여를 유도하는 웹 페이지를 만들 수 있습니다. 이러한 기능은 특히 미디어 중심의 웹사이트나 교육 콘텐츠를 제공하는 플랫폼에 유용하게 사용될 수 있습니다.  

그러나 사용자 경험 측면에서 주의해야 할 점이 있습니다. 사용자로서는 웹 페이지나 앱이 의도와 무관하게 소음을 내기 시작하면 불쾌하거나 거슬릴 가능성이 높습니다. 브라우저는 보안 및 사용자 경험 개선을 위해 일반적으로 특정 조건에서만 자동 재생을 허용하고 있습니다. 따라서 자동 재생 기능을 추가할 때에는 사용자의 권한을 존중하고, 특히 음성 미디어는 [브라우저의 자동 재생 정책](https://developer.mozilla.org/ko/docs/Web/Media/Autoplay_guide)을 고려하여 적절한 문구나 동작을 추가하는 것이 중요합니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-01-youtube-scroll/">예제결과 미리보기</a>
</div>

