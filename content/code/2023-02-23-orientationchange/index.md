---
title: jQuery - iOS 모바일 가로 세로 모드 전환 구분하는 방법
description: jQuery를 사용하여 iOS 모바일 가로 세로 모드 전환을 구분하는 코드 예제입니다.
slug: 2023-02-23-orientationchange
date: 2023-02-23 00:00:00+0000
lastmod: 2023-02-23 00:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-pagination.webp

categories:
    - jQuery
tags:
    
---

모바일 기기에서 웹 애플리케이션을 개발하다 보면 가로 모드와 세로 모드의 차이에 따라 사용자 경험이 달라질 수 있습니다.   
이러한 모드 전환을 감지하고 적절한 대응을 취하는 것은 중요한 과제 중 하나입니다.   
특히 iOS 기기에서는 가로와 세로 모드 전환 감지가 조금 다른데요, jQuery를 사용하여 iOS 모바일 기기에서 가로와 세로 모드 전환을 감지하는 방법에 대해 알아보겠습니다.  

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

## 문제 발견
iOS 기기에서는 resize 이벤트를 사용하여 화면의 높이 값을 계산하는 도중 문제가 발생했습니다.  
아이폰에서는 가로 모드에서 세로 모드로, 또는 그 반대로 화면 방향이 전환될 때 resize 이벤트가 정상적으로 실행되지 않는 것을 확인하였습니다.  
<br>

## 해결 방법
* orientationchange 이벤트 활용 :  
이 문제를 해결하기 위해, 모바일 환경에서 방향 전환을 감지하는 orientationchange 이벤트를 활용할 수 있었습니다. 
이 이벤트를 통해 가로와 세로 모드의 전환을 감지하고 이에 대응하는 로직을 구현하였습니다.

* 화면 방향 구분 :  
기존에 사용하던 screen.orientation 속성이 사파리에서 호환되지 않았고, window.orientation 속성이 웹 표준으로 분류되지 않아 권장되지 않았습니다. 따라서 이러한 제약을 극복하기 위해 다른 방법을 찾아야 했습니다.  
그래서 화면의 크기를 확인하여 가로가 세로 보다 크다면 가로 모드로, 그렇지 않다면 세로 모드로 구분하는 방식을 선택하였습니다.  

* 정확한 크기 반영을 위한 추가적인 처리 :  
orientationchange 이벤트가 실행될 때 화면 방향 전환이 이전의 크기 정보를 반영하여 발생한다는 문제점이 있었습니다. 
정확한 크기를 반영하기 위해 resize 이벤트를 강제로 한 번 실행시키는 방법을 도입하였습니다.

* iOS 기기와 안드로이드의 구분 :  
안드로이드 기기에서는 resize 이벤트가 정상적으로 실행되었으나, iOS 기기에서는 문제가 발생했습니다.   
따라서 iOS 기기를 구별하여 해당 이슈를 해결하는 코드를 추가하였습니다.  
<br>



## jQuery 코드
아래는 위에서 설명한 내용을 바탕으로 jQuery를 사용하여 구현한 코드 예시입니다.

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

1. iOS 기기 여부 확인 :  
첫 번째 줄에서는 사용자의 브라우저 정보를 통해 현재 기기가 iPod, iPhone, iPad인지를 확인합니다.   
이는 navigator.userAgent를 통해 현재 기기의 정보를 문자열로 받아오고, 정규 표현식 /iPod|iPhone|iPad/을 사용하여 iOS 기기 중 어느 하나와 일치하는지 검사합니다.

2. iOS 기기인 경우 처리 :  
만약 현재 기기가 iOS 기기라면, 코드 블록 안의 내용이 실행됩니다.   
이 부분에서는 orientationchange 이벤트를 감지하고, 그에 따른 동작을 정의합니다.

3. orientationchange 이벤트 리스닝 :  
orientationchange 이벤트는 화면의 방향 전환을 감지하는 이벤트입니다.  
화면 방향이 변경될 때마다 내부 코드 블록이 실행됩니다.

4. resize 이벤트 리스닝 :  
내부 코드 블록 안에서는 화면의 크기가 변경될 때 발생하는 resize 이벤트를 리스닝합니다.   
하지만 이벤트 핸들러는 one 함수로 등록되어 있어 한 번만 실행됩니다. 이렇게 함으로써 중복 실행을 방지할 수 있습니다.

5. 가로 및 세로 모드 판별 :  
화면 크기를 통해 가로 모드와 세로 모드를 구분합니다.   
window.innerWidth는 브라우저 창의 너비를, window.innerHeight는 브라우저 창의 높이를 나타냅니다.   
이를 비교하여 가로 모드인지 세로 모드인지 판별하고, 그에 맞는 메시지를 출력합니다.

6. 메시지 출력 :  
마지막으로, 선택된 &lt;div&gt; 요소에 해당하는 부분에 메시지를 출력합니다.  
이를 통해 사용자에게 현재 화면 모드를 시각적으로 전달합니다.  
<br>

## 결론
orientationchange 이벤트를 활용하여 iOS 기기에서의 가로 및 세로 모드 전환을 정확하게 감지할 수 있습니다.  
또한, iOS와 안드로이드 간의 호환성 문제를 고려하여 코드를 작성함으로써 웹 애플리케이션의 사용자 경험을 개선할 수 있습니다. 
더 나은 사용자 경험을 제공하기 위해 브라우저 및 기기 간의 차이를 고려하는 것은 웹 개발자에게 중요한 역량 중 하나입니다. 
이와 같은 상황에서 유연한 접근법을 선택함으로써 사용자들에게 더 나은 웹 환경을 제공할 수 있습니다.  

<!-- [>> 예제 다운로드](https://github.com/ctrlcccv/orientationchange){:target="_blank"} -->
