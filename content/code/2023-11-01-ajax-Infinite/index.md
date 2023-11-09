---
title: jQuery - Ajax 무한 스크롤 예제 (Intersection Observer API 활용)
description: >  
    Intersection Observer API를 활용하여 무한 스크롤을 구현하는 방법입니다.
slug: 2023-11-01-ajax-Infinite
date: 2023-11-01 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2023-11-01-ajax-Infinite.webp

categories:
    - jQuery
tags:
    - Intersection Observer API
    - Ajax
    - 스크롤 이벤트
---
무한 스크롤(infinite scroll)은 웹 애플리케이션에서 콘텐츠를 끊임없이 로드하여 사용자가 스크롤할 때마다 새로운 데이터를 자연스럽게 표시하는 기술입니다. 이 기술은 사용자 경험을 향상시키고 페이지 네비게이션을 개선하는 데 도움이 됩니다. 무한 스크롤을 구현하는 방법 중 하나는 jQuery와 Ajax를 사용하여 데이터를 동적으로 로드하는 것입니다.

그러나 스크롤 이벤트를 사용하여 데이터를 로드하는 경우, 불필요한 이벤트 핸들링과 데이터 요청이 발생할 수 있습니다. 이에 따라 성능 문제가 발생할 수 있으며, 사용자 경험에 악영향을 미칠 수 있습니다.

이 문제를 해결하기 위해 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)를 사용하는 것이 좋습니다. Intersection Observer API는 요소가 화면에 나타났을 때 콜백 함수를 실행하는 기능을 제공하며, 스크롤 이벤트를 사용하지 않고도 무한 스크롤을 구현할 수 있습니다.  
<br>

## HTML 구조
**container**라는 클래스로 스크롤 가능한 컨테이너를 만들고, **item** 클래스로 각각의 아이템을 나타냅니다.  
이 컨테이너에는 스크롤 했을 때 동적으로 아이템이 추가됩니다.
```html
<div class="container"></div>
```

## CSS 스타일
스크롤 가능한 목록을 만들고 스타일링합니다.
```css
.container { width: 500px;height: 250px;margin: 150px auto 0;background: #fff;border: 1px solid #ededed;border-radius:6px;overflow-x: hidden;overflow-y: auto;} 
.item {padding: 10px 15px;font-size: 16px;}
.item + .item {border-top: 1px solid #ededed;}
```
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
    // 현재 페이지 번호 및 페이지당 아이템 수 설정
    let page = 1;
    const itemsPerPage = 10;

    // 아이템을 표시할 컨테이너와 아이템 클래스 설정
    const itemContainer = '.container';
    const itemClass = 'item'; 

    // 마지막으로 로드된 아이템과 관찰된 아이템을 추적하기 위한 변수 초기화
    let lastItem;
    let lastObservedItem; 

    // 아이템을 로드하고 화면에 추가하는 함수
    function loadItems() {
        $.ajax({
            url: `https://raw.githubusercontent.com/ctrlcccv/ctrlcccv-demo/main/2023-11-01-ajax-Infinite/test.json`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // 현재 페이지에 해당하는 아이템만 선택
                const newData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
                newData.forEach(newItem => {
                    // 아이템을 컨테이너에 추가
                    $(`${itemContainer}`).append(`<div class="${itemClass}">${newItem.item}</div>`);
                });
                page++; // 다음 페이지로 이동

                // 마지막으로 추가된 아이템 설정 및 Intersection Observer에 관찰
                lastItem = $(`${itemContainer} .${itemClass}:last`)[0];
                if (lastItem !== lastObservedItem) {
                    observer.observe(lastItem);
                    lastObservedItem = lastItem;
                }
            },
            error: function (error) {
                console.error('데이터를 가져오는 동안 오류가 발생했습니다:', error);
            }
        });
    }

    // 초기 페이지 로드 시 아이템 로드 함수 호출
    loadItems();

    // Intersection Observer 설정
    const observerOptions = {
        root: null,      // 관찰자의 루트 요소 설정
        threshold: 0.5   // 아이템이 50% 이상 화면에 나타날 때 콜백 함수 실행
    };

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 아이템이 화면에 나타나면 아이템을 로드하고 관찰 해제
                lastObservedItem = $(`${itemContainer} .${itemClass}:last`)[0];
                loadItems();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
});
```
* **페이지 및 아이템 관련 변수 설정**  
  * page 변수는 현재 페이지 번호를 저장합니다. 초깃값은 1입니다.
  * itemsPerPage 변수는 한 페이지당 표시되는 아이템 수를 설정합니다. 초깃값은 10입니다.

* **컨테이너 및 아이템 클래스 설정**  
  * itemContainer 변수는 아이템을 표시할 HTML 컨테이너의 선택자를 저장합니다. 이 예제에서는 container 클래스를 선택합니다.
  * itemClass 변수는 아이템 요소의 클래스를 설정합니다. 이 예제에서는 item 클래스를 선택합니다.

* **마지막으로 로드된 아이템 및 관찰된 아이템 추적 변수 초기화**  
  * lastItem 변수는 마지막으로 로드된 아이템을 추적합니다.
  * lastObservedItem 변수는 마지막으로 관찰된 아이템을 추적합니다.

* **아이템을 로드하고 화면에 추가하는 함수 loadItems()**  
  * Ajax를 사용하여 원격 데이터를 가져옵니다.
  * 현재 페이지에 해당하는 아이템만 선택하여 데이터를 처리하고, 각 아이템을 컨테이너에 추가합니다.
  * 페이지 번호를 증가시켜 다음 페이지로 이동합니다.
  * 마지막으로 추가된 아이템을 설정하고 Intersection Observer에 관찰을 시작합니다.

* **Intersection Observer 설정**  
  * Intersection Observer의 옵션을 설정합니다.
  * root는 관찰자의 루트 요소를 설정합니다. 이 예제에서는 null로 설정하여 브라우저 뷰포트를 사용합니다.
  * threshold는 아이템이 화면에 50% 이상 나타날 때 콜백 함수가 실행되도록 설정합니다.

* **Intersection Observer 생성**  
  * Intersection Observer 객체를 생성하고, 화면에 나타나는 아이템을 감지하는 콜백 함수를 정의합니다.
  * 콜백 함수는 화면에 아이템이 나타나면 해당 아이템을 로드하고 관찰을 해제합니다.  
<br>

## 결론
이 글에서는 jQuery와 Ajax를 사용하여 무한 스크롤을 구현하는 예제를 살펴보았습니다. 더불어 Intersection Observer API를 활용하여 스크롤 이벤트를 효율적으로 처리하는 방법도 소개했습니다. 이러한 기술을 사용하면 웹 애플리케이션의 성능을 향상시키고 사용자 경험을 개선할 수 있습니다. 무한 스크롤은 많은 웹 사이트에서 활용되며, 이를 통해 사용자는 원활하게 콘텐츠를 스크롤하고 탐색할 수 있습니다.  
<br>

> 예제 확인하기 
> * [https://ctrlcccv.github.io/ctrlcccv-demo/2023-11-01-ajax-Infinite](/ctrlcccv-demo/2023-11-01-ajax-Infinite/)  
