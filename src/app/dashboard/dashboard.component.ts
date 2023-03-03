import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public info: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.info = {
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role')
    };
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  goToAdmin() {
    this.router.navigate(['/dashboard/admin']);
  }

}
