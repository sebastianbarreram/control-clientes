import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/models/configuration.model';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  permitirRegistro = false;
  constructor(
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.configurationService
      .getConfiguration()
      .subscribe((configuration: Configuration) => {
        this.permitirRegistro = configuration.permitirRegistro;
      });
  }
  guardar() {
    let configuracion: Configuration = {
      permitirRegistro: this.permitirRegistro,
    };
    this.configurationService.updateConfiguration(configuracion);
    this.router.navigate(["/"])
  }
}
