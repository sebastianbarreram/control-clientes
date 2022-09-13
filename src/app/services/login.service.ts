import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: string = '';
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (result) => resolve(result),
        (error) => reject(error)
      );
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      window.alert('se ha cerrado la sesión');
      this.token = '';
      this.router.navigate(['login']);
    });
  }
  estaAutenticado() {
    return this.token != '';
  }
}
