import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error.mw';
import { LOGGER } from './logger';
import ApplicationRouter from './routes';
import { container } from '@infrastructure/shared/ioc/inversify.config';
import { appDataSource } from '@infrastructure/shared/persistence/data-source';
import { UserMapper, UserPersistence } from '@infrastructure/users';
import { Role } from '@domain/eums/role.enum';
import { User } from '@domain/entities';
import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { IMapper } from '@application/shared';
import { CreateUserDto } from '@contracts/dtos/users';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
appDataSource
  .initialize()
  .then(() => {
    // LOGGER.info(appDataSource.subscribers);
    // log the loaded entities
    LOGGER.info('Loaded entities');
    LOGGER.info(appDataSource.entityMetadatas.length);
    LOGGER.info(appDataSource.subscribers.length);
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
