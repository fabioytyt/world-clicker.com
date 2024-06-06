import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectCarComponent } from './select-car/select-car.component';
import { CurrencyPipe } from '../currency.pipe';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from '../duration-format.pipe';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [SelectCarComponent, CurrencyPipe, CommonModule, DurationFormatPipe],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
  @Output() public addCoins= new EventEmitter();
  @Output() public hideMap = new EventEmitter();
  public buttonVisible = true;
  ngOnInit(): void {
    if(localStorage.getItem("upgrade") && localStorage.getItem("upgradeStart")) {
      this.buttonVisible = false;
      this.selection(JSON.parse(localStorage.getItem("upgrade")))
      
    }

    setInterval( () => {
      const now: Date= new Date();  
      const start = new Date(JSON.parse(localStorage.getItem("upgradeStart")));
      this.timeRemaining = this.item.upgradeTime  - (+(now.getTime()) / 1000 - start.getTime() /1000 )
      console.log(this.timeRemaining,new Date(JSON.parse(localStorage.getItem("upgradeStart"))) ,   (now.getTime()));
      if(this.timeRemaining <= 0) {
        let cars = JSON.parse(localStorage.getItem("mycars"));

        // var filterd = cars.filter((e) => {
        //   console.log(e, e.Name, JSON.parse(localStorage.getItem("upgrade")));
        //   let storage = JSON.parse(localStorage.getItem("upgrade"))
        //   return e.Name != storage.Name
        // }) 
        // console.log(filterd[0]);

        // cars = filterd
        // cars.remove(filterd[0])
        cars.forEach((element, index) => {
          console.log(element, index);
          if(element.Name == this.item.Name) {
            this.selectedIndex = index;
          }
        });
        setTimeout(() => {
          cars.splice(this.selectedIndex, 1);
          console.log(cars);
          cars.push(this.item)
          let cps = localStorage.getItem("cps")
          cps = cps + this.item.upgradeCPS;
          localStorage.setItem("cps", cps)
          localStorage.setItem("mycars",cars)
        }, 500);
        


      }
    }, 500)

  }
public onButtonDoneClick() {
  this.hideMap.emit("exit")
}

  public selectedIndex;
  public timeRemaining;
  public selectedCar;
  public onSelectClick() {
    if(this.buttonVisible) {
    console.log("onSelectClick");
    this.selectVisible = true;}
  }
  public item;
  public selectVisible = false;

  public selection(e)  {
    this.selectVisible = false;
    console.log(e);
    this.item = e;
    this.upgradeValues();
    if(this.timeRemaining > 0) {
    this.progress= (this.timeRemaining / 1000 + '%');
    }
    else {
      this.progress= '80%'
    }
  }
  public progress; 
  public onUpgradeCLick() {
    if(localStorage.getItem("coins") > this.item.upgradePrice) {
      if(this.item) {  localStorage.setItem("upgrade", JSON.stringify(this.item))}
        localStorage.setItem("upgradeStart", JSON.stringify(new Date))
        this.addCoins.emit(-1 * this.item.upgradePrice)

      if(this.item.level) {
        this.item = {
          Acceleration: this.item.Acceleration,
          CPS: this.item.CPS,
          Color: this.item.Color,
          Cylinders: this.item.Cylinders,
          Displacement: this.item.Displacement,
          Horsepower: this.item.Horsepower,
          Miles_per_Gallon: this.item.Miles_per_Gallon,
          Name: this.item.Name,
          Origin: this.item.Origin,
          Path:this.item.Path,
          Rarity: this.item.Rarity,
          Type: this.item.Type,
          Weight_in_lbs: this.item.Weight_in_lbs,
          Year: this.item.Year,
          textColor: this.item.textColor,
          upgradeHp: this.item.Horsepower * 0.25,
          upgradeGallon: this.item.Miles_per_Gallon * 0.15,
          upgradeCPS: ((+this.item.Horsepower + +this.item.upgradeHp) * (+this.item.Acceleration - +this.item.upgradeZeroSixty) * (+this.item.Cylinders) / 1000),
          upgradeZeroSixty: Math.round(this.item.Acceleration * 0.05),
          upgradeTime: (28800),
          upgradePrice: 250000,
          level: this.item.level + 1
        }}
                else {
          this.item = {
            Acceleration: this.item.Acceleration,
            CPS: this.item.CPS,
            Color: this.item.Color,
            Cylinders: this.item.Cylinders,
            Displacement: this.item.Displacement,
            Horsepower: this.item.Horsepower,
            Miles_per_Gallon: this.item.Miles_per_Gallon,
            Name: this.item.Name,
            Origin: this.item.Origin,
            Path:this.item.Path,
            Rarity: this.item.Rarity,
            Type: this.item.Type,
            Weight_in_lbs: this.item.Weight_in_lbs,
            Year: this.item.Year,
            textColor: this.item.textColor,
            upgradeHp: this.item.Horsepower * 0.25,
            upgradeGallon: this.item.Miles_per_Gallon * 0.15,
            upgradeCPS: ((+this.item.Horsepower + +this.item.upgradeHp) * (+this.item.Acceleration - +this.item.upgradeZeroSixty) * (+this.item.Cylinders) / 1000),
            upgradeZeroSixty: Math.round(this.item.Acceleration * 0.05),
            upgradeTime: (28800),
            upgradePrice: 250000,
            level: 2}
        }
        
      }
    }
  

  public upgradeValues() {
    	this.item = {
        Acceleration: this.item.Acceleration,
        CPS: this.item.CPS,
        Color: this.item.Color,
        Cylinders: this.item.Cylinders,
        Displacement: this.item.Displacement,
        Horsepower: this.item.Horsepower,
        Miles_per_Gallon: this.item.Miles_per_Gallon,
        Name: this.item.Name,
        Origin: this.item.Origin,
        Path:this.item.Path,
        Rarity: this.item.Rarity,
        Type: this.item.Type,
        Weight_in_lbs: this.item.Weight_in_lbs,
        Year: this.item.Year,
        textColor: this.item.textColor,
        upgradeHp: this.item.Horsepower * 0.25,
        upgradeGallon: this.item.Miles_per_Gallon * 0.15,
        upgradeCPS: ((+this.item.Horsepower + +this.item.upgradeHp) * (+this.item.Acceleration - +this.item.upgradeZeroSixty) * (+this.item.Cylinders) / 1000),
        upgradeZeroSixty: Math.round(this.item.Acceleration * 0.05),
        upgradeTime: (28800),
        upgradePrice: 250000
      }

      
  }
}
