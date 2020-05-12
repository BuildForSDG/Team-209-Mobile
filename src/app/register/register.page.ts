import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

name:string;
email:string;
password:string;
phone_number:string;

  constructor( private authService:AuthService) { }

  ngOnInit() {
  }

  register(){
   // console.log("login in",this.email,this.password);
   this.authService.signup(this.name,this.email,this.password);
  }

}
