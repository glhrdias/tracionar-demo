const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET || 'tracionar-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());

// ========== DADOS FICTÍCIOS ==========

const users = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@tracionar.com',
    password: bcrypt.hashSync('123456', 10),
    credits: 500,
    plan: 'PRO',
    company: 'Marketing Digital LTDA',
    phone: '+5511999887766',
    created_at: '2024-01-15',
    facebook_connected: true
  }
];

const facebookCampaigns = [
  {
    id: 'camp_001',
    name: 'Campanha Black Friday 2024',
    status: 'ACTIVE',
    daily_budget: 500,
    total_spend: 12500,
    impressions: 850000,
    clicks: 15300,
    ctr: 1.8,
    cpc: 0.82,
    cpm: 14.7,
    roas: 4.2,
    conversions: 425,
    conversion_rate: 2.78,
    date_start: '2024-11-01',
    date_end: '2024-11-30',
    adsets: [
      {
        id: 'ads_001',
        name: 'Audiência Lookalike 1%',
        spend: 4200,
        impressions: 280000,
        clicks: 5100,
        conversions: 142,
        cpa: 29.58,
        roas: 4.8
      },
      {
        id: 'ads_002', 
        name: 'Remarketing Carrinho Abandonado',
        spend: 3800,
        impressions: 195000,
        clicks: 4850,
        conversions: 168,
        cpa: 22.62,
        roas: 5.2
      }
    ]
  },
  {
    id: 'camp_002',
    name: 'Lançamento Produto Natal',
    status: 'ACTIVE',
    daily_budget: 300,
    total_spend: 8400,
    impressions: 520000,
    clicks: 9800,
    ctr: 1.9,
    cpc: 0.86,
    cpm: 16.2,
    roas: 3.8,
    conversions: 284,
    conversion_rate: 2.9,
    date_start: '2024-12-01',
    date_end: '2024-12-25',
    adsets: [
      {
        id: 'ads_003',
        name: 'Interesse Natal + Presentes',
        spend: 5100,
        impressions: 310000,
        clicks: 5900,
        conversions: 172,
        cpa: 29.65,
        roas: 3.6
      }
    ]
  }
];

const dailyMetrics = [
  { date: '2024-06-01', spend: 420, revenue: 1680, roas: 4.0, clicks: 512, impressions: 28400 },
  { date: '2024-06-02', spend: 380, revenue: 1596, roas: 4.2, clicks: 465, impressions: 26200 },
  { date: '2024-06-03', spend: 445, revenue: 1780, roas: 4.0, clicks: 543, impressions: 30100 },
  { date: '2024-06-04', spend: 390, revenue: 1716, roas: 4.4, clicks: 487, impressions: 27300 },
  { date: '2024-06-05', spend: 460, revenue: 1932, roas: 4.2, clicks: 564, impressions: 31200 },
  { date: '2024-06-06', spend: 485, revenue: 2037, roas: 4.2, clicks: 592, impressions: 32800 },
  { date: '2024-06-07', spend: 425, revenue: 1785, roas: 4.2, clicks: 518, impressions: 28900 }
];

const reports = [
  {
    id: 1,
    name: 'Relatório Mensal - Maio 2024',
    type: 'monthly',
    period: '2024-05',
    status: 'completed',
    file_url: '/reports/maio-2024.pdf',
    created_at: '2024-06-01T10:30:00Z',
    metrics: {
      total_spend: 13500,
      total_revenue: 56700,
      total_roas: 4.2,
      total_clicks: 16800,
      total_impressions: 945000
    }
  },
  {
    id: 2,
    name: 'Análise de Performance - Semana 22',
    type: 'weekly',
    period: '2024-W22',
    status: 'completed',
    file_url: '/reports/semana-22-2024.pdf',
    created_at: '2024-06-02T09:15:00Z',
    metrics: {
      total_spend: 3150,
      total_revenue: 13230,
      total_roas: 4.2,
      total_clicks: 3850,
      total_impressions: 215000
    }
  }
];

const alerts = [
  {
    id: 1,
    type: 'roas_below_target',
    message: 'ROAS da campanha "Lançamento Produto Natal" está abaixo da meta (3.8 vs 4.0)',
    severity: 'warning',
    campaign_id: 'camp_002',
    created_at: '2024-06-02T14:30:00Z',
    read: false
  },
  {
    id: 2,
    type: 'budget_exhausted',
    message: 'Orçamento diário da campanha "Black Friday 2024" foi esgotado antes das 18h',
    severity: 'info',
    campaign_id: 'camp_001',
    created_at: '2024-06-02T18:45:00Z',
    read: false
  },
  {
    id: 3,
    type: 'high_cpa',
    message: 'CPA do adset "Interesse Natal + Presentes" aumentou 25% nas últimas 24h',
    severity: 'critical',
    adset_id: 'ads_003',
    created_at: '2024-06-02T20:15:00Z',
    read: false
  }
];

// ========== MIDDLEWARES ==========

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// ========== ROTAS API ==========

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Verificar token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// Dashboard
app.get('/api/dashboard/overview', authenticateToken, (req, res) => {
  const totalSpend = facebookCampaigns.reduce((sum, camp) => sum + camp.total_spend, 0);
  const totalImpressions = facebookCampaigns.reduce((sum, camp) => sum + camp.impressions, 0);
  const totalClicks = facebookCampaigns.reduce((sum, camp) => sum + camp.clicks, 0);
  const totalConversions = facebookCampaigns.reduce((sum, camp) => sum + camp.conversions, 0);
  const avgRoas = facebookCampaigns.reduce((sum, camp) => sum + camp.roas, 0) / facebookCampaigns.length;

  res.json({
    period: req.query.period || 'last_30_days',
    summary: {
      total_spend: totalSpend,
      total_impressions: totalImpressions,
      total_clicks: totalClicks,
      total_conversions: totalConversions,
      average_roas: parseFloat(avgRoas.toFixed(2)),
      average_cpc: parseFloat((totalSpend / totalClicks).toFixed(2)),
      average_cpm: parseFloat((totalSpend / totalImpressions * 1000).toFixed(2)),
      conversion_rate: parseFloat((totalConversions / totalClicks * 100).toFixed(2))
    },
    trends: {
      spend_trend: '+12.5%',
      roas_trend: '+8.3%',
      conversions_trend: '+15.2%',
      cpc_trend: '-5.1%'
    },
    daily_metrics: dailyMetrics,
    top_campaigns: facebookCampaigns.slice(0, 5),
    alerts: alerts.filter(a => !a.read).slice(0, 3)
  });
});

// Campanhas
app.get('/api/facebook/campaigns', authenticateToken, (req, res) => {
  res.json({
    data: facebookCampaigns,
    meta: {
      total: facebookCampaigns.length,
      page: 1,
      per_page: 10
    }
  });
});

app.get('/api/facebook/campaigns/:id', authenticateToken, (req, res) => {
  const campaign = facebookCampaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ error: 'Campanha não encontrada' });
  }
  res.json(campaign);
});

// Relatórios
app.get('/api/reports', authenticateToken, (req, res) => {
  res.json({
    data: reports,
    meta: {
      total: reports.length,
      page: 1,
      per_page: 10
    }
  });
});

app.post('/api/reports/generate', authenticateToken, (req, res) => {
  const { type, period } = req.body;
  
  const newReport = {
    id: reports.length + 1,
    name: `Relatório ${type} - ${period}`,
    type,
    period,
    status: 'processing',
    file_url: null,
    created_at: new Date().toISOString()
  };

  reports.push(newReport);

  setTimeout(() => {
    newReport.status = 'completed';
    newReport.file_url = `/reports/${type}-${period}.pdf`;
  }, 3000);

  res.json(newReport);
});

// Alertas
app.get('/api/alerts', authenticateToken, (req, res) => {
  const { unread_only } = req.query;
  
  let filteredAlerts = alerts;
  if (unread_only === 'true') {
    filteredAlerts = alerts.filter(a => !a.read);
  }

  res.json({
    data: filteredAlerts,
    meta: {
      total: filteredAlerts.length,
      unread_count: alerts.filter(a => !a.read).length
    }
  });
});

app.patch('/api/alerts/:id/read', authenticateToken, (req, res) => {
  const alert = alerts.find(a => a.id === parseInt(req.params.id));
  if (!alert) {
    return res.status(404).json({ error: 'Alerta não encontrado' });
  }

  alert.read = true;
  res.json({ message: 'Alerta marcado como lido' });
});

// Perfil
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.get('/api/user/credits', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  res.json({
    current_credits: user.credits,
    plan: user.plan,
    usage_this_month: 127,
    credit_history: [
      { date: '2024-06-01', amount: 100, type: 'purchase', description: 'Recarga de créditos' },
      { date: '2024-05-25', amount: -25, type: 'usage', description: 'Geração de relatório' },
      { date: '2024-05-20', amount: -15, type: 'usage', description: 'Sincronização de dados' }
    ]
  });
});

// WhatsApp
app.post('/api/whatsapp/send-report', authenticateToken, (req, res) => {
  const { phone, report_id, message } = req.body;
  
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Relatório enviado via WhatsApp',
      sent_to: phone,
      sent_at: new Date().toISOString()
    });
  }, 1000);
});

// ========== SERVIR FRONTEND ==========
// ESTA É A LINHA CRUCIAL QUE ESTAVA ERRADA!
app.get('*', (req, res) => {
  // Se for uma rota da API, retorna 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // Para todas as outras rotas, serve o index.html da RAIZ
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ========== SERVIDOR ==========
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor TRACIONAR rodando na porta ${PORT}`);
  console.log(`📊 Acesse: http://${HOST}:${PORT}`);
  console.log(`🔑 Email de teste: joao@tracionar.com`);
  console.log(`🔑 Senha de teste: 123456`);
});