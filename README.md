# Pampa Saúde

Uma aplicação web progressiva (PWA) desenvolvida em React para facilitar o acesso às unidades de saúde em Bagé, RS. O app fornece informações detalhadas sobre Estratégias Saúde da Família (ESF) e Unidades Básicas de Saúde (UBS), incluindo endereços, horários de funcionamento, telefones de contato, serviços oferecidos e links para localização no Google Maps.

## 🚀 Funcionalidades

- **Lista de Unidades de Saúde**: Visualize todas as ESFs e UBSs disponíveis na cidade
- **Informações Detalhadas**: Endereço, horário, telefone, serviços e notas sobre cada unidade
- **Navegação Integrada**: Links diretos para Google Maps para localização
- **Interface Responsiva**: Otimizada para desktop e dispositivos móveis
- **PWA**: Instalável como aplicativo nativo em dispositivos móveis e desktop
- **Modo Offline**: Funciona parcialmente offline graças ao service worker

## 🛠️ Tecnologias Utilizadas

- **React 19.2.0**: Biblioteca JavaScript para construção de interfaces
- **React Scripts**: Ferramentas de build e desenvolvimento
- **PWA**: Service Worker para cache offline
- **CSS**: Estilização personalizada
- **Jest & Testing Library**: Testes automatizados

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/RodrigoPeraca/Pampa-Sa-de.git
   cd Pampa-Sa-de
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📱 Instalação como PWA

### Desktop (Chrome/Edge):
1. Abra a aplicação no navegador
2. Clique no ícone de instalação na barra de endereço
3. Clique em "Instalar"

### Mobile Android:
1. Abra no Chrome
2. Toque em "Adicionar à tela inicial" no menu

### Mobile iOS:
1. Abra no Safari
2. Toque em "Compartilhar" > "Adicionar à tela inicial"

## 🏗️ Build para Produção

```bash
npm run build
```

Para testar o build localmente:
```bash
npm install -g serve
serve -s build
```

## 🧪 Testes

```bash
npm test
```
Para testas todas as funcionalidades apenas

```bash
npm test App.test.js
```

## 📁 Estrutura do Projeto

```
Pampa-Sa-de/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── ...
├── src/
│   ├── Components
│   │    ├── Header.js
│   │    └── ...
│   ├── data
│   │    ├── constants.js
│   │    └── ...
│   ├── hooks
│   │    └── useFacilities.js
│   ├── App.js
│   ├── App.css
│   └── ...
├── build/
├── package.json
└── README.md
```

## 🤝 Contribuição

Construido para soluções para a comunidade de bagé e desenvolvido pela equipe Tecnologia 1 do Pampa-Saúde

## 📄 Licença

Este projeto é privado e não possui licença pública.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
