import { AfterViewInit, Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { map, take } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { CurrencyPipe } from '../currency.pipe';
import { Router } from '@angular/router';
import { CoinsService } from '../coins.service';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'app-leaflat-map',
  standalone: true,
  imports: [MatSnackBarModule, CurrencyPipe],
  templateUrl: './leaflat-map.component.html',
  styleUrl: './leaflat-map.component.scss'
})
export class LeaflatMapComponent implements AfterViewInit, OnInit{

   public hideMap(a) {
    this.router.navigate([a]);
   }
  @Input() public coins: number = 0;

  public lat 
  public lng
  public ngOnInit(): void {


    setInterval(() => {
      this.coins = this.coinService.getCoins();
      console.log("a", this.coinService.getCoins());
      
    }, 999)

    // setInterval(() => {
    //   this.auth.addDataToUser({
    //     speedMap:  [{},{},{}]
    //   })
    // }, 2500)   
    
   
    if(localStorage.getItem("garagePrice")) {
      console.log(JSON.parse(localStorage.getItem("garages")));
    let garages = JSON.parse(localStorage.getItem("garages"));
    this.garagePrice = JSON.parse(localStorage.getItem("garagePrice"))
    this.allGarages.push(...garages)
    console.log(garages);
    
    setTimeout(() => {
      garages.forEach( (e) => {
        console.log(e);      
        let garageMarker2 = L.marker([e.lat,e.lng], {icon: this.garageIcon}).addTo(this.map).on("click", ((a) => {
          console.log(a, a.latlng, this.currentPos);
          
          
            console.log();
            if(this.currentPos) {
            let distance = this.getDistance([a.latlng.lat, a.latlng.lng], [this.currentPos.coords.latitude, this.currentPos.coords.longitude])
            console.log('distance:',distance);
            // console.log('distance');
            if(distance < 100 ) {
              this.hideMap("garageClick");
              this.router.navigate(['garageClick']);
            }
          } else {
            navigator.geolocation.getCurrentPosition((b) => {
              let distance = this.getDistance([a.latlng.lat, a.latlng.lng], [b.coords.latitude, b.coords.longitude])
              console.log('distance:',distance, b);
              // console.log('distance');
              if(distance < 100 ) {
                this.hideMap("garageClick");
                this.router.navigate(['garageClick']);
              }
            })
          }
            // if(distance < 101) {
              
            // }
          
          
          // console.log( [a.latlng.lat, a.latlng.lng], [current.coords.latitude, current.coords.longitude]);
         
            
         
        }) )
        let circle2 = L.circle([e.lat,e.lng], 100).addTo(this.map).setStyle({color: '#20C912'});;
      })
    }, 500);

    

  }

  this.auth.getDataFromUser(localStorage.getItem("key")).subscribe((data) => {
    console.log('here:',data[0]);
    
  })
 

  this.auth.user$.subscribe(user => {
    console.log("user21", user);
    
    if (user) {
      this.garageService.getFriendsGarages(user.uid).pipe(
        take(1)
      ).subscribe(garages => {
        this.friendGarages = garages;
        // this.loadMap(); // Funktion zum Laden der Karte
        this.addGarageMarkers(); // Marker für die Garagen der Freunde hinzufügen
      });
    }
  });

  
  

  }

  public addGarageMarkers() {
    this.friendGarages.forEach(garage => {
      const lat = garage.location.lat;
      const lng = garage.location.lng;
      
      let garageMarker = L.marker([lat, lng], { icon: this.garageIcon }).addTo(this.map).on("click", (a => {
        let distance = this.getDistance([a.latlng.lat, a.latlng.lng], [this.currentPos.coords.latitude, this.currentPos.coords.longitude]);
        if (distance < 100) {
          // this.hideMap("garageClick");
          this.router.navigate(['garageClick']);
        }
      }));
      let circle = L.circle([lat, lng], 100).addTo(this.map).setStyle({ color: '#20C912' });
    });
  }


  
   iconHome = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='../../assets/home.png'>",
    iconSize: [86, 105],
    iconAnchor: [43,105]
  });

  iconCar = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img id='car' src='../../assets/Car.png'>",
    iconSize: [91, 105],
    iconAnchor: [48,105]
  });
  manCar = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='../../assets/Man.png'>",
    iconSize: [91, 105],
    iconAnchor: [48,105]
  });
  repairShop = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='../../assets/Repair.png'>",
    iconSize: [88, 117],
    iconAnchor: [44,117]
  });
  garageIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='../../assets/garage_locater.png'>",
    iconSize: [88, 117],
    iconAnchor: [44,117]
  });

  public map: L.map;
    public marker: L.marker;
  public carLayer = new L.FeatureGroup(); ;
  public allGarages: any[] = [];
  private initMap(): void {

    // navigator.geolocation.watchPosition((pos) => {
    //   const lat = pos.coords.latitude;
    //   const lng = pos.coords.longitude;
    //   const both: any[] = [lat, lng];
    //   both[0] = lat;
    //   both[1] = lng;
    navigator.geolocation.getCurrentPosition((a) => {console.log(a.coords);
      this.moveMap([a.coords.latitude, a.coords.longitude]);
      
    });

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((a) => {console.log(a.coords);
        this.moveMap([a.coords.latitude, a.coords.longitude]);
      });
      }, 5000)

    
    this.map = L.map('map', {
      center: [49.2,10.5],
      zoom: 18,
      attributionControl: true,

      // dragging: false,
      
    }).on("click", (e) => {
      console.log(e.latlng.lat, e.latlng.lng);
      const currency = new CurrencyPipe();
      
      var popup: L.popup = L.popup()
        .setLatLng([e.latlng.lat,e.latlng.lng])
        .setContent(`<p>Do you want to buy a Garage here</p>
        
        <p>Price: ${ currency.transform(this.garagePrice.price) } </p>
        
        <button id="buyButton">Buy Garage</button>
        
        <style>
        #buyButton {
        background-color: green;
        width: 80%;
        margin: auto;
        border-radius: 5px;
        color: white;
        }
        * {
          text-align: center;
        }
        </style>
        `
        
        )
        .openOn(this.map);

        document.getElementById("buyButton").addEventListener("click",(a) => {
          console.log(a);
          console.log(e.latlng);
          if(this.coins > (this.garagePrice.price)) {
            console.log("passt");
            this.coins = this.coins - this.garagePrice.price;
            this.garagePrice.price = this.garagePrice.price * 15
            this.allGarages.push({lat: e.latlng.lat, lng: e.latlng.lng})
            console.log(this.allGarages);
            
            localStorage.setItem("garages", JSON.stringify(this.allGarages))
            localStorage.setItem("garagePrice", JSON.stringify(this.garagePrice));
            let garageMarker = L.marker([e.latlng.lat,e.latlng.lng], {icon: this.garageIcon}).addTo(this.map).on("click", ((a) => {
              console.log(a, a.latlng, this.currentPos);
              
              
                console.log();
                let distance = this.getDistance([a.latlng.lat, a.latlng.lng], [this.currentPos.coords.latitude, this.currentPos.coords.longitude])
                console.log('distance:',distance);
                // console.log('distance');
                if(distance < 100 ) {
                  this.hideMap("garageClick");
                  this.router.navigate(['garageClick']);
                }
                
            }) )
            let circle = L.circle([e.latlng.lat,e.latlng.lng], 100).addTo(this.map).setStyle({color: '#20C912'});;
            

            
            // popup.closePopup()
          }
          
        })
    });

    
    this.moveMap([49,12]);
  // } );
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    navigator.geolocation.watchPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      // this.generateRandomCars();
setTimeout(() => {

   L.marker([49.3,10.5833333], {icon: this.repairShop}).addTo(this.map).on("click", (() => {}))
  
  
}, 5000);


setTimeout(() => {
 
// this.currentPos = null;
// this.map.removeLayer(this.currentPos)
//  this.currentPos = (L.marker([lat,lng], {icon: this.manCar}).addTo(this.map));
  // this.map.addLayer(this.carMarkers)
  
}, 5000);
   
   

  
 } );

//  this.map.on('zoomend', () => {
//   var shelterMarkers = new L.FeatureGroup();
//   // shelterMarkers.addLayer(this.marker);
//   if (this.map.getZoom() <7){
//     this.map.removeLayer(shelterMarkers);
//     console.log("moin");
    
// }
// else {
//     this.map.addLayer(shelterMarkers);
//     console.log("moin2");
    
    
// }

//  });
    tiles.addTo(this.map);
    this.path();
    this.generateRandomCars();
    // this.map.removeControl(map.zoomControl);

  }
  public garagePrice={
    price: 10000, 
    symbol: "K"};
  public onBuyGarageClick(e) {
    console.log(e);
    
  }

  public onRepairShopClick() {
    console.log("jetzt");
    
  };

  public user = JSON.parse(localStorage.getItem("userData"));
  constructor(public auth: AuthService, public router: Router, public coinService: CoinsService, public garageService: GarageService) { 

    if(localStorage.getItem("userData")) {
      console.log(JSON.parse(localStorage.getItem("userData")));
      
      this.user = JSON.parse(localStorage.getItem("userData"))
      this.user.photoUrl = this.user.photoURL
      console.log(this.user);
      
    }
    else {

    this.user = auth.user$.subscribe((e) => {console.log(e);
      this.user = e;
      // this.speedMap = e.speedMap;
    })}

    auth.userData.subscribe((e) => {
      console.log("userData:",e);
      this.speedMap = e.speedMap;
    })

    navigator.geolocation.getCurrentPosition((e) => {
      console.log('here',e);
      this.currentPos = e
    })
  }

  public onUserClick() {
    this.hideMap('garage')
    this.router.navigate(['garage']);
  }

  public hideMapNow(a) {
     this.hideMap(a);
     this.router.navigate([a]);
  }
  // public onCarClick() {
    
    
  //   console.log(this.z, this.visible);
  //   this.visible = false;
  //   this.z = 51515;
  //   console.log(this.z, this.visible);
    
  //   // this.map.hide();
  //   // this.map
  // };

  
  

  ngAfterViewInit(): void {
    
    navigator.geolocation.getCurrentPosition((a) => {this.lat = a.coords.latitude; this.lng = a.coords.longitude; console.log(this.lng, this.lat);
    
    });


    console.log(this.lat, this.lng);
    
    this.initMap();
    
   setTimeout(() => {
    // this.marker= L.marker([this.lat,this.lng], {icon: this.manCar}).addTo(this.map); 
   }, 5000);
  //  setInterval(() => {
    
  //   if(a != this.lat) {
  //     console.log("change");
      
  //   this.marker= L.marker([this.lat,this.lng], {icon: this.manCar}).addTo(this.map); 
  //   let a = this.lat;
  //    }
  //  },50)

   navigator.geolocation.watchPosition((a) => {
    console.log(a);
    // this.marker= L.marker([a.coords.latitude,a.coords.longitude], {icon: this.manCar}).addTo(this.map);
    // this.marker.setLatLng(new L.LatLng(a.coords.latitude, a.coords.longitude))
    // this.map.removeLayer(this.carLayer)
    // this.carLayer.removeLayer()
    // this.map.removeLayer(this.carLayer)
    if (this.marker != undefined) {
      this.map.removeLayer(this.marker)
    }
    // this.map.clearLayer(this.carLayer)
    // this.map.addLayer(this.carLayer)
    this.marker = L.marker([a.coords.latitude,a.coords.longitude], {icon: this.manCar}).addTo(this.map);
    // this.carLayer.addLayer(this.marker)
   
    this.moveMap([a.coords.latitude, a.coords.longitude], a.coords.speed)
    
    console.log(this.marker, this.carLayer);
    
    setTimeout(() => {
      console.log("jetzt");
      
      // this.carLayer.removeLayer()
      // this.carLayer.clear();
      // this.map.removeLayer(this.carLayer)
      
      // this.map.clearLayer(this.carLayer)
    }, 5000);
    let neu = true;
    console.log(this.generiertePositionen);
    
    this.generiertePositionen.forEach((e) => {
      let dinstance = (this.getDistance([e[0], e[1]],[this.lat, this.lng]));
      console.log("Distance:",dinstance, this.generiertePositionen);
      
      if(dinstance < 500) {
        neu = false
      }

    })
    if(neu == true)  {
        this.genNewCars();
    }



  //  this.marker = L.marker([a.coords.latitude,a.coords.longitude]).addTo(this.map);
    this.allCities.forEach((e) => {
      
      let lat = e.latitude;
      let lng = e.longitude;
      
      let lngDiff = this.lng - lng;
      let latDiff = this.lat - lat;

      // console.log(e);
      // console.log(this.lat, this.lng);
      // console.log(latDiff, lngDiff);

      if (lngDiff > -0.005 && lngDiff < 0.005) {
        console.log(e);
        console.log(this.lat, this.lng);
        console.log(latDiff, lngDiff);
      }
      
      // Hier weiter machen 
    })
   })
   this.getAllCities();
  };
  public currentPos;
  public carMarkers: L.marker;
  // public coins: number =0;
  public cars: number = +localStorage.getItem("carcount");
  public gems: number =0;
  public oldPos = {
    lat: 0,
    lng: 0
  };
  public speedMap = []
  public moveMap(a:any[], speed?: any) {
    
  // let circle= L.circle([lat,lng], {radius: accuracy}).addTo(this.map);

  // this.map.fitBounds(circle.getBounds())
// setInterval(()=> {
console.log(this.getDistance([this.oldPos.lat, this.oldPos.lng], a), a , this.oldPos);

  if(this.getDistance([this.oldPos.lat, this.oldPos.lng], a) > 2) {

  this.map.flyTo(a,18)
  this.oldPos.lat = a[0]
  this.oldPos.lng = a[1]
    // this.map.tilt(45)
    if(speed) {
    this.speedMap.push({
      lat: a[0],
      lng: a[1],
      speed: speed
    })
  setInterval(() => {
    this.auth.addDataToUser({
      speedMap: this.speedMap
    })
  }, 2500)    
  }
  // lng = lng + 0.001;
}
 

  
  }
  public distance:number =0.005;
  public path() {
    console.log("Start");

    navigator.geolocation.watchPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      this.lat = lat;
      this.lng = lng;

    
    var latlngs = [
      [lat, lng],
      [lat, lng+this.distance]
    ]
    // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(this.map);
    // this.map.fitBounds(polyline.getBounds());
  } );
  }
  public allCities: any[] = []
  public cityMarkers: any[] = []

  public isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

public getCountryName (countryCode) {
    if (this.isoCountries.hasOwnProperty(countryCode)) {
        return this.isoCountries[countryCode];
    } else {
        return countryCode;
    }
}
public randomCars: any[] = [];
public generiertePositionen: any[] = [];

public generateRandomCars() {
  console.log("generateRandomCarsStart",this.lat, this.lng);
  navigator.geolocation.getCurrentPosition( (a)=> {
    this.generiertePositionen.push([a.coords.latitude, a.coords.longitude])
    for(let i = 0; i < 25; i++ ) {
      let calcLat =a.coords.latitude + (Math.random() -0.5) / 100 
      let calcLng =a.coords.longitude + (Math.random() -0.5) / 100
      console.log(calcLat, calcLng);
      let circle = L.circle([calcLat,calcLng], 50).addTo(this.map);
      this.randomCars.push({
        "Lat":calcLat, 
        "Lng":calcLng})
     let mark =  L.marker([calcLat,calcLng], {icon: this.iconCar}).addTo(this.map); 
     mark.on("click", () => {
      if(this.getDistance( [calcLat, calcLng], [this.lat,this.lng]) <= 50) {
        console.log(calcLat, calcLng,this.getDistance( [calcLat, calcLng], [this.lat,this.lng]), this.lat, this.lng);
      this.cars++;
      localStorage.setItem("carcount", this.cars.toString())
      this.hideMapNow("carFound");
      this.router.navigate(['carFound']);
      this.map.removeLayer(mark);
      this.map.removeLayer(circle);

      this.allGarages.forEach( (item) => {
        if(this.getDistance([item.lat, item.lng],[calcLat, calcLng]) < 100) {
          this.cars++;
      localStorage.setItem("carcount", this.cars.toString())
      this.hideMapNow("carFound");
      this.router.navigate(['carFound']);
      this.map.removeLayer(mark);
      this.map.removeLayer(circle);
        }
      } )
      }
     })
      
      console.log(this.randomCars);
      this.map.removeLayer(this.map)
    }
  }) 
console.log("fertig Random");

  
  
}

public genNewCars() {
  console.log("generateRandomCarsStart",this.lat, this.lng);
  
    this.generiertePositionen.push([this.lat, this.lng])
    console.log("hier");
    for(let u = 0; u < 25; u++ ) {
      console.log("hier");
      
      let calcLat =this.lat+ (Math.random() -0.5) / 100 
      let calcLng =this.lng + (Math.random() -0.5) / 100
      console.log(calcLat, calcLng);
      let circle2 = L.circle([calcLat,calcLng], 50).addTo(this.map);
      this.randomCars.push({
        "Lat":calcLat, 
        "Lng":calcLng})
     let mark2 =  L.marker([calcLat,calcLng], {icon: this.iconCar}).addTo(this.map); 
     mark2.on("click", () => {
      if(this.getDistance( [calcLat, calcLng], [this.lat,this.lng]) <= 50) {
        console.log(calcLat, calcLng,this.getDistance( [calcLat, calcLng], [this.lat,this.lng]), this.lat, this.lng);
      this.cars++;
      localStorage.setItem("carcount", this.cars.toString())
      this.hideMapNow("carFound");
      this.router.navigate(['carFound']);
      this.map.removeLayer(mark2);
      this.map.removeLayer(circle2);
      
      }

      this.allGarages.forEach( (item) => {
        if(this.getDistance([item.lat, item.lng],[calcLat, calcLng]) < 100) {
          this.cars++;
      localStorage.setItem("carcount", this.cars.toString())
      this.hideMapNow("carFound");
      this.router.navigate(['carFound']);
      this.map.removeLayer(mark2);
      this.map.removeLayer(circle2);
        }
      } )
     })
      
      console.log(this.randomCars);
      this.map.removeLayer(this.map)
    }
  
console.log("fertig Random");

  
  
}


  public async getAllCities() {
    // https://countriesnow.space/api/v0.1/countries/population/cities
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    let currentCountry;
    await fetch("https://api.country.is/", {method: "GET", redirect:"follow"})
      .then((response) => response.json())
      .then((result) => {
        currentCountry = this.getCountryName(result.country)
      })
      .catch((error) =>{console.log(error)} );
    
    await fetch("https://countriesnow.space/api/v0.1/countries/population/cities", {method: "GET", redirect:"follow"})
      .then((response) => 
        response.json())
      .then((result) => {console.log(result.data)
       result.data.forEach(element => {
        setTimeout(() => {
          
         
          
       
        if (element.populationCounts[0].value > 10000 && element.country == currentCountry) {
          // console.log(element);
          // L.marker([this.lat,this.lng], {icon: this.iconHome}).addTo(this.map); 
          // console.log(element.city);
          

          // get Lat Long from City Name
          fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${element.city}`, {method: "GET", redirect:"follow"})
            .then((response) => response.json())
            .then((result) => {
              setTimeout(() => {
              if(result.results) {
                (L.marker([result.results[0].latitude,result.results[0].longitude], {icon: this.repairShop}).addTo(this.map));
                this.allCities.push(result.results[0])
                L.circle([result.results[0].latitude,result.results[0].longitude], 550).addTo(this.map).setStyle({color: 'red'});
            }
          }, 1000);
            })
            .catch((error) => console.log(error));

        }
        
       }); 
      }, 100);
      })
      .catch((error) => console.log(error));

      
  }
  public toRadian(a) {
    var pi = Math.PI;
    // Multiply degrees by pi divided by 180 to convert to radians.
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
    public randomCar: any = {
      car: "Car12",
      hp: 1, 
    };
    public visible = true;
    public z = 0;
    public onCloseClick() {
      this.visible = true;
      console.log(this.visible);
      
    }

    public friendGarages: any[] = [];

}
