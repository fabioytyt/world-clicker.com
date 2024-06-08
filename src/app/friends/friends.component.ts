import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent implements OnInit{
   public hideMap(a) {
  
      this.router.navigate([a]);
   
   }
  constructor(public auth: AuthService, public router: Router, public route: ActivatedRoute) {}
  public friends: any[] = [];
  public friendData: any[] = [];
  public id;
  public ngOnInit(): void {
    if(localStorage.getItem("friends")){this.friends = JSON.parse(localStorage.getItem("friends"));}
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    
    this.getAllFriends();

    this.route.queryParams.subscribe(params => {
      let date = params['startdate'];
      console.log(date, params); // Print the parameter to the console. 
  });

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
      console.log(this.auth.getDataFromUser(e).subscribe((e:any) => {
        console.log('her2:',e);
        this.friendData.push(e[0].user);
        
      }));
    })
  }
  public onCloseClick() {
    console.log("close");
    setTimeout(() => {
      this.hideMap("")
    }, 200)
  }

  
}
