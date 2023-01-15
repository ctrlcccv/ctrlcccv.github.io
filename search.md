---
image: /assets/img/blog/hydejack-9.jpg
description: >
  A boutique Jekyll theme for hackers, nerds, and academics,
  with a focus on personal sites that are meant to impress.
hide_description: true
---

<div id="search-demo-container">
  <input type="search" id="search-input" placeholder="search...">
  <ul id="results-container"></ul>
</div>


 <script src="/simple-jekyll-search.js"></script>

<script>
  window.simpleJekyllSearch = new SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}?query={query}" title="{desc}"><strong class="tit">{title}</strong><span class="date">{date}</span></a></li>',
    noResultsText: '검색 결과가 없습니다.',
    limit: 10,
    fuzzy: false,
    exclude: ['Welcome']
  })
</script>

