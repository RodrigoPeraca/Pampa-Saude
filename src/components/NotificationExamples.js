// src/components/NotificationExamples.js
// Exemplos de como usar o sistema de notificações em seus componentes

import React, { useEffect } from "react";
import { useNotificationContext } from "./NotificationProvider";

/**
 * EXEMPLO 1: Componente que consome o contexto de notificações
 * Para usar: importe e coloque em qualquer lugar dentro do NotificationProvider
 */
export const NotificationStatus = () => {
  const {
    fcmToken,
    permission,
    isLoading,
    isGranted,
    requestPermission,
    notifications,
  } = useNotificationContext();

  return (
    <div style={{ padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <h3>Status das Notificações Push</h3>

      <div style={{ marginTop: "12px", fontSize: "14px" }}>
        <p>
          <strong>Permissão:</strong>{" "}
          <span
            style={{
              color: isGranted ? "#4CAF50" : "#f44336",
              fontWeight: "bold",
            }}
          >
            {permission === "granted" ? "✓ Ativa" : "✗ " + permission}
          </span>
        </p>

        <p>
          <strong>Token FCM:</strong>{" "}
          {fcmToken ? (
            <code
              style={{
                backgroundColor: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                maxWidth: "250px",
              }}
            >
              {fcmToken}
            </code>
          ) : (
            "Não obtido"
          )}
        </p>

        <p>
          <strong>Notificações Recebidas:</strong> {notifications.length}
        </p>

        {isLoading && <p>Carregando...</p>}
      </div>

      {!isGranted && (
        <button
          onClick={requestPermission}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Ativar Notificações
        </button>
      )}
    </div>
  );
};

/**
 * EXEMPLO 2: Componente que atualiza token quando usuário faz login
 * Use em sua página de login/autenticação
 */
export const LoginExampleWithNotifications = () => {
  const { fcmToken, requestPermission, isGranted } = useNotificationContext();

  const handleLogin = async (userId) => {
    try {
      // 1. Solicita permissão se não tem
      if (!isGranted) {
        await requestPermission();
      }

      // 2. Aqui você poderia enviar o fcmToken ao seu backend
      // associando o token ao usuário que fez login
      if (fcmToken) {
        const response = await fetch("/api/users/link-fcm-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            fcmToken: fcmToken,
          }),
        });

        if (response.ok) {
          console.log("Token vinculado ao usuário com sucesso!");
        }
      }

      // 3. Continua com login normal
      console.log("Usuário autenticado e notificações configuradas");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div>
      <h2>Exemplo: Login com Notificações</h2>
      <button
        onClick={() => handleLogin("user123")}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
};

/**
 * EXEMPLO 3: Listar histórico de notificações recebidas
 */
export const NotificationHistory = () => {
  const { notifications, removeNotification, clearNotificationHistory } =
    useNotificationContext();

  if (notifications.length === 0) {
    return (
      <div style={{ padding: "16px", color: "#999" }}>
        Nenhuma notificação recebida ainda
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3>Histórico ({notifications.length})</h3>
        <button
          onClick={clearNotificationHistory}
          style={{
            padding: "4px 12px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Limpar Tudo
        </button>
      </div>

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              backgroundColor: "#f9f9f9",
              borderLeft: "4px solid #2196F3",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{notif.title}</strong>
              <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
                {notif.body}
              </p>
              <small style={{ color: "#999" }}>
                {new Date(notif.timestamp).toLocaleTimeString("pt-BR")}
              </small>
            </div>
            <button
              onClick={() => removeNotification(notif.id)}
              style={{
                background: "none",
                border: "none",
                color: "#999",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * EXEMPLO 4: Escutar notificações em um componente específico
 * Útil para reagir a notificações em páginas específicas
 */
export const FacilityPageWithNotificationListener = () => {
  const { notifications } = useNotificationContext();

  useEffect(() => {
    // Reage quando uma nova notificação chega
    if (notifications.length > 0) {
      const lastNotif = notifications[0];

      // Exemplo: Se notificação contiver tipo "facility_update"
      if (lastNotif.data?.type === "facility_update") {
        console.log("Atualização de facilidade recebida:", lastNotif.data);
        // Aqui você pode recarregar dados, animar a tela, etc
      }

      // Exemplo: Reproduzir som de notificação
      // playNotificationSound();
    }
  }, [notifications]);

  return <div>Exemplo de página que reage a notificações</div>;
};

/**
 * EXEMPLO 5: Desabilitar/Habilitar notificações dinamicamente
 */
export const NotificationToggle = () => {
  const { isGranted, requestPermission, cleanup } = useNotificationContext();
  const [enabled, setEnabled] = React.useState(isGranted);

  const handleToggle = async () => {
    if (!enabled) {
      // Habilitar
      const perm = await requestPermission();
      setEnabled(perm === "granted");
    } else {
      // Desabilitar
      cleanup();
      setEnabled(false);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleToggle}
          style={{ cursor: "pointer" }}
        />
        <span>
          {enabled ? "Notificações Ativas" : "Notificações Desativas"}
        </span>
      </label>
    </div>
  );
};
