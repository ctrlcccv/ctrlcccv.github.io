---
title: 파이썬 - Selenium을 사용하여 검색 결과 가져오기
description: >  
    Python과 Selenium을 사용하여 Google에서 검색 결과를 가져오는 방법
slug: 2023-09-06-scraping
date: 2023-09-06 00:00:00+0000
lastmod: 2023-09-06 00:00:00+0000
# image: https://media.githubusercontent.com/media/ctrlcccv/ctrlcccv.github.io/master/assets/img/post/mouse-position.webp

categories:
    - Python
tags:
    - Selenium
---
Selenium은 웹 애플리케이션 테스트를 자동화하고 웹 스크래핑을 수행하는 데 사용되는 강력한 Python 라이브러리입니다.   
Python과 Selenium을 사용하여 Google에서 검색 결과를 가져오는 방법을 예제와 함께 설명하겠습니다.  
웹 스크래핑은 웹 사이트에서 정보를 추출하고 분석하는 데 매우 유용하며, Python과 Selenium을 통해 자동화할 수 있습니다.  


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

## Selenium 라이브러리 설치
Selenium 라이브러리를 설치해야 합니다.   
터미널 또는 명령 프롬프트에서 다음 명령을 실행하여 Selenium을 설치하세요.  

```python
pip install selenium
```

## 필요한 라이브러리 및 드라이버 설정
필요한 라이브러리를 가져오고 Chrome 브라우저를 사용하기 위한 설정을 합니다.  
webdriver 모듈은 Selenium의 핵심 모듈입니다. 이를 사용하여 브라우저를 제어합니다.  
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=chrome_options)
```

## Google 웹페이지로 이동
Chrome 브라우저를 열고 Google 웹페이지로 이동합니다.
```python
driver.get("https://www.google.com")
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

## 검색어 입력
Google 검색창을 찾아 검색어를 입력하고 검색을 실행합니다.
```python
search_box = driver.find_element(By.CLASS_NAME, 'gLFyf')
search_box.send_keys("Python Selenium 예제")
search_box.send_keys(Keys.RETURN)
```
* find_element 메서드를 사용하여 검색창을 찾습니다.
* send_keys 메서드를 사용하여 검색어를 입력합니다.
* Keys.RETURN을 사용하여 Enter 키를 눌러 검색을 실행합니다.

## 검색 결과 대기
검색 결과가 나타날 때까지 기다립니다.
```python
wait = WebDriverWait(driver, 10)
results = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.tF2Cxc')))
```
WebDriverWait를 사용하여 특정 조건이 충족될 때까지 대기합니다. (최대 10초)  
여기서는 CSS 선택자 .tF2Cxc를 사용하여 검색 결과가 로드될 때까지 대기합니다.

## 검색 결과 출력
검색 결과를 가져와서 제목과 링크를 출력합니다.
```python
for result in results:
    title = result.find_element(By.CSS_SELECTOR, ".LC20lb").text
    link = result.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
    print(f"제목: {title}")
    print(f"링크: {link}")
```
검색 결과는 여러 요소로 구성되어 있으며, 각 요소에서 제목과 링크를 추출합니다.  

## 브라우저 종료
작업이 완료되면 Chrome 브라우저를 종료합니다.
```python
driver.quit()
```

## 전체 코드
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 브라우저 꺼짐 방지 옵션
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=chrome_options)

# 웹페이지 해당 주소 이동
driver.get("https://www.google.com")

# 검색 입력란 찾기
search_box = driver.find_element(By.CLASS_NAME, 'gLFyf')

# 검색어 입력
search_box.send_keys("Python Selenium 예제")

# 검색 실행 (Enter 키 누르기)
search_box.send_keys(Keys.RETURN)

# 검색 결과가 나타날 때까지 기다림
wait = WebDriverWait(driver, 10)
results = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.tF2Cxc')))

# 검색 결과 출력
for result in results:
    title = result.find_element(By.CSS_SELECTOR, ".LC20lb").text
    link = result.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
    print(f"제목: {title}")
    print(f"링크: {link}")

# 브라우저 종료
driver.quit()
```
Python과 Selenium을 사용하여 Google 검색 결과를 가져오는 방법을 예제를 통해 자세히 설명했습니다.   

Selenium은 웹 스크래핑과 웹 테스트를 자동화하는 데 강력한 도구입니다.   
이 예제를 기반으로 스크래핑 프로젝트나 웹 테스트 자동화를 시작할 수 있습니다.   
필요한 경우 코드를 수정하여 다른 웹사이트에서 데이터를 수집하거나 웹 애플리케이션을 테스트할 수 있습니다.  
<br>

> 참고 자료
> * [Selenium 공식 문서](https://www.selenium.dev/documentation/)
