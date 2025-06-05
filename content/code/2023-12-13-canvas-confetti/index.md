---
title: jQuery - 종이 폭죽 터지는 효과 (Canvas Confetti 활용)
description: >  
    Canvas Confetti 라이브러리를 활용하여 웹사이트에 화려한 종이 폭죽 효과를 추가하는 방법을 소개합니다. 다양한 설정 옵션과 사용법을 쉽게 배울 수 있습니다.

slug: 2023-12-13-canvas-confetti
date: 2023-12-13 00:00:00+0000
lastmod: 2023-12-13 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-13-canvas-confetti.webp

categories:
    - jQuery
tags:
    - 배경 효과
---
종이 폭죽 효과를 만드는 Canvas Confetti 라이브러리를 소개하고, jQuery와 함께 사용하는 방법을 알아봅니다. 이 플러그인은 화려한 종이 조각들을 화면에서 터뜨리는 효과를 쉽게 구현할 수 있게 해주며, 특히 이벤트나 축하의 순간에 생동감을 불어넣기에 적합합니다.  

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

## 설치 방법
### NPM을 통한 설치
```html
npm install --save canvas-confetti
```
설치 후, require('canvas-confetti')를 통해 프로젝트에 포함시킬 수 있습니다. 이 컴포넌트는 클라이언트 사이드에서만 동작하며, Webpack 같은 빌드 도구를 사용해야 합니다.  
<br>

### CDN을 통한 설치
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
```
최신 버전을 사용하기 위해 릴리스 페이지에서 [최신 버전 정보](https://github.com/catdad/canvas-confetti/releases)를 확인하고, 해당 버전으로 링크를 변경하세요.  

<br>

## 사용 예시
### HTML 구조
```html
<div class="btn_confetti">폭죽 버튼 클릭</div>
```
사용자가 클릭할 수 있는 HTML 요소를 정의합니다. 이 예시에서는 &lt;div&gt; 요소를 사용하고, btn_confetti라는 클래스를 부여하여 CSS와 jQuery 선택자로 쉽게 접근할 수 있도록 합니다.  

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

### jQuery 코드
```js
$('.btn_confetti').on('click', function() {
    // 시작점으로 설정할 요소 가져오기
    const canvas = $('.btn_confetti')[0];
    
    // Canvas 요소의 위치 정보를 가져오기
    const canvasRect = canvas.getBoundingClientRect();
    
    // Canvas Confetti 라이브러리를 사용하여 효과 적용
    confetti({
        particleCount: 100,
        spread: 180,
        origin: {
            x: (canvasRect.left + canvasRect.width / 2) / window.innerWidth,
            y: (canvasRect.top + canvasRect.height / 2) / window.innerHeight
        }
    });
});
```
* **jQuery를 사용한 이벤트 핸들링**
  * 버튼에 클릭 이벤트 핸들러를 연결합니다.

* **클릭 된 요소의 위치 계산**
  * 클릭 된 요소의 위치를 getBoundingClientRect() 함수를 사용하여 계산합니다. 이 함수는 요소의 위치와 크기에 대한 정보를 제공합니다. 이 정보는 폭죽이 터지는 시작점을 정하는 데 사용됩니다.  

* **Canvas Confetti 효과 적용**  
  * confetti() 함수를 호출하여 종이 폭죽 효과를 적용합니다. particleCount, spread, origin 등의 옵션을 설정하여 폭죽 효과의 모양과 위치를 조절합니다.
  * particleCount : 발사될 종이 조각의 수입니다.
  * spread : 종이 조각이 퍼지는 각도 범위입니다.
  * origin : 폭죽이 시작될 위치입니다. 여기서는 클릭 된 요소의 중심점을 기준으로 계산합니다.  

<br>

## 옵션 설명
* **particleCount (정수, 기본값: 50)**  
  * 발사될 종이 조각의 수입니다. 더 많은 수는 더 화려한 효과를 만듭니다.

* **angle (숫자, 기본값: 90)**  
  * 종이 조각이 발사되는 각도입니다. 90도는 직각으로 발사됨을 의미합니다.

* **spread (숫자, 기본값: 45)**  
  * 종이 조각이 퍼지는 각도 범위입니다. 예를 들어, 45도는 중심 각도로부터 +-22.5도 범위 내에서 퍼집니다.

* **startVelocity (숫자, 기본값: 45)**  
  * 종이 조각이 시작할 때의 속도입니다. 값이 높을수록 더 빠르게 움직입니다.

* **decay (숫자, 기본값: 0.9)**  
  * 종이 조각이 속도를 잃는 비율입니다. 0과 1 사이의 값을 유지해야 하며, 값이 낮을수록 빠르게 속도를 잃습니다.

* **gravity (숫자, 기본값: 1)**  
  * 중력의 영향을 얼마나 받을 것인지 정하는 값입니다. 1은 표준 중력을 의미하며, 0.5는 중력의 절반을 의미합니다.

* **drift (숫자, 기본값: 0)**  
  * 종이 조각이 옆으로 얼마나 흘러갈지 정하는 값입니다. 음수는 왼쪽, 양수는 오른쪽으로 흘러갑니다.

* **flat (불린, 기본값: false)**  
  * 종이 조각이 기울어짐 없이 평평하게 떨어지도록 설정합니다.

* **ticks (정수, 기본값: 200)**  
  * 종이 조각이 몇 번 움직일 것인지 정하는 값입니다. 값이 크면 더 오래 움직입니다.

* **origin (객체)**   
  * 발사 지점을 정하는 객체입니다.
  * origin.x (숫자, 기본값: 0.5) : 화면 가로 축에서의 위치를 0과 1 사이의 값으로 정합니다.
  * origin.y (숫자, 기본값: 0.5) : 화면 세로 축에서의 위치를 0과 1 사이의 값으로 정합니다.

* **1colors (문자열 배열)**  
  * 종이 조각의 색상을 HEX 형식의 문자열 배열로 정합니다. 예: ['#bada55', '#ff0000']

* **shapes (문자열 또는 Shape 객체 배열)**
  * 종이 조각의 모양을 정합니다. 기본 모양은 'square', 'circle', 'star'가 있습니다. 사용자 정의 모양을 만들기 위해서는 confetti.shapeFromPath 또는 confetti.shapeFromText 메소드를 사용할 수 있습니다.

* **scalar (숫자, 기본값: 1)**
  * 각 종이 조각의 크기 비율을 정합니다. 작은 값을 사용하면 더 작은 종이 조각을 만들 수 있습니다.

* **zIndex (정수, 기본값: 100)**
  * 종이 폭죽이 나타날 때의 z-index 값을 정합니다.

* **disableForReducedMotion (불린, 기본값: false)**
  * 움직임을 줄이길 선호하는 사용자들을 위해 종이 폭죽 효과를 비활성화합니다. 해당 옵션이 활성화된 경우, confetti() 함수는 즉시 해결되는 프로미스를 반환합니다.  

<br>

## 공식 예제 사이트
Canvas Confetti 라이브러리의 기능을 직접 체험하고 싶다면, [공식 예제 사이트](https://www.kirilv.com/canvas-confetti)를 방문해보세요. 다양한 종류의 폭죽 효과를 직접 보고, 실험해볼 수 있습니다.  

<br>


## 결론
Canvas Confetti 라이브러리는 웹사이트에 독특하고 즐거운 시각적 요소를 추가하는 간단하고 효과적인 방법입니다. jQuery와 함께 사용하여, 생동감 있는 UI를 만들 수 있습니다. 이 플러그인을 사용하여 웹사이트의 특별한 순간을 더욱 기억에 남게 만들어보세요!  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-13-canvas-confetti/">예제결과 미리보기</a>
</div>

