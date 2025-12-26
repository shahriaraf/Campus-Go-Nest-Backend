/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { Admission, AdmissionSchema } from '../schemas/admission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admission.name, schema: AdmissionSchema }])],
  controllers: [AdmissionController],
  providers: [AdmissionService],
})
export class AdmissionModule {}