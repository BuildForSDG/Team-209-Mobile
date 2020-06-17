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
  loading: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.loading = true;

    this.authService.get_myreports().subscribe((res) => {
      console.log('reports loading', res);
      this.loading = false;
      this.reports = res;
    });
  }

  formatDate(date) {
    return new Date(date).toDateString() + ' ' + new Date(date).toLocaleTimeString();
  }
}
