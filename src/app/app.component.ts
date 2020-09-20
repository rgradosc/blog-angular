import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.services";
import { CategoryService } from "./services/category.services";
import { global } from "./services/global";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    UserService,
    CategoryService
  ]
})
export class AppComponent {
  public title = 'blog-angular';
  public identity;
  public token;
  public url:string;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.loadInfo();
    this.url = global.url;
    this.loadCategories();
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

  loadCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status) {
         this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
