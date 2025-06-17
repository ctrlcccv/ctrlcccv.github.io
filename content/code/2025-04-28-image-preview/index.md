---
title: >  
    jQuery - 이미지 파일 업로드 및 미리보기 기능 구현하기

description: >  
    jQuery를 활용한 이미지 파일 업로드 및 미리보기 기능 구현 방법을 자세히 소개합니다. 업로드된 이미지를 즉시 확인할 수 있는 UI를 직접 만들어보세요.  

slug: 2025-04-28-image-preview
date: 2025-04-28 00:00:00+0000
lastmod: 2025-04-28 00:00:00+0000

alternates:
  - title: "jQuery - 이미지 파일 업로드 및 미리보기 기능 구현하기"
    href: "https://ctrlcccv.github.io/code/2025-04-28-image-preview/"
    hreflang: "ko"
  - title: "Implement Image File Upload and Preview using jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-04-29-image-preview/"
    hreflang: "en"
    
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-28-image-preview.webp

categories:
    - jQuery
tags:
    - 입력 태그 커스텀
---

웹에서 이미지를 업로드할 때, 사용자가 실시간으로 이미지를 확인할 수 있다면 어떨까요?

웹 개발을 하다 보면 사용자의 파일 업로드를 처리해야 할 상황이 자주 발생합니다. 특히 이미지 파일의 경우, 업로드 후 미리보기를 제공하면 사용자 만족도를 크게 높일 수 있습니다. 이번 포스트에서는 jQuery를 활용하여 이미지 파일을 업로드하고 미리 보는 기능을 어떻게 구현하는지 알아보겠습니다.

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
<div class="image_file">
    <label>
        <span class="upload"><img src="images/image_file_upload.png" alt="이미지 업로드"></span>
        <input type="file" class="file_input" accept="image/*">
    </label>
    <div class="preview">
        <span class="img_box"><img class="preview_img" src="#" alt="Selected Image"></span>
        <button type="button" class="delect"><img src="images/image_file_delect.png" alt="삭제"></button>
    </div>
</div>
```
* **업로드 라벨 및 버튼**  
<span class="txt">
label 안에 있는 span 요소가 업로드 버튼처럼 작동하며, 클릭 시 파일 선택창이 열립니다.   
버튼에는 직관적인 이미지가 적용되어 사용자 입장에서 사용하기 편리합니다.
</span>

* **미리보기 영역**  
<span class="txt">
이미지를 선택하면 .preview 영역이 나타나고, 선택한 이미지와 삭제 버튼이 함께 노출됩니다.   
사용자는 선택한 이미지를 바로 확인하고 원하면 다시 변경할 수 있습니다.
</span>

<br>

### 여러 개의 이미지 업로드 필드 구성하기

.image_file 클래스를 여러 번 사용하면, 각 필드마다 독립적으로 이미지 업로드와 미리보기 기능을 구현할 수 있습니다. 이를 활용하면 여러 장의 이미지를 업로드해야 하는 폼에서도 쉽게 적용할 수 있습니다.

```html
<!-- 첫 번째 이미지 업로드 필드 -->
<div class="image_file">
    <label>
        <span class="upload"><img src="images/image_file_upload.png" alt="이미지 업로드"></span>
        <input type="file" class="file_input" accept="image/*">
    </label>
    <div class="preview">
        <span class="img_box"><img class="preview_img" src="#" alt="선택한 이미지"></span>
        <button type="button" class="delect"><img src="images/image_file_delect.png" alt="삭제"></button>
    


<!-- 두 번째 이미지 업로드 필드 -->
<div class="image_file">
    <label>
        <span class="upload"><img src="images/image_file_upload.png" alt="이미지 업로드"></span>
        <input type="file" class="file_input" accept="image/*">
    </label>
    <div class="preview">
        <span class="img_box"><img class="preview_img" src="#" alt="선택한 이미지"></span>
        <button type="button" class="delect"><img src="images/image_file_delect.png" alt="삭제"></button>
    

```

이처럼 구조만 반복해서 작성하면, 자바스크립트가 각 .image_file 요소를 기준으로 동작하므로 서로 간섭 없이 각각 이미지 업로드와 삭제 기능을 사용할 수 있습니다.

<br>

## CSS 스타일

```css
.image_file { position: relative; width: 200px; height: 200px; margin: 150px auto 0; } 
.image_file label { display: block; height: 100%; cursor: pointer; } 
.image_file .upload { display: flex; height: 100%; border: 1px dashed #E5E5E5; border-radius: 6px; justify-content: center; align-items: center; background: #FFFFFF; } 
.image_file .upload img { width: 40px; height: 40px; } 
.image_file .file_input { position: absolute; width: 1px; height: 1px; margin: -1px; font-size: initial; overflow: hidden; clip: rect(0, 0, 0, 0); } 
.image_file .preview { display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; } 
.image_file .preview .img_box { display: block; height: 100%; border: 1px solid #E5E5E5; border-radius: 6px; background: #FFFFFF; cursor: pointer; } 
.image_file .preview .preview_img { width: 100%; height: 100%; object-fit: cover; } 
.image_file .preview .delect { position: absolute; top: 15px; right: 15px; width: 25px; height: 25px; padding: 0; border: none; background: none; cursor: pointer; } 
.image_file .preview .delect img { width: 100%; }   
```

* **전체 컨테이너**  
<span class="txt">.image_file 클래스는 업로드 UI 전체를 감싸며 크기, 위치, 정렬 등 레이아웃을 구성합니다.</span>  

* **업로드 버튼 스타일**  
<span class="txt">
.upload 클래스는 업로드 버튼을 보기 좋게 꾸며주며, 클릭 유도에 효과적인 스타일이 적용됩니다.  
중앙 정렬과 테두리 스타일로 사용자가 클릭하고 싶은 요소로 만듭니다.
</span>

* **파일 입력 숨김 처리**  
<span class="txt">
input[type="file"]은 기본 스타일을 완전히 숨기고, 대신 시각적인 요소가 클릭을 담당합니다.   
이로 인해 UI는 깔끔하게 유지되며, 기능은 그대로 유지됩니다.
</span>

* **미리보기 스타일**  
<span class="txt">선택된 이미지를 전체 영역에 꽉 채워 보여주며, 삭제 버튼은 항상 일정 위치에 고정됩니다.</span>  

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
$(document).ready(function(){
    imageFileUpload()
})

// 이미지 파일 업로드 버튼
function imageFileUpload() {
    $('.image_file .delect').on('click', handleDeleteClick);
    $('.image_file .file_input').on('change', handleFileInputChange);

    // 미리보기 이미지 클릭 시 파일 입력 요소 클릭 이벤트 트리거
    $('.image_file .preview_img').on('click', function() {
        $(this).closest('.image_file').find('.file_input').click(); // 파일 입력 요소 클릭
    });

    // 파일 입력 변경 시 미리보기 이미지 업데이트
    function handleFileInputChange() {
        const file = this.files[0]; // 선택된 파일
        const previewContainer = $(this).closest('.image_file').find('.preview'); // 미리보기 컨테이너
        const previewImage = previewContainer.find('.preview_img'); // 미리보기 이미지 요소
        if (file) {
            const reader = new FileReader(); // 파일 리더 생성
            reader.onload = (e) => {
                previewImage.attr('src', e.target.result); // 미리보기 이미지 설정
                previewContainer.show(); // 미리보기 컨테이너 표시
                previewContainer.closest('.image_file').find('.upload').hide(); // 업로드 버튼 숨김
            };
            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
        } else {
            resetPreview(previewContainer); // 파일이 선택되지 않았거나 취소된 경우 미리보기 초기화
        }
        let file_cnt=0;
        $('.file_select_pop .file_input').map(function(){
            if($(this).val()) file_cnt++;
        });
        $('.file_select_pop .file_cnt').html(file_cnt);
    }

    // 삭제 버튼 클릭 시 미리보기 및 파일 입력 초기화
    function handleDeleteClick() {
        const previewContainer = $(this).closest('.preview'); // 미리보기 컨테이너
        resetPreview(previewContainer);
        let file_cnt=0;
        $('.file_select_pop .file_input').map(function(){
            if($(this).val()) file_cnt++;
        });
        $('.file_select_pop .file_cnt').html(file_cnt);
    }

    // 미리보기 및 파일 입력 초기화
    function resetPreview(previewContainer) {
        const imageFileContainer = previewContainer.closest('.image_file'); // 이미지 파일 컨테이너
        imageFileContainer.find('.file_input').val(''); // 파일 입력 요소 초기화
        previewContainer.hide(); // 미리보기 컨테이너 숨김
        imageFileContainer.find('.upload').show(); // 업로드 버튼 다시 표시
    }
}   
```
* **이벤트 리스너 설정**  
<span class="txt">
파일 선택과 삭제 버튼에 각각 이벤트를 연결해, 상황에 따라 기능이 정확하게 작동하도록 합니다.  
각 기능이 명확하게 분리되어 있어 코드 구조도 깔끔합니다.
</span>  

* **미리보기 이미지 클릭**  
<span class="txt">
미리보기 이미지를 클릭하면 다시 파일 선택창이 열려 이미지를 다시 선택할 수 있습니다.  
직접 input을 클릭하는 대신 자연스러운 흐름으로 기능이 실행됩니다.
</span>

* **이미지 변경 시 처리**  
<span class="txt">
사용자가 파일을 선택하면 FileReader를 통해 이미지를 불러와 미리보기에 표시합니다.  
선택 직후 업로드 버튼은 숨겨지고 미리보기 화면이 활성화됩니다.
</span>

* **삭제 시 처리**  
<span class="txt">삭제 버튼 클릭 시 입력값과 미리보기가 모두 초기화되어, 사용자가 다시 이미지를 업로드할 수 있습니다.</span>  

* **초기화 함수**  
<span class="txt">
파일 입력값과 미리보기를 모두 초기 상태로 되돌리는 역할을 합니다.  
업로드 영역도 다시 활성화되며, 사용자가 곧바로 새로운 이미지를 선택할 수 있습니다.
</span>  

<br>

## 결론

이번 포스트에서는 jQuery를 활용한 이미지 업로드 및 미리보기 기능을 단계별로 구현해 보았습니다.  
이미지를 선택하면 바로 미리보기가 표시되고, 삭제나 재선택도 간편하게 할 수 있어 누구나 쉽게 사용할 수 있습니다.  
클릭 몇 번만으로 필요한 기능을 빠르게 사용할 수 있다는 점도 큰 장점입니다.  

이 포스팅이 유익하셨다면 댓글로 의견 남겨주세요!  
더 좋은 방향으로 함께 고민해 보면 좋겠습니다. 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-28-image-preview/">예제결과 미리보기</a>
    <a href="/code/2023-08-09-file-custom/">[관련글] input[type="file"] 태그 커스텀 (웹 접근성 개선)</a>
</div>
