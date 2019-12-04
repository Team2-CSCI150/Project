import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment, MSG_URL, ChatURL} from '../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-convo',
  templateUrl: './convo.page.html',
  styleUrls: ['./convo.page.scss'],
})

export class ConvoPage implements OnInit{
	socket:any;
	currentUser= JSON.parse(sessionStorage.getItem('loggedUser'));
	Sender= JSON.parse(sessionStorage.getItem('loggedUser')); 
	currentUserID = JSON.parse(sessionStorage.getItem('UserID'));
	Receiver= sessionStorage.getItem('Teacher');
	ReceiverID = sessionStorage.getItem('TeacherID');
	time = new Date().getTime();
	
	messages = [{
		user: this.Sender,
		date: this.time,
		msg: 'Start a conversation with ' + this.Receiver
	}
	];
	
	ngOnInit() {
		
		let res;
		let data = JSON.stringify({
			'studentID': this.currentUserID,
			'teacherID':this.ReceiverID
		});
		console.log(data);
		this.http.post(MSG_URL, data).subscribe(res=> {
			console.log("test");
			console.log(res);
			if (res[0] == "Got messages!"){console.log("Success");}
			else {console.log("FAIL");}
			/*
			if(res == 'There are no messages'){
				console.log("No messages");
			}
			else{
				console.log("test");
				console.log(entries);
				//let kind = JSON.parse(res);
				
				for (let entry in res){
					let i = JSON.parse(entry);
					let tempMsg = {
						user: i.SenderID,
						date: i.date,
						msg: i.msg
					};
					console.log("test");
					console.log(res);
					this.messages.push(tempMsg);
				}
			}*/
		});
	}
	
	newMsg = '';
	
	public myUserId :string;
	constructor(publicnavCtrl:NavController,
				private http: HttpClient,){
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

