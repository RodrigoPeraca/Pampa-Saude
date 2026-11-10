# Guia TWA do Pampa Saúde

## 0. Troque estes placeholders

Antes de executar qualquer comando, substitua estes valores:

- <SEU-DOMINIO> = https://pampa-saude.vercel.app
- <SEU-USUARIO> = usuário do Windows
- <SHA256_DO_CERTIFICADO_DE_APP_SIGNING> = fingerprint SHA-256 da Play Store
- <CAMINHO-DO-APK> = caminho do APK gerado para teste local

Use sempre HTTPS real. Domínio do projeto:

```text
https://pampa-saude.vercel.app
```

## 1. Checagem rápida do PWA

Checklist no Chrome DevTools/Lighthouse:

- HTTPS: abra a URL publicada e confirme cadeado verde em DevTools > Security.
- manifest.json: DevTools > Application > Manifest.
- service worker: DevTools > Application > Service Workers.
- offline básico: DevTools > Network > Offline e recarregue.

Já existe no repositório:

- Manifest: [public/manifest.json](public/manifest.json)
- Service worker: [public/service-worker.js](public/service-worker.js)
- Registro do service worker: [src/index.js](src/index.js)
- HTML com meta tags mobile: [public/index.html](public/index.html)

## 2. Dependências

```bash
winget install -e --id OpenJS.NodeJS.LTS
winget install -e --id EclipseAdoptium.Temurin.17.JDK
winget install -e --id Google.AndroidStudio
npm install -g @bubblewrap/cli
bubblewrap --version
```

Se precisar do SDK Android manualmente:

```bash
"C:\Users\<SEU-USUARIO>\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" "cmdline-tools;latest"
```

## 3. Inicializar TWA

```bash
bubblewrap init --manifest https://pampa-saude.vercel.app/manifest.json
```

Valores sugeridos:

- applicationId: com.pampasaude.app
- appName: Pampa Saúde
- domain: https://pampa-saude.vercel.app

Se o assistente pedir origin, use exatamente https://pampa-saude.vercel.app, sem barra no final.

## 4. Keystore e fingerprint

```bash
keytool -genkeypair -v -keystore pampa-saude-upload.jks -alias pampa-saude-upload -keyalg RSA -keysize 2048 -validity 10000
keytool -list -v -keystore pampa-saude-upload.jks -alias pampa-saude-upload
bubblewrap fingerprint --keystore pampa-saude-upload.jks --alias pampa-saude-upload
```

## 5. assetlinks.json

Publicar em:

https://<SEU-DOMINIO>/.well-known/assetlinks.json
https://pampa-saude.vercel.app/.well-known/assetlinks.json

Arquivo pronto no repositório:

- [public/.well-known/assetlinks.json](public/.well-known/assetlinks.json)

Validar:

```bash
curl -i https://pampa-saude.vercel.app/.well-known/assetlinks.json
```

Resultado esperado: HTTP 200, `content-type: application/json` e o JSON correto no corpo.

## 6. Build e testes

```bash
bubblewrap build
adb logcat
adb install -r <CAMINHO-DO-APK>
```

Se sair só AAB, use bundletool para instalar no aparelho antes da Play Store.

Checklist Android:

- abre sem barra do navegador
- navegação interna funciona
- botão voltar se comporta corretamente
- offline básico funciona
- ícone e nome aparecem corretos

## 7. Publicação na Play Store

- criar app no Play Console
- subir o AAB
- preencher classificação de conteúdo
- adicionar política de privacidade
- publicar primeiro em teste interno
- fazer rollout gradual para produção

Na Play Console, a associação com TWA depende do `assetlinks.json` correto e do fingerprint certo.

## 8. Execução em ordem

```bash
# 1) Instalar base
winget install -e --id OpenJS.NodeJS.LTS
winget install -e --id EclipseAdoptium.Temurin.17.JDK
winget install -e --id Google.AndroidStudio
npm install -g @bubblewrap/cli
bubblewrap --version

# 2) Instalar SDK Android se necessário
"C:\Users\<SEU-USUARIO>\AppData\Local\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" "cmdline-tools;latest"

# 3) Inicializar TWA
bubblewrap init --manifest https://pampa-saude.vercel.app/manifest.json

# 4) Gerar assinatura local
keytool -genkeypair -v -keystore pampa-saude-upload.jks -alias pampa-saude-upload -keyalg RSA -keysize 2048 -validity 10000
keytool -list -v -keystore pampa-saude-upload.jks -alias pampa-saude-upload
bubblewrap fingerprint --keystore pampa-saude-upload.jks --alias pampa-saude-upload

# 5) Publicar assetlinks.json
# URL: https://pampa-saude.vercel.app/.well-known/assetlinks.json

# 6) Build e teste
bubblewrap build
adb logcat
adb install -r <CAMINHO-DO-APK>
```

Sequência curta:

1. Instalar dependências.
2. Inicializar a TWA.
3. Gerar keystore e fingerprint.
4. Publicar `assetlinks.json`.
5. Build, instalar e testar no Android.