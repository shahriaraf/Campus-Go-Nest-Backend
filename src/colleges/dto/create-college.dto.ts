/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCollegeDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsString() image: string;
  @IsString() admissionDates: string;
  @IsArray() events: string[];
  @IsString() researchHistory: string;
  @IsArray() sports: string[];
  @IsString() admissionProcess: string;
  @IsOptional() researchCount: number;
}