import { Body, Controller, Post, ClassSerializerInterceptor, UseInterceptors, Get, ParseIntPipe, Query, DefaultValuePipe, UseGuards, Delete, NotFoundException } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Pagination,
} from 'nestjs-typeorm-paginate';
import AdminGuestbookService from "../service/guestbook.service";
import { JwtAuthGuard } from "../utils/jwt-guards";

// import { CreateGuestbookSerializer, GetGuestbookSerializer } from "@/src/";
// import { CreateGuestbookSerializer, GetGuestbookSerializer } from "../serializer/guestbook.serializer";
// import { GuestbookService } from "../service/guestbook.service";

@ApiTags('admin.guestbook')
@Controller('/guestbook')
export class AdminGuestbookController {
  constructor(
    private adminGuestbookService: AdminGuestbookService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async getGuestbook(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) per_page: number = 10
  ): Promise<any> {
    const data = await this.adminGuestbookService.getGuest(page, per_page)
    return {
      statusCode: 200,
      data: data.items,
      meta: data.meta
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async deleteGuestbook(id: string) {
    const resp = await this.adminGuestbookService.deleteUser(id)
    if (!resp) {
      throw new NotFoundException('User with id not found');
    }
  }
}