function getCachedTalks() {


    if (indexedDB) {
        var request = indexedDB.open('clientside', 1);

        request.onsuccess = function (event) {
            console.log('successful request');

            // get database from event
            var db = event.target.result;

            if (db.objectStoreNames.length == 0) {
                return null;
            }

            var transaction = db.transaction('talks', 'readonly');

            // get store from transaction
            var talksStore = transaction.objectStore('talks');

            return talksStore.getAll();
        }

        request.onerror = function (event) {
            console.log('error');
        }
    }
    // On error
    return null;
}

function getCachedSessions() {

    if (indexedDB) {
        var request = indexedDB.open('clientside', 1);

        request.onsuccess = function (event) {

            // get database from event
            var db = event.target.result;

            if (db.objectStoreNames.length == 0) {
                return null;
            }

            var transaction = db.transaction('sessions', 'readonly');

            // get store from transaction
            var talksStore = transaction.objectStore('sessions');

            return talksStore.getAll();
        }

        request.onerror = function (event) {
            console.log('error');
        }
    }
    // On error
    return null;
}



function cacheTalks() {
    console.log('cache talks');
    if (indexedDB && globalTalks) {
        // Check if db has object store 
        // If not create store
        // Then add objects to store
        var request = indexedDB.open('clientside', 1);

        request.onsuccess = function (event) {

            // get database from event
            var db = event.target.result;

            // if (db.objectStoreNames.length == 0) {
            //     // Create objectStore
            //     db.createObjectStore('talks');
            // }

            var transaction = db.transaction('talks', 'readwrite');

            // get store from transaction
            var talksStore = transaction.objectStore('talks', { autoIncrement: true });

            globalTalks.forEach(function (talk) {
                var objectStoreRequest = talksStore.add(talk);

                objectStoreRequest.onsuccess = function (event) {
                    console.log(event.target.result == talk.id); // true
                }
            });



            // return talksStore.getAll();
        }

        request.onerror = function (event) {
            console.log('error');
        }

        request.onupgradeneeded = function (event) {
            var db = event.target.result;

            // Create an objectStore for this database

            var objectStore = db.createObjectStore("talks");
        };

    }
}



function cacheSessions() {
    console.log('cache sessions');
    if (indexedDB && globalSessions) {


    }
    return null;
}