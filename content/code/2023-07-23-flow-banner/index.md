---
title: jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)
description: >  
    jQuery와 CSS를 활용해 반응형 흐르는 롤링 배너를 구현하는 방법을 단계별로 소개합니다.

alternates:
  - title: "jQuery - 흐르는 롤링 배너 (+ 반응형 타입 추가)"
    href: "https://ctrlcccv.github.io/code/2023-07-23-flow-banner/"
    hreflang: "ko"
  - title: "Responsive jQuery Marquee Banner Tutorial (Infinite Loop)"
    href: "https://ctrlcccv.github.io/code-en/2025-04-24-flow-banner/"
    hreflang: "en"

slug: 2023-07-23-flow-banner
date: 2023-07-23 00:00:00+0000
lastmod: 2025-06-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/flow-banner.webp

categories:
    - jQuery
tags:
    - 흐르는 롤링 배너
---

웹사이트에 흐르는 배너를 만들다 보면 "어떻게 하면 자연스럽게 끊임없이 흘러가게 할 수 있을까?"하는 고민에 빠지시죠.

저도 처음엔 단순한 CSS 애니메이션만으로 시도해봤는데, 텍스트가 짧으면 중간에 빈 공간이 생기고, 반응형으로 만들려니 화면 크기별로 속도가 들쭉날쭉해지더라고요. 특히 모바일에서는 텍스트가 너무 빨리 지나가서 읽기 어려운 문제까지 있었어요.

이 글에서는 제가 실무에서 사용하고 있는 jQuery 기반의 흐르는 롤링 배너 구현법을 알려드릴게요. 끊김이 없는 무한 반복부터 반응형 속도 조절, 사용자 인터랙션까지 모든 기능을 담았습니다.

기본 HTML 구조부터 고급 jQuery 제어까지, 실제 쇼핑몰과 기업 사이트에서 바로 사용할 수 있는 완성된 코드와 함께 단계별로 설명하겠습니다.

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

## 기본 HTML 구조 설계

흐르는 배너의 핵심은 간단하면서도 확장 가능한 HTML 구조입니다. 실무에서는 관리의 편의성을 고려해야 하거든요.

```html
<div class="flow_banner">
    <ul class="list">
        <li>TEXT1</li>
        <li>TEXT2</li>
        <li>TEXT3</li>
        <li>TEXT4</li>
        <li>TEXT5</li>
    </ul>
</div>
```

<br>

### 실무에서 이 구조를 선택한 이유

실제 프로젝트를 하면서 깨달은 점은 복잡한 구조보다는 단순한 구조가 훨씬 유지보수가 쉽다는 거예요. 

- **flow_banner**: 전체 배너 영역으로, 너비와 스타일을 독립적으로 관리
- **list**: 실제 흐르는 콘텐츠 영역으로, 복제와 애니메이션의 대상
- **li 요소들**: 개별 텍스트 항목으로, 동적으로 추가/삭제 가능

<br>

### 확장성 고려사항

```html
<!-- 이미지와 텍스트 조합도 가능 -->
<div class="flow_banner">
    <ul class="list">
        <li><img src="icon1.png" alt=""> 신상품 할인 이벤트</li>
        <li><img src="icon2.png" alt=""> 무료배송 진행중</li>
        <li><img src="icon3.png" alt=""> 회원가입 시 추가 혜택</li>
    </ul>
</div>
```

실무에서는 텍스트만이 아니라 아이콘이나 이미지를 함께 사용하는 경우가 많아요. 이런 확장도 이 구조에서는 자연스럽게 가능합니다.

<br>

## CSS 스타일링과 반응형 설계

흐르는 배너의 핵심은 overflow 처리와 애니메이션 설정입니다.

```css
.flow_banner { 
    overflow: hidden; 
    display: flex; 
    width: 100%; 
    max-width: 1180px; 
    background: #000; 
} 

.flow_banner .list { 
    display: flex; 
} 

.flow_banner .list > li { 
    padding: 20px; 
    font-size: 18px; 
    color: #fff; 
    white-space: nowrap; 
} 

@keyframes flowRolling { 
    0% { transform: translateX(0); } 
    100% { transform: translateX(-100%); } 
}
```

<br>

### 스타일 세부 해설

실제 프로젝트에서 중요한 사항들을 설명해 드릴게요.

**overflow: hidden의 중요성**
```css
/* ❌ 이렇게 하면 배너 밖으로 텍스트가 보임 */
.flow_banner { 
    overflow: visible; 
}

/* ✅ 이렇게 해야 깔끔한 배너 영역 유지 */
.flow_banner { 
    overflow: hidden; 
}
```

**white-space: nowrap이 필수인 이유**

```css
/* ❌ 줄바꿈이 발생하면 세로로 늘어남 */
.flow_banner .list > li { 
    /* white-space 설정 안 함 */
}

/* ✅ 한 줄로 유지하여 가로 흐름 보장 */
.flow_banner .list > li { 
    white-space: nowrap; 
}
```

<br>

### 반응형 처리 전략

```css
@media (max-width: 1280px) {
    .flow_banner .list > li { 
        padding: 10px; 
        font-size: 16px; 
    } 
}

@media (max-width: 767px){
    .flow_banner .list > li { 
        padding: 5px; 
        font-size: 14px; 
    } 
}
```

제가 실무에서 사용하는 반응형 기준점이에요. 모바일에서는 텍스트가 너무 크면 가독성이 떨어지더라고요. 특히 padding 값 조정이 중요한데, 모바일에서는 여백을 줄여야 더 많은 정보를 보여줄 수 있어요.

다음 섹션에서는 이 CSS 기반 위에 jQuery로 어떻게 동적인 제어를 추가하는지 알아보겠습니다.

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

## jQuery 핵심 로직 구현

여기서부터가 진짜 핵심이에요. 단순한 CSS 애니메이션과 jQuery를 결합한 동적 제어 방식의 차이를 느껴보실 수 있을 거예요.

```js
$(document).ready(function() {
    setFlowBanner();
});

function setFlowBanner() {
    const $wrap = $('.flow_banner'); // 배너 전체를 감싸는 요소
    const $list = $('.flow_banner .list'); // 배너 안의 리스트 (ul 등)
    let wrapWidth = 0; // $wrap의 가로 크기 저장용
    let listWidth = 0; // $list의 가로 크기 저장용
    const displayTime = 2; // 각 아이템을 보여줄 시간 (초 단위)

    // 원본 리스트 복제본 (기준용)
    const $baseClone = $list.clone();

    // 페이지 로드 시 실행
    $(window).on('load', function() {
        $wrap.append($baseClone.clone()); // 초기 복제 리스트 1개 추가
        flowBannerAct(); // 배너 롤링 시작
    });

    // 창 크기 변경 시 실행
    $(window).on('resize', function () {
        const wrapWidth = $wrap.width(); // 현재 배너 영역 너비
        const listCount = $wrap.find('.list').length; // 리스트 개수
        const listWidth = $wrap.find('.list').width(); // 리스트 너비

        // 리스트 총 너비가 배너 너비의 2배보다 크면 다시 세팅하지 않음
        if (listCount * listWidth > wrapWidth * 2) {
            return;
        }
        flowBannerAct(); // 배너 다시 설정
    });

    // 배너 롤링을 설정하는 함수
    function flowBannerAct() {
        // 이전 애니메이션 초기화
        $wrap.find('.list').css('animation', 'none'); // 애니메이션 제거
        $wrap.find('.list').slice(2).remove(); // 기존 복제 리스트 제거

        // 현재 너비 값 측정
        wrapWidth = $wrap.width();
        listWidth = $list.width();

        // 속도 계산 (전체 길이 / 총 시간)
        const speed = listWidth / ($list.find('li').length * displayTime);

        // 필요한 만큼 리스트 복제하여 추가
        const listCount = Math.ceil(wrapWidth * 2 / listWidth);
        for (let i = 2; i < listCount; i++) {
            const $newClone = $baseClone.clone(); // 원본 기준으로 복제
            $wrap.append($newClone);
        }

        // 애니메이션 적용
        $wrap.find('.list').css({
            'animation': `${listWidth / speed}s linear infinite flowRolling`
        });
    }

    // 마우스를 올리면 애니메이션 일시 정지
    $wrap.on('mouseenter', function () {
        $wrap.find('.list').css('animation-play-state', 'paused');
    // 마우스를 떼면 다시 실행
    }).on('mouseleave', function () {
        $wrap.find('.list').css('animation-play-state', 'running');
    });
}
```

<br>

### 실무에서 중요한 핵심들

제가 이 코드를 개발하면서 가장 고민했던 부분들을 하나씩 설명해 드릴게요.

<br>

<p style="margin-top:0;"><strong>1. 끊김 없는 무한 루프 구현</strong></p>

```javascript
// 단순한 방법 (문제 있음)
// 리스트가 짧으면 중간에 빈 공간 발생

// 해결 방법: 동적 복제
const listCount = Math.ceil(wrapWidth * 2 / listWidth);
for (let i = 2; i < listCount; i++) {
    const $newClone = $baseClone.clone();
    $wrap.append($newClone);
}
```

처음엔 단순히 리스트를 한 개만 복제했는데, 텍스트가 짧으면 화면에 빈 공간이 생기더라고요. 그래서 화면 너비의 2배만큼 리스트를 채우는 방식으로 개선했어요.

<br>

<p style="margin-top:0;"><strong>2. 반응형 속도 조절의 핵심</strong></p>

```javascript
// 각 항목당 표시 시간을 일정하게 유지
const speed = listWidth / ($list.find('li').length * displayTime);
const duration = listWidth / speed;
```

실무에서 가장 중요한 부분이에요. 화면 크기가 달라져도 사용자가 텍스트를 읽을 수 있는 적절한 속도를 유지해야 하거든요.

<br>

<p style="margin-top:0;"><strong>3. 성능 최적화를 위한 리사이즈 처리</strong></p>

```javascript
// ❌ 매번 다시 생성하면 성능 저하
$(window).on('resize', function () {
    flowBannerAct(); // 무조건 재생성
});

// ✅ 필요할 때만 재생성
$(window).on('resize', function () {
    if (listCount * listWidth > wrapWidth * 2) {
        return; // 충분하면 그대로 유지
    }
    flowBannerAct(); // 부족할 때만 재생성
});
```

<br>

### 사용자 인터랙션 구현

마우스 호버 시 일시 정지 기능은 UX 측면에서 정말 중요해요. 사용자가 텍스트를 제대로 읽을 수 있게 해주거든요.

```javascript
// 직관적인 컨트롤
$wrap.on('mouseenter', function () {
    $wrap.find('.list').css('animation-play-state', 'paused');
}).on('mouseleave', function () {
    $wrap.find('.list').css('animation-play-state', 'running');
});
```

이제 고급 활용법과 실무에서 자주 마주치는 문제들을 살펴보겠습니다.

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

## 고급 활용법과 커스터마이징

실무에서 이 배너를 다양하게 활용하는 방법들을 소개해 드릴게요. 제가 실제 프로젝트에서 적용했던 사례들이에요.

<br>

### displayTime 값 조정으로 속도 제어

```javascript
// 빠른 속도 (뉴스 티커 스타일)
const displayTime = 1; // 1초

// 보통 속도 (일반적인 프로모션 배너)
const displayTime = 2; // 2초 (권장)

// 느린 속도 (중요한 공지사항)
const displayTime = 4; // 4초
```

실제 프로젝트에서는 콘텐츠 성격에 따라 이 값을 조정해요. 할인 정보 같은 프로모션은 빠르게, 중요한 공지는 천천히 흘러가게 설정하죠.

<br>

### displayTime 계산 방식의 이해

처음에 이 배너를 만들면서 가장 헷갈렸던 게 바로 displayTime 계산 방식이었어요. "각 텍스트가 얼마나 보여야 할까?"라는 고민에서 시작된 이 값의 정확한 의미를 설명해드릴게요.

<br>

<p style="margin-top:0;"><strong>displayTime의 실제 의미</strong></p>

현재 코드에서 사용되는 `displayTime`은 각 항목(li 요소)이 보여지는 <strong>평균 시간(초 단위)</strong>을 의미합니다.

```javascript
// 실제 계산 과정
const speed = listWidth / ($list.find('li').length * displayTime);
const duration = listWidth / speed; // 전체 애니메이션 시간
```

<br>

<p><strong>계산 방식</strong></p>

> **전체 리스트의 너비(listWidth) ÷ (li 개수 × displayTime)**  
> → 이 결과가 배너가 한 사이클을 도는 데 걸리는 `animation-duration`이 됩니다.

실무에서 자주 마주치는 상황으로 예를 들어보면

```javascript
// 예시: 5개 항목, displayTime 2초인 경우
// 리스트 전체 너비가 1000px이라면
const totalItems = 5;
const displayTime = 2;
const listWidth = 1000;

// 속도 계산: 1000px ÷ (5개 × 2초) = 100px/s
const speed = listWidth / (totalItems * displayTime);

// 전체 애니메이션 시간: 1000px ÷ 100px/s = 10초
const animationDuration = listWidth / speed;
```

<br>

<p><strong>실무에서의 유의점</strong></p>

하지만 실제 상황에서는 li 요소마다 너비가 다를 수 있어요. 저도 처음엔 이 부분 때문에 고민이 많았거든요.

```html
<!-- 이런 경우 각 항목의 너비가 다름 -->
<ul class="list">
    <li>할인</li>
    <li>봄맞이 특가 세일 진행중입니다</li>
    <li>무료배송</li>
    <li>신규 가입 시 적립금 5,000원 혜택</li>
</ul>
```

이때 위 공식은 **ul 전체 너비의 평균값**을 기준으로 적용됩니다. 즉, 각 항목의 길이가 달라도 전체 배너는 자연스럽게 흘러가며, 다양한 텍스트 조합에도 **자동 보정**되어 UX를 해치지 않아요.

<br>

<p style="margin-top:0;"><strong>실무 팁</strong></p>

```javascript
// ❌ 모든 항목이 같은 시간에 보인다고 생각하면 안 돼요
// 실제로는 짧은 텍스트는 빨리, 긴 텍스트는 느리게 지나감

// ✅ 전체적인 흐름 속도를 조절하는 개념으로 접근
const displayTime = 2; // 평균적으로 각 항목이 2초간 노출
```

이런 특성 때문에 실제 프로젝트에서는 텍스트 길이를 어느 정도 맞춰주는 게 좋아요. 너무 길거나 짧은 항목이 섞여있으면 사용자가 읽기 어려울 수 있어요.

<br>

### 다양한 콘텐츠 타입 지원

```html
<!-- 아이콘 + 텍스트 조합 -->
<div class="flow_banner">
    <ul class="list">
        <li><i class="icon-sale"></i> 봄맞이 특가 세일 진행중</li>
        <li><i class="icon-gift"></i> 신규 가입시 적립금 5,000원</li>
        <li><i class="icon-truck"></i> 3만원 이상 무료배송</li>
    </ul>
</div>

<!-- 링크 포함 버전 -->
<div class="flow_banner">
    <ul class="list">
        <li><a href="/event1">🎉 봄맞이 특가 세일</a></li>
        <li><a href="/event2">🎁 신규 가입 혜택</a></li>
        <li><a href="/delivery">🚚 무료배송 안내</a></li>
    </ul>
</div>
```

<br>

### 고급 스타일링 옵션

```css
/* 그라데이션 배경 효과 */
.flow_banner {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 텍스트 그림자 효과 */
.flow_banner .list > li {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
}

/* 호버 시 텍스트 강조 */
.flow_banner .list > li:hover {
    color: #ffeb3b;
    transform: scale(1.05);
}
```

이런 스타일링은 브랜드 이미지에 맞게 자유롭게 조정하실 수 있어요.

<br>

## 흔한 문제와 해결책

실무에서 이 배너를 구현하면서 자주 마주치는 문제들과 해결 방법을 정리했어요.

<br>

### 1. 텍스트가 너무 길어서 속도가 느려지는 경우

```javascript
// ❌ 문제: 긴 텍스트로 인한 속도 저하
<li>아주아주아주아주긴텍스트가들어가면속도가너무느려집니다</li>

// ✅ 해결: 텍스트 길이 제한 또는 줄임표 처리
.flow_banner .list > li {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

<br>

### 2. 애니메이션이 끊기는 현상

```css
/* GPU 가속 활용 */
.flow_banner .list {
    will-change: transform;
    backface-visibility: hidden;
}

/* 부드러운 애니메이션 보장 */
@keyframes flowRolling {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
}
```

<br>

## 자주 묻는 질문 (FAQ)

### Q1. 배너 속도를 실시간으로 변경할 수 있나요?

네, 가능해요! 실제로 관리자 페이지에서 속도 조절 기능을 구현한 적이 있어요.

```javascript
function changeSpeed(newDisplayTime) {
    displayTime = newDisplayTime;
    flowBannerAct(); // 새로운 속도로 재시작
}

// 사용 예시
changeSpeed(1); // 빠른 속도
changeSpeed(3); // 느린 속도
```
<br>

### Q2. 수직으로 흐르는 배너도 만들 수 있나요?

물론이죠! 저는 주로 공지사항용으로 수직 배너를 많이 만들어요. 아래 링크를 참고해 주세요.

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/code/2024-01-05-vertical-banner/">jQuery - 아래에서 위로 흐르는 롤링 배너 (반응형)</a>
</div>

<br>

### Q3. 이미지가 포함된 배너에서 주의할 점은?

이미지는 로딩 시간 때문에 조심해야 해요. 저는 이런 방식으로 처리해요.

```javascript
// 이미지 로딩 완료 후 배너 시작
$wrap.find('img').on('load', function() {
    let loadedImages = 0;
    const totalImages = $wrap.find('img').length;
    
    loadedImages++;
    if (loadedImages === totalImages) {
        flowBannerAct(); // 모든 이미지 로딩 후 시작
    }
});
```

<br>

### Q4. SEO에 영향을 주나요?

텍스트 콘텐츠이기 때문에 검색엔진이 읽을 수 있어요. 하지만 중요한 정보는 다른 곳에도 배치하는 게 좋아요.

```html
<!-- SEO 친화적인 구조 -->
<div class="flow_banner" role="banner" aria-label="프로모션 정보">
    <ul class="list">
        <li>봄맞이 특가 세일 진행중</li>
        <li>신규 가입시 적립금 혜택</li>
    </ul>
</div>
```

<br>

### Q5. 접근성은 어떻게 개선할 수 있나요?

시각 장애인이나 움직임에 민감한 사용자를 위한 설정도 중요해요.

```javascript
// 사용자 설정에 따른 애니메이션 제어
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // 애니메이션 비활성화
    $wrap.find('.list').css('animation', 'none');
}
```

<br>

## 마무리

흐르는 롤링 배너는 웹사이트에 생동감을 더하는 훌륭한 UI 요소예요. 이 글에서 소개한 방법을 사용하면

- **끊김이 없는 자연스러운 흐름** 구현 가능
- **모든 화면 크기에서 일관된 사용자 경험** 제공
- **쉬운 유지보수와 콘텐츠 관리** 실현
- **성능 최적화된 안정적인 동작** 보장

<br>

이 배너를 어떤 프로젝트에 적용하셨나요? 구현하면서 어려웠던 점이나 개선 아이디어가 있으시면 댓글로 공유해주세요. 여러분의 실무 경험을 듣는 것도 저에게 큰 도움이 되거든요! 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-23-flow-banner/">예제결과 미리보기</a>
</div>


