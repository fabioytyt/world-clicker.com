import { AfterViewInit, Component,  EventEmitter,  Input,  OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'rxjs';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-leaflat-map',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './leaflat-map.component.html',
  styleUrl: './leaflat-map.component.scss'
})
export class LeaflatMapComponent implements AfterViewInit{

  @Output() public hideMap: EventEmitter<string> = new EventEmitter<string>();
  @Input() public coins: number = 0;

  public lat 
  public lng

  
   iconHome = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='https://fab-io.xyz/world-clicker/assets/home.png'>",
    iconSize: [86, 105],
    iconAnchor: [43,105]
  });

  iconCar = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img id='car' src='https://fab-io.xyz/world-clicker/assets/Car.png'>",
    iconSize: [91, 105],
    iconAnchor: [48,105]
  });
  manCar = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='https://fab-io.xyz/world-clicker/assets/Man.png'>",
    iconSize: [91, 105],
    iconAnchor: [48,105]
  });
  repairShop = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#c30b82;' class='marker-pin'></div><img src='https://fab-io.xyz/world-clicker/assets/Repair.png'>",
    iconSize: [88, 117],
    iconAnchor: [44,117]
  });

  public map: L.map;
    public marker: L.marker;
  public carLayer = new L.FeatureGroup(); ;
  
  private initMap(): void {

    // navigator.geolocation.watchPosition((pos) => {
    //   const lat = pos.coords.latitude;
    //   const lng = pos.coords.longitude;
    //   const both: any[] = [lat, lng];
    //   both[0] = lat;
    //   both[1] = lng;
    navigator.geolocation.getCurrentPosition((a) => {console.log(a.coords);
      this.moveMap([a.coords.latitude, a.coords.longitude])
    });
    
    this.map = L.map('map', {
      center: [0,0],
      zoom: 18,
    });
    this.moveMap([49,12]);
  // } );
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    navigator.geolocation.watchPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      // this.generateRandomCars();
setTimeout(() => {

   L.marker([49.3,10.5833333], {icon: this.repairShop}).addTo(this.map).on("click", this.onRepairShopClick)
  
  
}, 5000);


setTimeout(() => {
 
this.currentPos = null;
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
  public onRepairShopClick() {
    console.log("jetzt");
    
  };
  constructor() { }
  public hideMapNow() {
     this.hideMap.emit("a");
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
   
    this.moveMap([a.coords.latitude, a.coords.longitude])
    
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
      
      if(dinstance < 1600) {
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

  public moveMap(a:any[]) {
    
  // let circle= L.circle([lat,lng], {radius: accuracy}).addTo(this.map);

  // this.map.fitBounds(circle.getBounds())
// setInterval(()=> {


  this.map.flyTo(a,18)


  // lng = lng + 0.001;
 

  
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
      this.hideMapNow();
      this.map.removeLayer(mark);
      this.map.removeLayer(circle);
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
      this.hideMapNow();
      this.map.removeLayer(mark2);
      this.map.removeLayer(circle2);
      }
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
}