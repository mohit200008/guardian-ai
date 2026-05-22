import {
  buildApiUrl,
  getApiBaseUrl,
  isApiConfigured,
  logApiDebug,
} from '../config/api.js';

export class ApiError extends Error {
  constructor(message, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

function assertApiConfigured() {
  if (import.meta.env.PROD && !isApiConfigured()) {
    throw new ApiError(
      'Backend API is not configured. Set VITE_API_BASE_URL on Vercel to your Railway URL (e.g. https://your-app.up.railway.app), then redeploy.',
      'API_NOT_CONFIGURED'
    );
  }
}

async function parseApiResponse(res, requestUrl) {
  const contentType = res.headers.get('content-type') || '';
  const text = await res.text();

  logApiDebug('response', {
    url: requestUrl,
    status: res.status,
    contentType: contentType || '(none)',
  });

  const looksLikeHtml = /^\s*</.test(text) || contentType.includes('text/html');

  if (looksLikeHtml || (!contentType.includes('application/json') && text && !text.trimStart().startsWith('{'))) {
    const base = getApiBaseUrl();
    const hint = !base
      ? 'VITE_API_BASE_URL is missing — requests are hitting the frontend, not Railway.'
      : base.includes('vercel.app')
        ? 'VITE_API_BASE_URL must be your Railway URL, not the Vercel app URL.'
        : 'VITE_API_BASE_URL must start with https:// (e.g. https://guardian-ai-production-62fb.up.railway.app).';

    throw new ApiError(
      `Invalid API response (expected JSON, got HTML/text). ${hint}`,
      'INVALID_RESPONSE'
    );
  }

  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new ApiError(
      `Could not parse API response (HTTP ${res.status}). The server may be waking up or misconfigured.`,
      'INVALID_JSON'
    );
  }

  if (!res.ok) {
    const message =
      json?.error?.message ??
      (res.status === 503
        ? 'AI service unavailable. Try again in a moment.'
        : res.status >= 500
          ? 'Backend error. The server may be starting up — wait and retry.'
          : 'Request failed');

    throw new ApiError(message, json?.error?.code ?? 'HTTP_ERROR');
  }

  return json;
}

async function apiRequest(method, path, body) {
  assertApiConfigured();

  const url = buildApiUrl(path);

  logApiDebug('request', { method, url, base: getApiBaseUrl() });

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      'Cannot reach the backend. Check your network, Railway deployment, and VITE_API_BASE_URL.',
      'NETWORK_ERROR'
    );
  }

  return parseApiResponse(res, url);
}

export function apiGet(path) {
  return apiRequest('GET', path);
}

export function apiPost(path, body) {
  return apiRequest('POST', path, body);
}
