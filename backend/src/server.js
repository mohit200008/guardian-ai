import app from './app.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log(`Guardian AI API → http://localhost:${env.PORT}`);
  console.log(`Health check → http://localhost:${env.PORT}/api/health`);
});
