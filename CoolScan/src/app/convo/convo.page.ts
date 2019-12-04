import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import {environment, ChatURL} from '../../environments/environment';
//import { ActivatedRoute } from '@angular/router';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-convo',
  templateUrl: './convo.page.html',
  styleUrls: ['./convo.page.scss'],
})

export class ConvoPage{
	socket:any;
	currentUser= JSON.parse(sessionStorage.getItem('loggedUser'));
	Sender= JSON.parse(sessionStorage.getItem('loggedUser')); // delete after
	Receiver= sessionStorage.getItem('Teacher');
	time = new Date().getTime();
	
	messages = [{
		user: this.Sender,
		date: this.time,
		msg: 'Start a conversation with ' + this.Receiver
	}];

	newMsg = '';
	
	public myUserId :string;
	constructor(publicnavCtrl:NavController){
		if(this.myUserId==null){
			this.myUserId=Date.now().toString();
		}
		this.socket=io(ChatURL);
	}
	
	sendMessage() {
		let newMsg ={	
			user: this.currentUser,
			date: new Date().getTime(),
			msg: this.newMsg
		};
		this.newMsg = '';
		
		this.messages.push(newMsg);
		this.socket.emit('message', newMsg);
		
		setTimeout(() => {
			document.querySelector('ion-content').scrollToBottom(200);
		});
	}
	receiveMessage(){
		this.socket.on('message', (ms) => {this.messages.push(ms);});
	}
}

