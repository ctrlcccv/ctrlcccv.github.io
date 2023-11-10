---
title: jQuery - 스크롤 시 특정 위치에서 Fixed (반응형)
description: >  
    CSS의 position: sticky 속성을 대신하여 특정 위치에서만 fixed로 동작하는 제이쿼리 코드 예제입니다.
slug: 2023-07-28-scroll-fixed
date: 2023-07-28 00:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-progress.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
스크롤 시 header 와 footer 영역을 제외하고 특정 위치에서만 position: fixed 효과를 주는 스크립트를 만들었다.  
비슷한 효과로는 position: sticky 속성이 있지만, 작업하다 보면 제약이 생겨 사용하지 못할 때가 있다.   

## HTML 구조
```html
<div class="wrap">
    <header></header>
    <section>
        <div class="fixed_menu"></div>
    </section>
    <footer></footer>
</div>
```
&lt;section&gt; 태그 영역 안에서만 fixed_menu 클래스가 fixed 된다.  

## CSS 스타일
```css
body {padding: 0;margin: 0;}
header {height:200px;background: #000;margin-bottom: 15px;}
footer {height:300px;background: #000;}
section {position: relative;height: 1200px;}
.fixed_menu {position: absolute;top: 0;right: 15px;width: 200px;height:700px;background: #8ab4f8; }

@media(max-width:1180px){
    header {height:100px;}
    footer {height:100px;}
    .fixed_menu {height:400px;}
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

## jQuery 코드
```js
$(window).on('load', function() {
    scrollAct();
})

//스크롤 시 fixed
function scrollAct() {
    let $fixedMenu = $('.fixed_menu'); //fixed 컨텐츠 영역
    let fixedMenuTop = $fixedMenu.offset().top; //fixed 컨텐츠 영역 위치
    let fixedMenHeight = $fixedMenu.outerHeight(true); //fixed 컨텐츠 영역 높이
    let footerTop = $('footer').offset().top; //footer 위치
    let oldWChk = window.innerWidth > 1180 ? 'pc' : 'mo'; //디바이스 체크

    //스크롤 위치 갱신
    function updatePaymentFixed() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > fixedMenuTop - 15 && scrollTop < (footerTop - fixedMenHeight - 30)) { //스크롤 영역 도달했을 때, footer 영역 제외
            $fixedMenu.css({
                'top': scrollTop - fixedMenuTop + 15
            });
        } else if (scrollTop < fixedMenuTop - 30) { //스크롤 영역 이전일 때
            $fixedMenu.css({
                'top': 0
            });
        }
    }

    //스크롤 위치 갱신 함수 호출
    $(window).on('scroll', updatePaymentFixed);

    //리사이즈 했을 때 변수값 갱신 (반응형일 시 추가)
    $(window).on('resize', function() {
        let newWChk = window.innerWidth > 1180 ? 'pc' : 'mo';
        if (newWChk !== oldWChk) {
            oldWChk = newWChk;
            fixedMenuTop = $fixedMenu.css({
                'top': 0
            }).offset().top;
            fixedMenHeight = $fixedMenu.outerHeight(true);
            footerTop = $('footer').offset().top;
        }
    });
}
```
.fixed_menu 영역에 대한 초기 변수들을 설정한다.  
스크롤 이벤트가 발생할 때 updatePaymentFixed() 함수가 호출되어 스크롤 위치에 따라 .fixed_menu 요소의 위치를 조정한다.  
브라우저 창의 크기가 변경될 때 새로운 윈도우 너비값을 확인하고 이전과 다를 경우, .fixed_menu 요소와 footer의 위치를 새로 설정한다. 구체적인 설명은 다음과 같다.  

* $fixedMenu :   
스크롤 시 고정될 컨텐츠 영역이다.

* fixedMenuTop :   
$fixedMenu 요소의 위치를 저장한다.

* fixedMenHeight :   
$fixedMenu 요소의 높이를 저장한다.

* footerTop :   
footer 요소의 위치를 저장한다. 이 변수를 이용하여 스크롤이 footer까지 가지 않도록 조건을 설정한다.

* oldWChk :   
이전에 확인한 디바이스 종류 (pc 또는 mo)를 저장한다. (반응형일 시 추가)

* updatePaymentFixed() :    
스크롤 위치를 갱신하는 함수로, 스크롤 이벤트가 발생할 때 호출된다. 스크롤 위치에 따라 .fixed_menu 요소의 위치를 조정한다. 

* scrollTop > fixedMenuTop - 15 :    
스크롤이 .fixed_menu 요소의 상단 위치에서 15px만큼 덜 아래로 내려갔을 때를 의미한다. 이 조건이 참일 경우 .fixed_menu 요소를 고정 상태로 유지한다.  

* scrollTop < (footerTop - fixedMenHeight - 30) :    
스크롤이 footer의 위에 있을 때를 의미한다. footer까지 스크롤이 가지 않도록, .fixed_menu 요소를 footer 아래에서 30px 떨어진 위치까지만 고정 상태로 유지한다.  

* scrollTop < fixedMenuTop - 30 :   
스크롤이 .fixed_menu 요소의 상단보다 더 위에 있을 때를 의미한다. 이 조건이 참일 경우, .fixed_menu 요소를 페이지 상단에 고정시킨다.  

* $(window).on('scroll', updatePaymentFixed) :  
스크롤 이벤트가 발생하면 updatePaymentFixed() 함수를 호출한다.  


여기서부터는 반응형 사이트일 때만 추가하면 된다.   

* let newWChk = window.innerWidth > 1180 ? 'pc' : 'mo' :  
새로운 윈도우 너비 값을 확인하고, 1180px보다 크면 'pc', 그렇지 않으면 'mo'로 설정한다.  

* if (newWChk !== oldWChk) { ... } :  
새로운 디바이스 종류가 이전과 다를 경우, 아래 코드를 실행한다.  

* fixedMenuTop = $fixedMenu.css({'top': 0}).offset().top :  
.fixed_menu 요소의 위치를 초기화한다.  

* fixedMenHeight = $fixedMenu.outerHeight(true) :  
.fixed_menu 요소의 높이를 초기화한다.  

* footerTop = $('footer').offset().top :  
footer 요소의 위치를 초기화한다.   
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-28-scroll-fixed/">예제결과 미리보기</a>
</div>
