---
title: 파이썬 단축키 만들기 (pynput 활용)
description: >  
    파이썬으로 pynput 라이브러리를 활용하여 단축키 리스너를 만드는 방법입니다. 다양한 키보드 이벤트 리스너의 설명과 예제입니다.
slug: 2023-09-20-shortcuts
date: 2023-09-20 00:00:00+0000
lastmod: 2023-09-20 00:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/mouse-position.webp

categories:
    - Python
tags:
    - pynput
---
파이썬 라이브러리인 pynput을 활용하여 키보드 이벤트를 감지하고, 특정 단축키를 눌렀을 때와 놓았을 때 실행되는 함수를 만드는 방법입니다.


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

## pynput 라이브러리 소개
pynput은 파이썬으로 키보드와 마우스 이벤트를 감지하고 제어할 수 있는 라이브러리입니다.   
이 글에서는 주로 키보드 이벤트를 다룰 것입니다.   
pynput을 활용하면 사용자가 특정 키를 누를 때나 놓을 때 원하는 동작을 수행하는 프로그램을 만들 수 있습니다.  
<br>

## 코드 설명
아래는 pynput을 사용한 키보드 리스너 코드의 설명입니다.  

```python
from pynput import keyboard

# 단축키를 눌렀을 때 실행될 함수
def on_press(key):
    try:
        if key == keyboard.Key.ctrl_l:  # 왼쪽 Ctrl 키를 눌렀을 때
            print("Ctrl 키가 눌렸습니다.")
        elif key == keyboard.Key.alt_l:  # 왼쪽 Alt 키를 눌렀을 때
            print("Alt 키가 눌렸습니다.")
        elif key == keyboard.KeyCode.from_char('a'):  # 'a' 키를 눌렀을 때
            print("'a' 키가 눌렸습니다.")
    except AttributeError:
        pass

# 단축키를 놓았을 때 실행될 함수
def on_release(key):
    if key == keyboard.Key.ctrl_l:  # 왼쪽 Ctrl 키를 놓았을 때
        print("Ctrl 키가 놓아졌습니다.")
    elif key == keyboard.Key.alt_l:  # 왼쪽 Alt 키를 놓았을 때
        print("Alt 키가 놓아졌습니다.")
    elif key == keyboard.KeyCode.from_char('a'):  # 'a' 키를 놓았을 때
        print("'a' 키가 놓아졌습니다.")
```
on_press 함수는 사용자가 특정 키를 눌렀을 때 실행되며, on_release 함수는 사용자가 특정 키를 놓았을 때 실행됩니다.  
* keyboard.Key.ctrl_l : 왼쪽 Ctrl 키를 나타내는 상수입니다.
* keyboard.Key.alt_l : 왼쪽 Alt 키를 나타내는 상수입니다. 
* keyboard.KeyCode.from_char('a') : 'a' 키를 나타내는 상수입니다.  
<br>

## 키보드 리스너 생성
```python
# 키보드 리스너 생성
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
```
Listener 클래스는 on_press와 on_release 함수를 사용하여 키보드 이벤트를 감지하고, 사용자가 정의한 동작을 실행합니다. listener.join()은 리스너를 시작하고 계속해서 키보드 입력을 감지하는 역할을 합니다.  


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

## 전체 코드
```python
from pynput import keyboard

# 단축키를 눌렀을 때 실행될 함수
def on_press(key):
    try:
        if key == keyboard.Key.ctrl_l:  # 왼쪽 Ctrl 키를 눌렀을 때
            print("Ctrl 키가 눌렸습니다.")
        elif key == keyboard.Key.alt_l:  # 왼쪽 Alt 키를 눌렀을 때
            print("Alt 키가 눌렸습니다.")
        elif key == keyboard.KeyCode.from_char('a'):  # 'a' 키를 눌렀을 때
            print("'a' 키가 눌렸습니다.")
    except AttributeError:
        pass

# 단축키를 놓았을 때 실행될 함수
def on_release(key):
    if key == keyboard.Key.ctrl_l:  # 왼쪽 Ctrl 키를 놓았을 때
        print("Ctrl 키가 놓아졌습니다.")
    elif key == keyboard.Key.alt_l:  # 왼쪽 Alt 키를 놓았을 때
        print("Alt 키가 놓아졌습니다.")
    elif key == keyboard.KeyCode.from_char('a'):  # 'a' 키를 놓았을 때
        print("'a' 키가 놓아졌습니다.")

# 키보드 리스너 생성
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
```

## 다양한 키보드 이벤트 리스너
pynput에서 제공하는 다양한 키보드 이벤트 리스너에 대한 설명과 예제입니다.  
<br>

### keyboard.Listener
키보드 이벤트를 감지하는 가장 기본적인 리스너입니다. on_press와 on_release 두 가지 콜백 함수를 설정하여 사용자가 키를 누를 때와 놓을 때 원하는 동작을 실행할 수 있습니다.

```python
from pynput import keyboard

def on_press(key):
    print(f"Key {key} pressed")

def on_release(key):
    print(f"Key {key} released")

with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
```
### keyboard.GlobalListener
모든 키보드 이벤트를 감지하는 리스너로, 현재 포커스된 윈도우나 애플리케이션과 관계없이 모든 키보드 이벤트를 감지할 수 있습니다.

```python
from pynput import keyboard

def on_key(key):
    print(f"Key {key} pressed")

with keyboard.GlobalListener(on_key=on_key) as listener:
    listener.join()
```

### keyboard.Listener.for_events(events)
이 메서드를 사용하여 특정 키보드 이벤트를 필터링하여 원하는 이벤트만 처리할 수 있습니다. events 매개변수에 필터링할 이벤트를 지정합니다.

```python
from pynput import keyboard

def on_event(event):
    if event.key == keyboard.Key.space:
        print("Space key pressed")

with keyboard.Listener.for_events([keyboard.Key.space], on_event=on_event) as listener:
    listener.join()
```

### keyboard.Listener.for_hook(hook_manager)
키보드 이벤트 후킹(hooking)을 활용하여 모든 키보드 이벤트를 감지합니다. 이 방법은 다른 응용 프로그램의 입력을 가로채기 위해 사용될 수 있습니다.

```python
from pynput import keyboard

def on_key(key):
    print(f"Key {key} pressed")

with keyboard.Listener.for_hook(on_key=on_key) as listener:
    listener.join()
```

### keyboard.Listener.for_canonical()
키보드 이벤트를 "canonical" 형식으로 감지하며, 키보드 레이아웃에 관계없이 키를 식별할 수 있습니다.

```python
from pynput import keyboard

def on_key(key):
    print(f"Canonical Key {key} pressed")

with keyboard.Listener.for_canonical(on_key=on_key) as listener:
    listener.join()
```

### keyboard.Listener.for_mac()
macOS에서 특정 이벤트를 처리하기 위한 메서드로, macOS의 특정 기능과 관련된 이벤트를 처리할 수 있습니다.

```python
from pynput import keyboard

def on_event(event):
    if event.key == keyboard.Key.ctrl_r:
        print("Right Control key pressed on macOS")

with keyboard.Listener.for_mac(on_event=on_event) as listener:
    listener.join()
```

## 결론
pynput 라이브러리를 사용하면 파이썬으로 키보드 이벤트를 쉽게 감지하고 처리할 수 있습니다.   
단축키를 감지하여 사용자 지정 동작을 수행하는 예제를 통해 구체적으로 살펴보았습니다.   
이를 응용하여 다양한 키보드 이벤트를 감지하고 활용할 수 있으며, 자동화 및 사용자 경험 개선과 같은 다양한 목적을 달성할 수 있습니다.  
<br>

> [pynput 라이브러리의 공식 문서](https://pynput.readthedocs.io/en/latest/keyboard.html)
