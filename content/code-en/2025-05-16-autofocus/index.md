---
title: >
    How to Auto Tab Phone Number Input with jQuery

description: >  
    Create seamless phone number input forms with jQuery by implementing automatic tabbing between fields. Improve UX on both mobile and desktop with this simple technique.

slug: 2025-05-16-autofocus
date: 2025-05-16 00:00:00+0000
lastmod: 2025-05-16 00:00:00+0000

image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-16-autofocus-en.webp

alternates:
  - title: "jQuery - 전화번호 입력 폼 자동 포커스 이동"
    href: "https://ctrlcccv.github.io/code/2025-05-14-autofocus/"
    hreflang: "ko"
  - title: "How to Auto Tab Phone Number Input with jQuery"
    href: "https://ctrlcccv.github.io/code-en/2025-05-16-autofocus/"
    hreflang: "en"
  - title: "jQuery - 전화번호 입력 폼 자동 포커스 이동"
    href: "https://ctrlcccv.github.io/code/2025-05-14-autofocus/"
    hreflang: "x-default"

categories:
    - jQuery
tags:
    - input

---
Have you ever found it frustrating to enter a phone number split across multiple input fields? Manually tapping to move from one field to the next can disrupt the flow and slow you down. A smoother experience is to have the cursor automatically jump to the next field — saving time and making form filling feel seamless.

This small UX improvement can make a big difference, especially on mobile devices where precise tapping is harder. In this tutorial, I'll show you how to implement automatic field transitions for phone number inputs using jQuery.

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

```html
<div class="phone_form">
    <h2>Phone Number</h2>
    <div class="input_container">
        <input type="tel" id="phone1" maxlength="3" class="phone_input" placeholder="123" inputmode="numeric" pattern="[0-9]*" aria-label="Area code">
        <span class="separator" aria-hidden="true">-</span>
        <input type="tel" id="phone2" maxlength="4" class="phone_input" placeholder="4567" inputmode="numeric" pattern="[0-9]*" aria-label="First part of phone number">
        <span class="separator" aria-hidden="true">-</span>
        <input type="tel" id="phone3" maxlength="4" class="phone_input" placeholder="8901" inputmode="numeric" pattern="[0-9]*" aria-label="Last part of phone number">
    

```

* **Input Fields**  
<span class="txt">
The `type="tel"` attribute brings up the numeric keypad on mobile. `maxlength` limits input length, while placeholders help guide the user.
</span>

* **Accessibility Enhancements**  
<span class="txt">
Each input has an `aria-label` so screen reader users understand its purpose. Separators are marked with `aria-hidden="true"` so they're ignored by assistive tech.
</span>

* **Input Optimization**  
<span class="txt">
Combining `inputmode="numeric"` with `pattern="[0-9]*"` helps ensure numeric-only input and improves the mobile experience.
</span>

<br>

## CSS Styling

```css
.phone_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.phone_form h2 {
    color: #333;
    margin-bottom: 10px;
}

.input_container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.phone_input {
    width: 100px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
    padding: 0 5px;
    transition: all 0.2s ease;
}

.phone_input:focus {
    border-color: #8ab4f8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(78, 67, 118, 0.2);
}

.separator {
    font-size: 20px;
    color: #666;
    margin: 0 2px;
}
```

* **Layout and Visuals**  
<span class="txt">
The form uses flex layout with clean spacing and a soft shadow for a polished look.
</span>

* **Input Field Design**  
<span class="txt">
Fields are large, centered, and easy to read. Focus state includes a color change and glow for better usability.
</span>

* **Separator Styling**  
<span class="txt">
The dashes between fields are styled for visibility but excluded from screen readers.
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

## jQuery Code – Auto Focus Behavior

```js
function inputFocus(){
    // Select all phone input fields
    const $phoneInputs = $('.phone_input');
                
    // Function to move between fields (direction: 1=next, -1=previous)
    function moveField($currentField, direction) {
        const currentIndex = $phoneInputs.index($currentField);
        const targetIndex = currentIndex + direction;
        
        // Only move within valid index range
        if(targetIndex >= 0 && targetIndex < $phoneInputs.length) {
            $phoneInputs.eq(targetIndex).focus();
        }
    }
    
    // Handle input changes
    $phoneInputs.on('input', function() {
        // Filter to allow numbers only
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Auto-move to next field when max length is reached
        if (this.value.length === this.maxLength) {
            moveField($(this), 1);
        }
    });
    
    // Keyboard event handling (details below)
    $phoneInputs.on('keydown', function(e) {
        // Detailed code explained in the next section
    });
}

$(function(){
    inputFocus();
})
```

* **Auto-Tab Logic**  
<span class="txt">
The `moveField` function calculates where the cursor should go based on the current input's index.
</span>

* **Input Validation + Auto Advance**  
<span class="txt">
On every input, non-numeric characters are stripped out. If the input reaches its maximum length, focus jumps to the next field.
</span>

<br>

## Optional: Keyboard Navigation Enhancements

To take it a step further, let's add some intuitive keyboard controls:

```js
$phoneInputs.on('keydown', function(e) {
    const key = e.key || e.keyCode;
    const $this = $(this);
    
    // Move to previous field on Backspace if field is empty
    if ((key === 'Backspace' || key === 8) && this.value.length === 0) {
        e.preventDefault();
        moveField($this, -1);
    }
    // Right Arrow to next field if cursor is at the end
    else if ((key === 'ArrowRight' || key === 39) && this.selectionStart === this.value.length) {
        e.preventDefault();
        moveField($this, 1);
    }
    // Left Arrow to previous field if cursor is at the start
    else if ((key === 'ArrowLeft' || key === 37) && this.selectionStart === 0) {
        e.preventDefault();
        moveField($this, -1);
    }
});
```

* **Backspace Navigation**  
<span class="txt">
Hitting Backspace on an empty field takes you back to the previous one—super handy for quick corrections.
</span>

* **Arrow Key Support**  
<span class="txt">
Arrow right at the end of a field moves forward, and arrow left at the beginning moves back.
</span>

* **Cursor Detection**  
<span class="txt">
We use `selectionStart` to detect cursor position, ensuring we don't interfere with normal editing.
</span>

💡 **Pro Tip**: Supporting both `key` and `keyCode` makes your code more robust across browsers, including legacy ones.

<br>

## Conclusion

This jQuery-powered auto-tab solution makes phone number entry faster and more user-friendly—especially on mobile. It's a lightweight enhancement that improves form UX with just a few lines of code.

You can apply the same logic to other types of segmented inputs too—credit card numbers, SSNs, PIN codes, and more.

Have you tried something like this before? Or have a UX annoyance you want to fix? Let's chat in the comments! 😊

<br>

<div class="btn_wrap">
    <a target="_blank" href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-14-autofocus/">Live Example Preview</a>
</div>
 
