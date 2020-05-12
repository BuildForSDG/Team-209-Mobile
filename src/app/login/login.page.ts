import {
    Component, OnInit
}
from '@angular/core';
import {
    AuthService
}
from '../service/auth.service';
import {
    Router, ActivatedRoute
}
from '@angular/router';


@Component({ selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss'], }) export class LoginPage implements OnInit {

    email: string;
    password: string;


    constructor(private router: Router, private authService:AuthService) {}

    ngOnInit() {}

    login() {
        console.log("login in", this.authService.is_authenticated);
        this.authService.login(this.email, this.password);

        console.log("logging in", this.authService.is_authenticated);
        this.router.navigate(['/']);

    }

}
