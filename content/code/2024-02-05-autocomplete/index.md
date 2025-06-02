---
title: >  
    jQuery - autocomplete (자동완성) 주요 옵션 및 예제
description: >  
    jQuery의 autocomplete 메서드를 사용하여 자동완성 기능을 구현하는 방법과 주요 옵션에 대해 설명합니다.  

slug: 2024-02-05-autocomplete
date: 2024-02-05 00:00:00+0000
lastmod: 2024-01-31 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-02-05-autocomplete.webp

categories:
    - jQuery
tags:
    - 자동완성
---
자동완성 기능은 jQuery UI 라이브러리의 autocomplete 메서드를 사용하면 매우 간단하게 구현할 수 있습니다.  



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
HTML 구조는 자동완성 기능을 적용할 입력 필드를 정의하는 것으로 시작합니다. 입력 필드의 id가 `#autocomplete`으로 설정되어 있으며 이를 통해 자바스크립트에서 해당 요소를 쉽게 식별하고 조작할 수 있습니다.  
```html
<input type="text" id="autocomplete" class="autocomplete-input">
```

## CSS 스타일
CSS 코드는 자동완성 입력 필드와 제안 메뉴의 스타일을 정의합니다. 여기에는 테두리, 라운드 모서리, 글자 크기 및 색상 등이 포함됩니다. 자동완성 제안이 들어갈 리스트 스타일 또한 지정되어 있어 사용자가 제안을 보고 쉽게 선택할 수 있습니다.
```css
.autocomplete-input {
    display: block;
    width: 360px;
    margin: 10px auto 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
}

.ui-autocomplete {
    position: absolute;
    max-height: 200px;
    margin: 0;
    padding: 0;
    background-color: #fff;
    border: 1px solid #ccc !important;
    border-radius: 8px;
    z-index: 1;
    list-style: none;
    overflow-y: auto;
}

.ui-autocomplete li {
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #000;
}

.ui-autocomplete li strong {
    color: #0077cc;
}

.ui-helper-hidden-accessible {
    display: none;
}
```

## jQuery 코드
jQuery의 `autocomplete` 메서드를 사용하여 사용자 입력에 따라 실시간으로 관련 제안을 보여주는 자동완성 기능을 쉽게 구현할 수 있습니다.   



<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>


```js
$(document).ready(function () {
    const data = [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "Ajax",
        "React",
        "Angular",
        "Vue.js",
        "Node.js",
        "Express"
    ];

    // 자동 완성 셋업
    $("#autocomplete").autocomplete({
        // 입력 문자열에 대해 필터링 된 제안을 반환하는 함수
        source: function (request, response) {
            const inputText = request.term.toLowerCase();
            const filteredItems = data.filter(item => item.toLowerCase().includes(inputText));
            response(filteredItems);
        },
        
        // 자동 완성 위치 조정
        position: { my: "left top+5" },

        // 자동 완성 메뉴가 열렸을 때, 하이라이팅 로직
        open: function () {
            const inputText = $("#autocomplete").val().toLowerCase();
            // 각 제안 아이템에 대한 하이라이팅
            $(".ui-autocomplete li").each(function () {
                let suggestion = $(this).text();
                const index = suggestion.toLowerCase().indexOf(inputText);

                if (index !== -1) {
                    // 단어의 일부를 강조하는 HTML을 사용하여 새로운 제안 생성
                    const highlightedPart = `<strong>${suggestion.substr(index, inputText.length)}</strong>`;
                    suggestion = suggestion.substring(0, index) + highlightedPart + suggestion.substring(index + inputText.length);
                    // 새로운 제안으로 항목 내용을 업데이트
                    $(this).html(suggestion);
                }
            });
        },
    });
});
```
* **데이터 소스 정의**
  - `data` 배열은 자동완성에 사용될 데이터를 포함하고 있으며, 여기에는 웹 개발과 관련된 다양한 기술 명칭이 문자열 형태로 저장되어 있습니다.

* **`autocomplete` 메서드 호출 및 설정**
  - `$("#autocomplete")`는 ID가 `autocomplete`인 HTML 요소를 선택합니다.  
  - `autocomplete({...})`는 해당 요소에 자동 완성 기능을 적용하고, 여러 설정을 구성할 수 있습니다.

* **`source` 옵션과 필터링 로직**
  - `source` 옵션은 자동 완성이 작동하는 방식을 결정합니다.
  - `request.term`은 사용자가 입력 필드에 작성한 현재의 텍스트를 의미합니다.
  - 입력된 텍스트를 소문자로 변환하고, `data` 배열을 순회하면서 입력 텍스트를 포함하는 요소를 필터링합니다.
  - `response` 함수는 필터링 된 항목들을 자동 완성 제안 목록으로 보여주기 위해 호출됩니다.

* **`open` 이벤트 함수**
  - `open` 이벤트는 자동 완성 메뉴가 열렸을 때 실행되는 함수를 정의합니다.
  - 이 함수 내부에서는 `$(".ui-autocomplete li").each(function() {...})`를 통해 모든 제안 항목(`li`)을 순회하며 하이라이팅 처리를 수행합니다.
  - `inputText`는 사용자가 입력한 문자열이며, 이를 기준으로 각 제안 항목에서 하이라이트해야 할 부분을 찾아 `<strong>` 태그를 이용하여 표시합니다.

* **제안 항목의 하이라이팅 로직**
  - 현재 순회 중인 `li` 요소에서 가져온 텍스트를 `suggestion` 변수에 할당합니다.
  - `suggestion` 내에서 사용자의 입력 텍스트(`inputText`) 위치를 찾아 `index`로 저장합니다.
  - 일치하는 부분이 있다면(`index !== -1`), 해당 부분을 `<strong>` 태그로 묶어 하이라이트 처리합니다.
  - 항목의 HTML 내용을 새로 구성한 `suggestion` 문자열로 업데이트합니다.  

<br>

## autocomplete 메서드 주요 옵션 및 설명

* **appendTo**
  * 자동 완성 메뉴를 DOM 내에서 어디에 배치할지를 결정합니다.

* **autoFocus**
  * 자동 완성 목록이 표시될 때 첫 번째 항목에 자동으로 포커스를 설정합니다.

* **delay**
  * 키 입력과 자동 완성 메뉴 표시 사이의 지연 시간(밀리 초)을 설정합니다. 

* **disabled**
  * 자동 완성 기능을 활성화 또는 비활성화합니다.

* **minLength**
  * 자동 완성이 작동하기 위해 사용자가 입력해야 하는 최소 문자 수를 설정합니다.

* **position**
  - 자동 완성 메뉴의 위치를 세부적으로 조정합니다. jQuery UI 포지션 유틸리티를 이용합니다.

* **source**
  - 자동 완성에 사용될 데이터를 지정합니다. 배열이나 함수를 사용할 수 있습니다.

* **create**
  - 자동완성 위젯이 생성될 때 트리거 되는 함수입니다.

* **open**
  - 자동완성 메뉴가 열릴 때 트리거 되는 함수입니다.

* **close**
  - 자동완성 메뉴가 닫힐 때 트리거 되는 함수입니다.

* **focus**
  - 자동완성 메뉴에서 항목에 포커스가 가면 트리거 되는 함수입니다. 반환 값으로 `false`를 주면 내장 포커스 이벤트가 취소됩니다.

* **select**
  - 사용자가 메뉴에서 항목을 선택하면 트리거 되는 함수입니다.

* **change**
  - 입력 필드의 값이 변경되고 포커스가 잃어버렸을 때 트리거 되는 함수입니다.

* **search**
  - `search` 메서드가 호출될 때 트리거 되는 함수입니다. 자동완성 검색을 수행하기 직전에 호출됩니다.

* **response**
  - 자동완성 기능이 응답을 반환할 때 실행되는 함수입니다. 이 함수를 통해 제안된 항목 목록을 수정하거나 변경할 수 있습니다.

이러한 이벤트 핸들러 옵션들은 개발자가 자동완성 위젯의 동작을 더 세밀하게 제어하기 위해 사용될 수 있습니다. 자세한 사용법 및 예제는 [공식 문서](https://api.jqueryui.com/autocomplete/)를 참고해주세요.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-02-05-autocomplete/" target="_blank">예제결과 미리보기</a>
    <a href="https://api.jqueryui.com/autocomplete/" target="_blank">[참고문서] Autocomplete Widget</a>
</div>
