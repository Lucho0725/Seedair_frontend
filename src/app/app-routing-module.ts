import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { ListParcels } from './components/parcels/list-parcels/list-parcels';
import { SaveParcel } from './components/parcels/save-parcel/save-parcel';
import { consultarGuard } from './components/guards/consultar-guard';


const routes: Routes = [
  {path:"", component:Login},
  {path:"login", component:Login},  
  {path:"home", component:Home, canActivate:[consultarGuard]},
  {path:"parcels/list-parcels", component: ListParcels, canActivate:[consultarGuard]},
  {path:"parcels/save-parcel", component: SaveParcel, canActivate:[consultarGuard]},  
  {path:"parcels/save-parcel/:id", component: SaveParcel, canActivate:[consultarGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
