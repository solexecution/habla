/* Hablá service worker — offline-first caching of the app shell + audio.
 * Bump CACHE when any listed asset changes so clients pull the new version. */
var CACHE = "habla-v9";
var ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./words.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

// Derive the audio clip list straight from the word data so it never drifts.
var AUDIO = [];
try {
  importScripts("./words.js"); // defines global WORDS (a lexical const)
  if (typeof WORDS !== "undefined" && WORDS) AUDIO = WORDS.map(function (w) { return "./audio/" + w.id + ".mp3"; });
} catch (e) { /* audio just won't be precached; runtime caching still applies */ }

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Shell must all cache (fail install if not). Audio is best-effort so one
      // missing clip never blocks the install.
      return c.addAll(ASSETS).then(function () {
        return Promise.all(AUDIO.map(function (url) {
          return c.add(url).catch(function () { /* skip a missing clip */ });
        }));
      });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Focus (or open) the app when a reminder notification is tapped.
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ("focus" in list[i]) return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});

// Cache-first for same-origin GETs; network fallback keeps it fresh when online.
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
