import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: 'app-chat',
    templateUrl : `./chat.component.html`,
    styleUrls: [`./chat.component.scss`],
  })
  export class ChatComponent implements OnInit {
    chatMessages: string[] = [];
    form: FormGroup;
  
    constructor(private socketService: SocketService, private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            message: [''],
        });

    }
    sendMessage() {
        this.socketService.addMessage(this.form?.controls['message'].value);
    }

    refreshMessages() {
        this.socketService.getMessages().subscribe(messages => {
            this.chatMessages = messages;
            console.log(this.chatMessages)
        });
        
    }

}