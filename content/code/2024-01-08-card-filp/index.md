---
title: CSS - 카드 뒤집기 애니메이션
description: >  
    CSS를 활용하여 마우스 호버 시 가로 또는 세로로 뒤집히는 카드 애니메이션 효과를 구현하는 방법을 자세히 설명합니다. 카드의 전면과 후면에 다른 콘텐츠를 배치하는 UI 디자인 기법을 소개합니다.  

slug: 2024-01-08-card-filp
date: 2024-01-08 00:00:00+0000
lastmod: 2024-01-08 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-01-08-card-filp.webp

categories:
    - CSS
tags:
    - CSS 애니메이션
---
웹사이트나 어플리케이션의 UI에서 카드 뒤집기 애니메이션은 사용자의 관심을 끌고, 추가 정보나 인터랙션을 제공하는 멋진 방법입니다. 순수 CSS를 사용하여 구현할 수 있는 이 효과는 크로스 브라우저 호환성도 좋고, 퍼포먼스 또한 뛰어나서 많이 사용됩니다. 이 글에서는 가로로 뒤집히는 카드와 세로로 뒤집히는 카드 각각의 예를 통해 어떻게 카드 뒤집기 애니메이션을 구현할 수 있는지 상세하게 설명합니다.  


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

카드의 HTML 구조는 간단합니다. 두 개의 주요 클래스 `.card`와 `.card_content`를 활용해 카드의 외부 컨테이너와 내부 콘텐츠를 구성합니다. 

```html
<div class="card horizontal_card">
    <div class="card_content">
        <div class="card_front">
            앞
        </div>
        <div class="card_back">
            뒤
        </div>
    </div>
</div>

<!-- 세로로 뒤집히는 카드 -->
<div class="card vertical_card">
    <div class="card_content">
        <div class="card_front">
            앞
        </div>
        <div class="card_back">
            뒤
        </div>
    </div>
</div>
```

- **가로로 뒤집히는 카드 (.horizontal_card)** 
  - `card` 클래스를 가진 `div`는 카드 전체를 감싸는 컨테이너로 사용됩니다.
  - `card_content` 클래스 안에는 두 개의 `div`가 있으며, 각각 `.card_front` (앞면)과 `.card_back` (뒷면)으로 지정됩니다.

- **세로로 뒤집히는 카드 (.vertical_card)** 
  - `card` 클래스는 여기서도 같은 역할을 하며, 추가된 `vertical_card` 클래스를 통해 세로 뒤집힘을 구분합니다.
  - 내부 구조는 가로 뒤집히는 카드와 동일하게 앞면과 뒷면을 포함합니다.  
<br>

## CSS 스타일

CSS를 통해 다양한 스타일과 애니메이션 효과를 정의합니다.  

```css
/* 공통 스타일 */
.card { position: relative; width: 200px; height: 200px; margin: 15px; perspective: 400px; } 
.card .card_content { position: absolute; width: 100%; height: 100%; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); border-radius: 10px; transition: transform 1s; transform-style: preserve-3d; } 
.card:hover .card_content { transition: transform 0.5s; } 
.card .card_front,
.card .card_back { display: flex; justify-content: center; align-items: center; position: absolute; width: 100%; height: 100%; background: #fff; border-radius: 10px; font-size: 60px; color: #8ab4f8; text-align: center; backface-visibility: hidden; } 
.card .card_back { background: #8ab4f8; color: #fff; } 

/* 가로로 뒤집히는 카드 */
.horizontal_card:hover .card_content { transform: rotateY(180deg); } 
.horizontal_card .card_back { transform: rotateY(180deg); } 

/* 세로로 뒤집히는 카드 */
.vertical_card:hover .card_content { transform: rotateX(180deg); } 
.vertical_card .card_back { transform: rotateX(180deg); } 
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

- **기본 스타일 (position, width, height 등)**

  - 각 카드와 내부 콘텐츠에 고정된 `position`, `width`, `height` 등의 기본 스타일값을 할당하여 구조를 형성합니다.
  - 카드에 `perspective` 속성을 적용하여 입체감 있는 3D 효과를 추가합니다.

- **애니메이션 스타일 (.card_content)**
  - 카드 뒤집힘에 사용되는 `transform-style: preserve-3d` 속성으로 자식 요소들이 3D 공간에서의 위치를 유지하도록 합니다.
  - `transition`으로 애니메이션 지속 시간과 타이밍을 정의하며, 기본값은 1초입니다.

- **카드 앞면과 뒷면 스타일링**
  - 앞면과 뒷면에 `absolute` 위치를 이용해 두 요소가 같은 위치를 차지하도록 합니다.
  - `backface-visibility: hidden` 속성을 이용해 카드가 뒤집혔을 때 뒷면이 보이지 않는 효과를 만듭니다.

- **마우스 호버 시 애니메이션 (:hover)**
  - 가로로 뒤집히는 카드의 경우, `.horizontal_card:hover .card_content`에 `transform: rotateY(180deg)`를 적용해 Y축 기준으로 180도 회전하며 뒤집힙니다.
  - 세로로 뒤집히는 카드의 경우, `.vertical_card:hover .card_content`에 `transform: rotateX(180deg)`를 적용해 X축 기준으로 180도 회전하며 뒤집힙니다.

- **마우스 호버 시 뒷면 위치 조정**
  - 가로로 뒤집히는 카드의 뒷면 위치를 위해 `.horizontal_card .card_back`에 `transform: rotateY(180deg)`를 설정합니다.
  - 세로로 뒤집히는 카드의 뒷면 위치를 위해 `.vertical_card .card_back`에 `transform: rotateX(180deg)`를 설정합니다.  
<br>

## 결론
CSS의 `transform` 및 `transition` 속성을 사용한 카드 뒤집기 애니메이션은 웹사이트나 애플리케이션에 독특하고 매력적으로 추가정보를 제공할 수 있습니다. 이 글에서 살펴본 코드와 설명을 통해, 프로젝트에도 이러한 애니메이션 효과를 적용해보세요.  
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-01-08-card-filp/">예제결과 미리보기</a>
</div>