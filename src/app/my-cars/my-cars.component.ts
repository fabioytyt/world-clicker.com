import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-cars',
  standalone: true,
  imports: [],
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent implements OnInit{
  public myCars;
  
  
  ngOnInit(): void {
    this.myCars = JSON.parse(localStorage.getItem("mycars"));
    console.log(this.myCars);
  }
}
