---
title: CSS - 형광펜 밑줄 효과 (+ 애니메이션 추가)
description: >  
    CSS를 활용하여 형광펜 밑줄 효과를 간단하게 구현하는 방법입니다.
slug: 2023-08-11-highlighter
date: 2023-08-11 00:00:00+0000
lastmod: 2023-08-11 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/highlighter.webp

categories:
    - CSS
tags:
    - 텍스트 스타일링
---
텍스트 강조 기법 중에서 형광펜 효과는 텍스트를 화려하게 강조하고 시선을 끌어주는 효과적인 방법이다.  
이 예제에서는 background 속성으로 밑줄 높이와 위치를 조정하여 간단하게 형광펜 효과를 구현할 수 있다.  
그리고 transition 속성을 활용하여 마우스를 올렸을 때 밑줄이 부드럽게 이동하도록 애니메이션 효과를 추가해보았다.  


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## HTML 구조
```html
<p><span class="highlighter">형광펜 효과 CSS 코드 예제</span>입니다.</p>
```
HTML 요소에 highlighter 클래스를 추가하여 형광펜 밑줄 효과를 적용했다.  

<br>

## CSS 스타일
```css
p {font-size: 24px;color: #000;text-align: center;margin-top: 50px;}
.highlighter {background: linear-gradient(#ffea00 0 100%); background-position: 0 calc(100% - 2px); background-size: 100% 14px; background-repeat: no-repeat;}
```
linear-gradient를 사용하여 밑줄 색상을 입히고, background-position과 background-size 속성으로 밑줄 위치와 높이를 조정한다. 방법은 다음과 같다.  
* 밑줄 색상 : background: linear-gradient(색상코드 0 100%); 
* 밑줄 위치 : background-position: 0 밑줄 위치;
* 밑줄 높이 : background-size: 100% 밑줄 높이;

<br>

## HTML 구조 (+ 애니메이션 추가)
```html
<p><span class="highlighter">왼쪽에서 오른쪽으로 이동합니다.</span></p>
<p><span class="highlighter center">가운데에서 좌우로 이동합니다.</span></p>
<p><span class="highlighter right">오른쪽에서 왼쪽으로 이동합니다.</span></p>
```
background-position 속성으로 이동하는 방향을 변경할 수 있다.  
이를 위해 center와 right 클래스를 추가하여 각각 다른 속성을 지정했다.  


<div class="ads_wrap">
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8535540836842352"
     data-ad-slot="2974559225"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>

<br>

## CSS 스타일 (+ 애니메이션 추가)
```css
p {margin-top: 50px;font-size: 24px;color: #000;text-align: center;}
.highlighter {background: linear-gradient(#ffea00 0 100%); background-position: 0 calc(100% - 2px); background-size: 0 14px; background-repeat: no-repeat; transition: background-size 0.3s;}
.highlighter.center {background-position: center calc(100% - 2px);} 
.highlighter.right {background-position: right calc(100% - 2px);} 
.highlighter:hover {background-size:100% 14px;}
```
transition 속성을 추가하여 밑줄이 이동하는 속도를 지정했다.     
background의 가로 크기를 먼저 0으로 설정하고, 마우스를 올렸을 때(hover) 100%로 변경함으로써 밑줄이 부드럽게 이동하는 효과를 구현했다.  
그리고 background-position의 가로 위치를 조정하면 이동 시작점이 변경되어, 각각 다른 방향으로 이동하는 효과를 만들 수 있다.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-08-11-highlighter/">예제결과 미리보기</a>
</div>
