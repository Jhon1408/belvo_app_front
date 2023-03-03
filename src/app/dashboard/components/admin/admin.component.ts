import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users: any;
  public displayedColumns: string[] = ['username', 'email', 'is_active', 'role'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.get().subscribe((data) => {
      this.users = data.data;
    });
  }

}
