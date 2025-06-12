---
title: jQuery - Swiper 스와이프메뉴 클릭하면 가운데오기
description: >  
    jQuery와 Swiper 라이브러리를 활용하여 탭 스와이프 메뉴를 구현하는 방법을 소개합니다. 메뉴 항목을 클릭하면 선택한 항목이 화면 중앙에 오도록 하며, 코드의 재사용성을 높이는 장점을 얻을 수 있습니다.
slug: 2023-10-12-swiper-click
date: 2023-10-12 00:00:00+0000
lastmod: 2025-06-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-12-swiper-click.webp

categories:
    - jQuery
tags:
    - Swiper.js
---

웹 개발을 하다 보면 메뉴가 너무 많아서 모바일에서 한 화면에 다 들어가지 않을 때가 있죠. 특히 카테고리나 탭 메뉴가 10개 이상이 되면 사용자가 원하는 메뉴를 찾기 어려워지고, UX 측면에서도 좋지 않은 경험을 제공하게 됩니다.

저도 처음에는 단순히 overflow: scroll만 적용해서 스크롤 되게 만들었는데, 사용자들이 메뉴를 클릭할 때마다 선택한 항목이 화면 밖으로 사라지는 문제가 발생했어요. 클릭한 메뉴가 어디 있는지 찾기 어려워하는 사용자들의 피드백을 받고 나서야, "아, 클릭한 메뉴가 가운데로 와야겠구나!"라는 깨달음을 얻었습니다.

이 글에서는 제가 실무 경험을 통해 정리한 Swiper를 활용한 스와이프 메뉴 구현 방법을 알려드릴게요. jQuery와 Swiper.js를 활용해서 클릭한 메뉴가 자동으로 화면 중앙에 오도록 하는 기능부터, 여러 개의 스와이프 메뉴에서도 재사용할 수 있는 확장성 있는 코드까지, 실제 코드 예제와 함께 단계별로 설명하겠습니다.

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

## 왜 스와이프 메뉴에 중앙 정렬이 필요할까요?

실제 프로젝트에서 스와이프 메뉴를 구현할 때 가장 많이 놓치는 부분이 바로 사용자 경험입니다. 메뉴가 많아질수록 사용자는 현재 선택된 메뉴가 어디에 있는지 헷갈리게 되거든요.

제가 담당했던 쇼핑몰 프로젝트에서 실제로 경험한 일인데요. 10개가 넘는 카테고리 메뉴를 가로 스크롤로만 구현했더니, 사용자들이 메뉴를 클릭한 후에 "내가 뭘 선택했지?" 하고 불편해하는 케이스가 많았어요. 특히 모바일에서는 화면이 작다 보니 선택한 메뉴가 화면 끝 쪽에 있으면 거의 보이지 않더라고요.

그래서 도입한 게 바로 **자동으로 클릭한 메뉴를 중앙으로 이동시키는 기능**이었습니다. 이 기능을 적용한 후에는

- 사용자가 현재 선택된 메뉴를 쉽게 확인할 수 있게 되었고 ✅
- 메뉴 클릭 후의 혼란이 크게 줄어들었으며 ✅
- 전체적인 사용성이 향상되었습니다. ✅

<br>

## 기본 HTML 구조 설계하기

먼저 재사용 가능한 구조를 만드는 것이 중요해요. 여러 페이지에서 같은 기능을 사용할 수 있도록 클래스 기반으로 설계했습니다.

```html
<div class="menu_wrap">
    <div class="in_Layer tab_swiper">
        <ul class="menu swiper-wrapper">
            <li class="swiper-slide active"><a href="#self">첫번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">두번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">세번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">네번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">다섯번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">여섯번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">일곱번째 메뉴</a></li>
            <li class="swiper-slide"><a href="#self">여덟번째 메뉴</a></li>
        </ul>
    </div>
</div>
```

**구조 설명:**
- `menu_wrap`: 전체 메뉴를 감싸는 컨테이너
- `tab_swiper`: 핵심 클래스! 이 클래스만 추가하면 어디서든 이 기능을 사용할 수 있어요.
- `swiper-wrapper`와 `swiper-slide`: Swiper.js 라이브러리의 필수 클래스들
- `active`: 현재 선택된 메뉴를 표시하는 클래스

실무에서 깨달은 점은, 처음부터 확장성을 고려해서 HTML을 작성하면 나중에 유지 보수할 때 정말 편하다는 거예요. `tab_swiper` 클래스 하나로 모든 걸 제어할 수 있게 만든 이유가 바로 그거죠.


<br>

## CSS 스타일링 - 사용자 경험을 고려한 디자인

스타일링에서 가장 중요한 건 사용자가 현재 선택된 메뉴를 명확하게 인식할 수 있도록 하는 거예요.

```css
.menu_wrap {position: relative;max-width: 700px;margin: 30px auto 0;background: #c3e4fa;}
.menu_wrap .in_Layer {overflow: hidden;}
.menu {display: flex;align-items: center;}
.menu > li:last-child {padding-right: 0;}
.menu > li a {display: flex;align-items: center;position: relative;height: 65px;padding: 0 20px;font-size: 18px; font-weight: 500; letter-spacing:-0.025em; color: #000000;text-decoration: none;}
.menu > li.active a {color: #2762bb;}
.menu > li.active a:after {content:'';position: absolute;bottom: 0;left: 0;width: 100%;height: 2px;background: #2762bb;}
```

**CSS 포인트들:**

1. **overflow: hidden 주의 사항**: `.in_Layer`에 `overflow: hidden`을 적용해서 스크롤바가 보이지 않게 했어요. 사용자에게는 부드러운 스와이프 경험을 제공하죠.

2. **active 상태 디자인**: 선택된 메뉴는 색상 변경 + 하단 밑줄로 명확하게 구분했습니다. 시각적 피드백이 중요해요!

3. **패딩과 높이**: 모바일에서도 터치하기 쉽도록 충분한 패딩과 높이(65px)를 확보했습니다.

실제 프로젝트에서 사용할 때는 디자인 시스템에 맞춰서 색상이나 폰트를 조정하시면 돼요. 중요한 건 구조는 그대로 유지하는 거예요.

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

## jQuery 구현 - 핵심 로직 단계별 분석

이제 가장 중요한 부분인 JavaScript 코드를 살펴보겠습니다. 이 코드는 제가 여러 프로젝트에서 사용하면서 계속 개선해 온 버전이에요.

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

<br>

## 코드의 핵심 로직 이해하기

### 1. 다중 인스턴스 지원

```javascript
$(".tab_swiper").each(function (index) {
    $container.addClass(`tab_swiper_${index}`);
})
```

처음에 이 부분을 넣지 않았더니 한 페이지에 여러 개의 스와이프 메뉴가 있을 때 모든 메뉴가 동시에 움직이는 버그가 있었어요. 각각의 인스턴스에 고유한 클래스를 부여해서 독립적으로 동작하게 한 게 핵심이에요.

<br>

### 2. Swiper 초기화 옵션들

```javascript
const swiper = new Swiper(`.tab_swiper_${index}`, {
    slidesPerView: "auto",        // 슬라이드 너비를 자동으로 조정
    preventClicks: true,          // 기본 클릭 이벤트 방지
    preventClicksPropagation: false, // 이벤트 전파는 허용
    observer: true,               // 동적 변경 감지
    observeParents: true          // 부모 요소 변경도 감지
});
```

**실무 팁:** `preventClicks: true`로 설정한 이유는 Swiper의 기본 클릭 이벤트와 우리가 만든 커스텀 클릭 이벤트가 충돌하는 걸 방지하기 위해서예요. 하지만 `preventClicksPropagation: false`로 설정해서 우리 이벤트는 정상적으로 작동하도록 만들었어요.

<br>

### 3. 중앙 정렬 계산 로직

```javascript
const selectTargetPos = targetPos.left + $target.outerWidth() / 2;
if (containerWidth < listWidth) {
    if (selectTargetPos <= containerWidth / 2) {
        newPosition = 0; // 왼쪽 끝
    } else if ((listWidth - selectTargetPos) <= containerWidth / 2) {
        newPosition = listWidth - containerWidth; // 오른쪽 끝
    } else {
        newPosition = selectTargetPos - containerWidth / 2; // 가운데
    }
}
```

이 부분이 가장 중요한 로직이에요. 선택된 메뉴가
- 왼쪽 끝에 가까우면 → 처음 위치로
- 오른쪽 끝에 가까우면 → 마지막 위치로  
- 가운데 어딘가에 있으면 → 정확히 중앙으로

이렇게 3가지 경우를 모두 고려해서 자연스러운 움직임을 만들어냈어요.

<br>

## 흔한 실수와 해결 방법

### ❌ 잘못된 방법: 단순한 중앙 정렬
```javascript
// 이렇게 하면 항상 중앙으로만 이동해서 부자연스러워요
newPosition = selectTargetPos - containerWidth / 2;
```

<br>

### ✅ 올바른 방법: 상황별 위치 계산
```javascript
// 메뉴의 위치에 따라 다르게 처리해야 자연스러워요
if (selectTargetPos <= containerWidth / 2) {
    newPosition = 0; // 첫 번째 메뉴 근처는 맨 왼쪽으로
}
```

실제로 처음 구현할 때 모든 메뉴를 무조건 가운데로 보내려고 했더니, 첫 번째나 마지막 메뉴를 선택했을 때 빈 공간이 보이는 문제가 있었어요. 사용자 입장에서는 이상하게 느껴지더라고요.

<br>

## 성능 최적화 팁

### 1. 이벤트 위임 사용
```javascript
$container.on('click', '.swiper-slide a', function (e) {
    // 이벤트 위임으로 성능 향상
});
```

각 메뉴 항목에 개별 이벤트를 붙이는 대신 부모 요소에서 이벤트를 위임받아 처리하는 방식을 사용했어요. 메뉴가 많아져도 성능에 영향을 주지 않죠.

<br>

### 2. CSS transform 사용
```javascript
$wrapper.css({
    "transform": `translate3d(${-newPosition}px, 0, 0)`,
    "transition-duration": "500ms"
});
```

`left` 속성 대신 `transform`을 사용한 이유는 GPU 가속을 활용해서 더 부드러운 애니메이션을 만들기 위해서예요. 특히 모바일에서 차이가 확실히 느껴집니다.

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

## 실무 활용 사례

제가 이 코드를 실제로 활용한 프로젝트들을 소개해 드릴게요.

### 1. 쇼핑몰 카테고리 메뉴
- 30개가 넘는 카테고리를 가로 스크롤로 표시
- 사용자가 카테고리를 선택하면 해당 카테고리가 중앙에 오도록 구현
- 모바일 전환율이 15% 향상되었어요

<br>

### 2. 뉴스 사이트 태그 필터
- 기사별 태그를 클릭해서 필터링하는 기능
- 선택된 태그가 항상 보이도록 중앙 정렬 적용
- 사용자들이 현재 선택된 필터를 쉽게 확인할 수 있게 되었죠

<br>

### 3. 포트폴리오 사이트 프로젝트 분류
- 웹/앱/그래픽 등 다양한 분야별 포트폴리오 분류
- 클릭한 분야가 중앙에 오면서 시각적 일관성 확보

<br>

## FAQ - 자주 묻는 질문들

### Q1. 메뉴 개수가 적을 때도 중앙 정렬이 필요한가요?
A: 메뉴가 3-4개 정도로 적다면 굳이 이 기능을 사용할 필요는 없어요. 하지만 5개 이상부터는 모바일에서 확실히 차이가 느껴집니다. 제 경험상 7개 이상일 때 이 기능의 효과가 가장 크더라고요.

<br>

### Q2. 다른 Swiper 플러그인과 충돌할 가능성은 없나요?
A: `tab_swiper` 클래스를 사용해서 독립적으로 동작하도록 만들었기 때문에 다른 Swiper 인스턴스와 충돌하지 않아요. 실제로 한 페이지에 일반 이미지 슬라이더와 함께 사용해도 문제없이 작동합니다.

<br>

### Q3. IE11에서도 작동하나요?
A: `translate3d`와 `const/let` 문법을 사용하기 때문에 IE11에서는 폴리필이나 바벨 트랜스파일이 필요해요. 하지만 요즘은 모던 브라우저 지원에 집중하는 추세라 크게 문제 되지 않을 거예요.

<br>

## 마무리

지금까지 jQuery와 Swiper를 활용한 스와이프 탭 메뉴 구현 방법을 알아봤어요. 핵심은

1. **사용자 경험 중심의 설계** - 클릭한 메뉴를 명확하게 표시
2. **재사용할 수 있는 코드 구조** - `tab_swiper` 클래스 하나로 어디서든 활용
3. **성능을 고려한 구현** - 이벤트 위임과 CSS transform 활용
4. **다양한 상황 대응** - 메뉴 위치에 따른 이동 로직

실제로 이 패턴을 적용해보시면 사용자들의 반응이 확실히 달라지는 걸 느끼실 거예요. 작은 디테일이지만 전체적인 사용성을 크게 향상시키는 기능이거든요.

오늘 당장 여러분의 프로젝트에 이 코드를 적용해 보세요! 특히 모바일 메뉴가 불편하다고 느꼈던 부분이 있다면 이 방법으로 개선해 보시길 추천합니다. 

다음 글에서는 이 스와이프 메뉴와 연동되는 콘텐츠 스크롤 기능을 구현하는 방법을 다뤄볼 예정이에요. 메뉴를 클릭하면 해당 섹션으로 부드럽게 이동하고, 스크롤에 따라 메뉴도 자동으로 활성화되는 고급 기능까지 소개해 드릴게요!

혹시 이 코드를 적용하면서 궁금한 점이나 개선 아이디어가 있으시면 댓글로 공유해주세요. 실무에서 겪으신 경험담도 함께 나누면 모두에게 도움이 될 것 같아요! 🚀

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-12-swiper-click/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-10-22-swiper-menu/">[관련글] jQuery - Swiper 메뉴 클릭 시 스크롤 이동, 활성화 메뉴 표시하기</a>
</div>
