import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';

import config from '../config/config';
import { GuestEntity } from './guestbook/entity/guest.entity';
import { GuestbookModule } from './guestbook/guestbook.module';
import { AdminModule } from './admin/admin.module';
import { AdminEntity } from './admin/entity/admin.entity';
import { Question1Module } from './question1/question1.module';

// initiate database configuration
const configuration = config();
const dbConfig = {
  type: configuration.database.main.type,
  host: configuration.database.main.host,
  port: configuration.database.main.port,
  username: configuration.database.main.username,
  password: configuration.database.main.password,
  database: configuration.database.main.database
}

@Module({
  imports: [
    GuestbookModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [GuestEntity, AdminEntity]
    }),
    RouterModule.register([
      {
        path: 'guestbook',
        module: GuestbookModule
      },
      {
        path: 'admin',
        module: AdminModule,
      }
    ]),
    ConsoleModule,
    AdminModule,
    Question1Module
  ],
  controllers: []
})
export class AppModule {}
