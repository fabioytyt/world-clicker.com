import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-car',
  standalone: true,
  imports: [],
  templateUrl: './select-car.component.html',
  styleUrl: './select-car.component.scss'
})
export class SelectCarComponent implements OnInit {
  @Input() public Car: any
  @Output() public close = new EventEmitter();

  ngOnInit(): void {
    console.log(this.Car);
    
  }
  public closeClick() {
    this.close.emit()
  }
}
