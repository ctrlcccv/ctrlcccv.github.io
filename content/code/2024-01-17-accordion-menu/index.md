---
title: >  
    <details> 태그로 쉽게 구현하는 아코디언 메뉴 (CSS/jQuery)
description: >  
    HTML5 <details> 태그로 아코디언 메뉴를 쉽게 만들고, jQuery와 CSS로 부드러운 애니메이션과 스타일을 적용하는 방법을 소개합니다.

slug: 2024-01-17-accordion-menu
date: 2024-01-17 00:00:00+0000
lastmod: 2025-04-28 00:00:00+0000

alternates:
  - title: "<details> 태그로 쉽게 구현하는 아코디언 메뉴 (CSS/jQuery)"
    href: "https://ctrlcccv.github.io/code/2024-01-17-accordion-menu/"
    hreflang: "ko"
  - title: "Simple <details> Accordion: CSS (Optional jQuery)"
    href: "https://ctrlcccv.github.io/code-en/2025-04-30-accordion-menu/"
    hreflang: "en"

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-17-accordion-menu.webp

categories:
    - jQuery
tags:
    - 아코디언 메뉴
---

아코디언 메뉴, 쉽게 만들고 싶지 않으신가요?

웹사이트를 만들다 보면 자주 필요한 아코디언 메뉴! 사실 복잡한 스크립트 없이도 충분히 구현할 수 있습니다.  
HTML5의 `<details>` 태그를 이용하면 기본적인 열기/닫기 기능은 아주 쉽게 만들 수 있고, 필요하다면 jQuery를 활용하여 부드러운 애니메이션이나 디테일한 제어도 추가할 수 있습니다.

이 글에서는  
**기본 아코디언 → 문제점 살펴보기 → jQuery로 개선 → CSS로 스타일링 → jQuery 없이 CSS만으로 개선**  
이런 흐름으로 하나하나 차근차근 설명해 드리겠습니다.  

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

## 빠르게 만드는 기본형

먼저 HTML만으로 아주 간단한 아코디언 메뉴를 만들어봅시다.

```html
<div class="accordion_menu">
    <details>
        <summary>메뉴 1</summary>
        <p>메뉴 1의 내용입니다.</p>
    </details>
    <details>
        <summary>메뉴 2</summary>
        <p>메뉴 2의 내용입니다.</p>
    </details>
    <details>
        <summary>메뉴 3</summary>
        <p>메뉴 3의 내용입니다.</p>
    </details>
</div>
```
이렇게만 작성해도 클릭 시 메뉴가 열리고 닫히는 기본적인 아코디언 기능을 사용할 수 있습니다.  

<br>

## `<details>` 태그의 한계점

하지만 기본 `<details>` 태그에는 이런 한계가 있습니다.

- 여러 메뉴가 동시에 열립니다.
- 슬라이드처럼 부드럽게 열리거나 닫히지 않습니다.
- 브라우저마다 기본 아이콘이 다르고, 커스터마이징이 어렵습니다.  

사용자가 더 편리하고 쾌적하게 메뉴를 이용할 수 있도록 개선이 필요합니다.

<br>

## 업그레이드 1 : jQuery로 하나만 열리게 만들기

클릭한 메뉴 하나만 열리고, 나머지는 자동으로 닫히게 만들어볼까요?

```javascript
// 하나만 열리도록 제어
$('.accordion_menu summary').on('click', function() {
    const $details = $(this).parent(); // 현재 클릭한 summary의 부모 details 찾기
    $details.siblings('details').removeAttr('open'); // 다른 열린 메뉴 닫기
});
```
사용자가 새로운 메뉴를 클릭하면, 이전에 열려 있던 메뉴는 자동으로 닫히게 됩니다.  
이 스크립트를 사용할 경우, [[open] 속성을 활용한 스타일 적용 방법](/code/2024-01-17-accordion-menu/#jquery-없이-css만으로-열림닫힘-상태-표현하기)을 참고해주세요.

<br>

## 업그레이드 2 : 슬라이드 애니메이션 추가하기

이번에는 메뉴가 부드럽게 열리고 닫히는 슬라이드 애니메이션을 추가해봅시다.

```javascript
// 슬라이드 애니메이션 추가
$('.accordion_menu details').attr('open', true).each(function() {
    const $summary = $(this).find('summary');
    $summary.nextAll().wrapAll('<div class="con"></div>').parent().hide(); // 내용을 감싸고 숨김
    // summary 클릭 시 슬라이드 효과 적용
    $summary.on('click', function(e) {
        e.preventDefault(); // 기본 이벤트 막기
        $(this).next('.con').slideToggle(); // 슬라이드 전환
        $(this).parent().toggleClass('open'); // open 클래스 토글
    });
});
```
클릭하면 `slideToggle()` 기능으로 자연스럽게 메뉴가 펼쳐지고 접히는 효과를 볼 수 있습니다.

<br>

## 업그레이드 3 : 슬라이드 애니메이션과 하나만 열리는 아코디언 메뉴

이번에는 메뉴가 부드럽게 열리고 닫히면서, 한 번에 하나의 메뉴만 열리도록 기능을 개선해봅시다.

```javascript
// 아코디언 메뉴 + 슬라이드 효과
$('.accordion_menu details').attr('open', true).each(function() {
    const $summary = $(this).find('summary');
    $summary.nextAll().wrapAll('<div class="con"></div>').parent().hide(); // 내용을 감싸고 숨김
    $summary.on('click', function(e) { 
        e.preventDefault(); // 기본 동작 방지
        $(this).next('.con').slideToggle() // 내용 슬라이드 토글
            .parent().siblings().find('.con').slideUp(); // 다른 내용은 슬라이드 업
        $(this).parent().toggleClass('open') // 'open' 클래스 토글
            .siblings().removeClass('open'); // 다른 항목의 'open' 클래스 제거
    });
});
```

이 코드로 구현하면, 사용자가 하나의 메뉴를 클릭할 때마다 그 메뉴만 부드럽게 열리고, 이미 열린 다른 메뉴는 자동으로 닫히게 됩니다.  

<br>

## 아코디언 메뉴 스타일링 다듬기

이제 스타일을 다듬어 더 깔끔한 UI로 만들어봅시다.

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


```css
.accordion_menu { 
    width: 500px; 
    margin: 0 auto; 
    padding-bottom: 10px; 
    background-color: #fff; 
    border: 1px solid #f8f8f8; 
    border-radius: 6px; 
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); 
}

.accordion_menu details { 
    display: block; 
    padding: 10px;
} 

.accordion_menu details summary { 
    position: relative; 
    padding: 10px 50px 10px 20px; 
    background-color: #f5f5f5; 
    border-radius: 6px; 
    font-size: 16px; 
    font-weight: 500; 
    color: #333; 
    cursor: pointer; 
    list-style-type: none; 
} 

/* 기본 화살표 아이콘 숨김 */
.accordion_menu details > summary::-webkit-details-marker {
    display: none; 
}

.accordion_menu details summary::before,
.accordion_menu details summary::after { 
    content: ''; 
    position: absolute; 
    top: 50%; 
    right: 20px; 
    width: 10px; 
    height: 2px; 
    background: #333; 
    transform: translate(0, -50%); 
    transition: all 0.3s;
} 

/* 닫힌 상태 화살표 */
.accordion_menu details summary::after {
    transform: translate(0, -50%) rotate(90deg); 
}

/* 열린 상태 화살표 */
.accordion_menu details.open summary::after {
    transform: translate(0, -50%) rotate(0);
}

.accordion_menu details p { 
    margin-top: 10px; 
    font-size: 14px; 
    color: #333; 
} 
```

메뉴가 열릴 때 화살표가 자연스럽게 회전하는 모습을 볼 수 있습니다.

<br>

## jQuery 없이 CSS만으로 열림/닫힘 상태 표현하기

jQuery 없이, 오직 HTML과 CSS만으로 열림/닫힘 상태를 제어하는 방법도 가능합니다.

### `[open]` 속성 활용하기

`details` 요소는 열려 있을 때 자동으로 `open` 속성이 붙습니다.  
이걸 CSS에서 활용하면 상태에 따라 다른 스타일을 줄 수 있습니다.

```css
.accordion_menu details[open] summary::after {
    transform: translateY(-50%) rotate(0deg);
}
```
- 기본 상태에서는 after 가상 요소를 90도 회전시켜 플러스(+) 모양을 표시합니다.
- 메뉴가 열리면 ([open] 속성 추가) after 요소가 0도로 회전하며 마이너스(-) 모양으로 바뀝니다.

**추가로 알아두면 좋은 점**  
- `[open]` 속성은 사용자가 메뉴를 열거나 닫을 때 브라우저가 자동으로 추가하거나 제거합니다.
- 별도 스크립트 없이도 열린 상태를 감지할 수 있어 매우 편리합니다.

<br>

## 결론

HTML과 CSS, jQuery를 적절히 조합하면 누구나 쉽게, 그리고 멋지게 아코디언 메뉴를 완성할 수 있습니다.  
궁금한 점이나 추가하고 싶은 기능이 있다면 언제든 댓글로 편하게 남겨주세요! 🙌  
최대한 빠르게 답변드리겠습니다.  

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-17-accordion-menu/" target="_blank">예제결과 미리보기</a>
    <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Reference/Elements/details" target="_blank">[참고문서] &lt;details&gt;: The Details disclosure element</a>
</div>
