import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  configurationDoc: AngularFirestoreDocument<Configuration>;
  configuration: Observable<Configuration>;
  // id único de la colección de configuracion
  id: string = '1';

  constructor(private angularFirestore: AngularFirestore) {}

  getConfiguration(): Observable<Configuration> {
    this.configurationDoc = this.angularFirestore.doc<Configuration>(
      `configuracion/${this.id}`
    );
    this.configuration = this.configurationDoc.valueChanges();
    return this.configuration;
  }

  updateConfiguration(configuracion: Configuration): void {
    this.configurationDoc = this.angularFirestore.doc<Configuration>(
      `configuracion/${this.id}`
    );
    this.configurationDoc.update(configuracion);
  }
}
