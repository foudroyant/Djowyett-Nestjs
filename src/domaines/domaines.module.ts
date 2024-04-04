import { Module } from '@nestjs/common';
import { DomainesService } from './domaines.service';
import { DomainesController } from './domaines.controller';
import { AppService } from 'src/app.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [DomainesController],
  providers: [DomainesService, AppService],
  imports : [SocketModule],
  exports: [DomainesService],
})
export class DomainesModule {}
