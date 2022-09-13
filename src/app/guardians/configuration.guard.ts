import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfigurationService } from '../services/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationGuard implements CanActivate {
  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {}
  canActivate(): Observable<boolean> {
    return this.configurationService.getConfiguration().pipe(
      map((configuration) => {
        if (configuration.permitirRegistro) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
