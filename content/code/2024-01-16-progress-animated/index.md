---
title: jQuery - 프로그레스바 애니메이션 예제
description: >  
    jQuery를 활용하여 부드러운 진행 상황(프로그레스바) 애니메이션 효과를 구현하는 방법을 단계별로 설명합니다.

slug: 2024-01-16-progress-animated
date: 2024-01-16 00:00:00+0000
lastmod: 2024-01-16 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-16-progress-animated.webp

categories:
    - jQuery
tags:
    - 진행 표시줄
---
웹 사이트나 애플리케이션에서 사용자의 작업 진행 상황을 표시하는 것은 필수적인 UX 요소 중 하나입니다. 잘 설계된 프로그레스바는 사용자가 현재 위치와 목표까지의 거리를 인지하는데 도움을 주며, 작업의 완수를 향한 동기 부여가 될 수 있습니다. 이 예제에서는 `<progress>` 태그와 CSS를 이용하여 프로그레스바를 구현하고, jQuery로 애니메이션 효과를 추가하여 사용자에게 더욱 생동감 있게 상태를 표시하는 방법을 알아봅니다.  


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
```html
<label for="html">HTML</label>
<progress id="html" max="100" value="100">100%</progress>

<label for="css">CSS</label>
<progress id="css" max="100" value="70">70%</progress>

<label for="js">JS</label>
<progress id="js" max="100" value="50">50%</progress>
```
* **프로그레스바 레이블**
  * `<label>` 태그는 각 프로그레스바의 이름을 지정합니다.
  * `for` 속성은 연결된 프로그레스바의 `id`와 일치해야 합니다.

* **프로그레스바 바디**
  * `<progress>` 태그를 사용하여 프로그레스바를 생성합니다.
  * `id` 속성은 레이블과 연결되며, `max` 속성은 프로그레스바의 최댓값을 정의합니다.
  * `value` 속성은 현재 진행 상태를 나타내는 값으로, 애니메이션 될 대상입니다.  
<br>

## CSS 스타일
```css
label {
    display: block;
    padding: 15px 5px 5px;
    font-size: 16px;
}

progress {
    width: 100%;
    height: 35px;
    background-color: #f3f3f3;
    border: 0;
    border-radius: 18px;
}

progress::-webkit-progress-bar {
    background-color: #f3f3f3;
}

progress::-webkit-progress-value {
    border-radius: 18px;
    background-image: linear-gradient(60deg, #13E2DA, #543ab7);
}

progress::-moz-progress-bar {
    border-radius: 18px;
    background-image: linear-gradient(60deg, #13E2DA, #543ab7);
}
```
* **전체 레이블 및 프로그레스바 스타일링**
  * 레이블은 블록 요소로 표시되며, 패딩과 글꼴 크기가 지정됩니다.
  * 프로그레스바의 너비와 높이, 배경색, 테두리 반경이 정의되어 스타일링 됩니다.

* **브라우저 별 스타일링 호환성**
  * `-webkit-progress-bar` 및 `-webkit-progress-value`는 Webkit 기반 브라우저(Safari, Chrome 등)에서 프로그레스바의 배경과 값 영역을 스타일링 합니다.
  * `-moz-progress-bar`는 Mozilla 기반 브라우저(Firefox 등)에서 사용됩니다.    


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
// 각 'progress' 태그를 순회합니다.
$('progress').each(function () {
    // 'value' 속성을 읽어와 'max' 변수에 저장합니다.
    const max = $(this).attr('value');
    // 0에서 'max'까지 1초(1000ms) 동안 애니메이션 합니다.
    $(this).val(0).animate({ value: max }, 1000);
});
```
* **프로그레스바 선택 및 순회**
  * jQuery의 선택자 `$('progress')`를 사용하여 문서 내의 모든 `<progress>` 태그를 선택합니다.
  * `.each()` 함수는 선택된 각 요소에 대해 함수를 실행시켜줍니다.

* **프로그레스바 초기화 및 애니메이션**
  * `.attr('value')`를 통해 각 프로그레스바의 `value` 속성값을 읽어 `max` 변수에 저장합니다.
  * `.val(0)` 메서드로 프로그레스바의 초깃값을 0으로 설정합니다.
  * `.animate()` 메서드를 이용하여 `value` 속성을 0부터 `max`까지 1초 동안 부드럽게 증가시키는 애니메이션을 적용합니다.    

<br>

## 활용 예시 (스크롤 이벤트 추가)
위 코드와 함께 [jQuery - 스크롤 내리면 나타나는 애니메이션](https://ctrlcccv.github.io/code/2023-10-30-scroll-show/)을 활용하여 스크롤을 내리면 프로그레스바가 화면에 나타날 때 자연스럽게 증가하는 애니메이션 효과를 추가할 수 있습니다.  

```js
// progress 모든 요소를 선택합니다.
const $counters = $("progress");

// 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
const loop = true; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

// 각 progress 요소에 대한 value 속성값을 배열에 추가합니다.
const maxValues = [];
$counters.each(function() {
    const max = $(this).attr('value');
    maxValues.push(max);
    $(this).val(0);
});

// 윈도우의 스크롤 이벤트를 모니터링합니다.
$(window).on('scroll', function() {
    // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
    $counters.each(function(i) {
        const $el = $(this);

        // 요소의 위치 정보를 가져옵니다.
        const rect = $el[0].getBoundingClientRect();
        const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
        const contentHeight = rect.bottom - rect.top; // 요소의 높이
        
        // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
        if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
            if (!$el.hasClass('animated')){
                $el.stop().animate({ value: maxValues[i] }, 1000).addClass('animated');
            }
        }

        // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
        if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
            if ($el.hasClass('animated')){
                $el.stop().val(0).removeClass('animated');
            }
        }
    });
}).scroll();
```
이해를 돕기 위한 예시 코드입니다. 자세한 내용은 [jQuery - 스크롤 내리면 나타나는 애니메이션](https://ctrlcccv.github.io/code/2023-10-30-scroll-show/)을 참조해주세요.  
<br>

## 결론
이 예제를 통해 생동감 있는 프로그레스바 UI를 구현하는 방법을 알아보았습니다. 간단한 HTML과 CSS 설정에 jQuery 코드 몇 줄만으로도 멋진 비주얼 효과를 더할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-16-progress-animated/" target="_blank">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2024-01-28-circle-progress/">[관련글] jQuery - 원형 프로그레스바 및 애니메이션 구현하기</a>
</div>
