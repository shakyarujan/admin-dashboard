import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    // const user = localStorage.getItem('currentUser');
    // if (user != 'currentUser') {
    //   this.router.navigate(['/login']);
    // }
  }

  logout() {
    this.auth.logout();
  }

}
