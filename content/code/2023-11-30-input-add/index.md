---
title: jQuery -  버튼 클릭 시 input 추가, 삭제하기
description: >  
    HTML, CSS, jQuery를 활용하여 웹 페이지에서 버튼 클릭으로 입력 필드를 동적으로 추가하고 삭제하는 기능을 구현한 방법을 상세히 설명합니다. 이 기능은 설문 조사 및 다양한 양식에서 유용합니다.
slug: 2023-11-30-input-add
date: 2023-11-30 01:00:00+0000
lastmod: 2023-11-30 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-30-input-add.webp

categories:
    - jQuery
tags:
    - 입력 태그 커스텀
---
jQuery를 사용하여 버튼 클릭 시 입력 필드(input)를 동적으로 추가하고 삭제하는 기능을 구현한 코드를 상세히 분석합니다. 이 기능은 사용자 인터페이스에서 흔히 볼 수 있는 요소로, 사용자가 필요에 따라 여러 입력 필드를 추가하고, 더 이상 필요 없는 필드는 삭제할 수 있게 해 줍니다. 특히 양식이나 설문 조사와 같은 상황에서 유용하게 사용됩니다. 이 기능을 구현하기 위해 HTML, CSS, 그리고 jQuery를 사용하며, 각각의 역할에 대해 자세히 설명하겠습니다.    


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
<form>
    <div class="input_wrap">
        <div class="input_list">
            <input type="text" name="input_array[]" placeholder="입력해주세요." />
        </div>
    </div>
    <button class="add_field">추가하기</button>
</form>
```
* **폼 컨테이너 (&lt;form&gt; 태그)**  
사용자 입력을 받기 위한 폼의 전체 구조를 정의합니다. 이 안에서 입력 필드와 버튼이 포함됩니다.

* **입력 필드 컨테이너 (input_wrap 클래스)**  
하나 이상의 입력 필드를 담는 컨테이너 역할을 합니다. 초기에는 하나의 입력 필드만 보여지며, 사용자가 추가 버튼을 클릭할 때마다 이 영역에 새로운 입력 필드가 추가됩니다.

* **입력 필드 (input[type="text"])**   
사용자로부터 데이터를 입력받기 위한 텍스트 필드입니다. 기본적으로 하나의 입력 필드가 제공되며, 사용자가 내용을 입력할 수 있습니다.

* **추가 버튼 (add_field 클래스)**  
사용자가 이 버튼을 클릭하면 새로운 입력 필드가 input_wrap 내부에 추가됩니다.  

<br>

## CSS 스타일
```css
form { max-width: 500px; margin: 40px auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } 
.input_wrap { margin-bottom: 20px; } 
.input_list { display: flex; align-items: center; margin-bottom: 10px; } 
.input_list input[type="text"] { padding:0 10px; height: 45px; border: 1px solid #ddd; border-radius: 4px; flex-grow: 1; } 
.add_field { width: 100%; height: 45px; padding: 0 15px; background-color: #007bff; border: none; border-radius: 4px; color: white; cursor: pointer; transition: background-color 0.3s ease; } 
.add_field:hover { background-color: #0056b3; } 
.remove_field { display: flex; align-items: center; height: 45px; margin-left: 6px; padding:0 15px; background: #ff4d4d; border-radius:4px; color: #fff; cursor: pointer; text-decoration: none; } 
.remove_field:hover { background: #ff3333; } 
```
* **폼 스타일링**  
폼에는 최대 너비, 마진, 패딩, 배경색, 테두리 반경 및 박스 그림자가 적용되어 깔끔하고 직관적인 디자인을 제공합니다.

* **입력 필드 스타일링**  
입력 필드는 패딩, 높이, 테두리, 반경 등을 통해 사용자 친화적인 디자인을 갖추고 있습니다.

* **버튼 스타일링**  
'추가하기' 버튼과 '삭제' 링크에는 배경색, 테두리, 색상, 커서 스타일 등을 적용하여 사용자가 쉽게 인식하고 클릭할 수 있도록 디자인되었습니다.

* **호버 효과**    
버튼과 링크에 호버 효과를 추가하여, 사용자가 마우스를 올렸을 때 시각적인 피드백을 제공합니다.


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

## jQuery 코드
```js
const wrapper = $('.input_wrap'); // 입력 필드를 포함하는 컨테이너 선택
const addButton = $('.add_field'); // 추가 버튼 선택
const maxFields = 10; // 최대 입력 필드 수 설정
let fieldCount = 1; // 현재 입력 필드 수

// '추가하기' 버튼 클릭 시 이벤트
addButton.click(function(e) {
    e.preventDefault(); // 페이지 리로드 방지
    if (fieldCount < maxFields) { // 최대 필드 수 체크
        fieldCount++; // 필드 수 증가
        // 새 입력 필드 추가
        wrapper.append(`
            <div class="input_list">
                <input type="text" name="input_array[]" placeholder="입력해주세요." />
                <a href="javascript:void(0);" class="remove_field">삭제</a>
            </div>
        `);
    }
});

// '삭제' 링크 클릭 시 이벤트
wrapper.on('click', '.remove_field', function(e) {
    e.preventDefault(); // 페이지 리로드 방지
    $(this).parent('.input_list').remove(); // 필드 제거
    fieldCount--; // 필드 수 감소
});
```

* **변수 초기화 및 선택자 설정** 
  * wrapper 변수 : 입력 필드가 담긴 컨테이너(.input_wrap)를 선택합니다.
  * addButton 변수 : '추가하기' 버튼(.add_field)을 선택합니다.
  * maxFields 변수 : 최대 입력 필드 수를 설정합니다. (예시 : 10개)
  * fieldCount 변수 : 현재 페이지의 입력 필드 수를 추적합니다.

* **입력 필드 추가 로직**  
  * '추가하기' 버튼 클릭 시, addButton.click(function(e) {...})를 사용해 이벤트 리스너를 설정합니다.
  * e.preventDefault() 메서드를 사용하여 페이지 리로드를 방지합니다
  * if (fieldCount < maxFields)로 최대 필드 수를 넘지 않는지 확인합니다.
  * 조건 충족 시 wrapper.append(...)로 새 입력 필드와 '삭제' 링크를 추가합니다.
  * fieldCount++로 입력 필드 수를 업데이트합니다.

* **입력 필드 삭제 로직**  
  * wrapper.on('click', '.remove_field', function(e) {...})를 사용해 동적 '삭제' 링크에 이벤트 리스너를 연결합니다.
  * $(this).parent('.input_list').remove()로 클릭 된 '삭제' 링크의 부모 요소를 제거합니다.
  * fieldCount--로 입력 필드 수를 감소시킵니다.  

<br>

## 결론
jQuery를 사용하여 웹 페이지에 동적인 입력 필드를 추가하고 삭제하는 기능을 상세히 분석하고 설명했습니다. 이 기능은 사용자가 인터페이스에서 입력 필드를 필요에 따라 조절할 수 있게 하여, 웹 애플리케이션의 사용성과 유연성을 크게 향상시킵니다. HTML을 통해 기본 구조를 설정하고, CSS로 사용자 친화적인 스타일링을 제공하며, jQuery를 사용하여 버튼 클릭에 따른 입력 필드의 추가 및 삭제 기능을 구현하는 방식은 매우 효율적이고 실용적입니다.  

이러한 접근 방식은 웹 개발에서 널리 적용될 수 있으며, 특히 설문 조사, 다중 데이터 입력 양식, 동적 인터페이스 요구가 있는 다양한 웹 애플리케이션에 이상적입니다.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-30-input-add/">예제결과 미리보기</a>
</div>
