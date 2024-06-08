import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DoubleClickZoomHandler } from '@maptiler/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public switchVisible(a) {
  
      this.router.navigate([a]);
    
  }

ngOnInit(): void {
  // this.switchVisible.emit({"a", "b"})
}
public user;
public image;

public onImageClick() {
  console.log("click");
  this.switchVisible('')
}

constructor(
  public auth: AuthService,
  public router: Router
) {
  this.user = auth.currentUser;
  console.log(auth, auth.user$);

  auth.user$.subscribe((e) => {console.log(e);
    this.user = e.displayName;
    this.image = e.photoUrl;
    console.log(this.image);
    console.log(e.displayName);
    console.log(this.user);
    
    
  })
  
}
}
