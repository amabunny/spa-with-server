import { Controller, Get } from '@nestjs/common'
import { ArticlesService } from './article.service'

@Controller('articles')
export class ArticlesController {
  constructor (private readonly articlesService: ArticlesService) {

  }

  @Get('/')
  index () {
    return this.articlesService.findAll()
  }
}
