import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FriendsComponent } from './friends/friends.component';
import { AddFriendComponent } from './friends/add-friend/add-friend.component';
import { LeaflatMapComponent } from './leaflat-map/leaflat-map.component';
import { WhenMovingComponent } from './when-moving/when-moving.component';
import { ProfileComponent } from './profile/profile.component';
import { CarFoundComponent } from './car-found/car-found.component';
import { GarageComponent } from './garage/garage.component';
import { MyCarsComponent } from './my-cars/my-cars.component';


export const routes: Routes = [
    { path: '', component: LeaflatMapComponent, title: 'World-Clicker | Map' },
    { path: 'friends', component: FriendsComponent },
    // { path: 'friends/:id', component: FriendsComponent },
    // { path: 'friends', component: AddFriendComponent },
    { path: 'garage', component: MyCarsComponent },
    { path: 'carFound', component: CarFoundComponent },
    // { path: 'profile', component: AddFriendComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'whenMoving', component: WhenMovingComponent },
    { path: 'garageClick', component: GarageComponent },
    // { path: 'world-clicker', component: AppComponent },
];
 
export default routes;