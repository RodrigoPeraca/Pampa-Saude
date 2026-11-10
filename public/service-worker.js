/* eslint-disable no-restricted-globals */
// public/service-worker.js

const CACHE_NAME = "pampa-saude";
const OFFLINE_URL = "/index.html";
const APP_SHELL_ASSETS = [
  "/",
  OFFLINE_URL,
  "/manifest.json",
  "/PampaSaude_redondo_192.png",
  "/PampaSaude_redondo.png",
  "/PampaSaude_redondo_1024.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        OFFLINE_URL,
        "/manifest.json",
        "/PampaSaude_redondo_192.png",
        "/PampaSaude_redondo.png",
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === location.origin;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  if (isSameOrigin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }
            const cloned = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, cloned));
            return networkResponse;
          })
          .catch(() => {
            if (event.request.destination === "document") {
              return caches.match(OFFLINE_URL);
            }
            return new Response("Offline", {
              status: 503,
              statusText: "Offline",
            });
          });
      })
    );
  }
});

// ─── Firebase Cloud Messaging ────────────────────────────────────────────────

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"
);

// Valores fixos — service workers não têm acesso a process.env
const firebaseConfig = {
  apiKey: "AIzaSyA_BZSRZFImnVwogdFvkdbufcIEKMjLYBY",
  authDomain: "pampa-saude.firebaseapp.com",
  projectId: "pampa-saude",
  storageBucket: "pampa-saude.firebasestorage.app",
  messagingSenderId: "403037160519",
  appId: "1:403037160519:web:b072da322c05bf61631d62",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle =
    payload.notification?.title || "Pampa Saúde";

  // Lê imagem de notification.image ou data.image para máxima compatibilidade
  const image =
    payload.notification?.image ||
    payload.data?.image ||
    null;

  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/PampaSaude_redondo_192.png",
    badge: "/PampaSaude_redondo_192.png",
    tag: "pampa-saude-notification",
    // image exibe a imagem expandida na notificação (Android/Chrome)
    ...(image && { image }),
    data: payload.data || {},
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// Ao clicar na notificação, abre o app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = new URL("/", self.location.origin).href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
