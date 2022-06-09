const version = 'gru-su-1.25';
const coreID = version + '_core';
var cacheIDs = [coreID];

self.addEventListener('activate', event => {
	console.log({ event: event, version: version })
	event.waitUntil(
		caches.keys()
			.then(keys =>
				Promise.all(keys.filter(key => !cacheIDs.includes(key)).map(key => caches.delete(key)))
			).then(() => self.clients.claim())
	)
})

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(coreID).then(cache => cache.addAll([
			'index.js',
			'style.css',
			'images/logo.png',
			'images/logo.svg',
			'icon/fox-icon.png',
			'gruppen.js',
			'manifest.webmanifest',
			'https://code.jquery.com/jquery-3.6.0.min.js',
			'https://code.jquery.com/ui/1.13.1/jquery-ui.min.js',
			'https://code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css'
		]))
	)
	console.log({ event: event, version: version })
})

self.addEventListener('fetch', e => {
	console.log({ request: e.request, version: version });
	e.respondWith(
		caches.match(e.request).then(resp => {
			if (resp) {
				console.log({ msg: 'cache hit', url: e.request.url })
				return resp
			} else {
				return fetch(e.request).then(r => {
					console.log({ msg: 'no cache hit', url: e.request.url, netWorkResponse: r })
					return r
				})
			}
		}).catch(() => fetch(e.request))
	)
})
