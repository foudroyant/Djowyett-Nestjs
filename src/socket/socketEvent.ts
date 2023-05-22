import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@WebSocketGateway({
    cors:{origin:"*"}
})
export class SocketEvent {

    @WebSocketServer()
    server:Server

    handleConnect(client:Socket){
        console.log(`Connexion : ${client.id}`)
    }

    handleDisconnect(client:Socket){
        console.log(`Client disconnect : ${client.id}`)
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