(function ($) {

  $(function () {
    $('.ganban-studio-slide').slick({
      infinite: true,
      dots: false,
      arrows: true,
      autoplay: false,
      centerMode: true,
      centerPadding: '15%',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: '20px',
          },
        },
      ],
    });
  });

})(jQuery);

const _lpFlowThreshold = 100;
const _lpFlowScroll = () => {
  const y =
    (document.scrollingElement && document.scrollingElement.scrollTop) ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    0;

  const add = y > _lpFlowThreshold;
  const nodes = document.querySelectorAll('.lp-flow');
  if (!nodes.length) return;
  nodes.forEach(el => el.classList.toggle('show', add));
};

window.addEventListener('load', _lpFlowScroll, false);
window.addEventListener('scroll', _lpFlowScroll, { passive: true });

/* ===================================================
   スクロールアニメーション（Fade Up）
   =================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.anm');
  
  if (animatedElements.length === 0) return;
  
  // Intersection Observerのオプション
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -20% 0px', // 要素が画面の80%の位置に来たら発火
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
  
  // 各要素を監視対象に追加
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // ページ読み込み時に既に画面内にある要素は即座に表示
  window.addEventListener('load', () => {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.8) {
        element.classList.add('is-show');
        observer.unobserve(element);
      }
    });
  });
});