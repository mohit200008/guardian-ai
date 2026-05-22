import app from './app.js';
import { env, getAllowedOrigins } from './config/env.js';

const PORT = process.env.PORT || env.PORT;

const server = app.listen(PORT, '0.0.0.0', () => {
  const origins = getAllowedOrigins();
  console.log('────────────────────────────────────────');
  console.log('  Guardian AI API');
  console.log(`  Environment : ${env.NODE_ENV}`);
  console.log(`  Port        : ${PORT}`);
  console.log(`  CORS        : ${origins.join(', ')}`);
  console.log(`  Gemini      : ${env.GEMINI_API_KEY ? 'configured' : 'NOT SET'}`);
  console.log(`  Health      : /api/health`);
  console.log('────────────────────────────────────────');
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received — shutting down');
  server.close(() => process.exit(0));
});
