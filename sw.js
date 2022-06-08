const version = 'gru-su-1.19';
const coreID = version + '_core';
var cacheIDs = [coreID];

self.addEventListener('activate', function (event) {
	event.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.filter(function (key) {
			return !cacheIDs.includes(key);
		}).map(function (key) {
			return caches.delete(key);
		}));
	}).then(function () {
		return self.clients.claim();
	}));
});

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(coreID).then(cache => cache.addAll([
      'index.html',
      'index.js',
      'style.css',
      'images/logo.png',
      'images/logo.svg',
      'icon/fox-icon.png',
      'gruppen.js'
    ]))
  )
})

self.addEventListener('fetch', e => {
  console.log({request: e.request, version: version});
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request)).catch(() => fetch(e.request))
  )
})
