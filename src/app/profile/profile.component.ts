import { Component, EventEmitter, Output } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Output() public hideMap= new EventEmitter();
  public user;
  constructor(public auth: AuthService) {
    auth.user$.subscribe( (e) => {
      console.log(e);
      this.user = e;
    })
  }

  public progress = 0;
  public onLogoutClick() {
    localStorage.removeItem("key");
    this.auth.signOut();
    window.location.reload();
  }
  public onCloseClick() {
    console.log("close");
    setTimeout(() => {
      this.hideMap.emit("exit")
    }, 200)
  }
}
