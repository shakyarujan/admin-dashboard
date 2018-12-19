import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';

  constructor(private auth: AuthService) {}

  /*
  	logout function - auth service 
   */
  logout() {
    this.auth.logout();
  }
}
