---
layout: post
title: CSS - 세로형 막대그래프
image: 
  path: /assets/img/blog/vertical-graph.webp
description: >
  데이터에 따라 유동적으로 정렬되는 세로형 막대그래프 CSS 코드 예제, display:flex 속성 사용
keywords: > 
  CSS, 세로형 막대그래프, display:flex
sitemap: true
comments: false
---

CSS를 활용하여 데이터에 따라 유동적으로 정렬되는 세로형 막대그래프를 만들었다.

## HTML

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
      <!-- 바 그래프 (백분율 만큼 heigh값) -->
      <ul class="bar">
        <li style="height:100%;"><span></span></li>
        <li style="height:70%;"><span></span></li>
        <li style="height:30%;"><span></span></li>
      </ul>
    </div>
  </div>
```
기준점, 목록, 그래프 3개의 리스트로 나눴고, 그래프는 백분율만큼 높이가 늘어나는 방식이다.

## CSS

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
  .graph .bar > li {width: 100%;margin: 0 10px;}
  .graph .bar > li span {display: inline-block;width: 100%;height: 100%;max-width: 80px;background: #8ab4f8;}
  .graph .bar:before {content:'';position: absolute;top: -2px;left: 3px;width: 1px;height: calc(100% + 4px);background: #8c8c8c;}
```

그래프의 백분율 값뿐만 아니라 목록의 수도 변동되어서, [display:flex](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout){:target="_blank"} 속성을 사용하여 정렬했다.  
IE11 환경에서 display:flex 속성을 사용한 컨테이너의 가로 크기보다 컨텐츠의 크기가 작을 경우 justify-content:space-around 속성 정렬이 반영되지 않았다.
그래서 .graph .bar > li 요소에 width: 100% 속성을 추가했다.  
<br><br>
[>> 예제 보기](https://ctrlcccv.github.io/vertical-graph){:target="_blank"} &nbsp; &nbsp; [>> 카카오톡 문의](https://open.kakao.com/o/sCFQbbYe){:target="_blank"}
