---
title: jQuery - Swiper multi row (다중 행) 정렬 문제 해결
description: Swiper 슬라이드의 다중 행 정렬 수정과 loop 옵션 추가를 위한 코드 예제입니다.
slug: 2023-03-09-swiper-col
date: 2023-03-09 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-col.webp

categories:
    - jQuery
tags:
    - Swiper.js
---
다중 행으로 정렬된 이미지 슬라이드를 만들기 위해 slidesPerColumn 과 slidesPerColumnFill 옵션을 사용했는데, 의도한 순서와 다르게 정렬되는 문제가 발생했다. (최신버전은 [Grid](https://swiperjs.com/demos#grid))  
예를 들어, 첫 번째 페이지에서는 [1, 2, 3, 4, 5, 6], 두 번째 페이지에서는 [7, 8, 9, 10, 11, 12] 순서로 나와야 하는데 아래 사진과 같이 정렬되었다.  
<br>
![Swiper 다중행 옵션 정렬 오류](https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-col2.webp)
<br>
해당 문제를 해결하기 위해 1페이지에서 보이는 슬라이드 수만큼 swiper-slide 클래스로 그룹화하고, 그룹 안의 리스트를 CSS로 원하는 순서대로 정렬했다.

## HTML

```html
<div class="slider">
    <div class="inner">
        <div class="swiper-wrapper">
            <div class="list">slider1</div>
            <div class="list">slider2</div>
            <div class="list">slider3</div>
            <div class="list">slider4</div>
            <div class="list">slider5</div>
            <div class="list">slider6</div>
            <div class="list">slider7</div>
            <div class="list">slider8</div>
            <div class="list">slider9</div>
            <div class="list">slider10</div>
            <div class="list">slider11</div>
            <div class="list">slider12</div>
        </div>
    </div>
    <div class="swiper-prev">이전</div>
    <div class="swiper-next">다음</div>
</div>
```
list 클래스명을 가진 요소를 swiper-slide 클래스로 그룹화할 예정이다.

## CSS

```css
* {margin: 0;padding: 0;box-sizing: border-box;}
ul, li {list-style: none;}

.slider {position: relative;max-width: 1180px;margin: 20px auto 0;padding: 0 50px;}
.slider .inner {overflow: hidden;margin-right: -1.333%;}
.slider .swiper-slide {display:flex;flex-wrap:wrap;}
.slider .list {width: 32%;height: 150px;margin: 1% 1.333% 1% 0;background: #8ab4f8;font-size: 20px;line-height: 150px;text-align: center;}
.slider .swiper-prev, .slider .swiper-next {position: absolute;top: 50%;width: 35px;height: 35px;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;font-size: 0;}
.slider .swiper-prev {left: 0;transform: rotateY(180deg) translate(0,-50%);}
.slider .swiper-next {right:0;transform: translate(0,-50%);}

@media (max-width: 768px) {
    .slider .inner {margin-right: -2%;}
    .slider .list{width: 48%;margin-right: 2%;}
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

## JS

```js
$(document).ready(function() {
    slideAct();
})

function slideAct() {
    var view = 0; //보이는 슬라이드 개수
    var realInx = 0; //현재 페이지
    var swiper = undefined;

    //디바이스 체크
    var winWChk = '';
    $(window).on('load resize', function() {
        var winW = window.innerWidth;
        if (winWChk != 'mo' && winW <= 768) { //모바일 버전으로 전환할 때
            slideList()
            winWChk = 'mo';
        }
        if (winWChk != 'pc' && winW >= 769) { //PC 버전으로 전환할 때
            slideList()
            winWChk = 'pc';
        }
    })

    function slideList() {
        //리스트 초기화
        if ($('.slider .list').parent().hasClass('swiper-slide')) {
            $('.slider .swiper-slide-duplicate').remove();
            $('.slider .list').unwrap('swiper-slide');
        }

        //보이는 슬라이드 개수 설정
        if (window.innerWidth > 768) { //PC 버전
            view = 6;
        } else { //mobile 버전
            view = 2;
        }

        //리스트 그룹 생성 (swiper-slide element 추가)
        var num = 0;
        $('.slider').find('.list').each(function(i) {
            $(this).addClass('list' + (Math.floor((i + view) / view)));
            num = Math.floor((i + view) / view)
        }).promise().done(function() {
            for (var i = 1; i < num + 1; i++) {
                $('.slider').find('.list' + i + '').wrapAll('<div class="swiper-slide"></div>');
                $('.slider').find('.list' + i + '').removeClass('list' + i + '');
            }
        });

        sliderStart()
    }

    //슬라이드 시작
    function sliderStart() {
        //슬라이드 초기화
        if (swiper != undefined) {
            swiper.destroy();
            swiper == undefined;
        }

        //슬라이드 실행
        swiper = new Swiper('.slider .inner', {
            slidesPerView: 1,
            initialSlide: Math.floor(realInx / view),
            resistanceRatio: 0,
            loop: true,
            navigation: {
                nextEl: $('.slider').find('.swiper-next'),
                prevEl: $('.slider').find('.swiper-prev'),
            },
            on: {
                slideChange: function() {
                    realInx = this.realIndex * view
                }
            },
        });
    }
}
```
주로 반응형 홈페이지 작업을 하기 때문에, 모바일까지 고려하여 view 변수를 사용하여 디바이스별로 1페이지당 슬라이드 개수를 설정했다. 
그리고 list 클래스의 총개수를 view 변숫값으로 나누어 각 list 클래스에 해당 값을 추가하고, 같은 index 값을 가진 list 클래스 상위에 wrapAll() 메서드로 swiper-slide 클래스 요소를 추가하여 슬라이드 그룹화를 구현했다.  
<br>
리사이즈 이벤트가 실행되면 Swiper와 swiper-slide 클래스 요소를 모두 삭제하여 초기화하고, 슬라이드를 다시 불러왔다.   
이때, 첫 페이지로 이동되는 문제를 해결하기 위해 현재 페이지의 첫 번째 슬라이드 index 값을 계산하여 realInx 변수에 담고, initialSlide 매개변수를 사용하여 현재 페이지로 다시 이동했다.   
<br>
그룹화 방법으로 구현한 슬라이드는 정렬 문제를 해결할 뿐만 아니라, 호환되지 않는 loop 옵션도 함께 사용할 수 있다.  
<br>

<!-- [>> 예제 다운로드](https://github.com/ctrlcccv/swiper-col){:target="_blank"}   -->

## JS (each문 추가)

```js
$(document).ready(function() {
    slideAct();
})

function slideAct() {
    var view = 0; //보이는 슬라이드 개수
    var realInx = [] //현재 페이지
    var swiperArr = [] //슬라이드 배열

    //슬라이드 배열 생성
    $(".slider").each(function(index) {
        realInx.push(0);
        swiperArr.push(undefined);
    })

    //디바이스 체크
    var winWChk = ''
    $(window).on('load resize', function() {
        var winW = window.innerWidth;
        if (winWChk != 'mo' && winW <= 768) { //모바일 버전으로 전환할 때
            slideList()
            winWChk = 'mo';
        }
        if (winWChk != 'pc' && winW >= 769) { //PC 버전으로 전환할 때
            slideList()
            winWChk = 'pc';
        }
    })

    function slideList() {
        //리스트 초기화
        if ($('.slider .list').parent().hasClass('swiper-slide')) {
            $('.slider .swiper-slide-duplicate').remove();
            $('.slider .list').unwrap('swiper-slide');
        }

        //보이는 슬라이드 개수 설정
        $(".slider").each(function(index) {
            if (window.innerWidth > 768) { //PC 버전
                view = 6;
            } else { //mobile 버전
                view = 2;
            }

            //리스트 그룹 생성 (swiper-slide element 추가)
            var num = 0;
            $(this).addClass("slider-" + index);
            $(".slider-" + index).find('.list').each(function(i) {
                $(this).addClass("list" + (Math.floor((i + view) / view)));
                num = Math.floor((i + view) / view)
            }).promise().done(function() {
                for (var i = 1; i < num + 1; i++) {
                    $(".slider-" + index).find('.list' + i + '').wrapAll('<div class="swiper-slide"></div>');
                    $(".slider-" + index).find('.list' + i + '').removeClass('list' + i + '')
                }
            });
        }).promise().done(function() {
            sliderStart()
        });
    }

    function sliderStart() {
        $(".slider").each(function(index) {
            //슬라이드 초기화
            if (swiperArr[index] != undefined) {
                swiperArr[index].destroy();
                swiperArr[index] == undefined;
            }

            //슬라이드 실행
            swiperArr[index] = new Swiper('.slider-' + index + ' .inner', {
                slidesPerView: 1,
                initialSlide: Math.floor(realInx[index] / view),
                resistanceRatio: 0,
                loop: true,
                navigation: {
                    nextEl: $('.slider-' + index).find('.swiper-next'),
                    prevEl: $('.slider-' + index).find('.swiper-prev'),
                },
                on: {
                    slideChange: function() {
                        realInx[index] = this.realIndex * view
                    }
                },
            });

            //슬라이드 배열 값 추가
            if (swiperArr[index] == undefined) {
                swiperArr[index] = swiper;
            }
        });
    }
}
```

같은 페이지에 해당 슬라이드가 두 개 이상 들어갈 경우를 대비하여 each 문도 추가했다.   
각각의 슬라이드에 필요한 변수는 배열로 선언하여 구현했다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-03-09-swiper-col/swiper-col/">예제결과 미리보기</a>
    <a target="_blank" href="/ctrlcccv-demo/2023-03-09-swiper-col/swiper-col-each/">예제결과 미리보기 (each문 추가)</a>
</div>