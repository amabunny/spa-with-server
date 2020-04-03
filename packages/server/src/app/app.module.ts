import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthController } from '@app/controllers/auth/auth.controller'
import { createTypeOrmOptions } from '@app/config/typeorm'
import { Article } from '@app/entities/article'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...createTypeOrmOptions(),
      entities: [
        Article
      ]
    })
  ],
  controllers: [
    AppController,
    AuthController
  ],
  providers: [AppService]
})
export class AppModule {}
