---
title: >  
    jQuery 하단 플로팅 배너 코드 예제, 푸터 가림 현상 완벽 해결

description: >  
    jQuery로 하단 플로팅 배너를 구현할 때 컨테이너를 벗어나지 않게 하는 방법을 배워보세요. 스크롤 위치에 따라 position을 동적으로 변경하는 실무 기법과 반응형 처리까지 완벽 가이드입니다.
    
slug: 2025-07-14-bottom-sticky
date: 2025-07-14 00:00:00+0000
lastmod: 2025-07-14 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-14-bottom-sticky.webp

categories:
    - jQuery
tags:
    - sticky
    - 고정 요소
    - 스크롤 이벤트

---

웹 페이지에서 하단에 고정되는 요소를 만들다 보면 "어? 이 요소가 페이지 끝까지 계속 따라다니네?"라는 문제를 겪어본 적 있으실 거예요. 특히 푸터나 다른 섹션을 가리는 상황이 발생하죠.

저도 처음에는 단순히 `position: fixed; bottom: 0;`만 써서 하단 고정을 구현했는데, 사용자가 스크롤을 끝까지 내렸을 때 중요한 콘텐츠를 가리는 문제가 있었어요. 그때 깨달은 것이 "특정 영역 내에서만 고정되는 방법"이 필요하다는 점이었습니다.

이 글에서는 jQuery를 사용해서 컨테이너 내에서만 하단에 고정되는 플로팅 배너를 만드는 방법을 알려드릴게요. 스크롤 위치에 따라 position 속성을 동적으로 변경하는 핵심 로직부터 반응형 처리까지, 실제 코드 예제와 함께 단계별로 살펴봅니다.

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-07-14-bottom-sticky/">예제결과 미리보기</a>
</div>

<br>

## jQuery 하단 플로팅 배너란?

<strong>jQuery 하단 플로팅 배너(Bottom Floating Banner)</strong>는 스크롤 위치에 따라 뷰포트 하단에 고정되다가, 지정된 컨테이너 영역을 벗어나지 않도록 position 속성을 동적으로 변경하는 기법입니다. 일반적인 `position: fixed`와 달리 특정 영역 내에서만 고정되어 다른 콘텐츠를 가리지 않습니다.  

<br>

## 왜 컨테이너 내 고정 요소가 필요할까?

실제 프로젝트에서는 단순한 하단 고정보다는 더 섬세한 제어가 필요해요. 예를 들어

- **쇼핑몰**: 상품 상세 페이지에서 구매 버튼이 관련 상품 영역까지만 고정되어야 할 때
- **블로그**: 공유 버튼이 본문 영역에서만 보이고 댓글 섹션에서는 사라져야 할 때
- **랜딩 페이지**: CTA 버튼이 특정 섹션에서만 활성화되어야 할 때

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

## 하단 플로팅 배너 구현하기

### 1. 기본 HTML 구조 만들기

먼저 컨테이너와 고정 요소의 기본 구조를 만들어보겠습니다.

```html
<div class="container">
    <div class="bottom_sticky">
        이 요소는 컨테이너 내에서만 하단에 고정됩니다!
    </div>
</div>
<footer></footer>
```

<br>

### 2. CSS 스타일링 적용하기

고정 요소와 컨테이너에 필요한 스타일을 정의합니다.

```css
.container { 
    position: relative; 
    min-height: 150vh; 
    border: 2px solid #ddd; 
    margin: 20px auto; 
    max-width: 800px; 
    overflow: hidden; 
}
.bottom_sticky { 
    position: fixed; 
    right: 0; 
    bottom: 30px; 
    left: 50%; 
    width: 500px;
    height: 60px; 
    max-width:100%;
    transform: translate(-50%,0);
    background: #007bff; 
    color: white; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    font-weight: bold; 
    z-index: 100; 
}
footer { 
    height: 80px; 
    background: #333; 
}
```

**주요 CSS 포인트:**
- `container`에 `position: relative` 설정 → 고정 요소의 기준점 역할
- `bottom_sticky`에 `position: fixed` 초기 설정 → jQuery로 동적 변경
- `z-index: 100` → 다른 요소 위에 표시
- `transform: translate(-50%,0)` → 가운데 정렬

<br>

### 3. 전체 jQuery 코드

복사해서 바로 사용할 수 있는 완전한 jQuery 코드입니다.

```javascript
// 하단 플로팅 배너 초기화 함수
function initBottomSticky() {
    const $apply = $('.bottom_sticky');
    const $wrap = $('.container');
    let rafId = null;
    
    // 플로팅 배너의 위치를 업데이트하는 함수
    function updatePosition() {
        if ($apply.length && $wrap.length) {
            const wrapOffset = $wrap.offset().top;
            const wrapHeight = $wrap.outerHeight();
            const scrollPosition = $(window).scrollTop();
            const windowHeight = window.innerHeight;
            const wrapBottom = wrapOffset + wrapHeight;
            const currentBottom = scrollPosition + windowHeight;
            
            // 컨테이너 영역에 따라 position 속성 변경
            const cssProperties = {
                'position': currentBottom >= wrapBottom ? 'absolute' : 'fixed',
            };
            $apply.css(cssProperties);
        }
    }
    
    // 컨테이너에 패딩을 추가하는 함수
    function updatePadding() {
        if ($apply.length && $wrap.length) {
            const windowWidth = $(window).width();
            const paddingValue = windowWidth >= 768 ? 80 : 40;
            const applyHeight = $apply.outerHeight() + paddingValue;
            $wrap.css('padding-bottom', applyHeight + 'px');
        }
    }
    
    // 성능 최적화된 스크롤 업데이트 함수
    function optimizedUpdate() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(updatePosition);
    }
    
    // 스크롤 이벤트 (requestAnimationFrame으로 최적화)
    $(window).on('scroll', optimizedUpdate);
    
    // 리사이즈 이벤트
    $(window).on('resize', function() {
        updatePadding();
        updatePosition();
    });

    // 페이지 로드 이벤트
    $(window).on('load', function() {
        updatePadding();
        updatePosition();
    });
}

// DOM 준비 완료 후 실행
$(document).ready(function() {
    initBottomSticky();
});
```

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

### 4. 단계별 코드 설명

이제 위 코드를 단계별로 자세히 살펴보겠습니다.

<br>

#### 4-1. 핵심 위치 계산 로직

```javascript
function updatePosition() {
    if ($apply.length && $wrap.length) {
        const wrapOffset = $wrap.offset().top; // 컨테이너 상단 위치
        const wrapHeight = $wrap.outerHeight(); // 컨테이너 높이
        const scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치
        const windowHeight = window.innerHeight; // 뷰포트 높이
        const wrapBottom = wrapOffset + wrapHeight; // 컨테이너 하단 위치
        const currentBottom = scrollPosition + windowHeight; // 뷰포트 하단 위치
        
        // 컨테이너 영역에 따라 position 속성 변경
        const cssProperties = {
            'position': currentBottom >= wrapBottom ? 'absolute' : 'fixed',
        };
        $apply.css(cssProperties);
    }
}
```

**핵심 로직 설명:**
- `wrapOffset + wrapHeight`: 컨테이너의 하단 절대 위치 계산
- `scrollPosition + windowHeight`: 현재 뷰포트의 하단 위치 계산
- 뷰포트 하단이 컨테이너 하단보다 아래에 있으면 `absolute`로 변경
- 그렇지 않으면 `fixed`로 유지하여 화면 하단에 고정

<br>

#### 4-2. 반응형 패딩 처리

```javascript
function updatePadding() {
    if ($apply.length && $wrap.length) {
        const windowWidth = $(window).width();
        const paddingValue = windowWidth >= 768 ? 80 : 40; // 데스크톱/모바일 구분
        const applyHeight = $apply.outerHeight() + paddingValue;
        $wrap.css('padding-bottom', applyHeight + 'px');
    }
}
```

**패딩 처리 이유:**
- 고정 요소가 컨테이너 내용을 가리지 않도록 하단 여백 확보
- 데스크톱(768px 이상)과 모바일에서 다른 패딩 값 적용
- 고정 요소의 높이를 동적으로 계산하여 정확한 여백 설정

<br>

#### 4-3. 성능 최적화된 스크롤 처리

```javascript
// 성능 최적화된 스크롤 업데이트 함수
function optimizedUpdate() {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(updatePosition);
}

// 스크롤 이벤트 (requestAnimationFrame으로 최적화)
$(window).on('scroll', optimizedUpdate);
```

**성능 최적화 이유:**
- `requestAnimationFrame`: 브라우저의 화면 주사율에 맞춰 실행 (보통 60fps)
- 모바일에서 스크롤 시 발생하는 끊김과 떨림 현상 방지
- 탭이 비활성화되면 자동 중단되어 배터리 절약
- `cancelAnimationFrame`: 중복 실행 방지로 더욱 안정적인 성능 확보

<br>

## 동작 원리 상세 분석

### 핵심 계산 로직

하단 플로팅 배너가 똑똑하게 동작하는 핵심은 다음 계산에 있어요.

| 변수 | 설명 | 계산 방법 |
|------|------|----------|
| `wrapOffset` | 컨테이너 상단 위치 | `$wrap.offset().top` |
| `wrapBottom` | 컨테이너 하단 위치 | `wrapOffset + wrapHeight` |
| `currentBottom` | 뷰포트 하단 위치 | `scrollPosition + windowHeight` |

**판단 기준:**
- `currentBottom >= wrapBottom` → `position: absolute` (컨테이너 내 고정)
- `currentBottom < wrapBottom` → `position: fixed` (뷰포트 하단 고정)

<br>

## 주의사항

1. **jQuery 버전**: 3.6.4 이상 권장
2. **모바일 최적화**: 터치 스크롤 시 성능 고려 필요
3. **Z-index 관리**: 다른 고정 요소와의 층위 관리 중요

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

## 실무 적용 팁

제가 실제 프로젝트에서 사용하면서 얻은 노하우를 공유해드릴게요.

1. **초기 로딩 시 깜빡임 방지**: CSS에서 `visibility: hidden`으로 설정하고 JavaScript에서 `visibility: visible`로 변경
2. **모바일 Safari 대응**: `window.innerHeight` 사용 권장 (주소창 변화 시 더 정확한 뷰포트 높이 측정)
3. **성능 최적화**: 스크롤 이벤트에 requestAnimationFrame 적용
4. **접근성 고려**: 키보드 탐색 시에도 고정 요소가 적절히 동작하는지 확인

<br>

## 자주 묻는 질문 (FAQ)

### Q1: 여러 페이지에서 이 코드를 재사용하려면?

`initBottomSticky()` 함수를 별도 JS 파일로 분리하고, HTML 구조만 동일하게 맞춰주면 됩니다. 클래스명(`.container`, `.bottom_sticky`)을 일관되게 사용하는 것이 중요해요.  

<br>

### Q2: 플로팅 배너의 디자인을 바꾸고 싶어요

CSS의 `.bottom_sticky` 클래스를 수정하면 됩니다. 단, `position` 같은 핵심 속성은 JavaScript에서 동적으로 변경되므로 건드리지 마세요. `background`, `color`, `border-radius`, `box-shadow` 같은 시각적 속성만 수정하는 것이 안전합니다.

<br>

## 마무리

jQuery를 사용한 하단 플로팅 배너 구현의 핵심 포인트를 정리해 보면

- **스크롤 위치 계산**: 뷰포트 하단과 컨테이너 하단 위치 비교
- **동적 position 변경**: fixed와 absolute 사이의 적절한 전환
- **반응형 대응**: 디바이스별 패딩 값 조정
- **성능 최적화**: requestAnimationFrame을 통한 스크롤 이벤트 최적화

실제로 이런 기법들을 적용하면 사용자 경험이 훨씬 좋아져요. 오늘 배운 내용으로 간단한 상품 상세 페이지를 만들어보시거나, 블로그 공유 버튼을 구현해 보세요!

여러분의 jQuery 하단 플로팅 배너 구현 경험은 어떠셨나요? 특별한 요구사항이나 해결한 문제가 있다면 댓글로 공유해 주세요! 😊

<br>