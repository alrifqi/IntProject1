import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { GuestDto } from "../dto";
import { GuestEntity } from "../entity/guest.entity";

@Injectable()
export class GuestbookService {
  constructor(
    @InjectRepository(GuestEntity)
    private guestRepo: Repository<GuestEntity>
  ) {}

  async createGuestbook(payload: GuestDto): Promise<GuestEntity> {
    const newGuestbook = new GuestEntity();
    newGuestbook.name = payload.name;
    newGuestbook.address = payload.address;
    newGuestbook.phone = payload.phone;
    newGuestbook.note = payload.note;
    const saved = await this.guestRepo.save(newGuestbook);
    return saved;
  }

  async getGuestbook(page, per_page): Promise<Pagination<GuestEntity>> {
    return await paginate<GuestEntity>(this.guestRepo, {
      page, 
      limit: per_page
    })
  }

  async deleteGuestbook(id: string): Promise<boolean> {
    const resp = await this.guestRepo.delete({ id: id })
    return resp.affected > 0;
  }
}