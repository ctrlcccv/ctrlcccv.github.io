// 광고 차단 회복 스크립트
(function() {
  // FundingChoicesMessages 초기화
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://fundingchoicesmessages.google.com/i/pub-8535540836842352?ers=1';
  document.head.appendChild(script);

  // 광고 차단 감지 및 메시지 설정
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }
  
  signalGooglefcPresent();

  // 메인 광고 차단 회복 코드
  window.__h82AlnkH6D91__ = function() {
    var args = Array.prototype.slice.call(arguments);
    var encoded = window.btoa("pub-8535540836842352");
    
    // 이전에 초기화된 경우 종료
    if (window[encoded]) {
      return;
    }
    
    // 광고 차단 감지 및 메시지 표시
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fundingchoicesmessages.google.com/el/AGSKWxUUAXDYczeq3hsXC9PwG0JZAiZta-m9l54cmhKZ-OQWB6s9uDPAJZogseN6KOOwKavvgl44eIV7_al1E4MM8zNsdA==", true);
    xhr.send();
  };

  // 자동 실행
  window.__h82AlnkH6D91__("WyJwdWItODUzNTU0MDgzNjg0MjM1MiIsW251bGwsbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9iL3B1Yi04NTM1NTQwODM2ODQyMzUyIl0sbnVsbCxudWxsLCJodHRwczovL2Z1bmRpbmdjaG9pY2VzbWVzc2FnZXMuZ29vZ2xlLmNvbS9lbC9BR1NLV3hVVUFYRFljemVxM2hzWEM5UHdHMEpaQWladGEtbTlsNTRjbWhLWi1PUVdCNnM5dURQQUpab2dzZU42S09Pd0thdnZnbDQ0ZUlWN19hbDFFNE1NOHpOc2RBXHUwMDNkXHUwMDNkP3RlXHUwMDNkVE9LRU5fRVhQT1NFRCIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFdZYkhhbHNqcG01akdFaFg4U3l4Ty1fRVh5MUlGTEhKUXFTTGw2cXFIbC1yM3N6M1pyRlVIM1VjeXRjZ1gyN3hLSDVzWnNzTWwzd0pwYzhvRVotUEJzZWdcdTAwM2RcdTAwM2Q/YWJcdTAwM2QxXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFdJTjdaWVViMG9pdEVtOWMwUGNsMU5FQWU2dmpnRl85SVRBZFFJblR5TUwtQzZDN0lUS3RYZmVwUTFYTUh2UXhuQzV2QXNCX2NLTkNLS3UyRnU0WXZnWHdcdTAwM2RcdTAwM2Q/YWJcdTAwM2QyXHUwMDI2c2JmXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2VsL0FHU0tXeFVST2xKSkZsOU1kUmFXWjV5ZmlNM3VTY3l0LVFzakNmVDZVNXROdUpsMTJNY0Jna1MteXhpWDJLWVh5YTNRUkJqb09QTU92cElYRWNNWXNXTEotbGQ3NEFcdTAwM2RcdTAwM2Q/c2JmXHUwMDNkMiIsImRpdi1ncHQtYWQiLDIwLDEwMCwiY0hWaUxUZzFNelUxTkRBNE16WTROREl6TlRJXHUwMDNkIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vd3d3LmdzdGF0aWMuY29tLzBlbW4vZi9wL3B1Yi04NTM1NTQwODM2ODQyMzUyLmpzP3VzcXBcdTAwM2RDQkkiXSwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vZWwvQUdTS1d4VTYzc2NjOEJhNUhON2ZqaWJXdDhfUXhGakp5MElVcEFqdmd4Y1JkdlpjeWRsOHk3cjVuV0lKUW5menpOZnNGUi1VbllPMUxEdlpJeE12WGFlSzRzeGpjZ1x1MDAzZFx1MDAzZCJd");
})(); 