import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';

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

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    ]


};
