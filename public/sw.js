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
  

  self.addEventListener("sync", (event) => {
    console.log('antes del tag');
    if (event.tag === "post-data") {
      console.log('dentro del tag');
      event.waitUntil(sendOutboxMessages());
    }
  });
 
  const sendOutboxMessages = () => {
    console.log("sendOutboxMessages");
    apiPostSupa();
  }

  function apiPostSupa() {

    
    const requestOptions = {
        method: 'POST',
        headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmY3F5ZmlwbmhsYnJmYmVwdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NDY5MzIsImV4cCI6MjAzNTUyMjkzMn0.ulqAGI6irj8n9ONM28BbNpvVlic0iPSt5m3rcbyogO0',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmY3F5ZmlwbmhsYnJmYmVwdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5NDY5MzIsImV4cCI6MjAzNTUyMjkzMn0.ulqAGI6irj8n9ONM28BbNpvVlic0iPSt5m3rcbyogO0',
            'Content-Type':'application/json',
            'Prefer':'return=minimal'
         },
         body: JSON.stringify({ name: 'registro apenas se tiene internet' })
    };
    fetch('https://cfcqyfipnhlbrfbeptqx.supabase.co/rest/v1/products',requestOptions)
    .then(response => response.status)
        .then(data => console.log('apiPostSupa', data))
        .catch( error => console.error ); 
        console.log('informacion enviada')
 
}