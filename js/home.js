"use strict";!function(e){e(function(){e(".ganban-studio-slide").slick({infinite:!0,dots:!1,arrows:!0,autoplay:!1,centerMode:!0,centerPadding:"15%",responsive:[{breakpoint:768,settings:{centerPadding:"20px"}}]})})}(jQuery);var _lpFlowThreshold=100,_lpFlowScroll=function(){var e=document.scrollingElement&&document.scrollingElement.scrollTop||window.pageYOffset||document.documentElement.scrollTop||0,l=_lpFlowThreshold<e,e=document.querySelectorAll(".lp-flow");e.length&&e.forEach(function(e){return e.classList.toggle("show",l)})};window.addEventListener("load",_lpFlowScroll,!1),window.addEventListener("scroll",_lpFlowScroll,{passive:!0});

document.addEventListener('DOMContentLoaded', function() {
  /* ===================================================
     フッター表示中は追従バーを隠す処理
     =================================================== */
  const footer = document.querySelector('footer');
  const stickyNav = document.getElementById('sticky-footer-nav');

  if (footer && stickyNav) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stickyNav.classList.add('is-hidden');
        } else {
          stickyNav.classList.remove('is-hidden');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(footer);
  }

  /* ===================================================
     スクロールアニメーション（Fade Up）
     =================================================== */
  const animatedElements = document.querySelectorAll('.anm');
  
  if (animatedElements.length === 0) return;
  
  // 初期状態で既に画面内にある要素を即座に表示
  const checkInitialVisibility = () => {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // 要素が画面の90%以内にある場合は即座に表示
      if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
        element.classList.add('is-show');
      }
    });
  };
  
  // ページ読み込み時に実行
  checkInitialVisibility();
  
  // Intersection Observerのオプション
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // 要素が画面の90%の位置に来たら発火
    threshold: 0.1
  };
  
  // Intersection Observerのコールバック
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
        // 一度表示されたら監視を停止（パフォーマンス向上）
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Intersection Observerのインスタンスを作成
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // 各要素を監視対象に追加（まだ表示されていない要素のみ）
  animatedElements.forEach(element => {
    if (!element.classList.contains('is-show')) {
      observer.observe(element);
    }
  });
  
  // リサイズ時にも再チェック
  window.addEventListener('resize', checkInitialVisibility);
  
  // ページ読み込み完了時にも再チェック（画像読み込み後など）
  window.addEventListener('load', () => {
    checkInitialVisibility();
    // まだ表示されていない要素を再度監視対象に追加
    animatedElements.forEach(element => {
      if (!element.classList.contains('is-show')) {
        observer.observe(element);
      }
    });
  });
});
//# sourceMappingURL=maps/home.js.map
