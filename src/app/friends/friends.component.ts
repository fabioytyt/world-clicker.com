import { Component } from '@angular/core';
import { AddFriendComponent } from './add-friend/add-friend.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [AddFriendComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {

}
