// src/components/PracticalNotificationExamples.js
// Exemplos prontos para copiar e colar em seus componentes existentes

/**
 * ============================================
 * EXEMPLO 1: Integrar no Header.js
 * ============================================
 * 
 * Adicione isto ao seu Header.js:
 */

import React from "react";
import { useNotificationContext } from "./NotificationProvider";

// Adicione isto DENTRO do seu componente Header
export function HeaderNotificationIcon() {
  const { isGranted, notifications, requestPermission } = useNotificationContext();

  return (
    <button
      onClick={() => !isGranted && requestPermission()}
      title={isGranted ? "Notificações ativas" : "Clique para ativar notificações"}
      style={{
        background: "none",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        position: "relative",
        marginRight: "16px",
      }}
    >
      🔔
      {isGranted && notifications.length > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            backgroundColor: "#ff4444",
            color: "white",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {notifications.length > 99 ? "99+" : notifications.length}
        </span>
      )}
    </button>
  );
}

/**
 * ============================================
 * EXEMPLO 2: Integrar no FacilityList.js
 * ============================================
 * 
 * Quando uma facilidade é atualizada, mostre notificação:
 */

import { useEffect } from "react";

// Adicione isto dentro do seu componente FacilityList
export function useFacilityNotificationListener() {
  const { notifications } = useNotificationContext();

  useEffect(() => {
    if (notifications.length === 0) return;

    const lastNotif = notifications[0];

    // Se é uma notificação de atualização de facilidade
    if (lastNotif.data?.type === "facility_update") {
      console.log("Facilidade atualizada:", lastNotif.data.facilityId);

      // OPÇÃO 1: Animar a tela
      const element = document.querySelector(
        `[data-facility-id="${lastNotif.data.facilityId}"]`
      );
      if (element) {
        element.classList.add("updated-animation");
        setTimeout(() => element.classList.remove("updated-animation"), 3000);
      }

      // OPÇÃO 2: Mostrar toast adicional
      // showToast(`${lastNotif.title} - ${lastNotif.body}`, "info");

      // OPÇÃO 3: Recarregar dados
      // refetchFacilities();
    }
  }, [notifications]);
}

/**
 * ============================================
 * EXEMPLO 3: Setup em AboutPage.js
 * ============================================
 * 
 * Mostre status e histórico de notificações:
 */

export function NotificationSettingsSection() {
  const {
    isGranted,
    permission,
    fcmToken,
    notifications,
    requestPermission,
    clearNotificationHistory,
  } = useNotificationContext();

  return (
    <section style={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h3>⚙️ Notificações Push</h3>

      <div style={{ marginTop: "12px" }}>
        <p>
          <strong>Status:</strong>{" "}
          <span style={{ color: isGranted ? "#4CAF50" : "#999" }}>
            {isGranted ? "✓ Ativadas" : "✗ Desativadas"}
          </span>
        </p>

        <p>
          <strong>Histórico:</strong> {notifications.length} notificação
          {notifications.length !== 1 ? "ões" : ""} recebida
          {notifications.length !== 1 ? "s" : ""}
        </p>

        {fcmToken && (
          <p style={{ fontSize: "12px", color: "#999", wordBreak: "break-all" }}>
            <strong>Token:</strong> {fcmToken.substring(0, 40)}...
          </p>
        )}
      </div>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        {!isGranted && (
          <button
            onClick={requestPermission}
            style={{
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

        {notifications.length > 0 && (
          <button
            onClick={clearNotificationHistory}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Limpar Histórico
          </button>
        )}
      </div>
    </section>
  );
}

/**
 * ============================================
 * EXEMPLO 4: Em SearchPanel.js
 * ============================================
 * 
 * Quando busca retorna resultados, notifique:
 */

export function notifySearchResults(searchTerm, resultCount) {
  const notification = {
    title: "Busca Concluída",
    body: `Encontrados ${resultCount} resultado${resultCount !== 1 ? "s" : ""} para "${searchTerm}"`,
    data: {
      type: "search_complete",
      query: searchTerm,
      count: resultCount,
    },
  };

  // Salve em localStorage ou dispare via context
  // dispatch({ type: "ADD_NOTIFICATION", payload: notification });
}

/**
 * ============================================
 * EXEMPLO 5: Em LoginFlow
 * ============================================
 * 
 * Vincule token ao usuário após login:
 */

import { sendTokenToBackend } from "../services/notificationService";

export async function handleUserLogin(user) {
  const { fcmToken, requestPermission, isGranted } = useNotificationContext();

  try {
    // 1. Solicita permissão se não tem
    if (!isGranted) {
      await requestPermission();
    }

    // 2. Envia token ao backend
    if (fcmToken) {
      const response = await sendTokenToBackend(
        user.id,
        fcmToken,
        process.env.REACT_APP_API_URL
      );

      console.log("Token vinculado ao usuário:", response);

      // 3. Armazene preference do usuário
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user_has_notifications", isGranted);
    }
  } catch (error) {
    console.error("Erro ao configurar notificações:", error);
    // Não bloqueie o login se notificações falharem
  }
}

/**
 * ============================================
 * EXEMPLO 6: Em ForeignersPage.js
 * ============================================
 * 
 * Notificação especial para visitantes:
 */

export function ForeignersPageWithNotifications() {
  const { notifications, isGranted, requestPermission } =
    useNotificationContext();

  useEffect(() => {
    // Se visitante não tem notificações, sugira ativar
    if (!isGranted) {
      const banner = document.createElement("div");
      banner.style.cssText = `
        background: #2196F3;
        color: white;
        padding: 12px;
        margin: 12px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;
      banner.innerHTML = `
        <span>Ativar notificações para receber atualizações sobre serviços</span>
        <button onclick="window.requestNotif()" style="
          background: white;
          color: #2196F3;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        ">Ativar</button>
      `;
      // Adicione ao DOM...
    }
  }, [isGranted]);

  return <div>Página para visitantes</div>;
}

/**
 * ============================================
 * EXEMPLO 7: Reutilizável - Notificação Toast Customizado
 * ============================================
 * 
 * Crie um Toast com styling customizado:
 */

export function CustomNotificationToast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        maxWidth: "350px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        overflow: "hidden",
        zIndex: 9999,
        animation: "slideInRight 0.3s ease-out",
      }}
    >
      {notification.image && (
        <img
          src={notification.image}
          alt=""
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
        />
      )}

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
              {notification.title}
            </h4>
            <p style={{ margin: "0", fontSize: "14px", color: "#666", lineHeight: "1.4" }}>
              {notification.body}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#999",
              flex: "0 0 auto",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes updated-animation {
          0%, 100% { background: inherit; }
          50% { background: #fffde7; }
        }
        .updated-animation {
          animation: updated-animation 0.6s;
        }
      `}</style>
    </div>
  );
}

/**
 * ============================================
 * EXEMPLO 8: Hook Customizado - Filtrar Notificações
 * ============================================
 * 
 * Use em páginas que só querem certos tipos:
 */

export function useFilteredNotifications(type) {
  const { notifications } = useNotificationContext();

  return notifications.filter((notif) => notif.data?.type === type);
}

// Uso:
// const facilityUpdates = useFilteredNotifications("facility_update");
// const serviceUpdates = useFilteredNotifications("service_available");

/**
 * ============================================
 * EXEMPLO 9: Persistência - Salvar Preferência do Usuário
 * ============================================
 */

export function useNotificationPreference(userId) {
  const { isGranted, requestPermission } = useNotificationContext();

  useEffect(() => {
    // Carrega preference salva do backend
    const loadPreference = async () => {
      const response = await fetch(
        `/api/users/${userId}/notification-preference`
      );
      const preference = await response.json();

      // Se user quer notificações e não tem permissão, solicita
      if (preference.enabled && !isGranted) {
        requestPermission();
      }
    };

    if (userId) {
      loadPreference();
    }
  }, [userId, isGranted, requestPermission]);

  const updatePreference = async (enabled) => {
    await fetch(`/api/users/${userId}/notification-preference`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
  };

  return { isGranted, updatePreference };
}

/**
 * ============================================
 * EXEMPLO 10: Testes - Mock de Notificação
 * ============================================
 * 
 * Para testar localmente sem Firebase:
 */

export function mockNotificationForTesting() {
  // Simula receber uma notificação
  const mockNotification = {
    title: "Teste de Notificação",
    body: "Esta é uma notificação de teste local",
    image: "https://via.placeholder.com/300",
    data: {
      type: "test",
      timestamp: new Date().toISOString(),
    },
  };

  // Dispare como se fosse do Firebase
  // dispatch({ type: "ADD_NOTIFICATION", payload: mockNotification });
  console.log("Notificação de teste:", mockNotification);

  return mockNotification;
}

// Chame em console para testar:
// mockNotificationForTesting();

/**
 * ============================================
 * EXEMPLO 11: Analytics - Rastrear Cliques
 * ============================================
 */

export function trackNotificationInteraction(notificationId, action) {
  const analytics = window.gtag || console;

  analytics.event("notification_interaction", {
    notification_id: notificationId,
    action: action, // "click", "dismiss", "open"
    timestamp: new Date().toISOString(),
  });
}

/**
 * ============================================
 * EXEMPLO 12: Batch Processing - Processar Múltiplas
 * ============================================
 */

export async function processBatchNotifications(notifications) {
  const groupedByType = notifications.reduce((acc, notif) => {
    const type = notif.data?.type || "unknown";
    if (!acc[type]) acc[type] = [];
    acc[type].push(notif);
    return acc;
  }, {});

  for (const [type, notifs] of Object.entries(groupedByType)) {
    console.log(`Processando ${notifs.length} notificações do tipo: ${type}`);

    // Processar por tipo
    if (type === "facility_update") {
      // Recarregar facilities
    } else if (type === "service_available") {
      // Atualizar serviços
    }
  }
}
