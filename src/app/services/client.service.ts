import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientColollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  constructor(private angularFirestore: AngularFirestore) {
    this.clientColollection = angularFirestore.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  getClients(): Observable<Client[]> {
    this.clients = this.clientColollection.snapshotChanges().pipe(
      map((elements) => {
        return elements.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }
}
