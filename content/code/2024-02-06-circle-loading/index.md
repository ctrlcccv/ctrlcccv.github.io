---
title: >  
    CSS - 원형 로딩 애니메이션 구현하기 (가속도 추가)
description: >  
    CSS를 사용하여 원형 로딩 애니메이션을 구현하고, 가속도를 추가하는 방법을 상세히 설명합니다.  

slug: 2024-02-06-circle-loading
date: 2024-02-06 01:00:00+0000
lastmod: 2024-02-06 01:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2024-02-06-circle-loading.webp

categories:
    - CSS
tags:
    - CSS 애니메이션
---
로딩 애니메이션은 사용자가 데이터를 기다리는 동안 인터페이스에 적용되는 시각적 피드백이며, 좋은 사용자 경험을 만드는 데 있어 비중 있는 요소입니다. 이 글에서는 CSS를 이용해 원형 로딩 애니메이션을 구현하는 방법을 상세히 설명합니다.  


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

## 로딩 애니메이션의 중요성
로딩 애니메이션은 사용자가 데이터 처리를 기다리는 동안 사이트 또는 앱의 응답을 확인하는 기능입니다. 이는 사용자 경험(UX)을 향상시키며, 다음과 같은 몇 가지 핵심 이점이 있습니다.

- **사용자 기다림 감소**  
  즉각적인 피드백을 통해 사용자는 프로세스가 진행 중임을 알 수 있어, 대기 시간이 짧아지는 것처럼 느낍니다.

- **사용자 참여 유지**  
  로딩 애니메이션이 사용자의 관심을 붙잡아, 사이트나 앱을 떠나지 않도록 도와줍니다.
- **브랜드 이미지 제고**  
  잘 설계된 로딩 애니메이션은 제품에 현대적이고 전문적인 느낌을 부여할 수 있습니다.  
   
이제, 로딩 애니메이션 코드에 대해 자세히 설명하겠습니다.   

<br>

## HTML 구조
로딩 애니메이션이 필요한 위치에 아래 코드를 추가합니다.
```html
<span class="loading"></span>
```

## CSS 스타일
CSS는 `loading` 클래스로 지정된 로딩 애니메이션을 시각적으로 표현하기 위한 스타일을 정의합니다.  
```css
.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    border: 10px solid #ddd;
    border-radius: 50%;
    border-top-color: #333;
    animation: spin 1s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85);
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% { transform: translate(-50%,-50%) rotate(0deg); }
    100% { transform: translate(-50%,-50%) rotate(360deg); }
}
```

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

- **`position: fixed`**  
`.loading` 요소가 브라우저 창에 고정되도록 설정합니다. 즉, 스크롤을 해도 항상 같은 위치에 있게 됩니다.

- **`top: 50%; left: 50%`**  
화면의 정중앙에 있도록 상위 요소(브라우저 창)의 크기에서 50% 오프셋을 적용합니다.

- **`width: 100px; height: 100px`**  
요소의 크기를 너비와 높이 각각 100픽셀로 설정하여 원형의 크기를 정합니다.

- **`border: 10px solid #ddd`**  
원의 테두리를 연한 회색으로 설정하고 두께를 10픽셀로 지정합니다.

- **`border-radius: 50%`**  
테두리를 원형으로 만들기 위해 반지름을 50%로 설정합니다.

- **`border-top-color: #333`**  
상단 테두리의 색상을 어두운 회색으로 바꿔 주어 로딩 중임을 나타내는 시각적 독특함을 부여합니다.

- **`animation: spin 1s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85)`**  
1초 간격으로 무한 반복되는 `spin` 애니메이션을 적용하고, 특정한 속도 곡선을 통해 애니메이션의 가속도와 감속도를 조절합니다.

- **`transform: translate(-50%, -50%)`**  
요소의 중심이 화면의 정중앙에 오도록 설정합니다. `top`과 `left` 속성이 요소의 왼쪽 상단 모서리를 기준으로 하므로, 각각 크기의 절반만큼 이동시켜 주어야 중심에 배치됩니다.

- **`@keyframes spin`**  
`spin`이라는 이름의 키프레임을 정의하여 애니메이션의 시작과 끝을 설정합니다.

- **`0%` 상태에서 `transform`**  
애니메이션 시작 시, 요소의 회전을 0도에서 시작합니다.

- **`100%` 상태에서 `transform`**  
애니메이션 끝에 다다를 때 요소가 360도 회전하도록 설정합니다. 이를 통해 요소가 끊임없이 회전하는 것처럼 보이게 하여 로딩중인 효과를 만듭니다.  
<br>

## 결론
고객의 대기 상황을 개선하고, 웹사이트의 전반적인 경험을 향상시키기 위해, CSS만으로 효과적으로 구현된 원형 로딩 애니메이션은 사용자의 기다림을 더욱 가치 있게 만듭니다. 이 글에서는 각각의 CSS 코드 조각이 로딩 애니메이션에서 어떻게 작용하는지를 상세히 설명하였고, 이는 사용자의 인내심을 보상하는 동시에 웹사이트의 전문적인 이미지를 구축하는 데 도움이 됩니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2024-02-06-circle-loading/" target="_blank">예제결과 미리보기</a>
</div>
