import { Component, OnInit, ViewChild } from '@angular/core';
//import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-convo',
  templateUrl: './convo.page.html',
  styleUrls: ['./convo.page.scss'],
})

export class ConvoPage{
	messages = [
	{
		user: 'Daniel',
		createdAt: 15599074950,
		msg: 'Hey what you doing tomorrow'
		},
	{
		user: 'Jack',
		createdAt: 15596403579,
		msg: 'Nothing Why? '
		},
	{
		user: 'Daniel',
		createdAt: 15599074950,
		msg: 'Let go get food!'
		}
	];
	currentUser = 'Daniel';// replace with user 
	newMsg = '';
	//@ViewChild(IonContent) content:IonContent;

	
	constructor () { }
	
	sendMessage() {
		this.messages.push({	
			user: 'Daniel',
			createdAt: new Date().getTime(),
			msg: this.newMsg
		});
		
		this.newMsg = '';
		
		setTimeout(() => {
			document.querySelector('ion-content').scrollToBottom(200);
		});
	

	
	}
}


/*export class ConvoPage implements OnInit {
	constructor(public keyboard: Keyboard){ 
	this.keyboard.hideFormAccessoryBar(false);
	this.keyboard.hideFormAccessoryBar(true);
	}

	ngOnInit(){ }

	Message = " ";
	Source = " "
	Destination = " ";
	SendMessage(Source, Message, Destination){
	 //Send message to Destination with text Message from Source	
	}

}*/
