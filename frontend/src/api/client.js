const BASE = import.meta.env.VITE_API_URL ?? '';

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    const message = json?.error?.message ?? 'Request failed';
    const err = new Error(message);
    err.code = json?.error?.code;
    throw err;
  }

  return json;
}
