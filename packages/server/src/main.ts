import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap () {
  const APP_PORT = process.env.APP_PORT || 3000
  const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS?.split(',').map(domain => domain.trim())

  const app = await NestFactory.create(AppModule)
  app.enableCors({ origin: ALLOWED_DOMAINS })

  await app.listen(APP_PORT)
}

bootstrap()
