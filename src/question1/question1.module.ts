import { Module } from '@nestjs/common';
import { Question1Command } from './command/question1.command';

@Module({
  providers: [Question1Command]
})
export class Question1Module {}
