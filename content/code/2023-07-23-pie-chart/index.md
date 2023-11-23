---
title: jQuery - 원형 그래프 (Pie Chart)
description: >  
    SVG를 활용한 원형 그래프 코드입니다.
slug: 2023-07-23-pie-chart
date: 2023-07-23 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/pie-chart.webp

categories:
    - CSS
    - jQuery
tags:
    - SVG
    - 원형 그래프
---
SVG 공부 겸 원형 그래프를 만들어보았다.  
SVG &lt;circle&gt; 태그에 원의 반지름 크기의 선을 추가하면 선으로 원의 형태를 채울 수 있다.  
그래프의 부채꼴 모양은 점선을 만드는 속성인 stroke-dasharray를 사용했다.  
stroke-dasharray:100 40; 이라면 점선의 길이는 100, 간격은 40이다.  
점선의 간격에 원의 전체 둘레 값을 넣어 투명색 영역을 만든 뒤, 그래프 비율만큼 둘레 값을 계산하여 길이를 지정했다.  

## HTML 구조
```html
<div class="pie_wrap">
    <!-- 원형 그래프 -->
    <svg class="pie">
        <circle data-percent="10" />
        <circle data-percent="20" />
        <circle data-percent="30" />
        <circle data-percent="40" />
    </svg>
    <!-- 원형 그래프 리스트 -->
    <ul class="pie_info">
        <li>
            <span class="color"></span>
            <span class="txt">그래프 1</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 2</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 3</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 4</span>
        </li>
    </ul>
</div>
```
SVG <circle> 태그를 사용했고, data-* 속성에 각각 몇 퍼센트인지 작성했다.  

## CSS 스타일
```css
/* 원형 그래프 */
.pie_wrap {display: flex;width: 600px;margin: 50px auto 0;}
.pie {width: 300px;height: 300px;}

/* 원형 그래프 비율 표시 - CSS 고정 */
.pie circle {r:25%;cx:50%;cy:50%;fill:transparent;stroke-width:50%;stroke:#ddd;;transform: rotate(-90deg);transform-origin:center;transition:all 0.5s;}

/* 원형 그래프 리스트 */
.pie_info {width: 300px;padding: 5% 0 0 5%;}
.pie_info > li {font-size: 0;}
.pie_info > li .color {display: inline-block;vertical-align: middle;width: 8px;height: 8px;margin-right: 5px;border-radius:4px;background: #000;}
.pie_info > li .txt {display: inline-block;vertical-align: middle;font-size: 14px;color: #333;}
```
pie 클래스에 그래프의 크기를 지정했다.  
&lt;circle&gt; 태그에 stroke-width 속성의 크기를 반지름의 크기만큼 지정하여 선으로 채웠다.  
stroke-width 속성의 크기는 영역의 가장자리 중심으로 늘어나기 때문에, &lt;circle&gt; 태그의 크기는 그래프 크기의 절반이다.  
퍼센트로 작성해서 그래프의 크기에 따라 자동으로 맞춰진다.  
r 속성은 반지름의 크기를, cx, cy 속성은 &lt;circle&gt; 태그의 좌표 위치를 뜻한다.  

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
    pieAct();
})

function pieAct() {
    var color = ["#60D0FD", "#ADE7FD", "#2F677D", "#89B7C9"]; //그래프 색상
    var angel = -90; //그래프 시작 지점
    var pieWidth = $('.pie').width();

    $('.pie circle').each(function(i) {
        var percentData = $(this).data('percent'); //그래프 비율
        var perimeter = (pieWidth / 2) * 3.14; //원의 둘레
        var percent = percentData * (perimeter / 100); //그래프 비율만큼 원의 둘레 계산

        //그래프 비율, 색상 설정
        $(this).css({
            'stroke-dasharray': percent + ' ' + perimeter,
            'stroke': color[i],
            'transform': 'rotate(' + angel + 'deg)'
        });
        $('.pie_info > li').eq(i).find('.color').css({
            'background': color[i]
        });

        //그래프 시작 지점 갱신
        angel += (percentData * 3.6);
    })
}
```
그래프의 영역별 색상은 랜덤 색상을 넣을까 생각했지만, 실제 작업할 때에는 색상이 정해져 있는 경우가 더 많을 것 같아 배열로 직접 넣는 방법을 선택했다.  
원의 둘레 값을 계산하여 perimeter 변수에 넣고, data-percent 속성 값에 따라 각 부채꼴 영역의 둘레 값을 계산하여 percent 변수에 넣은 뒤 stroke-dasharray 속성에 값을 지정했다.  
부채꼴 영역의 시작 지점은 transform:rotate() 속성으로 각도를 맞췄다.  
stroke-dasharray 속성의 시작 지점이 90° 이여서, 0°에서 시작하기 위해 angel 변수의 초기값은 -90이다.  
그 후 그래프의 비율만큼 각도를 계산하여 angel 변수의 값을 갱신했다.  
<br>
<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-23-pie-chart/type-pc/">예제결과 미리보기</a>
</div>
<br>

## 반응형 작업

### HTML 구조
```html
<div class="pie_wrap">
    <!-- 원형 그래프 -->
    <div class="pie_res">
        <svg class="pie">
            <circle data-percent="10" />
            <circle data-percent="20" />
            <circle data-percent="30" />
            <circle data-percent="40" />
        </svg>
    </div>
    <!-- 원형 그래프 리스트 -->
    <ul class="pie_info">
        <li>
            <span class="color"></span>
            <span class="txt">그래프 1</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 2</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 3</span>
        </li>
        <li>
            <span class="color"></span>
            <span class="txt">그래프 4</span>
        </li>
    </ul>
</div>
```
반응형 작업을 위해 pie_res 클래스를 추가했다.  
SVG의 viewBox 속성은 SVG 요소의 위치 · 크기를 지정할 수 있는데, 이 속성을 사용하면 화면 크기에 따라 SVG 요소의 크기가 자동으로 맞춰져서 반응형 작업할 때 꼭 사용해야 한다. JS에서 viewBox 속성 값이 추가될 예정이다.  

### CSS 스타일
```css
/* 원형 그래프 */
.pie_wrap {display: flex;flex-wrap:wrap;width: 600px;max-width: 100%;margin: 50px auto 0;}
.pie_res {position: relative;width: 50%;height: 0;padding-bottom: 50%;}
.pie {position: absolute;top: 0;left: 0;display: block;width: 100%;height: 100%;}

/* 원형 그래프 비율 표시 - CSS 고정 */
.pie circle {r:25%;cx:50%;cy:50%;fill:transparent;stroke-width:50%;stroke:#ddd;transform: rotate(-90deg);transform-origin:center;transition:all 0.5s;}

/* 원형 그래프 리스트 */
.pie_info {width: 50%;padding: 5% 0 0 5%;}
.pie_info > li {font-size: 0;}
.pie_info > li .color {display: inline-block;vertical-align: middle;width: 8px;height: 8px;margin-right: 5px;border-radius:4px;background: #000;}
.pie_info > li .txt {display: inline-block;vertical-align: middle;font-size: 14px;color: #333;}

@media (max-width : 767px) {
    .pie_wrap {justify-content: center;}
    .pie_info {display: flex;flex-wrap:wrap;justify-content: center;width: 100%;}
    .pie_info > li {margin-right: 20px;}
}
```
pie_res 클래스에 width와 padding-bottom 속성에 같은 비율 값을 넣어 정사각형 영역을 만들고, 그래프 영역을 position: absolute 로 잡아 비율에 맞춰 크기가 조정되도록 만들었다.  

### jQuery 코드
```js
$(document).ready(function() {
    pieAct();
})

function pieAct() {
    //그래프 viewBox 설정
    $(window).on('load', function() {
        var pieWidth = $('.pie').width();
        $('.pie')[0].setAttribute('viewBox', '0 0 ' + pieWidth + ' ' + pieWidth + '');
    })

    var color = ["#60D0FD", "#ADE7FD", "#2F677D", "#89B7C9"]; //그래프 색상
    var angel = -90; //그래프 시작 지점
    var pieWidth = $('.pie').width();

    $('.pie circle').each(function(i) {
        var percentData = $(this).data('percent'); //그래프 비율
        var perimeter = (pieWidth / 2) * 3.14; //원의 둘레
        var percent = percentData * (perimeter / 100); //그래프 비율만큼 원의 둘레 계산

        //그래프 비율, 색상 설정
        $(this).css({
            'stroke-dasharray': percent + ' ' + perimeter,
            'stroke': color[i],
            'transform': 'rotate(' + angel + 'deg)'
        });
        $('.pie_info > li').eq(i).find('.color').css({
            'background': color[i]
        });

        //그래프 시작 지점 갱신
        angel += (percentData * 3.6);
    })
}
```
그래프의 크기에 따라 viewBox 속성 값을 지정하는 코드를 추가했다.  
<br>
<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-07-23-pie-chart/type-responsive/">예제결과 미리보기 (반응형)</a>
</div>