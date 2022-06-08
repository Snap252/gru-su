self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('gru-su').then(cache => cache.addAll([
      'index.html',
      'index.js',
      'style.css',
      'images/fox1.jpg',
      'images/fox2.jpg',
      'images/fox3.jpg',
      'images/fox4.jpg',
      'images/logo.png',
      'icon/fox-icon.png',
      'gruppen.js'
    ]))
  )
})

self.addEventListener('fetch', e => {
  console.log({request: e.request, v: 11});
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request)).catch(() => fetch(e.request))
  )
})
