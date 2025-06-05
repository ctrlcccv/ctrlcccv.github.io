---
title: jQuery - 탭메뉴 새로고침 후 현재 탭 유지
description: jQuery를 활용하여 새로고침해도 사용자가 마지막으로 선택한 탭이 그대로 유지되는 탭메뉴를 구현하는 방법을 소개합니다. URL 파라미터를 활용한 상태 관리 기법을 배워보세요.
slug: 2023-07-05-tab-refresh
date: 2023-07-05 00:00:00+0000
lastmod: 2025-05-15 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/tab-refresh.webp

categories:
    - jQuery
tags:
    - 탭 메뉴
---
웹사이트에서 탭메뉴를 이용하다가 새로고침을 했을 때 첫 번째 탭으로 돌아가 버려서 불편했던 적 있으신가요?

탭메뉴는 좁은 공간에 많은 내용을 담을 수 있어 웹사이트에서 자주 사용하는 UI 요소입니다. 하지만 기본 탭메뉴는 페이지를 새로고침하면 항상 첫 번째 탭으로 돌아가는 문제점이 있죠. 특히 내용이 많은 탭을 보다가 새로고침이 되면, 사용자는 다시 원하는 탭을 찾아 클릭해야 하는 번거로움을 겪게 됩니다. 이 글에서는 URL 파라미터를 활용해 새로고침 후에도 사용자가 마지막으로 봤던 탭을 그대로 유지하는 방법을 알아보겠습니다.

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
<div class="tab_wrap">
    <!-- 탭메뉴 제목 -->
    <ul class="tit_list">
        <li><a href="#con01">1번째 탭</a></li>
        <li><a href="#con02">2번째 탭</a></li>
        <li><a href="#con03">3번째 탭</a></li>
    </ul>
    <!-- 탭메뉴 컨텐츠 -->
    <div class="tab_con">
        <div id="con01" class="tab_list">
            1번째 컨텐츠
        </div>
            
        <div id="con02" class="tab_list">
            2번째 컨텐츠
        </div>

        <div id="con03" class="tab_list">
            3번째 컨텐츠
        </div>
    </div>
</div>
```
* **탭메뉴 제목 영역**  
<span class="txt">
탭 제목을 담은 ul 요소로, 각 탭은 li 안에 a 태그로 구성했습니다.
각 a 태그의 href는 연결된 콘텐츠의 id를 가리키는 앵커 링크로 작성했습니다.
</span>

* **탭메뉴 콘텐츠 영역**  
<span class="txt">
각 탭에 해당하는 내용을 담고 있는 영역입니다.
각 콘텐츠는 고유한 id를 가지고 있어 탭 제목의 href와 연결됩니다.
</span>

<br>

## CSS 스타일

```css
* {margin: 0;padding: 0;font-family: 'Noto Sans KR', sans-serif;box-sizing: border-box;}
ul, li {list-style: none;}
.tab_wrap {max-width: 800px;margin: 50px auto;padding: 0 15px;}
.tab_wrap .tit_list {position: relative;font-size: 0;}
.tab_wrap .tit_list:before {content:'';position: absolute;bottom: 0;left: 0;width: 100%;height: 1px;background: #ddd;z-index: 1;}
.tab_wrap .tit_list > li {display: inline-block;vertical-align: top;margin-right: 3px;}
.tab_wrap .tit_list > li a {display: inline-block;padding: 10px 15px;border: 1px solid #fff;border-radius:4px 4px 0 0;font-size: 14px;color: #000;text-decoration: none;}
.tab_wrap .tit_list > li a:hover {background: #efefef;border-color: #efefef;}
.tab_wrap .tit_list > li.active a {position: relative;border-color: #ddd;border-bottom: 1px solid #fff;background: #fff;color: #8ab4f8;z-index: 2;}
.tab_wrap .tab_con {border: 1px solid #ddd;border-top: none;}
.tab_wrap .tab_con .tab_list {display: none;height: 200px;padding: 15px;}
```

* **기본 초기화 및 레이아웃**  
<span class="txt">
기본 마진과 패딩을 초기화하고, 폰트와 박스 사이징을 설정했습니다.
탭 전체를 감싸는 .tab_wrap은 중앙 정렬과 최대 너비를 지정해 반응형으로 동작합니다.
</span>

* **탭 제목 스타일링**  
<span class="txt">
탭 제목 목록은 상대 위치로 설정하고, 하단에 구분선을 넣었습니다.
각 탭 제목은 인라인 블록으로 배치해 가로로 나열되도록 했습니다.
</span>

* **활성화된 탭 스타일**  
<span class="txt">
활성화된 탭(.active)은 하단 테두리가 흰색이 되어 콘텐츠 영역과 자연스럽게 이어지고, 글자색은 파란색으로 바뀝니다.
z-index를 사용해 활성화된 탭이 하단 구분선 위에 표시되도록 했습니다.
</span>

* **탭 콘텐츠 영역**  
<span class="txt">
탭 콘텐츠는 기본적으로 숨겨두고(display: none), 활성화될 때만 보이게 했습니다.
고정된 높이와 내부 여백으로 콘텐츠를 보기 좋게 배치했습니다.
</span>

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

## jQuery 코드

```js
$(window).on('load', function() {
    tab();
})

function tab() {
    //탭 구분 파라미터 이름
    const paramName = 'tabName';

    //탭메뉴 실행 함수
    function activateTab(tabId, updateUrlParam) {
        //tabId 값이 first 일 때 첫번째 탭 선택
        tabId = tabId === 'first' ? $('.tab_wrap .tit_list > li:first-child a').attr('href') : tabId;

        //초기화
        $(".tab_wrap .tit_list > li").removeClass("active");
        $(".tab_wrap .tab_list").hide();

        //실행
        $(`.tab_wrap .tit_list > li a[href*="${tabId}"]`).parent().addClass("active");
        $(tabId).show();

        //탭메뉴 클릭할 때 url 파라미터 변경
        if (updateUrlParam) {
            setUrlParam(tabId);
        }
    }

    //파라미터 값 변경 함수
    function setUrlParam(tabId) {
        const params = new URLSearchParams(location.search);
        params.set(paramName, tabId.slice(1));
        history.pushState(null, null, `${location.origin}${location.pathname}?${params.toString()}`);
    }

    //파라미터 확인 함수
    function getUrlParam() {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get(paramName);
    }

    //파라미터 값 확인
    const tabName = getUrlParam();

    //탭메뉴 클릭할 때 실행
    $(".tab_wrap .tit_list > li a").on("click", function(e) {
        e.preventDefault();
        let tabId = $(this).attr("href");
        activateTab(tabId, true);
    });

    //페이지 로드 했을 때 탭메뉴 선택
    if (tabName) {
        const tabTop = $('.tab_wrap').offset().top;
        requestAnimationFrame(function() {
            $('html, body').scrollTop(tabTop - 100);
        });
        activateTab(`#${tabName}`);
    } else {
        activateTab('first');
    }

    //뒤로가기, 앞으로가기 버튼 눌렀을 때 탭메뉴 활성화 복원
    $(window).on('popstate', function() {
        const newTabName = getUrlParam();
        activateTab(newTabName ? `#${newTabName}` : 'first');
    });
}
```

* **초기 설정**  
<span class="txt">
페이지 로딩이 끝나면 tab() 함수를 실행해 탭메뉴를 초기화합니다.
URL 파라미터 이름으로는 'tabName'을 사용합니다.
</span>

* **탭 활성화 함수**  
<span class="txt">
activateTab() 함수는 선택한 탭을 활성화하는 핵심 기능을 담당합니다.
tabId가 'first'면 첫 번째 탭을 자동 선택합니다.
기존에 활성화된 탭을 초기화하고 새로 선택된 탭과 콘텐츠를 보여줍니다.
updateUrlParam이 true면 URL 주소도 함께 업데이트합니다.
</span>

* **URL 파라미터 관리 함수**  
<span class="txt">
setUrlParam() 함수는 현재 선택된 탭 ID를 URL 주소에 기록합니다.
getUrlParam() 함수는 URL에서 탭 파라미터 값을 가져옵니다.
URLSearchParams API로 파라미터를 간편하게 관리합니다.
</span>

* **이벤트 처리**  
<span class="txt">
탭 클릭 시 기본 앵커 동작을 막고(e.preventDefault()), 대신 activateTab() 함수를 호출합니다.
페이지 로드 시 URL 파라미터를 확인해서 해당 탭을 활성화합니다.
파라미터가 없으면 첫 번째 탭을 기본값으로 보여줍니다.
</span>

* **브라우저 네비게이션 지원**  
<span class="txt">
popstate 이벤트를 감지하여 브라우저의 뒤로가기, 앞으로가기 버튼을 눌렀을 때도 올바른 탭이 표시되도록 합니다.
이 기능 덕분에 사용자가 브라우저의 이동 버튼을 눌러도 이전에 보던 탭이 그대로 유지됩니다. 페이지 이동 후에도 정보를 다시 찾는 번거로움 없이 일관된 화면을 볼 수 있어 훨씬 편리합니다.
</span>

* **스크롤 위치 조정**  
<span class="txt">
파라미터로 특정 탭을 열 때는 requestAnimationFrame을 사용해 해당 탭메뉴 위치로 화면을 자동 스크롤합니다.
이렇게 하면 긴 페이지에서도 탭메뉴를 바로 볼 수 있습니다.
</span>
  
<br>

## 결론

이번 글에서는 jQuery로 새로고침 후에도 선택한 탭이 유지되는 탭메뉴를 만드는 방법을 알아보았습니다. URL 파라미터를 활용하면 페이지를 새로고침하거나 브라우저의 뒤로가기/앞으로가기 버튼을 눌러도 선택한 탭이 그대로 유지됩니다. 덕분에 사용자는 페이지를 오가며 탐색할 때도 원하는 정보를 쉽게 다시 찾을 수 있고, 일관된 화면을 경험할 수 있습니다.

이 글이 도움이 되셨나요? 탭메뉴를 구현하면서 겪은 다른 문제나 개선 아이디어가 있으시면 댓글로 공유해주세요!

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-05-tab-refresh/tab-menu/">예제결과 미리보기</a>
</div>

