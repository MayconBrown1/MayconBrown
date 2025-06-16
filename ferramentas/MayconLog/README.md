
# MayconLog - Sistema de Entregas

Sistema completo de entregas desenvolvido como PWA (Progressive Web App) com Firebase e TailwindCSS.

## 🚀 Recursos

- **PWA Completo**: Instalável e funciona offline
- **Autenticação Firebase**: Sistema seguro de login para 3 tipos de usuário
- **Responsivo**: Design que funciona em desktop e mobile
- **Tempo Real**: Atualizações em tempo real via Firestore
- **Rastreamento Público**: Clientes podem rastrear pedidos sem login

## 👥 Tipos de Usuário

### 🏪 Loja
- Criar e gerenciar pedidos de entrega
- Gerar links de rastreamento para clientes
- Acompanhar status das entregas
- Dashboard com estatísticas

### 🚚 Entregador
- Ver pedidos disponíveis
- Aceitar entregas
- Atualizar status (aceito → a caminho → entregue)
- Histórico de entregas

### 👨‍💼 Admin
- Aprovar cadastros de lojas e entregadores
- Monitorar sistema
- Dashboard administrativo

## 🛠️ Configuração do Firebase

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nomeie o projeto (ex: "mayconlog-sistema")
4. Configure Google Analytics (opcional)

### 2. Configurar Authentication

1. No painel do Firebase, vá em **Authentication**
2. Clique em **Sign-in method**
3. Habilite **Email/Password**

### 3. Configurar Firestore Database

1. Vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Iniciar no modo de teste** (temporariamente)
4. Selecione a região mais próxima

### 4. Configurar Regras do Firestore

Substitua as regras padrão por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários só podem ler/escrever seus próprios dados
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.tipo == 'admin';
    }
    
    // Pedidos
    match /pedidos/{pedidoId} {
      // Loja pode criar e ler seus pedidos
      allow create: if request.auth != null && 
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.tipo == 'loja' &&
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.aprovado == true;
      
      // Loja pode ler seus próprios pedidos
      allow read, update: if request.auth != null && 
        resource.data.lojaId == request.auth.uid;
      
      // Entregador pode ler pedidos disponíveis e atualizar os aceitos por ele
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.tipo == 'entregador' &&
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.aprovado == true;
      
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.tipo == 'entregador' &&
        resource.data.entregadorId == request.auth.uid;
      
      // Admin pode ler tudo
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.tipo == 'admin';
      
      // Permitir leitura pública para rastreamento (apenas com ID específico)
      allow read: if true;
    }
  }
}
```

### 5. Configurar Aplicação Web

1. No painel do Firebase, clique no ícone **Web** (</>)
2. Registre o app com nome "MayconLog"
3. Copie a configuração que aparece
4. Cole no arquivo `src/js/firebase-config.js` substituindo:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id"
};
```

### 6. Criar Primeiro Administrador

1. No Firebase Console, vá em **Authentication**
2. Clique em **Users** → **Add user**
3. Adicione email e senha do admin
4. Anote o **UID** do usuário criado
5. Vá em **Firestore Database**
6. Crie uma coleção `usuarios`
7. Adicione um documento com ID = UID do usuário
8. Preencha os campos:

```json
{
  "tipo": "admin",
  "email": "admin@mayconlog.com",
  "nome": "Administrador",
  "aprovado": true,
  "criadoEm": "timestamp atual"
}
```

## 📱 Instalação Local

1. Clone o repositório
2. Configure o Firebase conforme instruções acima
3. Abra `index.html` em um servidor local
4. Para HTTPS local (necessário para PWA):

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js
npx serve .

# Usando VS Code
# Instale extensão "Live Server"
```

## 🌐 Deploy

### Firebase Hosting (Recomendado)

1. Instale Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Faça login:
```bash
firebase login
```

3. Inicialize o projeto:
```bash
firebase init hosting
```

4. Configure:
   - Pasta pública: raiz do projeto (.)
   - SPA: Não
   - Sobrescrever index.html: Não

5. Deploy:
```bash
firebase deploy
```

### Netlify/Vercel

1. Faça upload dos arquivos para o provedor
2. Configure redirect para rastreamento:
   - Netlify: arquivo `_redirects`
   - Vercel: arquivo `vercel.json`

## 🔧 Uso do Sistema

### Fluxo Completo

1. **Admin** aprova lojas e entregadores
2. **Loja** cria pedidos de entrega
3. **Entregador** aceita pedidos disponíveis
4. **Entregador** atualiza status: aceito → a caminho → entregue
5. **Cliente** rastreia via link público

### URLs Principais

- `/` - Página inicial
- `/admin-login.html` - Login do admin
- `/loja.html` - Portal da loja
- `/entregador.html` - Portal do entregador
- `/rastreio.html?codigo=XXX` - Rastreamento público

## 📊 Tier Gratuito Firebase

O sistema foi otimizado para o tier gratuito:

- **Authentication**: 10k usuários/mês
- **Firestore**: 50k leituras + 20k escritas/dia
- **Hosting**: 10GB armazenamento + 125k visualizações/mês

## 🛡️ Segurança

- Autenticação obrigatória para áreas protegidas
- Regras Firestore que impedem acesso não autorizado
- Validação de dados no frontend
- Tipos de usuário isolados

## 🆘 Suporte

Para dúvidas sobre configuração:

1. Verifique o console do navegador para erros
2. Confirme configuração do Firebase
3. Teste regras do Firestore
4. Verifique se o primeiro admin foi criado corretamente

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.
