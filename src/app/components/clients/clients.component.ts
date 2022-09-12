import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  constructor(private clientService: ClientService) {}

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
}
