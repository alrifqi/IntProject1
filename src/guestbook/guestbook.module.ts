import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestbookController } from './controller/guestbook.controller';
import { GuestEntity } from './entity/guest.entity';
import { GuestbookService } from './service/guestbook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GuestEntity,
    ])
  ],
  providers: [GuestbookService],
  controllers: [GuestbookController],
  exports: [GuestbookService]
})
export class GuestbookModule {}
