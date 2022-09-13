import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: string = '';
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (result) => resolve(result),
        (error) => reject(error)
      );
    });
  }

  getAuth(): Observable<firebase.User | null> {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }
  SignOut(): void {
    this.afAuth.signOut();
  }
}
