# 🔥 Guia Completo: Configurar Firebase Cloud Messaging

## 📋 Índice
1. [Criar Projeto Firebase](#criar-projeto-firebase)
2. [Gerar Credenciais](#gerar-credenciais)
3. [Configurar Variáveis de Ambiente](#configurar-variáveis)
4. [Registrar Service Worker](#registrar-service-worker)
5. [Testar Localmente](#testar-localmente)
6. [Enviar Notificações do Backend](#enviar-do-backend)
7. [Troubleshooting](#troubleshooting)

---

## 1. Criar Projeto Firebase {#criar-projeto-firebase}

### Passo 1: Acesse o Console Firebase
1. Acesse https://console.firebase.google.com
2. Clique em **"Criar um novo projeto"** ou **"Adicionar projeto"**

### Passo 2: Preencha as informações do projeto
```
Nome do projeto: Pampa Saúde
Analytics: Inserido no projeto
Localização: Brazil
```

### Passo 3: Aguarde a criação
- O Firebase criará o projeto automaticamente

---

## 2. Gerar Credenciais {#gerar-credenciais}

### Passo 1: Obtenha as Credenciais da Web
1. No console do Firebase, clique em **⚙️ Configurações** (canto superior esquerdo)
2. Vá para **Geral**
3. Desça até **Seus aplicativos**
4. Clique em **Adicionar app** → **Web**
5. Nomeie como: `Pampa Saúde Web`
6. Copie o objeto `firebaseConfig` que aparecerá

### Exemplo de firebaseConfig:
```javascript
{
  apiKey: "AIzaSyDEXAMPLE123456789abcdef",
  authDomain: "pampa-saude.firebaseapp.com",
  projectId: "pampa-saude-12345",
  storageBucket: "pampa-saude-12345.appspot.com",
  messagingSenderId: "123456789123",
  appId: "1:123456789123:web:abcdefghij1234567"
}
```

### Passo 2: Obtenha a Chave VAPID
1. No console do Firebase, vá para **Cloud Messaging** (no menu lateral)
2. Você verá uma seção **"Certificados de Web Push"**
3. Na aba padrão, clique em **"Gerar par de chaves"**
4. Copie a **Chave pública** (VAPID Key)

⚠️ **IMPORTANTE**: A chave pública é segura para usar no frontend. A chave privada deve ficar apenas no backend.

---

## 3. Configurar Variáveis de Ambiente {#configurar-variáveis}

### Passo 1: Crie o arquivo `.env.local`
Na raiz do seu projeto (mesmo nível que `package.json`):

```bash
# .env.local

# Firebase
REACT_APP_FIREBASE_API_KEY=AIzaSyDEXAMPLE123456789abcdef
REACT_APP_FIREBASE_AUTH_DOMAIN=pampa-saude.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=pampa-saude-12345
REACT_APP_FIREBASE_STORAGE_BUCKET=pampa-saude-12345.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789123
REACT_APP_FIREBASE_APP_ID=1:123456789123:web:abcdefghij1234567

# FCM VAPID
REACT_APP_FCM_VAPID_KEY=BI_YOUR_PUBLIC_VAPID_KEY_HERE

# Backend API
REACT_APP_API_URL=http://localhost:3001

# Notificações
REACT_APP_AUTO_REQUEST_NOTIFICATIONS=true
```

### Passo 2: Atualize `public/firebase-messaging-sw.js`
Abra o arquivo `public/firebase-messaging-sw.js` e substitua:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDEXAMPLE123456789abcdef",
  authDomain: "pampa-saude.firebaseapp.com",
  projectId: "pampa-saude-12345",
  storageBucket: "pampa-saude-12345.appspot.com",
  messagingSenderId: "123456789123",
  appId: "1:123456789123:web:abcdefghij1234567"
};
```

**⚠️ IMPORTANTE**: O Service Worker não consegue ler `.env` files, então você deve hardcodar as credenciais lá ou usar um build step para injeta-las.

---

## 4. Registrar Service Worker {#registrar-service-worker}

Abra `public/index.html` e procure por `registerServiceWorker`:

```html
<!-- Após o script do React -->
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(reg => console.log('Firebase SW registrado:', reg))
      .catch(err => console.error('Erro ao registrar Firebase SW:', err));
  }
</script>
```

**Ou**, se você estiver usando `serviceWorkerRegistration.js`:

Adicione este código em `src/serviceWorkerRegistration.js`:

```javascript
// Registra Firebase Messaging Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => {
      console.log('Firebase Messaging Service Worker registrado:', reg);
    })
    .catch(err => {
      console.warn('Erro ao registrar Firebase SW:', err);
    });
}
```

---

## 5. Testar Localmente {#testar-localmente}

### Passo 1: Inicie seu app React
```bash
npm start
```

### Passo 2: Abra o DevTools (F12)
- Vá para **Application** → **Manifest**
- Verifique se o manifest.json está configurado
- Vá para **Service Workers**
- Verifique se o firebase-messaging-sw.js está registrado

### Passo 3: Teste a permissão
1. Abra o console (F12 → Console)
2. Você deve ver mensagens de inicialização
3. Permite a notificação quando o navegador perguntar
4. Verifique se o token FCM foi gerado

### Passo 4: Envie uma notificação de teste pelo Firebase Console

1. No Firebase Console, vá para **Cloud Messaging**
2. Clique em **Enviar sua primeira mensagem**
3. Preencha:
   - **Título da Notificação**: "Teste"
   - **Texto da Notificação**: "Notificação de teste"
   - **Target**: Selecione seu aplicativo web

4. Clique em **Enviar mensagem**

Você deve ver a notificação aparecer!

---

## 6. Enviar Notificações do Backend {#enviar-do-backend}

### Exemplo: Node.js/Express

```javascript
// backend/notificationService.js
const admin = require('firebase-admin');

// Inicialize o SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'seu-projeto-id'
});

const messaging = admin.messaging();

async function sendNotificationToUser(userId, fcmToken, title, body, data = {}) {
  try {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        timestamp: new Date().toISOString(),
        ...data
      },
      token: fcmToken,
    };

    const response = await messaging.send(message);
    console.log('Notificação enviada:', response);
    return response;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    throw error;
  }
}

// Exemplo de uso em rota
app.post('/api/send-notification', async (req, res) => {
  const { userId, title, body, data } = req.body;

  // Busque o fcmToken do banco de dados
  const user = await User.findById(userId);

  if (!user || !user.fcmToken) {
    return res.status(404).json({ error: 'Token não encontrado' });
  }

  try {
    await sendNotificationToUser(userId, user.fcmToken, title, body, data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Instalação do Firebase Admin SDK
```bash
npm install firebase-admin
```

### Obter Service Account Key

1. No Firebase Console, vá para **⚙️ Configurações** → **Contas de Serviço**
2. Clique em **Gerar Nova Chave Privada**
3. Salve o arquivo JSON com segurança (NUNCA comite no GitHub)
4. Use esse arquivo para inicializar o SDK

---

## 7. Troubleshooting {#troubleshooting}

### ❌ "Firebase Messaging não é suportado neste navegador"
- Verifique se o navegador suporta Service Workers e Notifications API
- Moder: Chrome, Firefox, Edge suportam
- Safari: suporte limitado (PWA apenas)

### ❌ "Permissão de notificação foi negada"
- O usuário clicar em "Bloquear" no popup de permissão
- Solução: Dirija o usuário nas configurações do navegador
- Chrome: Configurações → Privacidade → Notificações

### ❌ "Token FCM não é gerado"
- Verifique se o `vapidKey` está correto
- Verifique se o Service Worker está registrado
- Limpe cache e cookies do navegador

### ❌ "Notificação não aparece em background"
- Verifique se o Service Worker está ativo
- DevTools → Application → Service Workers
- O payload deve ter `notification` para aparecer automaticamente

### ❌ "403 Erro ao enviar do backend"
- Verifique se o Service Account JSON está correto
- Verifique permissões do Firebase no console
- Tente criar um novo Token de API

---

## 📚 Recursos Úteis

- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

## ✅ Checklist de Implementação

- [ ] Projeto Firebase criado
- [ ] Credenciais copiadas para `.env.local`
- [ ] VAPID Key configurada
- [ ] `firebase.js` atualizado
- [ ] `firebase-messaging-sw.js` atualizado
- [ ] Service Worker registrado
- [ ] Teste local funcionando
- [ ] Backend configurado
- [ ] Notificações sendo enviadas com sucesso
