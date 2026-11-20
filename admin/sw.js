/* beku° admin app — minimal service worker so the phone can install the app. Always uses the network (no stale data). */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) { /* network only */ });
