import {ConnectionOptions} from "typeorm";
import { join } from 'path'

export default {
  type: "postgres",
  host: process.env['POSTGRESS_HOST'],
  port: process.env['POSTGRESS_PORT'] ||  5432,
  username: process.env['POSTGRES_USER'] || "postgres",
  password: process.env['POSTGRES_PASSWORD'] || "12345",
  database: process.env['POSTGRES_DB'] || "postgres",
  synchronize: false,
  migrationsRun: true,
  logging: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    join(__dirname, 'entity/*{.ts,.js}')
  ],
  migrations: [
    join(__dirname, 'migrations/*{.ts,.js}')
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migrations",
  },
} as ConnectionOptions;