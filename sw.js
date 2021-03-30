const CACHE_NAME = "v1_cache_contador_app_vue";
const URLSTOCACHE = [
    "./",
    "./?umt_source=web_app_manifest",
    "./img/numbericon16.png",
    "./img/numbericon32.png",
    "./img/numbericon64.png",
    "./img/numbericon128.png",
    "./img/numbericon256.png",
    "./img/numbericon512.png",
    "./img/numbericon1024.png",
    "https://unpkg.com/vue@next",
    "./js/main.js",
    "./js/mountApp.js",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    "./css/style.css"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLSTOCACHE).then(
                () => self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
});

self.addEventListener("activate", e => {
    const cacheWhiteList= [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                return caches.delete(cacheName);
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    );
});

self.addEventListener("fetch", e =>{
    e.respondWith( /*async function(){
        const cachedResponse = await caches.match(e.request);

        if(cachedResponse) return cachedResponse;

        return fetch(e.request);
    }());*/
        caches.match(e.request).then(
                res => {
                    if(res) return res;
                    return fetch(e.request);
                }
        ).catch(err => console.log(err))
    )
});