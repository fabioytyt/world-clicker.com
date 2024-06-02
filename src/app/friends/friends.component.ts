import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit{
  @Output() public hideMap = new EventEmitter();
  constructor(public auth: AuthService) {}
  public friends: any[] = [];
  public friendData: any[] = [];
  public ngOnInit(): void {
    if(localStorage.getItem("friends")){this.friends = JSON.parse(localStorage.getItem("friends"));}

    this.getAllFriends();
  }
  public addFriend(e) {
    console.log(e, e.length);
    
    if(e.length > 20 && e.length < 32 ){
      this.friends.push(e)
      localStorage.setItem("friends", JSON.stringify(this.friends))
    }
   
    this.getAllFriends();
  }
  public removeDup(arr) {
    let result = []
    arr.forEach((item, index) => { if (result.indexOf(item) === -1) result.push(item) });
    return result;
  }

  public getAllFriends() {
    this.friendData = [];
     this.removeDup(this.friends).forEach((e) => {
      console.log(e);
      console.log(this.auth.getUserData(e).subscribe((e) => {
        console.log(e);
        this.friendData.push(e[0]);
      }));
    })
  }
  public onCloseClick() {
    console.log("close");
    setTimeout(() => {
      this.hideMap.emit("exit")
    }, 200)
  }
}
