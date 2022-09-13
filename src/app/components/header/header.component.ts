import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.configurationService.getConfiguration().subscribe((configuration) => {
      this.permitirRegistro = configuration.permitirRegistro;
    });
  }

  logout(): void {
    this.loginService.SignOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
