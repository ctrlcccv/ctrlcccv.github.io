---
title: jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)
description: >  
    흐르는 형태로 무한 롤링되는 배너 코드 예제입니다.
slug: 2023-07-23-flow-banner
date: 2023-07-23 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/flow-banner.webp

categories:
    - jQuery
tags:
    - 흐르는 롤링 배너
---
흐르는 형태로 무한 롤링되는 배너를 만들었다.  

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
무한 롤링 효과를 위해 list 클래스의 요소들이 flow_banner 배너의 2배 크기만큼 복제될 예정이다.  

## CSS 스타일
```css
ul, li {list-style: none;}
.flow_banner {overflow: hidden;display: flex;max-width: 1180px;margin: 30px auto;background: #000;}
.flow_banner .list {display: flex;}
.flow_banner .list > li {white-space: nowrap;font-size: 18px;color: #fff;padding: 20px;}
@keyframes flowRolling {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}

/* 반응형 스타일 */
@media (max-width: 1280px) {
    .flow_banner .list > li {font-size: 16px;padding: 10px;}
}

@media (max-width: 767px) {
    .flow_banner .list > li {font-size: 14px;padding: 5px;}
}
```
list 클래스에 flowRolling 애니메이션을 추가할 예정이다.  
transform:translateX() 속성을 사용하여 list 클래스의 가로 크기만큼 왼쪽으로 이동하는 애니메이션이다.  
배너 함수를 실행하면서 복제된 요소들의 애니메이션 타이밍이 어긋나서 함수가 실행된 후 애니메이션 속성을 추가했다.  

## jQuery 코드 (크기 고정형)
```js
$(window).on('load', function() {
    setFlowBanner();
})

function setFlowBanner() {
    const $wrap = $('.flow_banner');
    const $list = $('.flow_banner .list');
    let wrapWidth = $wrap.width();
    let listWidth = $list.width();
    const speed = 92; //1초에 몇픽셀 이동하는지 설정

    //리스트 복제
    let $clone = $list.clone();
    $wrap.append($clone);
    flowBannerAct()

    //배너 실행 함수
    function flowBannerAct() {
        //무한 반복을 위해 리스트를 복제 후 배너에 추가
        if (listWidth < wrapWidth) {
            const listCount = Math.ceil(wrapWidth * 2 / listWidth);
            for (let i = 2; i < listCount; i++) {
                $clone = $clone.clone();
                $wrap.append($clone);
            }
        }
        $wrap.find('.list').css({
            'animation': `${listWidth / speed}s linear infinite flowRolling`
        });
    }

    // 마우스가 요소 위로 진입했을 때 일시정지
    $wrap.on('mouseenter', function () {
        $wrap.find('.list').css('animation-play-state', 'paused');
    });

    // 마우스가 요소에서 빠져나갈 때 재생
    $wrap.on('mouseleave', function () {
        $wrap.find('.list').css('animation-play-state', 'running');
    });
}
```
레이아웃 변화가 없는 배너를 위한 스크립트다. 리사이즈 이벤트와 배너 초기화를 삭제했다.  

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

## jQuery 코드 (반응형)
```js
$(window).on('load', function() {
    setFlowBanner();
})

function setFlowBanner() {
    const $wrap = $('.flow_banner');
    const $list = $('.flow_banner .list');
    let wrapWidth = ''; //$wrap의 가로 크기
    let listWidth = ''; //$list의 가로 크기
    const speed = 92; //1초에 몇픽셀 이동하는지 설정

    //리스트 복제
    let $clone = $list.clone();
    $wrap.append($clone);
    flowBannerAct()

    //반응형 :: 디바이스가 변경 될 때마다 배너 롤링 초기화
    let oldWChk = window.innerWidth > 1279 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
    $(window).on('resize', function() {
        let newWChk = window.innerWidth > 1279 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            flowBannerAct();
        }
    });

    //배너 실행 함수
    function flowBannerAct() {
        //배너 롤링 초기화
        if (wrapWidth != '') {
            $wrap.find('.list').css({
                'animation': 'none'
            });
            $wrap.find('.list').slice(2).remove();
        }
        wrapWidth = $wrap.width();
        listWidth = $list.width();

        //무한 반복을 위해 리스트를 복제 후 배너에 추가
        if (listWidth < wrapWidth) {
            const listCount = Math.ceil(wrapWidth * 2 / listWidth);
            for (let i = 2; i < listCount; i++) {
                $clone = $clone.clone();
                $wrap.append($clone);
            }
        }
        $wrap.find('.list').css({
            'animation': `${listWidth / speed}s linear infinite flowRolling`
        });
    }

    // 마우스가 요소 위로 진입했을 때 일시정지
    $wrap.on('mouseenter', function () {
        $wrap.find('.list').css('animation-play-state', 'paused');
    });

    // 마우스가 요소에서 빠져나갈 때 재생
    $wrap.on('mouseleave', function () {
        $wrap.find('.list').css('animation-play-state', 'running');
    });
}
```
반응형 레이아웃은 창 크기가 변경되면 배너의 크기도 변경되어, 복제된 list 클래스의 수가 맞지 않아 애니메이션 오류가 생길 수 있다. 이를 방지하기 위해 리사이즈 이벤트를 추가했다.  
리사이즈할 때마다 배너 함수(flowBannerAct)를 실행하게 되면 브라우저에 과부하를 줄 수 있어, 화면 크기에 따라 디바이스 정보를 변수에 담고 디바이스가 변경되면 함수를 실행했다.  
<br>
flowBannerAct 함수가 실행되면 기존 배너 가로 크기를 담은 wrapWidth 변수값이 있을 시, 애니메이션과 복제되었던 list 클래스 요소들을 2개만 남기고 제거하여 초기화했다.  
나열된 list 클래스의 가로 크기가 flow_banner 클래스의 가로 크기의 두 배 이상이 되어야 애니메이션이 끝나고 처음으로 돌아갈 때 list 클래스의 뒷부분이 잘리지 않고 무한으로 반복된다.  
list 클래스의 가로 크기를 flow_banner 클래스의 가로 크기에 나누어 필요한 요소의 수를 구한 후 반복문을 사용하였다.  
<br>
마지막으로 list 클래스의 가로 크기에 speed 변수값을 나누어, list 클래스의 li 개수가 몇 개가 되던 동일한 속도로 이동되도록 애니메이션 속성을 추가했다. 다만 speed 변수값을 픽셀 단위로 선언하여 상대적으로 크기가 작은 모바일에서는 PC화면보다 빠르게 이동되는 것처럼 보일 수 있는데, 이건 레이아웃마다 느낌이 다를 것 같아서 필요하면 따로 예외처리 해주면 될 것 같다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-23-flow-banner/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2024-01-05-vertical-banner/">[관련글] jQuery - 아래에서 위로 흐르는 롤링 배너 (반응형)</a>
</div>
