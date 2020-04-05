import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createTypeOrmOptions } from '@app/config/typeorm'
import { ArticlesModule } from '@app/articles/articles.module'
import { AuthModule } from '@app/auth/auth.module'
import { UsersModule } from '@app/users/users.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(createTypeOrmOptions()),
    ArticlesModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
