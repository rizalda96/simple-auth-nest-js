import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });


  const httpAdapter = app.get(HttpAdapterHost);  
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalInterceptors(new ResponseInterceptor());


  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();

