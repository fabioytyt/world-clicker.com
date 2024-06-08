import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectCarComponent } from './select-car/select-car.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [SelectCarComponent],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent implements OnInit{
  public hideMap(a) {
   
      this.router.navigate([a]);
    
  };
  public myCars;
  constructor(public router: Router) {}
  public onCloseClick() {
    
      this.hideMap("")      
    
  }
  
  ngOnInit(): void {
    this.myCars = JSON.parse(localStorage.getItem("mycars"));
    console.log(this.myCars);
  }
  public selectedCar: {}
  public openCar(item) {
    this.selectedCar = item
    this.carVisible = false;
  }

  public carVisible=true;
  public closeSelectedCar() {
    this.carVisible = true;
  }
}
