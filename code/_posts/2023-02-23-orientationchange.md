---
layout: post
title: jQuery - iOS 모바일 가로 세로 모드 전환 구분하는 방법
#image: 
  # path: /assets/img/blog/swiper-pagination.webp
description: > 
  jQuery를 사용하여 iOS 모바일 가로 세로 모드 전환 구분하는 코드 예제
keywords: > 
  jQuery를 사용하여 iOS 모바일 가로 세로 모드 전환 구분하는 코드 예제
sitemap: true
comments: false
---
resize 이벤트를 실행하여 높이 값을 계산하는 도중, 아이폰에서 가로 · 세로 화면 모드 전환이 일어날 때 resize 이벤트가 실행되지 않는 것을 발견했다.  
orientationchange이라는 모바일 방향 전환 감지하는 이벤트가 있었고, 가로 · 세로 모드 구분도 검토했다.  
<br>
screen.orientation 속성은 사파리에서 호환되지 않기 때문에 사용할 수 없었고, window.orientation 속성은 더 이상 웹 표준으로 분류되지 않아 권장되지 않았다.  
그래서 화면 크기를 확인해서 가로가 세로 크기보다 크면 가로 모드, 작으면 세로 모드로 구분했다.
<br>  
orientationchange 이벤트가 실행될 때 화면 방향 전환 이전 크기가 반영되어서, 정확한 크기를 반영하기 위해 resize 이벤트를 강제적으로 한 번 실행했다.  
안드로이드에서는 resize 이벤트가 실행되어, 중복 실행을 막기 위해 iOS 디바이스를 구별하는 코드를 추가했다.  

## JS

```js
const ios = navigator.userAgent.match(/(iPod|iPhone|iPad)/)
if (ios) {
  $(window).on("orientationchange", function(event) {
    $(window).one('resize', function() {
      if (window.innerWidth > window.innerHeight) {
        $('div').text('가로 모드 전환')
      } else {
        $('div').text('세로 모드 전환')
      }
    });
  });
}
```

<br>
[>> 예제 보기](https://ctrlcccv.github.io/orientationchange){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
