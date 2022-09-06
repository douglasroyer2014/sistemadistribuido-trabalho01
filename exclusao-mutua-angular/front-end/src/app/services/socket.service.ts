import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

  	// emit event
	fetchMessages() {
		this.socket.emit('fetchMessages');
	} 

	// listen event
	onFetchMessages() {
		return this.socket.fromEvent('fetchMessages');
	}
}
