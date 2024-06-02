import { Component } from '@angular/core';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [NgxScannerQrcodeModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss'
})
export class AddFriendComponent {
  public output;
  public onScan(e) {
    console.log(e[0].value);
    
  }
  

}
