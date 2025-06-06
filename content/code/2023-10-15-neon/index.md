---
title: CSS - 네온 효과 예제
description: >  
    HTML과 CSS를 사용하여 네온사인 효과를 만드는 방법입니다.
slug: 2023-10-15-neon
date: 2023-10-15 00:00:00+0000
lastmod: 2023-10-15 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-10-15-neon.webp

categories:
    - CSS
tags:
    - 텍스트 스타일링
---
네온사인 효과는 웹 사이트에 화려함을 더해주어 사용자들에게 인상적인 경험을 제공하는 데 도움이 됩니다.   
HTML과 CSS를 사용하여 네온사인 효과를 만드는 방법입니다.

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
HTML에서 텍스트를 마크업 합니다. 이 예제에서는 &lt;span&gt; 요소를 사용하여 텍스트를 감쌌습니다.
```html
<span class="neon">네온사인 효과</span>
```

## CSS 스타일링 
네온사인 효과를 만들기 위해 CSS를 사용하여 다양한 스타일을 적용합니다.   
neon 클래스를 정의하고 해당 클래스에 원하는 스타일을 적용하여 원하는 디자인을 구현합니다.
```css
.neon { 
    font-size: 60px; 
    font-weight: 700; 
    color: #fff; 
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.7); 
    animation: neon-flicker 1s infinite alternate;
} 
```
여기서 주목해야 할 몇 가지 스타일 속성이 있습니다. 

* **font-size** : 텍스트의 크기를 조절하여 원하는 크기로 설정합니다. 크기가 클수록 효과가 두드러집니다.  

* **font-weight** : 텍스트의 굵기를 조절합니다. 원하는 굵기로 설정하여 텍스트를 강조할 수 있습니다.  

* **color** : 텍스트의 색상을 설정합니다. 네온사인 효과를 가진 텍스트의 기본 색상을 지정합니다.  

* **text-shadow** : 텍스트에 그림자 효과를 추가합니다. 이것이 네온사인 효과를 만드는 데 중요한 부분입니다. 그림자의 색상과 크기를 조절하여 텍스트가 빛을 반사하는 것처럼 보이도록 만듭니다.  

* **animation** : 애니메이션을 적용합니다. neon-flicker라는 애니메이션을 사용하여 텍스트가 번갈아 가며 반짝이도록 만듭니다. 애니메이션의 지속 시간, 반복 횟수 등을 설정할 수 있습니다.  

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

## 애니메이션 키프레임 정의
텍스트에 반짝이는 효과를 주기 위해 키프레임을 정의합니다. 이 예제에서는 neon-flicker라는 애니메이션을 사용합니다. 이 애니메이션은 @keyframes를 사용하여 텍스트의 text-shadow 속성을 변화시켜 번갈아 가며 반짝이는 효과를 만듭니다.
```css
@keyframes neon-flicker {
    0% {
        text-shadow: 
        0 0 10px rgba(0, 255, 255, 0.7), 
        0 0 20px rgba(0, 255, 255, 0.7), 
        0 0 30px rgba(0, 255, 255, 0.7);
    }
    100% {
        text-shadow: 
        0 0 20px rgba(0, 255, 255, 0.7), 
        0 0 30px rgba(0, 255, 255, 0.7), 
        0 0 40px rgba(0, 255, 255, 0.7);
    }
}
```


### text-shadow 속성을 여러 번 쓴 이유

여러 개의 text-shadow 속성을 사용하는 이유는 네온사인 효과를 더 현실적으로 만들기 위함입니다. 일반적인 네온사인은 빛이 반사되어 여러 개의 층으로 보이는 현상이 있으므로, 이를 시뮬레이션하기 위해 여러 개의 그림자 속성을 사용합니다.

* **첫 번째 그림자(10px)** : 가장 가까운 레이어로, 약한 효과를 제공합니다.
* **두 번째 그림자(20px)** : 첫 번째 그림자보다 크기가 크고, 더 강한 효과를 제공합니다.
* **세 번째 그림자(30px)** : 가장 먼 레이어로, 더 큰 크기와 강한 효과를 제공하여 깊이감을 부여합니다.  

다중 그림자 속성을 사용하면 텍스트가 실제로 깊이감을 느끼게 하고, 빛을 받아 번갈아 가며 반짝이는 효과를 만들어 냅니다.  
<br>

## 접근성 고려
접근성은 모든 사용자, 특히 장애를 가진 사용자들이 웹 콘텐츠와 기술을 동등하게 이용할 수 있도록 하는 웹 디자인 및 개발의 핵심 원칙 중 하나입니다. 네온사인 효과를 적용할 때 접근성을 고려하는 것은 모든 사용자에게 동등한 웹 경험을 제공하기 위해 중요합니다.  

* **대체 텍스트 제공**    
네온사인 효과를 가진 텍스트에는 적절한 대체 텍스트를 제공해야 합니다. 대체 텍스트는 스크린 리더(음성 출력 장치)와 같은 보조 기술을 사용하는 사용자들에게 텍스트의 의미나 내용을 전달합니다. 대체 텍스트는 **aria-label** 속성을 사용하여 제공할 수 있습니다.  

* **충분한 대비 유지**  
네온사인 효과를 사용할 때 텍스트와 배경 간의 적절한 대비를 유지해야 합니다. 적절한 대비는 모든 사용자가 텍스트를 쉽게 읽을 수 있도록 도와줍니다. 대비를 향상시키기 위해 텍스트 주변 배경을 조절하거나 색상 선택에 주의를 기울이는 것이 중요합니다.  

* **애니메이션 제어**  
네온사인 효과에 사용된 애니메이션은 모든 사용자에게 적합하지 않을 수 있습니다. 일부 사용자는 애니메이션으로 인한 운동 효과를 불편하게 느낄 수 있으므로, 애니메이션을 비활성화하거나 중지할 방법을 제공해야 합니다.  
<br>

## 결론
이제 네온사인 효과를 가진 텍스트가 준비되었습니다. 이 화려한 디자인 요소를 활용하여 웹 페이지를 더 화려하게 만들어 보세요. 항상 사용자 경험을 고려하고, 접근성을 준수하는 것을 잊지 마세요.   
<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-10-15-neon/">예제결과 미리보기</a>
</div>

