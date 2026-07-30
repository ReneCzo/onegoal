const CACHE_NAME = 'onegoal-v3';
const FALLBACK_PAGE = './Goalcounter.html';
const ASSETS = [
  './',
  FALLBACK_PAGE,
  './css/style.css',
  './js/app.js',
  './manifest.webmanifest',
  './assets/apple-touch-icon.png',
  './assets/pwa-icon.svg',
  './assets/Unicorns.PNG'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
      .then(() => self.clients.matchAll({includeUncontrolled: false, type: 'window'}))
      .then(clients => clients.forEach(c => c.postMessage({type: 'SW_UPDATED'})))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const isNavigation = event.request.mode === 'navigate';

  if (isNavigation) {
    // Network-first for HTML navigation: always fetch fresh, fall back to cache
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || !response.ok) return caches.match(FALLBACK_PAGE);
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(FALLBACK_PAGE))
    );
  } else {
    // Cache-first for static assets
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(response => {
            if (!response || !response.ok) return response;
            const clone = response.clone();
            caches
              .open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone))
              .catch(err => console.warn('Cache write failed:', err));
            return response;
          })
          .catch(() => Response.error());
      })
    );
  }
});
