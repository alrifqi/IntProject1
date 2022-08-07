import { Injectable } from "@nestjs/common";
import { Pagination } from "nestjs-typeorm-paginate";
import { GuestEntity } from "src/guestbook/entity/guest.entity";
import { GuestbookService } from "src/guestbook/service/guestbook.service";

@Injectable()
export default class AdminGuestbookService {
  constructor(
    private guestbookService: GuestbookService
  ) {}


  async getGuest(page: number, per_page: number): Promise<Pagination<GuestEntity>> {
    return await this.guestbookService.getGuestbook(page, per_page)
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.guestbookService.deleteGuestbook(id)
  }
}