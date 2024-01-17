---
title: >  
    jQuery - <details> 태그를 활용하여 아코디언 메뉴 만들기
description: >  
    <details> 태그를 활용하여 아코디언 메뉴를 만드는 방법과, jQuery를 사용하여 동적인 기능 및 슬라이드 효과를 추가하는 코드를 설명합니다. CSS를 통한 스타일링도 포함되어 있습니다.

slug: 2024-01-17-accordion-menu
date: 2024-01-17 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-17-accordion-menu.webp

categories:
    - jQuery
tags:
    - 아코디언 메뉴
---
아코디언 메뉴는 웹사이트에서 내용을 숨겼다가, 사용자의 명령에 따라 펼치거나 닫을 수 있는 컴포넌트입니다. 이러한 메뉴는 `<details>`와 `<summary>` HTML 태그를 활용하여 쉽게 구현할 수 있으며, jQuery와 CSS를 추가하여 스타일링을 적용할 수 있습니다. 이 글에서는 `<details>` 태그를 기반으로 한 아코디언 메뉴를 만드는 방법을 소개하고, jQuery를 사용하여 동적인 기능을 추가하는 코드를 설명합니다.  
<br>

## HTML 구조
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
* **아코디언 메뉴 컨테이너**
  - `accordion_menu` 클래스를 가진 `<div>` 태그는 아코디언 메뉴의 전체적인 컨테이너로서, 모든 메뉴 항목들을 감싸줍니다. 
  - CSS를 통해 스타일링이 적용되므로, 메뉴의 외형적 관리가 쉽습니다.

* **`<details>` 태그**
  - `<details>` 태그는 사용자가 클릭할 수 있는 메뉴 항목을 정의합니다. 
  - 이 태그는 기본적으로 접히고 펼쳐질 수 있는 기능이 있어, 아코디언 메뉴의 핵심 역할을 담당합니다.

* **`<summary>` 태그**
  - `<summary>` 태그는 `<details>` 안에 있으며, 메뉴 항목의 제목으로 사용됩니다.
  - 사용자가 클릭할 수 있는 부분으로, 이를 통해 해당 `<details>`의 내용을 펼치거나 접을 수 있습니다.

* **콘텐츠 구역**
  - 각 `<details>` 태그 내부에는 `<p>` 태그를 이용하여 실제로 펼쳐질 내용을 배치합니다.
  - `<p>` 태그는 `<summary>` 뒤에 있으며, 메뉴가 펼쳐졌을 때 보이는 세부 내용을 담고 있습니다.  
<br>

## CSS 스타일
```css
.accordion_menu { width: 500px; margin:0 auto; padding-bottom: 10px; background-color: #fff; border: 1px solid #f8f8f8; border-radius:6px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); } 
.accordion_menu details { display: block; padding: 10px;} 
.accordion_menu details summary { position: relative; padding: 10px 50px 10px 20px; background-color: #f5f5f5; border-radius: 6px; font-size: 16px; font-weight: 500; color: #333; cursor: pointer; list-style-type: none; } 
.accordion_menu details > summary::-webkit-details-marker {display: none;}
.accordion_menu details summary::before,
.accordion_menu details summary::after { content:''; position: absolute; top: 50%; right: 20px; width: 10px; height: 2px; background: #333; transform: translate(0,-50%); transition: all 0.3s; } 
.accordion_menu details summary::after {transform:translate(0,-50%) rotate(90deg);}
.accordion_menu details[open] summary::after { transform:translate(0,-50%) rotate(0); }
.accordion_menu details p { margin-top: 10px; font-size: 14px; color: #333; } 
```
* **아코디언 메뉴의 기본 스타일**
  - `accordion_menu` 클래스는 아코디언 메뉴 전체를 포함하는 컨테이너입니다.
  - 배경색, 테두리, 그림자를 적용하여 시각적인 강조를 표현합니다.
  - `<details>` 태그는 아코디언 메뉴의 각 항목을 담당합니다. 여기에 padding을 적용하여 콘텐츠 사이의 여백을 설정합니다.
  
* **`<summary>` 태그의 스타일**
  - 메뉴의 제목 역할을 하는 `<summary>` 태그에는 배경색, 크기, 글꼴 스타일을 적용합니다.
  - `<summary>`에 있는 기본 마커(화살표)를 숨기고, 가상 요소(`::before`, `::after`)를 사용하여 커스텀 화살표를 만듭니다.
  - 화살표는 `<details>` 태그가 열려 있을 때와 닫혀 있을 때의 상태 변화를 나타내도록 회전 효과를 부여합니다.

* **`<p>` 태그의 스타일**
  - `<details>` 내부의 내용을 담고 있는 `<p>` 태그에는 크기와 색상을 적용합니다.  

HTML과 CSS만으로도 열고 닫히는 기본적인 메뉴를 구현할 수 있습니다. 더 다양한 기능을 원한다면 아래의 jQuery 코드를 추가할 수 있습니다.  
<br>

## jQuery 코드
### 하나의 아코디언 메뉴만 펼치기
```js
// 하나만 펼쳐지는 아코디언 메뉴
$('.accordion_menu summary').on('click', function() {
    const $details = $(this).parent();
    $details.siblings('details').removeAttr('open');
});
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

- jQuery의 `.on('click', ...)` 이벤트를 사용해 `<summary>` 태그를 클릭했을 때의 동작을 정의합니다.
- 현재 클릭된 `.accordion_menu details` 외의 모든 `<details>` 태그는 'open' 속성을 제거하여 자동으로 닫히도록 합니다.  
<br>

### 슬라이드 효과 추가하기
```css
/* 
.accordion_menu details[open] summary::after { transform:translate(0,-50%) rotate(0); } 
*/
.accordion_menu details.open summary::after { transform:translate(0,-50%) rotate(0); } 
```
CSS를 수정해야 합니다. 주석 처리된 CSS를 삭제하고 아래에 제공된 CSS 코드를 추가해주세요.

```js
//슬라이드 효과 추가
$('.accordion_menu details').attr('open', true).each(function() {
    const $summary = $(this).find('summary');
    $summary.nextAll().wrapAll('<div class="con"></div>').parent().hide();
    $summary.on('click', function(e) {
        e.preventDefault();
        $(this).next('.con').slideToggle();
        $(this).parent().toggleClass('open');
    });
});
```
- 각 `<details>` 태그 내부의 내용을 `<div class="con"></div>`으로 감싸고, 처음에는 숨겨둡니다(`.hide()`).
- `<summary>`를 클릭하면 해당 `.con` 요소 내용이 슬라이드 다운(`.slideToggle()`)되며 보입니다.
- `.toggleClass('open')` 메소드를 이용하여 열렸는지의 상태를 클래스로 토글합니다.  
<br>

### 아코디언 메뉴와 슬라이드 효과 결합하기
```css
/* 
.accordion_menu details[open] summary::after { transform:translate(0,-50%) rotate(0); } 
*/
.accordion_menu details.open summary::after { transform:translate(0,-50%) rotate(0); } 
```
CSS를 수정해야 합니다. 주석 처리된 CSS를 삭제하고 아래에 제공된 CSS 코드를 추가해주세요.

```js
// 아코디언 메뉴 + 슬라이드 효과 추가
$('.accordion_menu details').attr('open', true).each(function() {
    const $summary = $(this).find('summary');
    $summary.nextAll().wrapAll('<div class="con"></div>').parent().hide();
    $summary.on('click', function(e) {
        e.preventDefault();
        $(this).next('.con').slideToggle().parent().siblings().find('.con').slideUp();
        $(this).parent().toggleClass('open').siblings().removeClass('open');
    });
});
```
- `<summary>`가 클릭 되면, 해당 메뉴 내용은 슬라이드 다운되고, 다른 모든 메뉴의 내용은 슬라이드 업(`.slideUp()`)되어 닫힙니다.
- 이를 위해 `.next('.con').slideToggle()`을 호출한 후 `.parent()` 메소드로 상위 태그를 선택하고 `.siblings()` 메소드로 형제 요소들을 찾아 `.slideUp()`을 적용합니다.
- 클래스 'open'을 토글링 함으로써 어떤 메뉴가 현재 열려 있는지 사용자에게 명확하게 표시할 수 있습니다.  
<br>

## 결론
`<details>` 태그와 jQuery를 활용하면, 아코디언 메뉴를 간단하게 구현할 수 있습니다. jQuery를 사용하면 각 메뉴가 열리거나 닫히는 상태를 세밀하게 제어할 수 있고, 애니메이션과 같은 시각적인 효과를 추가할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-17-accordion-menu/" target="_blank">예제결과 미리보기</a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details/" target="_blank">[참고문서] &lt;details&gt;: The Details disclosure element</a>
</div>
