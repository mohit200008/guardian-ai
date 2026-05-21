# Guardian AI

**AI-powered digital trust and fraud prevention** — protects users from phishing, scam messages, fake websites, urgency manipulation, and AI-driven fraud.

## Phase 1 (Current): Foundation + Threat Scan Workflow

- Monorepo: `client/` (React + Vite + Tailwind) + `server/` (Express + Gemini)
- **Primary demo flow**: paste suspicious message or URL → AI analysis → trust score, threats, explanation, recovery steps
- Production-minded: validation, rate limiting, helmet, structured prompts, JSON responses

## Architecture

```
hackathon/
├── client/                 # Frontend (Vercel)
│   └── src/
│       ├── api/            # HTTP layer — talks to /api via proxy
│       ├── components/
│       │   ├── analysis/   # Trust score, threats, explanation UI
│       │   ├── layout/     # Shell, sidebar
│       │   └── ui/         # Reusable primitives
│       ├── hooks/          # useAnalysis state machine
│       ├── pages/          # Dashboard (main screen)
│       └── utils/
├── server/                 # Backend API
│   └── src/
│       ├── config/         # Env + constants
│       ├── middleware/     # Errors, validation
│       ├── prompts/        # Gemini system prompts (versioned)
│       ├── routes/         # REST endpoints
│       └── services/       # Gemini + threat orchestration
└── package.json            # Root dev orchestration
```

### Why this structure?

| Decision | Reason |
|----------|--------|
| **Separate client/server** | Independent deploy (Vercel + Railway/Render), clear API contract for judges |
| **Prompts in `/prompts`** | Tune fraud detection without touching route logic — fast iteration during hackathon |
| **Services layer** | `threatAnalyzer` normalizes AI output; routes stay thin |
| **JSON schema in prompts** | Gemini `responseMimeType: application/json` → predictable UI binding |
| **Vite proxy in dev** | No CORS friction; production uses `VITE_API_URL` |

### API flow

```
Browser → POST /api/analyze/message | /url
       → validate (Zod)
       → threatAnalyzer → Gemini (structured JSON)
       → normalize trust score + threats
       → JSON { success, data }
```

## Quick start

1. **Gemini API key** — [Google AI Studio](https://aistudio.google.com/apikey)

2. **Server env**

```bash
cd server
cp .env.example .env
# Edit .env — set GEMINI_API_KEY=...
npm install
```

3. **Install root + client**

```bash
cd ..
npm install
npm run install:all
```

4. **Run both**

```bash
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:3001/api/health

5. **Demo**: click *Load demo phishing message* → **Run Threat Scan**

## Roadmap (phases)

| Phase | Focus |
|-------|--------|
| **1** ✅ | Scaffold, Threat Scan UI, Gemini integration |
| **2** | Scan history, export report, polish animations |
| **3** | Firebase/Supabase optional persistence |
| **4** | Vercel deploy + env docs |
| **5** | Browser extension / share API (stretch) |

## Tech stack

- React 19, Tailwind CSS 4, Framer Motion, Lucide
- Node.js, Express, Zod, `@google/generative-ai`
- Gemini 2.0 Flash (JSON mode)

## License

MIT — hackathon use
