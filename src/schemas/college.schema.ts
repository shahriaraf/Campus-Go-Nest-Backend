/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class College extends Document {
  @Prop({ required: true, index: 'text' }) 
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  admissionDates: string;

  @Prop([String])
  events: string[];

  @Prop()
  researchHistory: string;

  @Prop([String])
  sports: string[];

  @Prop()
  admissionProcess: string;
  
  @Prop({ default: 0 })
  researchCount: number;
}

export const CollegeSchema = SchemaFactory.createForClass(College);