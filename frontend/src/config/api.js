/**
 * Central API base URL for all backend requests.
 * Production (Vercel): set VITE_API_BASE_URL to your Railway URL (no trailing slash).
 * Legacy: VITE_API_URL is also supported.
 */

const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  '';

/** Strip trailing slashes, fix missing https://, remove accidental /api suffix */
function normalizeBase(url) {
  if (!url) return '';
  let base = url.trim().replace(/\/+$/, '');
  if (base.endsWith('/api')) {
    base = base.slice(0, -4);
  }
  // Without protocol, fetch() treats host as a path on the Vercel origin → HTML 404
  if (base && !/^https?:\/\//i.test(base)) {
    base = `https://${base}`;
  }
  return base;
}

const DEV_FALLBACK = 'http://localhost:3001';

export function getApiBaseUrl() {
  const normalized = normalizeBase(RAW_BASE);
  if (normalized) return normalized;
  if (import.meta.env.DEV) return DEV_FALLBACK;
  return '';
}

/** Build full URL: base + /api/... (never double /api) */
export function buildApiUrl(path) {
  const base = getApiBaseUrl();
  const route = path.startsWith('/') ? path : `/${path}`;

  if (!base) {
    return route;
  }

  return new URL(route, `${base}/`).href;
}

export function isApiConfigured() {
  return Boolean(getApiBaseUrl());
}

export function isApiDebugEnabled() {
  return import.meta.env.DEV || import.meta.env.VITE_DEBUG_API === 'true';
}

export function logApiDebug(label, data) {
  if (!isApiDebugEnabled()) return;
  console.info(`[Guardian API] ${label}`, data);
}

if (isApiDebugEnabled()) {
  const base = getApiBaseUrl();
  console.info('[Guardian API] base URL:', base || '(not set — production will fail without VITE_API_BASE_URL)');
}

if (import.meta.env.PROD && !getApiBaseUrl()) {
  console.error(
    '[Guardian API] VITE_API_BASE_URL is not set. API calls will fail. Add your Railway URL in Vercel → Environment Variables, then redeploy.'
  );
}

export default getApiBaseUrl;
