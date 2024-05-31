import { container } from '@infrastructure/shared/ioc/inversify.config';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { LOGGER } from './logger';
import { errorHandlerMiddleware } from './middlewares/error.mw';
import ApplicationRouter from './routes';

const app = express();

dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

appDataSource
  .initialize()
  .then(() => {
    LOGGER.info('Data source initialized');
  })
  .catch(err => {
    LOGGER.error(err);
  });
app.use(morgan('dev'));
const PORT = process.env.PORT || 3004;
// Check ENDPOINT;
app.get('/healthz', async (_req, res) => {
  try {
    return res.status(200).json({
      message: 'Server is running',
    });
  } catch (error) {
    LOGGER.error('Error occurred:', error);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
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
