import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

const APP_PORT = process.env.APP_PORT || 3000
const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS?.split(',').map(domain => domain.trim())

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: ALLOWED_DOMAINS })

  await app.listen(APP_PORT)
}

bootstrap()
