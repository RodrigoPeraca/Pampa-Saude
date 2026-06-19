import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken as getAppCheckToken,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV !== "production" || true) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
// Inicializa o App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);
// aguarda o App Check estar pronto antes de usar o Firestore
export const appCheckReady = getAppCheckToken(appCheck)
  .then(() => {
    console.log("App Check pronto");
  })
  .catch((err) => {
    console.error("Erro ao obter token do App Check:", err);
  });

let messaging = null;

const initMessaging = async () => {
  const supported = await isSupported();
  if (supported && "serviceWorker" in navigator) {
    messaging = getMessaging(app);

    // Aguarda o service worker já registrado pelo serviceWorkerRegistration.js
    const registration = await navigator.serviceWorker.ready;
    messaging.swRegistration = registration;
  }
};

initMessaging();

export { app, messaging, appCheck };
