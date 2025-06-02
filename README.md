# 🚀 TRACIONAR - Demo Completa

![TRACIONAR Logo](https://img.shields.io/badge/TRACIONAR-Demo-blue?style=for-the-badge&logo=react)

## 📋 Visão Geral

O **TRACIONAR** é um sistema SaaS completo para análise de métricas do Facebook Ads. Esta demo inclui todas as funcionalidades principais com dados fictícios para demonstração.

### ✨ Funcionalidades Implementadas

- **🔐 Sistema de Login** - Autenticação JWT segura
- **📊 Dashboard Interativo** - Métricas em tempo real com gráficos
- **📈 Gestão de Campanhas** - Visualização detalhada de campanhas e adsets
- **📋 Sistema de Relatórios** - Geração e envio automático via WhatsApp
- **🔔 Alertas Inteligentes** - Notificações baseadas em performance
- **👤 Perfil do Usuário** - Gestão de créditos e integrações

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + Express.js
- **JWT** para autenticação
- **bcryptjs** para criptografia
- **CORS** para integração frontend/backend

### Frontend
- **React 18** (via CDN)
- **Tailwind CSS** para estilização
- **Recharts** para gráficos
- **Font Awesome** para ícones

## 📦 Estrutura de Arquivos

```
tracionar-demo/
├── server.js          # Backend da aplicação
├── package.json       # Dependências do projeto
├── public/
│   └── index.html     # Frontend da aplicação
└── README.md          # Este arquivo
```

## 🔐 Dados de Teste

Para acessar a demo, use estas credenciais:

```
Email: joao@tracionar.com
Senha: 123456
```

## 📊 Dados Fictícios Incluídos

### Campanhas do Facebook Ads
- **Campanha Black Friday 2024**
  - Investimento: R$ 12.500
  - ROAS: 4.2x
  - Conversões: 425
  - 2 Adsets com performance detalhada

- **Lançamento Produto Natal**
  - Investimento: R$ 8.400
  - ROAS: 3.8x
  - Conversões: 284
  - 1 Adset com métricas completas

### Métricas e Relatórios
- **7 dias** de dados de performance diária
- **2 Relatórios** (concluído e processando)
- **3 Alertas** de diferentes severidades
- **500 Créditos** para demonstração
- **Integrações** simuladas (Facebook, WhatsApp, Asaas)

## 🚀 Deploy no Render

### Pré-requisitos
- Conta no [Render](https://render.com)
- Conta no [GitHub](https://github.com)

### Passo a Passo

1. **Criar repositório no GitHub:**
   - Acesse [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `tracionar-demo`
   - Marque "Add a README file"
   - Clique "Create repository"

2. **Upload dos arquivos:**
   - No repositório, clique "uploading an existing file"
   - Faça upload dos 4 arquivos desta demo
   - Commit: "Demo completa do TRACIONAR"

3. **Deploy no Render:**
   - Acesse [render.com](https://render.com)
   - Clique "New" → "Web Service"
   - Conecte seu repositório GitHub
   - Configure:
     ```
     Name: tracionar-demo
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

4. **Aguardar deploy (2-3 minutos)**

5. **Acessar sua URL:**
   ```
   https://tracionar-demo.onrender.com
   ```

## 💰 Custos

- **Render (Gratuito):** Hiberna após 15min sem uso
- **Render (Pago):** $7/mês - Sempre ativo
- **Hosting próprio:** Variável

## 🎯 Funcionalidades da Demo

### 1. Tela de Login
- Design moderno com gradiente
- Validação de formulário
- Credenciais pré-preenchidas
- Tratamento de erros

### 2. Dashboard Principal
- Métricas principais (Investimento, ROAS, Conversões, CPC)
- Gráficos interativos de performance
- Top campanhas por performance
- Alertas recentes não lidos
- Resumo de performance

### 3. Gestão de Campanhas
- Lista de campanhas ativas
- Detalhes completos de cada campanha
- Performance dos adsets
- Métricas detalhadas (CTR, CPC, CPA, ROAS)
- Gráficos de performance diária

### 4. Sistema de Relatórios
- Lista de relatórios gerados
- Geração de novos relatórios
- Download de PDFs (simulado)
- Envio via WhatsApp
- Status de processamento

### 5. Alertas Inteligentes
- Diferentes tipos de severidade
- Filtros por status e tipo
- Marcação como lido/não lido
- Estatísticas de alertas
- Notificações em tempo real

### 6. Perfil do Usuário
- Edição de informações pessoais
- Gestão de créditos com histórico
- Status das integrações
- Configurações de segurança
- Planos e upgrades

## 🔧 Customizações

### Adicionar Novas Campanhas
```javascript
// No server.js, edite o array facebookCampaigns
const facebookCampaigns = [
  {
    id: 'nova_campanha',
    name: 'Minha Nova Campanha',
    status: 'ACTIVE',
    total_spend: 5000,
    roas: 3.5,
    // ... outras propriedades
  }
];
```

### Modificar Métricas
```javascript
// Altere o array dailyMetrics
const dailyMetrics = [
  { 
    date: '2024-06-08', 
    spend: 500, 
    revenue: 2000, 
    roas: 4.0,
    clicks: 600, 
    impressions: 35000 
  }
];
```

## 🌐 API Endpoints Disponíveis

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `GET /api/auth/verify` - Verificar token

### Facebook Ads
- `GET /api/facebook/campaigns` - Listar campanhas
- `GET /api/facebook/campaigns/:id` - Detalhes da campanha
- `GET /api/facebook/campaigns/:id/metrics` - Métricas da campanha

### Dashboard
- `GET /api/dashboard/overview` - Visão geral do dashboard
- `GET /api/metrics/period` - Métricas por período

### Relatórios
- `GET /api/reports` - Listar relatórios
- `POST /api/reports/generate` - Gerar novo relatório

### Alertas
- `GET /api/alerts` - Listar alertas
- `PATCH /api/alerts/:id/read` - Marcar como lido

### Usuário
- `GET /api/user/profile` - Perfil do usuário
- `PATCH /api/user/profile` - Atualizar perfil
- `GET /api/user/credits` - Status dos créditos

### WhatsApp
- `POST /api/whatsapp/send-report` - Enviar relatório via WhatsApp

## 📱 Compatibilidade

A interface é totalmente responsiva e funciona em:
- **Desktop:** 1920x1080+
- **Tablet:** 768x1024
- **Mobile:** 375x667+

## 🔒 Segurança

- Autenticação JWT com expiração
- Senhas criptografadas com bcrypt
- Middleware de autenticação em rotas protegidas
- CORS configurado adequadamente
- Validação de entrada de dados

## 🚀 Próximos Passos para Produção

### 1. Banco de Dados Real
- PostgreSQL com Supabase
- Prisma ORM para modelagem
- Migrations para versionamento
- Backup automático

### 2. Integrações Reais
- Facebook Graph API
- WhatsApp Business API
- Asaas Payment Gateway
- OpenAI GPT-4
- SendGrid para emails

### 3. Deploy e Infraestrutura
- Vercel/Netlify para frontend
- Railway/Heroku para backend
- Cloudflare para CDN
- Redis para cache

### 4. Monitoramento e Analytics
- Sentry para error tracking
- Google Analytics
- Logs estruturados
- Health checks

### 5. Funcionalidades Avançadas
- Automação de campanhas
- Machine Learning para otimização
- Webhooks do Facebook
- Integração com Google Ads
- Dashboard em tempo real

## 📞 Suporte Técnico

Esta é uma demo completa do sistema TRACIONAR desenvolvida para demonstrar todas as funcionalidades principais.

### Contato para Implementação
- 📧 **Email:** dev@tracionar.com
- 💬 **WhatsApp:** +55 11 99988-7766
- 🌐 **Website:** https://tracionar.com
- 💼 **LinkedIn:** /company/tracionar

### Serviços Disponíveis
- ✅ Implementação customizada
- ✅ Integração com sistemas existentes
- ✅ Treinamento da equipe
- ✅ Suporte técnico dedicado
- ✅ Hospedagem e manutenção

---

**© 2024 TRACIONAR - Sistema de Análise Facebook Ads**  
*Desenvolvido com ❤️ para profissionais de marketing digital*

![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)