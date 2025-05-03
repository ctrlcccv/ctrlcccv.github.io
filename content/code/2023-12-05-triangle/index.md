---
title: 자동으로 CSS 삼각형 코드 만들기
description: >  
    사용자 입력에 기반을 둔 CSS 삼각형 코드 자동 생성 웹 애플리케이션을 다룹니다. 사용자는 직관적인 인터페이스를 통해 삼각형의 모양을 디자인하고, 즉시 생성되는 CSS 코드를 확인할 수 있습니다.
slug: 2023-12-05-triangle
date: 2023-12-05 00:00:00+0000
lastmod: 2023-12-05 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-12-05-triangle2.webp

categories:
    - CSS
tags:
    - CSS 도형
---
사용자가 입력한 값에 따라 CSS 삼각형을 자동으로 생성하는 웹 애플리케이션을 소개합니다. 사용자는 삼각형의 크기, 색상, 방향을 설정할 수 있으며, 이에 따라 실시간으로 CSS 코드가 생성되고 적용됩니다. 이 기능은 웹 디자인에서 흔히 사용되는 삼각형 모양을 손쉽게 구현하고자 하는 웹 개발자들에게 유용합니다.  

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

<br>

## HTML 구조
```html
<div class="container">
    <input type="number" id="width" class="form_input" placeholder="Width">
    <input type="number" id="height" class="form_input" placeholder="Height">
    <input type="color" id="color" class="form_input" placeholder="Color">
    <select id="direction" class="form_input">
        <option value="up">위</option>
        <option value="down">아래</option>
        <option value="left">왼쪽</option>
        <option value="right">오른쪽</option>
        <option value="up-left">위 - 왼쪽</option>
        <option value="up-right">위 - 오른쪽</option>
        <option value="down-left">아래 - 왼쪽</option>
        <option value="down-right">아래 - 오른쪽</option>
    </select>    
    <button class="generate">삼각형 만들기</button>
    <div class="css_code"></div>
    <div class="triangle"></div>
</div>
```
* **컨테이너 (.container)**  
주요 인터페이스 요소를 담는 컨테이너로, 중앙 정렬과 스타일링을 위한 기본 설정이 적용되어 있습니다.

* **입력 필드 (.form_input)**  
사용자가 삼각형의 너비, 높이, 색상을 입력하는 필드입니다. 숫자와 색상 선택기 입력 필드가 포함되어 있습니다.

* **방향 선택 필드 (.form_input)**  
삼각형의 방향을 선택할 수 있는 드롭다운 메뉴입니다.

* **생성 버튼 (.generate)**  
사용자가 입력한 값을 바탕으로 삼각형을 생성하는 버튼입니다.

* **CSS 코드 표시 영역 (.css_code)**  
생성된 삼각형의 CSS 코드를 표시하는 영역입니다.

* **삼각형 표시 영역 (.triangle)**  
사용자가 설정한 스타일로 삼각형을 실제로 표시하는 부분입니다.  
<br>

## CSS 스타일
```css
body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f7f7f7; } 
.container { padding: 20px; background: #fff; border-radius: 10px; text-align: center; box-shadow: 0 0 15px rgba(0,0,0,0.1); } 
.form_input, .generate { height: 40px; margin: 10px 3px; padding: 0 8px; border: 1px solid #ccc; border-radius: 5px; vertical-align: top; } 
.generate { background-color: #1C39BB; border-color: #1C39BB; color: #fff; cursor: pointer; } 
.triangle { width: 0; height: 0; margin: 20px auto 0; } 
.css_code { overflow: auto; margin-top: 20px; padding: 10px; background: #eee; border-radius: 5px; font-size: 14px; text-align: left; white-space: pre; } 

@media only screen and (max-width: 1024px){
    .container { width: 90%; } 
    .form_input { width: 45%; margin: 10px 1%; } 
    .generate { width: 100%; max-width: 300px; margin: 20px auto 0; }
}
```
* **기본 레이아웃**   
body 태그는 flex 레이아웃을 사용하여 내용을 화면 중앙에 배치합니다.

* **컨테이너 스타일**  
배경, 그림자, 텍스트 정렬 등 기본적인 스타일링이 적용되어 있습니다.

* **입력 필드와 버튼 스타일**  
일관된 높이, 마진, 패딩, 그리고 border 스타일이 적용됩니다. 특히, .generate 버튼은 돋보이는 배경색과 커서 스타일을 가지고 있습니다.

* **반응형 디자인**   
@media 쿼리를 사용하여 화면 크기가 1024px 이하일 때 컨테이너의 너비와 버튼의 스타일을 조정합니다.

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

<br>

## jQuery 코드
```js
$(document).ready(function() {
    // 삼각형 생성 버튼 클릭 이벤트 핸들러
    $('.generate').click(function() {
        // 입력값 가져오기
        const width = $('#width').val();
        const height = $('#height').val();
        const color = $('#color').val();
        const direction = $('#direction').val();

        // 삼각형 CSS 계산
        const triangleCSS = calculateTriangleCSS(width, height, color, direction);
        $('.triangle').css(triangleCSS);

        // 생성된 CSS 코드 표시
        displayCSSCode(triangleCSS);
    });

    // 삼각형의 CSS 스타일을 계산하는 함수
    function calculateTriangleCSS(width, height, color, direction) {
        const css = {
            width: 0,
            height: 0,
            borderTop: '',
            borderBottom: '',
            borderLeft: '',
            borderRight: ''
        };

        // 삼각형 방향에 따라 CSS 스타일 결정
        switch (direction) {
            case 'up':
                css.borderLeft = `${width / 2}px solid transparent`;
                css.borderRight = `${width / 2}px solid transparent`;
                css.borderBottom = `${height}px solid ${color}`;
                break;
            case 'down':
                css.borderLeft = `${width / 2}px solid transparent`;
                css.borderRight = `${width / 2}px solid transparent`;
                css.borderTop = `${height}px solid ${color}`;
                break;
                case 'left':
                css.borderTop = `${height / 2}px solid transparent`;
                css.borderBottom = `${height / 2}px solid transparent`;
                css.borderRight = `${width}px solid ${color}`;
                break;
            case 'right':
                css.borderTop = `${height / 2}px solid transparent`;
                css.borderBottom = `${height / 2}px solid transparent`;
                css.borderLeft = `${width}px solid ${color}`;
                break;

            case 'up-left':
                css.borderBottom = `${height / 2}px solid transparent`;
                css.borderRight = `${width / 2}px solid transparent`;
                css.borderTop = `${height / 2}px solid ${color}`;
                css.borderLeft = `${width / 2}px solid ${color}`;
                break;

            case 'up-right':
                css.borderBottom = `${height / 2}px solid transparent`;
                css.borderLeft = `${width / 2}px solid transparent`;
                css.borderTop = `${height / 2}px solid ${color}`;
                css.borderRight = `${width / 2}px solid ${color}`;
                break;
            
            case 'down-left':
                css.borderTop = `${height / 2}px solid transparent`;
                css.borderRight = `${width / 2}px solid transparent`;
                css.borderBottom = `${height / 2}px solid ${color}`;
                css.borderLeft = `${width / 2}px solid ${color}`;
                break;

            case 'down-right':
                css.borderTop = `${height / 2}px solid transparent`;
                css.borderLeft = `${width / 2}px solid transparent`;
                css.borderBottom = `${height / 2}px solid ${color}`;
                css.borderRight = `${width / 2}px solid ${color}`;
                break;
        }

        return css;
    }

    // camelCase를 kebab-case로 변환하는 함수
    function camelToKebabCase(str) {
        return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    }

    // CSS 코드를 표시하는 함수
    function displayCSSCode(cssObj) {
        let cssCode = `.triangle {\n`;
        for (const [key, value] of Object.entries(cssObj)) {
            if (value !== '') {
                cssCode += `    ${camelToKebabCase(key)}: ${value};\n`;
            }
        }
        cssCode += `}`;
        $('.css_code').text(cssCode);
    }
});
```
* **이벤트 핸들링**  
.generate 버튼의 클릭 이벤트를 감지하고 처리합니다.

* **값 추출 및 처리**  
너비, 높이, 색상, 방향의 입력값을 가져와서 삼각형을 생성하는 데 사용합니다.

* **CSS 계산**  
calculateTriangleCSS 함수를 통해 입력된 값을 기반으로 삼각형의 CSS 스타일을 계산합니다. 이는 삼각형의 방향에 따라 다른 CSS 속성을 적용합니다.

* **동적 스타일 적용**  
계산된 CSS 스타일을 .triangle 클래스에 적용하여 삼각형의 모양을 변경합니다.

* **CSS 코드 표시**  
displayCSSCode 함수를 통해 생성된 CSS 코드를 .css_code 영역에 표시합니다. 이때, camelCase로 작성된 JavaScript 객체의 키를 kebab-case로 변환하는 작업이 포함됩니다.  
<br>


## 결론
이 웹 애플리케이션은 사용자가 쉽게 원하는 삼각형을 디자인하고, 실시간으로 그에 대응하는 CSS 코드를 얻을 수 있습니다. 이는 웹 디자인과 개발을 학습하는 이들에게 실용적인 예시를 제공하며, 실제 프로젝트에서도 활용될 수 있는 유용한 도구입니다.  
<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-12-05-triangle/">삼각형 CSS 코드 자동생성</a>
</div>