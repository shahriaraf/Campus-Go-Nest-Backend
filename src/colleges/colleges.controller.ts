/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';

@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Post()
  create(@Body() createCollegeDto: CreateCollegeDto) {
    return this.collegesService.create(createCollegeDto);
  }

  @Get()
  findAll(@Query('search') search: string) {
    if (search) return this.collegesService.search(search);
    return this.collegesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collegesService.findOne(id);
  }
}