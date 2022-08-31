import { Injectable } from '@angular/core';
import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public PORT: number = 8100

  constructor(
    public app: express.Application,
    public server: Server,
    private io: SocketIO.Server
  ) {
    this.routes();
    this.sockets();
    this.listen();
  }

  routes() {
    this.app = express();
    this.app.route("/").get((req, res) => {
      res.sendFile(__dirname + '/index.html');
    });
  }

  private sockets(): void {
    console.log('server created');
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
  }

  private listen(): void {

    this.io.on('connection', (socket: any) => {

      console.log('a user connected');

      socket.on('chat message', (m: any) => {
        this.io.emit('chat message', m);
      });


      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }


}
