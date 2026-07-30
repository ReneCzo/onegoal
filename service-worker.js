const CACHE_NAME = 'onegoal-v2';
const FALLBACK_PAGE = './Goalcounter.html';
const ASSETS = [
  './',
  FALLBACK_PAGE,
  './css/style.css',
  './js/app.js',
  './manifest.webmanifest',
  './assets/apple-touch-icon.png',
  './assets/pwa-icon.svg'
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
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          if (!response || !response.ok) {
            if (isNavigation) return caches.match(FALLBACK_PAGE);
            return response;
          }
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then(cache => cache.put(event.request, clone))
            .catch(err => console.warn('Cache write failed:', err));
          return response;
        })
        .catch(() => (isNavigation ? caches.match(FALLBACK_PAGE) : Response.error()));
    })
  );
});
