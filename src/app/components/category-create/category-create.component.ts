import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterEvent} from '@angular/router';
import { UserService } from '../../services/user.services';
import { CategoryService } from '../../services/category.services';
import { Category } from "../../models/category";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [ UserService, CategoryService ]
})
export class CategoryCreateComponent implements OnInit {

  public page_title: string;
  public token: string;
  public identity: User;
  public category: Category;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) { 
    this.page_title = "Create category";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.category = new Category(0, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status) {
          this.status = 'success';
          this.category = response.category;

          this._router.navigate(['/home']);
        }else {
          this.status = "error";  
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }

}
