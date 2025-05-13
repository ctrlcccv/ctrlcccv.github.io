---
title: CSS - input password 눈모양 숨기기 (IE, Edge)
description: >  
    -ms-reveal 및 -ms-clear CSS 선택자를 사용하여 input password의 눈모양 버튼을 숨기는 방법입니다.
slug: 2023-11-08-password-eye
date: 2023-11-08 01:00:00+0000
lastmod: 2023-11-08 01:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-08-password-eye.webp

categories:
    - CSS
tags:
    - 입력 태그 커스텀
---
웹 개발자들은 웹 애플리케이션의 보안을 유지하기 위해 다양한 기술과 방법을 사용합니다. 비밀번호 입력 필드는 사용자의 개인 정보를 보호하기 위한 중요한 요소 중 하나입니다. 그러나 특정 브라우저에서 기본적으로 제공되는 "눈모양 표시" 버튼 때문에 사용자가 입력한 비밀번호를 숨기기가 어려울 수 있습니다.   

Internet Explorer 및 Microsoft Edge와 같은 일부 브라우저에서는 이러한 "눈모양 표시" 버튼을 비밀번호 입력 필드 옆에 자동으로 제공합니다. 사용자가 이 버튼을 클릭하면 비밀번호 입력 필드에 입력한 문자가 표시되거나 숨겨집니다. 이것은 사용자 경험을 향상시키기 위한 기능이지만, 보안 측면에서는 문제가 될 수 있습니다. 따라서 개발자는 이러한 기능을 제어하고 숨기는 방법을 알아야 합니다.  

IE 및 Edge 브라우저에서 비밀번호 입력 필드의 "눈모양 표시" 버튼을 숨기려면 -ms-reveal 및 -ms-clear CSS 선택자를 사용해야 합니다. 이 선택자는 각각 눈모양 표시 버튼과 비밀번호 지우기 버튼을 나타냅니다. 아래는 이를 숨기는 방법을 보여주는 CSS 코드입니다.  


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

## CSS 코드
```css
input::-ms-reveal,
input::-ms-clear {
    display : none;
}
```
위 코드는 display: none 스타일을 사용하여 표시되지 않도록 합니다. 이렇게 하면 IE 및 Edge 브라우저에서 비밀번호 입력 필드에 눈모양 표시 버튼이나 비밀번호 지우기 버튼이 나타나지 않게 됩니다.  

## 결론
웹 개발자는 사용자의 개인 정보를 보호하기 위해 비밀번호 입력 필드를 적절하게 다루어야 합니다. 특히 IE 및 Edge와 같은 브라우저에서는 비밀번호 입력 필드의 "눈모양 표시" 버튼을 숨기는 것이 중요합니다. 이를 위해 -ms-reveal 및 -ms-clear CSS 선택자를 사용하여 해당 버튼을 숨길 수 있습니다. 이렇게 하면 사용자가 비밀번호를 안전하게 입력할 수 있고, 개인 정보 보호에 도움이 됩니다. 사용자의 데이터 보호와 보안을 우선시하는 웹 개발자들은 이러한 기술을 활용하여 더 안전한 웹 애플리케이션을 개발할 수 있을 것입니다.