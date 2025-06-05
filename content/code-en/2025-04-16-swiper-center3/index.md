---
title: >  
    Swiper.js: How to Fix Loop + CenteredSlides Issues

description: >  
    Learn how to fix Swiper.js centeredSlides transition issues using duplicate slides for smoother, seamless looping.

alternates:
  - title: "Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결"
    href: "https://ctrlcccv.github.io/code/2025-04-15-swiper-center3/"
    hreflang: "ko"
  - title: "Swiper.js: How to Fix Loop + CenteredSlides Issues"
    href: "https://ctrlcccv.github.io/code-en/2025-04-16-swiper-center3/"
    hreflang: "en"
  - title: "Swiper.js 11+ centeredSlides 슬라이드 전환 오류 해결"
    href: "https://ctrlcccv.github.io/code/2025-04-15-swiper-center3/"
    hreflang: "x-default"

slug: 2025-04-16-swiper-center3
date: 2025-04-16 00:00:00+0000
lastmod: 2025-04-16 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-04-16-swiper-center3.webp

categories:
    - jQuery
tags:
    - Swiper.js
---
Swiper.js has become a go-to solution for web developers looking to build sleek, responsive sliders that enhance user engagement. One of its most powerful features is the centeredSlides option, which keeps the active slide perfectly centered in view. However, starting with Swiper.js version 11, using centeredSlides—especially in cases with a small number of slides or dynamic content—can introduce some tricky transition issues.  
<br>
In this guide, we’ll walk through a practical solution: using duplicate slides. By smartly duplicating your original slides, you can eliminate those common transition hiccups and deliver a smoother, more polished user experience. We’ll cover everything from the foundational HTML and CSS to the jQuery and Swiper.js logic that brings it all together. Let’s unlock the full potential of centeredSlides in your Swiper.js sliders!  

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

## Setting the Stage: HTML and CSS Essentials

Before jumping into JavaScript, let’s first lay down a solid foundation with our HTML and CSS.

<br>

### HTML Structure

```html
<div class="slider_center">
    <div class="inner">
        <ul class="slider_list swiper-wrapper">
            <li class="swiper-slide">1</li>
            <li class="swiper-slide">2</li>
            <li class="swiper-slide">3</li>
            <li class="swiper-slide">4</li>
            <li class="swiper-slide">5</li>
            <li class="swiper-slide">6</li>
            <li class="swiper-slide">7</li>
            <li class="swiper-slide">8</li>
            <li class="swiper-slide">9</li>
            <li class="swiper-slide">10</li>
        </ul>
    
    <div class="pagination">
    <div class="swiper-button-prev">
    <div class="swiper-button-next">

```
* **.slider_center**: Acts as the main wrapper, managing overflow and positioning.
* **.inner**: Helps achieve a centered layout—especially useful when dealing with duplicate slides.
* **.slider_list.swiper-wrapper**: Holds the slide items, as required by Swiper.js.
* **Pagination and navigation buttons**: Improve user control and accessibility.

<br>

### CSS Styling

```css
.slider_center { overflow: hidden; position: relative; margin-top: 100px; } 
.slider_list > li { display: flex; justify-content: center; align-items: center; width: 300px; height: 400px; background: #8ab4f8; font-size: 36px; font-weight: 500; } 
.pagination { display: flex; justify-content: center; margin-top: 20px; } 
.swiper-button-next, .swiper-button-prev { color: #000; }
/* When using coverflow and slidesPerView: 'auto', side slides may not display properly even with a sufficient number of slides. Adjust the width value (e.g., 200vw) below to ensure correct spacing and visibility. */
.slider_center .inner { position: relative; left: 50%; width: 200vw; transform: translate(-50%); } 
```
#### Why This Layout Works
Let’s break down the .inner styles:

* **width**: 200vw: Gives enough space for both original and duplicated slides to coexist without layout issues.
* **left: 50%**: Centers the left edge of the container.
* **transform**: translate(-50%): Nudges the container back by half its width, perfectly centering the slide strip in the viewport.

This structure isn’t just for looks—it’s vital for how Swiper handles looping and centering. With centeredSlides: true and loop: true, these styles ensure transitions are seamless and the active slide stays perfectly centered throughout.

<br>

## Optimizing Transitions with jQuery

Now that the layout is ready, let’s add the JavaScript logic to duplicate slides and initialize Swiper for a smooth, centered experience.

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


```js
function centerSlider() {
    // Select the original slide items and the list to append cloned slides
    const $sliderList = $('.slider_list');
    const $originalList = $('.slider_list > li');
    const originalSlideCount = $originalList.length;
    const targetCount = 20; // Desired total number of slides

    // Count current (non-cloned) slides
    const currentSlideCount = $sliderList.find('> li[data-cloned!=true]').length;
    // Calculate how many clones are needed to meet the target
    const neededClones = Math.max(0, Math.ceil((targetCount - currentSlideCount) / originalSlideCount));

    // Clone and append the necessary number of original slides
    for (let i = 0; i < neededClones; i++) {
        $originalList.each(function () {
            const $clone = $(this).clone();
            $sliderList.append($clone);
        });
    }

    // Initialize Swiper with desired settings
    const swiperOptions = {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: -50,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.slider_center .pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => index < originalSlideCount ? `<span class="${className}"></span>` : '',
        },
        navigation: {
            nextEl: '.slider_center .swiper-button-next',
            prevEl: '.slider_center .swiper-button-prev',
        },
    };

    // Create Swiper instance
    const swiper = new Swiper('.slider_center .inner', swiperOptions);

    // Update pagination bullets on slide transition start
    swiper.on('transitionStart', () => {
        const currentIndex =
            swiper.realIndex < originalSlideCount
                ? swiper.realIndex
                : swiper.realIndex % originalSlideCount;

        const $paginationItems = $('.slider_center .pagination .swiper-pagination-bullet');
        $paginationItems.removeClass('swiper-pagination-bullet-active');
        $paginationItems.eq(currentIndex).addClass('swiper-pagination-bullet-active');
    });

    // Handle autoplay behavior after looped slides transition
    let autoplayActive = false;
    swiper.on('transitionEnd', () => {
        const currentIndex = swiper.realIndex;
        if (currentIndex >= originalSlideCount) {
            const originalIndex = currentIndex % originalSlideCount;
            swiper.slideToLoop(originalIndex, 0); // Instantly jump to the original slide
            autoplayActive = true;
        }
        if (autoplayActive) {
            swiper.autoplay.start(); // Restart autoplay
            setTimeout(() => {
                autoplayActive = false;
            }, 1000); // Reset flag after a short delay
        }
    });
}
```
### How It Works
* **Element Selection**: We grab all the original slides and count them.
* **Cloning Logic**: If there aren't enough slides to make loop and centeredSlides work smoothly, we clone the originals until we hit our desired count.
* **Swiper Setup**: We configure Swiper with looping, centering, autoplay, navigation, and a custom pagination renderer.
* **Pagination Sync**: We listen for transition events to keep pagination accurate, even with duplicated slides.  

<br>

### Why Cloning Is Important
When using both loop: true and centeredSlides: true, Swiper internally duplicates slides to create a seamless loop. However, if your original slide count is too low, Swiper might not have enough material to work with—leading to stutters, jumps, or off-center transitions.

By manually cloning slides, we ensure:

* Smooth looping without visual glitches
* Consistent centering of the active slide
* An overall better user experience

<br>

## Final Tips

* Don’t overdo the cloning—too many slides can hurt performance.
* Keep your target slide count reasonable for best results.
* Test your slider across screen sizes to ensure responsive behavior.

<br>

## Conclusion

In this tutorial, we tackled a common issue with Swiper.js’s centeredSlides feature and shared a smart fix using duplicate slides. By applying these techniques, you can create sliders that look better, feel smoother, and behave more consistently—even with limited or dynamic content.

Armed with these tips, you're ready to elevate your Swiper.js sliders and deliver a refined user experience that stands out. Happy coding!

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-04-15-swiper-center3/">Live Example Preview</a>
</div>

