
import { first } from 'rxjs/operators'

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
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
import { CommonModule, HashLocationStrategy, JsonPipe, LocationStrategy } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { WhenMovingComponent } from './when-moving/when-moving.component';
import { PrettyjsonPipe } from './prettyjson.pipe';
import { GarageComponent } from './garage/garage.component';
import routes from './app.routes';
import { CoinsService } from './coins.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GarageComponent,RouterOutlet, LeaflatMapComponent, CarFoundComponent, NavigationComponent, MyCarsComponent, CommonModule, FriendsComponent, ProfileComponent, WhenMovingComponent, PrettyjsonPipe,
     RouterModule,AngularFirestoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(public auth: AuthService, public router: Router, public coin: CoinsService) {

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

  // public addCoins(coin: number) {
    // this.coins = this.coins + coin;
   
    

  
  

  public oldDate;
  public ngOnInit(): void {
            // this.switchVisibile("whenMoving");

      setInterval(() => {
        console.log(this.coin.getCps(), 5);
        console.log("moin");
        
        this.coin.addSingleCoin(this.coin.cps)
      }, 1000)


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
    console.log(this.auth.user$, this.auth.currentUser, 
    
    )
    
  // };
    

    // this.auth.googleSignin()
   

    
    
   
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
        update: seconds,
        user: JSON.parse(localStorage.getItem("userData"))
      })
    }, 25000)

    // setTimeout(() => {
    //   this.switchVisibile("a", "carFound")
    // }, 500);
    
  }
  // public coins = 0;
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
      this.router.navigate(['']);
    }

    if(currentVisible != "exit") {
      this.visible = false;
      this.currentVisible = currentVisible
      this.router.navigate([currentVisible]);
    }
    console.log(currentVisible);
    
    
    console.log(this.visible);
    
    
    

    

    

    
    console.log(this.visible);
    
  }

  
  
  // Initialize Firebase


}
