---
title: >  
    jQuery - 자동 계산되는 단계별 프로그레스바 (ProgressBar)

description: >  
    jQuery와 CSS를 활용하여 자동으로 계산되는 단계별 프로그레스바를 구현하는 방법을 소개합니다. 

slug: 2025-04-10-step-progress
date: 2025-04-10 01:00:00+0000
lastmod: 2025-04-10 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-10-step-progress.webp

categories:
    - jQuery
tags:
    - 진행 표시줄
---
웹사이트에서 사용자가 진행 상황을 쉽게 이해할 수 있도록 돕는 것은 매우 중요합니다. 이때 프로그레스바는 작업의 단계별 진행 상황을 명확하게 보여주는 유용한 도구입니다.

이번 글에서는 jQuery와 CSS를 이용해 특정 단계에 'active' 클래스를 추가하면, 그 단계까지의 진행 상황이 시각적으로 표시되는 프로그레스바를 만드는 방법을 소개합니다. 또한 CSS를 활용하여 다양한 스타일을 쉽게 적용할 수 있습니다.  


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
<!-- 현재 진행중인 li에 active 클래스를 추가해주세요 -->
<ol class="progress">
    <li>
        <span class="step">1</span>
        <strong class="tit">진행 완료</strong>
    </li>
    <li class="active">
        <span class="step">2</span>
        <strong class="tit">진행중</strong>
    </li>
    <li>
        <span class="step">3</span>
        <strong class="tit">진행 예정</strong>
    </li>
</ol>
```
* **목록 항목 구조**   
<span class="txt">각 표시 `<li>`는 프로그스바의 각 단계를 나타냈으며, 그 안에 진행 단계 번호를 표시하는 것과 .step 요소와 해당 단계를 설명하는 .tit 요소가 포함되어 있습니다.</span>  

* **클래스 활성화**  
<span class="txt">현재 진행 중인 단계에는 'active' 클래스를 추가하여 강조합니다.</span>

<br>

## CSS 스타일

```css
.progress { display: flex; justify-content: space-between; position: relative; max-width: 600px; margin: 0 11px 28px; margin: 200px auto 0; } 
.progress::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 4px; background: #D6D6D6; z-index: 0; transform: translate(0,-50%); } 
.progress::after { content: ''; position: absolute; top: 50%; left: 0; width: var(--progress-width); height: 4px; background: #007AFF; z-index: 1; transform: translate(0,-50%); } 
.progress > li { position: relative; width: 20px; text-align: center; } 
.progress > li .step { display: flex; justify-content: center; align-items: center; position: relative; width: 20px; height: 20px; margin: -2px auto 0; background: #EEEEEE; border: 1px solid #999999; border-radius: 50%; font-size: 10px; line-height: 1; color: #999999; z-index: 2; } 
.progress > li.end .step { background: #007AFF; border-color: #007AFF; color: #fff; } 
.progress > li.active .step { background: #fff; border-color: #007AFF; color: #007AFF; } 
.progress > li .tit { position: absolute; top: calc(100% + 4px); left: 50%; font-size: 12px; font-weight: 400; line-height: 130%; color: #999999; white-space: nowrap; transform: translate(-50%,0); } 
.progress > li.end .tit { color: #4D4D4D; } 
.progress > li.active .tit { color: #007AFF; } 
```
* **Flexbox 배열**  
<span class="txt">flexbox를 사용하여 목록 항목을 배치합니다. 이를 통해 화면 크기에 관계없이 요소가 적절하게 정렬됩니다.</span>

* **프로그레스바 디자인**  
<span class="txt">::before와 ::after 가상 요소는 프로그레스바의 배경과 현재 진행 상황을 표시하며, CSS의 --progress-width를 활용하여 프로그레스바의 너비를 동적으로 조정합니다. 이 가상 요소들은 상위 요소의 전체 너비를 기반으로 배치되며, 프로그레스바의 배경과 현재 진행 상황을 정확하게 나타냅니다.</span>

* **단계 스타일링**  
<span class="txt">각 step 클래스는 진행 상태의 원형 스타일을 구성하며, 색상은 단계에 따라 달라집니다.</span>

* **명확한 텍스트 표시**  
<span class="txt">각 단계의 설명은 내부에 배치되어 현재 상태를 명확하게 강조합니다. 변화하는 색상은 사용자에게 진행 상황을 효과적으로 전달합니다.</span>


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
$(document).ready(() => {
    initProgress();
});

function initProgress() {
    // 각 .progress 요소에 대해 반복
    $('.progress').each((_, progressElement) => {
        const $progress = $(progressElement); // 현재 progress 요소 래핑
        const $items = $progress.find('> li'); // 현재 progress의 li 항목들 선택
        const activeIndex = $items.index($items.filter('.active')); // 'active' 클래스를 가진 항목의 인덱스 구하기

        // 현재 활성화된 항목까지의 모든 항목에 'end' 클래스 추가
        $items.slice(0, activeIndex).addClass('end');

        // 총 항목 수 계산 (마지막 항목 제외)
        const totalItemsCount = $items.length - 1;
        // 비율 계산
        const percentage = (activeIndex / totalItemsCount) * 100; 
        // '--progress-width' CSS 변수를 사용하여 진행 상황의 너비 설정
        $progress.css('--progress-width', `${percentage}%`);
    });
}
```

* **`$('.progress').each(...)`** 
   - 페이지 내 모든 `.progress` 클래스를 가진 요소를 선택하고, 각 요소에 대해 반복합니다.

* **현재 요소 래핑하기**
   - `const $progress = $(progressElement)`
   - 현재 반복 중인 `.progress` 요소를 jQuery 객체로 감싸서, 이후의 작업에서 쉽게 조작할 수 있도록 합니다.

* **리스트 항목 선택하기**
   - `const $items = $progress.find('> li')`
   - 현재 `.progress` 요소의 직접 자식인 `<li>` 항목들을 선택합니다.

* **활성화된 항목 인덱스 구하기**
   - `const activeIndex = $items.index($items.filter('.active'))`
   - `active` 클래스를 가진 항목의 인덱스를 찾아 현재 활성화된 항목을 파악합니다.

* **활성화된 항목까지 클래스 추가하기**
   - `$items.slice(0, activeIndex).addClass('end')`
   - 활성화된 항목까지 모든 항목에 `end` 클래스를 추가하여 스타일을 적용합니다.

* **총 항목 수 계산하기**
   - `const totalItemsCount = $items.length - 1`
   - 마지막 항목을 제외한 총 항목 수를 계산하여 진행 상황을 정확하게 반영합니다.

* **진행 비율 계산하기**
   - `const percentage = (activeIndex / totalItemsCount) * 100`
   - 활성화된 항목의 인덱스를 총 항목 수로 나눈 뒤 100을 곱하여 백분율로 변환합니다.

* **CSS 변수 설정하기**
   - `$progress.css('--progress-width', `${percentage}%`)`
   - 계산된 비율을 CSS 변수에 설정하여 `.progress` 요소의 너비를 조정함으로써, 시각적으로 진행 상태를 표시합니다.

<br>

## 결론
이번 글에서는 jQuery와 CSS를 활용하여 자동으로 계산되는 단계별 프로그레스바를 구현하는 방법을 살펴보았습니다. 프로그레스바는 사용자에게 현재 작업의 진행 상황을 명확하게 전달하는 유용한 UI 요소로, 간단한 HTML 구조와 CSS 스타일을 통해 시각적으로 표현할 수 있습니다.

이러한 프로그레스바는 설치 과정, 설문조사, 주문 처리 등 다양한 웹 애플리케이션에서 활용할 수 있으며, 사용자가 진행 상황을 직관적으로 이해하도록 돕습니다. 또한, 커스터마이징이 쉬워 필요에 따라 디자인과 기능을 조정할 수 있습니다.

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-10-step-progress/">예제결과 미리보기</a>
</div>
