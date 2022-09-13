import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
})
export class UpdateClientComponent implements OnInit {
  client: Client = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id: string;
  constructor(
    private clientService: ClientService,
    private flashMessaggesService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client) => {
      console.log(client);

      this.client = client;
    });
  }

  guardar({ value, valid }: { value: Client; valid: boolean }): void {
    if (!valid) {
      this.flashMessaggesService.show(
        'Por favor llenar el formulario correctamente',
        {
          cssClass: 'alert-danger',
          timeout: 4000,
        }
      );
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(): void {
    if (confirm('Seguro que quiere eliminar el cliente?')) {
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }
}
