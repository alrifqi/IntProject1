import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';

import { AdminEntity } from "../entity/admin.entity";
import { AdminLoginDto } from '../dto/index';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async authenticate(payload: AdminLoginDto) {
    const user = await this.adminRepository.findOne({
      where: {
        email: payload.email
      }
    });

    if (user === null) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const jwtPayload = {
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
    return {
      access_token: this.jwtService.sign(jwtPayload)
    }
  }

  async createAdminUser(email: string, password: string): Promise<AdminEntity> {
    const saltOrRound = this.configService.get<number>('salt_or_rounds');

    const newAdmin =  new AdminEntity();
    newAdmin.email = email;
    newAdmin.password = await bcrypt.hash(password, saltOrRound);
    const saved = await this.adminRepository.save(newAdmin);
    return newAdmin
  }
}