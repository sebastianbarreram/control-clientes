import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private flashMessaggesService: FlashMessagesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessaggesService.show(error.message,
          {
            cssClass: 'alert-danger',
            timeout: 4000,
          })
      });
  }
}
