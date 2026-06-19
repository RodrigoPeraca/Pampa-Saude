// src/services/notificationService.js
// Serviço centralizador para Firebase Cloud Messaging
import { db } from "../firebase/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { messaging } from "../firebase/firebase";
import {
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";

// Constante para chave localStorage
const FCM_TOKEN_KEY = "fcm_token";
const NOTIFICATION_PERMISSION_KEY = "notification_permission";

/**
 * Solicita permissão de notificação ao usuário
 * @returns {Promise<string>} - 'granted', 'denied' ou 'default'
 */
export const requestNotificationPermission = async () => {
  try {
    // Verifica se o navegador suporta Notifications API
    if (!("Notification" in window)) {
      console.warn("Este navegador não suporta notificações");
      return "default";
    }

    // Se já foi negada previamente, retorna 'denied'
    if (Notification.permission === "denied") {
      console.warn("Permissão de notificação foi negada pelo usuário");
      return "denied";
    }

    // Se já foi concedida, retorna 'granted'
    if (Notification.permission === "granted") {
      return "granted";
    }

    // Solicita permissão (mostra popup nativo)
    const permission = await Notification.requestPermission();
    localStorage.setItem(NOTIFICATION_PERMISSION_KEY, permission);

    return permission;
  } catch (error) {
    console.error("Erro ao solicitar permissão de notificação:", error);
    return "default";
  }
};

/**
 * Obtém o token FCM do usuário
 * @param {string} vapidKey - Chave VAPID do Firebase (obtém do Console)
 * @returns {Promise<string|null>} - Token FCM ou null
 */
export const getFCMToken = async (vapidKey) => {
  try {
    // Verifica se já tem token em localStorage
    const storedToken = localStorage.getItem(FCM_TOKEN_KEY);
    if (storedToken) {
      console.log("Token FCM encontrado no localStorage");
      return storedToken;
    }

    // Verifica se o navegador suporta FCM
    if (!isSupported()) {
      console.warn("Firebase Cloud Messaging não é suportado neste navegador");
      return null;
    }

    // Se não tem permissão, solicita
    if (Notification.permission !== "granted") {
      await requestNotificationPermission();
    }

    // Verifica novamente se tem permissão
    if (Notification.permission !== "granted") {
      console.warn("Permissão de notificação não foi concedida");
      return null;
    }

    // Obtém token do Firebase
    const token = await getToken(messaging, { vapidKey });

    if (token) {
      // Salva token no localStorage
      localStorage.setItem(FCM_TOKEN_KEY, token);
      console.log("Token FCM obtido com sucesso:", token);
      return token;
    }

    return null;
  } catch (error) {
    console.error("Erro ao obter token FCM:", error);
    return null;
  }
};

/**
 * Limpa o token FCM armazenado (logout, mudança de usuário, etc)
 */
export const clearFCMToken = () => {
  try {
    localStorage.removeItem(FCM_TOKEN_KEY);
    console.log("Token FCM removido do localStorage");
  } catch (error) {
    console.error("Erro ao limpar token FCM:", error);
  }
};

/**
 * Obtém o token salvo sem tentar renovar
 * @returns {string|null} - Token armazenado ou null
 */
export const getStoredFCMToken = () => {
  try {
    return localStorage.getItem(FCM_TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao recuperar token do localStorage:", error);
    return null;
  }
};

/**
 * Verifica se a permissão de notificação foi concedida
 * @returns {boolean}
 */
export const isNotificationPermissionGranted = () => {
  if (!("Notification" in window)) return false;
  return Notification.permission === "granted";
};

/**
 * Ouve mensagens em foreground (app aberto)
 * @param {Function} onMessageReceived - Callback que recebe a mensagem
 * @returns {Function} - Função para cancelar o listener
 */
export const onMessageListener = (onMessageReceived) => {
  try {
    if (!messaging) {
      console.warn("Firebase Messaging não está disponível");
      return () => {};
    }

    return onMessage(messaging, (payload) => {
      console.log("Mensagem recebida em foreground:", payload);

      // Extrai dados da notificação
      const notificationData = {
        title: payload.notification?.title || "Notificação",
        body: payload.notification?.body || "",
        image: payload.notification?.image,
        icon: payload.notification?.icon,
        data: payload.data || {},
        timestamp: new Date().toISOString(),
      };

      // Executa callback com os dados
      if (onMessageReceived) {
        onMessageReceived(notificationData);
      }
    });
  } catch (error) {
    console.error("Erro ao configurar listener de mensagens:", error);
    return () => {};
  }
};

/**
 * Verifica permissão de notificação do navegador
 * @returns {string} - 'granted', 'denied' ou 'default'
 */
export const getNotificationPermission = () => {
  if (!("Notification" in window)) return "default";
  return Notification.permission;
};

/**
 * Utilitário para armazenar token do FCM no backend
 * Chame isso após obter o token para vincular ao usuário
 * @param {string} userId - ID do usuário
 * @param {string} fcmToken - Token FCM
 * @param {string} backendUrl - URL da API backend
 */
export const sendTokenToBackend = async (
  userId,
  fcmToken,
  backendUrl = process.env.REACT_APP_API_URL
) => {
  try {
    const response = await fetch(`${backendUrl}/api/fcm-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        fcmToken,
        platform: "web",
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar token ao backend: ${response.status}`);
    }

    console.log("Token FCM enviado com sucesso ao backend");
    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar token ao backend:", error);
    throw error;
  }
};

// Flag para evitar chamadas simultâneas
let isSavingToken = false;

export const saveTokenToFirestore = async (token) => { 
  // Se já está salvando, ignora
  if (isSavingToken) return;
  isSavingToken = true;

  try {
    const q = query(
      collection(db, "fcm_tokens"),
      where("token", "==", token)
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
      console.log("Token já existe no Firestore, ignorando...");
      return;
    }

    await addDoc(collection(db, "fcm_tokens"), {
      token,
      platform: "web",
      createdAt: new Date(),
    });

    console.log("Token salvo no Firestore");
  } catch (error) {
    console.error("Erro ao salvar token:", error);
  } finally {
    isSavingToken = false;
  }
};

export const disableNotifications = async () => {
  try {
    const token = getStoredFCMToken();
    if (!token) return;

    // Remove do Firestore
    const q = query(collection(db, "fcm_tokens"), where("token", "==", token));
    const snapshot = await getDocs(q);
    
    const deletions = [];
    snapshot.forEach((docSnap) => {
      deletions.push(deleteDoc(docSnap.ref));
    });
    await Promise.all(deletions);

    // Limpa localStorage e localmente
    clearFCMToken();
    localStorage.setItem("notifications_enabled", "false");

    console.log("Notificações desativadas e token removido");
  } catch (error) {
    console.error("Erro ao desativar notificações:", error);
  }
};

export const getNotificationsEnabledPreference = () => {
  return localStorage.getItem("notifications_enabled") !== "false";
};