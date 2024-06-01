import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth} from "firebase/auth";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestoreDocument, AngularFirestore} from '@angular/fire/compat/firestore' 
import * as firebase from "firebase/app"
// import  auth from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe( 
      switchMap((user) => {
        if(user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    )

  }
  public currentUser;
  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.currentUser = credential.user;
    console.log(credential);
    localStorage.setItem("key", credential.user.uid)
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
// ,inputData: {}
  public updateUserData(user) {
    console.log("update User Data");
    
    const firebaseConfig = {
      apiKey: "AIzaSyBIOLzTWv2k0zlLq9irCW51C0s4cL2erzE",
      authDomain: "login-mit-firebase-database.firebaseapp.com",
      databaseURL: "https://login-mit-firebase-database-default-rtdb.firebaseio.com",
      projectId: "login-mit-firebase-database",
      storageBucket: "login-mit-firebase-database.appspot.com",
      messagingSenderId: "1098866553749",
      appId: "1:1098866553749:web:16959403ee329378733c9c",
      measurementId: "G-YR90LWTHZ2"
    };

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    console.log(user.uid);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL
    };
    return userRef.set(data, {merge: true});
  }


  public addDataToUser(data:  {}) {
    
     if(localStorage.getItem("key")){
      // this.googleSignin()
      // console.log(data, this.currentUser._delegate.uid);
      const user = localStorage.getItem("key")
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user}/data/data`);
      return userRef.set(data, {merge: true});
    }
    else if (this.currentUser) {
      console.log(data, this.currentUser._delegate.uid);
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.currentUser._delegate.uid}/data/data`);
      return userRef.set(data, {merge: true});
    }
    else {
      return null;
    }
  }


}
