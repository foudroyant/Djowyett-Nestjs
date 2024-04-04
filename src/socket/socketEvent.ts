import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { DomainesService } from 'src/domaines/domaines.service';

@WebSocketGateway({
    cors:{origin:"*"}
})

export class SocketEvent {

    @WebSocketServer()
    server:Server

    constructor(private readonly domainesService: DomainesService) {}

    handleConnect(client:Socket){
        console.log(`Nouvelle connexion : ${client.id}`)
    }

    handleDisconnect(client:Socket){
        console.log(`Client disconnect : ${client.id}`)
    }

    @SubscribeMessage("domaine")
    handleNewDomain(@MessageBody() data:string, @ConnectedSocket() client:Socket){
        console.log(data)
        this.server.emit("domaine", client.id, data)
    }

    @SubscribeMessage("domaines")
    handleDomains(@MessageBody() data:string, @ConnectedSocket() client:Socket){
        console.log(data)
        this.server.emit("domaine", client.id, this.domainesService.findAll())
    }

    @SubscribeMessage("otp")
    handlEvent(@MessageBody() data:string, @ConnectedSocket() client:Socket){
        console.log(data)
        this.server.emit("otp", client.id, data)
    }

    @SubscribeMessage("ask")
    handlAsk(@MessageBody() data:string, @ConnectedSocket() client:Socket){
        console.log(data)
        this.server.emit("ask", client.id, data)
    }

    @SubscribeMessage("feedback")
    handelEvent(@MessageBody() data:string, @ConnectedSocket() client:Socket){
        console.log(data)
        this.server.emit("feedback", client.id, data)
    }
}