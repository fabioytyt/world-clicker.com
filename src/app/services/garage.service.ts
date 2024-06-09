import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { fromUserCoordinate } from 'ol/proj';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  constructor(private afs: AngularFirestore, private authService: AuthService) {}
  public friendGarages: any[] = []
  getFriendsGarages(userId: string): Observable<any[]> {
    this.friendGarages = [];
    console.log("friendUser", userId);
   
    return this.afs.collection(`users/${userId}/data/data/friends`).snapshotChanges().pipe(
      switchMap(friends => {
        // const friendIds = friends.map(friend => friend.payload.doc.id);
        // const friendGarages = friendIds.map(friendId =>
        //   this.afs.collection(`users/${friendId}/data/data`).valueChanges()
        // );
        
        this.authService.getDataFromUser(userId).subscribe((e:any) => {
          console.log(e[0].garages, userId, e[0], "userSubscription");
          this.friendGarages.push(...e[0].garages)
          console.log("friendGarage", this.friendGarages);
          localStorage.setItem("friendGarages", JSON.stringify(this.friendGarages))
          return(this.friendGarages)
        })

      
        
        return (this.friendGarages);
      }),
      map(garagesArray => garagesArray.flat())
    );
  }
}