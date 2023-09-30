---
title: jQuery - 모바일 레이어 팝업 외부 스크롤 막기
description: jQuery를 활용하여 모바일 환경에서 레이어 팝업 외부 스크롤을 막는 코드 예제입니다.
slug: 2023-03-13-popup-scroll
date: 2023-03-13 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/popup-scroll.webp

categories:
    - jQuery
tags:
    - 레이어 팝업
---
모바일 디바이스에서 웹사이트의 사용자 경험을 높이기 위해 레이어 팝업을 사용할 때, 고려사항 중 하나는 레이어 팝업이 열렸을 때 배경 컨텐츠의 스크롤을 막는 것입니다. jQuery를 활용하여 모바일 환경에서 레이어 팝업 외부 스크롤을 막는 코드 예제입니다.

## overflow 속성과 문제점
레이어 팝업을 구현할 때 overflow 속성을 사용하여 내부 스크롤을 유지하면서 외부 스크롤을 차단할 수 있습니다. body 태그에 width: 100%; height: 100%; overflow: hidden; 속성을 적용하면 이론적으로는 외부 스크롤을 막을 수 있습니다. 그러나 iOS 환경에서는 이 속성이 적용되지 않는 문제가 있습니다.  
<br>

## 해결 방법 : touch-action 속성 활용
iOS 환경에서도 외부 스크롤을 막기 위해 touch-action: none; 속성을 활용할 수 있습니다.   
이를 활용하여 터치 이벤트를 비활성화 처리하면 iOS에서도 외부 스크롤을 제어할 수 있습니다.  

### touch-action 속성이란?
touch-action 속성은 터치 이벤트의 기본 동작을 설정하는 CSS 속성입니다.  
이 속성을 활용하면 요소의 터치 이벤트 동작을 커스터마이징할 수 있습니다.  
touch-action 속성은 다음과 같은 값들을 가질 수 있습니다.  
* auto : 기본 동작을 유지합니다.
* none : 요소의 터치 동작을 모두 비활성화합니다.
* pan-x : 가로 스크롤 동작만 허용합니다.
* pan-y : 세로 스크롤 동작만 허용합니다.
* manipulation : 터치 및 확대/축소 동작은 가능하게 하되, 더블 탭으로 확대/축소를 비활성화하여 클릭 이벤트의 딜레이를 제거합니다.   
* pinch-zoom : 페이지의 다중 손가락 스크롤 및 확대/축소 기능을 활성화합니다. "pan-" 값 중 하나와 함께 조합하여 사용할 수 있습니다.  
<br>

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

## 예시 코드

### HTML 구조

레이어 팝업을 활용하기 위해 버튼과 팝업 컨텐츠를 다음과 같은 HTML 구조로 작성했습니다.  

```html
<a href="#" class="btn">1번 버튼</a>
<a href="#" class="btn">2번 버튼</a>
<a href="#" class="btn">3번 버튼</a>
<a href="#" class="btn">4번 버튼</a>
<a href="#" class="btn">5번 버튼</a>

<div class="pop_wrap">
    <div class="bg"></div>
    <div class="popup">
        <a href="#" class="close"><img src="images/close.png" alt="닫기"></a>
        <div class="popup_con">
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠<br>
            컨텐츠
        </div>
    </div>
</div>
```

### CSS 스타일

스타일링 부분에서는 버튼 스타일과 팝업 스타일을 지정합니다. 그리고 외부 스크롤을 차단하는 .notScroll 클래스를 적용합니다.  

```css
* {margin: 0;padding: 0;box-sizing: border-box;font-family: 'Noto Sans KR', sans-serif;}
/* 스크롤 막기 CSS */
.notScroll {overflow: hidden;width: 100%;height: 100%;touch-action:none;}
/* 팝업 CSS */
.btn {display: flex;justify-content: center;align-items: center;width: 300px;height: 300px;margin: 0 auto 30px;background: #8ab4f8;font-size: 16px;text-decoration: none;color: #000;}
.pop_wrap {display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 3;}
.pop_wrap .bg {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.8);z-index: 1;}
.popup {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 280px;height: 280px;max-width:90vw;max-height: 90vh;background: #fff;z-index: 2;}
.popup .close {position: absolute;top: 15px;right: 15px;width: 17px;height: 17px;}
.popup .close img {width: 100%;height: 100%;}
.popup .popup_con {overflow: auto;padding: 15px;width: 100%;height: 100%;font-size: 16px;line-height: 24px;color: #000;}
```

### jQuery 코드

레이어 팝업을 열고 닫는 동작을 제어하기 위해 jQuery 코드를 작성합니다.

```js
$(document).ready(function() {
    popup();
})

function popup() {
    //팝업 열기
    $('.btn').on('click', function(e) {
        e.preventDefault();
        $('.pop_wrap').fadeIn(300);
        $("body").addClass('notScroll');
    })

    //팝업 닫기
    $('.pop_wrap .bg, .pop_wrap .close').on('click', function(e) {
        e.preventDefault();
        $('.pop_wrap').fadeOut(100);
        $("body").removeClass('notScroll');
    })
}
```
* 팝업 열기 동작:  
  레이어 팝업을 열기 위한 버튼이 클릭 되면 다음과 같은 동작이 실행됩니다.
  - e.preventDefault() : 버튼의 기본 동작인 링크 이동을 차단합니다.
  - $('.pop_wrap').fadeIn(300) : 팝업을 서서히 나타나게 합니다.
  - $("body").addClass('notScroll') : notScroll 클래스를 body 태그에 추가하여 배경 스크롤을 막습니다.

* 팝업 닫기 동작 :  
  레이어 팝업의 배경 또는 닫기 버튼이 클릭 되면 다음과 같은 동작이 실행됩니다.
  - e.preventDefault() : 클릭 이벤트의 기본 동작을 차단합니다.
  - $('.pop_wrap').fadeOut(100) : 팝업을 서서히 사라지게 합니다.
  - $("body").removeClass('notScroll') : notScroll 클래스를 body 태그에서 제거하여 배경 스크롤을 다시 활성화합니다.  
<br>

## 결론
레이어 팝업을 열 때와 닫을 때의 동작은 사용자가 편리하게 상호작용할 수 있도록 설계되었습니다.   
레이어 팝업이 열릴 때는 배경 스크롤이 막히고, 사용자는 팝업의 내용을 자유롭게 확인할 수 있습니다.   
팝업을 닫을 때는 다시 배경 스크롤이 복원되어 사용자가 자연스럽게 이전 상태로 돌아갈 수 있도록 구현되었습니다.  
iOS 환경에서는 touch-action 속성을 활용하여 스크롤 동작을 관리함으로써 모든 디바이스에서 일관된 사용자 경험을 제공할 수 있도록 주의를 기울였습니다.
이러한 구현을 통해 웹사이트의 모바일 사용자들은 편리하고 원활한 경험을 누릴 수 있게 될 것입니다.   

<!-- [>> 예제 다운로드](https://github.com/ctrlcccv/popup-scroll/){:target="_blank"} -->
