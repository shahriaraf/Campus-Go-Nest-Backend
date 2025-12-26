/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { College } from '../schemas/college.schema';
import { CreateCollegeDto } from './dto/create-college.dto';

@Injectable()
export class CollegesService {
  constructor(@InjectModel(College.name) private collegeModel: Model<College>) {}

  async create(createCollegeDto: CreateCollegeDto) {
    const createdCollege = new this.collegeModel(createCollegeDto);
    return createdCollege.save();
  }

  async findAll() {
    return this.collegeModel.find().exec();
  }

  async search(query: string) {
    return this.collegeModel.find({ name: { $regex: query, $options: 'i' } }).exec();
  }

  async findOne(id: string) {
    return this.collegeModel.findById(id).exec();
  }
}
