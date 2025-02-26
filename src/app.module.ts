import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllExceptionsFilter } from './utils/HttpExceptionFiltes';
import { APP_FILTER } from '@nestjs/core';
import { HistoryModule } from './history/history.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USERNAME_BD,
      password: process.env.PASSWORD,
      database: process.env.NAME_BASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    HistoryModule,
  ],
  providers: [ 
    {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }],
})
export class AppModule {}
