import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { UserService } from "../../services/user.services";
import { global } from "../../services/global";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers:[
    UserService
  ]
})
export class UserSettingsComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity: User;
  public token: string;
  public status: string;
  public url:string;
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    placeholderText: 'Edit Your Content Here!',
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "4",
    uploadAPI:  {
      url:global.url + 'user/upload',
      headers: {
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Select your avatar...',
    }
  };

  public resetVar = {
    
  };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'User Settings';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    
    this.user = new User(this.identity.id, 
                         this.identity.name, 
                         this.identity.surname, 
                         this.identity.rol, 
                         this.identity.email, 
                         this.identity.password, 
                         this.identity.description, 
                         this.identity.image);
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.user);
    this._userService.update(this.token, this.user).subscribe(
      response =>{
        if(response.status){
          //console.log(response);
          this.status = 'success';
          this.identity.id = this.user.id;
          this.identity.name = this.user.name;
          this.identity.surname = this.user.surname;
          this.identity.email = this.user.email;
          this.identity.description = this.user.description;
          this.identity.image = this.user.image;
          
          localStorage.setItem('identity', JSON.stringify(this.identity));
          
        }else {
          this.status = 'error';
        }
        
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  uploadAvatar(datos){
    this.user.image = datos.response.image;
  }
}
