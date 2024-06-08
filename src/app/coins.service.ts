import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { interval,Observable, Subject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinsService implements OnInit{
  public getCoins() {
    return this.coins;
  }
  public coins: number = 0;
  
  constructor(public auth: AuthService) { 
    if(localStorage.getItem("coins")) {
      this.coins = +localStorage.getItem("coins")
    }
    if(localStorage.getItem("cps")) {
      this.cps = Math.floor(+localStorage.getItem("cps"))
      this.coins = Math.floor(+localStorage.getItem("coins"))}
    
    
  }
  public intervalId = setInterval(()=>{
    
      this.coins = Math.floor(this.coins + this.cps);
      localStorage.setItem("coins", this.coins.toString())
      
    
  }, 1000);
  public ngOnInit(): void {
    if(localStorage.getItem("cps")) {
      this.cps = Math.floor(+localStorage.getItem("cps"))
      this.coins = Math.floor(+localStorage.getItem("coins"))}

   

this.auth.userData.subscribe((e) => {
      console.log("update:");
      
      console.log(e,e.update);

      var seconds = new Date().getTime() / 1000;

      if(e.update) {
        console.log(seconds, e.update, seconds - e.update);

        this.coins = +localStorage.getItem("coins") + (+localStorage.getItem("cps") * (seconds - e.update)) / 2;
        console.log(this.coins);
      }
      
    });


  }


  public addSingleCoin(coins: number) {
    this.coins = this.coins + +coins;
    localStorage.setItem("coins", this.coins.toString())

  }
  public cps: number = 0;

  public getCps() {
    return this.cps;
  }

  public addCpsToCoins(coin: number) {
    console.log("coin:",coin);
    this.cps = +this.cps + +coin;
    localStorage.setItem("cps", this.cps.toString())

  }


}
