# Guardian AI — Railway Backend Deployment

Deploy **only the `backend/` folder** to Railway. The frontend will be deployed separately on Vercel later.

---

## Prerequisites

- [Railway](https://railway.app) account (GitHub login works)
- [Google AI Studio](https://aistudio.google.com/apikey) API key
- This repo pushed to GitHub: [guardian-ai](https://github.com/mohit200008/guardian-ai)

---

## Step 1 — Create a Railway project

1. Go to [railway.app](https://railway.app) → **New Project**
2. Choose **Deploy from GitHub repo**
3. Select `guardian-ai`
4. **Important:** Set the **Root Directory** to `backend`
   - Project → **Settings** → **Root Directory** → `backend`

Railway will run `npm start` → `node src/server.js`.

---

## Step 2 — Environment variables

In Railway → your service → **Variables**, add:

| Variable | Required | Example |
|----------|----------|---------|
| `GEMINI_API_KEY` | **Yes** | `AIza...` from Google AI Studio |
| `NODE_ENV` | Yes | `production` |
| `GEMINI_MODEL` | No | `gemini-2.5-flash` |
| `GEMINI_TIMEOUT_MS` | No | `55000` |
| `FRONTEND_URL` | Yes (after Vercel) | See below |
| `PORT` | No | Railway sets this automatically |

### `FRONTEND_URL` (CORS)

Comma-separated list of allowed frontend URLs:

**Local dev only (testing API):**
```
http://localhost:5173
```

**After Vercel deploy:**
```
https://your-app.vercel.app,http://localhost:5173
```

Replace `your-app.vercel.app` with your real Vercel domain.

---

## Step 3 — Deploy

1. Railway builds and deploys automatically on git push (if connected)
2. Or click **Deploy** manually
3. Wait until status is **Active**

---

## Step 4 — Public domain

1. Service → **Settings** → **Networking**
2. Click **Generate Domain**
3. You get a URL like: `https://guardian-ai-production.up.railway.app`

Copy this — you will use it as `VITE_API_URL` on Vercel later.

---

## Step 5 — Test deployment

### Health check (browser or curl)

```
GET https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/health
```

Expected response:

```json
{
  "status": "ok",
  "environment": "production",
  "uptime": "2m 15s",
  "geminiConfigured": true,
  "timestamp": "..."
}
```

### Root endpoint

```
GET https://YOUR-RAILWAY-DOMAIN.up.railway.app/
```

### Analyze a URL

```bash
curl -X POST https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/analyze/url \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://lihi.cc/FeZno\"}"
```

### Demo threats list

```
GET https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/threats/demo
```

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/api/health` | Health + uptime |
| POST | `/api/analyze/message` | Scam message scan |
| POST | `/api/analyze/url` | URL trust scan |
| GET | `/api/threats/demo` | Demo scam corpus |

---

## Connect Vercel frontend (later)

1. Deploy `frontend/` to Vercel
2. In Vercel → **Environment Variables**:
   ```
   VITE_API_URL=https://YOUR-RAILWAY-DOMAIN.up.railway.app
   ```
3. In Railway, update `FRONTEND_URL`:
   ```
   https://your-vercel-app.vercel.app,http://localhost:5173
   ```
4. Redeploy both if needed

Local dev with production API:

```env
# frontend/.env.local
VITE_API_URL=https://YOUR-RAILWAY-DOMAIN.up.railway.app
```

---

## Troubleshooting

### Build fails

- Confirm **Root Directory** is `backend`, not repo root
- Check **Deploy Logs** for npm errors

### `Application failed to respond`

- Railway must bind `0.0.0.0` (already configured in `src/server.js`)
- Do not override `PORT` with a fixed value in Railway

### CORS error from frontend

- Add your exact Vercel URL to `FRONTEND_URL` (no trailing slash)
- Include `https://` prefix
- Redeploy Railway after changing variables

### `geminiConfigured: false` in health

- `GEMINI_API_KEY` missing or wrong in Railway Variables
- Redeploy after adding the variable

### `AI analysis failed` / timeout

- Gemini can take 15–40 seconds — normal for first request
- Check quota at Google AI Studio
- Increase `GEMINI_TIMEOUT_MS` to `60000` if needed
- Pattern-engine **fallback** still returns results for many URLs if Gemini fails

### 502 / crash on analyze

- View **Railway Logs** (Runtime Logs)
- Verify API key and model name `gemini-2.5-flash`

---

## Local production test (before Railway)

```bash
cd backend
cp .env.example .env
# Edit .env — add GEMINI_API_KEY

NODE_ENV=production PORT=3001 npm start
```

Visit: http://localhost:3001/api/health

---

## Security checklist

- Never commit `backend/.env` (gitignored)
- Set secrets only in Railway Variables
- `FRONTEND_URL` restricts browser CORS in production
- Helmet + rate limiting enabled by default

---

Built for Guardian AI hackathon · Backend only on Railway
