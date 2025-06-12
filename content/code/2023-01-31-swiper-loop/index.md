---
title: jQuery - Swiper loop 옵션 복제 문제 해결 (반응형)
description: 반응형을 지원하는 Swiper.js 무한 반복 옵션 코드 예제입니다.
slug: 2023-01-31-swiper-loop
date: 2023-01-31 00:00:00+0000
lastmod: 2025-06-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/swiper-loop.webp

categories:
    - jQuery
tags:
    - Swiper.js
---

Swiper로 반응형 슬라이드를 만들다가 loop 옵션 때문에 고생한 적 있으시죠?

저도 처음 Swiper로 반응형 슬라이드를 구현할 때 정말 당황스러웠어요. PC에서는 5개, 모바일에서는 3개씩 보여주는 깔끔한 슬라이드를 만들었는데, loop 옵션을 켜는 순간 모든 게 엉망이 되더라고요. 슬라이드가 이상하게 복제되고, 화면 크기를 바꿀 때마다 제대로 동작하지 않아서 몇 시간을 헤맸던 기억이 나네요. 특히 슬라이드 개수가 적을 때는 loop가 필요 없는데도 자꾸 복제되어서 "이게 뭐지?" 싶었어요.

하지만 지금은 이 문제의 근본 원인을 파악하고, 깔끔하게 해결하는 방법을 알게 되었습니다. 이 글에서는 제가 실제 프로젝트에서 겪었던 Swiper loop 옵션의 복제 문제와 해결 과정을 단계별로 공유해드릴게요.

문제 상황 분석부터 실제 해결 코드까지, 여러분이 똑같은 문제로 고생하지 않으시도록 상세하게 설명하겠습니다. 마지막에는 자주 묻는 질문들과 추가 최적화 팁도 준비했으니까, 끝까지 읽어보시면 Swiper 반응형 슬라이드 마스터가 되실 거예요!

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

## 정확히 어떤 문제가 생기는 걸까요?

실무에서 이런 상황을 정말 많이 마주치게 돼요.

클라이언트가 "PC에서는 상품을 5개씩, 모바일에서는 3개씩 보여주는 슬라이드를 만들어 주세요. 그리고 무한으로 돌아가야 해요!"라고 요청한다고 해보시죠. 단순하게 생각하면 breakpoints로 반응형 설정하고, loop: true만 넣으면 끝일 것 같잖아요?

그런데 막상 구현해보면 이상한 일들이 벌어져요.

```javascript
// 이렇게 단순하게 하면 문제가 생겨요
new Swiper('.swiper', {
    loop: true, // 무조건 loop를 켜면...
    breakpoints: {
        1180: {
            slidesPerView: 5,
        },
        768: {
            slidesPerView: 3,
        }
    }
});
```

**문제 1: 슬라이드 개수가 적을 때**
- 총 4개 슬라이드인데 PC에서 5개씩 보여주려고 하면? → 복제된 슬라이드가 이상하게 나타남
- loop가 필요 없는 상황인데도 강제로 복제가 일어남

**문제 2: 화면 크기 변경 시**
- PC에서 모바일로 화면을 줄이면 슬라이드가 제대로 재배치되지 않음
- 이미 복제된 상태에서 다시 계산하려니까 꼬임

제가 처음 이 문제를 마주했을 때는 "Swiper 버그인가?" 싶었는데, 알고 보니 우리가 상황에 맞게 loop 옵션을 제어해줘야 하는 거더라고요.

<br>

## 문제의 핵심을 파악해보니

실제로 여러 프로젝트를 진행하면서 깨달은 건, 이 문제의 핵심은 **슬라이드 개수에 따른 조건부 loop 처리**라는 거예요.

생각해보세요. 슬라이드가 4개밖에 없는데 PC에서 5개씩 보여준다면, loop가 필요할까요? 전혀 필요 없죠! 오히려 방해만 됩니다.

**저만의 해결 전략:**
1. **슬라이드 개수 체크**: 총 몇 개인지 파악
2. **화면별 표시 개수 확인**: PC/모바일에서 각각 몇 개씩 보이는지
3. **조건부 loop 설정**: 필요할 때만 loop 활성화
4. **리사이즈 대응**: 화면 크기가 바뀌면 다시 계산

이 전략으로 접근하니까 모든 문제가 해결되더라고요!


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

## 실제 해결 과정 (단계별로 따라해보세요)

### 1단계: 기본 HTML 구조 준비

먼저 Swiper가 동작할 기본 틀을 만들어보겠습니다.

```html
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

여기서 중요한 포인트는 슬라이드가 4개라는 점이에요. 이 상황에서 PC에서 5개씩 보여주려고 하면 문제가 생기는 거죠.

<br>

### 2단계: CSS 스타일링

```css
.slider {overflow: hidden;position: relative;max-width: 1210px;margin: 50px auto;padding: 0 60px;}
.slider .inner {overflow: hidden;margin: 0 auto;}
.slide_list > li {display: flex;justify-content: center;align-items: center; height: 150px;background: #8ab4f8;font-size: 20px;color: #000;text-align: center;}
.slider .btn {position: absolute;top: 50%;width: 35px;height: 35px;background:url('images/arrow.png') center center no-repeat;background-size: cover;text-indent: -999em;cursor: pointer;}
.slider .btn.btn_prev {left: 0;transform:translate(0,-50%) rotateY(180deg);}
.slider .btn.btn_next {right: 0;transform: translate(0,-50%);}
```

스타일은 기본적인 형태로 구성했어요. 중요한 건 슬라이드 자체가 아니라 JavaScript 로직이거든요.

<br>

### 3단계: 핵심 JavaScript 구현 (이 부분이 핵심이에요!)

```js
$(window).on('load', function () {
    slider();  
})

function slider() {
    let swiper = undefined;
    let slideNum = $('.slider .swiper-slide').length //슬라이드 총 개수
    let slideInx = 0; //현재 슬라이드 index

    //디바이스 체크
    let oldWChk = window.innerWidth > 1180 ? 'pc' : 'mo';
    sliderAct();
    $(window).on('resize', function () {
        let newWChk = window.innerWidth > 1180 ? 'pc' : 'mo';
        if (newWChk != oldWChk) {
            oldWChk = newWChk;
            sliderAct();
        }
    })
    
    //슬라이드 실행
    function sliderAct(){
        //슬라이드 초기화 
        if (swiper != undefined){ 
            swiper.destroy();
            swiper = undefined;
        }

        //slidesPerView 옵션 설정
        let viewNum = oldWChk == 'pc' ? 5 : 2.3;
        //loop 옵션 체크
        let loopChk = slideNum > viewNum;
        
        swiper = new Swiper(".slider .inner", {
            slidesPerView: viewNum,
            initialSlide :slideInx,
            spaceBetween: 10,
            loop: loopChk,
            autoplay: {
                delay: 2000,
            },
            navigation: {
                nextEl: '.slider .btn_next',
                prevEl: '.slider .btn_prev',
            },
            on: {
                activeIndexChange: function () {
                    slideInx = this.realIndex; //현재 슬라이드 index 갱신
                }
            },
        });
    }
}
```

<br>

### 이 코드의 핵심 포인트들 (꼭 이해하고 가세요!)

**1. 슬라이드 개수 체크**
```javascript
let slideNum = $('.slider .swiper-slide').length // 실제 슬라이드가 몇 개인지 파악
```

**2. 조건부 loop 설정 (이게 핵심이에요!)**

```javascript
let viewNum = oldWChk == 'pc' ? 5 : 2.3; // 화면별 표시 개수
let loopChk = slideNum > viewNum; // 슬라이드가 표시 개수보다 많을 때만 loop 활성화
```

이 부분이 모든 문제를 해결하는 핵심이에요. 슬라이드가 4개인데 PC에서 5개씩 보여주려고 하면 `4 > 5`가 false가 되어서 loop가 비활성화되는 거죠!

**3. 리사이즈 대응**
```javascript
if (newWChk != oldWChk) { // 디바이스가 바뀌었을 때만
    oldWChk = newWChk;
    sliderAct(); // 슬라이드 재초기화
}
```

화면 크기가 바뀔 때마다가 아니라, 실제로 PC ↔ 모바일이 전환될 때만 재초기화해서 성능도 최적화했어요.

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

## 실제 적용하면서 겪었던 시행착오들

### 시행착오 1: "그냥 breakpoints로만 하면 되지 않을까?"

처음에는 단순하게 생각했어요.

```javascript
// ❌ 이렇게 하면 안 돼요
new Swiper('.swiper', {
    loop: true, // 무조건 loop
    breakpoints: {
        1180: { slidesPerView: 5 },
        768: { slidesPerView: 3 }
    }
});
```

결과는 참혹했죠. 슬라이드 개수가 적으면 이상하게 복제되고, 화면 크기를 바꿀 때마다 버그가 생겼어요.

<br>

### 시행착오 2: "destroy() 없이 옵션만 바꾸면 되겠지?"

```javascript
// ❌ 이것도 문제가 생겨요
swiper.update(); // update만으로는 loop 옵션 변경이 제대로 안 됨
```

Swiper의 update() 메서드로는 loop 옵션 변경이 완전히 적용되지 않더라고요. 결국 destroy() 후 재생성이 답이었어요.

<br>

### 시행착오 3: "모든 리사이즈에 반응하자!"

```javascript
// ❌ 성능상 좋지 않아요
$(window).on('resize', function() {
    sliderAct(); // 리사이즈할 때마다 재초기화 → 과부하
});
```

모바일에서 스크롤할 때 주소창이 사라지면서 리사이즈 이벤트가 계속 발생해요. 이때마다 재초기화하면 성능이 나빠지더라고요.

**✅ 최종 해결책**
```javascript
// 디바이스가 실제로 바뀔 때만 재초기화
if (newWChk != oldWChk) {
    sliderAct();
}
```

<br>

## 추가 최적화 팁들 (실무에서 유용해요)

### 팁 1: 자동재생이 있을 때 주의점

```javascript
// 자동재생 중에 리사이즈되면 멈춤 방지
autoplay: {
    delay: 2000,
    disableOnInteraction: false, // 사용자 조작 후에도 자동재생 유지
},
```

### 팁 2: 터치 스와이프 최적화

```javascript
// 모바일에서 더 부드러운 터치 경험
touchRatio: 1,
touchAngle: 45,
grabCursor: true,
```

### 팁 3: 성능 최적화

```javascript
// 불필요한 DOM 업데이트 방지
watchOverflow: true,
watchSlidesProgress: true,
watchSlidesVisibility: true,
```

<br>

## 자주 묻는 질문들

### Q1: "슬라이드가 정확히 몇 개일 때 loop를 써야 하나요?"

표시되는 슬라이드 개수보다 많을 때만 사용하세요.
- PC에서 5개씩 보여준다면 → 슬라이드가 6개 이상일 때만 loop 활성화
- 모바일에서 3개씩 보여준다면 → 슬라이드가 4개 이상일 때만 loop 활성화

<br>

### Q2: "리사이즈할 때마다 현재 위치가 초기화되는데 어떻게 하나요?"

제 코드에서는 `slideInx` 변수로 현재 위치를 기억하고, `initialSlide` 옵션으로 복원합니다:

```javascript
on: {
    activeIndexChange: function () {
        slideInx = this.realIndex; // 위치 기억
    }
}
```

<br>

### Q3: "모바일에서 스크롤할 때 자꾸 재초기화되는데요?"

디바이스 체크 로직을 사용하세요. 실제로 PC ↔ 모바일이 바뀔 때만 재초기화됩니다:

```javascript
if (newWChk != oldWChk) { // 디바이스가 바뀔 때만
    sliderAct();
}
```

<br>

### Q4: "autoplay가 있을 때 리사이즈하면 멈춰요"

`disableOnInteraction: false` 옵션을 추가하세요:

```javascript
autoplay: {
    delay: 2000,
    disableOnInteraction: false,
},
```

<br>

### Q5: "슬라이드 개수가 동적으로 변할 때는 어떻게 하나요?"

슬라이드를 추가/삭제할 때마다 `slideNum`을 다시 계산하고 `sliderAct()`를 호출하세요:

```javascript
// 슬라이드 추가 후
slideNum = $('.slider .swiper-slide').length;
sliderAct();
```

<br>

## 마무리: 이제 더 이상 고생하지 마세요!

핵심만 정리하면 이거예요:
1. **슬라이드 개수 체크**: 총 몇 개인지 파악하기
2. **조건부 loop**: 필요할 때만 활성화하기  
3. **적절한 재초기화**: PC ↔ 모바일 전환 시에만
4. **상태 유지**: 현재 위치 기억하고 복원하기

이 방법으로 접근하면 Swiper loop 옵션 문제로 더 이상 고생하지 않으실 거예요. 저도 이 방법을 정립한 후로는 어떤 반응형 슬라이드 요구사항이 와도 자신 있게 구현할 수 있게 되었거든요!

혹시 구현하다가 막히는 부분이나 다른 상황의 문제가 생기면 댓글로 남겨주세요. 제가 겪어본 케이스라면 해결 방법을 공유해드릴게요. 함께 더 나은 코드를 만들어가요! 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-01-31-swiper-loop/">예제결과 미리보기</a>
</div>

