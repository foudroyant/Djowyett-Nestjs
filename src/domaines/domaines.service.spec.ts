import { Test, TestingModule } from '@nestjs/testing';
import { DomainesService } from './domaines.service';

describe('DomainesService', () => {
  let service: DomainesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainesService],
    }).compile();

    service = module.get<DomainesService>(DomainesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
