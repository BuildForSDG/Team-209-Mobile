import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  //type IUSer
  is_authenticated :boolean= false;

  user ={
    name:'John Doe', 
    email:'jdoe@gmail.com',
    phone_number:'5555555555',
    token_id:'demo'
  }

  constructor() { }

  login(){
   // authenicate user 
   setTimeout(() => {
    this.is_authenticated=true;
    console.log('authenticated');
   },1000*2);

  }

  logout(){
    // authenicate user 
    setTimeout(() => {
     this.is_authenticated=false;
    },1000*2);
 
   }

   check_auth(){

    //if session/local storage has expired return false

    //if token_id isnt valid
   }
}


