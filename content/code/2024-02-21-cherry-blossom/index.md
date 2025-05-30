---
title: >  
    jQuery - 벚꽃 흩날리는 효과
description: >  
    jQuery와 CSS 애니메이션을 활용해 벚꽃 잎이 흩날리는 효과를 구현하는 방법입니다. 

slug: 2024-02-21-cherry-blossom
date: 2024-02-21 00:00:00+0000
lastmod: 2024-02-21 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-02-21-cherry-blossom.webp

categories:
    - jQuery
tags:
    - 배경 효과
---
봄의 따스함과 벚꽃이 만발한 풍경을 연상시키는 웹사이트는 방문자에게 감동적인 인상을 남길 수 있습니다. 이 글에서는 jQuery와 CSS를 결합하여, 마치 봄바람을 타고 날리는 벚꽃 잎의 모습을 재현하는 효과를 만드는 방법에 대해 알아보겠습니다. 자동으로 화면에 벚꽃이 흩날리는 배경을 구현하며, 웹사이트에 생동감과 로맨틱한 느낌을 더할 수 있는 코드를 소개합니다.    


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
`cherry_blossom` 클래스로 지정된 div 요소를 만들고, CSS를 통해 배경 이미지와 스타일을 적용합니다.  
이 div내에서 벚꽃 잎이 날리는 효과가 발생하게 됩니다.  

```html
<div class="cherry_blossom"></div>
```

## CSS 스타일
```css
.cherry_blossom {
    overflow: hidden;
    position: relative;
    width: 600px;
    height: 600px;
    background: url('sakura.png') center center no-repeat;
    background-size: cover;
    perspective: 1000px;
}

.cherry_blossom .petal {
    position: absolute;
    background: linear-gradient(-45deg, #ffb6c1 0%, #ffc5d0 40%, #ffdfe6 80%);
    border-radius: 10% 50% 40% 50%;
    z-index: 1;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    pointer-events: none;
    transform-style: preserve-3d;
    transition: transform 1000ms linear;
}

@keyframes fall {
    0% {
        top: 0;
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        top: 100%;
        opacity: 0.2;
    }
}
```
**벚꽃 효과 설정**
   - cherry_blossom 클래스에 overflow: hidden 속성을 적용하여 벚꽃 잎이 영역을 벗어나지 않도록 제한합니다.
   - position: relative로 벚꽃 잎의 기준점을 설정합니다.
   - width와 height로 벚꽃 효과의 가로 및 세로 크기를 지정합니다.
   - background 속성을 사용하여 벚꽃 배경 이미지를 설정하고, background-size: cover로 이미지를 전체 영역에 맞춥니다.
   - perspective: 1000px를 통해 3D 효과를 부여합니다.

**벚꽃 잎 스타일**
   - petal 클래스에 position: absolute 속성을 적용하여 절대적인 위치로 벚꽃 잎을 배치합니다.
   - background 속성으로 그라데이션 스타일의 벚꽃 잎 색상을 설정하고, border-radius를 활용하여 둥근 꽃잎 모양을 구현합니다.
   - z-index: 1을 사용하여 벚꽃 잎이 다른 요소보다 위에 표시되도록 합니다.
   - box-shadow를 통해 입체감 있는 그림자 효과를 추가합니다.
   - pointer-events: none으로 마우스 이벤트가 꽃잎 위에서 발생하지 않도록 설정합니다.
   - transform-style: preserve-3d를 사용하여 하위 요소에 3D 변환 효과를 유지합니다.
   - transition 속성을 통해 transform에 대한 1000ms 동안의 선형 전환 효과를 설정합니다.

**벚꽃 애니메이션**
   - @keyframes fall을 정의하여 벚꽃 잎이 위에서 아래로 떨어지는 애니메이션을 구현합니다.
   - 0%에서는 top: 0 및 opacity: 1로 시작하여 불투명한 상태에서 맨 위에서 시작합니다.
   - 80%까지는 opacity: 1을 유지하여 애니메이션이 80% 진행될 때까지 불투명 상태를 유지합니다.
   - 100%에서는 top: 100% 및 opacity: 0.2로 설정하여 애니메이션이 종료될 때 화면 아래로 내려가며 투명도가 낮아집니다.  


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
// 기본 값 설정
const defaults = {
    speed: 5,
    maxSize: 15,
    minSize: 10,
    newOn: 400
};

// 벚꽃 영역 크기를 저장할 변수
var $wrap = $('.cherry_blossom');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 벚꽃 잎 생성
const $petal = $('<span class="petal"></span>');

// 랜덤 회전 값을 생성하는 함수
const getRandomRotate = () => {
    const rotateX = 360;
    const rotateY = Math.random() * 60 - 30;
    const rotateZ = Math.random() * 120 - 30;
    const translateX = Math.random() * 10 - 5;
    const translateY = Math.random() * 10 - 10;
    const translateZ = Math.random() * 15;
    return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// 무작위 흔들림 애니메이션 배열 생성
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

// 특정 요소에 흔들림 애니메이션 적용
const applySwayAnim = (element) => {
    const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
    element.css('transform', randomSway);
    setTimeout(() => {
        applySwayAnim(element);
    }, 1000);
};

// 벚꽃 잎 생성 함수
const petalGen = () => {
    setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

    const petal = $petal.clone();
    const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
    const startPosLeft = Math.random() * wrapW;
    const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
    const horizontalOffset = Math.random() * 2 - 1;

    // 애니메이션 끝나면 제거
    petal.on('animationend', () => {
        petal.remove();
    }).css({
        width: size,
        height: size,
        left: startPosLeft,
        position: 'absolute',
        animation: `fall ${fallTime}s linear`
    }).appendTo($wrap);

    // 위치 업데이트 함수
    const updatePos = () => {
        petal.css('left', `+=${horizontalOffset}`);
        requestAnimationFrame(updatePos);
    };

    updatePos();
    applySwayAnim(petal);
};

// 창 크기가 변경될 때 영역 크기 업데이트
$(window).resize(() => {
    wrapH = $wrap.height();
    wrapW = $wrap.width();
});

// 로딩 완료 후 벚꽃 잎 생성 시작
$(window).on('load', () => {
    requestAnimationFrame(petalGen);
});
```

- **변수 선언 및 초기화**
  - `$wrap`는 `cherry_blossom` 클래스를 가진 요소를 선택하는 jQuery 객체를 저장합니다.
  - `wrapH`는 벚꽃 배경의 높이로, `$wrap.height()`를 통해 값을 가져와 저장합니다.
  - `wrapW`는 벚꽃 배경의 너비로, `$wrap.width()`를 통해 값을 가져와 저장합니다.
  - `defaults`는 벚꽃 잎의 생성 속도, 크기, 출현 주기 등의 기본 설정을 객체 형태로 저장합니다.

- **벚꽃 잎 생성 및 스타일링**
  - `getRandomRotate` 함수는 잎의 랜덤한 회전과 이동 값을 생성하고, 이를 3D 변환(transform) 값으로 반환합니다.
  - `randomSwayAnims`는 무작위 흔들림 애니메이션 배열을 생성하며, 각 요소는 `getRandomRotate` 함수를 호출하여 얻은 변환 값입니다.
  - `applySwayAnim` 함수는 특정 요소에 흔들림 애니메이션을 적용하며, `element.css('transform', randomSway)`를 사용하여 3D 변환 스타일을 적용하고, 일정 시간마다 반복 호출하여 흔들림 효과를 만듭니다.

- **벚꽃 잎 생성 및 애니메이션 적용**
  - `petalGen` 함수는 시간 간격(`defaults.newOn`)을 기준으로 `setTimeout`과 `requestAnimationFrame`을 활용하여 벚꽃 잎을 지속적으로 생성합니다.
  - 벚꽃 잎의 시작 위치(`startPosLeft`), 크기(`size`), 수평 이동(`horizontalOffset`), 떨어지는 시간(`fallTime`)을 랜덤으로 설정하여 애니메이션 시작 전 속성을 지정합니다.
  - `petal.on('animationend', () => { petal.remove() })`는 CSS 애니메이션 종료 후 벚꽃 잎을 DOM에서 제거하는 이벤트 핸들러를 추가합니다.

- **창 크기에 따른 업데이트**
  - 창 크기 변화 시 벚꽃 배경의 높이와 너비를 업데이트하는 콜백 함수를 바인딩합니다. 이를 통해 벚꽃 잎의 시작 위치와 크기를 조절할 수 있도록 합니다.

- **벚꽃 잎 생성 시작**
  - 문서가 모두 로드된 후 `petalGen` 함수를 호출하여 벚꽃 잎 생성을 시작합니다.  
  이때 `requestAnimationFrame`을 사용하여 부드러운 애니메이션을 지원합니다.

<br>

## 결론
jQuery와 CSS3 애니메이션을 활용하여 벚꽃 잎이 흩날리는 배경 효과를 구현하는 방법을 살펴봤습니다.   
벚꽃 흩날리는 효과는 계절을 상징하는 다양한 웹사이트 디자인에서 활용될 수 있으며, 스크립트와 스타일을 조금만 변경하면 다른 형태의 입자나 요소를 화면에 흩날리게 할 수도 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-02-21-cherry-blossom/" target="_blank">예제결과 미리보기</a>
</div>

