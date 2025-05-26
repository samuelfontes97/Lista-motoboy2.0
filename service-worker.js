const cacheName = 'entregas-cache-v3';
const filesToCache = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './fundo.png',
  './images/icon-192.png',
  './images/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});



