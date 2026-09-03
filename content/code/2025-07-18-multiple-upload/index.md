---
title: > 
    jQuery 다중 파일 업로드, 삭제 기능까지 완벽 구현하기
description:  >
    jQuery로 다중 파일 업로드를 구현하는 실전 가이드입니다. 파일 선택부터 삭제까지, 반응형 디자인과 사용자 친화적 UI가 적용된 완성도 높은 예제로 한 번에 배워보세요.
slug: 2025-07-18-multiple-upload
date: 2025-07-18 00:00:00+0000
lastmod: 2025-07-18 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-07-18-multiple-upload.webp
categories:
    - jQuery
tags:
    - 파일 업로드
---

웹 개발을 하다 보면 사용자가 여러 파일을 한 번에 업로드할 수 있는 기능이 필요할 때가 많죠. 특히 이미지 갤러리나 문서 관리 시스템을 만들 때 "파일을 하나씩 선택하는 게 너무 번거롭다"는 사용자 피드백을 받곤 해요.

저도 처음엔 HTML의 기본 `<input type="file">` 태그만 사용해서 단순한 파일 업로드만 구현했는데, 사용자 경험이 정말 아쉬웠어요. 파일을 선택한 후 어떤 파일들이 선택되었는지 확인할 수 없고, 실수로 선택한 파일을 삭제하는 것도 불가능했거든요.

이 글에서는 jQuery를 활용해서 다중 파일 업로드부터 개별 파일 삭제, 반응형 디자인까지 완벽하게 구현하는 방법을 3단계로 나누어 설명드리겠습니다. 파일 선택부터 개별 삭제, 반응형 디자인까지 실무에서 바로 활용할 수 있는 완성도 높은 예제로 준비했어요.

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-07-18-multiple-upload/">예제결과 미리보기</a>
</div>

<br/>

## jQuery 다중 파일 업로드란?

**jQuery 다중 파일 업로드**는 사용자가 여러 개의 파일을 한 번에 선택하고, 업로드 전에 선택된 파일 목록을 확인하며, 필요에 따라 개별 파일을 삭제할 수 있는 웹 인터페이스 기능입니다.

기본 HTML `<input type="file" multiple>` 태그만으로는 다음과 같은 한계가 있어요.
- 선택된 파일 목록을 시각적으로 확인 불가
- 개별 파일 삭제 기능 없음
- 모바일 환경에서 사용성 저하
- 커스텀 디자인 적용 어려움

jQuery를 활용하면 이러한 문제점들을 모두 해결하고, 사용자 친화적인 파일 업로드 인터페이스를 만들 수 있습니다.

<br/>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br/>

### 주요 구성 요소

| 구성 요소 | 역할 | 특징 |
|----------|------|------|
| **file input** | 파일 선택 | `multiple` 속성으로 다중 선택 지원 |
| **파일 목록 영역** | 선택된 파일 표시 | 동적으로 파일 정보 렌더링 |
| **삭제 버튼** | 개별 파일 제거 | 클릭 시 목록에서 즉시 삭제 |
| **반응형 레이아웃** | 모바일 최적화 | 화면 크기별 최적화된 UI |

<br/>

## 1단계: HTML 구조 설계

먼저 파일 업로드에 필요한 기본 HTML 구조를 만들어보겠습니다.

```html
<div class="file_upload_wrap">
    <input type="file" id="fileInput" name="attachments[]" multiple>
    <button type="button" class="file_upload_btn">파일추가</button>
    <div class="file_list" id="fileList"></div>
</div>
```

<br/>

### HTML 구조 핵심 포인트

**1. 접근성 고려한 설계**
- `input[type="file"]`을 숨기고 버튼으로 트리거 하는 방식
- `name="attachments[]"` 배열 형태로 서버 전송 준비

**2. 시맨틱 마크업**
- `file_upload_wrap`: 전체 영역을 감싸는 컨테이너
- `file_upload_btn`: 파일 선택을 유도하는 버튼
- `file_list`: 선택된 파일 목록이 표시될 영역

**3. 확장성 고려**
- 명확한 클래스명으로 CSS와 JavaScript 연동 용이
- ID와 클래스 분리로 재사용성 향상

<br/>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br/>

## 2단계: CSS 스타일링 완벽 구현

### 메인 컨테이너 스타일

```css
/* 파일 업로드 메인 컨테이너 */
.file_upload_wrap {
    max-width: 500px;
    margin: 0 auto;
    padding: 24px;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}
```

<br/>

### 파일 입력 필드 숨김 처리

```css
/* 파일 입력 필드 숨김 - 접근성을 고려한 완전한 숨김 */
.file_upload_wrap input[type="file"] { 
    position: absolute; 
    width: 1px; 
    height: 1px; 
    margin: -1px; 
    padding: 0;
    font-size: initial; 
    overflow: hidden; 
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

**왜 이렇게 복잡하게 숨길까요?**
- `display: none`이나 `visibility: hidden`을 사용하면 스크린 리더에서 접근할 수 없어요.
- 위 방법은 화면에서는 보이지 않지만, 접근성 도구로는 접근할 수 있어요.

<br/>

### 파일 업로드 버튼 스타일링

```css
/* 파일 업로드 버튼 */
.file_upload_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 16px 20px;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, background-color;
    transform: translateZ(0);
}

.file_upload_btn:hover {
    background: #2563eb;
    transform: translateY(-1px) translateZ(0);
}

.file_upload_btn:active {
    transform: translateY(0) translateZ(0);
}

.file_upload_btn:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}
```

<br/>

### 파일 목록 영역 스타일

```css
/* 파일 목록 컨테이너 */
.file_list {
    margin-top: 16px;
}

/* 개별 파일 아이템 */
.file_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 12px 16px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, background-color;
    transform: translateZ(0);
}

.file_item:last-child {
    margin-bottom: 0;
}

.file_item:hover {
    background: #e2e8f0;
    border-color: #cbd5e1;
    transform: translateX(2px) translateZ(0);
}

/* 파일명 표시 */
.file_name {
    flex: 1;
    margin-right: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #334155;
    word-break: break-all;
    line-height: 1.4;
}

/* 파일 삭제 버튼 */
.file_delete_btn {
    flex-shrink: 0;
    padding: 6px 12px;
    background: #ef4444;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, background-color;
    transform: translateZ(0);
}

.file_delete_btn:hover {
    background: #dc2626;
    transform: scale(1.05) translateZ(0);
}

.file_delete_btn:active {
    transform: scale(0.95) translateZ(0);
}

.file_delete_btn:focus {
    outline: 2px solid #ef4444;
    outline-offset: 2px;
}
```

<br/>

### 애니메이션 효과

```css
/* 파일 아이템 등장 애니메이션 */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px) translateZ(0);
    }
    to {
        opacity: 1;
        transform: translateY(0) translateZ(0);
    }
}

.file_item {
    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 파일 없을 때 안내 메시지 */
.file_list:empty::after {
    content: '업로드할 파일을 선택해주세요.';
    display: block;
    margin-top: 16px;
    padding: 20px;
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    color: #64748b;
    text-align: center;
    transition: all 0.3s ease;
}
```

<br/>

### 반응형 디자인

```css
/* 모바일 반응형 */
@media (max-width: 480px) {
    .file_upload_wrap {
        padding: 20px;
        margin: 0 16px;
    }
    
    .file_upload_btn {
        padding: 14px 16px;
        font-size: 15px;
    }
    
    .file_item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 14px 16px;
    }
    
    .file_name {
        margin-right: 0;
        margin-bottom: 4px;
    }
    
    .file_delete_btn {
        align-self: flex-end;
    }
    
    .file_item:hover {
        transform: none;
        background: #f1f5f9;
        border-color: #e2e8f0;
    }
}
```

<br/>

### 성능 최적화 CSS

```css
/* 성능 최적화 */
.file_list {
    scroll-behavior: smooth;
}

.file_upload_btn,
.file_item,
.file_delete_btn {
    backface-visibility: hidden;
    perspective: 1000px;
}

.file_item * {
    box-sizing: border-box;
}

.file_upload_wrap {
    contain: layout style paint;
}
```

<br/>

<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<br/>

## 3단계: jQuery 기능 구현

### 전체 jQuery 코드

```javascript
function initFileUpload() {
    // 상수 정의
    const DELETE_BTN = 'file_delete_btn';  // 삭제 버튼 클래스
    const FILE_ITEM = 'file_item';         // 파일 아이템 클래스
    const FILE_NAME = 'file_name';         // 파일명 클래스

    // DOM 요소 캐싱
    const $input = $('#fileInput');         // 파일 입력 필드
    const $list = $('#fileList');          // 파일 목록 컨테이너
    const $button = $('.file_upload_btn'); // 업로드 버튼
    
    // 파일 저장 배열
    let files = [];

    // 이벤트 바인딩
    $button.on('click', () => $input.trigger('click'));
    $input[0].addEventListener('change', handleChange);
    $list.on('click', `.${DELETE_BTN}`, handleDelete);

    // 파일 선택 처리
    function handleChange(e) {
        const selectedFiles = Array.from(e.target.files);
        const $fragment = $(document.createDocumentFragment());
        
        selectedFiles.forEach(file => {
            if (!isDuplicate(file)) {
                files.push(file);
                $fragment.append(createItem(file));
            }
        });
        
        if ($fragment.children().length > 0) {
            $list.append($fragment);
        }
        
        $input.val('');
    }

    // 파일 삭제 처리
    function handleDelete() {
        const $item = $(this).closest(`.${FILE_ITEM}`);
        const fileName = $item.find(`.${FILE_NAME}`).text().trim();
        const index = files.findIndex(file => file.name === fileName);
        
        if (index !== -1) {
            files.splice(index, 1);
            $item.fadeOut(200, function() {
                $(this).remove();
            });
        }
    }

    // 중복 파일 검사
    function isDuplicate(file) {
        return files.some(f => 
            f.name === file.name && 
            f.size === file.size && 
            f.lastModified === file.lastModified
        );
    }

    // 파일 아이템 생성
    function createItem(file) {
        return $('<div>', {
            class: FILE_ITEM,
            html: [
                $('<span>', { class: FILE_NAME, text: file.name }),
                $('<button>', { type: 'button', class: DELETE_BTN, text: '삭제' })
            ]
        });
    }
}

// 초기화
$(document).ready(function() {
    initFileUpload();
});
```

<br/>

### jQuery 코드 핵심 포인트 상세 설명

#### 1. 상수 정의와 DOM 캐싱

```javascript
// 상수 정의 - 유지보수성을 위한 클래스명 관리
const DELETE_BTN = 'file_delete_btn';
const FILE_ITEM = 'file_item';
const FILE_NAME = 'file_name';

// DOM 요소 캐싱 - 성능 최적화
const $input = $('#fileInput');
const $list = $('#fileList');
const $button = $('.file_upload_btn');
```

**왜 이렇게 할까요?**
- **유지보수성**: 클래스명이 변경되면 상수만 수정하면 돼요.
- **성능 최적화**: DOM 요소를 한 번만 찾아서 캐싱해두면 반복 접근 시 빨라져요.

<br/>

#### 2. 이벤트 바인딩 전략

```javascript
// 이벤트 바인딩
$button.on('click', () => $input.trigger('click'));
$input[0].addEventListener('change', handleChange);
$list.on('click', `.${DELETE_BTN}`, handleDelete);
```

**핵심 포인트:**
- **버튼 클릭 → 파일 입력 트리거**: 사용자 친화적 인터페이스
- **네이티브 이벤트 사용**: `change` 이벤트는 성능상 네이티브가 더 좋아요.
- **이벤트 위임**: 동적으로 추가되는 삭제 버튼에 대해 부모 요소에 이벤트 위임

<br/>

#### 3. 파일 선택 처리 로직

```javascript
function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    const $fragment = $(document.createDocumentFragment());
    
    selectedFiles.forEach(file => {
        if (!isDuplicate(file)) {
            files.push(file);
            $fragment.append(createItem(file));
        }
    });
    
    if ($fragment.children().length > 0) {
        $list.append($fragment);
    }
    
    $input.val('');
}
```

**핵심 최적화 기법:**
- **DocumentFragment 활용**: DOM 조작을 일괄 처리해서 리플로우 최소화
- **중복 체크**: 같은 파일을 여러 번 추가하는 것 방지
- **input 초기화**: 같은 파일을 다시 선택할 수 있도록 초기화

<br/>

#### 4. 파일 삭제 처리

```javascript
function handleDelete() {
    const $item = $(this).closest(`.${FILE_ITEM}`);
    const fileName = $item.find(`.${FILE_NAME}`).text().trim();
    const index = files.findIndex(file => file.name === fileName);
    
    if (index !== -1) {
        files.splice(index, 1);
        $item.fadeOut(200, function() {
            $(this).remove();
        });
    }
}
```

**중요한 고려사항:**
- **파일명으로 식별**: 배열에서 해당 파일을 찾아서 삭제
- **애니메이션 효과**: `fadeOut`으로 자연스러운 삭제 효과
- **콜백 처리**: 애니메이션 완료 후 DOM에서 완전 제거

<br/>

#### 5. 중복 파일 검사

```javascript
// ✅ 올바른 방법: 이름, 크기, 수정일 모두 비교
function isDuplicate(file) {
    return files.some(f => 
        f.name === file.name && 
        f.size === file.size && 
        f.lastModified === file.lastModified
    );
}
```

**왜 파일 크기와 수정일까지 비교해야 할까요?**
- 같은 이름이지만 다른 내용의 파일이 있을 수 있어요.
- 파일 크기와 수정일까지 비교하면 더 정확한 중복 파일 검사를 할 수 있어요.

<br/>

#### 6. 동적 요소 생성

```javascript
function createItem(file) {
    return $('<div>', {
        class: FILE_ITEM,
        html: [
            $('<span>', { class: FILE_NAME, text: file.name }),
            $('<button>', { type: 'button', class: DELETE_BTN, text: '삭제' })
        ]
    });
}
```

**jQuery 객체 생성의 효율적 방법:**
- 한 번에 요소와 속성을 모두 설정
- 배열 형태로 자식 요소들을 한 번에 추가
- XSS 방지를 위해 `text()` 메서드 사용

<br/>

## 자주 묻는 질문 (FAQ)

### Q1. 다중 파일 업로드에서 파일 개수 제한은 어떻게 설정하나요?

A1. 파일 선택 시 배열 길이를 체크하여 제한할 수 있습니다.

```javascript
function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    const maxFiles = 5; // 최대 5개 파일
    
    if (files.length + selectedFiles.length > maxFiles) {
        alert(`최대 ${maxFiles}개 파일까지만 선택할 수 있습니다.`);
        return;
    }
    
    // 기존 로직 계속...
}
```

<br/>

### Q2. 이미지 파일만 선택하도록 제한하려면?

A2. `accept` 속성을 사용하면 파일 선택 다이얼로그에서 특정 형식만 표시됩니다.

```html
<!-- 이미지 파일만 허용 -->
<input type="file" id="fileInput" accept="image/*" multiple>

<!-- 특정 확장자만 허용 -->
<input type="file" id="fileInput" accept=".jpg,.jpeg,.png,.pdf" multiple>
```

<br/>

### Q3. 모바일에서 카메라로 직접 촬영한 사진을 업로드하려면?

A3. `capture` 속성을 추가하면 모바일에서 카메라 직접 접근이 가능합니다.

```html
<input type="file" accept="image/*" capture="environment" multiple>
```

- `capture="user"`: 전면 카메라
- `capture="environment"`: 후면 카메라

<br/>

### Q4. 파일 크기 제한은 어떻게 구현하나요?

A4. 파일 선택 시 각 파일의 size 속성을 확인하여 제한할 수 있습니다.

```javascript
function handleChange(e) {
    const selectedFiles = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    for (let file of selectedFiles) {
        if (file.size > maxSize) {
            alert(`파일 크기가 너무 큽니다: ${file.name} (최대 5MB)`);
            return;
        }
    }
    
    // 기존 로직 계속...
}
```

<br/>

## 마무리

jQuery를 활용한 다중 파일 업로드 기능 구현을 3단계로 나누어 살펴보았습니다. 단순한 파일 선택부터 **파일 업로드 삭제 기능**, **반응형 파일 업로드**, **모바일 파일 업로드** 최적화까지 실무에서 바로 활용할 수 있는 완성도 높은 예제를 만들어보았어요.

<br/>

### 핵심 포인트 정리

1. **접근성 고려**: 파일 input 숨김과 버튼 연동으로 사용자 친화적 인터페이스
2. **성능 최적화**: DocumentFragment, 이벤트 위임, DOM 캐싱 활용
3. **사용자 경험**: 직관적인 UI, 애니메이션 효과, 반응형 디자인
4. **확장성**: 파일 개수 제한, 파일 형식 제한 등 실무 요구사항 대응
5. **호환성**: 다양한 브라우저 환경 대응과 IE 폴리필

특히 **HTML 파일 업로드 예제**를 통해 보셨듯이, 단순해 보이는 기능도 사용자 친화적으로 만들려면 많은 세심한 배려가 필요해요. 이번 예제가 여러분의 프로젝트에서 더 나은 **파일 업로드 구현**에 도움이 되었기를 바랍니다.

혹시 구현 과정에서 궁금한 점이나 개선 아이디어가 있으시면 댓글로 공유해 주세요. 함께 더 나은 사용자 경험을 만들어 나가요! 🚀

다음에는 **파일 업로드 진행바 구현**이나 **드래그 앤 드롭 파일 업로드** 등의 고급 기능들을 별도 글로 더 자세히 다뤄보겠습니다.

<br>
