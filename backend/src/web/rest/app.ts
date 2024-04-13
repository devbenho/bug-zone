import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error.mw';
import { LOGGER } from './logger';
import { container } from './ioc/inversify.config';
import { AuthController } from './controllers/auth.controller';

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
app.get('/users', async (_req, res) => {});
// load all configs
// const router = container.get<ApplicationRouter>(ApplicationRouter);
// router.register(app);
// error middleware.
const auth = new AuthController(
  container.get('ILoginInputPort'),
  container.get('ILoginOutputPort'),
  container.get('IRegisterInputPort'),
  container.get('IRegisterOutputPort'),
);
app.use('/api/v1/auth/register', async (req, res) => {});
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  LOGGER.info(`Application is running on port ${PORT} 🚀`);
  LOGGER.info(`Environment: ${process.env.NODE_ENV}`);
});
