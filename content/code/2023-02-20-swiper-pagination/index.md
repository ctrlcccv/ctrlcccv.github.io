---
title: jQuery - Swiper slider 페이징(pagination) 번호 커스텀
description: Swiper 슬라이드의 pagination 옵션을 활용한 게시판 스타일의 페이징 커스텀 코드 예제입니다.
slug: 2023-02-20-swiper-pagination
date: 2023-02-20 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-pagination.webp

categories:
    - jQuery
tags:
    - Swiper.js
---

swiper 슬라이드는 기본적으로 동그라미 형태의 페이지 번호를 제공합니다.   
이 페이징 기능을 응용하여 게시판 스타일의 페이징을 만들 수 있습니다.    
이번 예제에서는 사용자들이 더 쉽게 이해하고 편리하게 사용할 수 있는 페이징을 구현하는 방법을 소개하겠습니다.  

## 핵심 기능 설명
* 부드러운 페이징 전환 :  
Swiper 슬라이드는 페이지를 넘길 때 부드럽게 전환되는 효과를 제공합니다. 사용자가 페이지 간 전환을 원활하게 경험할 수 있습니다.

* 게시판 스타일 디자인 :  
기존의 동그라미 형태가 아닌, 게시판처럼 숫자로 된 페이징 디자인을 사용합니다. 이로써 사용자들은 현재 어느 페이지에 있는지 명확하게 알 수 있습니다.

* 동적인 페이지 표시 :  
현재 페이지 번호가 항상 가운데에 표시되도록 구성합니다. 이렇게 하면 사용자들이 현재 위치를 파악하기 쉬워집니다.

* 간편한 이동 버튼 :  
첫 번째와 마지막 페이지로 바로 이동할 수 있는 버튼을 추가하여 사용자의 편의성을 높였습니다.  
<br>

## HTML 구조

페이징을 구현하기 위해 .paging_list 요소에 페이지 번호를 추가합니다.

```html
<div class="slider">
    <!-- 슬라이드 -->
    <div class="inner">
        <ul class="swiper-wrapper list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
            <li class="swiper-slide">slider5</li>
            <li class="swiper-slide">slider6</li>
            <li class="swiper-slide">slider7</li>
            <li class="swiper-slide">slider8</li>
            <li class="swiper-slide">slider9</li>
            <li class="swiper-slide">slider10</li>
            <li class="swiper-slide">slider11</li>
            <li class="swiper-slide">slider12</li>
            <li class="swiper-slide">slider13</li>
            <li class="swiper-slide">slider14</li>
            <li class="swiper-slide">slider15</li>
        </ul>
    </div>

    <!-- 페이징 -->
    <div class="paging_wrap">
        <span class="page_btn paging_first">&lt;&lt;</span>
        <span class="page_btn paging_prev">&lt;</span>
        <div class="num">
            <ul class="paging_list">
            </ul>
        </div>
        <span class="page_btn paging_next">&gt;</span>
        <span class="page_btn paging_last">&gt;&gt;</span>
    </div>
</div>
```

## CSS 스타일
페이징 스타일을 커스터마이징하여 페이지 번호가 일부분만 보이거나, 가운데 정렬되는 효과를 적용합니다.
```css
/* 슬라이드 */
.slider {overflow: hidden;position: relative;max-width: 1180px;margin: 50px auto 0;}
.slider .inner {overflow: hidden;margin: 0 50px;}
.slider .list > li {width: 20%;height: 150px;background: #8ab4f8;font-size: 20px;line-height: 150px;text-align: center;}

/* 페이징 */
.paging_wrap {margin-top:10px;font-size: 0;text-align: center;}
.paging_wrap .num {overflow: hidden;display: inline-block;width: 140px;margin: 0 5px;}
.paging_wrap .page_btn {display: inline-block;width: 24px;height: 24px;margin:0 2px;border: 1px solid #eee;font-size: 11px;line-height: 22px;text-align: center;vertical-align: top;cursor: pointer;}
.paging_wrap .page_btn:hover {border-color: #8ab4f8;color: #8ab4f8;}
.paging_list {display:flex;}
.paging_list > li {width: 24px;height: 24px;margin:0 2px;background: none;border: 1px solid #eee;border-radius: 0;font-size: 13px;line-height: 22px;flex-shrink:0;opacity: 1;}
.paging_list > li.swiper-pagination-bullet-active {border-color: #8ab4f8;color: #8ab4f8;}
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
슬라이드 페이징 위치 조정 로직을 jQuery로 구현합니다.

```js
$(window).on('load', function() {
    slider();
})

function slider() {
    let swiper = undefined;
    let viewNum = ''; //슬라이드 개수 (옵션)
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
        //슬라이드 초기화 
        if (swiper != undefined) {
            swiper.destroy();
            swiper = undefined;
        }

        //slidesPerView 옵션 설정
        viewNum = oldWChk == 'pc' ? 2 : 1;

        swiper = new Swiper('.slider .inner', {
            slidesPerView: viewNum,
            slidesPerGroup: viewNum,
            initialSlide: slideInx,
            spaceBetween: 4,
            observer: true,
            observeParents: true,
            navigation: {
                prevEl: $('.slider .paging_prev')[0],
                nextEl: $('.slider .paging_next')[0],
            },
            pagination: {
                el: $('.slider .paging_list')[0],
                clickable: true,
                renderBullet: function(index, className) {
                    return `<li class="${className}"><span>${index+1}</span></li>`;
                }
            },
            on: {
                init: function() {
                    let btnFirst = $('.slider .paging_first');
                    let btnLast = $('.slider .paging_last');
                    let lastIndex = $('.slider .list li').last().index();

                    //첫 페이지 이동
                    btnFirst.on('click', function() {
                        swiper.slideTo(0);
                    })
                    //마지막 페이지 이동
                    btnLast.on('click', function() {
                        swiper.slideTo(lastIndex);
                    })
                },
                activeIndexChange: function() {
                    slideInx = this.realIndex; //현재 슬라이드 index
                    pagingAct();
                }
            },
        });
        pagingAct()
    }

    //페이징 위치
    function pagingAct() {
        const pageTotal = $('.slider .paging_list li').length; //총 페이지 수
        const pageWidth = $('.slider .paging_wrap .num').width(); //페이지 가로 크기
        const numWidth = $('.slider .paging_list li').eq(0).outerWidth(true); //페이지 번호 가로 크기
        const listWidth = numWidth * pageTotal //모든 페이지 리스트 가로 크기
        const pageActive = Math.ceil(slideInx / viewNum) + 1 //현재 페이지 번호

        if (pageWidth > listWidth) { //총 4페이지 이하일 때
            $('.slider .paging_list').css({
                'justify-content': 'center',
                'transform': 'translate(0,0)'
            })
        } else {
            if (pageActive <= 3) { //현재 페이지가 1,2,3페이지
                $('.slider .paging_list').css({
                    'justify-content': 'flex-start',
                    'transform': 'translate(0,0)'
                })
            } else if (pageActive > pageTotal - 3) { //현재 페이지가 마지막 구간에 도달할 때
                $('.slider .paging_list').css({
                    'justify-content': 'flex-start',
                    'transform': `translate(-${numWidth*(pageTotal - 5)}px,0)`
                })
            } else if (pageActive > 3) { //현재 페이지가 4페이지 이상일 때
                $('.slider .paging_list').css({
                    'justify-content': 'flex-start',
                    'transform': `translate(-${numWidth*(pageActive - 3)}px,0)`
                })
            }
        }
    }
}
```

* 슬라이드 설정 함수  
  * slider() 함수는 슬라이드와 관련된 동작을 수행합니다. 주요 변수들을 먼저 정의합니다.  
  * swiper : Swiper 슬라이드의 인스턴스를 저장하는 변수로, 초기에는 undefined로 설정됩니다.  
  * viewNum : 슬라이드 개수를 나타내는 변수입니다. 여기서는 디바이스의 종류에 따라 원하는 슬라이드 개수를 설정할 수 있습니다.  
  * slideInx : 현재 활성화된 슬라이드의 인덱스를 나타내는 변수입니다.  
  * oldWChk : 브라우저 창 너비를 기준으로 디바이스 체크를 수행합니다. 너비가 768px보다 크면 'pc', 그렇지 않으면 'mo'로 설정됩니다.  
  이어서, sliderAct() 함수를 호출하여 실제 슬라이드 동작을 설정합니다. 또한 브라우저 창 크기 변경 이벤트에 대한 이벤트 핸들러도 설정하여, 화면 크기가 변경될 때마다 슬라이드 동작을 업데이트합니다.    


* 슬라이드 동작 설정 함수   
  * sliderAct() 함수는 슬라이드의 동작을 구체적으로 설정합니다.  
  * 이전에 생성된 Swiper 인스턴스가 있다면 파괴하고 다시 생성합니다.
  * viewNum 변수에 따라 슬라이드 개수를 설정합니다.
  * Swiper 슬라이드를 초기화하고 옵션들을 설정합니다. 여기서는 슬라이드 개수, 슬라이드 간 간격, 페이지네이션 등을 설정하였습니다.  


* 페이징 위치 조정 함수  
  * pagingAct() 함수는 페이지네이션의 위치를 조정하는 로직을 구현합니다.  
  * 페이지네이션에 필요한 크기 정보들을 계산합니다.
  * 페이지네이션의 위치를 조정하여 페이지 번호가 일부분만 보이거나 가운데에 위치하도록 설정합니다.   
  페이지 번호가 4개 이하일 때는 가운데 정렬되고, 그 이상일 때는 현재 페이지 위치에 따라 좌우로 이동하도록 조정됩니다.  
<br>

## 결론
이러한 페이징 방식을 적용함으로써, 사용자들의 경험을 개선하고 번호가 많은 경우에도 화면이 혼잡하지 않게끔 설계되었습니다. 따라서 Swiper 슬라이드의 게시판 스타일 페이징은 사용자들이 원활하게 컨텐츠를 탐색하며 좋은 사용자 경험을 누릴 수 있도록 도움을 줄 것입니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-02-20-swiper-pagination/">예제결과 미리보기</a>
</div>