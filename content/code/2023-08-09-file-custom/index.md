---
title: input[type="file"] 태그 커스텀 (웹 접근성 개선)
description: >  
    HHTML, CSS, jQuery를 사용하여 input[type="file"] 태그를 스타일 커스텀하는 코드 예제입니다.
slug: 2023-08-09-file-custom
date: 2023-08-09 00:00:00+0000
lastmod: 2023-08-09 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/file-custom.webp

categories:
    - jQuery
tags:
    - 파일 업로드
---
input[type='file'] 태그는 CSS 커스터마이징이 제한적이다. 원하는 디자인을 구현하려면, input[type='file'] 태그를 IR 기법을 활용하여 숨기고 별도의 요소를 추가해야 한다.  
<br>
IR 기법(Image Replacement Technique)은 웹 접근성을 개선하기 위해 사용되는 방법으로, 텍스트 화면 리더(스크린 리더)나 다른 보조 기술을 사용하는 사용자가 이미지의 내용을 이해할 수 있도록 도와주는 기법이다.  
<br>
그리고 제이쿼리를 활용하여 파일을 선택하면 선택한 파일의 이름을 표시할 수 있도록 구현했다.  

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
<div class="file_cus">
    <label>
        <input type="file">
        <span class="file_name">파일을 선택해주세요.</span>
        <span class="file_btn">파일선택</span>
    </label>
</div>
```
input[type='file'] 태그 대신 추가한 요소는 사용자가 파일을 선택하고 파일 이름을 확인할 수 있는 방식으로 구성했다.  
이 영역을 클릭하면 파일 선택이 가능하도록 label 태그를 활용했다.  
<br>

## CSS 스타일
```css
*{margin: 0;padding: 0;font-family: 'Noto Sans KR', sans-serif;box-sizing: border-box;box-sizing: border-box;}
ul,ol,li {list-style: none;}

.file_cus label {display: block;width: 500px;margin: 50px auto 0;font-size: 0;cursor: pointer;}
input[type="file"] {overflow: hidden;position: absolute;width: 1px;height: 1px;margin: -1px;font-size: initial;clip: rect(0 0 0 0);}
.file_name {overflow: hidden;display: inline-block;vertical-align: middle;width: calc(100% - 108px);height: 40px;padding:0 12px;border: 1px solid #ddd;border-radius:4px;font-size: 14px;line-height: 38px;color: #111;white-space: nowrap; text-overflow: ellipsis;}
.file_btn {display: inline-block;vertical-align: middle;width: 100px;height: 40px;margin-left: 8px;background: #8ab4f8;border-radius:4px;font-size: 14px;font-weight: 500;line-height: 40px;color: #fff;text-align: center;}
input[type="file"]:focus-visible ~ .file_btn, .file_cus:hover .file_btn {background: #3478db;}
```
:focus-visible 선택자를 사용하여 사용자가 탭 키를 이용해 요소를 선택했을 때, 시각적으로 인식할 수 있도록 스타일을 추가했다. 이를 통해 웹 접근성을 개선하고, 키보드를 주요 입력 장치로 사용하는 사용자들이 웹 페이지를 더욱 편리하게 이용할 수 있다.  
<br>
:focus-visible 선택자는 키보드 포커스가 해당 요소에 옮겨졌을 때만 적용되며, 마우스로 인해 발생한 포커스 변화에는 영향을 주지 않는다.
이는 불필요하게 시각적인 변화를 유발하지 않으면서도 키보드 사용자들이 요소의 포커스 상태를 확인할 수 있도록 돕는 웹 접근성 기술이다.
이로써 웹 페이지의 내비게이션 및 상호작용이 더욱 명확하고 편리하게 이뤄질 수 있다.  

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
$(window).on('load', function() {
    fileCus();
})

function fileCus() {
    $(".file_cus input[type=file]").on("change", function() {
        const fileName = $(this).val().split("\\").pop();
        $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요.");
    });
}
```
파일 선택 시 선택한 파일의 이름을 화면에 표시하는 기능을 구현했다.  

* $(".file_cus input[type=file]").on("change", function() { ... }) :   
.file_cus 하위에 있는 input 태그 중에서 type이 file인 요소에 대한 change 이벤트를 감지한다.

* const fileName = $(this).val().split(\"\\\\").pop() :   
파일 선택이 변경되었을 때, 선택된 파일의 이름을 추출하여 fileName 변수에 저장한다. $(this).val()는 선택된 파일의 경로를 반환하며, [split()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)를 사용하여 역슬래시 기준으로 문자열을 나눈다. 그 후 [.pop()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)을 사용하여 마지막 부분(파일 이름)을 추출한다. 

* $(this).siblings(".file_name").text(fileName || "파일을 선택해주세요.") :   
파일 이름을 추출한 후, 해당 파일 업로드 요소의 형제 요소 중 .file_name의 내용을 업데이트한다. 만약 파일이 선택되지 않았다면 "파일을 선택해주세요."라는 내용을 보여준다.  

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-08-09-file-custom/">예제결과 미리보기</a>
</div>

