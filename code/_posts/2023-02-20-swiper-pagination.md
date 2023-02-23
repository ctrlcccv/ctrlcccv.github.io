---
layout: post
title: jQuery -Swiper slider 페이징(pagination) 번호 커스텀
image: 
  path: /assets/img/blog/swiper-pagination.webp
description: > 
  Swiper 슬라이드의 pagination 옵션을 활용한 게시판 스타일의 페이징 커스텀 코드 예제

keywords: > 
  
sitemap: true
comments: false
---

Swiper 슬라이드의 pagination 옵션을 숫자로 바꾸는 방법은 [공식 사이트](https://swiperjs.com/demos#pagination-custom){:target="_blank"}에서 확인할 수 있다.    
이 기능을 활용하여 게시판 스타일의 페이징을 구현했다.  
페이지 번호가 일부분만 보이며, 페이지를 넘기면 다음 페이지 번호가 나타나도록 설정되어 있다.   
이 예제는 페이지 번호가 총 5개만 보이며, 현재 페이지 번호는 가운데로 위치하도록 구성했다.  
그리고, 첫 번째 페이지와 마지막 페이지로 이동할 수 있는 버튼도 추가하여 사용자 편의성을 높였다.
## HTML

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

HTML 코드에는 페이징을 구현하기 위해 ul.paging_list 요소를 추가했다.  
이 요소 안에 페이지 수만큼 li 요소가 추가될 예정이며, 각 li 요소는 페이지 번호를 나타낸다.

## CSS

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

현재 페이지 번호 개수가 5개 이상일 때, 나머지 번호가 가려지도록 .paging_wrap .num 요소에 overflow: hidden과 width: 140px 스타일을 적용했다.

## JS

```js
$(window).on('load', function () {
    slider();
})

function slider(){
  let swiper = undefined;
  let viewNum = ''; //슬라이드 개수 (옵션)
  let slideInx = 0; //현재 슬라이드 index

  //디바이스 체크
  let oldWChk = window.innerWidth > 768 ? 'pc' : 'mo';
  sliderAct();
  $(window).on('resize', function () {
    let newWChk = window.innerWidth > 768 ? 'pc' : 'mo';
    if (newWChk != oldWChk) {
      oldWChk = newWChk;
      sliderAct();
    }
  })
    
  function sliderAct(){
    //슬라이드 초기화 
    if (swiper != undefined){ 
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
        prevEl: $('.slider .paging_prev'),
        nextEl: $('.slider .paging_next'),
      },
      pagination: {
        el: $('.slider .paging_list'),
        clickable: true,
        renderBullet: function (index, className) {
          return `<li class="${className}"><span>${index+1}</span></li>`;
        }
      },
      on: {
        init: function(){
          let btnFirst = $('.slider .paging_first');
          let btnLast = $('.slider .paging_last');
          let lastIndex = $('.slider .list li').last().index();

          //첫 페이지 이동
          btnFirst.on('click',function(){
            swiper.slideTo(0);
          })
          //마지막 페이지 이동
          btnLast.on('click',function(){
            swiper.slideTo(lastIndex);
          })
        },
        activeIndexChange: function () {
          slideInx = this.realIndex; //현재 슬라이드 index
          pagingAct();
        }
      },
    });
    pagingAct()
  }
  
  //페이징 위치
  function pagingAct(){
    const pageTotal = $('.slider .paging_list li').length; //총 페이지 수
    const pageWidth = $('.slider .paging_wrap .num').width(); //페이지 가로 크기
    const numWidth = $('.slider .paging_list li').eq(0).outerWidth(true); //페이지 번호 가로 크기
    const listWidth = numWidth*pageTotal //모든 페이지 리스트 가로 크기
    const pageActive = Math.ceil(slideInx/viewNum) + 1 //현재 페이지 번호

    if (pageWidth > listWidth){//총 4페이지 이하일 때
      $('.slider .paging_list').css({'justify-content':'center','transform':'translate(0,0)'})
    }else{
      if (pageActive <= 3){ //현재 페이지가 1,2,3페이지
        $('.slider .paging_list').css({'justify-content':'flex-start','transform':'translate(0,0)'})
      }else if (pageActive > pageTotal - 3){ //현재 페이지가 마지막 구간에 도달할 때
        $('.slider .paging_list').css({'justify-content':'flex-start','transform':`translate(-${numWidth*(pageTotal - 5)}px,0)`})
      }else if (pageActive > 3){ //현재 페이지가 4페이지 이상일 때
        $('.slider .paging_list').css({'justify-content':'flex-start','transform':`translate(-${numWidth*(pageActive - 3)}px,0)`})
      }
    }
  }
}

```

페이징 리스트를 추가한 후, 슬라이드가 넘어갈 때마다 페이지 위치를 바꾸기 위해 activeIndexChange 이벤트에서 pagingAct 함수를 실행했다.  
realIndex 매개변수를 사용하여 현재 활성화된 슬라이드의 index를 찾고, 보이는 슬라이드 개수로 나누어 현재 페이지 번호를 계산했다.  
페이지 수가 4 이하면 CSS translate 값을 초기화하고 페이지 버튼을 가운데 정렬하고,  
페이지 수가 5 이상이면 페이지 버튼 가로 크기와 현재 페이지 번호에 따라 translate 값을 조정했다.

<br><br>
[>> 예제 보기](https://ctrlcccv.github.io/swiper-pagination){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
