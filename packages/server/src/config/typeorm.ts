import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export const createTypeOrmOptions = (): PostgresConnectionOptions => {
  return {
    type: process.env.TYPEORM_CONNECTION as 'postgres',
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: !!Number(process.env.TYPEORM_SYNCHRONIZE),
    logging: !!process.env.TYPEORM_LOGGING,
    migrationsRun: !!Number(process.env.TYPEORM_RUN_MIGRATIONS)
  }
}
