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

  logout() {
  	
    this.auth.logout();
  }

//  // Greeting 
// greeting() {
// var d = new Date();
// var time = d.getHours();

// if (time < 12) {
//   document.write("<b>Good morning!</b>");
// }
// if (time > 12) {
//   document.write("<b>Good afternoon!</b>");
// }
// if (time == 12) {
//   document.write("<b>Go eat lunch!</b>");
// }

// }
}
