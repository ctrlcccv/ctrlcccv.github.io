---
layout: post
title: jQuery - Swiper 같은 클래스로 여러 개 사용하기 (반응형)
image: 
  path: /assets/img/blog/swiper-multiple.webp
description: >
  Swiper 같은 클래스로 여러 개의 반응형 슬라이드 만들기 코드 예제
keywords: > 
  Swiper, 반응형 슬라이드
sitemap: true
comments: false
---
같은 클래스명을 가진 여러 개의 슬라이드를 만들기 위해 Swiper 플러그인을 적용하면 모든 슬라이드가 동시에 작동한다.  
개별 클래스를 추가하고 Swiper 스크립트를 작성하면 문제를 해결할 수 있지만, 슬라이드 수가 많으면 유지보수에 불편한 측면이 있다.  
그래서 [.each()](https://api.jquery.com/each/){:target="_blank"} 메서드를 사용하여 index 값이 포함된 개별 클래스를 추가했고, 반복 실행하여 문제를 해결했다.

## HTML

```html
<!-- 첫번째 슬라이드 -->
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
            <li class="swiper-slide">slider5</li>
            <li class="swiper-slide">slider6</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>

<!-- 두번째 슬라이드 -->
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>


<!-- 세번째 슬라이드 -->
<div class="slider">
    <div class="inner">
        <ul class="swiper-wrapper slide_list">
            <li class="swiper-slide">slider1</li>
            <li class="swiper-slide">slider2</li>
            <li class="swiper-slide">slider3</li>
            <li class="swiper-slide">slider4</li>
        </ul>
    </div>
    <span class="btn btn_prev">이전</span>
    <span class="btn btn_next">다음</span>
</div>
```

## CSS

```css
.slider {overflow: hidden;position: relative;max-width: 1180px;margin: 50px auto 0;}
.slider .inner {overflow: hidden;margin: 0 50px;}
.slide_list > li {width: 20%;height: 150px;background: #8ab4f8;font-size: 20px;line-height: 150px;text-align: center;}
.slider .btn {position: absolute;top: 50%;width: 35px;height: 35px;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {left: 0;transform: rotateY(180deg) translate(0,-50%);}
.slider .btn.btn_next {right:0;transform: translate(0,-50%);}
```

## JS

```js
$(window).on('load', function () {
    slider();  
})

function slider(){
    $(".slider").each(function(index){
        let $this = $(this);
        let swiper = undefined;
        let slideNum =  $this.find('.swiper-slide').length //슬라이드 총 개수
        let slideInx = 0; //현재 슬라이드 index
        
        //디바이스 체크
        let oldWChk = window.innerWidth > 768 ? 'pc' : 'mo';
        sliderAct();
        $(window).on('resize', function () {
            let newWChk = window.innerWidth > 768 ? 'pc' : 'mo';
            if(newWChk != oldWChk){
                oldWChk = newWChk;
                sliderAct();
            }
        })

        function sliderAct(){
            //슬라이드 인덱스 클래스 추가
            $this.addClass(`slider${index}`);

            //슬라이드 초기화 
            if (swiper != undefined){ 
                swiper.destroy();
                swiper = undefined;
            }

            //slidesPerView 옵션 설정
            let viewNum = oldWChk == 'pc' ? 5 : 2;
            //loop 옵션 체크
            let loopChk = slideNum > viewNum;

            swiper = new Swiper(`.slider${index} .inner`, {
                slidesPerView: viewNum,
                initialSlide :slideInx,
                spaceBetween: 10,
                slidesPerGroup: 1,
                loop: loopChk,
                navigation: {
                    prevEl: $(`.slider${index} .btn_prev`),
                    nextEl: $(`.slider${index} .btn_next`),
                },
                on: {
                    activeIndexChange: function () {
                        slideInx = this.realIndex; //현재 슬라이드 index 갱신
                    }
                },
            });
        }
    });
}
```
관련 게시글 : [jQuery - Swiper loop 옵션 복제 문제 해결 (반응형)](/code/2023-01-31-swiper-loop/){:target="_blank"}  


<br><br>
[>> 예제 보기](https://ctrlcccv.github.io/swiper-multiple){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
