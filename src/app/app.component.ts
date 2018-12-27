import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  
  greet;
  
  constructor(private auth: AuthService, private route: Router) {
    var date = new Date();
    var time = date.getHours();
    if (time < 12) {
      this.greet  = 'Good Morning';
    } else if (time >= 12 && time <= 17) {
      this.greet =  'Good Afternoon';
    } else if (time > 17 && time <= 24) {
      this.greet = 'Good Evening';
    } else {
      this.greet =  "I'm not sure what time it is!";
    }
  }

  logout() {	
    this.auth.logout();
    this.route.navigate(['/login']);
  }

}
