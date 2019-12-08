var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    // HTML Pages
    '/',

    // Javascript Files
    '/public/js/appCharts.js',
    '/public/js/darkMode.js',
    '/public/js/getTalks.js',
    '/public/js/index.js',
    '/public/js/paintTalkCards.js',
    '/public/js/paintTalkTable.js',
    '/public/js/schedule.js',
    '/public/js/tableSorting.js',
    '/public/js/tabs.js',

    //CSS Files
    '/public/style.css',
    //'/script/main.js'
];

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    showInstallPromotion();
});

function showInstallPromotion() {
    alert('HIT ME');
}

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

