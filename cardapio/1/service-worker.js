self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('site-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/style.css',
          '/script.js'
        ]);
      })
    );
  });
  
