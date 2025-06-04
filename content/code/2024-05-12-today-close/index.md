---
title: >  
    jQuery - 오늘 하루 보지 않기 (체크박스 클릭 후 닫기)

description: >  
    '오늘 하루 보지 않기' 기능을 jQuery와 쿠키를 이용하여 구현하는 방법에 대해 상세히 설명합니다. 사용자 경험을 방해하지 않는 효율적인 팝업 관리 방식을 배울 수 있습니다.

slug: 2024-05-12-today-close
date: 2024-05-12 00:00:00+0000
lastmod: 2024-05-12 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-05-12-today-close.webp

categories:
    - jQuery
tags:
    - 레이어 팝업
---
웹사이트 방문자에게 중요한 공지사항이나 이벤트 정보를 팝업을 통해 알리는 경우가 많습니다. 하지만 반복적으로 같은 팝업이 나타난다면 사용자의 불편함을 초래할 수 있습니다. '오늘 하루 보지 않기' 기능은 이러한 사용자의 불편함을 최소화하여 웹사이트의 사용성을 향상시킵니다. 이 글에서는 jQuery를 활용해 쿠키를 설정하고 확인함으로써 이 기능을 구현하는 방법에 대해 상세히 알아보겠습니다.  

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

먼저 팝업을 구성하는 HTML 요소를 구축합니다.

```html
<div class="popup">
    <div class="content">팝업 콘텐츠</div>
    <div class="btn_wrap">
        <label><input type="checkbox" class="today_chk">오늘 하루 보지 않기</label>
        <a href="#" class="close">닫기</a>
    </div>
</div>
```

* **팝업 컨테이너** : `popup` 클래스는 팝업 전체를 감싸는 컨테이너입니다.
* **팝업 내용** : `content` 클래스는 실제로 사용자에게 보여줄 팝업 내용을 포함하고 있습니다.
* **버튼 영역** : `btn_wrap` 클래스는 팝업 하단에 있는 버튼 영역을 나타냅니다.
* **체크박스** : '오늘 하루 보지 않기' 기능을 위한 체크박스 입력 필드입니다.
* **닫기 버튼** : 팝업을 닫는 역할을 합니다.

<br>

## CSS 스타일
```css
.popup {
    overflow: hidden;
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
}

.popup .btn_wrap {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #000;
}

.popup .btn_wrap label {
    font-size: 14px;
    color: #fff;
}

.popup .btn_wrap .today_chk {
    margin-right: 5px;
}

.popup .btn_wrap .close {
    margin-left: auto;
    font-size: 14px;
    color: #fff;
    text-decoration: none;
}

```
* **팝업 스타일** : 팝업은 픽스드 포지션을 사용하여 화면 중앙에 배치됩니다. `translate` 속성을 이용해 정확한 중앙에 있도록 합니다.
* **콘텐츠 및 버튼 영역 스타일링** : 내용과 버튼 래퍼는 `flex` 디스플레이를 사용해 가운데 정렬을 하며, 스타일링을 통해 시각적으로 보기 좋게 디자인합니다.

<br>

## jQuery 코드
```javascript
const $popup = $('.popup');
const hour = 24; // 24시간 동안 팝업 숨기기

// 닫기 버튼 클릭 시 팝업 숨기기와 쿠키 설정
$popup.on('click', '.close', function(e) {
    e.preventDefault();
    const hidePopup = $('.today_chk').prop('checked'); // 팝업을 숨길지 여부
    if (hidePopup) {
        const d = new Date();
        d.setTime(d.getTime() + (hour * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `hidePopup=true; ${expires}; path=/`; // 쿠키 설정
    }
    $popup.hide();
});

// 쿠키 확인하여 팝업을 보여줄지 결정
if (document.cookie.indexOf('hidePopup=true') >= 0) {
    $popup.hide(); // 팝업 숨기기
} else {
    $popup.show(); // 쿠키가 없으면 팝업을 보여줌
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


- **jQuery 변수 선언**
  - `$popup` 변수에는 `$('.popup')`의 jQuery 객체가 저장됩니다. 이를 통해 팝업 요소를 쉽게 조작할 수 있습니다.
  - 쿠키의 만료 시간을 24시간으로 설정하기 위해 hour 변수에는 24가 할당됩니다.

- **팝업 닫기 버튼 이벤트 핸들러**
  - 팝업 내부의 닫기 버튼(close 클래스)이 클릭 될 때 실행되는 핸들러를 정의합니다.
  - `e.preventDefault()`는 기본 이벤트 동작(링크를 통한 페이지 상단 이동)을 취소합니다.
  - '오늘 하루 보지 않기' 체크박스의 상태를 검사하여 `hidePopup` 변수에 저장합니다.

- **쿠키 설정**
  - 사용자가 체크박스를 선택했을 때 실행됩니다.
  - 현재 날짜와 시간으로 Date 객체를 생성하여 `d`에 저장합니다.
  - 현재 시각에 24시간을 더해 쿠키의 만료 시간을 설정합니다.
  - 쿠키의 만료 시간을 문자열로 변환하여 `expires` 변수에 저장합니다.
  - `'hidePopup=true'`라는 이름의 쿠키를 설정하고 해당 만료 시간과 함께 저장합니다. `path=/`는 사이트 전역에서 쿠키가 유효함을 의미합니다.
  - 쿠키를 설정한 후 팝업을 숨깁니다.

- **쿠키 확인 함수**
  - 페이지가 로드될 때 쿠키의 상태에 따라 팝업을 보여줄지 결정하는 함수를 정의합니다.
  - `'hidePopup=true'`를 포함하는지 확인하여 쿠키 상태를 판단합니다.
  - `'hidePopup=true'`가 쿠키에 포함되어 있다면 팝업을 숨깁니다.
  - `'hidePopup=true'`가 쿠키에 포함되어 있지 않다면, 즉, 사용자가 '오늘 하루 보지 않기'를 선택하지 않았다면 팝업을 보여줍니다.

- **쿠키 상태 확인 및 팝업 표시**
  - 페이지 로드 시 쿠키를 확인하고 팝업의 표시 여부를 결정합니다.
  
<br>

## 결론
위 코드를 통해 jQuery와 쿠키를 이용해 '오늘 하루 보지 않기' 기능을 간단히 구현할 수 있음을 확인했습니다. 웹사이트에 방문하는 사용자에게 양질의 경험을 제공하면서 중요한 정보를 효과적으로 전달하는 방법으로 활용할 수 있습니다.  

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-05-12-today-close/" target="_blank">예제결과 미리보기</a>
</div>

