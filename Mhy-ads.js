// 隐藏网页端广告元素
const mhyAdCleaner = () => {
  // 移除横幅广告
  document.querySelectorAll('.mhy-banner-ad, .ads-box, [class*="-ad"]').forEach(ad => ad.remove());
  
  // 屏蔽弹窗广告
  const popupAds = document.querySelectorAll('.popup-ad, .modal-mask');
  popupAds.forEach(popup => popup.style.display = 'none');

  // 动态广告监控（针对Ajax加载内容）
  new MutationObserver((mutations) => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        if (node.nodeType === 1 && 
            (node.matches('.ad-unit') || node.innerHTML.includes('广告'))) {
          node.remove();
        }
      });
    });
  }).observe(document.body, { subtree: true, childList: true });
};

if (document.readyState === 'complete') mhyAdCleaner();
else window.addEventListener('load', mhyAdCleaner);