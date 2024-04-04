import { Test, TestingModule } from '@nestjs/testing';
import { PrefAlerteController } from './pref-alerte.controller';

describe('PrefAlerteController', () => {
  let controller: PrefAlerteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrefAlerteController],
    }).compile();

    controller = module.get<PrefAlerteController>(PrefAlerteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
