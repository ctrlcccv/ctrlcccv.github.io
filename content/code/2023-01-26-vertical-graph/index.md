---
title: CSS - 세로형 막대그래프
description: display:flex 속성을 사용하여 데이터에 따라 유동적으로 정렬되는 세로형 막대그래프 CSS 코드 예제입니다.
slug: 2023-01-26-vertical-graph
date: 2023-01-26 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/vertical-graph.webp

categories:
    - CSS
tags:
    - 막대그래프
---
CSS를 활용하여 데이터에 따라 자동으로 정렬되는 세로형 막대그래프를 만들어보았습니다.  
아래는 그래프의 HTML과 CSS 코드 예시입니다.

## HTML 코드

그래프를 구성하는 HTML 요소입니다.

```html
<div class="graph_wrap">
    <strong class="tit">제목</strong>
    <div class="graph">
        <!-- 기준 -->
        <ul class="y-axis">
            <li><span>35</span></li>
            <li><span>30</span></li>
            <li><span>25</span></li>
            <li><span>20</span></li>
            <li><span>15</span></li>
            <li><span>10</span></li>
            <li><span>5</span></li>
            <li><span>0</span></li>
        </ul>
        <!-- 목록 -->
        <ul class="x-axis">
            <li><span>목록1</span></li>
            <li><span>목록2</span></li>
            <li><span>목록3</span></li>
        </ul>
        <!-- 바 그래프 (백분율 만큼 height값) -->
        <ul class="bar">
            <li style="height:100%;"><span></span></li>
            <li style="height:70%;"><span></span></li>
            <li style="height:30%;"><span></span></li>
        </ul>
    </div>
</div>
```

## CSS 코드

그래프의 스타일을 정의하는 CSS 코드입니다.  
데이터의 백분율 값뿐만 아니라 목록의 수도 변동되어야 할 경우, display: flex 속성을 활용하여 그래프를 유동적으로 정렬할 수 있습니다.

```css
.graph_wrap {max-width: 864px;margin: 0 auto;padding:20px;}
.graph_wrap .tit {display: block;text-align: center;font-size: 16px;font-weight: 500;color: #333333;}
.graph {position: relative;height: 185px;margin-top: 15px;}
.graph .y-axis {position: absolute;width: 100%;height: 100%;z-index: 1;}
.graph .y-axis > li {position: relative;width:calc(100% - 20px);height: calc(100% / 8);margin-left: 20px;border-top: 1px solid #8c8c8c;text-align: left;}
.graph .y-axis > li span {position: absolute;top: -7px;left: -20px;font-size: 12px;line-height: 1;}
.graph .x-axis {display: flex;justify-content: space-around;position: absolute;bottom: -8px;left: 20px;width: calc(100% - 20px);text-align: center;z-index: 2;}
.graph .x-axis > li {font-size: 12px;}
.graph .bar {display: flex;justify-content: space-around;align-items: flex-end;position: absolute;bottom: 16px;left: 20px;width: calc(100% - 20px);height: calc(100% - 16px);text-align: center;z-index: 3;}
.graph .bar > li {flex-grow:1;margin: 0 10px;}
.graph .bar > li span {display: inline-block;width: 100%;height: 100%;max-width: 80px;background: #8ab4f8;}
.graph .bar:before {content:'';position: absolute;top: -2px;left: 3px;width: 1px;height: calc(100% + 4px);background: #8c8c8c;}
```

### 그래프 구성 요소 설명

* graph_wrap : 그래프를 감싸는 컨테이너로, 전체 그래프 영역의 스타일과 레이아웃을 조절합니다.
* tit : 그래프의 제목을 스타일링하며, 가운데 정렬, 글꼴 크기 및 색상 등을 설정합니다.
* graph : 실제 그래프가 그려지는 영역으로, 그래프의 위치와 높이 등을 조절합니다.
* y-axis : 세로축을 표시하는 영역으로, 그래프의 기준값을 나타내는 눈금을 생성합니다.
* y-axis > li : 세로축의 각 눈금을 나타내며, 눈금의 스타일 및 위치를 설정합니다.
* y-axis > li span : 각 눈금의 숫자를 포함하는 텍스트 요소로, 눈금의 숫자를 스타일링합니다.
* x-axis : 가로축을 표시하는 영역으로, 그래프의 각 항목을 나타내는 목록을 생성합니다.
* x-axis > li : 가로축의 각 항목을 나타내며, 목록 항목의 스타일 및 위치를 설정합니다.
* bar : 실제 막대그래프가 그려지는 영역으로, 각 항목에 대한 막대그래프를 생성합니다.
* bar > li : 각 막대그래프를 나타내며, 막대의 길이와 간격을 설정합니다.
* bar > li span : 각 막대의 색상과 높이를 조절합니다.

<br>

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

## 결론

이 코드는 그래프를 감싸는 컨테이너부터 그래프의 기준값을 나타내는 눈금, 목록 항목, 그리고 실제 막대그래프까지 각각의 요소를 세심하게 스타일링하여 구성합니다.   
이렇게 유연하고 동적인 구조를 활용하면 데이터의 변화에 따라 그래프가 자동으로 조정되어 시각적으로 정보를 전달할 수 있습니다.  
<br>

> 예제 확인하기 
> * [https://ctrlcccv.github.io/ctrlcccv-demo/2023-01-26-vertical-graph](https://ctrlcccv.github.io/ctrlcccv-demo/2023-01-26-vertical-graph)  

