self.addEventListener('install', (event) => {
    console.log('Service Worker Instalado');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker Ativado');
});

// Cacheando arquivos para funcionamento offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
