---
title: jQuery - 2단 탭메뉴 만들기 (탭 안에 탭)
description: >  
    jQuery를 사용한 2단 탭 메뉴 구현 방법을 상세하게 설명합니다. 메인 및 서브 탭의 활성화, 스타일링 방법에 대해 설명합니다.  
slug: 2023-12-12-nested-tab
date: 2023-12-12 00:00:00+0000
lastmod: 2023-12-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-12-nested-tab.webp

categories:
    - jQuery
tags:
    - 탭 메뉴
---
jQuery를 사용하여 2단 탭 메뉴를 구현하는 방법을 소개합니다. 2단 탭 메뉴는 웹 페이지 내에서 다양한 컨텐츠를 효율적으로 구성하고, 사용자의 상호작용을 통해 해당 컨텐츠를 동적으로 표시하는 데 유용합니다. 이러한 탭 메뉴 구성은 정보의 구조화 및 사용자 경험(UX) 향상에 기여합니다.   


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
<div class="tabs">
    <ul class="tab_nav">
        <li><a href="#tab1">Tab 1</a></li>
        <li><a href="#tab2">Tab 2</a></li>
        <li><a href="#tab3">Tab 3</a></li>
    </ul>

    <div class="tab" id="tab1">
        <h1>Tab 1</h1>
        <ul class="sub_tab_nav">
            <li><a href="#sub_tab1">Sub Tab 1</a></li>
            <li><a href="#sub_tab2">Sub Tab 2</a></li>
        </ul>
        <div class="sub_tab" id="sub_tab1">
            Sub Tab 1
        </div>
        <div class="sub_tab" id="sub_tab2">
            Sub Tab 2
        </div>
    </div>

    <div class="tab" id="tab2">
        <h1>Tab 2</h1>
        <ul class="sub_tab_nav">
            <li><a href="#sub_tab3">Sub Tab 3</a></li>
            <li><a href="#sub_tab4">Sub Tab 4</a></li>
        </ul>
        <div class="sub_tab" id="sub_tab3">
            Sub Tab 3
        </div>
        <div class="sub_tab" id="sub_tab4">
            Sub Tab 4
        </div>
    </div>

    <div class="tab" id="tab3">
        <h1>Tab 3</h1>
        <ul class="sub_tab_nav">
            <li><a href="#sub_tab5">Sub Tab 5</a></li>
            <li><a href="#sub_tab6">Sub Tab 6</a></li>
        </ul>
        <div class="sub_tab" id="sub_tab5">
            Sub Tab 5
        </div>
        <div class="sub_tab" id="sub_tab6">
            Sub Tab 6
        </div>
    </div>
</div>
```
* **tabs 클래스**  
모든 탭을 감싸는 컨테이너 역할을 합니다. 이 구조는 메인 탭(.tab_nav)과 각 메인 탭에 연결된 서브 탭들을 포함합니다.

* **tab_nav 클래스**  
메인 탭의 내비게이션을 구성하는 요소입니다. 이는 메인 탭들의 리스트를 포함합니다.

* **tab 클래스**  
각 메인 탭에 연결된 컨텐츠 영역입니다. 이 안에 서브 탭 내비게이션(.sub_tab_nav)과 서브 탭 컨텐츠(.sub_tab)가 포함됩니다.   
<br>

## CSS 스타일
```css
/* 전체 탭 컨테이너 */
.tabs { width: 100%; max-width: 800px; } 

/* 메인 탭과 서브 탭 내비게이션 바 */
.tab_nav, 
.sub_tab_nav { display: flex; align-items: center; position: relative; padding: 15px 15px 0; background: #f7f7f7; border: 1px solid #ddd; border-bottom: none; border-radius:6px 6px 0 0; } 
.sub_tab_nav { margin-top: 20px; } 
.tab_nav::after,
.sub_tab_nav::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px; background: #ddd; z-index: 1; } 

/* 메인 및 서브 탭 */
.tab_nav li a,
.sub_tab_nav li a { display: block; position: relative; padding: 10px 15px; border: 1px solid #f7f7f7; border-bottom: none; font-size: 18px; font-weight: 500; color: #000; z-index: 0; } 

/* 활성화된 탭 */
.tab_nav li.active a,
.sub_tab_nav li.active a { background: #fff; border-color: #ddd; border-radius:6px 6px 0 0; z-index: 2; } 

/* 탭 컨텐츠 영역 */
.tab, .sub_tab { display: none; padding: 15px; background-color: white; border: 1px solid #ddd; border-top: none; border-radius:0 0 6px 6px; } 

/* 활성화된 탭 컨텐츠 영역을 표시 */
.tab.active, .sub_tab.active { display: block; } 
```
* **.tabs, tab_nav, .sub_tab_nav**  
탭의 전체 레이아웃과 내비게이션 바의 스타일을 정의합니다. 이들은 탭과 서브 탭의 시각적 구분을 명확하게 합니다.

* **.tab_nav li a, .sub_tab_nav li a**  
메인 탭과 서브 탭의 개별 항목 스타일을 설정합니다. 이는 사용자가 탭을 쉽게 인식하고 클릭할 수 있게 합니다.

* **.tab, .sub_tab**  
각 탭에 대응하는 컨텐츠 영역의 스타일을 정의합니다. 기본적으로 숨겨져 있으며, 활성화된 탭에 해당하는 컨텐츠만 표시됩니다.  


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
const subTabNav = $(".sub_tab_nav a"); // 서브 탭 앵커 태그
const tabNav = $(".tab_nav a"); // 메인 탭 앵커 태그
const tabNavLi = $('.tab_nav li'); // 메인 탭 리스트

// 서브 탭 클릭 이벤트 핸들러
subTabNav.on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    // 해당 서브 탭 활성화
    $(target).addClass("active").siblings('.active').removeClass("active");
    $(this).closest('li').addClass("active").siblings().removeClass("active");
});

// 메인 탭 클릭 이벤트 핸들러
tabNav.on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    // 해당 메인 탭 활성화
    $(target).addClass("active").siblings('.active').removeClass("active");
    $(this).closest('li').addClass("active").siblings().removeClass("active");

    // 서브 탭 유지 또는 첫 번째 서브 탭 활성화
    const subTabActive = $(target).find('.sub_tab_nav li.active');
    if (!subTabActive.length) {
        $(target).find('.sub_tab_nav li:first-child a').trigger('click');
    } else {
        subTabActive.find('a').trigger('click');
    }
});

// 페이지 로드 시 첫 번째 탭 활성화
const mainTabActive = tabNavLi.filter('.active');
if (!mainTabActive.length) {
    tabNavLi.first().find('a').trigger('click');
} else {
    mainTabActive.find('a').trigger('click');
}
```
* **변수 선언**  
  * subTabNav  
  sub_tab_nav 클래스 내의 모든 &lt;a&gt; 태그입니다. 서브 탭의 링크입니다.

  * tabNav   
  tab_nav 클래스 내의 모든 &lt;a&gt; 태그입니다. 메인 탭의 링크입니다.

  * tabNavLi  
  메인 탭의 &lt;li&gt; 요소입니다. 탭 목록의 각 항목입니다.

* **서브 탭 클릭 이벤트 핸들링**  
  * 서브 탭 활성화  
  클릭 된 서브 탭의 컨텐츠를 활성화합니다.

  * 타겟 요소 선택  
  클릭 된 링크의 href 값을 이용해 타겟 ID를 얻습니다.

  * 탭 활성화 / 비활성화  
  선택된 서브 탭과 관련 컨텐츠를 활성화하고, 나머지는 비활성화합니다.

* **메인 탭 클릭 이벤트 핸들링**  
  * 메인 탭 활성화  
  클릭 된 메인 탭의 컨텐츠를 활성화합니다.

  * 서브 탭 상태 유지   
  현재 활성화된 메인 탭에서 서브 탭의 상태를 확인하고 유지합니다.

* **페이지 로드 시 첫 번째 탭 활성화**  
  * 초기 탭 설정   
  페이지 로드 시, 첫 번째 메인 탭을 자동으로 활성화하거나 이미 활성화된 탭을 유지합니다.  
<br>

## 결론
이 예제는 jQuery를 활용하여 2단 탭 메뉴를 구현하는 방법을 보여줍니다. 이러한 구조는 웹 페이지의 컨텐츠를 효과적으로 구성하고, 사용자에게 직관적인 탐색 경험을 제공합니다. 또한, 이 방법은 다양한 웹 애플리케이션과 사이트에서 정보를 깔끔하게 표시하는 데에 유용하게 사용될 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-12-nested-tab/">예제결과 미리보기</a>
</div>
