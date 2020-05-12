import {Injectable} from '@angular/core';
import {User} from '../interface/user';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})export class AuthService {

    is_authenticated : boolean = false;
    user : User;
    temp_user : User = {
        name: "Phee",
        email: "demo@gmail.com",
        token_id: "1111",
        phone_number: "12345"
    };

    cases = [];


    constructor(private http : HttpClient) {}

    signup(name : string, email : string, password : string, phone_number? : string) { // this.http.post('')
        this.user = this.temp_user;
        localStorage.setItem('auth_user', JSON.stringify(this.user));
    }

    login(email : string, password : string) {
        this.user = this.temp_user;
        localStorage.setItem('auth_user', JSON.stringify(this.user));
    }

    autologin() {
        let stored_user = JSON.parse(localStorage.getItem('auth_user'));
        console.log("autologin", stored_user);
        if (stored_user) {
            this.user = stored_user;
        } else {
            return;
        }

    }

    logout() {
        this.user = null;
        localStorage.removeItem('auth_user');
    }

    get_user_cases() { // return user cases
    }

    get_case() {}

}
