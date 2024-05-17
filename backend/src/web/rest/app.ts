import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error.mw';
import { LOGGER } from './logger';
import ApplicationRouter from './routes';
import { container } from '@infrastructure/shared/config/ioc/inversify.config';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
const PORT = process.env.PORT || 3004;
// Check ENDPOINT;
app.get('/healthZ', (_req, res) => {
  return res.status(200).json({ message: 'OK' });
});
// validate the configs
validateConfigs();
const router = container.get<ApplicationRouter>(ApplicationRouter);
router.register(app);
// error middleware.
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  LOGGER.info(`Application is running on port ${PORT} 🚀`);
  LOGGER.info(`Environment: ${process.env.NODE_ENV}`);
});

function validateConfigs() {
  const requiredConfigs = [
    'PORT',
    'JWT_EXPIRES_IN',
    'JWT_SECRET',
    'NODE_ENV',
    'DB_PATH',
    'DB_NAME',
  ];
  requiredConfigs.forEach(config => {
    if (!process.env[config]) {
      LOGGER.error(`Missing required config: ${config}`);
      process.exit(1);
    }
  });
}
