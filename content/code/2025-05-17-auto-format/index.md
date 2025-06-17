---
title: >  
    jQuery - 전화번호/카드번호 자동 하이픈 및 커스텀 패턴 설정법

description: >  
    jQuery를 활용하여 입력 필드에 자동으로 하이픈이나 기타 구분자를 적용하는 방법을 소개합니다. 전화번호, 카드번호, 생년월일 등 다양한 형식의 입력을 자동화하세요.

slug: 2025-05-17-auto-format
date: 2025-05-17 00:00:00+0000
lastmod: 2025-05-17 00:00:00+0000
    
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-17-auto-format.webp

canonical: "https://ctrlcccv.github.io/code/2025-05-17-auto-format/"
alternates:
  - title: "jQuery - 전화번호/카드번호 자동 하이픈 및 커스텀 패턴 설정법"
    href: "https://ctrlcccv.github.io/code/2025-05-17-auto-format/"
    hreflang: "ko"
  - title: "How to Build Custom Input Auto Format with jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-05-20-auto-format/"
    hreflang: "en"

categories:
    - jQuery
tags:
    - 입력 태그 커스텀
---

전화번호나 카드번호를 입력할 때마다 하이픈(-)을 직접 입력하는 것이 번거롭다고 느낀 적이 있으신가요?

웹사이트나 앱에서 형식이 있는 데이터를 입력할 때, 사용자가 구분자까지 직접 입력하면 불편함을 느낄 수 있습니다. 특히 전화번호, 카드번호, 생년월일과 같이 특정 형식이 있는 데이터의 경우, 자동으로 하이픈이나 슬래시 등의 구분자를 적용해주면 사용자의 입력 시간을 단축하고 실수를 줄이며 데이터 입력의 정확성을 높일 수 있습니다. 이번 포스트에서는 jQuery를 활용하여 다양한 입력 필드에 자동 포맷을 적용하는 방법을 소개합니다.

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
<div class="input_container">
    <h2>자동 형식 입력</h2>
    <label for="phone">전화번호:</label>
    <input type="text" id="phone" placeholder="000-0000-0000" data-format="xxx-xxxx-xxxx">
    <label for="date">생년월일:</label>
    <input type="text" id="date" placeholder="YYYY/MM/DD" data-format="xxxx/xx/xx">
    <label for="card">카드번호:</label>
    <input type="text" id="card" placeholder="0000-0000-0000-0000" data-format="xxxx-xxxx-xxxx-xxxx">
</div>
```

* **커스텀 데이터 속성 활용**  
<span class="txt">
`input` 태그에 `data-format` 속성을 추가하여 원하는 형식을 지정합니다.  
'x' 문자는 숫자가 입력될 위치를 나타내며, 그 외 문자는 구분자로 사용됩니다.
</span>

* **다양한 형식 지원**  
<span class="txt">
전화번호, 생년월일, 카드번호 등 다양한 형식을 하나의 코드로 처리할 수 있습니다.  
개발자가 필요에 따라 형식을 자유롭게 커스터마이징 할 수 있습니다.
</span>

* **직관적인 플레이스홀더**  
<span class="txt">
`placeholder` 속성을 활용하여 사용자에게 입력 형식을 미리 보여줍니다.  
이를 통해 사용자는 어떤 형식으로 데이터가 표시될지 예측할 수 있습니다.
</span>

<br>

## CSS 스타일

```css
.input_container {
    margin: 20px auto;
    width: 350px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.input_container h2 {
    margin-bottom: 15px;
    color: #333;
}
.input_container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 15px;
}
.input_container label {
    display: block;
    margin-bottom: 5px;
    color: #666;
}
```

* **깔끔한 입력 폼 디자인**  
<span class="txt">
전체 입력 폼은 흰색 배경과 부드러운 그림자로 시각적 깊이감을 줍니다.  
둥근 모서리와 적절한 여백으로 사용자 친화적인 디자인을 완성했습니다.
</span>

* **입력 필드 스타일링**  
<span class="txt">
입력 필드는 적절한 패딩과 크기로 사용자가 쉽게 클릭하고 입력할 수 있도록 디자인되었습니다.  
폰트 크기와 색상을 가독성 있게 조정하여 사용자 입력의 편의성을 높였습니다.
</span>

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

## jQuery 코드

```js
// 포맷이 지정된 모든 입력 필드 찾기
function autoFormat(){
    $('input[data-format]').each(function() {
        // 최대 길이 설정
        const format = $(this).data('format');
        $(this).attr('maxlength', format.length);
        
        // 입력 이벤트 리스너 추가
        $(this).on('input', function(e) {
            const $input = $(this);
            const format = $input.data('format');
            
            // 숫자만 추출
            let numbers = $input.val().replace(/[^0-9]/g, '');
            
            // 형식에 맞게 변환
            let result = '';
            let numberIndex = 0;
            
            for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
                if (format[i] === 'x') {
                    // x 위치에 숫자 삽입
                    result += numbers[numberIndex++];
                } else {
                    // 구분자는 그대로 유지
                    result += format[i];
                    
                    // 다음 문자가 x이고, 아직 숫자가 남아있으면 계속 진행
                    if (i + 1 < format.length && format[i + 1] === 'x' && numberIndex < numbers.length) {
                        continue;
                    }
                }
            }
            
            // 마지막 문자가 구분자인 경우 처리 (백스페이스로 삭제 시)
            if (result.length > 0 && !/[0-9]/.test(result[result.length - 1])) {
                if (e.originalEvent.inputType === 'deleteContentBackward') {
                    result = result.substring(0, result.length - 1);
                }
            }
 
            $input.val(result);
        });
    });
}

$(document).ready(function() {
    autoFormat();
});
```

* **자동 포맷 초기화**  
<span class="txt">
`autoFormat()` 함수는 페이지 로드시 호출되어 `data-format` 속성이 있는 모든 입력 필드에 자동 포맷 기능을 적용합니다.
`input[data-format]` 선택자를 사용하여 대상 요소를 한 번에 처리합니다.
</span>

* **최대 길이 자동 설정**  
<span class="txt">
각 입력 필드의 최대 길이는 포맷 문자열의 길이로 자동 설정됩니다.  
이를 통해 사용자가 형식보다 더 많은 글자를 입력할 수 없도록 방지합니다.
</span>

* **입력 이벤트 처리**  
<span class="txt">
사용자가 키를 입력할 때마다 `input` 이벤트가 발생하고 이를 감지하여 포맷을 적용합니다.  
이벤트 기반 처리 방식으로 사용자 입력에 실시간으로 반응합니다.
</span>

* **숫자 추출 및 포맷 적용**  
<span class="txt">
정규식 `replace(/[^0-9]/g, '')`을 사용하여 입력값에서 숫자만 추출합니다.  
추출된 숫자를 지정된 포맷에 맞게 배치하고, 구분자(하이픈, 슬래시 등)를 적절한 위치에 삽입합니다.
</span>

* **백스페이스 처리**  
<span class="txt">
사용자가 백스페이스로 문자를 삭제할 경우, 마지막 문자가 구분자인 경우 해당 구분자도 함께 제거되도록 처리합니다.
이를 통해 삭제 시의 불편함을 줄일 수 있습니다.
</span>

<br>

## 활용 예시

### 다양한 형식 지원하기

이 코드는 다양한 포맷을 쉽게 지원할 수 있습니다. 필요에 따라 다음과 같은 형식도 추가할 수 있습니다:

```html
<!-- 사업자 등록번호 -->
<input type="text" placeholder="000-00-00000" data-format="xxx-xx-xxxxx">

<!-- IP 주소 -->
<input type="text" placeholder="000.000.000.000" data-format="xxx.xxx.xxx.xxx">
```

### 커스텀 포맷 함수 확장하기

다음과 같이 함수를 확장하면 특정 입력 필드에 대해 추가적인 유효성 검사나 포맷팅을 적용할 수 있습니다:

```js
// 특정 ID를 가진 필드에 추가 기능 적용
$('#card').on('blur', function() {
    const cardNumber = $(this).val().replace(/[^0-9]/g, '');
    // 카드번호 유효성 검사 로직 추가
    if (cardNumber.length < 16) {
        alert('유효한 카드번호를 입력해주세요.');
    }
});
```

📝 **참고**: 실제 서비스에서는 민감한 정보(카드번호, 주민등록번호 등)를 클라이언트 측에서 처리할 때 주의가 필요합니다. 보안을 위해 서버 측 검증을 항상 함께 구현해주세요!

<br>

## 결론

이번 포스트에서는 jQuery를 활용하여 전화번호, 생년월일, 카드번호 등 다양한 형식의 입력에 자동으로 구분자를 적용하는 방법을 살펴보았습니다. 하나의 함수로 여러 형식을 지원할 수 있어 유지 보수가 용이하고, `data-format` 속성을 통해 HTML 마크업만으로 원하는 형식을 지정할 수 있어 개발자 친화적인 구현이 가능합니다.

이 코드를 실제 프로젝트에 적용해보시고, 여러분만의 방식으로 확장해보세요! 더 좋은 방법이나 개선 아이디어가 있으시다면 댓글로 공유해주세요. 여러분의 의견이 더 나은 코드를 만드는 데 큰 도움이 됩니다. 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-17-auto-format/">예제결과 미리보기</a>
</div>
 
