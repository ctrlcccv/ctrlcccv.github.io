---
title: jQuery - 스크롤 내렸을 때 숫자 카운트 애니메이션
description: >  
    화면에 노출됐을 때 숫자가 부드럽게 증가하는 효과를 구현하는 방법입니다.
slug: 2023-10-20-counting
date: 2023-10-20 00:00:00+0000
lastmod: 2023-10-20 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-20-counting.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
사용자가 웹 페이지를 스크롤 할 때, 화면에 특정 요소가 나타나면서 숫자가 부드럽게 증가하는 이 효과는 사용자 경험을 향상시키고 페이지의 시각적 매력을 높여줍니다. 이 글에서는 jQuery를 사용하여 **스크롤 내렸을 때 숫자 카운트 애니메이션을 만드는 방법**을 알아보겠습니다.  


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
HTML 코드에는 카운트로 사용할 숫자를 표시할 요소가 필요합니다. 이 예제에서는 클래스가 "counter"로 지정된 세 개의 요소를 사용합니다. 각 요소에는 시작 값과 끝 값을 설정할 수 있는 데이터 속성(data-start와 data-end)이 있습니다.

```html
<span class="counter" data-start="0" data-end="123">0</span>
<span class="counter" data-start="0" data-end="456">0</span>
<span class="counter" data-start="0" data-end="7890">0</span>
```

## CSS 스타일
카운트 요소의 스타일을 설정합니다. 
```css
.counter {padding:0 30px;font-size: 60px;font-weight: 500;color: #000;text-align: center;}
```

## jQuery 코드
jQuery를 사용하여 스크롤 이벤트에 반응하고 숫자를 업데이트하며 애니메이션을 구현합니다.


<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
$(document).ready(function() {
    // 클래스가 "counter"인 모든 요소를 선택합니다.
    const $counters = $(".counter");
    
    // 노출 비율(%)과 애니메이션 속도(ms)을 설정합니다.
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const duration = 1000; // ex) 1000 = 1초
    
    // 숫자에 쉼표를 추가할지 여부를 설정합니다.
    const addCommas = true; // ex) true = 1,000 / false = 1000
    
    // 숫자를 업데이트하고 애니메이션하는 함수 정의
    function updateCounter($el, start, end) {
        let startTime;
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            const current = Math.round(start + progress * (end - start));
            const formattedNumber = addCommas ? current.toLocaleString() : current;
            $el.text(formattedNumber);
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                $el.text(addCommas ? end.toLocaleString() : end);
            }
        }
        requestAnimationFrame(animateCounter);
    }

    
    // 윈도우의 스크롤 이벤트를 모니터링합니다.
    $(window).on('scroll', function() {
        // 각 "counter" 요소에 대해 반복합니다.
        $counters.each(function() {
            const $el = $(this);
            // 요소가 아직 스크롤되지 않았다면 처리합니다.
            if (!$el.data('scrolled')) {
                // 요소의 위치 정보를 가져옵니다.
                const rect = $el[0].getBoundingClientRect();
                const winHeight = window.innerHeight;
                const contentHeight = rect.bottom - rect.top;
                
                // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
                if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                    const start = parseInt($el.data("start"));
                    const end = parseInt($el.data("end"));
                    // 숫자를 업데이트하고 애니메이션을 시작합니다.
                    updateCounter($el, start, end);
                    $el.data('scrolled', true);
                }
            }
        });
    }).scroll();
});
```

* **요소 선택**  
const $counters = $(".counter") 를 사용하여 HTML에서 클래스가 "counter"인 모든 요소를 선택합니다.   
이 요소들은 숫자 카운트 애니메이션을 적용할 대상입니다.  

* **애니메이션 설정**   
exposurePercentage 변수는 스크롤 될 때 요소가 화면에 노출되면 숫자가 증가하도록 설정된 비율(%)을 나타냅니다.   
duration 변수는 숫자 카운트 애니메이션의 지속 시간을 밀리초(ms) 단위로 설정합니다.  

* **숫자에 쉼표 추가 여부 설정**    
addCommas 변수는 숫자에 쉼표(천 단위 구분 기호)를 추가할지 여부를 설정합니다. true로 설정되면 숫자가 1,000과 같이 표시됩니다.  

* **숫자 업데이트 및 애니메이션 함수 정의**  
updateCounter 함수는 각 숫자 카운트를 업데이트하고 애니메이션을 적용하는 역할을 합니다.   
이 함수는 시작 값(start)과 끝 값(end)을 받아서 애니메이션을 처리합니다.   
숫자가 부드럽게 증가하도록 [requestAnimationFrame](https://developer.mozilla.org/ko/docs/Web/API/window/requestAnimationFrame)을 사용하여 애니메이션을 제어합니다.  
숫자에 쉼표가 필요한 경우 [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) 메서드를 사용하여 형식을 적용합니다.

* **스크롤 이벤트 처리**    
스크롤 이벤트가 발생할 때마다 각 "counter" 요소를 검사하여 요소가 화면에 나타났을 때 숫자 카운트 애니메이션을 시작합니다.  

* **요소의 위치 확인**  
각 "counter" 요소의 위치 정보를 가져와서 요소가 화면에 특정 비율로 노출되었는지 확인합니다.   
이때, [getBoundingClientRect()](https://developer.mozilla.org/ko/docs/Web/API/Element/getBoundingClientRect) 메서드를 사용하여 요소의 위치와 높이를 계산합니다.  

* **숫자 카운트 애니메이션 시작**  
만약 요소가 아직 스크롤 되지 않았고 화면에 특정 비율로 노출될 때, updateCounter 함수를 호출하여 숫자를 업데이트하고 애니메이션을 시작합니다.
그리고 해당 요소에 스크롤 된 상태를 표시하기 위해 data('scrolled', true)를 설정합니다.  
<br>

## 결론
이렇게 jQuery를 사용하여 스크롤 내렸을 때 숫자 카운트 애니메이션을 구현할 수 있습니다. 이 기능을 활용하면 웹 페이지에 더 많은 상호작용성과 시각적 흥미를 추가할 수 있습니다. 코드를 사용해 보고 웹 프로젝트에 적용하여 사용자에게 더 독특하고 매력적인 경험을 제공해 보세요.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-20-counting/">예제결과 미리보기</a>
</div>
