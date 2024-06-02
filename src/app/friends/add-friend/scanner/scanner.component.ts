import { Component, OnInit } from '@angular/core';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.scss'
})
export class ScannerComponent implements OnInit {
 public ngOnInit(): void {
    console.log(NgxScannerQrcodeComponent);
  }
  public output;
  public friends:any[];
  public onScan(e) {
    console.log(e[0].value);
    
  } 

}
