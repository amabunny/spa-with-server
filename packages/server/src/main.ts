import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const APP_PORT = process.env.APP_PORT || 3000

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  await app.listen(APP_PORT)
}

bootstrap()
