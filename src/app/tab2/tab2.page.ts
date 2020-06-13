import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  reports;
  staticMap: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.authService.get_myreports().subscribe((res) => {
      console.log('reports loading', res);
      this.reports = res;
    });
  }

  showMap(lat, long) {
    return (
      'https://maps.googleapis.com/maps/api/staticmap?center=' +
      lat +
      ',' +
      long +
      '&zoom=11&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C' +
      lat +
      ',' +
      long +
      '&key=AIzaSyD8KYUm6LCGPw8yzcdoDBszbMErYqMw3PI'
    );
  }
}
