---
title: CSS와 jQuery로 눈 내리는 효과 만들기 (반응형)
description: >  
    CSS와 jQuery를 사용하여 웹 페이지에 반응형 눈 내리는 효과를 만드는 방법을 단계별로 안내합니다. 눈송이의 크기, 속도, 개수를 조절하는 방법을 포함하여 모든 디바이스에서 일관된 사용자 경험을 제공합니다.
slug: 2023-11-29-snow
date: 2023-11-29 01:00:00+0000
lastmod: 2023-11-29 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-29-snow2.webp

categories:
    - jQuery
tags:
    - 배경 효과
---
CSS와 jQuery를 사용하여 웹 페이지에 눈 내리는 효과를 만드는 방법을 소개합니다. 이러한 효과는 특히 겨울철이나 특별한 행사를 위한 웹사이트에 매력적인 추가 요소가 될 수 있습니다. 본 글에서는 이러한 효과를 만드는 과정을 자세히 설명하고, 반응형 디자인을 고려하여 다양한 기기에서도 잘 작동하도록 구현하는 방법을 단계별로 안내합니다.     

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
<div class="snow_wrap">
    <canvas class="snow"></canvas>
    <h1>브라우저 화면 크기를 변경하여<br>반응형 전환 효과를 확인해보세요.</h1>
</div>
```
* snow_wrap 클래스는 캔버스를 포함하는 컨테이너입니다.
* show 클래스는 눈송이 애니메이션을 표시하는 캔버스 요소입니다.   
<br>

## CSS 스타일
```css
.snow_wrap { overflow: hidden; width: 100%; height: 100vh; } 
.snow { background: #141f3e; } 
```
* snow_wrap 클래스는 캔버스와 헤더를 감싸고, 전체 높이(100vh)를 차지합니다.
* snow 클래스는 눈송이 애니메이션의 배경색을 설정합니다.  

<br>

## jQuery 코드
```js
const canvas = $('.snow')[0];
const context = canvas.getContext('2d');

// 캔버스의 초기 너비와 높이를 설정합니다.
let canvasWidth = $('.snow_wrap').width();
let canvasHeight = $('.snow_wrap').height();
let lastDeviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';

// 눈송이 파티클을 생성하는 함수입니다.
function createParticles() {
    // 기존 파티클을 삭제하고 새 파티클을 생성합니다.
    snowParticles = []; 
    // 디바이스에 따라 파티클 수를 조정합니다.
    const particleCount = lastDeviceType === 'mobile' ? 40 : 100; 
    for (let i = 0; i < particleCount; i++) {
        snowParticles.push(new createParticle());
    }
}

// 캔버스의 크기를 조정하는 함수입니다.
function setCanvasSize() {
    const currentDeviceType = window.innerWidth < 768 ? 'mobile' : 'desktop';
    // 디바이스가 변경되면 새로운 파티클을 생성합니다.
    if (currentDeviceType !== lastDeviceType) {
        lastDeviceType = currentDeviceType;
        createParticles();
    }
    
    // 임시 캔버스를 사용하여 현재 내용을 저장합니다.
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvasWidth;
    tempCanvas.height = canvasHeight;
    tempCtx.drawImage(canvas, 0, 0);

    // 캔버스의 크기를 재설정합니다.
    canvasWidth = $('.snow_wrap').width();
    canvasHeight = $('.snow_wrap').height();
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 임시 캔버스의 내용을 원래 캔버스에 복원합니다.
    context.drawImage(tempCanvas, 0, 0);
}

// 눈송이 파티클을 저장할 배열입니다.
let snowParticles = []; 

// 개별 눈송이 파티클을 생성하는 생성자 함수입니다.
function createParticle() {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = Math.random() * 4 - 1;
    this.vy = Math.random() * 4 + 1;
    this.color = `rgba(255, 255, 255, ${Math.random()})`;
    this.radius = Math.random() * 5 + 2;
}

// 눈송이 파티클을 그리는 함수입니다.
function draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스를 지웁니다.
    snowParticles.forEach(function(particle) {
        context.beginPath();
        let gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius);
        gradient.addColorStop(1, particle.color);
        gradient.addColorStop(1, "rgb(66, 66, 66)");
        context.fillStyle = gradient;
        context.arc(particle.x, particle.y, particle.radius, Math.PI * 2, false);
        context.fill();
        // 파티클 위치 업데이트
        particle.x += particle.vx;
        particle.y += particle.vy;
        // 파티클이 캔버스 밖으로 나가면 반대편에서 다시 시작
        if (particle.x < -50) particle.x = canvasWidth + 50;
        if (particle.y < -50) particle.y = canvasHeight + 50;
        if (particle.x > canvasWidth + 50) particle.x = -50;
        if (particle.y > canvasHeight + 50) particle.y = -50;
    });
}

// 창 크기가 변경될 때마다 캔버스 크기를 조정합니다.
$(window).resize(setCanvasSize);
setCanvasSize(); // 초기 캔버스 크기를 설정합니다.
createParticles(); // 초기 파티클을 생성합니다.
setInterval(draw, 33); // 33ms 간격으로 눈송이 애니메이션을 시작합니다.
```



<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


* **캔버스 초기화 및 크기 설정**  
  * 캔버스와 2D 렌더링 컨텍스트를 초기화합니다.
  * 캔버스의 너비와 높이를 .snow_wrap 요소의 크기에 맞춥니다.
  * 사용자 기기 유형(모바일/데스크톱)을 감지합니다.

* **눈송이 파티클 생성**  
  * createParticles 함수는 새로운 눈송이 파티클을 생성합니다.
  * 디바이스 유형에 따라 파티클의 수를 조정합니다.

* **캔버스 크기 조정 로직**  
  * setCanvasSize 함수는 창 크기가 변경될 때마다 캔버스 크기를 조정합니다.
  * 기기 변경 시 새로운 파티클을 생성합니다.

* **눈송이 파티클 생성자**  
  * createParticle 생성자 함수는 개별 눈송이 파티클의 속성을 정의합니다.
  * this.x와 this.y는 파티클의 초기 위치를 무작위로 설정합니다.
  * this.vx와 this.vy는 파티클의 수평 및 수직 속도를 결정합니다. 이 값들은 눈송이가 얼마나 빠르게 움직일지를 제어합니다. 수치를 조정하여 눈송이의 내리는 속도를 변경할 수 있습니다.
  * this.color는 파티클의 색상을 설정합니다.
  * this.radius는 파티클의 반지름을 정의합니다. 이 값은 눈송이의 크기를 조절하는 데 사용됩니다. 값이 클수록 눈송이가 더 커집니다.

* **애니메이션 구현**  
  * draw 함수는 눈송이 파티클을 캔버스에 그립니다.
  * 파티클의 위치를 업데이트하고 화면 바깥으로 나가면 반대편에서 재진입하게 합니다.

* **창 크기 변경 감지 및 초기화**  
  * $(window).resize(setCanvasSize)로 창 크기가 변경될 때마다 캔버스 크기를 조정합니다.
  * 페이지 로드 시 초기 캔버스 크기를 설정하고, 초기 파티클을 생성합니다.
  * setInterval(draw, 33)로 눈송이 애니메이션을 33밀리 초 간격으로 반복합니다.


눈송이 파티클의 크기와 내리는 속도는 createParticle 생성자 함수 내의 this.radius, this.vx, this.vy 값을 조정하여 쉽게 변경할 수 있습니다. 예를 들어, this.radius = Math.random() * 10 + 2라고 설정하면, 눈송이의 크기 범위가 더 커집니다. 마찬가지로 this.vy = Math.random() * 6 + 1과 같이 설정하면 눈송이가 더 빠르게 떨어집니다. 이러한 조정을 통해 다양한 환경과 테마에 맞는 독특한 눈 내리는 효과를 만들 수 있습니다.   
<br>

## 결론
CSS와 jQuery를 사용하여 눈 내리는 효과를 만드는 과정을 단계별로 살펴보았습니다. 눈송이의 크기, 속도 및 개수를 조절하여 다양한 환경에 맞는 독특한 시각적 요소를 생성할 수 있습니다. 반응형 디자인을 고려하여 구현함으로써, 모든 디바이스에서 일관된 사용자 경험을 제공하는 것도 중요합니다. 이러한 시각적 효과는 단순한 장식 이상의 가치를 지니며, 웹사이트의 전반적인 분위기와 사용자의 참여를 높이는 데 크게 기여할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-29-snow/">예제결과 미리보기</a>
</div>

