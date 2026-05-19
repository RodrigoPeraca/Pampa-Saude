// src/components/NotificationProvider.js
// Context Provider para gerenciar notificações push em toda aplicação

import React, { createContext, useContext, useState, useCallback } from "react";
import { useNotifications } from "../hooks/useNotifications";

// Cria o context
const NotificationContext = createContext(undefined);

/**
 * Provider que envolve toda a aplicação
 * Fornece contexto global de notificações
 */
export const NotificationProvider = ({
  children,
  vapidKey,
  userId = null,
  sendToBackend = false,
  autoRequest = true,
  onNotificationReceived = null,
}) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  // Usa o hook de notificações
  const {
    fcmToken,
    permission,
    isLoading,
    error,
    requestPermission,
    cleanup,
    isGranted,
  } = useNotifications({
    onNotificationReceived: (notifData) => {
      // Adiciona à lista de notificações
      const notif = {
        id: Date.now(),
        timestamp: new Date(),
        ...notifData,
      };

      setNotifications((prev) => [notif, ...prev].slice(0, 50)); // Mantém últimas 50
      setCurrentNotification(notif);
      setShowNotification(true);

      // Callback externo se fornecido
      if (onNotificationReceived) {
        onNotificationReceived(notifData);
      }

      // Auto-fecha notificação após 5 segundos
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    },
    autoRequest,
    vapidKey,
    userId,
    sendToBackend,
  });

  // Função para fechar notificação manualmente
  const dismissNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  // Função para limpar histórico
  const clearNotificationHistory = useCallback(() => {
    setNotifications([]);
  }, []);

  // Função para remover notificação específica
  const removeNotification = useCallback((notifId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
  }, []);

  // Value do context
  const value = {
    fcmToken,
    permission,
    isLoading,
    error,
    isGranted,
    requestPermission,
    cleanup,
    notifications,
    currentNotification,
    showNotification,
    dismissNotification,
    clearNotificationHistory,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Toast/Alert de notificação (opcional) */}
      {showNotification && currentNotification && (
        <NotificationToast
          notification={currentNotification}
          onDismiss={dismissNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

/**
 * Hook para usar context de notificações
 * Use em qualquer componente que esteja dentro do Provider
 */
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext deve ser usado dentro de NotificationProvider"
    );
  }

  return context;
};

/**
 * Componente Toast para exibir notificações
 * Estilize conforme sua aplicação
 */
export const NotificationToast = ({ notification, onDismiss }) => {
  return (
    <div
      className="notification-toast"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        maxWidth: "400px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "16px",
        zIndex: 9999,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      {notification.image && (
        <img
          src={notification.image}
          alt="notif"
          style={{
            width: "100%",
            borderRadius: "4px",
            marginBottom: "12px",
            maxHeight: "200px",
            objectFit: "cover",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
            }}
          >
            {notification.title}
          </h4>
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.4",
            }}
          >
            {notification.body}
          </p>

          {notification.data && Object.keys(notification.data).length > 0 && (
            <small
              style={{
                display: "block",
                marginTop: "8px",
                color: "#999",
                fontSize: "12px",
              }}
            >
              {Object.entries(notification.data)
                .map(([key, value]) => `${key}: ${value}`)
                .join(" | ")}
            </small>
          )}
        </div>

        <button
          onClick={onDismiss}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#999",
            padding: "0",
            marginTop: "-4px",
          }}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
