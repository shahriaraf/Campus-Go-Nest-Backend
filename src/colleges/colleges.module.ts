/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollegesService } from './colleges.service';
import { CollegesController } from './colleges.controller';
import { College, CollegeSchema } from '../schemas/college.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: College.name, schema: CollegeSchema }])],
  controllers: [CollegesController],
  providers: [CollegesService],
})
export class CollegesModule {}