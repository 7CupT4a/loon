// splash.js - 开屏广告数据重写
const modifySplash = () => {
  const originalJson = $response.body;
  try {
    let obj = JSON.parse(originalJson);
    if (obj.data && obj.data.splashAds) {
      // 强制返回空广告列表
      obj.data.splashAds = [];
      obj.data.expireTime = 0;
      // 修改版本号防止重复请求
      obj.data.configVersion = 999999; 
      $done({ body: JSON.stringify(obj) });
    } else {
      $done({});
    }
  } catch (e) {
    console.log("AcFun开屏广告拦截异常: " + e);
    $done({});
  }
};
modifySplash();