import { useEffect, useRef, useCallback, useState } from "react";
import {
  requestNotificationPermission,
  getFCMToken,
  onMessageListener,
  clearFCMToken,
  getNotificationPermission,
  sendTokenToBackend,
  getStoredFCMToken,
  saveTokenToFirestore,
} from "../services/notificationService";

export const useNotifications = ({
  onNotificationReceived = null,
  autoRequest = true,
  vapidKey = process.env.REACT_APP_FCM_VAPID_KEY,
  userId = null,
  sendToBackend = false,
} = {}) => {
  const [fcmToken, setFcmToken] = useState(null);
  const [permission, setPermission] = useState(getNotificationPermission());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const unsubscribeRef = useRef(null);
  const onNotificationReceivedRef = useRef(onNotificationReceived);

  // Mantém o ref atualizado sem disparar o efeito
  useEffect(() => {
    onNotificationReceivedRef.current = onNotificationReceived;
  }, [onNotificationReceived]);

  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const perm = await requestNotificationPermission();
      setPermission(perm);
      if (perm === "granted") {
        const token = await getFCMToken(vapidKey);
        if (token) {
          setFcmToken(token);
          await saveTokenToFirestore(token);
          console.log("🔔 MEU TOKEN FCM:", token);
          if (sendToBackend && userId) {
            await sendTokenToBackend(userId, token);
          }
        }
      }
      return perm;
    } catch (err) {
      console.error("Erro ao solicitar permissão:", err);
      setError(err.message);
      return "error";
    } finally {
      setIsLoading(false);
    }
  }, [vapidKey, userId, sendToBackend]);

  // Cleanup só cancela o listener, NÃO apaga o token
  const cleanup = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  // Use essa apenas no logout do usuário
  const cleanupOnLogout = useCallback(() => {
    cleanup();
    clearFCMToken();
    setFcmToken(null);
  }, [cleanup]);

  useEffect(() => {
    let isMounted = true;

    const initializeNotifications = async () => {
      try {
        setIsLoading(true);
        const storedToken = getStoredFCMToken();

        if (storedToken) {
          if (isMounted){ 
          setFcmToken(storedToken);
          console.log("🔔 MEU TOKEN FCM:", storedToken);
          }
        } else if (autoRequest) {
          const perm = await requestNotificationPermission();
          if (isMounted) {
            setPermission(perm);
            if (perm === "granted") {
              const token = await getFCMToken(vapidKey);
              if (token && isMounted) {
                setFcmToken(token);
                await saveTokenToFirestore(token);
                console.log("🔔 MEU TOKEN FCM:", token);
                if (sendToBackend && userId) {
                  await sendTokenToBackend(userId, token);
                }
              }
            }
          }
        }

        // Usa o ref em vez da função diretamente
        if (onNotificationReceivedRef.current) {
          const unsubscribe = onMessageListener(onNotificationReceivedRef.current);
          unsubscribeRef.current = unsubscribe;
        }
      } catch (err) {
        console.error("Erro ao inicializar notificações:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeNotifications();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [autoRequest, vapidKey, userId, sendToBackend, cleanup]); // onNotificationReceived removido das dependências

  return {
    fcmToken,
    permission,
    isLoading,
    error,
    requestPermission,
    cleanup,
    cleanupOnLogout,
    isGranted: permission === "granted",
    isDenied: permission === "denied",
  };
};