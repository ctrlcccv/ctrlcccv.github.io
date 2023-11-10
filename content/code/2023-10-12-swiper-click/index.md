---
title: jQuery - Swiper 스와이프메뉴 클릭하면 가운데오기
description: >  
    jQuery와 Swiper 라이브러리를 활용하여 탭 스와이프 메뉴를 구현하는 방법을 소개합니다. 메뉴 항목을 클릭하면 선택한 항목이 화면 중앙에 오도록 하며, 코드의 재사용성을 높이는 장점을 얻을 수 있습니다.
slug: 2023-10-12-swiper-click
date: 2023-10-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-12-swiper-click.webp

categories:
    - jQuery
tags:
    - Swiper.js
---

탭 스와이프 메뉴는 사용자에게 콘텐츠를 쉽게 탐색할 수 있는 기능 중 하나입니다.   
이 글에서는 jQuery와 Swiper 라이브러리를 활용하여, 탭 스와이프 메뉴를 클릭하면 선택한 메뉴 항목이 화면 가운데로 오도록 하는 방법을 소개하겠습니다. 더불어, 이 예제는 "tab_swiper" 클래스를 추가하면 이 기능을 다른 swiper 슬라이드에도 쉽게 적용할 수 있어, 재사용이 가능하다는 장점이 있습니다. 이러한 개발 패턴은 웹 개발자들에게 사용자 경험을 개선하고 코드를 효율적으로 관리할 수 있는 강력한 도구를 제공합니다.  
<br>

## HTML 구조
메뉴를 감싸는 클래스 menu_wrap 요소 안에 Swiper 컨테이너가 들어 있는 구조입니다.   
active 클래스를 추가하면 해당 항목이 가운데 정렬됩니다.
```html
<div class="menu_wrap">
    <div class="in_Layer tab_swiper">
        <ul class="menu swiper-wrapper">
            <li class="swiper-slide"><a href="#self">첫번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">두번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">세번째 메뉴</a></li>
            <li class="swiper-slide active"><a href="#self">네번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">다섯번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">여섯번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">일곱번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">여덟번째 메뉴</a></li>
        </ul>
    </div>
</div>
```

## CSS 스타일
메뉴와 스와이프 항목에 대한 CSS 스타일을 적용합니다.   
메뉴는 가운데 정렬되며 활성 항목은 다른 항목과 구별하기 위해 강조 스타일을 적용합니다.
```css
.menu_wrap {position: relative;max-width: 700px;margin: 30px auto 0;background: #c3e4fa;}
.menu_wrap .in_Layer {overflow: hidden;}
.menu {display: flex;align-items: center;}
.menu > li:last-child {padding-right: 0;}
.menu > li a {display: flex;align-items: center;position: relative;height: 65px;padding: 0 20px;font-size: 18px; font-weight: 500; letter-spacing:-0.025em; color: #000000;text-decoration: none;}
.menu > li.active a {color: #2762bb;}
.menu > li.active a:after {content:'';position: absolute;bottom: 0;left: 0;width: 100%;height: 2px;background: #2762bb;}
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
jQuery와 Swiper 라이브러리를 활용하여 탭 스와이프 메뉴를 구현합니다.
```js
$(window).on('load', function () {
    // 페이지가 로드되면 탭 스와이프 초기화 함수를 호출합니다.
    initTabSwipers();
});

function initTabSwipers() {
    $(".tab_swiper").each(function (index) {
        const $container = $(this);
        
        // 각 탭 스와이프 컨테이너에 클래스를 추가합니다.
        $container.addClass(`tab_swiper_${index}`);

        // Swiper 라이브러리를 사용하여 탭 스와이프를 초기화합니다.
        const swiper = new Swiper(`.tab_swiper_${index}`, {
            slidesPerView: "auto",
            preventClicks: true,
            preventClicksPropagation: false,
            observer: true, // 슬라이드 변경 관찰 활성화
            observeParents: true // 부모 요소의 변경도 관찰
        });

        // 탭 항목이 클릭 되면 실행할 함수를 연결합니다.
        $container.on('click', '.swiper-slide a', function (e) {
            e.preventDefault();
            const $item = $(this).parent();

            // 클릭 된 항목을 활성 상태로 표시하고 나머지 항목 비활성화
            $container.find('.swiper-slide').removeClass('active');
            $item.addClass('active');

            // 클릭한 항목을 가운데 정렬하는 함수 호출
            centerTabItem($item);
        });

        // 페이지 로드 후에 active 클래스가 있는 항목을 가운데 정렬
        const $activeItem = $container.find('.swiper-slide.active');
        if ($activeItem.length > 0) {
            centerTabItem($activeItem);
        }

        function centerTabItem($target) {
            const $wrapper = $container.find('.swiper-wrapper');
            const targetPos = $target.position();
            const containerWidth = $container.width();
            let newPosition = 0;
            let listWidth = 0;

            // 모든 슬라이드의 너비를 합산하여 리스트 전체 너비 계산
            $wrapper.find('.swiper-slide').each(function () {
                listWidth += $(this).outerWidth();
            });

            // 클릭한 항목을 가운데 정렬하기 위한 위치 계산
            const selectTargetPos = targetPos.left + $target.outerWidth() / 2;
            if (containerWidth < listWidth) {
                if (selectTargetPos <= containerWidth / 2) {
                    newPosition = 0; // 왼쪽
                } else if ((listWidth - selectTargetPos) <= containerWidth / 2) {
                    newPosition = listWidth - containerWidth; // 오른쪽
                } else {
                    newPosition = selectTargetPos - containerWidth / 2;
                }
            }

            // 슬라이드를 새 위치로 이동시키는 애니메이션 설정
            $wrapper.css({
                "transform": `translate3d(${-newPosition}px, 0, 0)`,
                "transition-duration": "500ms"
            });
        }
    });
}
```
* **각 탭 스와이프 컨테이너에 클래스 추가**  
  * tab_swiper 클래스를 가진 모든 요소를 선택하고 각 요소에 클래스를 동적으로 추가합니다. 이 클래스는 각 탭 스와이프 컨테이너를 식별하는 데 사용됩니다.  

* **Swiper 라이브러리를 사용하여 탭 스와이프 초기화**  
  * Swiper 라이브러리를 사용하여 각 탭 스와이프를 초기화합니다. 초기화할 때 슬라이드의 개수에 따라 자동으로 슬라이드 수를 조정하며, 슬라이드 변경 관찰을 활성화합니다.    

* **탭 항목 클릭 이벤트 처리**  
  * 탭 항목이 클릭 되면 실행할 함수를 연결합니다.
  * 클릭 된 항목을 활성 상태로 표시하고 나머지 항목을 비활성화합니다.
  * 클릭한 항목을 가운데 정렬하기 위해 centerTabItem 함수를 호출합니다.  

* **페이지 로드 후에 active 클래스가 있는 항목을 가운데 정렬**
  * 페이지가 로드된 후 .swiper-slide.active 요소를 찾아냅니다.
  * 만약 active 클래스가 있는 항목이 있다면, 해당 항목을 화면 중앙에 정렬합니다.  

* **탭 항목 가운데 정렬 (centerTabItem 함수)**
  * 클릭한 탭 항목을 화면 가운데 정렬하는 함수입니다.
  * 탭 스와이프 컨테이너 내부에서 필요한 요소들을 선택하고, 클릭한 항목과 슬라이드 리스트의 위치 정보를 가져옵니다.
  * 모든 슬라이드의 너비를 합산하여 리스트 전체 너비를 계산하고, 클릭한 항목을 화면 가운데 정렬하기 위한 새로운 슬라이드 위치를 계산합니다.
  * 슬라이드를 새 위치로 이동하는 애니메이션을 설정합니다.  
<br>


## 결론
이러한 방법을 통해 jQuery와 Swiper를 활용하여 스와이프 메뉴를 만들고 클릭할 때 선택한 항목을 화면 중앙에 정렬하는 방법을 알아보았습니다. 웹 개발자들은 이러한 개발 패턴을 통해 사용자 경험을 향상시키고, 코드를 효율적으로 관리하여 웹 애플리케이션을 보다 현대적이고 사용자 친화적으로 만들 수 있을 것입니다. 이 예제를 활용하여 다양한 웹 페이지에서 탭 스와이프 메뉴를 구현하고, 사용자에게 더 나은 웹 경험을 제공할 수 있습니다.  
<br>


<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-12-swiper-click/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-10-22-swiper-menu/">[관련글] jQuery - Swiper 메뉴 클릭 시 스크롤 이동, 활성화 메뉴 표시하기</a>
</div>
