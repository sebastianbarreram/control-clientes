import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  client: Client = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  @ViewChild('clienteForm') clienteform: NgForm;
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(
    private clientService: ClientService,
    private flashMessaggesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
  getSaldoTotal(): number {
    let saldoTotal: number = 0;
    if (this.clients) {
      this.clients.forEach((client) => {
        saldoTotal += client.saldo;
      });
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessaggesService.show(
        'Por favor llenar el formulario correctamente',
        {
          cssClass: 'alert-danger',
          timeout: 4000,
        }
      );
    } else {
      this.clientService.addClient(value);
      this.clienteform.resetForm();
      this.closeModal();
    }
  }
  
  private closeModal() {
    this.closeButton.nativeElement.click();
  }
}
