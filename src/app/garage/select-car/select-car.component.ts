import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-car',
  standalone: true,
  imports: [],
  templateUrl: './select-car.component.html',
  styleUrl: './select-car.component.scss'
})
export class SelectCarComponent {
  @Output() public selectCar = new EventEmitter();
  public myCars;
  
  public onCloseClick() {
    
      // this.hideMap.emit("exit")      
    
  }
  
  ngOnInit(): void {
    this.myCars = JSON.parse(localStorage.getItem("mycars"));
    console.log(this.myCars);
  }

  public onCarClick(item) {
   console.log("clicked on car", item);
   this.selectCar.emit(item)
  }
}
