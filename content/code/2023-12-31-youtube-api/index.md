---
title: 유튜브 API 사용법 및 예제 (IFrame Player API)
description: >  
    유튜브 IFrame Player API를 사용하여 웹 페이지에 동영상을 삽입하고 제어하는 방법을 소개하며, 코드 예제와 함께 API의 기본적인 활용 방법을 설명합니다.  

slug: 2023-12-31-youtube-api
date: 2023-12-31 00:00:00+0000
lastmod: 2023-12-31 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-31-youtube-api.webp

categories:
    - jQuery
tags:
    - YouTube
---
유튜브 API는 개발자가 유튜브의 다양한 기능을 활용할 수 있게 해주는 강력한 도구입니다. 특히, IFrame Player API는 웹 페이지에 유튜브 동영상을 쉽게 삽입하고 제어할 수 있는 기능을 제공합니다. 이 글에서는 유튜브 IFrame Player API를 활용하는 방법과 예제 코드를 다뤄보겠습니다.  


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## IFrame Player API 사용 예시

```html
<!-- YouTube 동영상을 삽입할 <div> 태그 -->
<div id="player"></div>

<!-- YouTube API 코드 비동기로 로드 -->
<script>
    // YouTube API 스크립트 동적으로 로드
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubePlayerAPIReady() {
        // 플레이어 생성 및 설정
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: 'Jruqk1rSGeg',
            playerVars: {
                'autoplay': 1,  // 자동 재생
                'controls': 0,  // 컨트롤 숨김
                'rel': 0       // 관련 동영상 표시 안 함
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 플레이어 준비 시 음소거 및 재생 시작
    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

  // 플레이어 상태 변화 감지
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            console.log('동영상 재생이 종료되었습니다.');
        } else if (event.data == YT.PlayerState.PLAYING) {
            console.log('동영상이 재생 중입니다.');
        } else if (event.data == YT.PlayerState.PAUSED) {
            console.log('동영상이 일시정지되었습니다.');
        }
        // ... 추가적인 상태에 따른 동작을 정의할 수 있습니다.
    }
</script>
```

<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

* **YouTube API 스크립트 로드**  
  * onYouTubePlayerAPIReady 함수는 YouTube API 코드가 로드된 후 실행됩니다.
  * 동적으로 YouTube API 스크립트를 로드하여 플레이어를 초기화합니다.

* **플레이어 설정**
  * YT.Player 객체를 생성하여 동영상 플레이어를 설정합니다.
  * playerVars 속성을 사용하여 자동 재생, 컨트롤 숨김, 관련 동영상 표시 안 함 등을 설정합니다.

* **플레이어 동작 설정**  
  * onPlayerReady 함수에서 플레이어가 준비되면 음소거 및 자동 재생을 설정합니다.

* **플레이어 상태 변화 감지**  
  * onPlayerStateChange 함수는 플레이어의 상태가 변할 때 실행됩니다.
  * 동영상 재생이 종료되었을 때, 재생 중일 때, 일시정지 상태일 때 각각의 동작을 정의할 수 있습니다.   

<br>


## 공식 홈페이지 문서 링크
추가적인 정보를 얻고 싶거나 더 자세한 내용을 확인하고 싶다면 공식 유튜브 IFrame Player API 문서를 참고하는 것이 좋습니다. 아래는 참고할 수 있는 두 가지 주요 링크입니다.  

* [유튜브 IFrame Player API 공식 문서](https://developers.google.com/youtube/iframe_api_reference?hl=ko)  
IFrame Player API의 자세한 기능 및 메서드에 대한 설명, 예제 코드, 이벤트 처리 방법 등이 제공됩니다.

* [유튜브 Player 매개변수 공식 문서](https://developers.google.com/youtube/player_parameters?hl=ko)  
플레이어 생성 시 설정할 수 있는 매개변수들에 대한 설명이 포함되어 있습니다. 자동 재생, 음소거, 컨트롤 숨김 등 다양한 설정에 관한 정보를 얻을 수 있습니다.  
<br>

## 결론 
이 글을 통해 유튜브 IFrame Player API를 활용한 동영상 삽입 및 컨트롤의 기본 원리를 이해했습니다. 비동기적으로 YouTube API 코드를 로드하고, 플레이어를 설정하며, 특정 상태 변화에 대한 동작을 정의함으로써 웹 페이지에서 유튜브 동영상을 유연하게 다룰 수 있습니다.    
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-31-youtube-api/">예제결과 미리보기</a>
</div>
