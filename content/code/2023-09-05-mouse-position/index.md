---
title: 파이썬 - 마우스 좌표 출력 프로그램 만들기 (Tkinter 활용)
description: >  
    파이썬의 Tkinter를 사용하여 간단한 마우스 좌표 출력 프로그램을 만드는 방법입니다.   
slug: 2023-09-05-mouse-position
date: 2023-09-05 00:00:00+0000
lastmod: 2023-09-05 00:00:00+0000
image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/mouse-position.webp

categories:
    - Python
tags:
    - Tkinter
---
Tkinter를 사용하여 간단한 마우스 좌표 출력 프로그램을 만드는 방법입니다.   
이 프로그램은 현재 마우스의 x와 y 좌표를 100ms마다 업데이트하여 화면에 표시합니다.   
이 프로젝트를 통해 Tkinter의 기본적인 사용법과 간단한 GUI 애플리케이션 개발 방법을 익힐 수 있습니다.   


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

## 필요한 라이브러리 가져오기
먼저, Tkinter 라이브러리를 가져와 프로그램을 개발할 준비를 합니다.  

```python
import tkinter as tk
```

## 마우스 좌표 업데이트 함수 만들기
마우스 좌표를 업데이트하는 함수를 정의합니다.   
winfo_pointerx()와 winfo_pointery() 함수를 사용하여 현재 마우스의 x와 y 좌표를 가져올 수 있습니다.   
이 함수는 100ms마다 호출되도록 설정하여 마우스의 움직임을 지속해서 감지하고 화면에 좌표를 업데이트합니다.

```python
def update_mouse_position_label():
    x, y = root.winfo_pointerx(), root.winfo_pointery()
    position_label.config(text=f"현재 좌표: x={x}, y={y}")
    root.after(100, update_mouse_position_label)
```

## Tkinter 윈도우 생성하기
Tkinter 윈도우를 생성하고 제목을 설정합니다. 또한 좌표를 표시할 레이블(Label) 위젯을 생성하고 배치합니다.

```python
root = tk.Tk()
root.title("마우스 좌표 출력 프로그램")

position_label = tk.Label(root, text="마우스 좌표:")
position_label.pack()
```

## 마우스 좌표 업데이트 시작하기
이제 앞에서 정의한 함수를 호출하여 마우스 좌표 업데이트를 시작합니다.   
이를 위해 update_mouse_position_label() 함수를 호출합니다.

```python
update_mouse_position_label()
```


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

## Tkinter 이벤트 루프 실행하기
마지막으로, Tkinter의 이벤트 루프를 실행하여 프로그램이 화면에 나타나게 합니다.   
이 루프는 사용자의 동작을 감지하고 GUI를 업데이트합니다.

```python
root.mainloop()
```

## 전체 코드

```python
def update_mouse_position_label():
    x, y = root.winfo_pointerx(), root.winfo_pointery()
    position_label.config(text=f"현재 좌표: x={x}, y={y}")
    root.after(100, update_mouse_position_label)  # 100ms마다 업데이트

root = tk.Tk()
root.title("마우스 좌표 출력 프로그램")

position_label = tk.Label(root, text="마우스 좌표:")
position_label.pack()

update_mouse_position_label()  # 좌표 업데이트 시작

root.mainloop() 
```
이렇게 간단한 코드로 마우스 좌표를 실시간으로 출력하는 프로그램을 만들어보았습니다.   
Tkinter를 활용하여 GUI 애플리케이션을 개발하는 기초를 익히는 좋은 예제입니다.     
다양한 방식으로 이 코드를 확장하거나 변형하여 여러분만의 프로그램을 개발해보세요!    
