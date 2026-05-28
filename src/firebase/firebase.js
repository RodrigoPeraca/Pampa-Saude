// src/firebase/firebase.js
// Configuração modular do Firebase v9+

import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

//Credencial real do firebase do projeto Pampa Saúde 
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
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Messaging se suportado
let messaging = null;

if (isSupported()) {
  messaging = getMessaging(app);
}

export { app, messaging };
export const db = getFirestore(app);