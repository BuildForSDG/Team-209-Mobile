import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, take, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  is_authenticated: boolean = false;
  user;
  bearer_token: string;

  cases = [];

  httpOptionsGuest = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json'
      // 'Authorization': `Bearer:${this.bearer_token}`
    })
  };

  httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer ${this.bearer_token}`
    })
  };

  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string, password_confirmation: string) {
    // this.http.post('')
    // this.user = this.temp_user;
    return this.http
      .post(
        'https://team-209-backend.herokuapp.com/api/users',
        {
          data: {
            type: 'users',
            attributes: {
              name,
              email,
              password,
              password_confirmation
            }
          }
        },
        this.httpOptionsGuest
      )
      .pipe(
        tap((tapdata) => {
          console.log(tapdata);
        })
      );
    // localStorage.setItem('auth_user', JSON.stringify(this.user));
  }

  login(email: string, password: string) {
    return this.http
      .post(
        'https://team-209-backend.herokuapp.com/api/login',
        {
          data: {
            type: 'users',
            attributes: {
              email,
              password,
              device_name: email
            }
          }
        },
        this.httpOptionsGuest
      )
      .pipe(
        tap((tapdata) => {
          console.log('tap', tapdata);
          this.user = tapdata;
          localStorage.setItem('auth_user', JSON.stringify(this.user));
          this.bearer_token = this.user.data.attributes.token;
        })
      );
  }

  autologin() {
    let stored_user = JSON.parse(localStorage.getItem('auth_user'));
    console.log('autologin', stored_user);
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

  get_user_cases() {
    // return user cases
  }

  get_case() {}
}
