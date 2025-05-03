---
title: jQuery - 마우스 움직임에 따라 이미지가 확대되는 코드 구현
description: >  
    jQuery를 활용하여 마우스를 가져다 대면 이미지가 확대되며 마우스를 중심으로 주변 상세한 내용을 볼 수 있는 효과를 구현합니다.  

slug: 2023-12-18-image-zoom2
date: 2023-12-18 00:00:00+0000
lastmod: 2023-12-18 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-18-image-zoom2.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
웹사이트에서 이미지에 마우스를 가져다 대면 이미지가 확대되며 마우스를 중심으로 주변 상세한 내용을 볼 수 있는 기능은 사용자 경험을 향상시키는 흔한 방법의 하나입니다. 이 글에서는 jQuery와 CSS의 기능을 결합하여 마우스 커서의 위치에 따라 이미지를 돋보기처럼 확대하는 효과를 만드는 방법을 설명합니다. 이 기능은 제품 이미지, 지도, 미술 작품과 같이 세부적인 부분을 가까이에서 살펴보아야 할 때 유용합니다.  

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
<div class="image">
    <img src="https://picsum.photos/id/20/1000/1000" alt="이미지">
</div>
```
* **이미지 컨테이너**  

  * div 태그로 구성된 image 클래스는 이미지를 감싸며 이미지 확대를 위한 컨테이너 역할을 합니다.
  * 내부에 있는 img 태그는 실제 표시될 이미지를 나타냅니다.  
<br>

## CSS 스타일
```css
.image { overflow: hidden; position: relative; width: 400px; height: 400px; } 
.image:hover { --zoom: 2; } 
.image img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(var(--zoom, 1)); transform-origin: var(--x) var(--y); transition: transform 0.3s ease; } 
```
* **컨테이너 스타일링**
  * image 클래스는 overflow: hidden 속성으로 이미지가 컨테이너 바깥으로 넘쳐흐르지 않게 합니다.
  * 마우스 호버 시 확대되는 배율(--zoom)을 정의합니다.

* **이미지 스타일링**
  * img 태그는 position: absolute로 정의되어 컨테이너 내에서 자유롭게 위치할 수 있습니다.
  * `transform: scale(var(--zoom, 1))` 속성을 통해 초기 상태 혹은 호버 상태의 확대 배율을 조절합니다.
  * transform-origin 속성을 사용하여 마우스 위치에 따라 이미지가 확대될 중심점을 변경합니다.
  * transition 속성으로 확대 효과에 애니메이션을 적용하여 시각적으로 부드럽게 처리합니다.  

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
// 이미지 컨테이너에 마우스 이벤트를 바인딩합니다.
$('.image').on('mouseenter', function() {
    // 이미지 컨테이너의 위치와 크기 정보를 저장합니다.
    const rect = this.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // 마우스가 움직일 때 이벤트를 처리합니다.
    $(this).off('mousemove').on('mousemove', function(e) {
        // 마우스 포인터의 위치를 기반으로 이미지 확대 위치를 계산합니다.
        const xPos = (e.clientX - rect.left) / width * 100;
        const yPos = (e.clientY - rect.top) / height * 100;

        // CSS 변수를 업데이트하여 이미지 확대 위치를 조정합니다.
        $(this).css('--x', xPos + '%');
        $(this).css('--y', yPos + '%');
    });
});
```
* **이벤트 바인딩**
  * image 클래스 요소에 mouseenter 이벤트가 바인딩 됩니다.
  * 이벤트 발생 시, getBoundingClientRect를 이용해 요소의 크기 및 위치 정보를 가져옵니다.

* **마우스 포지션 계산**
  * mousemove 이벤트를 통해 마우스의 현재 위치가 감지됩니다.
  * 마우스의 x, y 좌표를 상대적인 위치의 퍼센티지로 변환합니다.

* **CSS 변수 조정**
  * jQuery의 CSS 메소드를 이용해 `--x`와 `--y` CSS 변수를 동적으로 업데이트합니다.
  * 이를 통해 transform-origin 속성이 마우스 위치에 따라 조절되어, 마우스가 있는 위치에서 이미지가 확대됩니다.  
<br>


## 결론
jQuery와 CSS를 사용하여 마우스 움직임에 반응하여 이미지를 확대하는 기능을 구현하는 방법을 소개하였습니다. 이러한 기술은 사용자가 웹사이트의 특정 요소에 더 집중할 수 있게 하며, 상세한 내용을 확인할 수 있기 때문에 전자 상거래 사이트, 갤러리, 혹은 지도 서비스에 적합합니다. 이 방법은 수정 및 재사용이 용이하여 다른 환경에도 적용할 수 있습니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-18-image-zoom2/">예제결과 미리보기</a>
    <a href="https://ctrlcccv.github.io/code/2023-12-15-image-zoom/">[관련글] jQuery - 쇼핑몰 상품 상세페이지 이미지 확대</a>
</div>