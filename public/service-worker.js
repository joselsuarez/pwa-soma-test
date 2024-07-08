const installEvent = () => {
    self.addEventListener('install', () => {
      console.log('service worker installed');
    });
  };
  installEvent();
  
  const activateEvent = () => {
    self.addEventListener('activate', () => {
      console.log('service worker activated');
    });
  };
  activateEvent();

 


  const installPromp = () => {
    console.log('antes beforeinstallprompt');
    self.addEventListener('beforeinstallprompt', e => {
      e.prompt();
      console.log('beforeinstallprompt');
    });
  };
  installPromp();
  
  
  
  const cacheName = 'v2';


  
  const cacheClone = async (e) => {
    const res = await fetch(e.request);
    const resClone = res.clone();
  
    const cache = await caches.open(cacheName);
    await cache.put(e.request, resClone);
    return res;
  };
  
