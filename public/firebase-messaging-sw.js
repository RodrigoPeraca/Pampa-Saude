// public/firebase-messaging-sw.js
// Service Worker para receber notificações em background (quando app está fechado)
// Este arquivo deve ficar EXATAMENTE em public/ para funcionar corretamente

// Importa Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

//credenciais do Firebase (mesmas do src/firebase/firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyA_BZSRZFImnVwogdFvkdbufcIEKMjLYBY",
  authDomain: "pampa-saude.firebaseapp.com",
  projectId: "pampa-saude",
  storageBucket: "pampa-saude.firebasestorage.app",
  messagingSenderId: "403037160519",
  appId: "1:403037160519:web:b072da322c05bf61631d62",
  measurementId: "G-BKG2Z3SS6Z"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtém instância de messaging
const messaging = firebase.messaging();

// ========================================
// HANDLER: Notificações em background
// ========================================
messaging.onBackgroundMessage((payload) => {
  console.log("Notificação em background:", payload);

  // Extrai dados da notificação
  const notificationTitle = payload.notification?.title || "Notificação Pampa Saúde";
  const notificationOptions = {
    body: payload.notification?.body || "Você recebeu uma nova notificação",
    icon: payload.notification?.icon || "/icon-192x192.png",
    image: payload.notification?.image,
    badge: "/badge-72x72.png",
    tag: "notification-pampa-saude", // Agrupa notificações com mesma tag
    requireInteraction: false, // true = notif não fecha automaticamente
    data: payload.data || {},
    actions: [
      {
        action: "open",
        title: "Abrir",
      },
      {
        action: "close",
        title: "Fechar",
      },
    ],
  };

  // Exibe notificação do sistema
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// ========================================
// HANDLER: Clique na notificação
// ========================================
self.addEventListener("notificationclick", (event) => {
  console.log("Notificação clicada:", event.notification.tag);

  event.notification.close();

  // Define ação baseada no botão clicado
  if (event.action === "close") {
    return; // Só fecha
  }

  // Abre a janela/aba
  const urlToOpen = new URL("/", self.location.origin).href;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Se app já está aberto, foca na aba
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }

        // Se não está aberto, abre nova aba
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// ========================================
// HANDLER: Erro ao enviar notificação
// ========================================
self.addEventListener("notificationerror", (event) => {
  console.error("Erro ao exibir notificação:", event);
});
