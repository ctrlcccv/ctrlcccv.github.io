---
title: >
    jQuery - 전화번호 입력 폼 자동 포커스 이동

description: >  
    jQuery를 활용하여 전화번호를 입력할 때 탭이나 클릭 없이 자동으로 다음 칸으로 넘어가도록 구현해보세요. 모바일 환경에서도 더 편리하고 자연스러운 입력 UI를 만들 수 있습니다.

slug: 2025-05-14-autofocus
date: 2025-05-14 00:00:00+0000
lastmod: 2025-05-14 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-14-autofocus.webp

alternates:
  - title: "jQuery - 전화번호 입력 폼 자동 포커스 이동"
    href: "https://ctrlcccv.github.io/code/2025-05-14-autofocus/"
    hreflang: "ko"
  - title: "How to Auto Tab Phone Number Input with jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-05-16-autofocus/"
    hreflang: "en"
    
categories:
    - jQuery
tags:
    - 입력 태그 커스텀

---
전화번호를 입력할 때, 다음 칸으로 자동으로 이동된다면 얼마나 편리할까요?  
특히 모바일 환경에서는 작은 입력칸을 일일이 눌러야 해서 번거롭고 불편한데요.  
이번 글에서는 jQuery를 활용하여 전화번호 입력 시 자동으로 다음 필드로 이동하는 기능을 구현해보겠습니다.


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
<div class="phone_form">
    <h2>전화번호 입력</h2>
    <div class="input_container">
        <input type="tel" id="phone1" maxlength="3" class="phone_input" placeholder="010" inputmode="numeric" pattern="[0-9]*" aria-label="전화번호 앞자리">
        <span class="separator" aria-hidden="true">-</span>
        <input type="tel" id="phone2" maxlength="4" class="phone_input" placeholder="0000" inputmode="numeric" pattern="[0-9]*" aria-label="전화번호 중간자리">
        <span class="separator" aria-hidden="true">-</span>
        <input type="tel" id="phone3" maxlength="4" class="phone_input" placeholder="0000" inputmode="numeric" pattern="[0-9]*" aria-label="전화번호 뒷자리">
    </div>
</div>
```

* **전화번호 입력 필드**  
<span class="txt">
입력 필드는 `type="tel"` 속성 덕분에 모바일 기기에서 숫자 키패드가 자동으로 표시됩니다.
`maxlength` 속성으로 각 필드의 최대 입력 길이를 제한하고, `placeholder`로 입력 예시를 보여줍니다.
</span>

* **접근성 향상**  
<span class="txt">
`aria-label` 속성을 통해 스크린 리더 사용자에게 각 입력 필드가 어떤 부분인지 명확히 알려줍니다.
구분자인 대시(-)는 스크린 리더가 읽지 않도록 aria-hidden="true" 속성을 사용했습니다.
</span>

* **입력 최적화**  
<span class="txt">
`inputmode="numeric"`과 `pattern="[0-9]*"`를 함께 사용하면 모바일 환경에서 숫자 키패드가 표시되고, 숫자만 입력되도록 제한할 수 있습니다.
</span>

<br>

## CSS 스타일

```css
.phone_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.phone_form h2 {
    color: #333;
    margin-bottom: 10px;
}

.input_container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.phone_input {
    width: 100px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
    padding: 0 5px;
    transition: all 0.2s ease;
}

.phone_input:focus {
    border-color: #8ab4f8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(78, 67, 118, 0.2);
}

.separator {
    font-size: 20px;
    color: #666;
    margin: 0 2px;
}
```

* **전체 레이아웃**  
<span class="txt">
전화번호 입력 폼은 플렉스 레이아웃으로 구성하여 세로 중앙 정렬된 깔끔한 UI를 만들었습니다.
입력 폼에 그림자 효과와 적절한 여백을 줘서 시각적으로 구분되도록 했습니다.
</span>

* **입력 필드 디자인**  
<span class="txt">
각 입력 필드는 적당한 크기와 여백을 가지며, 가운데 정렬된 텍스트로 입력 내용을 한눈에 확인할 수 있습니다.
포커스 상태에서는 테두리 색상이 변하고 부드러운 그림자 효과가 생겨 현재 활성화된 필드를 쉽게 알아볼 수 있습니다.
</span>

* **구분자 스타일링**  
<span class="txt">
대시(-) 구분자는 적절한 크기와 간격으로 배치하여 입력 필드 사이를 자연스럽게 구분해줍니다.
</span>


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

## jQuery 코드 - 기본 기능

```js
function inputFocus(){
    // 전화번호 입력 필드 모두 선택
    const $phoneInputs = $('.phone_input');
                
    // 입력 필드 간 이동 기능 (direction: 1=다음, -1=이전)
    function moveField($currentField, direction) {
        const currentIndex = $phoneInputs.index($currentField);
        const targetIndex = currentIndex + direction;
        
        // 유효한 인덱스 범위 내에서만 이동
        if(targetIndex >= 0 && targetIndex < $phoneInputs.length) {
            $phoneInputs.eq(targetIndex).focus();
        }
    }
    
    // 입력값 변경 시 처리
    $phoneInputs.on('input', function() {
        // 숫자만 입력 가능하도록 필터링
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // 최대 길이 입력 완료시 다음 필드로 자동 이동
        if (this.value.length === this.maxLength) {
            moveField($(this), 1);
        }
    });
    
    // 키보드 이벤트 처리는 아래 섹션에서 설명합니다 (선택사항)
    $phoneInputs.on('keydown', function(e) {
        // 세부 코드는 아래에서 설명
    });
}

$(function(){
    inputFocus();
})
```

* **필드 이동 함수**  
<span class="txt">
`moveField` 함수는 현재 필드에서 다음이나 이전 필드로 포커스를 옮겨주는 핵심 기능입니다.
jQuery의 `index` 메소드로 현재 필드의 위치를 파악하고, 그에 따라 원하는 방향의 필드로 이동시킵니다.
</span>

* **자동 이동 기능**  
<span class="txt">
`input` 이벤트 리스너를 통해 사용자 입력을 실시간으로 감지하고, 정규식을 사용해 숫자가 아닌 문자는 자동으로 제거합니다. 각 필드에 숫자를 최대 길이만큼 입력하면 곧바로 다음 필드로 포커스가 이동해, 입력 흐름이 자연스럽게 이어집니다.
</span>

<br>

## 키보드 이벤트 처리 - 사용성 향상 (선택사항)

기본 자동 포커스 이동 기능만으로도 충분하지만, 키보드로 입력 필드를 더 자연스럽게 조작할 수 있도록 키 이벤트를 추가로 처리해줄 수도 있습니다.

```js
$phoneInputs.on('keydown', function(e) {
    const key = e.key || e.keyCode;
    const $this = $(this);
    
    // 백스페이스 키 누르고 내용이 없으면 이전 필드로 이동
    if ((key === 'Backspace' || key === 8) && this.value.length === 0) {
        e.preventDefault();
        moveField($this, -1);
    }
    
    // 오른쪽 화살표 키 끝에서 누르면 다음 필드로 이동
    else if (key === 'ArrowRight' || key === 39) {
        if (this.selectionStart === this.value.length) {
            e.preventDefault();
            moveField($this, 1);
        }
    }
    // 왼쪽 화살표 키 처음에서 누르면 이전 필드로 이동
    else if (key === 'ArrowLeft' || key === 37) {
        if (this.selectionStart === 0) {
            e.preventDefault();
            moveField($this, -1);
        }
    }
});
```

* **백스페이스 키 처리**  
<span class="txt">
빈 필드에서 백스페이스 키를 누르면 자동으로 이전 필드로 이동합니다.
숫자를 수정할 때도 흐름이 끊기지 않아 편리합니다.
예를 들어 중간 필드의 숫자를 모두 지우고 백스페이스를 누르면 첫 번째 필드로 돌아가 연속해서 수정할 수 있습니다.
</span>

* **화살표 키 처리**  
<span class="txt">
입력 필드 끝에서 오른쪽 화살표를 누르면 다음 필드로, 시작점에서 왼쪽 화살표를 누르면 이전 필드로 이동합니다.
마우스 없이 키보드만으로도 전체 전화번호 필드를 자유롭게 이동할 수 있어 편리합니다.
</span>

* **커서 위치 감지**  
<span class="txt">
`selectionStart` 속성으로 커서가 정확히 어디에 있는지 확인합니다.
커서가 필드의 끝이나 시작점에 있을 때만 이동해서 일반적인 텍스트 편집 기능을 방해하지 않습니다.
</span>

💡 **팁**: 키 코드와 키 이름을 모두 체크(`key === 'ArrowRight' || key === 39`)하는 방식은 다양한 브라우저에서도 안정적으로 작동합니다. 구형 브라우저에서도 문제없이 동작하는 코드를 작성할 때 유용한 패턴입니다.

<br>

## 결론

jQuery를 활용한 전화번호 입력 자동 포커스 이동 기능은 작은 코드로 큰 편의성을 제공합니다. 기본 자동 이동 기능만으로도 입력 시간이 단축되고 필드 간 이동을 위한 번거로운 탭/클릭 횟수가 줄어들지만, 키보드 이벤트를 추가하면 더욱 섬세한 조작이 가능해집니다.

이 기능은 전화번호뿐 아니라 카드번호, 주민등록번호 등 여러 구분된 입력 필드가 필요한 모든 곳에 응용할 수 있습니다. 특히 모바일 환경에서는 번거로운 탭 동작 없이 숫자만 입력하면 되므로, 사용자의 시간과 노력을 크게 절약해줍니다.

이 기능 외에도 폼 작성 시 불편했던 점이나 개선하고 싶은 UX가 있으신가요? 여러분의 경험을 댓글로 나눠주세요. 😊

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-14-autofocus/">예제결과 미리보기</a>
</div> 