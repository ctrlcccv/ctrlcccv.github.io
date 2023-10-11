---
title: jQuery - fullpage.js 대체하는 풀페이지 스크롤 예제 (반응형)
description: >  
    HTML, CSS, jQuery를 사용하여 풀페이지 스크롤을 구현하며, 메뉴 항목을 통한 섹션 이동, 반응형 웹 디자인, 고정 메뉴 바, 푸터 설정을 제공합니다.
slug: 2023-10-10-fullpage
date: 2023-10-10 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-10-fullpage.webp

categories:
    - jQuery
tags:
    - 스크롤 이벤트
---
풀페이지 스크롤은 웹 페이지를 한 화면에 하나의 섹션으로 표시하고, 스크롤 이벤트를 사용하여 사용자가 섹션 간을 자연스럽게 이동할 수 있도록 해주는 인기 있는 디자인 패턴 중 하나입니다. 이 패턴을 구현하기 위해 fullPage.js와 같은 라이브러리를 사용할 수 있지만, 이 글에서는 jQuery를 사용하여 fullPage.js를 대체하는 간단한 풀페이지 스크롤 예제를 소개하겠습니다.  
<br>

## 주요 기능
HTML, CSS, jQuery를 사용하여 제작되었으며, 다음과 같은 주요 기능을 제공합니다.

* **풀페이지 스크롤 (Full Page Scroll)** :   
웹 페이지를 여러 섹션으로 나누고 사용자가 스크롤 또는 터치 제스처를 사용하여 각 섹션 간을 자연스럽게 이동할 수 있는 풀페이지 스크롤을 구현합니다. 각 섹션은 화면 전체를 채우고 있으며, 스크롤을 사용하여 한 번에 한 섹션씩 스크롤 됩니다.  

* **메뉴 항목을 통한 섹션 이동** :   
웹 페이지 상단에 고정된 메뉴(네비게이션 메뉴)가 있으며, 사용자는 메뉴 항목을 클릭하여 특정 섹션으로 이동할 수 있습니다. 클릭 이벤트 핸들러를 사용하여 메뉴 항목을 클릭하면 해당 섹션으로 자동으로 스크롤 됩니다.  

* **마우스 휠 스크롤 지원** :   
사용자는 마우스 휠을 사용하여 페이지를 스크롤 할 수 있습니다. 마우스 휠을 아래로 굴리면 다음 섹션으로 스크롤 되고, 위로 굴리면 이전 섹션으로 스크롤 됩니다. 페이지의 끝에 도달하면 페이지의 마지막 부분(footer)으로 스크롤 됩니다.  

* **모바일 터치 스크롤 지원** :   
모바일 장치에서도 터치 제스처를 사용하여 페이지를 스크롤 할 수 있습니다. 사용자는 화면을 터치하여 위 또는 아래로 스크롤 할 수 있으며, 해당 동작에 따라 섹션 간의 이동이 가능합니다.  

* **반응형 웹 디자인** :   
웹 페이지는 반응형 디자인을 채택하고 있어 다양한 디바이스와 화면 크기에 대응합니다. 윈도우 크기에 따라 스크롤 이벤트의 활성화 여부를 동적으로 조절하여 사용자 경험을 최적화합니다.

* **고정 메뉴 바 (Fixed Navigation Menu)** :   
웹 페이지 상단에 고정된 메뉴 바(header)가 있어 사용자가 언제든지 메뉴 항목을 클릭하여 원하는 섹션으로 이동할 수 있습니다. 메뉴 항목을 클릭하면 해당 섹션으로 스크롤 되며, 현재 활성화된 메뉴 항목이 시각적으로 표시됩니다.  

* **푸터(Footer) 설정 지원** :  
푸터의 높이가 100vh가 아니더라도, 사용자가 페이지의 마지막 섹션까지 스크롤 하면 자동으로 푸터로 이동하여 내용을 확인할 수 있습니다.  

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

## HTML 구조
HTML은 메뉴, 섹션 및 푸터로 구성됩니다.
```html
<header>
    <ul class="menu">
        <li><a href="#sec1">첫번째 메뉴</a></li>
        <li><a href="#sec2">두번째 메뉴</a></li>
        <li><a href="#sec3">세번째 메뉴</a></li>
        <li><a href="#sec4">네번째 메뉴</a></li>
    </ul>
</header>
<section class="section" id="sec1"></section>
<section class="section" id="sec2"></section>
<section class="section" id="sec3"></section>
<section class="section" id="sec4"></section>
<footer></footer>
```

## CSS 스타일
CSS 스타일은 페이지의 레이아웃 및 디자인을 정의합니다. 주요 스타일 포인트는 다음과 같습니다.  

* **상단 메뉴** : header 요소는 상단에 고정되며, 메뉴 항목은 수평 중앙 정렬됩니다.
* **섹션 스타일** : 각 섹션에는 고유한 배경색이 지정되어 있으며, 높이는 화면 크기에 맞게 조절됩니다.
```css
body {padding-top: 70px;}
header {position: fixed;top: 0;left: 0;width: 100%;background: #000;z-index: 1;}
.menu {display: flex;justify-content: center;}
.menu > li {list-style: none;}
.menu > li a {display: flex;align-items: center;height: 70px;padding: 0 15px;font-size: 16px;color: #fff;text-decoration: none;}
.menu > li.active a {color: #fff000;}
.section {height: calc(100vh - 70px);}
#sec1 {background: #FFC0CB;}
#sec2 {background: #FFE4E1;}
#sec3 {background: #FFF6D3;}
#sec4 {background: #AEEEEE;}
footer {height: 300px;background: #000;}

@media (max-width: 600px) {
    body { padding-top: 50px; }
    .menu > li a {font-size: 14px;height: 50px;padding: 0 10px;}
    .section {height: calc(100vh - 50px);}
}
```

## jQuery 전체 코드
```js
$(window).on('load', function () {
    fullPage();
});

function fullPage() {
    let currentSection = 0;
    const $sections = $('.section'); // 모든 섹션 요소
    const $menu =  $('.menu > li'); // 메뉴 항목
    const $footer = $('footer'); // 페이지 하단 영역
    let menuHeight = $('header').height(); // 상단 메뉴 높이
    let isScrolling = false; // 스크롤 중 여부를 나타내는 플래그
    let isWindowSizeValid = false; // 윈도우 크기 유효 여부를 나타내는 플래그
    const numSections = $sections.length; // 섹션의 개수

    //메뉴 클릭 이벤트 핸들러
    function clickHandler(e, targetSectionIndex) {
        e.preventDefault();
        const offset = $sections.eq(targetSectionIndex).offset().top;
        currentSection = targetSectionIndex;
        // 해당 섹션으로 스크롤 이동
        $('html,body').animate({ scrollTop: offset - menuHeight }, 500);
    }

    // 섹션 스크롤 함수
    function scrollToSection(sectionIndex) {
        const targetPosition = sectionIndex === numSections ? $footer.offset().top : $sections.eq(sectionIndex).offset().top;
        //특정 섹션으로 스크롤 이동
        $('html, body').animate({
            scrollTop: targetPosition - menuHeight
        }, 500, function () {
            isScrolling = false;
        });
    }
    
    // 윈도우 크기 확인 함수
    function checkWindowSize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        isWindowSizeValid = windowWidth > 767 && windowHeight > 700;
        menuHeight = $('header').height();
    }

    // 초기 윈도우 크기 확인
    checkWindowSize();

    // 윈도우 크기 변경 시 윈도우 크기 확인
    $(window).on('resize', checkWindowSize);

    // 스크롤 이벤트 핸들러
    function handleScroll(e) {
        if (!isWindowSizeValid || isScrolling) return;
        isScrolling = true;

        // 스크롤 방향에 따라 섹션 인덱스 변경
        if (e.originalEvent.deltaY < 0 && currentSection > 0) {
            currentSection--;
        } else if (e.originalEvent.deltaY > 0 && currentSection < numSections - 1) {
            currentSection++;
        } else if (e.originalEvent.deltaY > 0 && $footer.offset().top - $(window).scrollTop() <= window.innerHeight) {
            currentSection = numSections;
        }
        scrollToSection(currentSection);
    }

    // 메뉴 클릭 이벤트 핸들러
    $menu.children('a').on('click', function (e) {
        const targetSectionIndex = $sections.index($($(this).attr('href')));
        clickHandler(e, targetSectionIndex);
    });

    // 마우스 휠 이벤트 핸들러
    $(window).on('wheel', handleScroll);

    // 터치 이벤트 핸들러
    let touchStartY = 0;
    $(window).on('touchstart', function (e) {
        if (!isWindowSizeValid || isScrolling) return;
        touchStartY = e.originalEvent.touches[0].clientY;
    });

    $(window).on('touchmove', function (e) {
        if (!isWindowSizeValid || isScrolling) return;
        const currentY = e.originalEvent.touches[0].clientY;
        const deltaY = currentY - touchStartY;

        // 터치 방향에 따라 섹션 인덱스 변경
        if (deltaY < 0 && currentSection < numSections) {
            currentSection++;
        } else if (deltaY > 0 && $footer.offset().top - $(window).scrollTop() <= window.innerHeight) {
            currentSection--;
        } else if (deltaY > 0 && currentSection > 0) {
            currentSection--;
        }
        scrollToSection(currentSection);
        isScrolling = true;
    });

    $(window).on('touchend', function () {
        if (!isWindowSizeValid) return;
        isScrolling = false;
    });

    // 스크롤 이벤트 핸들러를 통해 활성 메뉴 업데이트
    $(window).scroll(function(){
        let scltop = $(window).scrollTop() + menuHeight;
        $.each($sections, function(idx, item){
            let targetTop = $(this).offset().top;
            if (targetTop <= scltop) {
                $menu.removeClass('active');
                $menu.eq(idx).addClass('active');
            }
        })
        if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
            $menu.last().addClass('active').siblings().removeClass('active');
        }
    }).scroll();
}
```
아래에서 기능별로 설명해 드리겠습니다.   

### 변수 선언
```js
let currentSection = 0;
const $sections = $('.section'); // 모든 섹션 요소
const $menu =  $('.menu > li'); // 메뉴 항목
const $footer = $('footer'); // 페이지 하단 영역
let menuHeight = $('header').height(); // 상단 메뉴 높이
let isScrolling = false; // 스크롤 중 여부를 나타내는 플래그
let isWindowSizeValid = false; // 윈도우 크기 유효 여부를 나타내는 플래그
const numSections = $sections.length; // 섹션의 개수
```

* 코드 내에서 사용되는 다양한 변수를 선언하여 프로그램의 상태 및 동작을 관리합니다.  
* **currentSection** : 현재 활성화된 섹션의 인덱스를 저장하는 변수로, 사용자가 현재 어떤 섹션을 보고 있는지 추적합니다.
* **$sections** : jQuery 객체로 모든 섹션 요소를 선택하는 변수로, 각 섹션에 대한 조작을 용이하게 하기 위해 사용됩니다.
* **$menu** : jQuery 객체로 페이지 상단의 메뉴 항목을 선택하는 변수로, 사용자가 네비게이션 메뉴를 통해 섹션을 선택할 때 활용됩니다.
* **$footer** : jQuery 객체로 페이지 하단 영역을 선택하는 변수로, 페이지의 맨 아래의 부분을 관리하는 데 사용됩니다.
* **menuHeight** : 상단 메뉴의 높이를 저장하는 변수로, 섹션 간 스크롤 시 메뉴와 겹치는 부분을 조정하기 위해 활용됩니다.
* **isScrolling** : 스크롤 중 여부를 나타내는 플래그 변수로, 스크롤 중일 때 중복 스크롤 이벤트를 방지합니다.
* **isWindowSizeValid** : 현재 윈도우 크기가 유효한지를 나타내는 플래그 변수로, 윈도우 크기가 일정 조건을 충족하는지를 확인하여 스크롤 이벤트를 활성화 또는 비활성화합니다.
* **numSections** : 전체 섹션의 개수를 저장하는 변수로, 페이지에 있는 섹션의 총 개수를 나타냅니다. 이를 통해 섹션을 순환하고 관리할 때 사용됩니다.  

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

### 메뉴 클릭 이벤트 핸들러
```js
//메뉴 클릭 이벤트 핸들러
function clickHandler(e, targetSectionIndex) {
    e.preventDefault();
    const offset = $sections.eq(targetSectionIndex).offset().top;
    currentSection = targetSectionIndex;
    // 해당 섹션으로 스크롤 이동
    $('html,body').animate({ scrollTop: offset - menuHeight }, 500);
}
```
* 사용자가 네비게이션 메뉴 항목을 클릭하면 해당 메뉴 항목에 대한 클릭 이벤트가 발생합니다.
* 핸들러 함수 내부에서는 클릭 된 메뉴 항목이 어떤 섹션과 연결되어 있는지를 파악합니다.
* 해당 메뉴 항목과 연결된 섹션의 인덱스를 가져와서, 이 인덱스를 이용하여 스크롤 애니메이션을 통해 해당 섹션으로 이동합니다.
* 스크롤 애니메이션을 사용하여 부드럽게 페이지를 스크롤하고, 메뉴 항목 클릭으로 인한 섹션 변경을 시각적으로 반영합니다.  
<br> 

### 섹션 스크롤 함수
```js
// 섹션 스크롤 함수
function scrollToSection(sectionIndex) {
    const targetPosition = sectionIndex === numSections ? $footer.offset().top : $sections.eq(sectionIndex).offset().top;
    //특정 섹션으로 스크롤 이동
    $('html, body').animate({
        scrollTop: targetPosition - menuHeight
    }, 500, function () {
        isScrolling = false;
    });
}
```   

* 특정 섹션으로 스크롤 하는 역할을 합니다.
* sectionIndex라는 매개변수를 받아서 어떤 섹션으로 스크롤 할지를 결정합니다.
* sectionIndex 값에 따라 목표 스크롤 위치(targetPosition)를 계산합니다.
* 스크롤 애니메이션을 사용하여 페이지를 부드럽게 해당 위치로 스크롤 합니다.
* 애니메이션 완료 후에는 isScrolling 플래그를 false로 설정하여 추가 스크롤 동작을 허용합니다. 이렇게 함으로써 사용자가 스크롤 애니메이션 진행 중에 중복 스크롤을 하지 못하도록 합니다.  
<br>

### 윈도우 크기 확인 함수  
```js
// 윈도우 크기 확인 함수
function checkWindowSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    isWindowSizeValid = windowWidth > 767 && windowHeight > 700;
    menuHeight = $('header').height();
}
```
* 현재 윈도우의 너비와 높이를 확인하고, isWindowSizeValid 플래그를 업데이트합니다.
* isWindowSizeValid 플래그가 true일때만 스크롤 이벤트가 활성화됩니다.
* 현재 메뉴의 높이를 확인하고 업데이트합니다.  
<br>

### 스크롤 이벤트 핸들러
```js
// 스크롤 이벤트 핸들러
function handleScroll(e) {
    if (!isWindowSizeValid || isScrolling) return;
    isScrolling = true;

    // 스크롤 방향에 따라 섹션 인덱스 변경
    if (e.originalEvent.deltaY < 0 && currentSection > 0) {
        currentSection--;
    } else if (e.originalEvent.deltaY > 0 && currentSection < numSections - 1) {
        currentSection++;
    } else if (e.originalEvent.deltaY > 0 && $footer.offset().top - $(window).scrollTop() <= window.innerHeight) {
        currentSection = numSections;
    }
    scrollToSection(currentSection);
}
```
* 사용자의 마우스 휠 동작을 감지하여, 마우스 휠을 위로 스크롤 하면 페이지의 섹션을 이전으로, 아래로 스크롤 하면 페이지의 섹션을 다음으로 전환합니다.
* 스크롤 방향에 따라 현재 활성화된 섹션(currentSection)의 인덱스를 변경합니다.
* 스크롤 중인지 여부를 나타내는 isScrolling 플래그를 사용하여 중복 스크롤 이벤트를 방지합니다.  
<br>

### 터치 이벤트 핸들러
```js
// 터치 이벤트 핸들러
let touchStartY = 0;
$(window).on('touchstart', function (e) {
    if (!isWindowSizeValid || isScrolling) return;
    touchStartY = e.originalEvent.touches[0].clientY;
});

$(window).on('touchmove', function (e) {
    if (!isWindowSizeValid || isScrolling) return;
    const currentY = e.originalEvent.touches[0].clientY;
    const deltaY = currentY - touchStartY;

    // 터치 방향에 따라 섹션 인덱스 변경
    if (deltaY < 0 && currentSection < numSections) {
        currentSection++;
    } else if (deltaY > 0 && $footer.offset().top - $(window).scrollTop() <= window.innerHeight) {
        currentSection--;
    } else if (deltaY > 0 && currentSection > 0) {
        currentSection--;
    }
    scrollToSection(currentSection);
    isScrolling = true;
});

$(window).on('touchend', function () {
    if (!isWindowSizeValid) return;
    isScrolling = false;
});
```
* 모바일 디바이스에서 발생하는 터치 이벤트에 응답하여 페이지의 섹션을 전환하는 함수입니다.
* 터치 이벤트의 방향에 따라 현재 활성화된 섹션(currentSection)의 인덱스를 변경합니다.
* 스크롤 중인지 여부를 나타내는 isScrolling 플래그를 사용하여 중복 스크롤 이벤트를 방지합니다.  
<br>

### 활성 메뉴 업데이트
```js
// 스크롤 이벤트 핸들러를 통해 활성 메뉴 업데이트
$(window).scroll(function(){
    let scltop = $(window).scrollTop() + menuHeight;
    $.each($sections, function(idx, item){
        let targetTop = $(this).offset().top;
        if (targetTop <= scltop) {
            $menu.removeClass('active');
            $menu.eq(idx).addClass('active');
        }
    })
    if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
        $menu.last().addClass('active').siblings().removeClass('active');
    }
}).scroll();
```
* 스크롤 이벤트를 감지하여 위치(scrollTop)를 기준으로 현재 화면에 보이는 섹션을 판별하고, 해당 섹션과 연결된 메뉴 항목을 활성화합니다. 이를 통해 사용자는 어떤 섹션에 있는지 시각적으로 확인할 수 있습니다.
* 페이지를 맨 아래로 스크롤 하면, 마지막 메뉴 항목이 활성화됩니다. 사용자가 페이지의 맨 아래로 이동했음을 나타내며, 추가적인 섹션이 없음을 시각적으로 알립니다.  
<br>

## 결론
jQuery를 사용하여 간단한 풀페이지 스크롤 예제를 소개했습니다. 이 예제를 통해 fullPage.js와 같은 라이브러리를 사용하지 않고도 풀페이지 스크롤을 구현하는 방법을 이해할 수 있습니다. 이를 통해 웹 페이지의 사용자 경험을 향상시킬 수 있으며, 반응형 디자인을 통해 모바일 및 데스크톱 환경에서 모두 잘 작동합니다. 이러한 풀페이지 스크롤 패턴은 웹 디자인 프로젝트에 활용할 수 있는 유용한 기술 중 하나입니다.