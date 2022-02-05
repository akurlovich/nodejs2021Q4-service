import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import {
  POSTGRES_DB,
  POSTGRESS_HOST,
  POSTGRESS_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from './common/config';

export default {
  type: 'postgres',
  host: POSTGRESS_HOST,
  port: POSTGRESS_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  keepConnectionAlive: true,
  synchronize: false,
  migrationsRun: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [join(__dirname, 'entity/*{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
