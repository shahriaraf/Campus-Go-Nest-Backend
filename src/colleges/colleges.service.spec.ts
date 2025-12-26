import { Test, TestingModule } from '@nestjs/testing';
import { CollegesService } from './colleges.service';

describe('CollegesService', () => {
  let service: CollegesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollegesService],
    }).compile();

    service = module.get<CollegesService>(CollegesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
