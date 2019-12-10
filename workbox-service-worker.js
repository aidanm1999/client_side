importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);


    workbox.setConfig({
        debug: true
    });

    workbox.precaching.precacheAndRoute([]);
    workbox.googleAnalytics.initialize();

    workbox.routing.registerRoute(
        /\.html$/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'clientside-html-cache',
        })
    );

    workbox.routing.registerRoute(
        /\.js$/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'clientside-js-cache',
        })
    );

    workbox.routing.registerRoute(
        // Cache CSS files.
        /\.css$/,
        // Use cache but update in the background.
        new workbox.strategies.StaleWhileRevalidate({
            // Use a custom cache name.
            cacheName: 'clientside-css-cache',
        })
    );

    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'clientside-image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 20,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    if (self.indexedDB) {
        var request = self.indexedDB.open('talks', 1);

        request.onsuccess = function (event) {
            // some sample talks data
            var talks = [
                { id: 1, name: 'Red Men T-Shirt', price: '$3.99' },
                { id: 2, name: 'Pink Women Shorts', price: '$5.99' },
                { id: 3, name: 'Nike white Shoes', price: '$300' }
            ];


            // get database from event
            var db = event.target.result;

            // create transaction from database
            var transaction = db.transaction('talks', 'readwrite');

            // add success event handleer for transaction
            // you should also add onerror, onabort event handlers
            transaction.onsuccess = function (event) {
                console.log('[Transaction] ALL DONE!');
            };

            // get store from transaction
            var talksStore = transaction.objectStore('talks');

            /*************************************/

            // put talks data in talksStore
            talks.forEach(function (talk) {
                var db_op_req = talksStore.add(talk);

                db_op_req.onsuccess = function (event) {
                    console.log(event.target.result == talk.id); // true
                }
            });

            // count number of objects in store
            talksStore.count().onsuccess = function (event) {
                console.log('[Transaction - COUNT] number of talks in store', event.target.result);
            };

            // // get talk with id 1
            // talksStore.get(1).onsuccess = function (event) {
            //     console.log('[Transaction - GET] talk with id 1', event.target.result);
            // };

            // // update talk with id 1
            // talks[0].name = 'Blue Men T-shirt';
            // talksStore.put(talks[0]).onsuccess = function (event) {
            //     console.log('[Transaction - PUT] talk with id 1', event.target.result);
            // };

            // // delete talk with id 2
            // talksStore.delete(2).onsuccess = function (event) {
            //     console.log('[Transaction - DELETE] deleted with id 2');
            // };
        };

        request.onerror = function (event) {
            console.log('[onerror]', request.error);
        };

        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            var talksStore = db.createObjectStore('talks', { keyPath: 'id' });
        };
    }

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

