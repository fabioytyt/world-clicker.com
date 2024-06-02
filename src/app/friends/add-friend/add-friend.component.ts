import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ScannerComponent } from './scanner/scanner.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [ScannerComponent],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.scss'
})
export class AddFriendComponent {
  @Output() public addFriend: EventEmitter<string> = new EventEmitter();
  public user;
  public key = localStorage.getItem("key");
  constructor(public auth: AuthService) {
    auth.user$.subscribe( (e) => {
      console.log(e);
      this.user = e;
    })

    this.key = localStorage.getItem("key");
  }
  public onFriendAdd(e) {
    console.log(e);
    this.addFriend.emit(e)
  }

}
