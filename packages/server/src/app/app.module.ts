import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AuthController } from '@app/controllers/auth/auth.controller'
import { AppService } from './app.service'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [AppService]
})
export class AppModule {}
