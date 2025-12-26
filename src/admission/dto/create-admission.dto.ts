/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAdmissionDto {
  @IsNotEmpty() @IsString() collegeId: string;
  @IsNotEmpty() @IsString() candidateName: string;
  @IsNotEmpty() @IsString() subject: string;
  @IsEmail() email: string;
  @IsNotEmpty() @IsString() phone: string;
  @IsNotEmpty() @IsString() address: string;
  @IsNotEmpty() @IsString() dob: string;
  @IsNotEmpty() @IsString() image: string;
}