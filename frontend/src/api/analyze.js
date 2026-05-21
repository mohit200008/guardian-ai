import { apiPost } from './client.js';

export function analyzeMessage(content) {
  return apiPost('/api/analyze/message', { content });
}

export function analyzeUrl(url) {
  return apiPost('/api/analyze/url', { url });
}
