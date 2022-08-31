import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as SocketIO from 'socket.io';
import * as express from "express";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIO,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
