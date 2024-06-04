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
  public user = JSON.parse(localStorage.getItem("userData"));
  constructor(public auth: AuthService) {
    if(localStorage.getItem("userData")) {
      console.log(JSON.parse(localStorage.getItem("userData")));
      
      this.user = JSON.parse(localStorage.getItem("userData"))
      console.log(this.user);
      this.user.photoUrl = this.user.photoURL
      
    }
    else {

    auth.user$.subscribe( (e) => {
      console.log(e);
      if(e) {
      this.user = e;}
      else {

      }
    })
    auth.getDataFromUser((e) => {
      // this.user = 
    })
  }
    
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
