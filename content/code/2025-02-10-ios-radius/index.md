---
title: >  
    iOS에서 border-radius와 overflow: hidden 렌더링 버그 해결하기

description: >  
    iOS 환경에서 border-radius와 overflow: hidden으로 발생하는 렌더링 문제를 isolation: isolate와 -webkit-mask-image를 사용하여 효과적으로 해결하는 방법을 소개합니다.

slug: 2025-02-10-ios-radius
date: 2025-02-10 00:00:00+0000
lastmod: 2025-02-10 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-02-10-ios-radius.webp

categories:
    - CSS
tags:
---

웹 개발 시, 특히 CSS를 사용할 때 종종 발생하는 문제 중 하나는 다양한 브라우저 간의 렌더링 차이입니다. 그중에서도 iOS 환경에서 border-radius와 overflow: hidden 속성을 함께 사용할 때 발생하는 문제가 있습니다. 이 문제는 요소의 둥근 모서리에 의도적으로 잘린 콘텐츠가 제대로 표시되지 않는 문제로 이어질 수 있습니다. 이번 포스트에서는 이 문제를 해결하기 위해 -webkit-mask-image 속성을 이용한 방법을 공유하고자 합니다.  



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

## 문제 설명
일반적으로 border-radius 속성을 사용하면 요소의 모서리가 둥글게 처리됩니다. 그리고 overflow: hidden 속성을 추가하면 요소의 경계 바깥에 있는 콘텐츠가 잘리게 됩니다. 그러나 iOS 환경에서는 이 두 가지 속성을 동시에 사용할 때 원하는 대로 렌더링 되지 않는 경우가 많습니다. 즉, 둥근 모서리에 대해 제대로 잘리지 않거나 잘못된 영역을 잘라낼 수 있습니다. 이러한 문제는 크로스 브라우저 호환성을 고려할 때 매우 신경 쓰이는 부분입니다.

<br>

## 해결 방법 : isolation: isolate 및 -webkit-mask-image 사용
iOS에서 발생하는 이 문제를 해결하기 위해 추가로 적용한 CSS 코드가 있습니다.

```css
.your-element {
    border-radius: 10px;
    overflow: hidden;
    isolation: isolate;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}
```

* **isolation: isolate**  
isolation: isolate; 속성은 요소를 별도의 레이어로 분리하여 다른 레이어의 영향을 받지 않게 해줍니다. 이 속성을 사용하면 렌더링 문제를 우회하고, 요소가 독립적으로 렌더링 되도록 보장할 수 있습니다. 이는 iOS에서 발생하는 레이어 간의 충돌 문제를 방지하는 데 큰 도움이 됩니다.  

* **-webkit-mask-image**  
-webkit-mask-image: -webkit-radial-gradient(white, black); 속성은 요소의 마스크를 설정하여, 해당 요소의 특정 부분을 표시하거나 숨길 수 있는 효과를 제공합니다. 이 경우, 흰색 부분 (가장자리)에서는 요소를 보이게 하고, 검은색 부분 (중앙)에서는 요소를 숨깁니다. 이 속성을 추가함으로써, 둥근 모서리 효과를 잘 살리면서도 콘텐츠가 잘리는 문제를 해결할 수 있습니다.




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

### 어떻게 작동할까요?
* border-radius는 기본적으로 요소의 경계에서 둥근 모서리를 생성합니다.
* overflow: hidden은 화면에 표시되는 영역을 제한하지만, iOS에서는 이 두 속성이 함께 사용될 때 예기치 않은 결과를 초래할 수 있습니다.
* isolation: isolate를 통해 독립적인 레이어로 분리하면, 이러한 충돌 문제를 완화합니다. 이에 따라 웹킷 기반 브라우저에서 더 안정적인 렌더링을 가능하게 합니다.
* 추가로 -webkit-mask-image는 실제로 마스크를 생성하여 시각적 표현을 더 부드럽고 매끄럽게 만들어줍니다.

<br>

## 결론
iOS에서 border-radius와 overflow: hidden을 함께 사용할 때 발생할 수 있는 렌더링 문제는 크로스 브라우저 호환성을 위해 반드시 해결해야 하는 체크 포인트입니다. -webkit-mask-image와 isolation: isolate 속성을 조합하여 사용하면 이러한 문제를 효과적으로 해결할 수 있습니다.  

웹 개발자라면 다양한 환경에서의 최적화를 신경 써야 하며, 이런 작은 트릭들이 모여 큰 차이를 만들어냄을 기억해야 합니다. 지속적으로 발생할 수 있는 웹킷 기반 브라우저의 이슈에 대한 해결책을 연구한다면 더 나은 사용자 경험을 제공할 수 있을 것입니다. 여러분도 이 방법을 활용해 보시기 바랍니다!  

