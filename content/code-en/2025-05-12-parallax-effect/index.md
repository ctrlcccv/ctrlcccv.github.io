---
title: >  
    jQuery - Dynamic Parallax Effect on Mouse Move 

description: >  
    Learn how to implement a smooth parallax effect that responds to mouse movement using jQuery.

slug: 2025-05-12-parallax-effect
date: 2025-05-12 00:00:00+0000
lastmod: 2025-05-12 00:00:00+0000

alternates:
  - title: "jQuery - 마우스 따라 움직이는 패럴랙스 효과 구현하기"
    href: "https://ctrlcccv.github.io/code/2025-05-08-parallax-effect/"
    hreflang: "ko"
  - title: "jQuery - Dynamic Parallax Effect on Mouse Move"
    href: "https://ctrlcccv.github.io/code-en/2025-05-12-parallax-effect/"
    hreflang: "en"

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-12-parallax-effect-en.webp

categories:
    - jQuery
tags:

---
Want to create an engaging parallax effect that responds to mouse movement? Let's build it together!

Adding dynamic elements to your website can capture visitors' attention and increase page engagement time. A parallax effect that smoothly responds to mouse movement is particularly effective in enhancing visual appeal. In this post, we'll explore how to implement a mouse-responsive parallax effect using jQuery.


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

## HTML Structure

```html
<div id="container">
    <img src="https://unsplash.it/800/800?random=" alt="Background Image" class="bg">
    <h1 class="title">Title</h1>
</div>
```

* **Container Structure**  
<span class="txt">
We place a background image and title text inside the container to create our parallax elements.  
Each element has its own class to allow independent movement.
</span>

<br>

## CSS Styling

```css
#container { 
    overflow: hidden; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    position: relative; 
    width: 600px; 
    height: 600px; 
    margin: 50px auto 0; 
} 

#container .bg { 
    width: 800px; 
    height: 800px; 
} 

#container .title {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -33px;
    margin-left: -63px;
    font-size: 46px; 
    font-weight: 700;
    color: #fff; 
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.4); 
}
```

* **Container Styling**  
<span class="txt">
The container is set to a centered 600x600 area.  
overflow: hidden ensures elements don't escape the container boundaries.
</span>

* **Background Image Styling**  
<span class="txt">
The background image is set larger (800x800) than the container to allow for movement.  
This creates a more natural parallax effect.
</span>

* **Title Styling**  
<span class="txt">
The title is absolutely positioned in the center with text shadow for better readability.  
This element will also move independently with mouse movement.
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

## jQuery Code

```js
// Select the container element
const containerSelector = '#container';
const $container = $(containerSelector);
// Get container's position and size information
let bounds = $container[0].getBoundingClientRect();
// Initialize object to track mouse position and movement
const mousePos = { x: 0, y: 0, hasMoved: false };

// Update mouse position when moving over the container
$(document).on('mousemove', containerSelector, function(e) {
    mousePos.hasMoved = true;
    mousePos.x = e.clientX - bounds.left;
    mousePos.y = e.clientY - bounds.top;
});

// Function to apply parallax effect to specific targets
function applyParallax(target, moveFactor) {
    const xMovement = (mousePos.x - bounds.width / 2) / bounds.width * moveFactor;
    const yMovement = (mousePos.y - bounds.height / 2) / bounds.height * moveFactor;
    $(target).css('transform', `translate3d(${xMovement}px, ${yMovement}px, 0)`);
}

// Continuously refresh the parallax effect
function refreshParallax() {
    if (mousePos.hasMoved) {
        applyParallax('.bg', -200);  // Background moves in opposite direction
        applyParallax('.title', -100);  // Title moves slower than background
        mousePos.hasMoved = false;
    }

    requestAnimationFrame(refreshParallax);
}

// Update bounds on window resize or scroll
$(window).on('resize scroll', function() {
    bounds = $container[0].getBoundingClientRect();
});

// Start the parallax animation
refreshParallax();
```

* **Mouse Event Handling**  
<span class="txt">
Updates position information and sets the hasMoved flag when the mouse moves.  
This prevents unnecessary animation updates.
</span>

* **Parallax Effect Application**  
<span class="txt">
The applyParallax function takes a target element and movement factor to apply movement via transform.  
Different movement factors create a sense of depth.
</span>

* **Animation Loop**  
<span class="txt">
Uses requestAnimationFrame for smooth animation.  
Only updates element positions when the mouse has moved.
</span>

* **Controlling Parallax Direction and Speed**  
<span class="txt">
The `moveFactor` parameter in `applyParallax` function controls both direction and speed of the movement:
</span>

<br>

### Direction Control
- Positive values (e.g., 200): Elements move in the same direction as the mouse  
  - When mouse moves right → element moves right
  - When mouse moves left → element moves left
  - Creates a "following" effect
  
- Negative values (e.g., -200): Elements move in the opposite direction of the mouse
  - When mouse moves right → element moves left
  - When mouse moves left → element moves right
  - Creates a "pushing" effect

<br>

### Speed Control
- Larger absolute values (e.g., 200, -200): Creates more dramatic movement
  - Elements move further from their original position
  - Better for background elements or dramatic effects

- Smaller absolute values (e.g., 50, -50): Creates subtle movement
  - Elements stay closer to their original position
  - Better for text or UI elements

<br>

### Practical Examples
- `.bg` with `-200`: Strong opposite movement, good for background
- `.title` with `-100`: Moderate opposite movement, good for text
- Using `200`: Would create a strong following effect
- Using `50`: Would create a subtle following effect

**Combining Different Values:**
You can create depth by combining different values:
- Background: `-200` (strong opposite movement)
- Middle layer: `-100` (moderate opposite movement)
- Foreground: `50` (subtle following movement)
This creates a 3D-like effect where elements move at different speeds and directions.
</span>

<br>

## Parallax Effect Use Cases

* **Main Page Banner**  
<span class="txt">
Applying parallax to the top banner creates a strong visual impact.  
Background and text move naturally with mouse movement, engaging visitors and encouraging exploration.
</span>

* **Product Introduction Pages**  
<span class="txt">
Parallax effects can emphasize product features by creating a sense of depth.  
Product images and text move at different speeds, creating a 3D-like viewing experience.
</span>

* **Portfolio Gallery**  
<span class="txt">
Adding parallax to artwork images makes the gallery more dynamic.  
Images move in 3D space as the mouse moves, creating an immersive gallery experience.
</span>

<br>  

## Conclusion

In this post, we've implemented a mouse-following parallax effect using jQuery.  
The background image and title move naturally with mouse movement, creating visual depth.  
This effect can be applied to your website's main page or special sections to capture user attention.

We've also explored various use cases and performance optimization tips for real-world implementation.  
By applying these optimization techniques appropriately, you can create smoother and more efficient parallax effects.

Feel free to leave a comment if you have any questions about the code!

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-08-parallax-effect/">Live Example Preview</a>
</div> 
