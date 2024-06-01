


import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaflatMapComponent } from './leaflat-map/leaflat-map.component';
import { CarFoundComponent } from './car-found/car-found.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeaflatMapComponent, CarFoundComponent, NavigationComponent, MyCarsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(public auth: AuthService) {

  } 
  public signIn() {
   this.auth.googleSignin()
   setInterval(() => {
    if (localStorage.getItem("key")) {
      window.location.reload();
    }
   }, 500)
   
  }
  public key = localStorage.getItem("key");
  title = 'world-clicker';
  public currentVisible;
  public cps = 0;
  public addCoins(coin) {
    // this.coins = this.coins + coin;
    console.log("coin:",coin);
    this.cps = this.cps + coin;
    localStorage.setItem("cps", this.cps.toString())

    

  }
  public ngOnInit(): void {
    console.log(this.auth.user$, this.auth.currentUser);
    

    // this.auth.googleSignin()
   

    if(localStorage.getItem("cps")) {
    this.cps = Math.floor(+localStorage.getItem("cps"))
    this.coins = Math.floor(+localStorage.getItem("coins"))}
    
    setInterval(()=> {
      Math.floor(this.coins = this.coins + this.cps);
      localStorage.setItem("coins", this.coins.toString())
      
    }, 1000)
    this.updateUserDat({
      myCars: JSON.parse(localStorage.getItem("mycars")),
      carcount: localStorage.getItem("carcount"),
      coins: localStorage.getItem("coins"),
      cps: localStorage.getItem("cps"),
    })
    setInterval(()=> {
      this.updateUserDat({
        myCars: JSON.parse(localStorage.getItem("mycars")),
        carcount: localStorage.getItem("carcount"),
        coins: localStorage.getItem("coins"),
        cps: localStorage.getItem("cps"),
        update: new Date
      })
    }, 25000)

    // setTimeout(() => {
    //   this.switchVisibile("a", "carFound")
    // }, 500);
    
  }
  public coins = 0;
  
  public updateUserDat( data: {}){
    this.auth.addDataToUser(data)
  }

  public visible = true;

  public switchVisibile(a, currentVisible: string) {
    console.log(this.visible);
    
    
    this.visible = !this.visible;

    

    if(this.visible == false) {
      this.currentVisible = currentVisible
    }

    
    console.log(this.visible);
    
  }

  
  
  // Initialize Firebase


}
