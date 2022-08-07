import { Body, Controller, Post, ClassSerializerInterceptor, UseInterceptors, Get, ParseIntPipe, Query, DefaultValuePipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  Pagination,
} from 'nestjs-typeorm-paginate';

import { GuestDto } from "../dto/index";
import { GuestEntity } from "../entity/guest.entity";
import { CreateGuestbookSerializer, GetGuestbookSerializer } from "../serializer/guestbook.serializer";
import { GuestbookService } from "../service/guestbook.service";

@ApiTags('guestbook')
@Controller()
export class GuestbookController {
  constructor(
    private guestbookService: GuestbookService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async postGuestbook(@Body() guestDto: GuestDto): Promise<CreateGuestbookSerializer> {
    const resp = await this.guestbookService.createGuestbook(guestDto)
    return {
      statusCode: 201,
      data: resp,
      meta: {}
    }
  }

  @Get()
  async getGuestbook(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) per_page: number = 10
  ): Promise<GetGuestbookSerializer> {
    const data = await this.guestbookService.getGuestbook(page, per_page)
    return {
      statusCode: 200,
      data: data.items,
      meta: data.meta
    }
  }
}