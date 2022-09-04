import * as express from "express";
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';

class App {

    public app: express.Application;
    public server: Server;
    private io: SocketIO.Server;
    public PORT: number = 7959;
    private users = [];

    constructor() {
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
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.io.on('connection', (socket: any) => {
            console.log('a user connected');
            socket.on('chat message', async(m: any) => {
                if (this.users.length < 5) {
                    this.users.push(socket.id);
                   while (this.users[0] != socket.id) {
                        await this.wait()
                    }
                        setTimeout(() => {
                        console.log(`entrou Aq ${socket.id}`)
                        this.io.emit('chat message', m);
                        this.users.splice( this.users.indexOf(socket.id), 1)
                    }, 4000);
                }
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }

    private async wait() {
        setTimeout(() => {
            console.log("Wait for 0.5s");
        }, 500)
    }
}

export default new App();