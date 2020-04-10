import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from "../../services/user.services";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = 'Register account';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado!');
    console.log(this._userService.test())
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response => {
        
        if(response.status === 'success'){
          this.status = response.status;
          form.reset();
        }else{
          this.status = 'error';
        }

      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
    
  }
}
