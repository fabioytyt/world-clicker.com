import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectCarComponent } from './select-car/select-car.component';
import { CurrencyPipe } from '../currency.pipe';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from '../duration-format.pipe';
import { Router } from '@angular/router';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [SelectCarComponent, CurrencyPipe, CommonModule, DurationFormatPipe],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
   public addCoins(a) {
    this.coin.addSingleCoin(a);
   }
  public hideMap(a) {
    this.router.navigate([a]);
  }

  constructor(public router: Router, public coin: CoinsService) {

  }

  public buttonVisible = true;
  ngOnInit(): void {
    if(localStorage.getItem("upgrade") && localStorage.getItem("upgradeStart")) {
      this.buttonVisible = false;
      this.selection(JSON.parse(localStorage.getItem("upgrade")))
     
    }

    setInterval( () => {
      if (JSON.parse(localStorage.getItem("upgradeStart")) && this.timeRemaining >= 0) {
     
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
          console.log(JSON.stringify(cars));
          cars.push(this.item)
          let cps = localStorage.getItem("cps")
          cps = cps + this.item.upgradeCPS;
          localStorage.setItem("cps", cps)
          localStorage.setItem("mycars",JSON.stringify(cars))
        }, 500);
        


      }
    } 
    
    }, 500)
    if(JSON.parse(localStorage.getItem("upgradeStart"))) {
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
          localStorage.setItem("mycars",JSON.stringify(cars))
        }, 500)
      }
    }
  }
public onButtonDoneClick() {
  console.log('done');
  this.upgradeClicked = false;

  
  if(this.timeRemaining <= 0) {

    localStorage.removeItem("upgrade")
    localStorage.removeItem("upgradeStart")
    console.log('done');
  this.hideMap("")
  }
  

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
    this.progress= (`${this.timeRemaining }`);
    }
    // else {
    //   this.progress= '80%'
    // }
  }
  public progress = '90%'; 
  public upgradeClicked = false;
  public onUpgradeCLick() {
    this.upgradeClicked = true
    if(localStorage.getItem("coins") > this.item.upgradePrice) {
      if(this.item) {  localStorage.setItem("upgrade", JSON.stringify(this.item))}
        localStorage.setItem("upgradeStart", JSON.stringify(new Date))
        this.addCoins(-1 * this.item.upgradePrice)
        this.buttonVisible = false
      if(this.item.level) {
        this.item = {
          Acceleration: this.item.Acceleration - this.item.upgradeZeroSixty,
          CPS: this.item.CPS + this.item.upgradeCPS,
          Color: this.item.Color,
          Cylinders: this.item.Cylinders,
          Displacement: this.item.Displacement,
          Horsepower: this.item.Horsepower + this.item.upgradeHp,
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
          upgradeCPS: ((+this.item.Horsepower + +this.item.Horsepower * 0.25) * (+this.item.Acceleration - +(this.item.Acceleration * 0.25)) * (+this.item.Cylinders) / 1000),
          upgradeZeroSixty: (this.item.Acceleration * 0.25),
          upgradeTime: (28800),
          upgradePrice: 250000
        }}
                else {
          this.item = {
            Acceleration: this.item.Acceleration - this.item.Acceleration * 0.05,
            CPS: this.item.CPS + ((+this.item.Horsepower + +this.item.Horsepower * 0.25) * (+this.item.Acceleration - +(this.item.Acceleration * 0.25)) * ((+this.item.Cylinders) / 1000)),
            Color: this.item.Color,
            Cylinders: this.item.Cylinders,
            Displacement: this.item.Displacement,
            Horsepower: this.item.Horsepower + this.item.Horsepower * 0.25,
            Miles_per_Gallon: this.item.Miles_per_Gallon + this.item.Miles_per_Gallon * 0.15,
            Name: this.item.Name,
            Origin: this.item.Origin,
            Path:this.item.Path,
            Rarity: this.item.Rarity,
            Type: this.item.Type,
            Weight_in_lbs: this.item.Weight_in_lbs,
            Year: this.item.Year,
            textColor: this.item.textColor,
            upgradeHp: this.item.Horsepower+ this.item.Horsepower * 0.25,
            upgradeGallon: this.item.Miles_per_Gallon * 0.15,
            upgradeCPS: ((+this.item.Horsepower + +this.item.Horsepower * 0.25) * (+this.item.Acceleration - +(this.item.Acceleration * 0.25)) * ((+this.item.Cylinders) / 1000)),
            upgradeZeroSixty: (this.item.Acceleration * 0.05),
            upgradeTime: (28800),
            upgradePrice: 250000
          }
        }
        
        setInterval( () => {
          if (JSON.parse(localStorage.getItem("upgradeStart")) && this.timeRemaining >= 0) {
         
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
              console.log(JSON.stringify(cars));
              cars.push(this.item)
              let cps = localStorage.getItem("cps")
              cps = cps + this.item.upgradeCPS;
              localStorage.setItem("cps", cps)
              localStorage.setItem("mycars",JSON.stringify(cars))
            }, 500);
            
    
    
          }
        } 
        
        }, 500)



      }
    }
  

  public upgradeValues() {
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
        upgradeCPS: ((+this.item.Horsepower + +this.item.Horsepower * 0.25) * (+this.item.Acceleration - +(this.item.Acceleration * 0.25)) * (+this.item.Cylinders) / 1000),
        upgradeZeroSixty: (this.item.Acceleration * 0.25),
        upgradeTime: this.item.upgradeTime * 2,
        upgradePrice: this.item.upgradePrice * 1.5,
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
          upgradeCPS: ((+this.item.Horsepower + +this.item.Horsepower * 0.25) * (+this.item.Acceleration - +(this.item.Acceleration * 0.25)) * (+this.item.Cylinders) / 1000),
          upgradeZeroSixty: (this.item.Acceleration * 0.05),
          upgradeTime: (28800),
          upgradePrice: 250000,
          level: 2
        }
      }

      
  }
  public onCloseClick() {
    
    this.hideMap("")      
  
}
}
