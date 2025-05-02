---
title: jQuery - 탭메뉴 새로고침 후 현재 탭 유지
description: URL 파라미터를 활용한 새로고침 시에도 탭이 유지되는 코드 예제입니다.
slug: 2023-07-05-tab-refresh
date: 2023-07-05 00:00:00+0000
lastmod: 2023-07-05 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/tab-refresh.webp

categories:
    - jQuery
tags:
    - 탭 메뉴
---
탭 메뉴를 클릭하면 선택한 컨텐츠 요소의 아이디가 파라미터 값으로 URL 뒤에 추가되어, 페이지가 새로고침 되어도 선택한 탭을 유지할 수 있도록 구현했다.  
처음에는 해시태그 방식을 사용하였으나, 해시태그 값의 아이디를 가진 요소로 자동 이동하는 브라우저의 기본 동작으로 인해 스크롤 위치가 변경되는 문제가 발생했다.
이를 해결하기 위해 파라미터 방식으로 변경했다.

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
tit_list 클래스의 a 태그에 선택될 컨텐츠의 id 값을 추가했다.  

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

크게 3가지의 내부 함수로 정의되어 있다.  
<br>
activateTab() 함수는 선택한 탭 메뉴를 활성화시키고 해당 탭의 컨텐츠를 보여주는 기능을 담당한다.  
이 함수는 선택한 탭 메뉴의 id 값을 받아와서 해당 탭 메뉴를 활성화시킨다.  
또한, URL의 파라미터 변경 여부를 updateUrlParam 파라미터로 받아서 true로 전달되면, 해당 탭 메뉴의 id 값을 URL의 파라미터로 추가하여 URL을 업데이트한다.  
이렇게 구현함으로써, 탭 메뉴 클릭 이벤트 외에도 페이지 로드, 뒤로 가기, 앞으로 가기 이벤트에서도 URL 업데이트를 제어하여 의도하지 않은 페이지 이동 문제를 방지했다.  
<br>
setUrlParam() 함수는 URL의 파라미터 값을 변경하는 기능을 담당한다.  
[URLSearchParams()](https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams) 생성자 함수를 사용하여 URL의 문자열 객체를 생성하고, 전달받은 paramName 파라미터 값의 id 값을 URLSearchParams 객체의 set() 메소드를 사용하여 새로운 파라미터 값으로 설정했다.  
이후 [history.pushState()](https://developer.mozilla.org/ko/docs/Web/API/History/pushState) 메소드를 사용하여 URL의 파라미터를 변경했다.  
<br>
getUrlParam() 함수는 URL의 파라미터 값을 가져오는 기능을 담당한다.    
URLSearchParams() 생성자 함수를 사용하여 URL의 문자열 객체를 생성하고, get() 메소드를 통해 paramName 파라미터 값을 반환한다.  
<br>
함수 내부에서는 탭 메뉴를 클릭했을 때 activateTab() 함수를 실행한다.  
페이지 로드 시 getUrlParam() 함수를 호출하여 URL 파라미터 값을 가져오고, 해당 값이 있다면 activateTab() 함수를 실행하여 해당 탭 메뉴를 활성화시킨다.   
마지막으로, [popstate](https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event) 이벤트가 발생하면 getUrlParam() 함수를 호출하여 변경된 URL 파라미터 값을 가져온 후, 변경된 값이 있다면 activateTab() 함수를 실행하여 해당 탭 메뉴를 활성화시킨다.  

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-05-tab-refresh/tab-menu/" target="_blank">예제결과 미리보기</a>
</div>

<br>

## jQuery 코드 (일반 탭 메뉴)
```js
$(window).on('load', function() {
    tab();
})

function tab() {
    //탭메뉴 실행 함수
    function activateTab(tabId) {
        //초기화
        $(".tab_wrap .tit_list > li").removeClass("active");
        $(".tab_wrap .tab_list").hide();

        //실행
        $(`.tab_wrap .tit_list > li a[href*="${tabId}"]`).parent().addClass("active");
        $(tabId).show();
    }

    //탭메뉴 클릭할 때 실행
    $(".tab_wrap .tit_list > li a").on("click", function(e) {
        e.preventDefault();
        let tabId = $(this).attr("href");
        activateTab(tabId, true);
    });

    //페이지 로드 했을 때 탭메뉴 선택
    let firstTabId = $('.tab_wrap .tit_list > li:first-child a').attr('href');
    activateTab(firstTabId);
}
```
<br> 

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-05-tab-refresh/tab-refresh/">예제결과 미리보기 (일반 탭메뉴)</a>
</div>

