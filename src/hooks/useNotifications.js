// src/hooks/useNotifications.js
// Hook React para gerenciar notificações push com Firebase FCM

import { useEffect, useRef, useCallback, useState } from "react";
import {
  requestNotificationPermission,
  getFCMToken,
  onMessageListener,
  clearFCMToken,
  getNotificationPermission,
  sendTokenToBackend,
  getStoredFCMToken,
} from "../services/notificationService";

/**
 * Hook para inicializar e gerenciar notificações push
 *
 * @param {Object} options - Configurações
 * @param {Function} options.onNotificationReceived - Callback quando notif é recebida
 * @param {boolean} options.autoRequest - Solicitar permissão automaticamente (default: true)
 * @param {string} options.vapidKey - Chave VAPID do Firebase (OBRIGATÓRIO)
 * @param {string} options.userId - ID do usuário (para associar ao token)
 * @param {boolean} options.sendToBackend - Enviar token ao backend (default: false)
 *
 * @returns {Object} - { fcmToken, permission, isLoading, error, requestPermission, cleanup }
 */
export const useNotifications = ({
  onNotificationReceived = null,
  autoRequest = true,
  vapidKey = process.env.REACT_APP_FCM_VAPID_KEY,
  userId = null,
  sendToBackend = false,
} = {}) => {
  const [fcmToken, setFcmToken] = useState(null);
  const [permission, setPermission] = useState(
    getNotificationPermission()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Referência para o unsubscribe do listener
  const unsubscribeRef = useRef(null);

  // Função para solicitar permissão manualmente
  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const perm = await requestNotificationPermission();
      setPermission(perm);

      if (perm === "granted") {
        // Se permissão foi concedida, obtém o token
        const token = await getFCMToken(vapidKey);
        if (token) {
          setFcmToken(token);

          // Envia token ao backend se configurado
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

  // Função para limpar tokens e listeners
  const cleanup = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    clearFCMToken();
    setFcmToken(null);
  }, []);

  // Efeito para inicializar notificações
  useEffect(() => {
    let isMounted = true;

    const initializeNotifications = async () => {
      try {
        setIsLoading(true);

        // Checa se já tem token armazenado
        const storedToken = getStoredFCMToken();

        if (storedToken) {
          // Usa token existente
          if (isMounted) {
            setFcmToken(storedToken);
          }
        } else if (autoRequest) {
          // Solicita permissão e obtém novo token
          const perm = await requestNotificationPermission();

          if (isMounted) {
            setPermission(perm);

            if (perm === "granted") {
              const token = await getFCMToken(vapidKey);
              if (token && isMounted) {
                setFcmToken(token);

                // Envia token ao backend
                if (sendToBackend && userId) {
                  await sendTokenToBackend(userId, token);
                }
              }
            }
          }
        }

        // Configura listener de mensagens em foreground
        if (onNotificationReceived) {
          const unsubscribe = onMessageListener(onNotificationReceived);
          unsubscribeRef.current = unsubscribe;
        }
      } catch (err) {
        console.error("Erro ao inicializar notificações:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeNotifications();

    // Cleanup ao desmontar
    return () => {
      isMounted = false;
      cleanup();
    };
  }, [autoRequest, onNotificationReceived, vapidKey, userId, sendToBackend, cleanup]);

  return {
    fcmToken,
    permission,
    isLoading,
    error,
    requestPermission,
    cleanup,
    isGranted: permission === "granted",
    isDenied: permission === "denied",
  };
};
