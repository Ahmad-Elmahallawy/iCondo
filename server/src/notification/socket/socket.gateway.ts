import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayInit
} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";

@WebSocketGateway(1234)
export class SocketGateway implements OnGatewayConnection,OnGatewayInit {

// @ts-ignore
    @WebSocketServer() socketServer: Server;
    afterInit(server: any) {
        console.log("SOCKET INIT")

    }
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {

        return 'Hello world!';
    }

    handleConnection(client: Socket, ...args: any[]) {


        console.log('Client ' + client.id + ' connected')

    }
}
