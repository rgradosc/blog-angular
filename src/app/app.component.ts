import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    UserService
  ]
})
export class AppComponent {
  public title = 'blog-angular';
  public identity;
  public token;

  constructor(
    public _userService: UserService
  ){
    this.loadInfo();
  }

  ngOnInit(){
    console.log('Webapp load success');
  }

  ngDoCheck(){
    this.loadInfo();
  }

  loadInfo(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
