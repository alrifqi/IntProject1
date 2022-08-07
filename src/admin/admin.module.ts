import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestbookModule } from 'src/guestbook/guestbook.module';
import { AdminCreateUserCommand } from './command/createadmin.command';
import { AdminAuthController } from './controller/auth.controller';
import { AdminGuestbookController } from './controller/guestbook.controller';
import { AdminEntity } from './entity/admin.entity';
import { AuthAdminService } from './service/auth.service';
import AdminGuestbookService from './service/guestbook.service';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get<string>('secret_key'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    GuestbookModule
  ],
  controllers: [AdminAuthController, AdminGuestbookController],
  providers: [AuthAdminService, AdminGuestbookService, AdminCreateUserCommand, JwtStrategy]
})
export class AdminModule {}