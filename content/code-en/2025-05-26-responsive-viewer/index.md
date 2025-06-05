---
title: >  
    How to Build a Responsive Device Preview with jQuery

description: >  
    Create a simple yet powerful testing tool using jQuery and iframes that lets you preview your website across desktop, tablet, and mobile screen sizes.

slug: 2025-05-26-responsive-viewer
date: 2025-05-26 00:00:00+0000
lastmod: 2025-05-26 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-26-responsive-viewer-en.webp

alternates:
  - title: "jQuery - iframe 기반 반응형 웹사이트 미리보기 툴 만들기"
    href: "https://ctrlcccv.github.io/code/2025-05-23-responsive-viewer/"
    hreflang: "ko"
  - title: "How to Build a Responsive Device Preview with jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-05-26-responsive-viewer/"
    hreflang: "en"
  - title: "jQuery - iframe 기반 반응형 웹사이트 미리보기 툴 만들기"
    href: "https://ctrlcccv.github.io/code/2025-05-23-responsive-viewer/"
    hreflang: "x-default"

categories:
    - jQuery
tags:
    - Web Development
    - UI/UX

---

Ever found yourself repeatedly switching between different devices to check how your website looks?

When building responsive websites, it's essential to verify how designs render across desktop, tablet, and mobile screen sizes. While browser developer tools work well, having a standalone preview tool is much more convenient for client presentations and team collaboration. This tutorial will show you how to build your own responsive website preview tool using jQuery and iframes.

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

## HTML Structure

Let's start with the HTML framework that creates our device preview interface:

```html
<div class="responsive_viewer">
    <h1>Responsive Website Preview</h1>
    <div class="buttons">
        <button id="pcBtn" class="active" data-device="pc">Desktop <span class="mo_hidden">(1920px)</span></button>
        <button id="tabletBtn" data-device="tablet">Tablet <span class="mo_hidden">(768px)</span></button>
        <button id="mobileBtn" data-device="mobile">Mobile <span class="mo_hidden">(375px)</span></button>
    
    
    <div class="frame_container">
        <div class="iframe_wrapper">
            <iframe class="preview_frame" src="https://example.com"></iframe>
        
    

```

* **Overall Structure**  
<span class="txt">
The preview tool is contained within the `.responsive_viewer` class, which houses a title, device selection buttons, and an iframe for displaying website content.
</span>

* **Device Selection Buttons**  
<span class="txt">
Three buttons represent different device sizes: desktop (1920px), tablet (768px), and mobile (375px). Each button has a `data-device` attribute that identifies its device type. The `.mo_hidden` class hides pixel dimensions on smaller screens.
</span>

* **iframe Preview Area**  
<span class="txt">
The heart of the tool is an iframe element nested within container divs. This iframe will load and display the target website, allowing us to adjust its size dynamically.
</span>

<br>

## CSS Styling

Now let's style our preview tool with clean, functional CSS:

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

* **Layout Configuration**  
<span class="txt">
The preview tool has a maximum width of 1200px and is centered on the page. We use flexbox for a clean, vertical layout with appropriate spacing between elements.
</span>

* **Button Design**  
<span class="txt">
The device selection buttons feature a sleek dark blue gradient that changes on hover and when active. Their rounded corners and padding create comfortable, easy-to-click targets.
</span>

* **Frame Container**  
<span class="txt">
The preview area uses a white background with subtle shadow effects for a clean, modern look. We use a nested container structure to separate styling concerns from functional requirements.
</span>

* **iframe Configuration**  
<span class="txt">
The iframe is set to fill its container completely without borders. The `transform-origin: 0 0` property is crucial for ensuring our scaling happens from the top-left corner.
</span>

* **Responsive Adaptation**  
<span class="txt">
On smaller screens (below 768px), we hide the pixel dimensions to conserve space. The iframe container's height adjusts dynamically based on the viewport height, maintaining visibility on all devices.
</span>

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

## jQuery Implementation

The magic of our responsive preview tool happens through jQuery:

```js
// Initialize and control responsive website preview
function handleIframeLoad() {
    // Cache key DOM elements
    const $iframeWrapper = $('.responsive_viewer .iframe_wrapper');
    const $preview = $('.responsive_viewer .preview_frame');
    
    // Device configuration values
    let currentDevice = 'pc';
    let deviceSizes = {
        'pc': 1920,
        'tablet': 768,
        'mobile': 375
    };
    
    // Device selection button events
    $('.responsive_viewer .buttons button').on('click', function() {
        const $this = $(this);
        const device = $this.data('device');
        
        $this.addClass('active').siblings().removeClass('active');
        setDeviceSize(device);
    });

    // Set device size and apply scaling
    function setDeviceSize(device) {
        currentDevice = device;
        const deviceWidth = deviceSizes[device];
        const containerWidth = $iframeWrapper.width();
        
        // Set frame width
        $preview.css('width', deviceWidth + 'px');
        applyScaling(deviceWidth, containerWidth);
        
        // Apply scaling again after DOM updates
        setTimeout(() => {
            applyScaling(deviceWidth, $iframeWrapper.width());
        }, 50);
    }
    
    // Apply scaling based on container and device width
    function applyScaling(deviceWidth, containerWidth) {
        let scale = 1;
        if (containerWidth < deviceWidth) {
            scale = containerWidth / deviceWidth;
            $preview.css('transform', `scale(${scale})`);
        } else {
            $preview.css('transform', 'scale(1)');
        }
        
        // Adjust height according to scale
        setTimeout(() => {
            const wrapperHeight = $iframeWrapper.height();
            $preview.css('height', (wrapperHeight / scale) + 'px');
        }, 50);
    }
    
    // Handle window resize events
    $(window).on('resize', function() {
        setDeviceSize(currentDevice);
    });
    
    // Adjust size when iframe content loads
    $preview.on('load', function() {
        setDeviceSize(currentDevice);
    });
}

// Initialize on page load
$(document).ready(function() {
    handleIframeLoad();
});
```

* **Element Caching and Initialization**  
<span class="txt">
We start by caching frequently accessed DOM elements to improve performance. Device widths are stored in a configuration object that's easy to customize for different device sizes.
</span>

* **Button Event Handling**  
<span class="txt">
When a button is clicked, we apply the active styling and call the `setDeviceSize` function to update the preview. This creates an interactive experience as users switch between device views.
</span>

* **Dynamic Size Adjustment**  
<span class="txt">
The `setDeviceSize` function sets the iframe width according to the selected device and then scales it to fit the container. We use `setTimeout` to ensure all DOM updates are complete before measuring sizes.
</span>

* **Proportional Scaling Calculation**  
<span class="txt">
When a device width exceeds the container width, we calculate a scaling ratio to shrink the preview proportionally. This maintains the correct aspect ratio while fitting within the available space.
</span>

* **Event Handling for Responsiveness**  
<span class="txt">
Event listeners for window resizing and iframe loading ensure the preview maintains the correct dimensions even when the browser size changes or new content loads.
</span>

<br>

## Practical Use Cases

Here's how you can leverage this responsive preview tool:

1. **Development and Testing**  
<span class="txt">
Test your websites across different device sizes without constantly switching between physical devices or browser dev tools. Point the iframe to your local development server to preview changes in real-time.
</span>

2. **Client Presentations**  
<span class="txt">
Impress clients with an interactive way to demonstrate how their website responds to different device sizes. It's more engaging than static screenshots and helps clients visualize the final product.
</span>

3. **Portfolio Enhancement**  
<span class="txt">
Add this tool to your portfolio to showcase your responsive websites. Allow visitors to interactively test your work across different screen sizes without leaving your portfolio page.
</span>

<br>

## Conclusion

Building a responsive device preview tool with jQuery and iframes gives you a powerful way to visualize and test websites across multiple screen sizes. The solution is lightweight, requiring just a handful of HTML, CSS, and JavaScript code, yet provides functionality similar to browser developer tools.

This tool is particularly valuable for front-end developers, designers, and project managers who need to validate responsive designs or showcase work to clients. It's also an excellent learning resource for understanding how CSS scaling and responsive design principles work together.

How do you currently test your responsive designs? Have you created any extensions or improvements to this basic preview tool? Share your experiences in the comments below!

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-23-responsive-viewer/">Live Example Preview</a>
</div>

