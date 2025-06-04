---
title: CSS - 체크박스, 라디오버튼 커스텀
description: >  
    CSS를 사용하여 체크박스와 라디오버튼을 커스텀하는 방법입니다.
slug: 2023-11-13-checkbox-custom
date: 2023-11-13 00:00:00+0000
lastmod: 2023-11-13 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-13-checkbox-custom.webp

categories:
    - CSS
tags:
    - 입력 태그 커스텀
---
웹 디자인 및 개발 프로젝트에서, 체크박스와 라디오버튼은 사용자 인터페이스(UI) 요소 중 자주 활용되는 요소입니다. 그러나 기본적인 스타일링만으로는 디자인적으로 제한이 있을 수 있습니다. 이 글에서는 CSS를 사용하여 체크박스와 라디오버튼을 커스텀하는 방법을 자세히 살펴보겠습니다.  

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

## HTML 구조
체크박스와 라디오버튼을 커스텀하기 위한 HTML 구조입니다.
```html
<!-- 체크박스 커스텀 -->
<label class="checkbox_cus">
    <input type="checkbox">
    <span class="mark"></span>
    체크박스 커스텀
</label>

<!-- 라디오버튼 커스텀 -->
<label class="radio_cus">
    <input type="radio" name="radio" checked>
    <span class="mark"></span>
    라디오버튼 커스텀
</label>

<label class="radio_cus">
    <input type="radio" name="radio">
    <span class="mark"></span>
    라디오버튼 커스텀
</label>
```
* **체크박스 커스텀**  
  * &lt;label&gt; 요소  
  체크박스를 설명하는 라벨을 감싸는 요소입니다. 라벨은 사용자가 체크박스를 누를 때 체크박스를 선택할 수 있도록 도와줍니다.

  * checkbox_cus 클래스  
  라벨에 적용된 CSS 클래스로, 이 클래스는 체크박스를 커스텀하는데 사용됩니다.

  * &lt;input type="checkbox"&gt;   
  실제 체크박스 입력 요소입니다. 사용자가 체크박스를 선택 또는 선택 해제할 수 있는 영역입니다.  

  * mark 클래스     
  체크박스의 커스텀 스타일을 나타내는 요소입니다. 이 요소는 CSS를 사용하여 디자인된 배경 이미지와 스타일을 가지고 있습니다.

* **라디오버튼 커스텀**
  * 라디오버튼 커스텀은 체크박스와 유사하지만, 여러 라디오버튼 중 하나만 선택될 수 있도록 그룹화된 것을 나타냅니다. name="radio" 속성을 사용하여 같은 그룹 내에서 선택할 수 있는 라디오버튼을 구별합니다.  

  * 이 예제에서는 두 개의 라디오버튼이 제공됩니다. 하나는 초기에 선택된 상태이고(checked), 다른 하나는 선택되지 않은 상태입니다.   

  * 나머지 구조는 체크박스와 유사하며, 라벨, 커스텀 스타일링을 위한 &lt;span&gt; 요소(mark 클래스)를 포함합니다.  


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

## 체크박스 커스텀 CSS 스타일
```css
/* 체크박스 커스텀 */
.checkbox_cus { display: inline-flex; align-items:flex-start; position: relative; font-size: 16px; cursor: pointer; } 
.checkbox_cus input[type="checkbox"] { overflow: hidden; position: absolute; width: 1px; height: 1px; margin: -1px; font-size: initial; clip: rect(0 0 0 0); } 
.checkbox_cus .mark { width: 16px; height: 16px; margin-top: 5px; margin-right: 8px; background:url('check.png') center center no-repeat; background-size: contain; } 
.checkbox_cus input[type="checkbox"]:checked ~ .mark { background-image: url('check_on.png'); } 
```
* **.checkbox_cus (체크박스 커스텀 클래스)**  
  * 체크박스와 라벨(Label) 요소를 커스텀 디자인으로 연동하는 역할을 합니다.  
  * 사용자가 체크박스를 클릭하면 실제 체크박스의 상태를 변경합니다.

* **.checkbox_cus input[type="checkbox"] (체크박스 숨김 클래스)**
  * 실제 체크박스를 화면에서 감추는 역할을 합니다.
  * 사용자에게는 보이지 않지만, 라벨 요소를 클릭하면 이 요소가 체크박스를 대신하여 동작합니다.

* **.checkbox_cus .mark (체크박스 커스텀 마크 클래스)**  
  * 커스텀 체크박스 모양을 정의합니다.
  * 체크박스 대신에 이 요소가 시각적으로 나타납니다.
  * 체크박스의 선택 상태를 시각적으로 나타내기 위한 디자인을 가집니다.

* **.checkbox_cus input[type="checkbox"]:checked ~ .mark (체크박스 커스텀 선택 스타일 클래스)**
  * 체크박스가 선택된 경우에 대한 스타일을 정의합니다.
  * 체크박스가 선택되면 커스텀 디자인의 배경 이미지를 변경하여 선택된 상태를 나타냅니다.  
<br>

## 라디오버튼 커스텀 CSS 스타일
```css
/* 라디오버튼 커스텀 */
.radio_cus { display: inline-flex; align-items:flex-start; position: relative; font-size: 16px; cursor: pointer; } 
.radio_cus input[type="radio"] { overflow: hidden; position: absolute; width: 1px; height: 1px; margin: -1px; font-size: initial; clip: rect(0 0 0 0); } 
.radio_cus .mark { width: 16px; height: 16px; margin-top: 5px; margin-right: 8px; background: #fff; border: 1px solid #ddd; border-radius:50%; } 
.radio_cus input[type="radio"]:checked ~ .mark { position: relative; border-color: #000; } 
.radio_cus input[type="radio"]:checked ~ .mark:after { content:''; position: absolute; top: 50%; left: 50%; width: 10px; height: 10px; background: #000; border-radius:50%; transform: translate(-50%,-50%); } 
```
* **.radio_cus (라디오버튼 커스텀 클래스)**
  * 라디오버튼과 라벨(Label) 요소를 커스텀 디자인으로 연동하는 역할을 합니다.
  * 사용자가 라디오버튼을 클릭하면 실제 라디오버튼의 상태를 변경합니다.

* **.radio_cus input[type="radio"] (라디오버튼 숨김 클래스)**
  * 실제 라디오버튼을 화면에서 감추는 역할을 합니다.
  * 사용자에게는 보이지 않지만, 라벨 요소를 클릭하면 이 요소가 라디오버튼을 대신하여 동작합니다.

* **.radio_cus .mark (라디오버튼 커스텀 마크 클래스)**
  * 커스텀 라디오버튼 모양을 정의합니다.
  * 라디오버튼 대신에 이 요소가 시각적으로 나타납니다.
  * 라디오버튼의 선택 상태를 시각적으로 나타내기 위한 디자인을 가집니다.

* **.radio_cus input[type="radio"]:checked ~ .mark (라디오버튼 커스텀 선택 스타일 클래스)**
  * 라디오버튼이 선택된 경우에 대한 스타일을 정의합니다.
  * 라디오버튼이 선택되면 커스텀 디자인의 테두리 색상을 변경하고 선택된 상태를 시각적으로 나타냅니다.
  * 가상 요소(::after)를 사용하여 작은 원을 중앙에 추가하여 선택된 상태를 강조합니다.  
<br>

## 결론
이 글에서는 CSS를 사용하여 체크박스와 라디오버튼을 커스텀하는 방법을 자세히 알아보았습니다. 체크박스와 라디오버튼을 커스텀하면 웹 페이지의 디자인을 개선하고 사용자 경험을 더욱 향상시킬 수 있습니다. 위의 코드와 설명을 참고하여 직접 체크박스와 라디오버튼을 디자인해 보세요.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-13-checkbox-custom/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-11-14-checkbox-toggle/">[관련글] CSS - 토글 스위치 만들기</a>
</div>
