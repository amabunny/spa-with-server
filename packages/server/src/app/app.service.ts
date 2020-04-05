import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getIncorrectRequestMessage (): string {
    return "Browser requests doesn't allowed!"
  }
}
