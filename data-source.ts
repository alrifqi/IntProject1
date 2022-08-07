import config  from "./config/config"
import { DataSource, DataSourceOptions, createConnection } from "typeorm"

const configuration = config()

export const AppDataSource = new DataSource({
  type: configuration.database.main.type,
  logging: true,
  name: configuration.database.main.name,
  database: configuration.database.main.database,
  username: configuration.database.main.username,
  password: configuration.database.main.password,
  port: configuration.database.main.port,
  host: configuration.database.main.host,
  synchronize: false,
  migrationsRun: true,
  dropSchema: false,
  entities: [
    "dist/src/guestbook/entity/*.js",
    "dist/src/admin/entity/*.js",
  ],
  migrations: ["migrations/*.ts"],
  migrationsTableName: "migrations_typeorm",
})
