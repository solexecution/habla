/* Hablá service worker — offline-first caching.
 * Two caches:
 *   CACHE       — the app shell (html/css/js/words/manifest/icons). Precached on
 *                 install; bump the version when any shell asset changes.
 *   AUDIO_CACHE — the 187 pronunciation clips. Filled by the PAGE on first load
 *                 (see prefetchAudio in app.js) with progress + retries, so the
 *                 download is complete and visible rather than best-effort. It is
 *                 preserved across shell updates so audio isn't re-downloaded. */
var CACHE = "habla-v13";
var AUDIO_CACHE = "habla-audio-v1";
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

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      // Purge old shell caches, but keep the current shell AND the audio cache.
      return Promise.all(keys
        .filter(function (k) { return k !== CACHE && k !== AUDIO_CACHE; })
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

// Cache-first for same-origin GETs. caches.match searches every cache, so audio
// is served from AUDIO_CACHE and the shell from CACHE. Network fills gaps online.
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          // Audio goes to the audio cache; everything else to the shell cache.
          var target = url.pathname.indexOf("/audio/") !== -1 ? AUDIO_CACHE : CACHE;
          var copy = res.clone();
          caches.open(target).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
    })
  );
});
