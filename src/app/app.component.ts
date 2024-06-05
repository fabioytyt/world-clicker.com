
import { first } from 'rxjs/operators'

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
import { CommonModule, JsonPipe } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { WhenMovingComponent } from './when-moving/when-moving.component';
import { PrettyjsonPipe } from './prettyjson.pipe';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeaflatMapComponent, CarFoundComponent, NavigationComponent, MyCarsComponent, CommonModule, FriendsComponent, ProfileComponent, WhenMovingComponent, PrettyjsonPipe],
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
  public oldDate;
  public ngOnInit(): void {
    this.myCars = JSON.parse(localStorage.getItem("mycars"))
    navigator.geolocation.watchPosition((e) => {e
      // speed in m/s
      // * 3.6 = km/h
      let speed = e.coords.speed * 3.6;
      console.log("hier", speed );  
      this.speed = speed;
      var visible;
      if (speed > 25)  {
        // this.visible = false;
        // this.currentVisible = "";
        visible = true;
        this.switchVisibile("whenMoving")
      }
      else if(visible == true ){
        this.switchVisibile("exit");
        visible = false;
      }

     
    })
    // if(!this.oldDate){
    console.log(this.auth.user$, this.auth.currentUser, this.auth.userData.subscribe((e) => {
      console.log("update:");
      
console.log(e,e.update);

var seconds = new Date().getTime() / 1000;
// if(e.update.seconds) {
      if(e.update) {
        console.log(seconds, e.update, seconds - e.update);

   this.coins = +localStorage.getItem("coins") + (+localStorage.getItem("cps") * (seconds - e.update)) / 2;
 console.log(this.coins);
 
// }
      }
      // this.currentVisible("whenMoving")
    }
    
    ))
    
  // };
    

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
      
      var seconds = new Date().getTime() / 1000;
      this.updateUserDat({
        myCars: JSON.parse(localStorage.getItem("mycars")),
        carcount: localStorage.getItem("carcount"),
        coins: localStorage.getItem("coins"),
        cps: localStorage.getItem("cps"),
        update: seconds
      })
    }, 25000)

    // setTimeout(() => {
    //   this.switchVisibile("a", "carFound")
    // }, 500);
    
  }
  public coins = 0;
  public myCars: [];
  public updateUserDat( data: {}){
    this.auth.addDataToUser(data)
  }

  public visible = true;
  public speed 
  public switchVisibile(currentVisible: string) {
    // this.visible = !this.visible;

    if(currentVisible == "exit") {
      this.visible = true;
      this.currentVisible = "exit"
    }

    if(currentVisible != "exit") {
      this.visible = false;
      this.currentVisible = currentVisible
    }
    console.log(currentVisible);
    
    
    console.log(this.visible);
    
    
    

    

    

    
    console.log(this.visible);
    
  }

  
  
  // Initialize Firebase


}
