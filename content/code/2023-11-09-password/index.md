---
title: jQuery - Input password 비밀번호 보이기
description: >  
    jQuery를 사용하여 비밀번호 입력 필드를 보이기/숨기기 기능을 구현하는 방법입니다.
slug: 2023-11-09-password
date: 2023-11-09 00:00:00+0000
lastmod: 2023-11-09 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-09-password.webp

categories:
    - jQuery
tags:
    - 입력 태그 커스텀
---
웹 페이지를 개발하거나 사용자 인터페이스를 디자인할 때, 비밀번호 입력 필드는 중요한 부분 중 하나입니다. 그러나 사용자가 입력한 비밀번호를 확인하고 검토하는 것은 종종 번거롭고 실수하기 쉬운 작업입니다. 이런 이유로 jQuery와 같은 라이브러리를 사용하여 비밀번호 입력 필드를 보이기/숨기기 기능을 구현하는 것은 매우 유용합니다.  

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

이러한 기능을 추가하면 사용자가 입력한 비밀번호를 실시간으로 확인할 수 있어서 오타를 방지하고 사용자 경험을 향상시킬 수 있습니다. 또한, 사용자는 필요할 때마다 비밀번호를 숨길 수 있어서 개인 정보 보호에 도움이 됩니다.  

이 블로그 포스트에서는 jQuery를 사용하여 비밀번호 입력 필드를 보이기/숨기기 기능을 구현하는 방법을 자세히 알아보겠습니다.  
<br>

## HTML 구조
이 부분은 비밀번호 입력 필드와 "비밀번호 표시" 체크박스를 포함하는 폼을 정의합니다. 비밀번호 입력 필드는 type="password"로 지정되어 있으므로 기본적으로는 입력한 내용이 가려진 채로 표시됩니다.  
```html
<div class="join">
    <form>
        <label for="pw" class="tit">비밀번호 입력</label>
        <input type="password" id="pw" name="pw" value="password!@">
        <label class="pw_show"><input type="checkbox">비밀번호 표시</label>
    </form>
</div>
```

## CSS 스타일
폼과 요소를 스타일링하여 시각적으로 보기 좋게 만들었습니다. 색상 및 여백을 설정하여 사용자가 쉽게 인식하고 상호작용할 수 있도록 했습니다.  
```css
.join {width: 330px;margin: 100px auto 0;padding: 15px;background: #fff;border: 1px solid #ddd;border-radius:4px;}
.join .tit {display: block;margin-bottom: 4px;font-size: 14px;color: #000;}
#pw {width: 100%;height: 35px;padding: 0 15px;border: 1px solid #ced4da;border-radius:4px;font-size: 14px;color: #000;} 
.pw_show {display: flex;align-items: center; margin-top: 10px; font-size: 12px;}
.pw_show input[type="checkbox"] {display: flex;align-items: center;margin-right: 5px;font-size: 12px; }
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

## jQuery 코드
```js
$(document).ready(function() {
    const pwInput = $("#pw");
    $('.pw_show input[type="checkbox"]').on('change', function() {
        if (this.checked) {
            pwInput.prop("type", "text");
        } else {
            pwInput.prop("type", "password");
        }
    });
});
```

* **비밀번호 입력 필드 선택**  
  * 비밀번호 입력 필드를 선택합니다. 선택된 요소는 pwInput 변수에 할당됩니다. 이후에 비밀번호 입력 필드를 조작하는 데 사용할 수 있습니다.

* **체크박스 변경 이벤트 처리**  
  * 체크박스 요소의 변경(change) 이벤트를 감지하는 이벤트 리스너를 등록합니다.

* **체크박스 상태 확인**  
  * 이벤트 리스너는 체크박스의 상태 변화를 감지합니다. if (this.checked)를 사용하여 체크박스가 선택되었는지 여부를 확인합니다. 체크박스가 선택되면 조건문 안의 코드 블록이 실행됩니다.

* **비밀번호 필드 형식 변경**  
  * 체크박스가 선택된 경우, 비밀번호 입력 필드의 type 속성을 "text"로 변경합니다. 이렇게 하면 비밀번호 입력 필드에 입력한 내용이 텍스트로 표시되며, 사용자는 입력한 비밀번호를 확인할 수 있습니다.

* **비밀번호 필드 형식 되돌리기**
  * 체크박스가 선택되지 않은 경우, 비밀번호 입력 필드의 type 속성을 다시 "password"로 변경합니다. 이렇게 하면 비밀번호 입력 필드에 입력한 내용이 가려지며, 다른 사람의 시선에서 비밀번호를 보호할 수 있습니다.

이렇게 구현된 코드는 사용자가 체크박스를 선택하거나 해제할 때마다 비밀번호 입력 필드의 가시성을 변경하여 비밀번호를 숨기거나 보이게 합니다. 이것은 사용자 경험을 향상시키고 개인 정보 보호를 강화하는 데 도움이 되는 유용한 기능입니다.  
<br>

## 결론
jQuery를 사용하여 입력 비밀번호 필드를 보이기/숨기기 기능을 구현하는 방법을 알아보았습니다. 이러한 기능을 통해 웹 페이지의 사용자 경험을 향상시키고, 사용자가 올바른 비밀번호를 입력하도록 도울 수 있습니다. 위의 코드를 참고하여 웹 페이지에서 유용한 비밀번호 입력 기능을 구현해 보세요.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="/ctrlcccv-demo/2023-11-09-password/">예제결과 미리보기</a>
    <a href="/code/2023-11-08-password-eye/">[관련글] CSS - input password 눈모양 숨기기 (IE, Edge)</a>
    <a href="https://ctrlcccv.github.io/code/2023-11-13-checkbox-custom/">[관련글] CSS - 체크박스, 라디오버튼 커스텀</a>
</div>