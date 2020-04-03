module.exports = {
  type: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: '1234',
  database: 'blog',
  port: '54321',
  synchronize: false,
  logging: true,
  runMigrations: true,
  autoLoadEntities: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['./db/migrations/*.ts'],
  subscribers: ['./db/subscriber/*.ts'],
  cli: {
    migrationsDir: './db/migrations',
    subscribersDir: './db/subscribers',
    entitiesDir: './src/**/*.entity.ts'
  },
  seeds: ['./db/seeds/*.ts'],
  factories: ['./db/factories/*.ts']
}
