import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { DomainesModule } from './domaines/domaines.module';
import { DomainesService } from './domaines/domaines.service';
import { PrefAlerteModule } from './pref-alerte/pref-alerte.module';

@Module({
  imports: [SocketModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  } as ConnectionOptions), DatabaseModule, DomainesModule, PrefAlerteModule,],
  controllers: [AppController],
  providers: [AppService, DomainesService],
  exports : []
})
export class AppModule {}
