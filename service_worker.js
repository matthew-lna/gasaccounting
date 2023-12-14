// NAME OF CACHE
var CACHE_NAME = 'myadmin_files_cache';
// ARRAY OF URLS TO CACHE
var urlsToCache = [
    '/'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            //console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});