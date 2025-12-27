/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admission } from '../schemas/admission.schema';
import { CreateAdmissionDto } from './dto/create-admission.dto';

@Injectable()
export class AdmissionService {
  constructor(@InjectModel(Admission.name) private admissionModel: Model<Admission>) {}

  async create(userId: string, createAdmissionDto: CreateAdmissionDto) {
    const createdAdmission = new this.admissionModel({ ...createAdmissionDto, userId });
    return createdAdmission.save();
  }

  async findByUser(userId: string) {
    return this.admissionModel.find({ userId }).populate('collegeId').exec();
  }

  async addReview(admissionId: string, review: string, rating: number) {
    return this.admissionModel.findByIdAndUpdate(admissionId, { review, rating }, { new: true });
  }

    // Get latest 3 reviews
  async getReviews() {
    return this.admissionModel
      .find({ review: { $exists: true, $ne: '' } }) 
      .populate('userId', 'name image') 
      .populate('collegeId', 'name')  
      .exec();
  }
}