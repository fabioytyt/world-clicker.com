import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarJsonService } from '../services/car-json.service';
import { Router } from '@angular/router';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-car-found',
  standalone: true,
  imports: [],
  templateUrl: './car-found.component.html',
  styleUrl: './car-found.component.scss'
})
export class CarFoundComponent implements OnInit{

    public hideMap(a) {
      this.router.navigate([a]);
    }
   
   public addCoins(a) {
    this.coin.addCpsToCoins(a)
   }

  public addCoin(coins) {
    console.log(coins);
    this.addCoins(Math.floor(coins));
  }

  public CPS: number= 0;

  public onCloseClick() {
    this.hideMap("");
  }
  public randomCar: any = {
    car: "Car12",
    hp: 1, 
    topSpeed: 152
  };

  
  public ngOnInit(): void {
    
    setTimeout(() => {
      this.getRandomCar();  
    }, 500);
    if(localStorage.getItem("mycars")) {
      // this.myCars 
      const cars = JSON.parse(localStorage.getItem("mycars"));
      console.log(localStorage.getItem("mycars"), JSON.parse(localStorage.getItem("mycars")));
      
      console.log("allcars");
      console.log(cars);
      this.myCars.push(...cars)
      console.log(this.myCars);
      
    }
  }
  public myCars: any[] = [];
  public allCars: any[] = [];
  // const requestOptions =
  

  constructor(public car:CarJsonService, public router: Router, public coin: CoinsService) {
    this.allCars = this.car.cars;
  }
  public getAllCars() {
    this.allCars = this.car.cars;
  }
  public getRandomCar() {
    console.log(this.car.cars);
    
  if(this.car.cars) {
    const randomElement = this.car.cars[Math.floor(Math.random() * this.car.cars.length)];
    console.log(randomElement);
   this.randomCar = randomElement;
    this.randomCar.CPS =  this.randomCar.Horsepower * this.randomCar.Acceleration *this.randomCar.Cylinders / 1000

    this.myCars.push(randomElement);
    console.log(this.CPS);
    
    this.CPS = this.CPS + randomElement.CPS;
    console.log(this.CPS);
    this.getCPS();
    localStorage.setItem("mycars", JSON.stringify(this.myCars))
  }
  }
  
  public getCPS() {
    
    this.addCoin(this.CPS);
    console.log(this.CPS);
    
    
  }

  


}
