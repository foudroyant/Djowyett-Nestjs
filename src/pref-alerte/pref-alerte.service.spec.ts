import { Test, TestingModule } from '@nestjs/testing';
import { PrefAlerteService } from './pref-alerte.service';

describe('PrefAlerteService', () => {
  let service: PrefAlerteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrefAlerteService],
    }).compile();

    service = module.get<PrefAlerteService>(PrefAlerteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
