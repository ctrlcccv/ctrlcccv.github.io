---
title: overscroll-behavior로 팝업 내부 스크롤과 body 스크롤 제어하기
description: 레이어 팝업 안에서만 스크롤 되도록 만들고, 배경 스크롤까지 제어하는 방법을 알려 드립니다. overscroll-behavior와 jQuery를 활용한 팝업 구현 팁을 확인해보세요.
slug: 2023-03-13-popup-scroll
date: 2023-03-13 00:00:00+0000
lastmod: 2025-05-02 00:00:00+0000

alternates:
  - title: "overscroll-behavior로 팝업 내부 스크롤과 body 스크롤 제어하기"
    href: "https://ctrlcccv.github.io/code/2023-03-13-popup-scroll/"
    hreflang: "ko"
  - title: "Disable Body Scroll Behind Popups (overscroll-behavior)"
    href: "https://ctrlcccv.github.io/code-en/2025-05-09-popup-scroll/"
    hreflang: "en"
  - title: "overscroll-behavior로 팝업 내부 스크롤과 body 스크롤 제어하기"
    href: "https://ctrlcccv.github.io/code/2023-03-13-popup-scroll/"
    hreflang: "x-default"
    
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/popup-scroll.webp

categories:
    - jQuery
tags:
    - 레이어 팝업
---

팝업을 띄웠을 때, 배경이 같이 스크롤 되면 불편하지 않으셨나요?  
특히 모바일에서 팝업 내용을 스크롤 하려고 했는데, 배경까지 움직이면 헷갈리고 짜증 나기 쉽습니다.  
이 글에서는 `overscroll-behavior`와 jQuery를 활용하여 팝업 안에서만 스크롤 되도록 만들고, 필요에 따라 배경(body) 스크롤도 완전히 차단하는 방법을 알려 드립니다.

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
<div class="wrap ko">
    <a href="#" class="btn">배경(body) 스크롤 활성화<br>(overscroll-behavior:none 속성만 사용)</a>
    <a href="#" class="btn type_disable">배경(body) 스크롤 비활성화</a>
</div>

<div class="pop_wrap">
    <div class="bg"></div>
    <div class="popup">
        <a href="#" class="close"><img src="images/close.png" alt="닫기"></a>
        <div class="popup_con">
            컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠<br>컨텐츠
        </div>
    </div>
</div>
```

* **팝업 트리거 버튼**  
  `.btn`은 팝업을 띄우는 버튼입니다. `type_disable`이 붙은 버튼은 배경 스크롤까지 비활성화합니다.

* **팝업 구조**  
  `.pop_wrap`은 전체를 덮는 팝업 영역이며, `.popup`은 실질적인 콘텐츠 영역입니다.

<br>

## CSS 스타일 

```css
.wrap {
    min-height: 200vh;
    padding: 30px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
}

/* 스크롤 막기 CSS */
.disable_scroll {
    overflow: hidden;
    width: 100%;
    height: 100%;
    touch-action: none;
}

/* 팝업 CSS */
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 200px;
    background: #8ab4f8;
    font-size: 16px;
    color: #000;
    text-decoration: none;
    word-break: keep-all;
}

.pop_wrap {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
}

.pop_wrap .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;
}

.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    height: 280px;
    max-width: 90vw;
    max-height: 90vh;
    background: #fff;
    z-index: 2;
    transform: translate(-50%, -50%);
}

.popup .close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 17px;
    height: 17px;
}

.popup .close img {
    width: 100%;
    height: 100%;
}

.popup .popup_con {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 15px;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    overscroll-behavior: none;
}
```
* **.popup_con에서만 스크롤**  
  `overflow: auto`와 `overscroll-behavior: none` 덕분에 팝업 안에서만 스크롤되며, 바깥 배경은 스크롤되지 않습니다.

<br>

## jQuery 코드

```javascript
$(document).ready(function () {
    popup();
});

function popup() {
    // 팝업 열기
    $('.btn').on('click', function (e) {
        e.preventDefault();
        $('.pop_wrap').fadeIn(300);
        if ($(this).hasClass('type_disable')) {
            // 선택사항 : 팝업이 열릴 때 배경(body) 스크롤 비활성화
            $("body").addClass('disable_scroll');
        }
    });

    // 팝업 닫기
    $('.pop_wrap .bg, .pop_wrap .close').on('click', function (e) {
        e.preventDefault();
        $('.pop_wrap').fadeOut(100);
        // 선택사항 : 팝업이 열릴 때 배경(body) 스크롤 비활성화
        $("body").removeClass('disable_scroll');
    });
}
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


* **팝업 열기**  
  버튼 클릭 시 `.pop_wrap`을 보여주며, `.type_disable` 클래스가 있을 경우 `body`에 `.disable_scroll`을 추가해 스크롤을 막습니다.

* **팝업 닫기**  
  배경이나 닫기 버튼 클릭 시 팝업을 숨기고 스크롤 차단도 해제합니다.

<br>

## disable_scroll 클래스의 역할과 차이점

팝업이 열릴 때 `body`에 `.disable_scroll`을 추가하면 다음과 같은 효과가 있습니다.

* **배경 스크롤 완전 차단**  
  사용자가 팝업 외부를 스크롤 하려고 해도 움직이지 않습니다.

* **모바일 터치 제어까지 차단**  
  `touch-action: none`으로 모바일 터치 반응도 막습니다.

* **화면 고정 유지**  
  팝업이 떠도 기존 위치가 고정되어, 화면이 밀리는 현상이 없습니다.

<br>

### overscroll-behavior vs disable_scroll

| 구분 | overscroll-behavior: none | .disable_scroll |
|------|---------------------------|------------------|
| 내부 스크롤이 끝났을 때 배경 스크롤 전파 | 차단 | 차단 |
| 사용자가 직접 배경을 스크롤 하려고 할 때 | 가능 | 불가능 |
| 모바일 터치 반응 | 허용 | 차단 |

<br>

## 결론

팝업 안에서만 스크롤되고, 배경은 고정시키고 싶을 때 `overscroll-behavior` 속성만으로도 충분한 경우가 많습니다.  
하지만 외부 스크롤을 아예 막고 싶다면, `.disable_scroll`을 함께 사용해 더 강력한 제어를 할 수 있습니다.

어떤 방식이 더 나은지는 상황에 따라 달라집니다.  
더 궁금한 점이나 여러분의 팁이 있다면 댓글로 공유해주세요! 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-03-13-popup-scroll/">예제결과 미리보기</a>
</div>


