import { Component, NgModule, OnInit } from '@angular/core';
// import { GaugeChartComponent, GaugeChartModule } from 'angular-gauge-chart';
import { NgxGaugeModule } from 'ngx-gauge';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { PrettyjsonPipe } from '../prettyjson.pipe';





@Component({
  selector: 'app-when-moving',
  standalone: true,
  imports: [NgxGaugeModule, CommonModule, PrettyjsonPipe],
  templateUrl: './when-moving.component.html',
  styleUrl: './when-moving.component.scss'
})
export class WhenMovingComponent implements OnInit{
  constructor(public auth: AuthService) {
    this.auth.userData.subscribe((e) => {
      console.log("userData:",e);
      this.speedMap = e.speedMap;
      
    })  
  }

  ngOnInit() {
setInterval( () => {
 let key = localStorage.getItem("key")

  // this.gaugeValue = Math.random() * 300
}, 500)

    navigator.geolocation.watchPosition( (e) => {
      this.speed = e.coords.speed * 3.6;

      if(e.coords.speed) {
        this.speedMap.push({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
          speed: e.coords.speed,
          date: new Date()
        })
      }
    })
    setInterval(() => {
      this.auth.addDataToUser({speedMap: this.speedMap})
    }, 25000)
  }
  public speedMap = []

  

  public toRadian(a) {
    var pi = Math.PI;
    return a * (pi/180);
  }

  public getDistance(origin, destination) {
    // return distance in meters
    var lon1 = this.toRadian(origin[1]),
        lat1 = this.toRadian(origin[0]),
        lon2 = this.toRadian(destination[1]),
        lat2 = this.toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;

    console.log(c, EARTH_RADIUS);
    
    return c * EARTH_RADIUS * 1000;
  }
  public oldPos = {
    lat: 0,
    lng: 0
  };
  public moveMap(a:any[]) {
    console.log(this.getDistance([this.oldPos.lat, this.oldPos.lng], a), a , this.oldPos);
  
    if(this.getDistance([this.oldPos.lat, this.oldPos.lng], a) > 2) {
      this.distance = this.distance + 2;
    this.oldPos.lat = a[0]
    this.oldPos.lng = a[1]
  }
  };
  public distance = 0;
  public speed = 0;

  gaugeType = "semi";
    gaugeValue = this.speed;
    gaugeLabel = "Speed";
    gaugeAppendText = "km/h";
  
}
