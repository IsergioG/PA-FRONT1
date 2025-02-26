import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './utils/HttpExceptionFiltes';
import { APP_FILTER } from '@nestjs/core';
import { HistoryModule } from './history/history.module';
import { History } from './history/entities/history.entity';
import { WomenEntity } from './entities/womens.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: 5432,
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD,
      database: process.env.NAME_BASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([History,WomenEntity]),
    HistoryModule,
  ],
  providers: [ 
    {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  AppService],
  controllers: [AppController],

})
export class AppModule {}
