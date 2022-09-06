import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-chat></app-chat>`,
  styles: []
})
export class AppComponent implements OnInit{
  title = 'front-end';
  
  ngOnInit() {
    console.log("TESTE")
  }

}
