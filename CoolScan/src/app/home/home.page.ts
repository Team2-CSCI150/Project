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
              private route: ActivatedRoute) {}

  id: any;

  sub = this.route.params.subscribe(params => {
    this.id = params['uname'];
    });

  
  
}

/*
openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
  this.menu.open('custom');
  }

*/
