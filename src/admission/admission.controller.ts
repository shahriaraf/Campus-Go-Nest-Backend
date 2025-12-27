/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Request, Put } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { AddReviewDto } from './dto/add-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('admission')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionService.create(req.user.userId, createAdmissionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-college')
  findMyColleges(@Request() req) {
    return this.admissionService.findByUser(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('review')
  addReview(@Body() body: AddReviewDto) {
    return this.admissionService.addReview(body.admissionId, body.review, body.rating);
  }

  @Get('reviews')
  async getReviews() {
    return this.admissionService.getReviews();
  }
}