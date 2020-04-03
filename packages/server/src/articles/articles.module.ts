import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticlesService } from './article.service'
import { Article } from './article.entity'
import { ArticlesController } from './articles.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesService],
  controllers: [ArticlesController]
})
export class ArticlesModule {}
