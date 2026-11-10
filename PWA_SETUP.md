# PWA Setup - AppJulio

## ✅ O que foi implementado:

1. **Service Worker** - Cache offline e sincronização
2. **Manifest.json** - Metadados da PWA para iOS e Android
3. **index.html** - Meta tags otimizadas para mobile
4. **Registro do Service Worker** - Automático no index.js

---

## 🚀 Como testar localmente:

### **1. Build da aplicação**
```bash
npm run build
```

### **2. Instalar servidor HTTP (recomendado)**
```bash
npm install -g serve
serve -s build
```

A app estará em: `http://localhost:3000`

---

## 📱 Como instalar como PWA:

### **Desktop (Chrome/Edge):**
1. Abra a aplicação no navegador
2. Clique no ícone de "Instalar" (canto superior direito da barra de endereço)
3. Clique em "Instalar"

### **Mobile Android (Chrome):**
1. Abra em `chrome://flags`
2. Procure por "WebAPK"
3. Instale normalmente ou use o menu "Adicionar à tela inicial"

### **Mobile iOS (Safari):**
1. Abra em Safari
2. Clique em "Compartilhar"
3. Escolha "Adicionar à tela inicial"

---

## 🔧 Personalizações recomendadas:

### **1. Adicionar ícone maskable (recomendado)**
- Crie um ícone 512x512px com espaço para recorte
- Salve como `logo512-maskable.png` na pasta `public/`
- Adicione ao `manifest.json`:
```json
{
  "src": "logo512-maskable.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "maskable"
}
```

### **2. Melhorar estratégia de cache**
- Edite `public/service-worker.js`
- Altere a estratégia de cache conforme necessário

### **3. Adicionar PWA update prompt**
- Crie um component React para notificar sobre atualizações
- Implemente na pasta `src/components/UpdatePrompt.js`

---

## 🌐 Deploy para Produção:

### **Opções:**
- **Vercel** (recomendado): `vercel deploy`
- **Netlify**: Conecte seu repositório GitHub
- **GitHub Pages**: Configure no `package.json`
- **Heroku**: Use `git push heroku main`

### **Verificar PWA:**
Use o Chrome DevTools:
1. F12 → Application → Manifest
2. Verifique se tudo está verde ✅

---

## 📊 Checklist PWA:

- ✅ HTTPS em produção (obrigatório)
- ✅ Service Worker registrado
- ✅ Manifest.json válido
- ✅ Ícones 192x192 e 512x512
- ✅ Meta tags de mobile
- ✅ Responsive design
- ✅ Display "standalone"

---

## 🐛 Troubleshooting:

**Service Worker não aparece?**
- Limpe cache: Ctrl+Shift+Delete
- Abra em modo incógnito
- Verifique console: F12 → Console

**App não instala?**
- Certifique-se que está em HTTPS (produção)
- Verifique manifest.json no DevTools
- Restart do navegador

**Offline não funciona?**
- Revise as URLs no `service-worker.js`
- Confirme que os arquivos estão no cache
