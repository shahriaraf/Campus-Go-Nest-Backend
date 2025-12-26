/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class AddReviewDto {
  @IsNotEmpty() @IsString() admissionId: string;
  @IsNotEmpty() @IsString() review: string;
  @IsNotEmpty() @IsNumber() @Min(1) @Max(5) rating: number;
}