import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, take, catchError } from 'rxjs/operators';
import { FORMERR } from 'dns';

@Injectable({ providedIn: 'root' })
export class AuthService {
  is_authenticated: boolean = false;
  user;
  bearer_token: string;
  user_id: string;

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
      //'Content-Type': 'multipart/form-data',
      'Content-Type': 'application/vnd.api+json',
      //'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2),
      Accept: 'application/vnd.api+json',
      Authorization: `Bearer 1|y2T3BqJ60Pn6onBGAmWTLvkfnTFrQxcxCKwul0aBnEaR360lohwNxLZP0AGVPMPlKQoAGXupwcwtEOco`
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
          this.user_id = this.user.data.id;
        })
      );
  }

  autologin() {
    let stored_user = JSON.parse(localStorage.getItem('auth_user'));
    console.log('autologin', stored_user);
    if (stored_user) {
      this.user = stored_user;
      this.bearer_token = this.user.data.attributes.token;
      this.user_id = this.user.data.id;
      console.log('bearer_token', this.bearer_token);
    } else {
      return;
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem('auth_user');
  }

  get_myreports() {
    return this.http.get(' https://team-209-backend.herokuapp.com/api/users/1?include=reports', this.httpOptionsAuth);
  }

  upload_image(image: File) {
    console.log('image-obj', image);
    const form = new FormData();
    form.append('image', image);
    console.log(form, form.get('image'));
    return this.http.post(
      'https://team-209-backend.herokuapp.com/api/users/' + '1' + '/image',
      form,
      this.httpOptionsAuth
    );
  }

  upload_attachment(image: File, report) {
    console.log('image-obj', image);
    const form = new FormData();
    form.append('images[]', image);
    form.append('report_id', report.data.id);

    return this.http.post('https://team-209-backend.herokuapp.com/api/attachments', form, this.httpOptionsAuth);
  }

  create_report(description, longitude, latitude) {
    return this.http.post(
      'https://team-209-backend.herokuapp.com/api/reports',
      {
        data: {
          type: 'reports',
          attributes: {
            latitude: longitude.toString(),
            longitude: latitude.toString(),
            description: description
          }
        }
      },
      this.httpOptionsAuth
    );
  }

  attach_images(report_id, image) {}
}
