---
title: jQuery - 남은시간 타이머 만들기 (카운트다운)
description: >  
    jQuery를 사용하여 카운트다운 타이머를 만드는 방법입니다.
slug: 2023-11-06-countdown
date: 2023-11-06 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-06-countdown.webp

categories:
    - jQuery
tags:
    - 타이머
---
웹 페이지에서 남은 시간을 표시하는 카운트다운 타이머는 사용자에게 시간 경과를 시각적으로 보여주는 데 유용한 기능입니다. 이 글에서는 jQuery를 사용하여 웹 페이지에 간단한 남은 시간 타이머를 만드는 방법을 소개하겠습니다.   
이 타이머는 목표 날짜와 시간까지의 시간 차이를 계산하고 초, 분, 시간, 일 단위로 표시합니다.  
<br>

## HTML 구조
카운트다운을 표시할 요소를 마크업 합니다. 이 예제에서는 &lt;div&gt; 요소 안에 일, 시간, 분, 초를 나타내는 &lt;span&gt; 요소를 사용합니다.
```html
<div class="countdown">
    <span class="days">0</span>일
    <span class="hours">0</span>시간
    <span class="minutes">0</span>분
    <span class="seconds">0</span>초
</div>
```

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
jQuery를 사용하여 카운트다운을 계산하고 화면에 표시합니다.
```js
$(document).ready(function() {
    const $countdown = $('.countdown'); // 카운트다운을 표시할 요소
    const $days = $('.days'); // 남은 날짜를 표시할 요소
    const $hours = $('.hours'); // 남은 시간을 표시할 요소
    const $minutes = $('.minutes'); // 남은 분을 표시할 요소
    const $seconds = $('.seconds'); // 남은 초를 표시할 요소
    let countdownInterval; // 카운트다운을 갱신하기 위한 인터벌 변수
    const format = true; // 0을 포함한 두 자리 숫자로 표시할지 여부를 결정하는 변수 (true, false)

    // 0을 포함한 두 자리 숫자로 표시하는 함수
    function formatNumber(number) {
        if (format) {
            return number < 10 ? `0${number}` : number.toString();
        } else {
            return number.toString();
        }
    }

    // 카운트다운을 계산하는 함수
    function calculateCountdown() {
        // 현재 날짜와 시간을 가져옵니다.
        const now = new Date();
        // 목표 날짜와 시간을 설정합니다.
        const target = new Date('2100-01-01T00:00:00');
        // 목표 날짜까지의 시간 차이를 계산합니다.
        const diff = target - now;

        if (diff > 0) {
            // 시간 차이를 초, 분, 시간, 일로 분해합니다.
            const secDiff = Math.floor(diff / 1000);
            const minDiff = Math.floor(secDiff / 60);
            const hrDiff = Math.floor(minDiff / 60);
            const dayDiff = Math.floor(hrDiff / 24);

            // 각 요소에 해당하는 값을 설정하여 화면에 표시합니다.
            const days = formatNumber(dayDiff);
            const hours = formatNumber(hrDiff % 24);
            const minutes = formatNumber(minDiff % 60);
            const seconds = formatNumber(secDiff % 60);

            $days.text(days);
            $hours.text(hours);
            $minutes.text(minutes);
            $seconds.text(seconds);
        } else {
            // 카운트다운이 종료되면 메시지를 표시하고 인터벌을 중지합니다.
            $countdown.html('종료되었습니다.');
            clearInterval(countdownInterval);
        }
    }

    // 초기 카운트다운 값을 설정하고 1초마다 업데이트합니다.
    calculateCountdown();
    countdownInterval = setInterval(calculateCountdown, 1000);
});
```
* **요소 선택 및 변수 선언**
  * $countdown : 카운트다운을 표시할 요소입니다.
  * $days : 남은 날짜를 표시할 요소입니다.
  * $hours : 남은 시간을 표시할 요소입니다.
  * $minutes : 남은 분을 표시할 요소입니다.
  * $seconds : 남은 초를 표시할 요소입니다.
  * countdownInterval : 카운트다운을 갱신하기 위한 JavaScript 인터벌(interval)을 저장하는 데 사용됩니다.
  * format : 시간을 0을 포함한 두 자리 숫자로 표시할지 여부를 결정합니다. true로 설정하면 0을 포함한 두 자리 숫자로 표시하고, false로 설정하면 일반적인 형식으로 표시합니다.

* **0을 포함한 두 자리 숫자로 표시하는 함수 formatNumber()**
  * 입력된 숫자를 받아서, format 변수에 따라 0을 포함한 두 자리 숫자로 포맷팅합니다.
  * format 변수의 값이 true인 경우, 숫자가 10보다 작으면 0을 앞에 추가하여 두 자리 숫자로 변환합니다.

* **카운트다운 계산 함수 calculateCountdown()**
  * 현재 날짜와 시간을 가져오고, 목표 날짜와 시간을 설정합니다.
  * 목표 날짜는 "2100-01-01T00:00:00"과 같은 ISO 8601 형식으로 설정합니다. 이 형식은 데이터 교환에서 널리 사용되며, 날짜와 시간 간의 공백 없이 정확한 포맷을 제공합니다. 데이터의 정확성과 호환성을 보장하기 위해 선택했습니다.
  * 목표 날짜까지의 시간 차이를 계산합니다.
  * 시간 차이를 초, 분, 시간, 일로 분해하여 각각의 값을 계산합니다.
  * 각 요소($days, $hours, $minutes, $seconds)에 해당하는 값을 설정하여 화면에 표시합니다.
  * 만약 카운트다운이 종료되었다면, "종료되었습니다."라는 메시지를 표시하고 인터벌을 중지합니다.

* **초기 카운트다운 값 설정 및 업데이트**
  * calculateCountdown() : 페이지가 로드될 때 한 번 호출하여 초기 카운트다운 값을 설정합니다.  
  * countdownInterval : setInterval() 함수를 사용하여 1초마다 calculateCountdown() 함수를 호출하여 카운트다운을 업데이트합니다.  

이렇게 구성된 코드는 웹 페이지에서 남은 시간을 카운트다운하여 시각적으로 표시하는데 사용됩니다. 페이지가 로드되면 카운트다운이 시작되고, 각 시간 요소가 1초마다 업데이트됩니다. 만약 목표 날짜와 시간이 지나면 "종료되었습니다." 메시지가 표시되고 카운트다운이 멈춥니다.  
<br>

## 결론
이 글에서는 jQuery를 사용하여 웹 페이지에 남은 시간을 카운트다운하는 간단한 타이머를 만드는 방법을 설명했습니다.   
이 기능을 활용하면 이벤트 시작 시간, 할인 기간, 이벤트 종료 시간 등 다양한 상황에서 유용하게 활용할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-06-countdown/">예제결과 미리보기</a>
</div>