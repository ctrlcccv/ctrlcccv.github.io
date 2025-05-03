---
title: jQuery - 마우스 따라 움직이는 눈 만들기
description: >  
    jQuery를 사용하여 마우스 움직임에 반응하는 눈동자 효과를 구현하는 방법을 탐구합니다. HTML과 CSS로 기본 구조와 스타일을 설정하고, jQuery로 동적인 움직임을 추가하는 과정을 자세히 다룹니다.
slug: 2023-11-29-cursor-eye
date: 2023-11-29 00:00:00+0000
lastmod: 2023-11-29 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-29-cursor-eye.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
jQuery를 활용하여 마우스 움직임에 따라 움직이는 눈의 효과를 구현하는 방법을 소개합니다. 이 코드는 웹 페이지에 독특한 상호작용 요소를 추가하며, 사용자의 마우스 움직임을 추적하여 눈동자가 마우스 커서를 따라 움직이는 시각적 효과를 생성합니다. 이런 종류의 동적인 요소는 페이지에 재미와 참여도를 더하는 데 효과적입니다.  

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

<br>

## HTML 구조
```html
<div class="eyes">
    <span class="eye"></span>
    <span class="eye"></span>
</div>
```
* **컨테이너**  
  * eyes 클래스는 두 개의 눈을 담는 컨테이너로 작동합니다. 눈 요소를 그룹화하고, 전체적인 레이아웃을 관리합니다.

* **눈을 나타내는 요소**
  * eye 클래스는 하나의 눈을 대표합니다. CSS를 통해 눈의 모양, 크기, 색상 등 스타일 속성을 갖습니다.  
<br>

## CSS 스타일
```css
.eyes { display: flex; flex-wrap: wrap; position: relative; } 
.eye { position: relative; top: 0; width: 100px; height: 100px; margin: 0 15px; background: #fff; border-radius: 50%; } 
.eye:before { content: ''; position: absolute; top: 50px; left:25px; width:45px; height: 45px; background: #333; border-radius: 50%; transform: translate(-50%, -50%); } 
```
* eye 클래스에는 눈의 모양과 크기를 정의하는 스타일이 적용됩니다.
* .eye::before 의사 요소는 눈동자를 나타내며, 위치와 크기가 정의됩니다.  

### 눈 디자인 변경하는 방법

* **눈 크기 조정**  
  * eye 클래스의 width와 height 속성을 변경하여 눈의 크기를 조절할 수 있습니다.
  * 눈동자의 크기도 .eye:before의 width와 height 속성을 변경하여 조절할 수 있습니다.

* **눈 위치 조정**  
  * eye 클래스에 margin 속성을 변경하여 눈의 위치를 조정할 수 있습니다.
  * 눈동자의 초기 위치는 .eye:before의 top과 left 속성으로 조절합니다. top 속성은 수직 위치를, left 속성은 수평 위치를 조정합니다.

* **눈 색상 조정**  
  * eye 클래스의 background 속성을 변경하여 눈의 배경색을 조절할 수 있습니다.
  * 눈동자의 색상은 .eye:before의 background 속성으로 변경합니다.

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

<br>

## jQuery 코드
```js
// 마우스 움직임 이벤트 리스너를 설정합니다.
$(document).mousemove(function(event) {
    // 각 '.eye' 클래스를 가진 요소에 대해 반복합니다.
    $('.eye').each(function() {
        // 현재 눈의 중심 좌표를 계산합니다. 
        const centerX = $(this).offset().left + $(this).width() / 2;
        const centerY = $(this).offset().top + $(this).height() / 2;

        // 마우스 위치와 눈의 중심 사이의 각도를 계산합니다.
        const angle = Math.atan2(event.pageX - centerX, event.pageY - centerY);

        // 각도를 도(degree) 단위로 변환하고, 270도를 더해 눈동자가 마우스를 바라보도록 조정합니다.
        const rotateDeg = (angle * (180 / Math.PI) * -1) + 270;

        // 계산된 각도로 눈동자의 회전을 설정합니다.
        $(this).css('transform', `rotate(${rotateDeg}deg)`);
    });
});
```
* **마우스 이벤트 설정**  
  * $(document).mousemove() : 페이지 전체에 대한 마우스 움직임을 감지합니다.   
  마우스가 움직일 때마다 해당 이벤트가 활성화됩니다.

* **눈 요소 처리**  
  * $('.eye').each() : 페이지 내의 모든 eye 클래스 요소를 대상으로 함수를 실행합니다.  
  이를 통해 각 눈이 개별적으로 마우스 움직임에 반응합니다.

* **눈동자 위치 계산**  
  * $(this).offset() : 각 .eye 요소의 페이지 내 위치를 파악합니다.
  * $(this).width()와 $(this).height() : 눈의 크기를 측정합니다.
  * centerX, centerY : 눈의 중심 좌표를 계산합니다.

* **마우스와 눈 사이 각도 계산**  
  * Math.atan2() : 마우스 위치와 눈 중심 사이의 각도를 계산합니다.  

* **눈동자 회전 적용**  
  * 각도 계산 후, $(this).css('transform', 'rotate(…)')를 사용하여 각 눈 요소를 회전시킵니다.   
  결과적으로 눈동자가 마우스를 따라 움직이는 효과가 생깁니다.  
<br>

## 결론
Query를 활용하여 마우스 움직임을 따라 눈이 움직이는 효과를 구현하는 방법을 상세히 설명했습니다. HTML과 CSS를 사용하여 눈의 기본 구조와 스타일을 설정하고, jQuery 스크립트를 통해 동적인 움직임을 추가하는 과정을 자세히 다뤘습니다. 그뿐만 아니라, CSS를 활용하여 눈의 디자인을 커스터마이징하는 방법에 대해서도 살펴보았습니다. 이러한 기술은 웹사이트에 독특한 시각적 요소를 추가하여 사용자의 관심을 끌고 참여를 유도하는 데 큰 도움이 됩니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-29-cursor-eye/">예제결과 미리보기</a>
</div>