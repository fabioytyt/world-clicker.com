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

  getFriendsGarages(userId: string): Observable<any[]> {
    console.log("friendUser", userId);
    return this.afs.collection(`users/${userId}/data/data/friends`).snapshotChanges().pipe(
      switchMap(friends => {
        // const friendIds = friends.map(friend => friend.payload.doc.id);
        // const friendGarages = friendIds.map(friendId =>
        //   this.afs.collection(`users/${friendId}/data/data`).valueChanges()
        // );
        let friendGarages: any[] = []
        this.authService.getDataFromUser(userId).subscribe((e:any) => {
          console.log(e.garages);
          friendGarages.push(...e.garages)
        })

        console.log("friendGarage", friendGarages);
        
        return (friendGarages);
      }),
      map(garagesArray => garagesArray.flat())
    );
  }
}