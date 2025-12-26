import { Test, TestingModule } from '@nestjs/testing';
import { AdmissionService } from './admission.service';

describe('AdmissionService', () => {
  let service: AdmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdmissionService],
    }).compile();

    service = module.get<AdmissionService>(AdmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
