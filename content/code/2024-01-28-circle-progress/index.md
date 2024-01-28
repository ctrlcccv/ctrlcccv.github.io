---
title: >  
    jQuery - 원형 프로그레스바 및 애니메이션 구현하기
description: >  
    jQuery와 HTML5 캔버스를 사용하여 애니메이션 기능이 추가된 원형 프로그레스바를 구현하는 방법을 자세히 소개합니다.
slug: 2024-01-28-circle-progress
date: 2024-01-28 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-28-circle-progress.webp

categories:
    - jQuery
tags:
    - 진행 표시줄
---
jQuery와 HTML5의 캔버스 태그를 이용해 그려지는 이 프로그레스바는 데이터 로딩이나 작업 진행 상황을 시각적으로 표현해줍니다. 이 글에서는 이러한 원형 프로그레스바를 만들고, 원하는 퍼센트에 따라 애니메이션 되는 동적인 요소를 구성하는 방법을 알아보겠습니다.   
<br>

## HTML 구조
```html
<div class="canvas_wrap">
    <canvas class="canvas" width="300" height="300" data-percent="78"></canvas>
    <span class="percent"></span>
</div>
```
* **캔버스 컨테이너**
  * `canvas_wrap` 클래스는 캔버스 요소와 퍼센트 표시를 감싸는 컨테이너입니다. 이는 캔버스와 텍스트를 공간적으로 포함시켜 레이아웃을 관리하기 쉽게 도와줍니다.

* **캔버스**
  * 캔버스 요소는 직접 그림을 그릴 수 있는 HTML 요소로, 여기에서는 `canvas` 클래스로 지정하고, 너비와 높이를 300px로 설정하였습니다.
  * `data-percent` 속성은 원형 프로그레스바가 나타낼 퍼센티지를 정의합니다. 이 값은 jQuery 스크립트에 의해 동적으로 읽히고, 그릴 프로그레스의 양을 결정합니다.

* **퍼센트 표시**
  * `percent` 클래스는 캔버스 위에 중첩되어 퍼센트 값을 표시하는 요소입니다.  
<br>  

## CSS 스타일

```css
.canvas_wrap {
    position: relative;
    max-width: 300px;
    max-height: 300px;
}
.canvas_wrap .percent {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 50px;
    color: #3949AB;
    transform: translate(-50%, -50%);
}
.canvas_wrap .percent::after {
    content: '%';
}
.canvas_wrap canvas {
    width: 100%;
    height: 100%;
}
```
* **캔버스 컨테이너 스타일링**
  * `canvas_wrap` 클래스에 `position: relative`를 적용하여 내부 요소인 `percent` 클래스를 캔버스에 중앙에 배치합니다.

* **퍼센트 스타일링**
  * `percent` 클래스에는 `position: absolute`를 적용하여 컨테이너 중앙에 배치합니다.
  * `transform` 속성을 사용하여 가로와 세로 중심에서 정확히 50%씩 이동시켜 실제 중앙에 배치합니다.
  * `::after` 가상 요소를 사용하여 퍼센트 기호(%)를 추가합니다.

* **캔버스 스타일링**
  * 캔버스 크기를 부모 요소에 맞추어 100%로 설정하여 반응형 디자인이 가능하도록 만듭니다.   

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

## jQuery 코드

```js
$('.canvas').each(function() { 
    // 퍼센트를 표시할 요소 선택
    const spanpercent = $(this).siblings('.percent');
    
    // 원의 테두리 너비(px) 및 애니메이션 지속 시간(ms) 정의 
    const border = 20;
    const duration = 700; 

    // 캔버스 및 2D 컨텍스트 설정
    const canvas = $(this)[0]; 
    const ctx = canvas.getContext('2d');

    // 애니메이션에 필요한 변수 및 데이터 속성에서 목표 퍼센트 가져오기
    const targetPercent = $(this).data('percent');
    const posX = canvas.width / 2;
    const posY = canvas.height / 2;
    const onePercent = 360 / 100;
    const result = onePercent * targetPercent;
    const radius = (canvas.width / 2) - (border / 2);
    let percent = 0;
    ctx.lineCap = (targetPercent <= 0) ? 'butt' : 'round';

    // 원을 그리고 퍼센트 업데이트하는 함수
    function arcMove() {
        let degrees = 0;
        let startTime = null;

        // 애니메이션을 처리하는 함수
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = (timestamp - startTime) / duration;
            progress = Math.min(1, progress);
            degrees = progress * result;

            // 캔버스 초기화 및 퍼센트 업데이트
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            percent = Math.floor(degrees / onePercent);
            spanpercent.text(percent);

            // 배경 선 그리기
            ctx.beginPath();
            ctx.arc(posX, posY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#b1b1b1';
            ctx.lineWidth = border;
            ctx.stroke();

            // 애니메이션 되는 선 그리기
            ctx.beginPath();
            ctx.strokeStyle = '#3949AB';
            ctx.lineWidth = border;
            ctx.arc(posX, posY, radius, Math.PI * -0.5, (Math.PI / 180) * degrees - (Math.PI / 2));
            ctx.stroke();

            // 애니메이션이 완료되지 않았다면 계속해서 프레임 요청
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        // 첫 프레임 요청
        requestAnimationFrame(animate);
    }

    // 애니메이션 함수 호출
    arcMove();
});
```
* **jQuery 선택자 및 변수 선언**
  * `canvas` 클래스를 가진 모든 캔버스 태그를 선택하고 `each` 함수를 사용하여 각각의 캔버스에 대해 반복작업을 수행합니다.
  * `spanpercent` 변수는 해당 캔버스 요소와 관련된 퍼센트 값을 표시할 요소를 선택합니다.
  * `border` 변수는 원 프로그레스바의 테두리 너비를 정의하고, `duration` 변수는 애니메이션 지속 시간을 정합니다.

* **캔버스 및 컨텍스트 설정**
  * 각 캔버스 요소에 대해 JavaScript 렌더링 컨텍스트를 가져옵니다.
  * `targetPercent` 변수는 캔버스 요소의 data-percent 속성 값을 읽어 들여 목표 퍼센트로 설정합니다.

* **arcMove 함수**
  * 주 함수로, 원형 프로그레스바의 애니메이션을 실행하는 역할을 합니다.

* **animate(timestamp) 함수**
  * 애니메이션 프레임마다 호출되는 콜백 함수입니다.
  * startTime 변수를 활용하여 각 프레임에서 경과한 시간을 계산합니다.
  * progress 변수를 통해 애니메이션의 현재 진행률을 나타냅니다.
  * degrees 변수를 사용하여 진행률에 비례하는 각도를 계산합니다.
  * 캔버스를 프레임마다 초기화하여 원형 프로그레스바를 지웁니다.
  * percent 변수에 현재 degrees 값에서 계산된 퍼센트 값을 저장하고, 화면에 표시된 텍스트를 업데이트합니다.

* **캔버스 초기화**
  * ctx.clearRect(0, 0, canvas.width, canvas.height)를 이용하여 캔버스를 프레임마다 초기화합니다.

* **프로그레스바 업데이트**
  * 이전 원형 프로그레스바의 배경 선(회색)을 그립니다.
  * 애니메이션 되는 프로그레스바(파란색)를 그립니다.
  * 파란색 선의 시작 각도는 -90도(Math.PI * -0.5)입니다(시계 12시 방향부터 시작).
  * ctx.arc() 메서드의 마지막 인자에 의해, 진행률에 따라 서서히 원이 그려지게 됩니다.

* **애니메이션 프레임 요청**
  * 애니메이션 진행률이 1 미만일 때까지 계속해서 requestAnimationFrame(animate)를 호출하여 애니메이션이 완료될 때까지 반복합니다.  
<br>

## 결론
jQuery와 HTML5의 캔버스를 활용하여 원형 프로그레스바와 애니메이션을 구현하는 방법을 설명했습니다. 캔버스를 활용하여 동적인 퍼센트 표시 및 부드러운 애니메이션을 통해 진행 상황을 시각적으로 표현할 수 있습니다.   
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-28-circle-progress/" target="_blank">예제결과 미리보기</a>
</div>
