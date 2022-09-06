import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageModel } from "src/app/models/message.model";
import { SocketService } from "src/app/services/socket.service";

@Component({
    selector: 'app-chat',
    templateUrl : `./chat.component.html`
  })
  export class ChatComponent implements OnInit {
    messages: MessageModel[] | undefined;
    form: FormGroup;
  
    constructor(private socketService: SocketService, private formBuilder: FormBuilder) {
        console.log("ENTREI AQUI");
     }
  
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            message: [],
        });
        // here we can use socket events and listeners using socketService
    }

    sendMessage() {
        console.log(this.form?.controls['message'].value);
    }

}