import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsNotEmpty, isPhoneNumber } from 'class-validator';

export default class GuestDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+62812345678' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ default: ''})
  note: string;
}