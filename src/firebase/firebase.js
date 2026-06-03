// src/firebase/firebase.js
// Configuração modular do Firebase v9+

import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

//Credencial real do firebase do projeto Pampa Saúde 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Messaging se suportado
let messaging = null;

if (isSupported()) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);

  // Força usar o service-worker.js em vez do firebase-messaging-sw.js
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
    messaging.useServiceWorker && messaging.useServiceWorker(registration);
  });
}

export { app, messaging };
export const db = getFirestore(app);