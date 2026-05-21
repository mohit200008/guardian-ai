# Guardian AI — Project Structure

## Frontend (`frontend/`)

```
frontend/
├── public/
├── src/
│   ├── api/                 # HTTP client + analyze endpoints
│   ├── components/
│   │   ├── ui/              # Button, GlassCard
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TrustScoreCard.jsx
│   │   ├── ThreatAnalysisCard.jsx
│   │   ├── Loader.jsx
│   │   ├── RiskMeter.jsx
│   │   └── AIExplanationPanel.jsx
│   ├── context/             # Analysis result state
│   ├── hooks/
│   ├── layouts/             # PublicLayout, MainLayout
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── UrlAnalyzerPage.jsx
│   │   ├── MessageAnalyzerPage.jsx
│   │   └── ResultsPage.jsx
│   ├── routes/              # React Router config
│   └── utils/
├── index.html
├── vite.config.js           # Tailwind v4 + API proxy
└── package.json
```

## Backend (`backend/`)

```
backend/
├── src/
│   ├── config/              # env, constants
│   ├── controllers/         # Request handlers (MVC)
│   ├── routes/              # Route definitions
│   ├── services/            # Gemini + threat analysis
│   ├── middleware/          # validate, errorHandler
│   ├── utils/               # trustLevel, prompts
│   ├── app.js               # Express app setup
│   └── server.js            # Entry point
├── .env.example
└── package.json
```

## Routes

| Frontend | Backend API |
|----------|-------------|
| `/` | — |
| `/dashboard` | — |
| `/analyze/message` | `POST /api/analyze/message` |
| `/analyze/url` | `POST /api/analyze/url` |
| `/results` | — |
| — | `GET /api/health` |
