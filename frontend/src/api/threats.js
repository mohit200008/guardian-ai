import { apiGet } from './client.js';

export async function fetchDemoThreats() {
  const json = await apiGet('/api/threats/demo');
  return json.data;
}
