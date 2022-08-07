import { Exclude } from 'class-transformer';
import { GuestEntity } from '../entity/guest.entity';

export class CreateGuestbookSerializer {
  data: GuestbookSerializer
  meta: any
  statusCode: number;
}

export class GetGuestbookSerializer {
  data: Array<GuestbookGetSerializer>;
  meta: any;
  statusCode: number;
}

export class GuestbookSerializer {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<GuestEntity>) {
    Object.assign(this, partial);
  }
}

export class GuestbookGetSerializer {
  id: string;
  name: string;
  phone: string;
  address: string;
  note: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(partial: Partial<GuestEntity>) {
    Object.assign(this, partial);
  }
}