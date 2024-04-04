import { Test, TestingModule } from '@nestjs/testing';
import { DomainesController } from './domaines.controller';
import { DomainesService } from './domaines.service';

describe('DomainesController', () => {
  let controller: DomainesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DomainesController],
      providers: [DomainesService],
    }).compile();

    controller = module.get<DomainesController>(DomainesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
