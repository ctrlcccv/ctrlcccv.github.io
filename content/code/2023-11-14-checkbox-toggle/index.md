---
title: CSS - 토글 스위치 만들기
description: >  
    CSS를 사용하여 토글 스위치를 만드는 방법입니다.
slug: 2023-11-14-checkbox-toggle
date: 2023-11-14 00:00:00+0000
lastmod: 2023-11-14 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-14-checkbox-toggle.webp

categories:
    - CSS
tags:
    - 입력 태그 커스텀
---
토글 스위치는 웹 사이트나 애플리케이션에서 특정 기능이나 설정을 활성화하거나 비활성화하는 데 일반적으로 사용됩니다. 이 글에서는 CSS를 사용하여 직관적으로 상호 작용할 수 있는 토글 스위치 만드는 방법을 살펴보겠습니다.  

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
```html
<label class="toggle_switch">
    <input type="checkbox">
    <span class="slider"></span>
</label>
```
* **&lt;label class="toggle_switch"&gt;**   
이 &lt;label&gt; 요소는 토글 스위치의 컨테이너로 작동합니다. HTML 폼에서 주로 사용되는 레이블은 연관된 폼 컨트롤에 대한 텍스트 설명 또는 레이블을 제공하는 데 사용됩니다. 스타일링 목적으로 "toggle_switch" 클래스가 지정됩니다.

* **<input type="checkbox"&gt;**   
레이블 내부에는 type="checkbox"를 가진 &lt;input&gt; 요소가 있습니다. 사용자가 상호 작용할 수 있는 실제 체크박스 입력 컨트롤입니다. 선택한 경우 "활성화" 상태를 표시하고 선택을 해제한 경우 "비활성화" 상태를 나타냅니다.

* **&lt;span class="slider"&gt;**   
"slider" 클래스를 가진 &lt;span&gt; 요소는 토글 스위치의 시각적 모습을 나타냅니다. 이 부분은 사용자가 체크박스의 상태를 클릭하여 조작할 수 있습니다. 이 요소는 체크박스가 선택된 경우 "활성화" 위치를 나타내기 위해 시각적으로 왼쪽에서 오른쪽으로 슬라이드 됩니다.  

<br>

## CSS 스타일
```css
.toggle_switch { display: inline-block; position: relative; width: 70px; height: 34px; } 
.toggle_switch input[type="checkbox"] { overflow: hidden; position: absolute; width: 1px; height: 1px; margin: -1px; font-size: initial; clip: rect(0 0 0 0); } 
.toggle_switch .slider { position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: #ccc; border-radius: 34px; cursor: pointer; transition: 0.4s; } 
.toggle_switch input[type="checkbox"]:checked + .slider { background-color: #007bff; } 
.toggle_switch .slider::before { content: ""; position: absolute; top: 4px; left: 4px; width: 26px; height: 26px; background-color: #fff; border-radius: 50%; transition: 0.4s; } 
.toggle_switch input[type="checkbox"]:checked + .slider::before { transform:translateX(36px); } 
```



<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


* **.toggle_switch**   
**(토글 스위치 컨테이너 스타일링)**
  * 컨테이너를 인라인 블록 요소로 만듭니다.
  * 너비와 높이를 설정합니다.
  * 상대적인 위치 설정을 허용합니다.

* **.toggle_switch input[type="checkbox"]**   
**(체크박스 입력 요소 숨김)**  
  * 실제 체크박스 입력 요소를 매우 작게 만들고 화면 바깥으로 숨깁니다.
  * 체크박스의 기능을 유지하면서 숨겨진 상태를 유지합니다.

* **.toggle_switch .slider**   
**(토글 스위치 스타일링)**  
  * 토글 스위치를 나타내는 슬라이더 요소를 생성합니다.
  * 스위치를 컨테이너에 꽉 차도록 설정합니다. 
  * 기본 배경색을 설정하고 모서리를 둥글게 만듭니다.
  * 마우스 커서를 포인터로 변경하여 클릭 가능한 요소임을 나타냅니다.
  * 부드러운 전환 효과를 추가합니다.

* **.toggle_switch input[type="checkbox"]:checked + .slider**  
**(체크박스 선택 시 토글 스위치 색상 변경)**  
  * 체크박스가 선택된 상태일 때, 스위치의 배경색을 다른 색상으로 변경하여 "활성화" 상태를 나타냅니다.

* **.toggle_switch .slider::before**  
**(스위치 제어 버튼 스타일링)**  
  * 가상 요소를 활용하여 스위치 위에 둥근 형태의 제어 버튼을 생성합니다.
  * 버튼의 위치와 크기, 배경색을 설정합니다.
  * 버튼의 모서리를 둥글게 만듭니다.
  * 부드러운 전환 효과를 추가합니다.

* **.toggle_switch input[type="checkbox"]:checked + .slider::before**  
**(체크박스 선택 시 제어 버튼 이동)**  
  * 체크박스가 선택된 상태일 때, 스위치 버튼의 위치를 변경하여 "활성화" 상태를 나타냅니다.  
<br>

## 결론
이 글에서는 HTML과 CSS를 활용하여 사용자가 직관적으로 상호 작용할 수 있는 토글 스위치 만드는 방법을 소개했습니다. 토글 스위치는 다양한 웹 및 모바일 애플리케이션에서 설정을 제어하고 기능을 활성화 또는 비활성화하며 사용자 상호 작용을 개선하는 다재다능한 요소입니다. 이 CSS 기술을 활용하여 시각적으로 매력적이고 사용자 편의성을 고려한 토글 스위치를 제작해 보세요.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io//ctrlcccv-demo/2023-11-14-checkbox-toggle/">예제결과 미리보기</a>
</div>

