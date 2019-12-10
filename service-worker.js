var CACHE_NAME = 'cache-v1';
var urlsToCache = [
    // HTML Pages
    '/',

    // Imported JS Files
    // '/__/firebase/7.5.0/firebase-analytics.js',
    // '/__/firebase/7.5.0/firebase-app.js',
    // '/__/firebase/init.js',
    '/public/js/lib/Chart.bundle.min.js',
    '/public/js/lib/bootstrap/bootstrap.bundle.min.js',
    '/public/js/lib/bootstrap/bootstrap.min.js',
    '/public/js/lib/jquery-3.4.1.min.js',
    '/public/js/lib/sweetalert2.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',


    // Imported Icons
    'https://fonts.googleapis.com/icon?family=Material+Icons+Round',


    // Javascript Files
    '/public/js/appCharts.min.js',
    '/public/js/darkMode.min.js',
    '/public/js/getTalks.min.js',
    '/public/js/index.min.js',
    '/public/js/paintTalkCards.min.js',
    '/public/js/paintTalkTable.min.js',
    '/public/js/schedule.min.js',
    '/public/js/tableSorting.min.js',
    '/public/js/tabs.min.js',


    // CSS Files
    '/public/css/style.min.css',
    '/public/css/lib/bootstrap/bootstrap.min.css',


    // Image Files
    '/public/images/android-chrome-192x192.png',
    '/public/images/favicon-32x32.png',
    '/public/images/talks/1-min.jpg',
    '/public/images/talks/2-min.jpg',
    '/public/images/talks/3-min.jpg',
    '/public/images/talks/4-min.jpg',
    '/public/images/talks/5-min.jpg',
    '/public/images/talks/6-min.jpg',
    '/public/images/talks/7-min.jpg',
    '/public/images/talks/8-min.jpg',
    '/public/images/talks/9-min.jpg',
    '/public/images/talks/10-min.jpg',
    '/public/images/talks/11-min.jpg',
    '/public/images/talks/12-min.jpg',
    '/public/images/talks/13-min.jpg',
    '/public/images/talks/14-min.jpg',
    '/public/images/talks/15-min.jpg',


];

self.addEventListener('install', function (event) {
    //console.log(globalTalks);
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

