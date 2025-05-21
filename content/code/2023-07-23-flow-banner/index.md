---
title: jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)
description: >  
    jQuery와 CSS를 활용해 반응형 흐르는 롤링 배너를 구현하는 방법을 단계별로 소개합니다.

alternates:
  - title: "jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)"
    href: "https://ctrlcccv.github.io/code/2023-07-23-flow-banner/"
    hreflang: "ko"
  - title: "Responsive jQuery Marquee Banner Tutorial (Infinite Loop)"
    href: "https://ctrlcccv.github.io/code-en/2025-04-24-flow-banner/"
    hreflang: "en"

slug: 2023-07-23-flow-banner
date: 2023-07-23 00:00:00+0000
lastmod: 2025-04-21 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/flow-banner.webp

categories:
    - jQuery
tags:
    - 흐르는 롤링 배너
---
웹사이트에 자연스럽게 흐르는 배너를 만들어보고 싶으신가요?  

이번 글에서는 jQuery를 활용해 간단하면서도 부드럽게 흐르는 롤링 배너를 만드는 방법과, 다양한 화면 크기에 잘 대응할 수 있는 **반응형 버전**까지 함께 구현하는 과정을 소개합니다. 이 글을 통해 웹 프로젝트에 쉽게 적용할 수 있는 실전 예제를 익혀보시기 바랍니다.


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

## HTML 구조
```html
<div class="flow_banner">
    <ul class="list">
        <li>TEXT1</li>
        <li>TEXT2</li>
        <li>TEXT3</li>
        <li>TEXT4</li>
        <li>TEXT5</li>
    </ul>
</div>
```
### 구조 설명

- **flow_banner 클래스**는 배너 전체 영역을 감싸며, 배경색이나 배너의 너비 등 외형을 설정합니다.  
- **list 클래스**는 텍스트 항목이 들어가는 리스트이며, 배너 안에서 가로 방향으로 움직이게 되는 부분입니다.  
- 리스트 안의 **li 요소들**은 각각 배너에 보여질 텍스트이며, 이 항목들이 좌우로 끊임없이 흘러가는 애니메이션 대상입니다.

<br>

### 유연한 구조

ul 태그 안에 li를 추가하면 새로운 텍스트가 자동으로 포함되므로, 확장성이 뛰어납니다.

<br>

## CSS 스타일
```css
.flow_banner { 
    overflow: hidden; 
    display: flex; 
    width: 100%; 
    max-width: 1180px; 
    background: #000; 
} 

.flow_banner .list { 
    display: flex; 
} 

.flow_banner .list > li { 
    padding: 20px; 
    font-size: 18px; 
    color: #fff; 
    white-space: nowrap; 
} 

@keyframes flowRolling { 
    0% { transform: translateX(0); } 
    100% { transform: translateX(-100%); } 
}
```

### 반응형 스타일
```css
@media (max-width: 1280px) {
    .flow_banner .list > li { 
        padding: 10px; 
        font-size: 16px; 
    } 
}

@media (max-width: 767px){
    .flow_banner .list > li { 
        padding: 5px; 
        font-size: 14px; 
    } 
}
```

### 스타일 설명

- **배너 영역**은 overflow: hidden 속성으로 내용이 밖으로 넘치지 않도록 처리하며, flex를 통해 가로 방향 정렬을 유지합니다.  
- **리스트 항목**은 white-space: nowrap 속성으로 줄바꿈 없이 가로로만 흐르게 설정합니다.  
- **애니메이션**은 @keyframes를 통해 왼쪽으로 지속해서 이동하는 효과를 구현합니다.  
- **반응형 처리**를 통해 화면 크기에 따라 글자 크기와 여백을 조정하여 가독성과 공간 활용을 동시에 고려합니다.

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

## jQuery 코드
```js
$(document).ready(function() {
    setFlowBanner();
});

function setFlowBanner() {
    const $wrap = $('.flow_banner'); // 배너 전체를 감싸는 요소
    const $list = $('.flow_banner .list'); // 배너 안의 리스트 (ul 등)
    let wrapWidth = 0; // $wrap의 가로 크기 저장용
    let listWidth = 0; // $list의 가로 크기 저장용
    const displayTime = 2; // 각 아이템을 보여줄 시간 (초 단위)

    // 원본 리스트 복제본 (기준용)
    const $baseClone = $list.clone();

    // 페이지 로드 시 실행
    $(window).on('load', function() {
        $wrap.append($baseClone.clone()); // 초기 복제 리스트 1개 추가
        flowBannerAct(); // 배너 롤링 시작
    });

    // 창 크기 변경 시 실행
    $(window).on('resize', function () {
        const wrapWidth = $wrap.width(); // 현재 배너 영역 너비
        const listCount = $wrap.find('.list').length; // 리스트 개수
        const listWidth = $wrap.find('.list').width(); // 리스트 너비

        // 리스트 총 너비가 배너 너비의 2배보다 크면 다시 세팅하지 않음
        if (listCount * listWidth > wrapWidth * 2) {
            return;
        }
        flowBannerAct(); // 배너 다시 설정
    });

    // 배너 롤링을 설정하는 함수
    function flowBannerAct() {
        // 이전 애니메이션 초기화
        $wrap.find('.list').css('animation', 'none'); // 애니메이션 제거
        $wrap.find('.list').slice(2).remove(); // 기존 복제 리스트 제거

        // 현재 너비 값 측정
        wrapWidth = $wrap.width();
        listWidth = $list.width();

        // 속도 계산 (전체 길이 / 총 시간)
        const speed = listWidth / ($list.find('li').length * displayTime);

        // 필요한 만큼 리스트 복제하여 추가
        const listCount = Math.ceil(wrapWidth * 2 / listWidth);
        for (let i = 2; i < listCount; i++) {
            const $newClone = $baseClone.clone(); // 원본 기준으로 복제
            $wrap.append($newClone);
        }

        // 애니메이션 적용
        $wrap.find('.list').css({
            'animation': `${listWidth / speed}s linear infinite flowRolling`
        });
    }

    // 마우스를 올리면 애니메이션 일시정지
    $wrap.on('mouseenter', function () {
        $wrap.find('.list').css('animation-play-state', 'paused');
    // 마우스를 떼면 다시 실행
    }).on('mouseleave', function () {
        $wrap.find('.list').css('animation-play-state', 'running');
    });
}
```

### 주요 포인트 정리

* **자연스럽게 이어지는 효과: 리스트 복제** 
<span class="txt">.list 요소를 복제하여 짧은 콘텐츠도 끊김 없이 자연스럽게 이어지도록 처리합니다. 화면 너비보다 리스트가 짧으면 복제 횟수를 늘려 충분한 길이를 확보합니다.<span>

* **부드러운 속도 제어: 애니메이션 설정** 
<span class="txt">flowBannerAct() 함수는 배너의 흐름 속도를 제어합니다. 전체 리스트의 너비와 항목 수, displayTime 값을 바탕으로 animation-duration을 계산하여 부드럽게 흘러가도록 설정합니다.<span>

* **화면 변화에도 탄탄하게: 반응형 대응** 
<span class="txt">브라우저 크기 변경 시 resize 이벤트가 발생하면, 리스트의 길이와 개수를 다시 계산하여 레이아웃을 재구성합니다. 불필요한 복제는 제거하고 필요한 만큼만 생성해 퍼포먼스도 함께 고려했습니다.<span>

* **마우스 움직임에 따라 정지·재생되는 배너** 
<span class="txt">배너 위에 마우스를 올리면 애니메이션이 일시 정지되고, 마우스를 떼면 다시 실행됩니다. 텍스트를 읽기 쉽게 하고, 사용자와 상호작용하는 UI를 자연스럽게 구성할 수 있습니다.<span>

<br>

### displayTime 계산 방식과 유의점
현재 코드에서 사용되는 `displayTime`은 각 항목(li 요소)이 보여지는 **평균 시간(초 단위)**을 의미합니다.  
이 값은 각 텍스트 항목이 모두 **같은 너비를 가진다는 가정 하에**, 다음과 같은 방식으로 애니메이션 속도가 결정됩니다.

**계산 방식**  
> 전체 리스트의 너비(listWidth) ÷ (`li` 개수 × displayTime)  
> → 이 결과가 배너가 한 사이클을 도는 데 걸리는 `animation-duration`이 됩니다.

하지만 실제 상황에서는 `li` 요소마다 너비가 다를 수 있기 때문에, 위 공식은 **ul 전체 너비의 평균값**을 기준으로 적용됩니다. 즉, 각 항목의 길이가 달라도 전체 배너는 자연스럽게 흘러가며, 다양한 텍스트 조합에도 **자동 보정**되어 UX를 해치지 않습니다.  

<br>

## 결론

jQuery와 간단한 CSS 애니메이션만으로도 흐르는 롤링 배너를 쉽게 구현할 수 있습니다.   
반응형 처리를 함께 적용하면 데스크탑, 태블릿, 모바일 등 다양한 화면에서 일관된 사용자 경험을 제공할 수 있습니다.

여러분은 이 배너를 어떤 프로젝트에 활용하고 싶으신가요?  
궁금한 점이나 개선 아이디어가 있다면 댓글로 자유롭게 남겨주시기 바랍니다. 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-23-flow-banner/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2024-01-05-vertical-banner/">[관련글] jQuery - 아래에서 위로 흐르는 롤링 배너 (반응형)</a>
</div>
