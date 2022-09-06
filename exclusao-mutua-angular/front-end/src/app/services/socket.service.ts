import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }

	addMessage(message: string): Observable<any> {
		return new Observable<any>(event => {
			this.socket.emit('add-message', message)
			event.next();
			return;
		})
	} 

	getMessages(): Observable<string[]> {
		return new Observable<string[]>(event => {
			this.socket.emit('get-messages', (response: any) => {
				console.log(response.messagesReturn);
				event.next(response.messagesReturn);
			});
		})
	}
}
