const CACHE = 'homeplus-v2';
const FILES = [
  '/homeplus-report/homeplus_md_report_v4.html',
  '/homeplus-report/homeplus_supershop_form.html',
  '/homeplus-report/homeplus_investment_form.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});