import { DataSource } from 'typeorm';
import { UserSubscriber } from './subscribers/user.subscribe';

const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../**/*.persistence.ts'],
  migrations: [__dirname + '/../migrations/**/*.ts'],
  subscribers: [UserSubscriber],
});

export default appDataSource;
