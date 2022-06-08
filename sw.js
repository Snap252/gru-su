self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('gru-su-1.14').then(cache => cache.addAll([
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
  console.log({request: e.request, v: 14});
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request)).catch(() => fetch(e.request))
  )
})
