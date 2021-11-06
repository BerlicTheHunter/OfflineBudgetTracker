// * ----- Variable Set up ----- * \\
const files_to_cache =[
// "/",
"/index.html",
"/index.js",
"/manifest.webmanifest",
"/db.js",
"/styles.css",
"/icons/icon-192x192.png",
"/icons/icon-512x512.png",
"https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
"https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

// * ----- Install Service Worker ----- * \\
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open('static')
      .then( cache => {
       return cache.addAll(files_to_cache);
    })
  );
  console.log( "Service Worker Installed");  
  self.skipWaiting();
});

// * ----- Activate Service Worker ----- * \\
self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
});


//  * ----- Fetch Listener ----- * \\
self.addEventListener("fetch", (event) => {
  let status= navigator.onLine;
  if (event.request.url.startsWith(self.location.origin) && !status) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
})
