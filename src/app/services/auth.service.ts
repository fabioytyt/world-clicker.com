import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth} from "firebase/auth";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestoreDocument, AngularFirestore} from '@angular/fire/compat/firestore' 
import * as firebase from "firebase/app"
import { Firestore, collection, doc, setDoc } from 'firebase/firestore/lite';
// import  auth from 'firebase/compat/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<any>;
  public userData: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    // public firestore: Firestore
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
      
    this.userData = this.afAuth.authState.pipe( 
    
      switchMap((user) => {
        if(user) {
          return this.afs.doc<any>(`users/${user.uid}/data/data`).valueChanges();
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
    localStorage.setItem("userData", JSON.stringify(credential.user))
    this.updateUserData(credential.user);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }
// ,inputData: {}
    public firebaseConfig = {
      apiKey: "AIzaSyBIOLzTWv2k0zlLq9irCW51C0s4cL2erzE",
      authDomain: "login-mit-firebase-database.firebaseapp.com",
      databaseURL: "https://login-mit-firebase-database-default-rtdb.firebaseio.com",
      projectId: "login-mit-firebase-database",
      storageBucket: "login-mit-firebase-database.appspot.com",
      messagingSenderId: "1098866553749",
      appId: "1:1098866553749:web:16959403ee329378733c9c",
      measurementId: "G-YR90LWTHZ2"
    };
  public updateUserData(user) {
    console.log("update User Data");
    
    

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    console.log("uid:", user.email, user.displayName, user.photoUrl, user.uid, userRef, user);
    let data:any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      test: "test"
      }
      // console.log( userRef.set(data));
      
      this.addDataToUser(data)
      this.addUserData(data)
      // this.addInfos(data, user.uid);
    return userRef.set(data);
  }

  

  // , {merge: true}

  public getUserData(user) {
    
      // return this.afAuth.authState.pipe( 
      //   switchMap((user) => {
      //     if(user) {
        // const userRef: AngularFirestoreDocument<any>
        
         
          
        return this.afs.collection('users/', ref => ref.where('uid', '==', user)).valueChanges();
          
        
        
            // return userRef;
  //         }
  //         else {
  //           return of(null);
  //         }
  //       })
  //     )


        
  }
  public addUserData(data:  {}) {
    
    if(localStorage.getItem("key")){
     // this.googleSignin()
     // console.log(data, this.currentUser._delegate.uid);
     const user = localStorage.getItem("key")
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user}`);
     return userRef.set(data);
   }
   else if (this.currentUser) {
     console.log(data, this.currentUser._delegate.uid);
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.currentUser._delegate.uid}`);
     return userRef.set(data);
   }
   else {
     return null;
   }
 }



  public addDataToUser(data:  {}) {
    
     if(localStorage.getItem("key")){
      // this.googleSignin()
      // console.log(data, this.currentUser._delegate.uid);
      const user = localStorage.getItem("key")
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user}/data/data`);
      return userRef.set(data);
    }
    else if (this.currentUser) {
      console.log(data, this.currentUser._delegate.uid);
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.currentUser._delegate.uid}/data/data`);
      return userRef.set(data);
    }
    else {
      return null;
    }
  }

  public getDataFromUser(user) {
    return this.afs.collection(`users/${user}/data/data`, ref => ref.where('uid', '==', user)).valueChanges();
  }


}
