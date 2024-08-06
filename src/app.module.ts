import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        // databaseConfig,
        // authConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}
