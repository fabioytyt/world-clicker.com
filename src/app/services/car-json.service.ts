import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarJsonService {
  public cars
  constructor() {
  
    fetch("https://world-clicker.com/assets/cars.json", {
    method: "GET",
    redirect: "follow"
  })
    .then((response) => response.json())
    .then((result) => {console.log(result)
      this.cars = result
      console.log(this.cars);
      
    })
    .catch((error) => console.error(error));
   }
}
