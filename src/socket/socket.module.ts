import { Module } from '@nestjs/common';
import { SocketEvent } from './socketEvent';
import { DomainesService } from 'src/domaines/domaines.service';
import { AppService } from 'src/app.service';

@Module({
    providers:[SocketEvent, DomainesService, AppService],
    imports : []
})
export class SocketModule {}
