import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Request Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
// app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;