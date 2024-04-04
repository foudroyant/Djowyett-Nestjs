import { Module } from '@nestjs/common';
import { PrefAlerteController } from './pref-alerte.controller';
import { PrefAlerteService } from './pref-alerte.service';

@Module({
  controllers: [PrefAlerteController],
  providers: [PrefAlerteService]
})
export class PrefAlerteModule {}
