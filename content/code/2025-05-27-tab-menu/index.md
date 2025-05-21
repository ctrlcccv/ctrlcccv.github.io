---
title: >  
    jQuery - 클래스 하나로 탭메뉴 여러개 구현하기

description: >  
    jQuery를 활용하여 하나의 클래스로 여러 개의 탭 메뉴를 효율적으로 구현하는 방법을 알아봅니다.

slug: 2025-05-27-tab-menu
date: 2025-05-27 00:00:00+0000
lastmod: 2025-05-27 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-27-tab-menu.webp

categories:
    - jQuery
tags:
    - 탭 메뉴
---

한 페이지에 여러 개의 탭 메뉴가 필요할 때마다 같은 코드를 반복해서 작성하고 계신가요?

웹사이트를 개발하다 보면 동일한 기능의 탭 메뉴가 여러 섹션에 필요한 경우가 많습니다. 이럴 때 비슷한 코드를 계속 반복해서 작성하면 유지보수도 어렵고 코드량도 불필요하게 많아집니다. 이번 글에서는 jQuery를 활용해 단 하나의 클래스로 여러 개의 탭 메뉴를 쉽게 구현하는 방법을 소개해 드립니다.

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
<h1>탭 메뉴 예시</h1>

<h2>첫 번째 탭 메뉴</h2>
<div class="tab_container">
    <ul class="tit_list">
        <li><a href="#tab1_1">탭 1</a></li>
        <li><a href="#tab1_2">탭 2</a></li>
        <li><a href="#tab1_3">탭 3</a></li>
    </ul>
    <div class="tab_content_list">
        <div id="tab1_1" class="tab_content">
            <h3>첫 번째 탭 내용</h3>
            <p>여기에 첫 번째 탭의 내용이 들어갑니다.</p>
        </div>
        <div id="tab1_2" class="tab_content">
            <h3>두 번째 탭 내용</h3>
            <p>여기에 두 번째 탭의 내용이 들어갑니다.</p>
        </div>
        <div id="tab1_3" class="tab_content">
            <h3>세 번째 탭 내용</h3>
            <p>여기에 세 번째 탭의 내용이 들어갑니다.</p>
        </div>
    </div>
</div>

<h2>두 번째 탭 메뉴</h2>
<div class="tab_container">
    <ul class="tit_list">
        <li><a href="#tab2_1">공지사항</a></li>
        <li><a href="#tab2_2">FAQ</a></li>
        <li><a href="#tab2_3">문의하기</a></li>
    </ul>
    <div class="tab_content_list">
        <div id="tab2_1" class="tab_content">
            <h3>공지사항</h3>
            <p>최신 공지사항이 여기에 표시됩니다.</p>
        </div>
        <div id="tab2_2" class="tab_content">
            <h3>자주 묻는 질문</h3>
            <p>FAQ 내용이 여기에 표시됩니다.</p>
        </div>
        <div id="tab2_3" class="tab_content">
            <h3>문의하기</h3>
            <p>문의 양식이 여기에 표시됩니다.</p>
        </div>
    </div>
</div>
```

* **탭 메뉴 컨테이너**  
<span class="txt">
모든 탭 메뉴는 같은 'tab_container' 클래스를 사용합니다.  
이렇게 하면 페이지 내에 여러 개의 탭 메뉴를 독립적으로 배치할 수 있습니다.
</span>

* **탭 제목 목록**  
<span class="txt">
'tit_list' 클래스의 ul 요소 안에 각 탭의 제목을 a 태그로 넣습니다.  
각 a 태그의 href 속성이 보여줄 콘텐츠의 id와 연결됩니다.
</span>

* **탭 콘텐츠 영역**  
<span class="txt">
각 탭의 내용은 'tab_content' 클래스를 가진 div에 담겨 있고, 고유한 id를 갖습니다.  
탭을 클릭하면 해당 id의 콘텐츠만 화면에 나타납니다.
</span>

<br>

### 탭 ID의 중요성

모든 탭 메뉴가 같은 클래스를 사용하기 때문에 각 탭의 ID는 반드시 고유해야 합니다. 예를 들어, 첫 번째 탭 메뉴는 'tab1_1', 'tab1_2', 'tab1_3'을, 두 번째 탭 메뉴는 'tab2_1', 'tab2_2', 'tab2_3'처럼 설정합니다.

```html
<!-- 첫 번째 탭 메뉴의 링크와 콘텐츠 ID -->
<li><a href="#tab1_1">탭 1</a></li>
<div id="tab1_1" class="tab_content">...</div>

<!-- 두 번째 탭 메뉴의 링크와 콘텐츠 ID -->
<li><a href="#tab2_1">공지사항</a></li>
<div id="tab2_1" class="tab_content">...</div>
```

이렇게 ID를 명확하게 구분하면 여러 탭 메뉴가 서로 영향을 주지 않고 각각 독립적으로 작동합니다.

<br>

## CSS 스타일

```css
.tab_container { overflow: hidden; max-width: 800px; margin: 0 auto 3rem; background: #fff; border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); transition: all 0.3s ease; } 
.tab_container .tit_list { display: flex; background: #fff; border-bottom: 1px solid rgba(0, 0, 0, 0.06); } 
.tab_container .tit_list > li { flex: 1; list-style: none; } 
.tab_container .tit_list > li a { display: block; position: relative; padding: 16px 0; font-size: 1rem; font-weight: 500; color: #495057; text-align: center; text-decoration: none; transition: all 0.3s ease; } 
.tab_container .tit_list > li a:hover { color: #228be6; } 
.tab_container .tit_list > li.active a { background: #228be6; color: #fff; } 
.tab_container .tab_content { display: none; padding: 28px 24px; } 
```

* **탭 컨테이너 스타일**  
<span class="txt">
전체 탭 메뉴를 감싸는 컨테이너에 그림자와 둥근 테두리를 적용해 시각적으로 구분됩니다.  
최대 너비와 마진으로 화면 크기에 상관없이 보기 좋게 배치됩니다.
</span>

* **탭 제목 목록 스타일**  
<span class="txt">
flex 속성으로 탭 버튼들이 균등한 너비로 정렬됩니다.  
각 탭은 동일한 너비를 차지하며, 하단 테두리로 콘텐츠 영역과 구분됩니다.
</span>

* **탭 버튼 스타일**  
<span class="txt">
마우스를 올렸을 때 색상이 변하는 효과와 부드러운 전환 효과를 넣었습니다.  
현재 선택된 탭은 배경색과 글자색이 바뀌어 한눈에 알아볼 수 있습니다.
</span>

* **콘텐츠 영역 스타일**  
<span class="txt">
기본적으로 모든 탭 콘텐츠는 숨겨두고, 자바스크립트로 선택된 탭만 보이게 합니다.  
적당한 여백을 주어 내용이 답답해 보이지 않도록 했습니다.
</span>

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
// 탭 메뉴 초기화 및 기능 설정 함수
function initTab() {
    $('.tab_container').each(function() {
        // 필요한 요소들 선택
        const tabWrap = $(this);
        const tabTitItems = tabWrap.find(".tit_list > li");
        const tabTitLinks = tabWrap.find(".tit_list > li a");
        const tabContents = tabWrap.find(".tab_content");
        
        // 탭 활성화 함수: 선택된 탭을 활성화하고 해당 콘텐츠를 표시
        function activateTab(tabId) {
            tabTitItems.removeClass("active");  // 모든 탭 비활성화
            tabContents.hide();                 // 모든 콘텐츠 숨기기
            tabTitLinks.filter(`[href*="${tabId}"]`).parent().addClass("active");  // 선택된 탭 활성화
            tabContents.filter(tabId).show();   // 선택된 콘텐츠만 표시
        }
        
        // 탭 클릭 이벤트 핸들러
        tabTitLinks.on("click", function(e) {
            e.preventDefault();  // 기본 앵커 동작 방지
            const tabId = $(this).attr("href");  // 클릭된 탭의 href 속성 값 가져오기
            activateTab(tabId);  // 해당 탭 활성화
        });
        
        // 첫 번째 탭을 기본으로 활성화
        const firstTabId = tabTitLinks.eq(0).attr('href');
        activateTab(firstTabId);
    });
}

$(document).ready(function() {
    initTab();
});
```

* **탭 초기화 함수**  
<span class="txt">
각 탭 메뉴가 서로 독립적으로 작동하도록 each() 메서드를 사용했습니다.  
이렇게 하면 여러 탭 메뉴를 한 번의 함수 호출로 모두 처리할 수 있습니다.
</span>

* **요소 선택**  
<span class="txt">
각 탭 영역 안에서 필요한 요소들을 미리 변수에 담아두었습니다.  
이렇게 하면 DOM을 반복해서 검색하지 않아 성능이 좋아집니다.
</span>

* **탭 활성화 함수**  
<span class="txt">
activateTab 함수는 선택한 탭만 활성화하고 해당 콘텐츠를 보여줍니다.  
먼저 모든 탭과 콘텐츠를 숨긴 후, 선택한 것만 보여주는 방식입니다.
</span>

* **이벤트 핸들링**  
<span class="txt">
탭을 클릭할 때 페이지 이동을 막고 activateTab 함수를 호출합니다.  
클릭한 탭의 href 값을 이용해 어떤 내용을 보여줄지 결정합니다.
</span>

<br>

💡 **팁**: 복잡한 프로젝트에서는 탭 상태를 URL 해시나 로컬 스토리지에 저장하면 페이지를 새로 고쳐도 선택했던 탭을 유지할 수 있습니다.

<br>

## 결론

이 글에서는 jQuery로 하나의 클래스를 활용해 여러 탭 메뉴를 만드는 방법을 알아봤습니다. 이 방식의 가장 큰 장점은 코드 중복을 줄이고 관리가 쉬워진다는 점입니다. 또한 새 탭 메뉴가 필요할 때는 HTML 구조만 추가하면 자바스크립트 코드 수정 없이도 바로 작동합니다.

이 코드는 확장성이 좋아서 복잡한 프로젝트에서도 효율적으로 활용할 수 있습니다. 각 탭의 디자인과 기능을 더 다양하게 꾸미거나, 애니메이션을 추가해서 더 직관적인 탭 전환 효과와 시각적 피드백을 줄 수도 있습니다.

혹시 이 탭 메뉴 구현에 대해 궁금한 점이나 더 좋은 아이디어가 있으시면 댓글로 알려주세요! 

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-27-tab-menu/">예제결과 미리보기</a>
    <a href="/code/2023-07-05-tab-refresh//">[관련글] jQuery - 탭메뉴 새로고침 후 현재 탭 유지</a>
</div>
