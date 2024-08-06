import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    try {
      const service = this.appService.getHello();
      return { 
        message: 'Thank you!', 
        data: service
      };
    } catch (error) {
      throw new HttpException('error', 400)
    }
  }
}
