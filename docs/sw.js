const version = 'gru-su-3.0.22';
const coreID = version + '_core';

self.addEventListener('activate',
    /**
     *
     * @param {ExtendableEvent} event
     */
    event => {
        console.log({event, version})
        event.waitUntil(
            caches.keys().then(keys =>
                Promise.all(
                    keys
                        .filter(key => key !== coreID)
                        .map(key => caches.delete(key).then(deleted => console.log({deleted, key})))
                )
            ).then(() => self.clients.claim())
        )
    })

self.addEventListener('install',
    /**
     *
     * @param {ExtendableEvent} event
     */
    event => {
        event.waitUntil(
            caches.open(coreID).then(cache => cache.addAll([
                'index.js',
                'style.css',
                'images/logo.svg',
                'gruppen.js',
                'manifest/manifest.webmanifest',
                'https://code.jquery.com/jquery-3.6.0.min.js',
                'https://code.jquery.com/ui/1.13.1/jquery-ui.min.js',
                'https://code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css'
            ])).then(() => self.skipWaiting())
        )
        console.log({event: event, version: version})
    })

self.addEventListener('fetch',
    /**
     *
     * @param {FetchEvent} e
     */
    e => {
        const request = e.request;
        console.log({request, version});
        const url = request.url;
        e.respondWith(
            caches.open(coreID).then(cache =>
                cache.match(request).then(resp => {
                    if (resp) {
                        console.log({msg: 'cache hit', url})
                        return resp
                    }
                    return fetch(request).then(networkResponse => {
                        console.log({msg: 'no cache hit', url, networkResponse})
                        return cache.put(request, networkResponse).then(() => networkResponse);
                    })
                })
            )
        )
    })
