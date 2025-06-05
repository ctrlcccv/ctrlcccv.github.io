---
title: jQuery - 아래에서 위로 흐르는 롤링 배너 (반응형)
description: >  
    jQuery를 사용하여 생성한 아래에서 위로 흐르는 롤링 배너 기능을 소개합니다. 사용자가 배너 위에 마우스를 올리면 롤링이 일시정지되고, 마우스가 벗어나면 다시 재생됩니다.  

slug: 2024-01-05-vertical-banner
date: 2024-01-05 00:00:00+0000
lastmod: 2024-01-05 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-05-vertical-banner.webp

categories:
    - jQuery
tags:
    - 흐르는 롤링 배너
---
jQuery와 CSS 애니메이션을 사용하여 아래에서 위로 흐르는 롤링 배너를 구현하는 코드를 설명합니다. 반응형으로 디자인되어 있어, 다양한 디스플레이에서 일관된 사용자 경험을 제공합니다.  

<br>

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
<div class="vertical_banner">
    <ul class="list">
        <li>아래에서 위로 흐르는 롤링 배너 1</li>
        <li>아래에서 위로 흐르는 롤링 배너 2</li>
        <li>아래에서 위로 흐르는 롤링 배너 3</li>
    </ul>
</div>
```
* **배너 컨테이너**
  * 클래스 `vertical_banner`를 가진 div는 롤링 배너를 포함하는 컨테이너 역할을 합니다.

* **배너 리스트**
  * `ul` 요소는 개별 롤링 배너 `li` 항목을 포함하며, 이들은 자식 요소로서 컨테이너 안에서 스크롤 되어 표시됩니다.  
<br>

## CSS 스타일

```css
.vertical_banner { overflow: hidden; width: 100%; height: 280px; max-width: 500px; margin: 30px auto; background: #f0f0f0; border-radius:20px; } 
.vertical_banner .list > li { overflow: hidden; padding: 15px; font-size: 18px; color: #000; text-align: center; white-space: nowrap; text-overflow: ellipsis; } 

@keyframes verticalRolling { 
    0% { transform: translateY(0); } 
    100% { transform: translateY(-100%); } 
}

/* 반응형 스타일 */
@media (max-width: 1280px){
    .vertical_banner { height: 240px; } 
    .vertical_banner .list > li { padding: 12px; font-size: 16px; } 
}

@media (max-width: 767px){
    .vertical_banner { height: 180px; } 
    .vertical_banner .list > li { padding: 8px; font-size: 14px; } 
}
```
* **배너의 기본 스타일**
  * 배너 컨테이너는 오버플로우를 숨겨서 배너 항목들이 스크롤 될 때 컨테이너의 크기를 넘어서지 않도록 합니다.
  * 각 항목은 말줄임 처리를 위해 `overflow: hidden`과 `text-overflow:ellipsis`로 스타일링됩니다.

* **애니메이션 효과**
  * `verticalRolling` 키 프레임을 사용하여 리스트 아이템이 수직 방향으로 스크롤 되는 애니메이션을 생성합니다.

* **반응형 스타일**
  * 배너의 높이와 항목의 패딩, 글자 크기를 화면 크기에 맞춰 조정합니다.


<br>

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

## jQuery 코드

```js
const $wrap = $('.vertical_banner');
const $list = $('.vertical_banner .list');
let wrapHeight; // 배너 컨테이너의 높이
let listHeight; // 배너 리스트의 전체 높이

// 배너 리스트 복제 후 추가
let $clone = $list.clone();
$wrap.append($clone);

// 배너 애니메이션 처리하는 함수
function verticalBanner() {
    // 배너 애니메이션 초기화
    if (wrapHeight != '') {
        $wrap.find('.list').css({
            'animation': 'none'
        });
        $wrap.find('.list').slice(2).remove();
    }

    // 배너 컨테이너와 리스트 아이템의 현재 높이 가져오기
    wrapHeight = $wrap.innerHeight();
    listHeight = $list.innerHeight();
    const speed = $list.find('li').innerHeight() / 2;

    // 내용이 컨테이너보다 작은 경우 무한 반복을 만들기 위해 리스트를 복제하여 추가
    if (listHeight < wrapHeight) {
        const listCount = Math.ceil(wrapHeight * 2 / listHeight);
        for (let i = 2; i < listCount; i++) {
            $clone = $clone.clone();
            $wrap.append($clone);
        }
    }

    // 수직 롤링 효과를 위해 모든 리스트 아이템에 애니메이션 적용
    $wrap.find('.list').css({
        'animation': `${listHeight / speed}s linear infinite verticalRolling`
    });
}

// 초기 배너 설정
verticalBanner();

// 창 크기에 따른 현재 디바이스 유형을 반환하는 함수
function getWindow() {
    return window.innerWidth > 1280 ? 'pc' : window.innerWidth > 767 ? 'ta' : 'mo';
}

// 반응형 처리 설정
let oldWindow = getWindow();
$(window).on('resize', function () {
    const newWindow = getWindow();
    // 디바이스 유형이 변경된 경우에만 배너 롤링 재설정
    if (newWindow !== oldWindow) {
        oldWindow = newWindow;
        verticalBanner();
    }
});

// 마우스 이벤트 처리: 배너 롤링 일시 정지 및 재생
$wrap.on({
    mouseenter: function () {
        $wrap.find('.list').css('animation-play-state', 'paused');
    },
    mouseleave: function () {
        $wrap.find('.list').css('animation-play-state', 'running');
    }
});
```
* **변수 선언 부분**
  * `$wrap`  
  롤링 배너를 감싸고 있는 컨테이너 요소에 대한 jQuery 객체입니다.
  
  * `$list`  
  컨테이너 내부의 배너 목록에 대한 jQuery 객체입니다.

  * `wrapHeight`  
  배너 컨테이너의 높이를 저장할 변수입니다.

  * `listHeight`  
  배너 리스트의 전체 높이를 저장할 변수입니다.

* **배너 리스트 복제 및 추가**
  * `$list.clone()`  
  현재 배너 리스트를 복제하여 `$clone` 변수에 저장합니다.

  * `$wrap.append($clone)`  
  복제한 리스트를 `$wrap` 컨테이너에 추가함으로써, 무한 롤링 효과를 위한 세팅을 합니다.

* **배너 애니메이션을 처리하는 함수 (verticalBanner)**
  * 애니메이션 초기화  
  기존에 적용된 애니메이션을 제거하고, 2개 이상 있는 리스트를 제거하여 초기 상태로 만듭니다.

  * 높이 계산  
  컨테이너와 리스트 아이템의 현재 높이를 측정합니다.

  * 무한 롤링 설정  
  리스트 높이가 컨테이너보다 작을 경우, 무한 롤링 효과를 위해서 리스트를 충분한 횟수만큼 복제하여 추가합니다.

  * 애니메이션 적용  
  모든 리스트 아이템에 `verticalRolling` 애니메이션을 `linear infinite` 속성과 함께 적용하여 끊임없이 이어지는 스크롤 효과를 만듭니다.

* **창 크기에 따른 반응형 처리**
  * `getWindow` 함수를 통해 현재 디바이스의 유형을 가져옵니다. 이는 창 크기에 따라 'pc', 'ta', 'mo'를 반환합니다.
  * 윈도우의 사이즈가 바뀔 때마다 함수가 실행되어 디바이스 유형을 확인하고, 바뀌었다면 `verticalBanner` 함수를 호출하여 배너를 다시 초기화합니다.

* **마우스 이벤트 처리**
  * `mouseenter` 이벤트가 발생하면 애니메이션을 일시 정지(`paused`)하고, `mouseleave` 이벤트가 발생하면 애니메이션을 재생(`running`)합니다.
  * 이를 통해 사용자가 배너에 마우스를 올렸을 때 롤링이 멈추었다가 벗어날 때 다시 움직임을 재개하는 사용자 친화적인 경험을 제공합니다.  
<br>


## 결론
jQuery를 활용하여 아래에서 위로 흐르는 롤링 배너를 구현하는 방법을 소개했습니다. CSS 애니메이션과 jQuery의 조화로 매끄러운 사용자 경험을 제공하며, 반응형 웹 디자인을 구현함으로써 여러 디바이스에서의 호환성도 갖추고 있습니다. 사용자가 마우스로 상호작용할 때 애니메이션의 일시 정지 및 재생 기능은 웹사이트의 인터랙티브 요소를 더욱 풍부하게 만듭니다.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-05-vertical-banner/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-07-23-flow-banner/">[관련글] jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)</a>
</div>
