const files_to_casche =[
"/",
"/index.html",
"/index.js",
"/manafest.webmanifest",
"/db.js",
"/icons/icon-192x192.png",
"/icons/icon-512x512.png"
]

self.addEventListener("install", function(event) {
  console.log( "Service Worker Installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker Activated");
});

self.addEventListener("fetch", () => {
  console.log("Service Worker Heard A Fetch");
});