import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarJsonService } from '../services/car-json.service';

@Component({
  selector: 'app-car-found',
  standalone: true,
  imports: [],
  templateUrl: './car-found.component.html',
  styleUrl: './car-found.component.scss'
})
export class CarFoundComponent implements OnInit{
  @Output() public hideMap: EventEmitter<string> = new EventEmitter<string>();
  @Output() public addCoins: EventEmitter<number> = new EventEmitter<number>();

  public addCoin(coins) {
    console.log(coins);
    this.addCoins.emit(Math.floor(coins));
  }

  public CPS: number= 0;

  public onCloseClick() {
    this.hideMap.emit("a");
  }
  public randomCar: any = {
    car: "Car12",
    hp: 1, 
    topSpeed: 152
  };
  public ngOnInit(): void {
    this.getAllCars();
    setTimeout(() => {
      this.getRandomCar();  
    }, 100);
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
  

  constructor(public car:CarJsonService) {

  }
  public getAllCars() {
    this.allCars = this.car.cars;
  }
  public getRandomCar() {
  
    const randomElement = this.allCars[Math.floor(Math.random() * this.allCars.length)];
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
  
  public getCPS() {
    
    this.addCoin(this.CPS);
    console.log(this.CPS);
    
    
  }

  


}
