import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private router: Router,private authService:AuthServiceService) { }

  ngOnInit() {
  }

  login(){
    console.log("login in",this.authService.is_authenticated);
   this.authService.login();
   this.router.navigate(['/']);
    
  }

}
