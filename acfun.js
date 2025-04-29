// 深度清理网页广告元素
const acfunAdKiller = () => {
  // 移除顶部横幅广告
  document.querySelectorAll('.ad-banner, .ad-header, [class*="-ad"]').forEach(el => el.remove());
  
  // 屏蔽视频前贴片广告容器
  const videoAd = document.getElementById('player-container');
  if(videoAd && videoAd.innerHTML.includes('ad-content')) {
    videoAd.innerHTML = videoAd.innerHTML.replace(/<div class="ad-layer.*?<\/div>/gs, '');
  }

  // 动态广告监控（应对SPA页面）
  new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        if(node.nodeType === 1 && (
          node.matches('.ad-unit') || 
          node.innerHTML.match(/广告|Sponsored/gi)
        )) {
          node.remove();
          console.log('[ACFun AdBlock] 已移除动态广告节点');
        }
      });
    });
  }).observe(document.body, { subtree: true, childList: true });

  // 覆盖广告API请求
  if(window.XMLHttpRequest) {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      if(/\/api\/ad\//.test(url)) {
        console.log('[ACFun AdBlock] 已拦截广告API:', url);
        return this.abort();
      }
      originalOpen.apply(this, arguments);
    };
  }
};

// 执行时机优化
if(document.readyState === 'interactive') acfunAdKiller();
document.addEventListener('DOMContentLoaded', acfunAdKiller);