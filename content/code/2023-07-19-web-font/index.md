---
title: 웹폰트 사용 시 윈도우, 맥 OS 폰트 굵기 차이 문제
description: >  
    웹폰트를 사용할 때 OS별 렌더링 차이를 해결한 방법입니다.
slug: 2023-07-19-web-font
date: 2023-07-19 01:00:00+0000
lastmod: 2023-07-19 01:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-tab.webp

categories:
    - jQuery
tags:
    - 웹폰트
    - CSS
    - 크로스브라우징
---
웹 디자인에서 폰트 선택은 웹사이트나 앱의 전반적인 분위기와 사용자 경험에 큰 영향을 미칩니다. 하지만 때로는 다양한 운영체제(OS)와 브라우저에서 폰트가 다르게 표시되는 문제에 직면할 수 있습니다. 특히 웹폰트를 사용할 때, 윈도우와 맥 OS 간의 폰트 굵기 차이 문제는 종종 발생합니다.


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

## -webkit-font-smoothing: antialiased 속성과 안티앨리어싱 문제
안티앨리어싱은 텍스트와 같은 작은 요소를 부드럽게 표시하기 위한 기술입니다. 웹폰트를 사용할 때, 텍스트가 부드럽게 보이도록 하기 위해 -webkit-font-smoothing: antialiased 속성을 추가하는 것이 일반적입니다. 그러나 윈도우 OS에서는 이 속성이 제대로 반영되지 않는 문제가 있습니다.  
<br>

## 윈도우와 맥 OS 간의 폰트 굵기 차이 문제
윈도우와 맥 OS는 폰트를 표시하는 방식이 다르기 때문에, 동일한 폰트를 사용해도 화면에서 서로 다르게 보일 수 있습니다.   
웹폰트로 Spoqa Han Sans Neo 폰트를 사용하던 중, 맥 OS에서는 포토샵에서 만든 시안과 비슷하게 폰트가 표시되지만, 윈도우 OS에서는 폰트 굵기가 더 강조되고 약간의 왜곡이 발생하는 문제를 발견했습니다.  
<br>

## 문제 해결 방법
이러한 문제를 해결하기 위해 운영체제 환경을 감지하고, 각각의 환경에 맞게 폰트 굵기를 조정하는 제이쿼리 스크립트를 활용했습니다.

```js
//윈도우 OS 폰트 설정
function windowOS() {
    let isWindows = navigator.platform.indexOf('Win') > -1;
    if (isWindows) {
        $('body').addClass('windowOS');
    }
    $('.windowOS *').each(function() {
        var fontWeight = $(this).css('font-weight');
        if (fontWeight === '700') {
            $(this).css({
                'font-weight': '500',
                'transform': 'rotate(0.03deg)'
            });
        }
        if (fontWeight === '500') {
            $(this).css({
                'font-weight': '400',
                'transform': 'rotate(0.03deg)'
            });
        }
    });
}
```

1. 윈도우 OS 감지 :  
navigator.platform을 사용하여 사용자의 운영체제가 Windows인지 확인합니다. navigator.platform은 현재 브라우저가 동작하고 있는 플랫폼 정보를 제공합니다. 만약 'Win'이라는 문자열이 포함되어 있다면 (즉, Windows 운영체제에서 실행 중이라면), isWindows 변수는 true로 설정됩니다.

2. 윈도우 OS 클래스 추가 :  
위에서 감지한 결과가 true인 경우, &lt;body&gt; 요소에 windowOS 클래스를 추가합니다. 이렇게 클래스를 추가함으로써 스타일링에 따른 윈도우 운영체제 환경에서만 적용될 CSS 규칙을 추가할 수 있습니다.

3. 폰트 굵기 조정 :  
windowOS 클래스를 가진 요소들을 선택하고, 각 요소의 폰트 굵기를 조정하는 부분입니다. 각 요소의 폰트 굵기가 700인 경우 500으로 변경하고, 폰트 굵기가 500인 경우 400으로 변경합니다. 동시에 transform 속성을 사용하여 텍스트를 약간 회전시켜서 폰트가 왜곡되는 문제를 완화합니다.  
<br>


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


## 주의사항
만약 transform 속성이 포함된 요소가 애니메이션 효과를 가진 레이아웃에 사용된다면, 스크립트로 일괄 적용한 transform 속성이 문제를 일으킬 수 있습니다. 이런 경우에는 windowOS 클래스를 활용하여 CSS 파일에 별도의 transform 속성을 추가하는 것이 좋습니다.  
<br>

## 결론
웹폰트를 사용할 때 발생하는 폰트 굵기와 왜곡 문제는 디자인의 일관성과 웹페이지의 완성도에 영향을 줄 수 있습니다. 이러한 문제를 해결하기 위해 윈도우 OS 감지와 폰트 굵기 조정 방법을 사용하여, 서로 다른 환경에서도 일관된 웹 경험을 제공할 수 있습니다.  



<!-- [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"} -->
