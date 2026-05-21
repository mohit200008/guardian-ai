export async function fetchDemoThreats() {
  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/threats/demo`);
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? 'Failed to load demo threats');
  return json.data;
}
