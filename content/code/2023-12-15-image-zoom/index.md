---
title: jQuery - 쇼핑몰 상품 상세페이지 이미지 확대
description: >  
    쇼핑몰 상품 상세 페이지에서 사용자 경험을 향상시키기 위한 jQuery 기반의 이미지 확대 기능 구현 방법을 소개합니다. 웹 페이지 내에서 간결하고 효과적으로 이미지 줌을 가능하게 하며, 사용자가 제품 이미지를 가까이에서 자세히 볼 수 있도록 돕습니다.  

slug: 2023-12-15-image-zoom
date: 2023-12-15 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-15-image-zoom.webp

categories:
    - jQuery
tags:
    - 마우스 이벤트
---
온라인 쇼핑몰에서 제품 이미지를 크게 보고 싶은 사용자의 요구는 매우 흔합니다. 따라서 사용자가 상품 이미지에 좀 더 가까이 다가갈 수 있도록 '이미지 확대 기능'을 제공하는 것은 중요한 사용자 경험(UX) 요소 중 하나입니다. 이 글에서는 jQuery를 사용하여 이미지 위에 마우스를 올리면 해당 부분을 확대해주는 기능을 살펴보겠습니다.  
<br>

## HTML 구조
```html
<div class="container">
    <div class="img_wrap">
        <img src="https://picsum.photos/id/20/1000/1000" alt="이미지" class="img">
    </div>
    <div class="zoom_result"></div>
</div>
```
* **컨테이너**  
상위 컨테이너 container 클래스는 이미지와 결과를 담는 역할을 합니다.

* **이미지 래퍼**  
img_wrap 클래스는 이미지를 담는 래퍼로써, 마우스 호버 시 확대될 영역을 정의합니다.

* **이미지**  
실제 확대될 img 클래스의 이미지 태그입니다.

* **결과 영역**  
zoom_result 클래스는 확대된 이미지가 표시될 영역입니다.  
<br>

## CSS 스타일
```css
.container { position:relative; } 
.img_wrap { position: relative; width: 300px; height:300px; } 
.img_wrap .img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; } 
.zoom_lens { display: none; position:absolute; width:150px; height:150px; background: #000; border: 1px solid #fff; z-index: 2; opacity: 0.2; } 
.zoom_result { display: none; position: absolute; top: 0; left:320px; width:300px; height:300px; } 
.img_wrap:hover ~ .zoom_result,
.img_wrap:hover .zoom_lens { display: block; } 
```
* **이미지 래퍼 스타일링**    
이미지에 마우스를 올렸을 때 zoom_result와 zoom_lens 클래스 영역이 나타나도록 설정합니다.

* **줌 렌즈**  
마우스를 따라다니는 zoom_lens 클래스는 사용자에게 현재 확대 영역을 시각화해줍니다.

* **확대 결과 스타일링**  
zoom_result 클래스는 확대 결과를 보여주기 위한 부분이며, 처음에는 보이지 않도록 설정됩니다.  

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

### jQuery 코드
```js
$(function(){
    function imageZoom(imgSelector, resultSelector) {
        // 필요한 요소들을 선택 또는 생성합니다.
        const img = $(imgSelector);
        const result = $(resultSelector);
        const lens = $("<div/>", { "class": "zoom_lens" });
        lens.insertBefore(img);

        // 렌즈와 결과 영역의 배경 이미지의 크기 배율을 계산합니다.
        const cx = result.width() / lens.width();
        const cy = result.height() / lens.height();

        // 결과 영역에 배경 이미지를 설정합니다.
        result.css({
            "backgroundImage": `url(${img.attr('src')})`, 
            "backgroundSize": `${img.width() * cx}px ${img.height() * cy}px`
        });

        // 마우스 이동 또는 터치 이벤트에 대한 핸들러를 설정합니다.
        lens.add(img).on('mousemove touchmove', function (e) {
            e.preventDefault();
            const pos = getCursorPos(e, img);

            // 렌즈가 이미지 범위를 넘어가지 않도록 조절합니다.
            let x = pos.x - lens.width() / 2;
            let y = pos.y - lens.height() / 2;
            x = Math.max(0, Math.min(x, img.width() - lens.width()));
            y = Math.max(0, Math.min(y, img.height() - lens.height()));

            // 렌즈와 결과 영역의 위치를 업데이트합니다.
            lens.css({ left: x, top: y });
            result.css('backgroundPosition', `-${x * cx}px -${y * cy}px`);
        });

        // 커서 위치를 계산하는 함수를 정의합니다.
        function getCursorPos(e, img) {
            const imgOffset = img.offset();
            let x = e.pageX - imgOffset.left;
            let y = e.pageY - imgOffset.top;

            if (e.type === 'touchmove') {
                x = e.originalEvent.touches[0].pageX - imgOffset.left;
                y = e.originalEvent.touches[0].pageY - imgOffset.top;
            }

            x -= window.pageXOffset;
            y -= window.pageYOffset;
            return { x, y };
        }
    }

    // window의 load 이벤트에 이미지 줌 기능을 연결합니다.
    $(window).on('load', function(){
        imageZoom(".img", ".zoom_result");
    });
});
```

* **이미지 줌 기능 설정**
  * imageZoom(imgSelector, resultSelector) 함수는 이미지 확대 기능을 설정합니다.
  * imgSelector는 확대할 이미지의 선택자, resultSelector는 확대된 결과를 표시할 영역의 선택자를 나타냅니다.

* **줌 렌즈의 동적 생성 및 스타일 설정**
  * jQuery를 통해 zoom_lens 클래스를 가진 div를 생성하고, 이 div는 줌 렌즈로 사용됩니다.
  * 생성된 렌즈를 이미지 앞에 추가합니다.

* **배경 이미지 크기에 대한 배율 계산**
  * cx와 cy는 각각 result 영역의 너비(width)와 높이(height)를 줌 렌즈의 너비와 높이로 나누어 계산합니다.
  * 이 배율은 원본 이미지를 확대된 결과 영역의 크기에 맞게 확대하는 데 사용됩니다.

* **확대 결과 영역에 배경 이미지 설정**
  * 확대 결과 영역(result)의 CSS 스타일을 조정하여, 배경 이미지로 원본 이미지를 설정하고, 배율에 따라 크기를 조절합니다.

* **마우스 이동 및 터치 이동 이벤트 처리**
  * 줌 렌즈와 이미지에 대한 mousemove와 touchmove 이벤트를 감지하는 이벤트 핸들러를 추가합니다.
  * 이벤트 발생 시 getCursorPos 함수를 호출해서 커서 위치를 가져옵니다.

* **커서 위치 계산 및 렌즈 위치 조정**
  * 마우스 위치에서 줌 렌즈의 중심이 되도록 하기 위해 렌즈의 너비와 높이의 절반값을 빼줍니다.
  * 계산된 위치가 이미지 영역 밖으로 벗어나지 않도록 최댓값과 최솟값을 사용하여 조정합니다.
  * 렌즈의 CSS left와 top 값을 업데이트하여 마우스 위치에 따라 렌즈를 이동합니다.

* **확대 결과 영역의 배경 위치 조정**
  * 렌즈가 이동함에 따라 확대 결과 영역의 배경 위치를 조정하여 사용자가 렌즈를 통해 보는 부분이 확대하여 보이도록 합니다.
  * 배경 위치는 x와 y 좌표를 배율에 맞게 조절하여 backgroundPosition 스타일 속성을 설정함으로써 업데이트됩니다.

* **커서 위치를 계산하는 함수**
  * getCursorPos(e, img) 함수는 이벤트 객체와 이미지 요소를 인자로 받아 현재 마우스의 이미지 내 좌표를 계산합니다.
  * 이미지 상대 위치를 얻기 위해 이미지의 오프셋값을 사용하고, 스크롤에 대한 보정을 위한 페이지 오프셋 값을 빼줍니다.

* **이미지 줌 기능의 초기화**  
  * window의 load 이벤트가 발생했을 때 imageZoom 함수를 호출하여 이미지 줌 기능을 활성화합니다.  
<br>


## 결론
jQuery를 활용하여 구현한 이 이미지 확대 기능은 쇼핑몰 상세 페이지에서 고객에게 더 세심한 제품 살펴보기 경험을 제공합니다. 사용자가 제품의 세부 사항을 놓치지 않고 세밀하게 볼 수 있으므로, 사용자의 구매 결정에 긍정적인 영향을 미치는 기능입니다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-15-image-zoom/">예제결과 미리보기</a>
</div>