import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_ORIGIN.split(',').map((o) => o.trim()),
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '32kb' }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { message: 'Too many requests', code: 'RATE_LIMIT' } },
  })
);

app.use('/api', routes);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { message: 'Not found', code: 'NOT_FOUND' } });
});

app.use(errorHandler);

export default app;
