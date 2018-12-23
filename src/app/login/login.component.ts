import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.compose([Validators.required,
              Validators.maxLength(10), Validators.minLength(6)]));

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: this.username,
      password: this.password
    });
  }

  onSubmit() {

    const data = this.loginForm.value;
    const value = Md5.hashStr(data.password);

    const credentials = {
      username: data.username,
      password: value
    };

    if (this.loginForm.valid) {
      this.authService.loginUser(credentials).subscribe( res => {

        if (typeof res[0] == 'undefined') {
          this.showDanger();
          //alert('Please enter a valid email username and password');
          this.router.navigateByUrl('/login');

        } else {
          this.showSuccess();
          localStorage.setItem('currentUser', JSON.stringify(res[0].username));
          this.router.navigate(['/index']);
          this.authService.setLoggedIn(true);
        }

      }, error => {
        console.log(error);
      });
    }
  }

  // ------------ Toast message ------------------------------//
  showSuccess() {
    this.toastr.success('You are Sucessfully login!', 'Success!');
  }

  showDanger() {
    this.toastr.warning('Please enter the valid username and password', 'Alert!');
  }


  // ------------ End Toast message ------------------------------//

}
