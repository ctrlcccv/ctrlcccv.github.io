---
title: >
    jQuery - 마우스 따라 움직이는 패럴랙스 효과 구현하기
description: >  
    jQuery를 활용한 마우스 움직임에 따라 요소들이 자연스럽게 움직이는 패럴랙스 효과 구현 방법을 자세히 소개합니다.

slug: 2025-05-08-parallax-effect
date: 2025-05-08 00:00:00+0000
lastmod: 2025-05-08 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-08-parallax-effect.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
    - 배경 효과
---
마우스의 움직임에 따라 요소들이 자연스럽게 움직이는 패럴랙스 효과, 함께 만들어볼까요?

웹사이트에 동적인 요소를 추가하면 방문자들의 시선을 사로잡고 페이지 체류 시간을 늘릴 수 있습니다. 특히 마우스의 움직임에 따라 요소들이 자연스럽게 반응하는 패럴랙스 효과는 시각적 매력을 높이는 데 효과적입니다. 이번 포스트에서는 jQuery를 활용하여 마우스 움직임에 반응하는 패럴랙스 효과를 구현하는 방법을 알아보겠습니다.

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

## HTML 구조

```html
<div id="container">
    <img src="https://unsplash.it/800/800?random=" alt="배경 이미지" class="bg">
    <h1 class="title">타이틀</h1>
</div>
```

* **컨테이너 구조**  
<span class="txt">
container 안에 배경 이미지와 타이틀 텍스트를 배치하여 패럴랙스 효과를 적용할 요소들을 구성합니다.  
각 요소는 독립적으로 움직일 수 있도록 별도의 클래스를 부여했습니다.
</span>

<br>

## CSS 스타일

```css
#container { 
    overflow: hidden; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    position: relative; 
    width: 600px; 
    height: 600px; 
    margin: 50px auto 0; 
} 

#container .bg { 
    width: 800px; 
    height: 800px; 
} 

#container .title {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -33px;
    margin-left: -63px;
    font-size: 46px; 
    font-weight: 700;
    color: #fff; 
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.4); 
}
```

* **컨테이너 스타일**  
<span class="txt">
container는 중앙 정렬된 600x600 크기의 영역으로 설정되어 있습니다.  
overflow: hidden을 통해 내부 요소가 컨테이너를 벗어나지 않도록 제한합니다.
</span>

* **배경 이미지 스타일**  
<span class="txt">
배경 이미지는 컨테이너보다 큰 800x800 크기로 설정하여 움직임의 여유를 확보했습니다.  
이렇게 하면 패럴랙스 효과가 더 자연스럽게 보입니다.
</span>

* **타이틀 스타일**  
<span class="txt">
타이틀은 절대 위치로 중앙에 배치되며, 텍스트 그림자를 통해 가독성을 높였습니다.  
이 요소도 마우스 움직임에 따라 독립적으로 움직일 수 있습니다.
</span>

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

## jQuery 코드

```js
// #container 요소를 선택합니다.
const containerSelector = '#container';
const $container = $(containerSelector);
// container의 위치와 크기 정보를 얻습니다.
let bounds = $container[0].getBoundingClientRect();
// 마우스 위치와 움직임 여부를 추적하는 객체를 초기화합니다.
const mousePos = { x: 0, y: 0, hasMoved: false };

// #container 위에서 마우스가 움직일 때마다 마우스 위치를 업데이트합니다.
$(document).on('mousemove', containerSelector, function(e) {
    mousePos.hasMoved = true;
    mousePos.x = e.clientX - bounds.left;
    mousePos.y = e.clientY - bounds.top;
});

// 특정 대상에 패럴랙스 효과를 적용하는 함수입니다.
function applyParallax(target, moveFactor) {
    const xMovement = (mousePos.x - bounds.width / 2) / bounds.width * moveFactor;
    const yMovement = (mousePos.y - bounds.height / 2) / bounds.height * moveFactor;
    $(target).css('transform', `translate3d(${xMovement}px, ${yMovement}px, 0)`);
}

// 패럴랙스 효과를 지속적으로 새로 고칩니다.
function refreshParallax() {
    if (mousePos.hasMoved) {
        applyParallax('.bg', -200);
        applyParallax('.title', -100);
        mousePos.hasMoved = false;
    }

    requestAnimationFrame(refreshParallax);
}

// 윈도우의 크기가 변경되거나 스크롤 할 때 bounds를 업데이트합니다.
$(window).on('resize scroll', function() {
    bounds = $container[0].getBoundingClientRect();
});

// 패럴랙스 애니메이션을 시작합니다.
refreshParallax();
```

* **마우스 이벤트 처리**  
<span class="txt">
마우스가 움직일 때마다 위치 정보를 업데이트하고 hasMoved 플래그를 설정합니다.  
이를 통해 불필요한 애니메이션 업데이트를 방지합니다.
</span>

* **패럴랙스 효과 적용**  
<span class="txt">
applyParallax 함수는 대상 요소와 이동 계수를 받아 transform 속성을 통해 움직임을 적용합니다.  
각 요소마다 다른 이동 계수를 사용하여 깊이감 있는 효과를 만듭니다.
</span>

* **애니메이션 루프**  
<span class="txt">
requestAnimationFrame을 사용하여 부드러운 애니메이션을 구현합니다.  
마우스가 움직였을 때만 요소들의 위치를 업데이트합니다.
</span>

<br>

### 패럴랙스 효과 조절하기
refreshParallax 함수에서 각 요소의 움직임을 조절할 수 있습니다.

```js
applyParallax('.bg', -200);  // 배경 이미지
applyParallax('.title', -100);  // 타이틀 텍스트
```

여기서 숫자를 바꾸면 움직임이 달라집니다.
- 숫자가 클수록 더 멀리 움직입니다 (예: -300)
- 숫자가 작을수록 덜 움직입니다 (예: -50)
- 마이너스(-)를 플러스(+)로 바꾸면 반대 방향으로 움직입니다

🔍 실제로 테스트해보세요.
- 배경 이미지가 너무 많이 움직인다면 -200을 -100으로 줄여보세요
- 타이틀이 너무 적게 움직인다면 -100을 -150으로 늘려보세요
- 반대 방향으로 움직이게 하고 싶다면 마이너스를 플러스로 바꿔보세요

<br>

## 패럴랙스 효과의 활용 사례

* **메인 페이지 상단 배너**  
<span class="txt">
웹사이트의 첫인상을 결정하는 상단 배너에 패럴랙스 효과를 적용하면 시각적 임팩트를 높일 수 있습니다.  
배경 이미지와 텍스트가 마우스 움직임에 따라 자연스럽게 움직이며, 방문자들의 호기심을 자극하고 페이지 탐색을 유도합니다.
</span>

* **제품 소개 페이지**  
<span class="txt">
제품의 특징을 강조하는 섹션에서 패럴랙스 효과를 활용하면 제품의 입체감을 표현할 수 있습니다.  
제품 이미지와 설명 텍스트가 서로 다른 속도로 움직이며, 마치 3D 공간에서 제품을 감상하는 듯한 경험을 제공합니다.
</span>

* **포트폴리오 갤러리**  
<span class="txt">
작품 이미지들에 패럴랙스 효과를 적용하면 갤러리가 더 생동감 있게 보입니다.  
마우스를 움직일 때마다 이미지들이 입체적으로 움직여 마치 실제 갤러리를 둘러보는 듯한 느낌을 줍니다.
</span>

<br>  

## 결론

이번 포스트에서는 jQuery를 활용한 마우스 따라 움직이는 패럴랙스 효과를 구현해보았습니다.  
마우스의 움직임에 따라 배경 이미지와 타이틀이 자연스럽게 움직이며, 시각적 깊이감을 만들어냅니다.  
이 효과는 웹사이트의 메인 페이지나 특별한 섹션에 적용하면 사용자의 관심을 끌 수 있습니다.

또한 다양한 활용 사례와 성능 최적화 팁을 통해 실제 프로젝트에서의 적용 방법도 알아보았습니다.  
이러한 최적화 기법들을 적절히 활용하면 더 부드럽고 효율적인 패럴랙스 효과를 구현할 수 있습니다.

이 코드에 대해 궁금한 점이 있으시다면 댓글로 남겨주세요!  

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-08-parallax-effect/">예제결과 미리보기</a>
</div> 