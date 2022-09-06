import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { TypeRequest } from '../enums/type-request.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

	addMessage(message: string) {
		this.socket.emit('add-message', message);
	} 

	getMessages(): Observable<string[]> {
		return new Observable<string[]>(event => {
			this.socket.emit('get-messages', (response: any) => {
				console.log(response.messagesReturn);
				event.next(response.messagesReturn);
				return response.messagesReturn;
			});
		})
	}
}
