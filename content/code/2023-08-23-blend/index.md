---
title: CSS mix-blend-mode 속성 | 블렌딩 효과 만들기
description: >  
    mix-blend-mode는 CSS의 속성으로, 요소의 배경과 해당 요소의 내용물을 블렌딩하는 방법을 결정합니다. Photoshop과 같은 그래픽 편집 소프트웨어에서 사용되는 레이어 블렌딩 모드와 유사한 개념입니다.
slug: 2023-08-23-blend
date: 2023-08-23 00:00:00+0000
lastmod: 2023-08-23 00:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/highlighter.webp

categories:
    - CSS
tags:

---
CSS의 mix-blend-mode 속성은 웹 디자인과 그래픽 작업을 더욱 흥미롭게 만들어주는 강력한 도구입니다.   
이 속성을 활용하면 웹 요소들 사이에 다양한 블렌딩 효과를 적용하여 독특하고 시각적으로 매력적인 디자인을 구현할 수 있습니다.  


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

## mix-blend-mode란?
mix-blend-mode는 CSS의 속성으로, 요소의 배경과 해당 요소의 내용물을 블렌딩하는 방법을 결정합니다.   
이 속성을 사용하면 두 요소 간의 색상을 혼합하고 합성하는 다양한 블렌딩 모드를 적용할 수 있습니다.   
블렌딩 모드는 Photoshop과 같은 그래픽 편집 소프트웨어에서 사용되는 레이어 블렌딩 모드와 유사한 개념입니다.  
<br>

## mix-blend-mode 속성의 사용법 
mix-blend-mode 속성은 다음과 같이 사용됩니다.
```css
.element {mix-blend-mode: <blending-mode>;}
```
여기서  &lt;blending-mode&gt; 부분에는 다양한 블렌딩 모드 값이 들어갈 수 있습니다.

1. normal (노멀) :  
normal 모드는 요소의 배경과 아무런 블렌딩을 적용하지 않습니다. 요소가 일반적으로 표시되며, 다른 블렌딩 모드의 효과를 사용하지 않을 때 기본값으로 작동합니다.

2. multiply (곱하기) :  
multiply 모드는 배경과 요소의 색상을 곱하듯이 합성하여 결과적으로 어두운 부분을 강조합니다. 배경과 요소의 색상이 겹치면서 보다 어두워지며, 이를 통해 그림자 효과나 깊이를 표현할 수 있습니다. 두 요소의 색상이 겹치는 부분에서 특히 강한 시각적 효과가 나타납니다.

3. screen (스크린) :  
screen 모드는 요소와 배경의 반전된 값을 곱하여 밝은 부분을 강조합니다. 결과적으로 배경과 요소가 밝아지며, 더 밝고 부드러운 느낌을 연출할 수 있습니다. 빛이 스며들어 환상적인 분위기를 만들거나 주요 요소를 부각할 때 사용할 수 있습니다.

4. overlay (오버레이) :  
overlay 모드는 배경 위에 요소를 덮어 두 겹으로 블렌딩하여 색상을 조합합니다. 배경의 대비와 색상을 유지하면서 요소의 색상이 더해집니다. 배경과 요소 모두에 독특한 색상이 있을 때 효과적으로 활용할 수 있습니다.

5. darken (어둡게 하기) / lighten (밝게 하기) :  
darken 모드는 두 요소 중에서 더 어두운 색상을 보여주며, lighten 모드는 더 밝은 색상을 보여줍니다. darken 모드는 두 색상 중 어두운 부분을 강조하여 명암 대비와 감성을 높이는 데 사용될 수 있고, lighten 모드는 밝은 부분을 강조하여 강렬한 효과를 연출할 때 활용됩니다.

6. color-dodge (색상 닷지) :  
color-dodge 모드는 요소의 색상을 밝게 만들어 배경을 희석합니다. 밝은 색상이 강조되며, 주로 주요 컨텐츠나 하이라이트 부분을 강조할 때 사용됩니다.

7. color-burn (색상 번) :  
color-burn 모드는 요소의 색상을 어둡게 만들어 배경을 강조합니다. 어두운 부분이 강조되며, 텍스트나 그래픽의 깊이와 명암을 부각할 때 활용됩니다.

8. hard-light (하드 라이트) :  
hard-light 모드는 요소의 밝기에 따라 배경을 강조하거나 약화시킵니다. 요소의 밝은 부분이 배경을 밝게 만들며, 강렬한 텍스트나 그래픽을 부각할 때 유용합니다.

9. soft-light (소프트 라이트) :  
soft-light 모드는 요소의 부드러운 빛을 배경에 덧씌워 조화롭게 조합합니다. 밝은 부분에서는 더 밝게, 어두운 부분에서는 더 어둡게 조절하여 부드러운 분위기나 조명 효과를 연출할 때 사용됩니다.

10. difference (차이) :  
difference 모드는 두 색상의 차이를 강조하여 픽셀 간의 차이를 시각적으로 표현합니다. 결과적으로 밝은 부분과 어두운 부분이 극명하게 대비되며, 텍스트나 그래픽을 강조하는 데 활용됩니다.

11. exclusion (제외) :  
exclusion 모드는 두 색상을 혼합하여 중간 톤을 만듭니다. 배경과 요소의 색상을 조화롭게 블렌딩하여 이미지를 부드럽게 만들거나 화면을 완화할 때 사용됩니다.  


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

## mix-blend-mode 속성의 활용 예시
1. 텍스트 위에 배경 이미지 블렌딩 :  
텍스트 요소 위에 배경 이미지를 배치하고 mix-blend-mode 속성을 이용하여 텍스트와 이미지의 색상을 조합하여 독특한 효과를 만들 수 있습니다.

2. 그래픽 요소 간의 시각적 통합 :  
여러 그래픽 요소를 겹쳐놓고 mix-blend-mode를 사용하여 그래픽 요소들을 서로 블렌딩하여 일종의 일러스트레이션 효과를 만들 수 있습니다.

3. 마우스 오버 효과 :  
요소 위에 마우스를 올렸을 때 mix-blend-mode 값을 변경하여 부드러운 효과 변화를 줄 수 있습니다.  
<br>

## 브라우저 호환성
mix-blend-mode 속성은 대부분의 최신 브라우저에서 지원되지만, 오래된 버전의 브라우저에서는 제대로 동작하지 않을 수 있어 주의가 필요합니다. 따라서 브라우저 호환성을 고려하여 사용하는 것이 중요합니다.  
<br>

## 결론
mix-blend-mode 속성은 웹 디자인에 새로운 차원의 창의성을 제공합니다. 다양한 블렌딩 모드를 활용하여 흥미로운 시각적 효과를 만들어내고, 사용자들에게 더욱 매력적인 웹 경험을 제공할 수 있습니다. 하지만 브라우저 호환성과 성능을 고려하여 신중하게 활용해야 한다는 점을 잊지 마세요.