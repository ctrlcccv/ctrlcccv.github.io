---
title: >  
    Disable Body Scroll Behind Popups (overscroll-behavior)

description: >  
    Learn how to prevent background scrolling behind popups using CSS overscroll-behavior and jQuery. This guide covers scroll chaining control, mobile touch handling, and fully disabling page scroll for a seamless user experience.

slug: 2025-05-09-popup-scroll
date: 2025-05-09 00:00:00+0000
lastmod: 2025-05-09 00:00:00+0000

alternates:
  - title: "overscroll-behavior로 팝업 내부 스크롤과 body 스크롤 제어하기"
    href: "https://ctrlcccv.github.io/code/2023-03-13-popup-scroll/"
    hreflang: "ko"
  - title: "Disable Body Scroll Behind Popups (overscroll-behavior)"
    href: "https://ctrlcccv.github.io/code-en/2025-05-09-popup-scroll/"
    hreflang: "en"

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-09-popup-scroll-en.webp

categories:
    - jQuery
tags:

---

You’ve probably seen this: you open a popup on your phone, try to scroll inside it, and suddenly the background page starts moving too. It’s distracting and frustrating. Fortunately, there are reliable ways to keep scrolling limited to the popup itself—or to disable background scroll entirely. In this guide, you’ll learn how to do both using CSS (`overscroll-behavior`) and a bit of jQuery. Let’s make sure your modals feel solid and user-friendly on any device.

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

Here’s the basic markup we’ll be working with:

```html
<div class="wrap">
    <a href="#" class="btn">Enable body scroll<br>(using only overscroll-behavior: none)</a>
    <a href="#" class="btn type_disable">Disable body scroll</a>

<div class="pop_wrap">
    <div class="bg">
    <div class="popup">
        <a href="#" class="close"><img src="images/close.png" alt="닫기"></a>
        <div class="popup_con">
            Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content<br>Content
        
    

```

* `.btn` triggers the popup.
* `.type_disable` disables background scrolling.
* `.pop_wrap` is the modal wrapper.
* `.popup` contains the content you want scrollable.

<br>

## CSS Styling

Next, we’ll set up the layout and scroll behavior. Here's the CSS:

```css
.wrap {
    min-height: 200vh;
    padding: 30px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 30px;
}

/* Prevent background scroll */
.disable_scroll {
    overflow: hidden;
    width: 100%;
    height: 100%;
    touch-action: none;
}

/* Button styles */
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 200px;
    background: #8ab4f8;
    font-size: 16px;
    color: #000;
    text-decoration: none;
    word-break: keep-all;
}

/* Popup container */
.pop_wrap {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
}

/* Popup background overlay */
.pop_wrap .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;
}

/* Popup box */
.popup {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 280px;
    height: 280px;
    max-width: 90vw;
    max-height: 90vh;
    background: #fff;
    z-index: 2;
    transform: translate(-50%, -50%);
}

/* Close button */
.popup .close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 17px;
    height: 17px;
}

/* Close button image */
.popup .close img {
    width: 100%;
    height: 100%;
}

/* Scrollable popup content */
.popup .popup_con {
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 15px;
    font-size: 16px;
    line-height: 24px;
    color: #000;
    overscroll-behavior: none;
}
```

### What’s happening here?

* `.popup_con` scrolls on its own without affecting the page behind it.
* `.disable_scroll` locks the background by removing all scroll and touch interaction.
* `overscroll-behavior: none` stops scroll chaining to parent elements.

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

## jQuery for Interaction

Here’s the jQuery to control opening and closing the popup:

```javascript
$(document).ready(function () {
    popup();
});

function popup() {
    // Open popup when a button is clicked
    $('.btn').on('click', function (e) {
        e.preventDefault();
        $('.pop_wrap').fadeIn(300);
        if ($(this).hasClass('type_disable')) {
            // Optional: Disable background scroll when popup opens
            $("body").addClass('disable_scroll');
        }
    });

    // Close popup when clicking on background or close button
    $('.pop_wrap .bg, .pop_wrap .close').on('click', function (e) {
        e.preventDefault();
        $('.pop_wrap').fadeOut(100);
        // Optional: Re-enable background scroll when popup closes
        $("body").removeClass('disable_scroll');
    });
}
```

* Clicking the button fades in the popup.
* If it’s the `.type_disable` button, the body scroll is locked.
* Clicking the background or close button fades the popup out and restores scrolling.

<br>

## Why Use `.disable_scroll`?

Applying the `.disable_scroll` class to the `<body>` has a few key benefits:

* **Completely locks the page** while the popup is open.
* **Disables touch gestures** on mobile (thanks to `touch-action: none`).
* **Keeps the viewport steady**, avoiding jumps or unintended scrolls.

<br>

## Compare: `overscroll-behavior` vs `.disable_scroll`

| **Feature**                            | **`overscroll-behavior: none`**                            | **`.disable_scroll`**                                             |
| -------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Stops scroll chaining to background    | ✅ Yes — background won’t scroll when reaching popup limits | ✅ Yes — completely prevents scroll from bubbling to body          |
| Blocks all interaction with background | ❌ No — user can still tap or scroll outside the popup      | ✅ Yes — background is locked, no interaction is possible          |
| Optimized for touch gestures           | ✅ Yes — allows smooth, native-like scroll inside popup     | ❌ No — disables all touch input for background (including scroll) |

<br>

## Conclusion

If your goal is to keep scrolling limited to a popup area while allowing the page underneath to stay intact, `overscroll-behavior` is a clean solution. But if you want to fully lock down the background—especially on mobile—then applying `.disable_scroll` to the body is the way to go.

Think of them as two levels of control:

* **Light touch?** Use `overscroll-behavior`.
* **Full lock?** Use `.disable_scroll`.

Choose based on the kind of user experience you’re designing for. And if you’ve got tips or use cases of your own, feel free to share!

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2023-03-13-popup-scroll/">Live Example Preview</a>
</div>



