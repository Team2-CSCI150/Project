import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private menu: MenuController,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe((res)=>{
                  this.ids.firstname = res.firstname;
                  this.ids.lastname = res.lastname;
                });
              }
  username = '';
  ids: any;
  ngOnInit(){
    this.username = sessionStorage.getItem('loggedUser');
  }
}

/*

*/
