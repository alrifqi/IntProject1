import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { AdminEntity } from "../entity/admin.entity";
import { AdminLoginDto } from '../dto/index';
import { ApiTags } from "@nestjs/swagger";
import { AuthAdminService } from "../service/auth.service";

@ApiTags('admin.auth')
@Controller('auth')
export class AdminAuthController {
  constructor(
    private authAdminService: AuthAdminService
  ) {}

  @Post()
  post(@Body() payload: AdminLoginDto) {
    return this.authAdminService.authenticate(payload)
  }
}