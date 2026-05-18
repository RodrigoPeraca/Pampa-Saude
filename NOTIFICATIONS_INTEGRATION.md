# 📱 Sistema de Notificações Push - Guia de Integração

## 🎯 Visão Geral

Este documento explica como o sistema de notificações está implementado e como usá-lo em seus componentes.

---

## 📁 Estrutura de Arquivos Criados

```
src/
├── firebase/
│   └── firebase.js                    # Configuração do Firebase
├── services/
│   └── notificationService.js         # Serviço de notificações (lógica principal)
├── hooks/
│   ├── useNotifications.js            # Hook React para notificações
│   └── useFacilities.js               # (Existente)
├── components/
│   ├── NotificationProvider.js        # Context Provider + Toast
│   ├── NotificationExamples.js        # Exemplos de uso
│   └── App.js                         # (ATUALIZADO com Provider)
└── ...

public/
├── firebase-messaging-sw.js           # Service Worker para background
├── index.html                         # (Atualizar se necessário)
└── ...

.env.example                           # Template de variáveis
.env.local                             # (CRIAR COM SUAS CREDENCIAIS)
FIREBASE_SETUP.md                      # Guia completo de configuração
```

---

## 🚀 Começando (5 Passos Rápidos)

### 1️⃣ Configure o Firebase
Siga o guia em [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 2️⃣ Crie `.env.local`
```bash
cp .env.example .env.local
```

Preencha com suas credenciais do Firebase:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FCM_VAPID_KEY=...
```

### 3️⃣ Instale as dependências do Firebase
```bash
npm install firebase
```

### 4️⃣ Já está integrado! 
O `App.js` já foi atualizado com o `NotificationProvider`. Inicie o app:
```bash
npm start
```

### 5️⃣ Teste
- Abra o app e permita notificações quando perguntado
- Envie uma notificação de teste pelo Firebase Console

---

## 🎨 Como Usar em Seus Componentes

### Padrão 1: Usar o Hook Diretamente

```javascript
import { useNotifications } from "../hooks/useNotifications";

function MeuComponente() {
  const { fcmToken, permission, isGranted, requestPermission } = useNotifications({
    vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
  });

  return (
    <div>
      <p>Permissão: {permission}</p>
      <p>Token: {fcmToken}</p>
      
      {!isGranted && (
        <button onClick={requestPermission}>
          Ativar Notificações
        </button>
      )}
    </div>
  );
}
```

### Padrão 2: Usar o Context (Recomendado)

```javascript
import { useNotificationContext } from "../components/NotificationProvider";

function MeuComponente() {
  const {
    fcmToken,
    permission,
    notifications,
    requestPermission,
    dismissNotification,
  } = useNotificationContext();

  return (
    <div>
      {/* Seu JSX */}
    </div>
  );
}
```

### Padrão 3: Reação a Notificações Específicas

```javascript
import { useEffect } from "react";
import { useNotificationContext } from "../components/NotificationProvider";

function FacilityPage() {
  const { notifications } = useNotificationContext();

  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotif = notifications[0];

      // Verifique tipo de notificação
      if (lastNotif.data?.type === "facility_update") {
        console.log("Facilidade atualizada!");
        // Recarregue dados, anime tela, etc
      }
    }
  }, [notifications]);

  return <div>Página de Facilidades</div>;
}
```

---

## 📨 Estrutura de uma Notificação

Quando uma notificação é recebida, você recebe um objeto com:

```javascript
{
  id: 1234567890,
  title: "Título da Notificação",
  body: "Corpo da mensagem",
  image: "https://...", // Imagem (opcional)
  icon: "https://...",  // Ícone (opcional)
  data: {
    // Dados customizados
    type: "facility_update",
    facilityId: "123",
    userId: "user456"
  },
  timestamp: "2024-05-18T14:30:00Z"
}
```

---

## 🔗 Integração com Autenticação

Quando o usuário faz login, vincule o token FCM ao usuário:

```javascript
import { useNotificationContext } from "../components/NotificationProvider";
import { sendTokenToBackend } from "../services/notificationService";

function LoginPage() {
  const { fcmToken, requestPermission } = useNotificationContext();

  const handleLogin = async (email, password) => {
    // Autentique o usuário
    const user = await authenticateUser(email, password);

    // Solicite permissão se não tem
    if (!fcmToken) {
      await requestPermission();
    }

    // Envie o token ao backend associado ao usuário
    if (fcmToken) {
      await sendTokenToBackend(
        user.id,
        fcmToken,
        `${process.env.REACT_APP_API_URL}`
      );
    }

    // Continue com login...
  };

  return (/* Seu formulário de login */);
}
```

---

## 🛠️ API - Funções Disponíveis

### `notificationService.js`

```javascript
// Solicita permissão ao usuário
requestNotificationPermission()
  // → "granted" | "denied" | "default"

// Obtém o token FCM
getFCMToken(vapidKey)
  // → Promise<string|null>

// Limpa o token do localStorage
clearFCMToken()
  // → void

// Obtém token já armazenado
getStoredFCMToken()
  // → string|null

// Verifica permissão
isNotificationPermissionGranted()
  // → boolean

// Escuta mensagens em foreground
onMessageListener(callback)
  // → unsubscribe function

// Envia token ao backend
sendTokenToBackend(userId, fcmToken, backendUrl)
  // → Promise<Response>
```

### `useNotifications` Hook

```javascript
const {
  fcmToken,           // Token FCM do usuário
  permission,         // "granted" | "denied" | "default"
  isLoading,          // boolean
  error,              // Error ou null
  isGranted,          // boolean - atalho para permission === "granted"
  isDenied,           // boolean
  requestPermission,  // async function
  cleanup,            // function - limpa tudo
} = useNotifications(options);
```

### `useNotificationContext` Hook

```javascript
const {
  fcmToken,
  permission,
  isLoading,
  error,
  isGranted,
  requestPermission,
  cleanup,
  notifications,                // Array de notificações recebidas
  currentNotification,           // Última notificação
  showNotification,              // boolean
  dismissNotification,           // function
  clearNotificationHistory,      // function
  removeNotification,            // function(notifId)
} = useNotificationContext();
```

---

## 🌐 Exemplo Completo: Header com Status de Notificações

```javascript
// src/components/HeaderWithNotifications.js
import React from "react";
import { useNotificationContext } from "./NotificationProvider";

export const HeaderWithNotifications = () => {
  const { isGranted, requestPermission, notifications } = useNotificationContext();

  return (
    <header style={{ padding: "12px 20px", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Pampa Saúde</h1>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Ícone de notificações */}
          <button
            onClick={() => isGranted || requestPermission()}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            🔔
            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {notifications.length}
              </span>
            )}
          </button>

          {/* Indicador de status */}
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: isGranted ? "#4CAF50" : "#ccc",
            }}
            title={isGranted ? "Notificações ativas" : "Notificações inativas"}
          />
        </div>
      </div>
    </header>
  );
};
```

---

## 📋 Exemplos de Notificações do Backend

### Notificação de Atualização de Facilidade

```javascript
// Backend (Node.js)
await messaging.send({
  notification: {
    title: "Facilidade Atualizada",
    body: "Clínica Central - Horário expandido até 22h",
    image: "https://...",
  },
  data: {
    type: "facility_update",
    facilityId: "clinic-central-123",
    action: "open_facility",
  },
  token: userFcmToken,
});
```

### Notificação de Serviço Disponível

```javascript
await messaging.send({
  notification: {
    title: "Novo Serviço",
    body: "Vacinação de gripe disponível em sua unidade",
  },
  data: {
    type: "service_available",
    serviceId: "vaccine-flu",
    facilityId: "unit-123",
  },
  token: userFcmToken,
});
```

---

## 🐛 Debugging

### Console do Navegador
```javascript
// Ver logs de inicialização
// F12 → Console
// Procure por: "Token FCM obtido com sucesso"
```

### DevTools - Service Worker
```
F12 → Application → Service Workers
Verifique se firebase-messaging-sw.js está registrado
```

### DevTools - Storage
```
F12 → Application → Local Storage
Verifique se existem:
  - fcm_token
  - notification_permission
```

### Testar Offline
```
F12 → Network → Offline
Feche o app
Envie notificação do Firebase Console
Reabra o app - deve receber a notificação
```

---

## ⚠️ Considerações Importantes

### Segurança
- ✅ Chaves VAPID públicas podem ficar no frontend
- ✅ Tokens FCM são específicos por dispositivo
- ❌ NUNCA compartilhe a chave privada do Service Account

### Privacidade
- Informar ao usuário que será notificado
- Respeitar a permissão negada
- Permitir desabilitar notificações

### Performance
- Tokens expiraram, renove periodicamente
- Máximo 50 notificações em história
- Service Worker limpo automaticamente

### PWA Instalado
- Notificações funcionam em PWA instalado
- Service Worker permanece ativo em background
- Battery: notificações usam pouca energia

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) → Troubleshooting
2. Confira console do navegador para erros
3. Valide `.env.local` com credenciais corretas
4. Teste notificação pelo Firebase Console primeiro

---

## ✅ Checklist de Produção

- [ ] Variáveis de ambiente configuradas
- [ ] Firebase Project criado e ativo
- [ ] Service Worker registrado
- [ ] Testado em múltiplos navegadores
- [ ] Backend enviando tokens corretamente
- [ ] Notificações aparecem em foreground e background
- [ ] PWA funciona com notificações
- [ ] Chaves privadas não estão no repositório
- [ ] Tratamento de erros implementado
- [ ] Monitoramento de erros configurado (Sentry, LogRocket, etc)
