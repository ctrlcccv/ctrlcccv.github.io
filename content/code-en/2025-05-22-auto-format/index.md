---
title: >  
    How to Build Custom Input Auto Format with jQuery

description: >  
    Learn how to automatically apply hyphens or other separators to input fields using jQuery. Format phone numbers, card numbers, dates, and more with ease.

slug: 2025-05-22-auto-format
date: 2025-05-22 00:00:00+0000
lastmod: 2025-05-22 00:00:00+0000
    
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/2025-05-22-auto-format-en.webp

categories:
    - jQuery
tags:
    - Input
---

Tired of typing hyphens manually every time you enter a phone number or credit card?

Manually adding separators like hyphens or slashes can be frustrating, especially when filling out forms on websites or apps. With data like phone numbers, card numbers, or dates, automatically applying these separators can save time, reduce errors, and improve data accuracy. This post will show you how to implement automatic formatting for various input fields using jQuery.

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

## HTML Structure

```html
<div class="input_container">
    <h2>Automatic Format Inputs</h2>
    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" placeholder="000-0000-0000" data-format="xxx-xxxx-xxxx">
    <label for="date">Date of Birth:</label>
    <input type="text" id="date" placeholder="YYYY/MM/DD" data-format="xxxx/xx/xx">
    <label for="card">Card Number:</label>
    <input type="text" id="card" placeholder="0000-0000-0000-0000" data-format="xxxx-xxxx-xxxx-xxxx">
</div>
```

* **Custom Data Attributes**  
<span class="txt">
Use the `data-format` attribute to define your input format. Each 'x' stands for a digit, while other characters (like hyphens or slashes) act as fixed separators.
</span>

* **Support for Various Formats**  
<span class="txt">
Handle multiple formats like phone numbers, dates, and card numbers with a single code implementation.  
Developers can freely customize formats according to their needs.
</span>

* **Intuitive Placeholders**  
<span class="txt">
Use the `placeholder` attribute to give users a preview of the expected format.  
This helps users understand how their input will be displayed.
</span>

<br>

## CSS Styling

```css
.input_container {
    margin: 20px auto;
    width: 350px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.input_container h2 {
    margin-bottom: 15px;
    color: #333;
}
.input_container input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 15px;
}
.input_container label {
    display: block;
    margin-bottom: 5px;
    color: #666;
}
```

* **Clean Input Form Design**  
<span class="txt">
The entire input form has a white background and soft shadow for visual depth.  
Rounded corners and appropriate spacing create a user-friendly design.
</span>

* **Input Field Styling**  
<span class="txt">
Input fields are designed with proper padding and size for easy clicking and input.  
Font size and color are adjusted for readability to enhance user input convenience.
</span>

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

## jQuery Code

```js
// Find all input fields with specified format
function autoFormat(){
    $('input[data-format]').each(function() {
        // Set maximum length
        const format = $(this).data('format');
        $(this).attr('maxlength', format.length);
        
        // Add input event listener
        $(this).on('input', function(e) {
            const $input = $(this);
            const format = $input.data('format');
            
            // Extract numbers only
            let numbers = $input.val().replace(/[^0-9]/g, '');
            
            // Transform according to format
            let result = '';
            let numberIndex = 0;
            
            for (let i = 0; i < format.length && numberIndex < numbers.length; i++) {
                if (format[i] === 'x') {
                    // Insert number at x position
                    result += numbers[numberIndex++];
                } else {
                    // Maintain separators
                    result += format[i];
                    
                    // Continue if next character is x and numbers remain
                    if (i + 1 < format.length && format[i + 1] === 'x' && numberIndex < numbers.length) {
                        continue;
                    }
                }
            }
            
            // Handle case where last character is a separator (for backspace deletion)
            if (result.length > 0 && !/[0-9]/.test(result[result.length - 1])) {
                if (e.originalEvent.inputType === 'deleteContentBackward') {
                    result = result.substring(0, result.length - 1);
                }
            }
 
            $input.val(result);
        });
    });
}

$(document).ready(function() {
    autoFormat();
});
```

* **Auto Format Initialization**  
<span class="txt">
The `autoFormat()` function is called on page load to apply auto-formatting to all input fields with the `data-format` attribute.
Uses the `input[data-format]` selector to process all target elements at once.
</span>

* **Automatic Maximum Length Setting**  
<span class="txt">
Each input field's maximum length is automatically set based on the format string length.  
This prevents users from entering more characters than the format allows.
</span>

* **Input Event Handling**  
<span class="txt">
The `input` event triggers whenever the user types a key, and the format is applied in real-time.  
This approach updates the input field in real time as users type.
</span>

* **Number Extraction and Format Application**  
<span class="txt">
The regex `replace(/[^0-9]/g, '')` extracts only numbers from the input value.  
These numbers are then placed according to the specified format, with separators (hyphens, slashes, etc.) inserted at appropriate positions.
</span>

* **Backspace Handling**  
<span class="txt">
When a user deletes characters using backspace, the code handles cases where the last character is a separator, removing it as well.
This makes it easier for users when deleting characters.
</span>

<br>

## Implementation Examples

### Supporting Various Formats

This code easily supports various formats. You can add formats like these as needed:

```html
<!-- Business Registration Number -->
<input type="text" placeholder="000-00-00000" data-format="xxx-xx-xxxxx">

<!-- IP Address -->
<input type="text" placeholder="000.000.000.000" data-format="xxx.xxx.xxx.xxx">
```

### Extending the Custom Format Function

You can extend the function to add additional validation or formatting for specific input fields:

```js
// Apply additional functionality to field with specific ID
$('#card').on('blur', function() {
    const cardNumber = $(this).val().replace(/[^0-9]/g, '');
    // Add card number validation logic
    if (cardNumber.length < 16) {
        alert('Please enter a valid card number.');
    }
});
```

📝 **Note**: When dealing with sensitive information (e.g., credit card numbers, SSNs), be cautious about handling it on the client side. Always validate such inputs securely on the server in production environments.

<br>

## Conclusion

In this post, we explored how to automatically apply separators to various formatted inputs like phone numbers, dates, and card numbers using jQuery. This implementation is maintenance-friendly as a single function supports multiple formats, and developer-friendly as the desired format can be specified through the `data-format` attribute in HTML markup.

Try applying this code to your projects and feel free to customize it further! If you have any improvements or alternative approaches, share them in the comments below. Your feedback helps create better code. 😊

<br>

<div class="btn_wrap">
    <a href="https://ctrlcccv.github.io/ctrlcccv-demo/2025-05-21-auto-format/">Live Example Preview</a>
</div> 