import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa : AngularFireAuth) { }

  async login(user : User){
    await this.afa.signInWithEmailAndPassword(user.email, user.password);

  }

  async register(user : User){
    await this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    return this.afa.signOut();
  }

  getAuth(){
    return this.afa;
  }
}
