---
title: >  
    jQuery - iframe 기반 반응형 웹사이트 미리보기 툴 만들기

description: >  
    jQuery와 iframe을 활용하여 PC, 태블릿, 모바일 크기에서 웹사이트가 어떻게 보이는지 미리볼 수 있는 반응형 테스트 도구를 만드는 방법을 알아봅니다.  

slug: 2025-05-23-responsive-viewer
date: 2025-05-23 00:00:00+0000
lastmod: 2025-05-23 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-23-responsive-viewer.webp

categories:
    - jQuery
tags:

---

다양한 디바이스에서 웹사이트가 어떻게 보이는지 일일이 확인하느라 불편했던 적이 있으신가요?

반응형 웹사이트를 개발할 때 PC, 태블릿, 모바일 등 다양한 화면 크기에서 디자인이 어떻게 표현되는지 확인하는 것은 매우 중요합니다. 개발자 도구를 사용하거나 실제 기기로 테스트하는 방법도 있지만, 클라이언트에게 보여주거나 팀원들과 공유할 수 있는 독립적인 미리보기 도구가 있으면 더욱 편리합니다. 이번 포스트에서는 jQuery와 iframe을 활용하여 반응형 웹사이트 미리보기 툴을 만드는 방법을 알아보겠습니다.


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
<div class="responsive_viewer">
    <h1>반응형 웹사이트 미리보기</h1>
    <div class="buttons">
        <button id="pcBtn" class="active" data-device="pc">PC <span class="mo_hidden">(1920px)</span></button>
        <button id="tabletBtn" data-device="tablet">태블릿 <span class="mo_hidden">(768px)</span></button>
        <button id="mobileBtn" data-device="mobile">모바일 <span class="mo_hidden">(375px)</span></button>
    </div>
    
    <div class="frame_container">
        <div class="iframe_wrapper">
            <iframe class="preview_frame" src="https://example.com"></iframe>
        </div>
    </div>
</div>
```

* **전체 구조**  
<span class="txt">
전체 미리보기 툴은 .responsive_viewer 클래스로 감싸져 있으며, 제목, 디바이스 선택 버튼, 그리고 iframe 미리보기 프레임으로 구성되어 있습니다.
</span>

* **디바이스 선택 버튼**  
<span class="txt">
세 가지 화면 크기(PC, 태블릿, 모바일)를 선택할 수 있는 버튼이 있으며, 각 버튼에는 data-device 속성으로 디바이스 유형이 지정되어 있습니다. .mo_hidden 클래스가 적용된 요소는 모바일 화면에서는 숨겨집니다.
</span>

* **iframe 미리보기 영역**  
<span class="txt">
.frame_container와 .iframe_wrapper로 감싸진 iframe 요소가 실제 웹사이트를 보여주는 역할을 합니다. src 속성에 미리보기할 웹사이트 URL을 지정할 수 있습니다.
</span>

<br>

## CSS 스타일

```css
.responsive_viewer { display: flex; gap: 20px; max-width: 1200px; margin: 0 auto; flex-direction: column; } 
.responsive_viewer h1 { margin-bottom: 20px; font-size: 24px; color: #333; text-align: center; } 
.responsive_viewer .buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; } 
.responsive_viewer button { padding: 10px 20px; background-color: #485563; border: none; border-radius: 5px; font-size: 16px; color: white; cursor: pointer; transition: background-color 0.3s; } 
.responsive_viewer button:hover { background-color: #3a4654; } 
.responsive_viewer button.active { background-color: #29323c; } 
.responsive_viewer .frame_container { overflow: hidden; display: flex; justify-content: center; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(45, 54, 65, 0.2); transition: all 0.3s ease; } 
.responsive_viewer .iframe_wrapper { overflow: hidden; position: relative; height: calc(100vh - 350px); max-width: 100%; border: 1px solid #cbd2d9; box-shadow: 0 2px 4px rgba(71, 84, 99, 0.1); transition: all 0.3s ease; } 
.responsive_viewer iframe { width: 100%; height: 100%; border: none; transform-origin: 0 0; } 
@media (max-width: 768px){
    .responsive_viewer .mo_hidden { display: none; } 
}
```

* **레이아웃 구성**  
<span class="txt">
.responsive_viewer는 최대 1200px 너비를 가지며 가운데 정렬되어 있습니다. flex 디스플레이를 사용하여 세로 방향으로 요소들을 배치하고 있습니다.
</span>

* **버튼 디자인**  
<span class="txt">
버튼은 어두운 파란색 계열의 배경색을 가지며, hover와 active 상태에 따라 색상이 변경됩니다. 둥근 모서리와 적절한 패딩으로 클릭하기 좋은 크기로 디자인되었습니다.
</span>

* **프레임 컨테이너**  
<span class="txt">
미리보기 영역은 흰색 배경에 그림자 효과를 주어 입체감을 표현했습니다. 외부 .frame_container와 내부 .iframe_wrapper로 이중 구조를 통해 디자인과 기능을 분리하였습니다.
</span>

* **iframe 설정**  
<span class="txt">
iframe은 테두리가 없고, 가로와 세로 100%로 설정되어 있습니다. transform-origin: 0 0은 스케일링 시 왼쪽 상단을 기준점으로 삼기 위해 설정되었습니다.
</span>

* **반응형 대응**  
<span class="txt">
768px 이하의 화면에서는 .mo_hidden 클래스를 가진 요소(디바이스 크기 표시)가 숨겨집니다. iframe_wrapper의 높이는 viewport 높이에서 350px을 뺀 값으로 설정되어, 다양한 화면 크기에서도 적절한 높이를 유지합니다.
</span>


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

## jQuery 코드

```js
// 반응형 웹사이트 미리보기 초기화 및 제어 함수
function handleIframeLoad() {
    // 주요 DOM 요소 캐싱
    const $iframeWrapper = $('.responsive_viewer .iframe_wrapper');
    const $preview = $('.responsive_viewer .preview_frame');
    
    // 디바이스 설정 값
    let currentDevice = 'pc';
    let deviceSizes = {
        'pc': 1920,
        'tablet': 768,
        'mobile': 375
    };
    
    // 디바이스 선택 버튼 이벤트
    $('.responsive_viewer .buttons button').on('click', function() {
        const $this = $(this);
        const device = $this.data('device');
        
        $this.addClass('active').siblings().removeClass('active');
        setDeviceSize(device);
    });

    // 디바이스 크기 설정 및 스케일링 적용
    function setDeviceSize(device) {
        currentDevice = device;
        const deviceWidth = deviceSizes[device];
        const containerWidth = $iframeWrapper.width();
        
        // 프레임 너비 설정
        $preview.css('width', deviceWidth + 'px');
        applyScaling(deviceWidth, containerWidth);
        
        // DOM 업데이트 후 다시 스케일링 적용
        setTimeout(() => {
            applyScaling(deviceWidth, $iframeWrapper.width());
        }, 50);
    }
    
    // 스케일링 적용
    function applyScaling(deviceWidth, containerWidth) {
        let scale = 1;
        if (containerWidth < deviceWidth) {
            scale = containerWidth / deviceWidth;
            $preview.css('transform', `scale(${scale})`);
        } else {
            $preview.css('transform', 'scale(1)');
        }
        
        // 스케일에 맞게 높이 조정
        setTimeout(() => {
            const wrapperHeight = $iframeWrapper.height();
            $preview.css('height', (wrapperHeight / scale) + 'px');
        }, 50);
    }
    
    // 창 크기 변경 시 리사이징 처리
    $(window).on('resize', function() {
        setDeviceSize(currentDevice);
    });
    
    // iframe 로드 완료 시 크기 재조정
    $preview.on('load', function() {
        setDeviceSize(currentDevice);
    });
}

// 페이지 로드 시 초기화
$(document).ready(function() {
    handleIframeLoad();
});
```

* **초기화 및 요소 캐싱**  
<span class="txt">
페이지 로드 시 handleIframeLoad 함수가 실행되며, 자주 사용하는 DOM 요소는 변수에 저장하여 성능을 최적화합니다. 디바이스별 크기는 객체로 관리하여 쉽게 수정할 수 있습니다.
</span>

* **디바이스 선택 버튼 이벤트**  
<span class="txt">
버튼 클릭 시 해당 버튼에 active 클래스를 추가하고 다른 버튼에서는 제거합니다. 선택된 디바이스 유형에 맞게 setDeviceSize 함수를 호출하여 iframe의 크기를 조정합니다.
</span>

* **디바이스 크기 설정**  
<span class="txt">
setDeviceSize 함수는 선택된 디바이스 유형에 따라 미리 정의된 너비를 iframe에 적용합니다. 그 후 applyScaling 함수를 호출하여 컨테이너 크기에 맞게 스케일링합니다. setTimeout을 사용한 이유는 DOM 업데이트 후 정확한 크기 계산을 위함입니다.
</span>

* **스케일링 적용**  
<span class="txt">
applyScaling 함수는 디바이스 너비가 컨테이너보다 큰 경우 비율을 계산하여 transform: scale() 속성으로 줄입니다. 스케일에 맞게 iframe의 높이도 조정합니다.
</span>

* **이벤트 리스너**  
<span class="txt">
창 크기가 변경되거나 iframe이 로드 완료될 때 setDeviceSize 함수를 호출하여 올바른 크기와 스케일이 적용되도록 합니다.
</span>

<br>

## 활용 방법

이 미리보기 툴의 활용 방법은 다양합니다:

1. **개발 중인 웹사이트 테스트**  
<span class="txt">
개발 중인 웹사이트를 다양한 디바이스에서 테스트할 수 있습니다. iframe의 src 속성을 로컬 서버 URL로 설정하면 실시간 개발 환경을 미리볼 수 있습니다.
</span>

2. **클라이언트 프레젠테이션**  
<span class="txt">
클라이언트에게 웹사이트가 다양한 디바이스에서 어떻게 보이는지 직관적으로 보여줄 수 있어, 프로젝트 진행 상황을 설명하기에 좋습니다.
</span>

3. **포트폴리오 강화 도구**  
<span class="txt">
개인 포트폴리오에 이 미리보기 툴을 포함시켜 자신이 제작한 반응형 웹사이트의 적응성을 직접 보여줄 수 있습니다. 면접관이나 클라이언트가 별도의 도구 없이도 다양한 화면 크기에서의 디자인을 확인할 수 있어, 포트폴리오의 전문성과 방문자의 상호작용 가능성을 크게 향상시킬 수 있습니다.
</span>

<br>

## 결론

이번 포스트에서는 jQuery와 iframe을 활용하여 반응형 웹사이트 미리보기 툴을 만드는 방법을 알아보았습니다. HTML, CSS, JavaScript 코드 몇 줄만으로도 PC, 태블릿, 모바일 화면을 쉽게 시뮬레이션할 수 있는 유용한 도구를 만들 수 있습니다. 이 도구는 개발자뿐 아니라 디자이너, 기획자 등 웹 프로젝트에 관련된 모든 사람들에게 도움이 될 수 있습니다.

여러분은 반응형 웹사이트를 테스트할 때 어떤 방법을 주로 사용하시나요? 이 코드를 응용하여 더 유용한 기능을 추가해보셨다면 댓글로 공유해주세요!

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-23-responsive-viewer/">예제결과 미리보기</a>
</div>
