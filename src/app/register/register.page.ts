import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:string;
  password:string;
  name:string;
  phone_number:string;

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log("login in",this.email,this.password);
  }

}
