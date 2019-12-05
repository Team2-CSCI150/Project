import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment, SENDMSG_URL ,MSG_URL, ChatURL} from '../../environments/environment';
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
	ReceiverID = JSON.parse(sessionStorage.getItem('TeacherID'));
	time = new Date().getTime();

	messages = [];

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
			if(res == 'There are no messages'){
				console.log("No messages");
			}
			else{
				for (let entry of res){
					//let i = JSON.parse(entry);
			console.log("For loop entry: " + entry);
			
			//console.log("For loop i: " + i);
					if (entry.SenderID == this.currentUserID){
						let tempMsg = {
						user: this.currentUser,
						date: entry.date,
						msg: entry.msg
						};
						this.messages.push(tempMsg);
					}
					else {
						let tempMsg = {
						user: this.Receiver,
						date: entry.date,
						msg: entry.msg
						};
						this.messages.push(tempMsg);
					}
				}
			}
		});
	}

	newMsg = '';

	public myUserId :string;
	constructor(publicnavCtrl:NavController,
				private http: HttpClient,){
		if(this.myUserId==null){
			this.myUserId=Date.now().toString();
		}
		//this.socket=io(ChatURL);
	}

	sendMessage() {
		let newMsg ={
			user: this.currentUser,
			date: new Date().getTime(),
			msg: this.newMsg
		};
		
		let data ={
			senderID: this.currentUserID,
			receiverID: this.ReceiverID,
			message: this.newMsg,
		};
		
		//console.log(data);
		
		this.http.post(SENDMSG_URL , data).subscribe(res=> {
			console.log(res);
		});
		this.newMsg = '';

		this.messages.push(newMsg);
		//this.socket.emit('message', newMsg);
		
		setTimeout(() => {
			document.querySelector('ion-content').scrollToBottom(200);
		});
	}
	receiveMessage(){
		this.socket.on('message', (ms) => {this.messages.push(ms);});
	}
}
