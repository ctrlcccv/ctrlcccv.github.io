---
title: jQuery - 탭메뉴 안에 Swiper 슬라이드 넣기
description: >  
    Swiper.js의 observer: true, observeParents: true 옵션을 활용하여 탭 메뉴와 함께 구현할 때 발생하는 오류를 해결하는 코드 예제입니다.
slug: 2023-07-19-swiper-tab
date: 2023-07-19 00:00:00+0000
lastmod: 2023-07-19 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-07-19-swiper-tab.webp

categories:
    - jQuery
tags:
    - Swiper.js 
    - 탭 메뉴
---
<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/code/2023-02-03-swiper-multiple/">[참고코드] jQuery - Swiper 같은 클래스로 여러 개 사용하기 (반응형)</a>
    <a target="_blank" href="https://ctrlcccv.github.io/code/2023-07-05-tab-refresh/#jquery-코드-일반-탭-메뉴">[참고코드] jQuery - 탭메뉴 새로고침 후 현재 탭 유지</a>
</div>

참고 코드를 사용하여 탭메뉴 안에 Swiper 슬라이드가 있는 레이아웃을 만들었다.  
탭메뉴를 실행할 때 이전에 노출되지 않았던 슬라이드가 제대로 작동하지 않는 문제가 발생하는데, [observer](https://swiperjs.com/swiper-api#param-observer)와 [observeParents](https://swiperjs.com/swiper-api#param-observeParents) 옵션을 사용하여 해결할 수 있다.
이 옵션은 Swiper의 상위 요소와 하위 요소를 감지하고 초기화해준다.  
<br>
탭 메뉴를 눌렀을 때 슬라이드 초기화는 정상적으로 작동했지만, 화면을 리사이즈할 때 슬라이드의 realIndex 값이 제대로 갱신되지 않는 문제가 발생했다.  
이전에 선택한 탭 메뉴의 슬라이드를 유지하기 위해 변수에 저장한 realIndex 값을 initialSlide 옵션에 넣어 현재 보고 있던 슬라이드로 이동하는데, 이로 인해 활성화되지 않은 탭 메뉴의 슬라이드에도 영향을 끼쳤다. 이 문제를 해결하기 위해 활성화된 탭 메뉴의 슬라이드의 realIndex 값만 업데이트하는 방식으로 변경했다.

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
        <!-- 디폴트 선택 li에 active 클래스 추가 -->
        <li class="active"><a href="#con01">1번째 탭</a></li>
        <li><a href="#con02">2번째 탭</a></li>
        <li><a href="#con03">3번째 탭</a></li>
    </ul>
    <!-- 탭메뉴 컨텐츠 -->
    <div class="tab_con">
        <div id="con01" class="tab_list">
            <!-- swiper-slide -->
            <div class="slider">
                <div class="inner">
                    <ul class="swiper-wrapper slide_list">
                        <li class="swiper-slide">slider1</li>
                        <li class="swiper-slide">slider2</li>
                        <li class="swiper-slide">slider3</li>
                        <li class="swiper-slide">slider4</li>
                        <li class="swiper-slide">slider5</li>
                    </ul>
                </div>
                <span class="btn btn_prev">이전</span>
                <span class="btn btn_next">다음</span>
            </div>
        </div>
        <div id="con02" class="tab_list">
            <!-- swiper-slide -->
            <div class="slider">
                <div class="inner">
                    <ul class="swiper-wrapper slide_list">
                        <li class="swiper-slide">slider1</li>
                        <li class="swiper-slide">slider2</li>
                        <li class="swiper-slide">slider3</li>
                        <li class="swiper-slide">slider4</li>
                        <li class="swiper-slide">slider5</li>
                    </ul>
                </div>
                <span class="btn btn_prev">이전</span>
                <span class="btn btn_next">다음</span>
            </div>
        </div>
        <div id="con03" class="tab_list">
            <!-- swiper-slide -->
            <div class="slider">
                <div class="inner">
                    <ul class="swiper-wrapper slide_list">
                        <li class="swiper-slide">slider1</li>
                        <li class="swiper-slide">slider2</li>
                        <li class="swiper-slide">slider3</li>
                        <li class="swiper-slide">slider4</li>
                        <li class="swiper-slide">slider5</li>
                    </ul>
                </div>
                <span class="btn btn_prev">이전</span>
                <span class="btn btn_next">다음</span>
            </div>
        </div>
    </div>
</div>
```

## CSS 스타일

```css
/* 탭메뉴 */
.tab_wrap {max-width: 800px;margin: 50px auto 0;padding: 0 15px;}
.tab_wrap .tit_list {position: relative;font-size: 0;}
.tab_wrap .tit_list:before {content:'';position: absolute;bottom: 0;left: 0;width: 100%;height: 1px;background: #ddd;z-index: 1;}
.tab_wrap .tit_list > li {display: inline-block;margin-right: 3px;vertical-align: top;}
.tab_wrap .tit_list > li a {display: inline-block;padding: 10px 15px;border: 1px solid #fff;border-radius:4px 4px 0 0;font-size: 14px;color: #000;text-decoration: none;}
.tab_wrap .tit_list > li a:hover {background: #efefef;border-color: #efefef;}
.tab_wrap .tit_list > li.active a {position: relative;background: #fff;border: 1px solid #ddd;border-bottom: 1px solid #fff;color: #8ab4f8;z-index: 2;}
.tab_wrap .tab_con {border: 1px solid #ddd;border-top: none;}
.tab_wrap .tab_con .tab_list {display: none;padding: 15px;}

/* 슬라이드 */
.slider {font-size: 0;text-align: center;}
.slider .inner {overflow: hidden;width: 100%;margin: 0 auto;}
.slide_list > li {width: 25%;height: 150px;background: #8ab4f8;font-size: 20px;line-height: 150px;color: #000;text-align: center;}
.slider .btn_prev,
.slider .btn_next {display: inline-block;width: 35px;height: 35px;margin:30px 15px 0;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn_prev {transform: rotateY(180deg);}
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
$(document).ready(function() {
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
    slider(); //슬라이드 실행
}

function slider() {
    $(".slider").each(function(index) {
        let $this = $(this);
        let swiper = undefined;
        let slideNum = $this.find('.swiper-slide').length //슬라이드 총 개수
        let slideInx = 0; //현재 슬라이드 index

        //디바이스 체크
        let oldWChk = window.innerWidth > 768 ? 'pc' : 'mo';
        sliderAct();
        $(window).on('resize', function() {
            let newWChk = window.innerWidth > 768 ? 'pc' : 'mo';
            if (newWChk != oldWChk) {
                oldWChk = newWChk;
                sliderAct();
            }
        })

        function sliderAct() {
            //슬라이드 인덱스 클래스 추가
            $this.addClass(`slider${index}`);

            //슬라이드 초기화 
            if (swiper != undefined) {
                swiper.destroy();
                swiper = undefined;
            }

            //slidesPerView 옵션 설정
            let viewNum = oldWChk == 'pc' ? 4 : 2;
            //loop 옵션 체크
            let loopChk = slideNum > viewNum;

            swiper = new Swiper(`.slider${index} .inner`, {
                slidesPerView: viewNum,
                initialSlide: slideInx,
                spaceBetween: 10,
                slidesPerGroup: 1,
                observer: true,
                observeParents: true,
                loop: loopChk,
                navigation: {
                    prevEl: $(`.slider${index} .btn_prev`)[0],
                    nextEl: $(`.slider${index} .btn_next`)[0],
                },
                on: {
                    activeIndexChange: function() {
                        if ($(`.slider${index}`).parent('.tab_list').css('display') != 'none') {
                            slideInx = this.realIndex; //현재 슬라이드 index 갱신
                        }
                    }
                },
            });
        }
    });
}
```
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-19-swiper-tab/">예제결과 미리보기</a>
</div>
