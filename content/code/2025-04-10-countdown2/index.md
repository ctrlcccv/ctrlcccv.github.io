---
title: >  
    jQuery - 숫자가 내려오는 카운트다운 애니메이션

description: >  
    jQuery를 사용하여 목표 시간까지 남은 시간을 동적으로 표시하는 카운트다운 애니메이션 효과를 설명합니다. 각 단위(일, 시, 분, 초)의 숫자가 부드럽게 전환되는 시각적 효과를 포함합니다.

slug: 2025-04-10-countdown2
date: 2025-04-10 00:00:00+0000
lastmod: 2025-04-10 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-10-countdown2.webp

categories:
    - jQuery
tags:
    - 타이머
---
웹 애플리케이션에서 카운트다운 타이머는 이벤트 시작, 제품 출시, 한정판 세일 등 다양한 상황에서 사용됩니다. 이런 카운트다운 타이머는 사용자가 남은 시간을 시각적으로 인지할 수 있게 해줍니다. 이 예제에서는 jQuery를 활용하여 숫자가 부드럽게 내려오는 카운트다운 애니메이션을 구현하는 방법을 설명합니다. 사용자는 목표 시간까지 남은 시간을 쉽게 확인할 수 있으며, 동적인 숫자 애니메이션으로 시각적인 즐거움도 경험할 수 있습니다.



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
<div class="countdown">
    <div class="unit_group">
        <div class="unit">
            <div class="digits" id="days_digits">
            <div class="unit_label">Days
        
        <div class="unit">
            <div class="digits" id="hrs_digits">
            <div class="unit_label">Hrs
        
        <div class="unit">
            <div class="digits" id="mins_digits">
            <div class="unit_label">Mins
        
        <div class="unit">
            <div class="digits" id="secs_digits">
            <div class="unit_label">Secs
        
    

```
* **주 카운트다운 요소**  
    * `.countdown` : 카운트다운 타이머의 모든 요소를 감싸는 컨테이너입니다.
    * `.unit_group` : 각각의 시간 단위(일, 시, 분, 초)를 그룹화합니다.
  
* **각 단위 구성**  
    * `.unit` : 각 시간 단위를 나타내는 요소로, 해당 단위의 숫자와 레이블을 포함합니다.
    * `.digits` : 남은 시간을 표시하는 숫자들을 감싸는 컨테이너입니다.
    * `.unit_label` : 각 단위의 이름을 표시하는 레이블입니다.

<br>

## CSS 스타일
```css
.countdown { position: fixed; top: 50%; left: 50%; text-align: center; transform: translate(-50%, -50%); } 
.countdown_digit.hidden { display: none; } 
.countdown,
.countdown .unit_group,
.countdown .digits { display: flex; justify-content: center; } 
.countdown .unit_group { gap: 40px; } 
.countdown .unit { position: relative; } 
.countdown .unit::before,
.countdown .unit::after { content:''; position: absolute; top: 50%; right:-24px; width: 8px; height: 8px; background: #00263a; transform: translate(0,-50%); } 
.countdown .unit::before { top: calc(50% - 20px); } 
.countdown .unit::after { top: 50%; } 
.countdown .unit:last-child:before, 
.countdown .unit:last-child:after { display: none; }
.countdown .digits { overflow: hidden; position: relative; } 
.countdown .digit { width: 45px; height: 68px; font-size: 68px; font-weight: 500; line-height: 1; letter-spacing: -0.035em; color: rgb(0, 38, 58); } 
.countdown .digit_roll_in { animation: countdownRoll 0.5s ease-in-out; } 
.countdown .unit_label { margin-top: 5px; font-size: 14px; font-weight: 500; letter-spacing: -0.035em; color: rgb(0, 38, 58); text-transform: uppercase; } 

@keyframes countdownRoll { 
    from { transform: translateY(-100%); } 
    to { transform: translateY(0); } 
}
```
* **위치 및 정렬**  
    * `.countdown`는 중앙에 고정되어 표시됩니다. 모든 요소가 수평 및 수직 방향으로 정렬됩니다.

* **디지털 숫자 스타일**  
    * `.digit` : 각 숫자의 크기 및 스타일을 정의하여 강렬한 시각적 효과를 줍니다.
    * `.digit_roll_in` : 숫자가 업데이트될 때 애니메이션 효과를 추가합니다.

* **레이블 스타일**  
    * `.unit_label` : 각 단위(일, 시, 분, 초)의 레이블을 스타일링하여 사용자에게 명확하게 전달합니다.

<br>

## jQuery 코드

```js
$(document).ready(() => {
    const countdown = new Countdown(".countdown"); // Countdown 인스턴스를 생성
});

class Countdown {
    constructor(selector) {
        this.element = $(selector); // 주어진 선택자로 DOM 요소 저장
        this.updateTimeout = null; // 업데이트를 위한 타이머 변수
        this.displayDigitsContainer = {
            d: $('#days_digits'), // 일(Days) 숫자를 표시할 컨테이너
            h: $('#hrs_digits'), // 시간(Hours) 숫자를 표시할 컨테이너
            m: $('#mins_digits'), // 분(Minutes) 숫자를 표시할 컨테이너
            s: $('#secs_digits') // 초(Seconds) 숫자를 표시할 컨테이너
        };
        this.updateDisplay(); // 초기 디스플레이 업데이트 호출
    }

    // 현재 시간을 초 단위로 반환
    getCurrentSeconds() {
        return Math.floor(Date.now() / 1000);
    }

    // 남은 시간을 계산하여 일, 시, 분, 초를 객체 형태로 반환
    calculateRemainingTime() {
        const futureTime = new Date("2100-04-10T09:00:00").getTime() / 1000; // 목표 시간
        const now = this.getCurrentSeconds(); // 현재 시간
        const diff = futureTime - now; // 남은 시간 계산

        if (diff < 0) return { d: 0, h: 0, m: 0, s: 0 }; // 과거 시간일 경우 0 반환

        return {
            d: Math.floor(diff / (3600 * 24)), // 남은 일수
            h: Math.floor((diff % (3600 * 24)) / 3600), // 남은 시간
            m: Math.floor((diff % 3600) / 60), // 남은 분
            s: Math.floor(diff % 60) // 남은 초
        };
    }

    // 디스플레이 업데이트 메서드
    updateDisplay() {
        const remainingTime = this.calculateRemainingTime(); // 남은 시간 계산
        const displayDigits = Object.values(remainingTime).map(value => value.toString().padStart(2, '0')); // 2자리로 변환

        // 각 시간 단위에 대해 디스플레이 업데이트
        Object.keys(this.displayDigitsContainer).forEach((unitKey, index) => {
            const container = this.displayDigitsContainer[unitKey]; // 현재 단위의 컨테이너
            this.updateDigits(container, displayDigits[index]); // 숫자 업데이트
        });

        clearTimeout(this.updateTimeout); // 이전 타이머 정리
        this.updateTimeout = setTimeout(() => this.updateDisplay(), 1000); // 1초 후 다시 업데이트
    }

    // 각 시간 단위의 숫자를 업데이트
    updateDigits(container, newDigits) {
        const digitElements = container.children('.digit'); // 현재 숫자 요소들

        if (digitElements.length === 0) {
            // 숫자 요소가 없을 경우 새로운 요소 생성
            this.createDigits(container, newDigits);
        } else {
            const currentDigit = digitElements.eq(0).find("[data-pos='next']").text(); // 현재 숫자
            this.animateDigits(digitElements, currentDigit, newDigits); // 애니메이션으로 숫자 변경
        }
    }

    // 숫자 요소 생성
    createDigits(container, newDigits) {
        newDigits.split('').forEach(digit => {
            const $digitElement = $("<div class='digit' data-col>"); // 새로운 숫자 요소 생성
            $digitElement.append($("<div data-pos='next'>" + digit + "")) // 다음 숫자
                        .append($("<div data-pos='prev'>" + digit + "")); // 이전 숫자
            container.append($digitElement); // 컨테이너에 추가
        });
    }

    // 숫자 변경 애니메이션 효과
    animateDigits(digitElements, currentDigit, newDigits) {
        Array.from(digitElements).forEach((el, index) => {
            const $prevDiv = $(el).find("[data-pos='prev']"); // 이전 숫자 요소
            const $nextDiv = $(el).find("[data-pos='next']"); // 다음 숫자 요소
            const prevDigit = $nextDiv.text(); // 현재 표시된 숫자
            const nextDigit = newDigits[index]; // 새로 업데이트할 숫자

            if (prevDigit !== nextDigit) {
                $prevDiv.text(prevDigit); // 이전 숫자 업데이트
                $nextDiv.text(nextDigit); // 다음 숫자 업데이트
                $(el).addClass("digit_roll_in"); // 애니메이션 클래스 추가

                setTimeout(() => {
                    $(el).removeClass("digit_roll_in"); // 애니메이션 클래스 제거
                }, 600); // 애니메이션 효과 지속 시간
            } else {
                $nextDiv.text(nextDigit); // 숫자가 같을 경우 애니메이션 클래스 추가 없음
            }
        });
    }
}
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


* **생성자 (constructor)**  
    <span class="txt">전달된 선택자를 통해 DOM 요소를 jQuery 객체로 저장하고, 업데이트 타이머 변수를 초기화합니다. `displayDigitsContainer`는 각 시간 단위의 숫자 컨테이너를 저장하는 객체입니다.</span>  

* **현재 시간을 반환하는 메서드 (getCurrentSeconds)**  
    <span class="txt">현재 시간을 초 단위로 변환하여 반환합니다. `Math.floor(Date.now() / 1000)`를 통해 현재 시간을 초로 계산합니다.</span>  

* **남은 시간을 계산하는 메서드 (calculateRemainingTime)**  
    <span class="txt">목표 시간(`2100-04-10T09:00:00`)과 현재 시간을 비교하여 남은 시간을 계산합니다. 남은 시간을 일, 시간, 분, 초로 나누어 객체 형태로 반환합니다. 만약 목표 시간이 지난 경우, 모든 값을 0으로 반환합니다.</span>  

* **디스플레이 업데이트 메서드 (updateDisplay)**  
    <span class="txt">남은 시간을 계산한 후, 각 시간 단위에 대한 숫자를 2자리 형식으로 변환하여 업데이트합니다. `setTimeout`을 사용해 1초 후에 다시 호출하여 지속적으로 업데이트합니다.</span>  

* **숫자 업데이트 메서드 (updateDigits)**  
    <span class="txt">각 시간 단위의 숫자를 업데이트합니다. 먼저 기존 숫자가 존재하는지 확인한 후, 기존 숫자와 비교하여 애니메이션 효과를 적용합니다. 만약 이전 숫자가 없다면 새로운 숫자 요소를 생성합니다.</span>  

* **숫자 요소 생성을 위한 메서드 (createDigits)**  
    <span class="txt">새로운 숫자를 위한 div 요소를 생성하고, `data-pos` 속성을 통해 현재 숫자와 이전 숫자를 표시합니다. 이 숫자 요소를 지정된 컨테이너에 추가합니다.</span>  

* **숫자 애니메이션 메서드 (animateDigits)**  
    <span class="txt">각 숫자 요소를 순회하며 현재 숫자와 새로 업데이트할 숫자를 비교합니다. 다를 경우, 애니메이션 클래스를 추가하여 시각적인 효과를 발생시킵니다. 숫자가 같을 경우에는 업데이트만 진행합니다.</span>  

<br>

## 결론
이 글에서는 jQuery를 이용한 숫자가 내려오는 카운트다운 애니메이션을 구현하는 방법을 설명했습니다. 기존의 정적인 카운트다운 방식과는 달리, 부드럽고 시각적으로 매력적인 애니메이션을 제공하여 사용자 경험을 향상시킵니다. 목표 시간까지 남은 시간을 동적으로 표시하는 이 기능은 이벤트, 프로모션, 또는 특정 기간을 강조하는 웹사이트에서 유용하게 사용할 수 있습니다.

이러한 카운트다운 기능은 사용자가 남은 시간을 쉽게 인지할 수 있도록 도와주고, 웹 애플리케이션에 보다 생동감을 부여하는 중요한 요소입니다. jQuery를 활용한 이 간단한 구현은 필요에 따라 추가적인 기능이나 스타일로 쉽게 확장할 수 있습니다.

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-10-countdown2/">예제결과 미리보기</a>
    <a href="/code/2023-11-06-countdown/">[관련글] jQuery - 남은시간 타이머 만들기 (카운트다운)</a>
</div>
