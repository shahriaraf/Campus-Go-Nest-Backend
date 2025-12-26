import { Test, TestingModule } from '@nestjs/testing';
import { AdmissionController } from './admission.controller';

describe('AdmissionController', () => {
  let controller: AdmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdmissionController],
    }).compile();

    controller = module.get<AdmissionController>(AdmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
