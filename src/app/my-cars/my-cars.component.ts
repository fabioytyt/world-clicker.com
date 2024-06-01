import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent implements OnInit{
  @Output() public hideMap= new EventEmitter();
  public myCars;
  
  public onCloseClick() {
    this.hideMap.emit("garage")
  }
  
  ngOnInit(): void {
    this.myCars = JSON.parse(localStorage.getItem("mycars"));
    console.log(this.myCars);
  }
}
