import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TestingModule } from './modules/v1/testing/testing.module';
import databaseConfig from './config/database/database.config';
import { DatabaseConfig } from './config/database/database-config.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';


// <database-block>
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});
// </database-block>

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        // authConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    TestingModule,
  ],
})
export class AppModule {}
