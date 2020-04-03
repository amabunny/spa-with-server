import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from './article.entity'

@Injectable()
export class ArticlesService {
  constructor
  (@InjectRepository(Article) private readonly articlesRepository: Repository<Article>) {

  }

  public findAll () {
    return this.articlesRepository.find()
  }
}
